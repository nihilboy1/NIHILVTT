import fs from 'fs/promises'; // Usado para a escrita de arquivo assíncrona (writeFile)
import fsSync from 'fs'; // Usado para as operações síncronas (existsSync, mkdirSync)
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

// --- Tipagem Básica ---
interface Outcome {
  id?: string;
  type: string;
  [key: string]: any;
}

interface Parameters {
  outcomes?: Outcome[];
  [key: string]: any;
}

interface Effect {
  type: string;
  parameters?: Parameters;
}

interface DataObject {
  id: string;
  effects?: Effect[];
}

// --- Tratamento de Erros Globais ---
process.on('uncaughtException', (err) => {
  console.error(chalk.bgRed.white(' Uncaught Exception '), err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error(chalk.bgRed.white(' Unhandled Rejection '), reason);
  process.exit(1);
});

/**
 * Função recursiva para extrair todos os caminhos de propriedades de um objeto.
 * @param obj O objeto a ser inspecionado.
 * @param options Opções para a extração.
 * @param currentPath O caminho atual na recursão (usado internamente).
 * @param paths O Set para armazenar os caminhos únicos encontrados.
 * @returns Um Set com todos os caminhos de propriedades.
 */
function getPaths(
  obj: Record<string, any>,
  options: { ignoreKeys?: string[] } = {},
  currentPath = '',
  paths = new Set<string>()
): Set<string> {
  for (const key in obj) {
    if (options.ignoreKeys?.includes(key)) {
      continue;
    }

    const value = obj[key];
    const newPath = currentPath ? `${currentPath}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      getPaths(value, options, newPath, paths);
    } else {
      paths.add(newPath);
    }
  }
  return paths;
}

/**
 * Extrai caminhos da raiz do objeto 'parameters', ignorando o array 'outcomes'.
 * @param data O array de dados a ser processado.
 * @returns Um Set contendo todos os caminhos únicos encontrados.
 */
function extractParameterPaths(data: DataObject[]): Set<string> {
  const allPaths = new Set<string>();
  data.forEach((item) => {
    item.effects?.forEach((effect) => {
      if (effect.parameters) {
        getPaths(effect.parameters, { ignoreKeys: ['outcomes'] }, '', allPaths);
      }
    });
  });
  return allPaths;
}

/**
 * Extrai caminhos de dentro dos objetos no array 'outcomes'.
 * @param data O array de dados a ser processado.
 * @returns Um Set contendo todos os caminhos únicos encontrados.
 */
function extractOutcomePaths(data: DataObject[]): Set<string> {
  const allPaths = new Set<string>();
  data.forEach((item) => {
    item.effects?.forEach((effect) => {
      if (Array.isArray(effect.parameters?.outcomes)) {
        effect.parameters.outcomes.forEach((outcome) => {
          getPaths(outcome, {}, '', allPaths);
        });
      }
    });
  });
  return allPaths;
}

/**
 * Gera uma string formatada como um Zod Enum para ser escrita em um arquivo.
 * @param paths O Set de caminhos a ser formatado.
 * @param sourceType O tipo de extração ('parameters' ou 'outcomes').
 * @returns Uma string contendo a declaração do Zod Enum.
 */
function generateZodEnumString(
  paths: Set<string>,
  sourceType: 'parameters' | 'outcomes'
): string {
  const variableName =
    sourceType === 'parameters'
      ? 'RootParameterPaths'
      : 'OutcomeParameterPaths';
  const dataName =
    sourceType === 'parameters' ? 'Parameters (Raiz)' : 'Outcomes';

  console.log(
    chalk.cyan(`\n🔍 Gerando enum para: ${chalk.bold.underline(dataName)}...`)
  );

  if (paths.size === 0) {
    console.log(
      chalk.yellow(`\n⚠️ Nenhum caminho encontrado em ${dataName}. Gerando enum vazio.`)
    );
    return `// No paths found for ${dataName}\nexport const ${variableName} = z.enum([]);`;
  }

  const sortedPaths = Array.from(paths).sort();
  const enumValues = sortedPaths.map((path) => `  '${path}'`).join(',\n');
  const zodEnumString = `export const ${variableName} = z.enum([\n${enumValues}\n]);`;

  console.log(
    chalk.green(`  -> ${sortedPaths.length} caminhos únicos encontrados.`)
  );

  return zodEnumString;
}

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const projectRoot = path.resolve(__dirname, '../..');

  console.log(chalk.blue('Buscando arquivos de dados válidos...'));
  
  // Padrões de glob focados apenas nos arquivos válidos para evitar erros.
  const globPatterns = [
    path.join(projectRoot, 'src', 'data', 'items', '**', '*.ts').replace(/\\/g, '/'),
    path.join(projectRoot, 'src', 'data', 'spells', 'spells-level-0.ts').replace(/\\/g, '/')
  ];
  const ignorePattern = path.join(projectRoot, 'src', 'data', '**', '*-union.ts').replace(/\\/g, '/');

  const dataFiles = await glob(globPatterns, {
    ignore: ignorePattern,
  });

  console.log(chalk.blue('Carregando e processando arquivos de dados...'));
  let allData: DataObject[] = [];

  for (const absolutePath of dataFiles) {
    // Calcula o caminho relativo do script atual para o arquivo de dados.
    const relativeImportPath = path.relative(__dirname, absolutePath).replace(/\\/g, '/');
    const finalImportPath = relativeImportPath.startsWith('../') ? relativeImportPath : './' + relativeImportPath;

    try {
      const module = await import(finalImportPath);
      console.log(chalk.gray(`- Processando ${path.relative(projectRoot, absolutePath)}...`));

      // Itera sobre tudo que o módulo exporta
      for (const key in module) {
        const exportedItem = module[key];
        // Se o item exportado for um array, adiciona ao nosso conjunto de dados
        if (Array.isArray(exportedItem)) {
          console.log(
            chalk.green(`  -> Encontrado array exportado '${key}' com ${exportedItem.length} itens.`)
          );
          allData = allData.concat(exportedItem);
        }
      }
    } catch (error) {
      console.error(chalk.red(`\n🚨 Erro ao carregar o arquivo ${path.relative(projectRoot, absolutePath)}:`), error);
    }
  }

  if (allData.length === 0) {
    console.error(chalk.bgRed.white('\n🚨 Nenhum dado foi carregado! Verifique os caminhos e os exports nos arquivos de dados. Encerrando.\n'));
    return;
  }

  // Extrai os dois conjuntos de paths
  const parameterPaths = extractParameterPaths(allData);
  const outcomePaths = extractOutcomePaths(allData);

  // Gera as strings para os enums
  const parameterEnumString = generateZodEnumString(parameterPaths, 'parameters');
  const outcomeEnumString = generateZodEnumString(outcomePaths, 'outcomes');

  // Monta o conteúdo final do arquivo
  const fileContent = `// Este arquivo é gerado automaticamente. Não edite manualmente.\n// Use o script 'npm run generate:paths' para atualizar.\n\nimport { z } from 'zod';\n\n${parameterEnumString}\n\n${outcomeEnumString}\n`;

  // Define o caminho de saída e escreve o arquivo
  try {
    // CORREÇÃO: Constrói o caminho para 'src/shared/', que está no mesmo nível de 'domain'.
    const outputPath = path.resolve(projectRoot, 'src', 'shared', 'property-paths.schemas.ts');
    const outputDir = path.dirname(outputPath);

    // Garante que o diretório de destino exista de forma síncrona antes de escrever
    if (!fsSync.existsSync(outputDir)) {
      fsSync.mkdirSync(outputDir, { recursive: true });
    }

    // Usa a versão de promises do writeFile, que é assíncrona e aguardada pelo 'await'.
    // Isso garante que o script só continue (e termine) após a escrita ser concluída.
    await fs.writeFile(outputPath, fileContent, 'utf-8');
    console.log(
      chalk.bgGreen.bold(
        `\n✅ Arquivo de enums gerado com sucesso em: ${outputPath}\n`
      )
    );

  } catch (error) {
    console.error(
      chalk.bgRed.white(`\n🚨 Erro ao escrever o arquivo de enums:`),
      error
    );
  }
}

main();
