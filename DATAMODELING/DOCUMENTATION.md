# Documentação NIHILVTT - Data Modeling

Este documento descreve a estrutura e organização do projeto NIHILVTT Data Modeling, explicando a função de cada diretório e arquivo `index.ts`.

## Estrutura do Projeto

O projeto está organizado em três diretórios principais:

1. `src/data`: Contém todos os dados do jogo
2. `src/domain`: Contém os schemas e tipos para validação de dados
3. `src/shared`: Contém blocos compartilhados, primitivos e esquemas comuns

## Arquivos Index.ts e suas Funções

### `src/data/index.ts`

Este arquivo exporta todos os dados do jogo organizados por categorias. Ele funciona como um ponto central de acesso para todos os dados do sistema, incluindo:

- Classes (Lutadores, Magos, etc.)
- Talentos (Feats)
- Itens (Armas, Armaduras, Ferramentas, etc.)
- Monstros
- Origens
- Espécies
- Magias (Spells)
- Tokens Invocados

**Função**: Fornece um único ponto de importação para todos os dados do jogo, facilitando o acesso a essas informações por outras partes do sistema.

### `src/domain/index.ts`

Este arquivo exporta todos os schemas e tipos usados para validação dos dados e estabelece a estrutura do domínio. Inclui:

- Action: Esquemas para ações
- ActionParameter: Parâmetros para ações
- Class: Esquemas para classes
- Feat: Esquemas para talentos
- Item: Esquemas para itens
- Monster: Esquemas para monstros
- Origin: Esquemas para origens
- Specie: Esquemas para espécies
- Spell: Esquemas para magias
- SummonedToken: Esquemas para tokens invocados

**Função**: Centraliza os tipos e esquemas de validação para garantir a integridade e consistência dos dados em todo o sistema.

### `src/shared/index.ts`

Este arquivo exporta blocos compartilhados, esquemas e enumerações que são utilizados por vários componentes do sistema. Inclui:

- Blocks Schema: Blocos básicos reutilizáveis
- Character Blocks: Blocos específicos para personagens
- Class Progression: Esquemas de progressão de classes
- Data-Based Enums: Enumerações baseadas em dados
- Effect: Esquema para efeitos
- Game Events: Eventos do jogo
- Outcome: Resultados de ações

**Função**: Fornece componentes e estruturas comuns que são compartilhados entre diferentes partes do sistema.

### `src/shared/primitives/index.ts`

Este arquivo exporta tipos primitivos e definições fundamentais que são usados em todo o sistema. Inclui primitivos para:

- Character: Primitivos para personagens
- Class: Primitivos para classes
- Combat: Primitivos para combate
- Item: Primitivos para itens
- Spell: Primitivos para magias
- System: Primitivos do sistema
- World: Primitivos do mundo de jogo

**Função**: Fornece tipos primitivos que formam a base para construção de estruturas mais complexas no sistema.

## Estrutura de Diretórios

### `src/data/`

Organiza todos os dados do jogo em categorias bem definidas:

- `actions/`: Dados relacionados a ações que personagens podem realizar
- `classes/`: Classes de personagem como Lutador (Fighter), com suas progressões e subclasses
- `feats/`: Talentos gerais, origens e habilidades especiais
- `items/`: Itens como armas, armaduras, ferramentas e equipamentos
- `monsters/`: Monstros organizados por nível de desafio (CR)
- `origins/`: Dados de origens de personagem
- `species/`: Dados de espécies/raças de personagem
- `spells/`: Magias organizadas por nível
- `summonedTokens/`: Entidades que podem ser invocadas

### `src/domain/`

Define a estrutura e validação para cada tipo de dado no sistema:

- `action/`: Esquemas para ações
- `actionParameter/`: Esquemas para parâmetros de ações
- `class/`: Esquemas para classes
- `feat/`: Esquemas para talentos
- `item/`: Esquemas para itens
- `monster/`: Esquemas para monstros
- `origin/`: Esquemas para origens
- `specie/`: Esquemas para espécies
- `spell/`: Esquemas para magias
- `summonedToken/`: Esquemas para tokens invocados

### `src/shared/`

Contém estruturas compartilhadas e primitivos usados em todo o sistema:

- `primitives/`: Tipos primitivos para diferentes aspectos do jogo
- Diversos arquivos de esquemas compartilhados que definem blocos comuns

### `src/tooling/`

Ferramentas para desenvolvimento e validação:

- `filtrar_xphb.ts`: Ferramenta para filtrar conteúdo do Player's Handbook
- `generate-enums.ts`: Gera enumerações baseadas nos dados
- `validate.mjs` e `validate.ts`: Scripts para validação de dados

## Fluxo de Dados

1. Os tipos primitivos em `shared/primitives/` definem as estruturas básicas
2. Os esquemas em `domain/` usam esses primitivos para criar estruturas completas
3. Os dados em `src/data/` implementam esses esquemas, fornecendo conteúdo para o jogo
4. As ferramentas em `tooling/` validam e manipulam esses dados conforme necessário

Este padrão permite uma separação clara entre definição de estrutura e os dados reais, facilitando a manutenção e expansão do sistema.
