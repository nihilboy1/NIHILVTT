import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

// --- Tratamento de Erros Globais ---
process.on('uncaughtException', (err) => {
  console.error(chalk.bgRed.white(' Uncaught Exception '), err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error(chalk.bgRed.white(' Unhandled Rejection '), reason);
  process.exit(1);
});

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const projectRoot = path.resolve(__dirname, '../..');

  console.log(chalk.blue('Buscando arquivos de dados para geração de enums...'));

  const globPatterns = [
    path.join(projectRoot, 'src', 'data', 'items', '**', '*.ts').replace(/\\/g, '/'),
    path.join(projectRoot, 'src', 'data', 'actions', '**', '*.ts').replace(/\\/g, '/'),
  ];
  const ignorePattern = path.join(projectRoot, 'src', 'data', '**', '*-union.ts').replace(/\\/g, '/');

  const dataFiles = await glob(globPatterns, {
    ignore: ignorePattern,
  });

  console.log(chalk.blue('Carregando e processando arquivos de dados...'));
  
  const allWeaponIds = new Set<string>();
  const allActionIds = new Set<string>();

  for (const absolutePath of dataFiles) {
    const relativeImportPath = path.relative(__dirname, absolutePath).replace(/\\/g, '/');
    const finalImportPath = relativeImportPath.startsWith('../') ? relativeImportPath : './' + relativeImportPath;

    try {
      const module = await import(finalImportPath);
      console.log(chalk.gray(`- Processando ${path.relative(projectRoot, absolutePath)}...`));

      if (absolutePath.includes('items-weapon')) {
        if (Array.isArray(module.itemsWeapon)) {
          console.log(chalk.green(`  -> Encontrado 'itemsWeapon' com ${module.itemsWeapon.length} itens.`));
          module.itemsWeapon.forEach((item: { id: string }) => allWeaponIds.add(item.id));
        }
      }

      if (absolutePath.includes('actions.data')) {
        if (Array.isArray(module.ACTIONS)) {
            console.log(chalk.green(`  -> Encontrado 'ACTIONS' com ${module.ACTIONS.length} itens.`));
            module.ACTIONS.forEach((item: { id: string }) => allActionIds.add(item.id));
        }
      }

    } catch (error) {
      console.error(chalk.red(`\n🚨 Erro ao carregar o arquivo ${path.relative(projectRoot, absolutePath)}:`), error);
    }
  }

  const generateEnumString = (name: string, values: Set<string>): string => {
    if (values.size === 0) {
      console.log(chalk.yellow(`\n⚠️ Nenhum ID encontrado para ${name}. Gerando enum vazio.`));
      return `export const ${name} = z.enum([]);`;
    }
    const sortedValues = Array.from(values).sort();
    const enumValues = sortedValues.map((val) => `  '${val}'`).join(',\n');
    return `export const ${name} = z.enum([\n${enumValues}\n]);`;
  };

  const weaponIdEnumString = generateEnumString('WeaponIdEnum', allWeaponIds);
  const actionIdEnumString = generateEnumString('ActionIdEnum', allActionIds);

  const fileContent = `// Este arquivo é gerado automaticamente. Não edite manualmente.\n// Use o script 'npm run generate:enums' para atualizar.\n\nimport { z } from 'zod';\n\n${weaponIdEnumString}\n\n${actionIdEnumString}\n`;

  const outputPath = path.resolve(projectRoot, 'src', 'shared', 'data-enums.schema.ts');
  const outputDir = path.dirname(outputPath);

  if (!fsSync.existsSync(outputDir)) {
    fsSync.mkdirSync(outputDir, { recursive: true });
  }

  await fs.writeFile(outputPath, fileContent, 'utf-8');
  console.log(
    chalk.bgGreen.bold(
      `\n✅ Arquivo de enums de dados gerado com sucesso em: ${outputPath}\n`
    )
  );
}

main();
