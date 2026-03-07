# DATAMODELING

Pacote `@nihilvtt/datamodeling` com schemas, tipos, dados e ferramentas de validacao do dominio.

Este README e um guia operacional do pacote: organizacao interna, exports, fluxo de trabalho e direcao tecnica da modelagem.

Regra editorial do modulo:

- o datamodeling do NIHILVTT esta em pre-versao; schemas e documentacao devem refletir apenas o contrato atual, sem qualquer nocao de suporte legado

## Estrutura principal

- `src/data/`: dados do jogo (classes, feats, itens, monstros, magias, tokens).
- `src/domain/`: schemas/tipos de dominio para validacao.
- `src/shared/`: blocos compartilhados e enums baseados em dados.
- `src/shared/primitives/`: tipos primitivos reutilizaveis.
- `src/runtime/`: estado runtime tipado de entidades jogaveis e value objects de sessao.
  - `value-objects/`: blocos mutaveis pequenos e reutilizaveis.
  - `entities/`: agregados runtime persistidos, como `PlayerCharacterState`.
- `src/tooling/`: scripts de validacao e geracao.
- `MONSTER_RUNTIME_BLUEPRINT.md`: blueprint tecnico da futura ficha/runtime autoritativo de monstros.

## Exports do pacote

- `@nihilvtt/datamodeling/data`
- `@nihilvtt/datamodeling/domain`
- `@nihilvtt/datamodeling/shared`
- `@nihilvtt/datamodeling/primitives`
- `@nihilvtt/datamodeling/runtime`

### Glossario canonico PT-BR de monstros

- O pacote `shared` expoe o glossario canônico PT-BR de termos de monstro em `src/shared/monster-glossary.pt-br.ts`.
- Frontends/consumidores devem usar esse glossario compartilhado (via `@nihilvtt/datamodeling/shared`) e nao manter mapa paralelo local para os mesmos termos.
- Termo canonico sem traducao no glossario deve ser tratado como violacao de contrato, sem fallback silencioso.

## Scripts

No diretorio `DATAMODELING/`:

- `pnpm validate:data`
- `pnpm enums`
- `pnpm monsters`
- `pnpm export:backend-item-manifest`
- `pnpm export:backend-monster-manifest`
- `pnpm check:backend-monster-manifest-sync`
- `pnpm lint`

## Manifest de Monstros (Backend)

- `export:backend-monster-manifest` gera o arquivo canônico consumido pelo backend em `BACKEND-JAVA/src/main/resources/catalog/monster-catalog-manifest.json`.
- o manifest canônico de monstros exporta também `defenses` de dano (`resistances`, `vulnerabilities`, `damageImmunities`) para cálculo autoritativo de dano no backend.
- para `effects` do tipo `activatableAction` que aplicam `modifyTargetHP` em `on: "hit"`, o catálogo deve declarar `attackBonus` em `parameters`; sem isso a ação não entra no manifest canônico e o backend rejeita o ataque por ação inexistente.
- `check:backend-monster-manifest-sync` valida que o manifest atual do backend esta sincronizado com o catalogo em `DATAMODELING`; o comando falha quando houver drift.

## Fluxo recomendado

1. Atualize tipos primitivos em `src/shared/primitives/` quando necessario.
2. Ajuste schemas em `src/domain/`.
3. Atualize dados em `src/data/`.
4. Ajuste estado runtime em `src/runtime/` quando a mudanca afetar a ficha viva da mesa.
5. Rode `pnpm validate:data` para garantir consistencia.

## Estado Atual do Modelo

Leitura atual do pacote, confirmada no codigo:

- O pacote ja modela muito bem o catalogo de regras e dados estaticos:
  - classes
  - feats
  - itens
  - especies
  - origens
  - magias
  - monstros
- O desenho e fortemente orientado a `effects`, com um DSL tipado em `src/shared/effect.schema.ts`.
- Itens de armadura e arma ja carregam comportamento por efeito:
  - armaduras usam `onEquip_setAC`
  - armas usam `onWield_grantWeaponAttack`
- Classes ja carregam:
  - efeitos base
  - equipamento inicial
  - requisitos de multiclasse
  - progressao de classe
- `RequirementSchema` e `GameEventSchema` ja permitem expressar condicoes complexas para uso, equipar, triggers e validacoes.
- O primeiro corte do bloco de runtime ja existe e hoje contem:
  - `ProgressionStateSchema`
  - `AttributesStateSchema`
  - `InventoryStateSchema`
  - `EquipmentStateSchema`
  - `ResourcePoolStateSchema`
  - `ActiveEffectStateSchema`
  - `PlayerCharacterStateSchema`
  - `MonsterCharacterStateSchema`
  - `SessionCharacterStateSchema` (uniao discriminada canônica de personagem de sessao)
- `PlayerCharacterHitPointStateSchema` agora exige `current`, `temporary` e `max`; `max` passa a ser a fonte canonica e obrigatoria de HP maximo no runtime.
- `PlayerCharacterStateSchema` agora tambem carrega `controlledByUserId` (nullable), para definir de forma autoritativa quem controla aquela ficha na mesa.
- O runtime de `Player` agora segue a mesma disciplina estrita do runtime de `NPC`: `controlledByUserId`, `inspiration`, `build.subclassId`, `build.selectedFeatIds`, `progression`, `hitPoints.temporary`, `inventory.items`, `equipment`, `resourcePools`, `activeEffects` e seus campos mutaveis internos precisam existir explicitamente no payload; `default()` nao deve mais completar estado ausente por baixo dos panos.
- Monstros agora tambem tem um primeiro corte de runtime: `MonsterCharacterStateSchema`, mantendo `MonsterType` como catalogo estatico e usando `monsterId` como referencia canonica da instancia em mesa.
- `MonsterCharacterStateSchema` nao carrega `controlledByUserId`: no estado atual do produto, `NPC` e sempre de uso exclusivo do mestre.
- `MonsterCharacterStateSchema` tambem nao usa mais defaults silenciosos para campos mutaveis: `nameOverride`, `imageOverride`, `notes`, `hitPoints.temporary`, `resourcePools.pools[]` e `activeEffects.effects[]` precisam existir explicitamente no payload runtime, alinhados ao validador do backend.
- `SessionCharacterStateSchema` passa a ser a borda canônica de parse para snapshots e eventos de sessao, reduzindo branching manual entre `Player` e `NPC`.
- `SessionCharacterStateSchema` tambem deve ser tratado como SSOT formal do shape de personagem em sessao: frontend e backend devem consumir esse contrato, e nao manter schemas paralelos concorrentes para a mesma borda.

## Distincao Importante

Hoje o pacote modela principalmente:

- catalogo de dados de regras
- blocos compartilhados de combate/efeitos
- schemas de validacao para entidades do catalogo

O novo bloco `src/runtime/` deve centralizar o estado persistido/runtime de um `PlayerCharacter` jogavel (ficha viva da mesa), por exemplo com:

- nivel atual e progressao pendente
- atributos base
- inventario carregado
- equipamento atualmente equipado
- recursos atuais da ficha
- efeitos ativos aplicados na instancia do personagem

Essa distincao e importante porque o pacote ja descreve muito bem "o que existe no sistema", e agora passa a tambem centralizar "como uma instancia de personagem em jogo guarda seu estado", sem misturar runtime com catalogo.

## Direcao Recomendada

Ao evoluir o pacote para suportar o MCP jogavel, manter esta separacao:

- `src/data/` e `src/domain/`: catalogo autoritativo e schemas das regras
- `src/runtime/`: estado persistido de personagem, inventario, equipamento, progressao e efeitos ativos

Isso evita misturar:

- definicao de regra
- estado da ficha em tempo de jogo

## Decisao de Arquitetura Atual

Decisao tomada para a proxima etapa do pacote:

- o estado runtime de um personagem jogavel tambem deve morar em `DATAMODELING`
- esse runtime nao deve ser misturado com o catalogo em `src/data/`
- o runtime deve ficar em um bloco proprio (`src/runtime/`)
- o runtime deve sempre referenciar o catalogo por enums e ids existentes, nunca por strings livres quando houver enum disponivel

Exemplos de vinculo forte esperados:

- `classId`: usar `ClassIdEnum`
- `selectedFeatIds`: usar `FeatIdEnum`
- `equippedArmorId`: usar `ArmorIdEnum`
- `mainHandWeaponId` / `offHandWeaponId`: usar `WeaponIdEnum`

## Convencao de IDs de Classe

Para classes, o pacote passa a distinguir explicitamente:

- `ClassIdEnum`: id canonico namespaced da entidade do catalogo
  - exemplo: `class-fighter`
- `ClassesIdEnum`: chave logica/slug da classe
  - exemplo: `fighter`

Regra atual:

- runtime e referencias persistidas devem usar `ClassIdEnum`
- `ClassesIdEnum` continua existindo apenas enquanto partes do catalogo ainda operam com slug logico

Direcao futura:

- reduzir gradualmente usos de `ClassesIdEnum` quando o catalogo for normalizado
- manter `ClassIdEnum` como referencia autoritativa da entidade de classe

Essa decisao existe para manter:

- integridade entre catalogo e runtime
- uma unica fonte de verdade para frontend e backend
- compatibilidade futura com uma mecanica estilo Baldur's Gate 3, onde a ficha deriva das regras e do estado, e nao de edicao manual

## Estrutura Runtime Recomendada

Ordem recomendada para implementar o novo bloco de runtime:

1. `src/runtime/value-objects/progression.state.ts`
2. `src/runtime/value-objects/attributes.state.ts`
3. `src/runtime/value-objects/inventory.state.ts`
4. `src/runtime/value-objects/equipment.state.ts`
5. `src/runtime/value-objects/resource-pool.state.ts`
6. `src/runtime/value-objects/active-effect.state.ts`
7. `src/runtime/entities/player-character.state.ts`
8. `src/runtime/index.ts`

## Regra de Modelagem Runtime

O estado runtime deve guardar:

- referencias para entidades do catalogo
- escolhas feitas pelo jogador
- estado mutavel da instancia

O estado runtime nao deve guardar como fonte primaria:

- valores finais calculados de AC
- valores finais calculados de ataque
- atributos finais calculados
- bonus finais derivados

Esses valores devem ser resolvidos por uma camada posterior de calculo, a partir de:

- catalogo
- estado runtime
- itens equipados
- efeitos ativos

## Principio Data-Driven

Diretriz atual do projeto:

- evitar recalculo manual ou duplicacao de regra em frontend e backend quando o dado ja existe no catalogo
- usar o catalogo como fonte de verdade
- usar o runtime apenas para guardar estado mutavel da instancia

Na pratica:

- frontend e backend devem consumir os dados modelados
- a UI deve exibir estado e comparar condicoes
- o runtime nao deve copiar regra estatica quando essa regra ja esta descrita no catalogo

Exemplos:

- o runtime guarda qual armadura esta equipada; a regra de AC continua no item do catalogo
- o runtime guarda `currentLevel`; a progressao da classe continua no catalogo
- o runtime guarda cargas atuais de um recurso; limite e recarga continuam definidos pelos dados da classe/acao

- o contrato base de ataque desarmado deve morar no catalogo (`src/data/combat/unarmed-attack.ts`), com `defaultDamageType` e `damageTypeOverrides` por `specieId`; consumidores nao devem hardcodear `builtin-unarmed-strike` em multiplos pontos.

Diretriz explicita:

- o projeto nao deve manter suporte legado dentro do runtime tipado
- quando um campo passar a ser obrigatorio no runtime, ele deve ser exigido por schema e pelos consumidores
- nao adicionar fallback nem backfill automatico para corrigir payloads/estados; contratos invalidos devem falhar cedo
- a futura ficha de monstro deve seguir a mesma regra: o runtime guarda apenas estado mutavel, e frontend/backend projetam dados canonicos sem duplicar nem reconstruir regra fora do catalogo
- no primeiro corte de runtime de monstro, HP maximo, AC, speed, atributos, traits e acoes continuam fora do runtime e devem ser resolvidos do catalogo canonico
- para manter SSOT com o backend, o runtime de monstro nao deve depender de `default()` para \"completar\" campos ausentes; payload incompleto e invalido por contrato

## Convencoes Iniciais de Runtime

O primeiro corte dos value objects de runtime foi mantido deliberadamente conservador:

- `ProgressionStateSchema`
  - guarda `currentLevel` e `pendingLevelUps`
- `AttributesStateSchema`
  - guarda somente `base`
- `InventoryStateSchema`
  - guarda entradas de inventario por `itemId` e `quantity`
- `EquipmentStateSchema`
  - separa slots minimos de equipamento em:
    - `bodyArmorItemId`
    - `shieldItemId`
    - `mainHandWeaponId`
    - `offHandWeaponId`
- `ResourcePoolStateSchema`
  - guarda pools de recurso por `resourceId` e `current`
- `ActiveEffectStateSchema`
  - guarda instancias de efeitos ativos por referencia ao catalogo, sem copiar o payload do efeito

Decisao importante:

- `bodyArmorItemId` nao aceita escudo
- `shieldItemId` aceita somente `armor-escudo`
- `ResourcePoolStateSchema` guarda apenas o valor atual do recurso
- maximo, recarga e comportamento do recurso continuam sendo responsabilidade do catalogo
- `ActiveEffectStateSchema` guarda apenas referencia de origem (`source`), localizacao do efeito no catalogo (`effectIndex`) e estado mutavel da instancia (duracao restante, stacks, supressao)
- o runtime nao copia o `EffectSchema` completo para dentro da ficha viva

## Catalogo de Itens Canonico

Regra atual:

- `PHB2024ITEMS` deve refletir o catalogo canonico de itens jogaveis exposto pelo pacote
- a composicao de `PHB2024ITEMS` deve permanecer alinhada aos enums gerados em `src/shared/data-based-enums.ts` (especialmente `AllItemsEnum`)
- itens validos ja modelados no pacote nao devem ficar fora do export principal por omissao na uniao
- o script `pnpm export:backend-item-manifest` gera um manifest JSON consumido pelo backend Java para validacao de inventario/equipamento sem heuristica por prefixo
- o script `pnpm export:backend-monster-manifest` gera o manifest JSON canônico de monstros para o backend Java, incluindo identidade base, `primaryName`, `abilityScores`, AC, HP máximo, deslocamentos e `actions` de ataque canônicas (por `actionId`) com metadados condicionais (`movesAtLeast`, dano adicional e condições aplicadas) para resolução autoritativa de combate sem confiar em payload montado pelo frontend
- o script `pnpm enums` deve classificar familias de item pela origem canonica dos arquivos de dados (e metadado associado), nao por prefixo textual de `id`
- o script `pnpm enums` deve apontar para os diretórios reais de dados publicados (`items`, `actions`, `spells`, `feats`, `summonedTokens`, `monsters`), respeitando também a extensão real dos módulos publicados (`.ts` ou `.js`) para evitar enums vazios

Exemplo concreto:

- `items-musical-instruments.ts` faz parte do catalogo de itens e deve entrar em `PHB2024ITEMS`, em vez de existir apenas nos enums gerados

## Entidade Runtime Inicial

O primeiro agregado runtime ja implementado e `PlayerCharacterStateSchema`, que centraliza:

- identidade persistida (`id`, `type`, `name`)
- build estavel (`classId`, `originId`, `specieId`, `subclassId`, `selectedFeatIds`)
- progressao e atributos base
- HP mutavel em sessao (`hitPoints.current`, `hitPoints.max`, `hitPoints.temporary`)
- inventario, equipamento, recursos e efeitos ativos

Decisao atual:

- `originId` e `specieId` ainda usam validacao por prefixo canonico (`origin-...`, `specie-...`)
- isso acontece porque o pacote ainda nao expoe enums gerados para origens e especies em `data-based-enums.ts`
- assim que esses enums existirem, o runtime deve migrar de prefixo-validado para enum fixo, como ja acontece com `classId` e `selectedFeatIds`

Essa separacao foi adotada cedo para evitar ambiguidade entre:

- armadura corporal
- item defensivo de mao

Ela prepara melhor o caminho para:

- calculo de AC
- regras de mao ocupada
- restricoes de equipamento estilo BG3
