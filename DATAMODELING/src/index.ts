/**
 * NIHILVTT - Data Modeling
 *
 * Este é o ponto de entrada principal do projeto NIHILVTT Data Modeling.
 *
 * ## Estrutura do Projeto
 *
 * O projeto está organizado em três módulos principais:
 *
 * 1. **data**: Contém todos os dados do jogo
 *    - Classes, Talentos, Itens, Monstros, Origens, Espécies, Magias, Tokens Invocados
 *
 * 2. **domain**: Contém os schemas e tipos para validação de dados
 *    - Schemas para Actions, Classes, Feats, Items, Monsters, Origins, Species, Spells
 *
 * 3. **shared**: Contém blocos compartilhados, primitivos e esquemas comuns
 *    - Primitivos, blocos reutilizáveis, enumerações e estruturas base
 *
 * Para mais detalhes, consulte o arquivo documentation.md na raiz do projeto.
 */

// Exportações principais do projeto
// export * from "./data/index.js";
// export * from "./domain/index.js";
// export * from "./shared/index.js";

// Informações de documentação
export const documentation = {
  projectName: "NIHILVTT Data Modeling",
  description: "Sistema de modelagem de dados para o NIHILVTT",
  modules: {
    data: "Contém todos os dados do jogo organizados por categorias",
    domain: "Contém schemas e tipos para validação dos dados",
    shared: "Contém blocos compartilhados, primitivos e esquemas comuns",
  },
  structure: {
    data: [
      "actions - Dados relacionados a ações que personagens podem realizar",
      "classes - Classes de personagem como Lutador (Fighter)",
      "feats - Talentos gerais, origens e habilidades especiais",
      "items - Itens como armas, armaduras, ferramentas e equipamentos",
      "monsters - Monstros organizados por nível de desafio (CR)",
      "origins - Dados de origens de personagem",
      "species - Dados de espécies/raças de personagem",
      "spells - Magias organizadas por nível",
      "summonedTokens - Entidades que podem ser invocadas",
    ],
    domain: [
      "action - Esquemas para ações",
      "actionParameter - Esquemas para parâmetros de ações",
      "class - Esquemas para classes",
      "feat - Esquemas para talentos",
      "item - Esquemas para itens",
      "monster - Esquemas para monstros",
      "origin - Esquemas para origens",
      "specie - Esquemas para espécies",
      "spell - Esquemas para magias",
      "summonedToken - Esquemas para tokens invocados",
    ],
    shared: [
      "primitives - Tipos primitivos fundamentais",
      "blocks.schema - Blocos básicos reutilizáveis",
      "character-blocks.schema - Blocos específicos para personagens",
      "class-progression.schema - Esquemas de progressão de classes",
      "data-based-enums - Enumerações baseadas em dados",
      "effect.schema - Esquema para efeitos",
      "game-events - Eventos do jogo",
      "outcome - Resultados de ações",
    ],
  },
  version: "1.0.0",
};

// Função auxiliar para obter documentação
export function getDocumentation(): typeof documentation {
  return documentation;
}
