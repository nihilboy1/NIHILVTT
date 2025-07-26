# Documentação dos Schemas

Este documento fornece uma explicação detalhada dos schemas Zod usados neste projeto. Os schemas são usados para validar os dados de itens, ações e seus efeitos.

## Visão Geral dos Schemas

Os schemas estão organizados em vários arquivos, cada um com um propósito específico:

- **`primitives.ts`**: Contém os blocos de construção básicos, principalmente `enum`s do Zod, que são usados em outros arquivos de schema.
- **`blocks.schema.ts`**: Define schemas mais complexos e reutilizáveis que são compostos pelos primitivos.
- **`outcomes.schema.ts`**: Define os possíveis resultados das ações.
- **`actions.schema.ts`**: Define o schema para ações que podem ser executadas.
- **`effects.schema.ts`**: Define os schemas para vários efeitos que os itens podem ter.
- **`items.schema.ts`**: Define o schema principal para itens, que une muitos dos outros schemas.

---

## `primitives.ts`

Este arquivo contém os blocos de construção básicos para os outros schemas.

### `AbilityScoreEnum`

Define os possíveis valores de habilidade.

- `strength` (Força)
- `dexterity` (Destreza)
- `constitution` (Constituição)
- `intelligence` (Inteligência)
- `wisdom` (Sabedoria)
- `charisma` (Carisma)

### `SkillEnum`

Define as possíveis perícias.

- `acrobatics` (Acrobacia)
- `animalHandling` (Adestrar Animais)
- `arcana` (Arcanismo)
- `athletics` (Atletismo)
- `deception` (Enganação)
- `history` (História)
- `insight` (Intuição)
- `intimidation` (Intimidação)
- `investigation` (Investigação)
- `medicine` (Medicina)
- `nature` (Natureza)
- `perception` (Percepção)
- `performance` (Atuação)
- `persuasion` (Persuasão)
- `religion` (Religião)
- `sleightOfHand` (Prestidigitação)
- `stealth` (Furtividade)
- `survival` (Sobrevivência)

### `RarityEnum`

Define as possíveis raridades de itens.

- `none` (Nenhuma)
- `common` (Comum)
- `uncommon` (Incomum)
- `rare` (Raro)
- `veryRare` (Muito Raro)
- `legendary` (Lendário)
- `artifact` (Artefato)

### `ConditionEnum`

Define as possíveis condições.

- `blinded` (Cego)
- `charmed` (Enfeitiçado)
- `deafened` (Ensurdecido)
- `frightened` (Amedrontado)
- `grappled` (Agarrado)
- `incapacitated` (Incapacitado)
- `invisible` (Invisível)
- `paralyzed` (Paralisado)
- `petrified` (Petrificado)
- `poisoned` (Envenenado)
- `prone` (Caído)
- `restrained` (Contido)
- `stunned` (Atordoado)
- `unconscious` (Inconsciente)

### `SourceEnum`

Define a fonte dos dados.

- `LDJ2024`

### `DamageTypeEnum`

Define os tipos de dano.

- `slashing` (Cortante)
- `piercing` (Perfurante)
- `bludgeoning` (Concussão)
- `poison` (Veneno)
- `acid` (Ácido)
- `fire` (Fogo)
- `cold` (Frio)
- `radiant` (Radiante)
- `necrotic` (Necrótico)
- `lightning` (Elétrico)
- `thunder` (Trovão)
- `force` (Força)
- `psychic` (Psíquico)

### `ActionTypeEnum`

Define os tipos de ações.

- `action` (Ação)
- `bonusAction` (Ação Bônus)
- `reaction` (Reação)
- `free` (Livre)
- `special` (Especial)

### `EffectOutcomeEnum`

Define quando um resultado de efeito ocorre.

- `fail` (Falha)
- `success` (Sucesso)
- `hit` (Atinge)
- `miss` (Erra)

### `CostUnitEnum`

Define as unidades de custo.

- `CooperPiece` (Peça de Cobre)
- `SilverPiece` (Peça de Prata)
- `GoldPiece` (Peça de Ouro)
- `PlatinumPiece` (Peça de Platina)

### `ArmorTypeEnum`

Define os tipos de armadura.

- `light` (Leve)
- `medium` (Média)
- `heavy` (Pesada)
- `shield` (Escudo)

### `WeaponPropertyEnum`

Define as propriedades das armas.

- `versatile` (Versátil)
- `finesse` (Acuidade)
- `thrown` (Arremesso)
- `ammunition` (Munição)
- `heavy` (Pesada)
- `loading` (Recarga)
- `reach` (Alcance)
- `twoHanded` (Duas Mãos)
- `light` (Leve)

### `WeaponMasteryEnum`

Define as maestrias de armas.

- `topple` (Derrubar)
- `sap` (Minar)
- `vex` (Incomodar)
- `slow` (Lento)
- `push` (Empurrar)
- `nick` (entalhe)
- `graze` (Arranhão)
- `cleave` (Cutilada)

### `WeaponCategoryEnum`

Define as categorias de armas.

- `simple` (Simples)
- `martial` (Marcial)

### `WeaponTypeEnum`

Define os tipos de armas.

- `melee` (Corpo a Corpo)
- `ranged` (À Distância)

### `WeightUnitEnum`

Define as unidades de peso.

- `lb` (libras)

---

## `blocks.schema.ts`

Este arquivo define schemas mais complexos e reutilizáveis que são compostos a partir dos primitivos.

### `DcSchema`

Define a Classe de Dificuldade (CD) para um teste. Pode ser um número inteiro ou um objeto para cálculo.

- **Tipo:** `Union`
  - `number`: Um valor de CD fixo.
  - `object`: Um objeto para calcular a CD.
    - `base`: `number` - O valor base da CD.
    - `attributes`: `array` de `AbilityScoreEnum` ou `proficiency` - Os atributos a serem somados à base.

### `DamageFormulaSchema`

Define uma fórmula de dano.

- **Tipo:** `Object`
  - `dice`: `string` - A fórmula do dado (ex: "1d6", "2d8").
  - `damageType`: `DamageTypeEnum` - O tipo de dano.
  - `bonus`: `number` (opcional) - Um bônus fixo para o dano.

### `AcSchema`

Define a Classe de Armadura (CA). É uma união discriminada baseada no campo `calculation`.

- **Tipo:** `Discriminated Union`
  - `calculation: "base"`
    - `value`: `number` - Um valor de CA fixo.
  - `calculation: "bonus"`
    - `value`: `number` - Um bônus para a CA.
  - `calculation: "formula"`
    - `base`: `number` - O valor base da CA.
    - `attribute`: `AbilityScoreEnum` - O atributo a ser somado à base.
    - `maxBonus`: `number` (opcional) - O bônus máximo do atributo.

### `WeaponPropertySchema`

Define uma propriedade de arma.

- **Tipo:** `Union`
  - `WeaponPropertyEnum`: Uma propriedade de arma padrão.
  - `object`: Uma propriedade de arma customizada.
    - `name`: `string` - O nome da propriedade.
    - `condition`: `string` - A condição para a propriedade ser aplicada.

### `AreaSchema`

Define uma área de efeito para uma ação ou magia. É uma união discriminada baseada na forma (`shape`).

- **Tipo:** `Discriminated Union`
  - `shape: "sphere"`
    - `radius`: `number` - O raio da esfera.
  - `shape: "cube"`
    - `size`: `number` - O tamanho do lado do cubo.
  - `shape: "cone"`
    - `length`: `number` - O comprimento do cone.
  - `shape: "line"`
    - `length`: `number` - O comprimento da linha.
    - `width`: `number` - A largura da linha.

### `RequirementSchema`

Define um requisito para usar um item. É uma união discriminada baseada no campo `type`.

- **Tipo:** `Discriminated Union`
  - `type: "attribute"`
    - `attribute`: `AbilityScoreEnum` - O atributo requerido.
    - `value`: `number` - O valor mínimo do atributo.
  - `type: "ancestry"`
    - `ancestry`: `string` - A ascendência requerida.
  - `type: "level"`
    - `value`: `number` - O nível mínimo requerido.

---

## `outcomes.schema.ts`

Este arquivo define os possíveis resultados de uma ação.

### `NoneOutcomeSchema`

Representa um resultado que não tem efeito específico.

- **Tipo:** `Object`
  - `on`: `EffectOutcomeEnum` - Quando este resultado ocorre (ex: `success`, `fail`).
  - `type`: `literal("none")` - O tipo de resultado.

### `DamageOutcomeSchema`

Representa um resultado que causa dano.

- **Tipo:** `Object`
  - `type`: `literal("damage")` - O tipo de resultado.
  - `on`: `EffectOutcomeEnum` - Quando este resultado ocorre.
  - `formula`: `DamageFormulaSchema` - A fórmula para calcular o dano.

### `ApplyConditionOutcomeSchema`

Representa um resultado que aplica uma condição padrão.

- **Tipo:** `Object`
  - `type`: `literal("applyCondition")` - O tipo de resultado.
  - `on`: `EffectOutcomeEnum` - Quando este resultado ocorre.
  - `condition`: `ConditionEnum` - A condição a ser aplicada.
  - `duration`: `object` (opcional) - A duração da condição.
    - `value`: `number` - O valor da duração.
    - `unit`: `string` - A unidade da duração (ex: "rounds", "minutes").

### `ApplyCustomEffectOutcomeSchema`

Representa um resultado que aplica um efeito customizado ou temporário que não é uma condição padrão.

- **Tipo:** `Object`
  - `type`: `literal("applyCustomEffect")` - O tipo de resultado.
  - `on`: `EffectOutcomeEnum` - Quando este resultado ocorre.
  - `effect`: `string` - O nome do efeito customizado (ex: "oiled", "movementReduced").
  - `value`: `union` de `string`, `number`, `boolean` (opcional) - Um valor associado ao efeito.
  - `duration`: `object` (opcional) - A duração do efeito.
    - `value`: `number` - O valor da duração.
    - `unit`: `string` - A unidade da duração.

### `CustomMechanicOutcomeSchema`

Representa um resultado com uma mecânica única que não se encaixa nas outras categorias.

- **Tipo:** `Object`
  - `type`: `literal("customMechanic")` - O tipo de resultado.
  - `on`: `EffectOutcomeEnum` - Quando este resultado ocorre.
  - `mechanic`: `string` - O nome da mecânica (ex: "stabilizeCreature", "grantAdvantage").
  - `details`: `record` (opcional) - Detalhes extras para a mecânica.

### `ActionOutcomeSchema`

Uma união discriminada que representa qualquer tipo de resultado de ação.

- **Tipo:** `Discriminated Union`
  - `DamageOutcomeSchema`
  - `ApplyConditionOutcomeSchema`
  - `ApplyCustomEffectOutcomeSchema`
  - `CustomMechanicOutcomeSchema`
  - `NoneOutcomeSchema`

---

## `actions.schema.ts`

Este arquivo define a estrutura de ações e seus parâmetros. A separação entre a _definição_ de uma ação e seus _parâmetros_ permite que ações genéricas sejam customizadas por itens.

### `ActionSchema`

Define uma ação genérica, funcionando como um "verbo". Contém apenas informações de identificação.

- **Tipo:** `Object`
  - `id`: `string` - Um identificador único para a ação (ex: "throw", "drink").
  - `name`: `string` - O nome da ação (ex: "Arremessar", "Beber").
  - `description`: `string` (opcional) - Uma breve descrição da ação.

### `ActionParametersSchema`

Define os parâmetros que um item pode passar para uma ação, especificando _como_ a ação funciona.

- **Tipo:** `Object`
  - `activation`: `object` (opcional) - Custo de ativação.
    - `type`: `ActionTypeEnum` - O tipo de ação (ex: "action", "bonusAction").
    - `price`: `string` - O custo específico (ex: "1").
  - `attackType`: `string` (opcional) - O tipo de ataque (ex: "melee", "ranged").
  - `range`: `object` (opcional) - O alcance da ação.
    - `value`: `number` - O valor do alcance.
    - `unit`: `string` - A unidade do alcance (ex: "feet").
  - `area`: `AreaSchema` (opcional) - A área de efeito da ação.
  - `target`: `string` (opcional) - O alvo da ação (ex: "uma criatura", "ponto no espaço").
  - `save`: `object` (opcional) - O teste de resistência para resistir à ação.
    - `ability`: `AbilityScoreEnum` - A habilidade do teste.
    - `dc`: `DcSchema` - A Classe de Dificuldade.
  - `effects`: `array` de `ActionOutcomeSchema` (opcional) - Os resultados da ação.

### `FinalActionDataSchema`

Um array de `ActionSchema`.

- **Tipo:** `Array` de `ActionSchema`

---

## `effects.schema.ts`

Este arquivo define os schemas para vários efeitos que os itens podem ter. É uma união discriminada baseada no campo `type`.

### `EffectSchema`

Uma união discriminada que representa um efeito que um item pode ter.

- **Tipo:** `Discriminated Union`
  - `type: "onEquip_setAC"`: Define a CA quando o item é equipado.
    - `calculation`: `AcSchema` - A fórmula ou valor da CA.
  - `type: "onEquip_imposeDisadvantage"`: Impõe desvantagem em um teste de perícia quando o item é equipado.
    - `on`: `literal("skillCheck")` - O tipo de teste afetado.
    - `skill`: `literal("stealth")` - A perícia específica afetada.
  - `type: "onEquip_providesContainer"`: O item fornece um contêiner quando equipado.
    - `properties`: `object` - Propriedades do contêiner.
      - `capacity`: `object` - Capacidade de peso.
      - `volume`: `object` (opcional) - Volume do contêiner.
  - `type: "onWield_grantWeaponAttack"`: Concede um ataque de arma quando o item é empunhado.
    - `weaponCategory`: `WeaponCategoryEnum`
    - `weaponType`: `WeaponTypeEnum`
    - `properties`: `array` de `WeaponPropertySchema`
    - `mastery`: `array` de `WeaponMasteryEnum`
    - `damage`: `object` - O dano do ataque.
    - `range`: `string` (opcional) - O alcance do ataque.
  - `type: "passive_grantAdvantage"`: Concede vantagem passivamente.
    - `on`: `enum` (`"abilityCheck"`, `"skillCheck"`, `"savingThrow"`)
    - `ability`: `AbilityScoreEnum` (opcional)
    - `skill`: `SkillEnum` (opcional)
    - `condition`: `string` (opcional) - Condição para a vantagem.
  - `type: "passive_providesLight"`: O item fornece luz passivamente.
    - `properties`: `object` - Propriedades da luz.
  - `type: "passive_property"`: Concede uma propriedade passiva genérica.
    - `property`: `string` - O nome da propriedade.
    - `value`: `union` de `string`, `number`, `boolean` - O valor da propriedade.
  - `type: "passive_grantBonus"`: Concede um bônus passivo.
    - `on`: `enum` (`"attackRoll"`, `"damageRoll"`, `"ac"`, `"savingThrow"`) - Onde o bônus se aplica.
    - `value`: `number` - O valor do bônus.
    - `condition`: `string` (opcional) - Condição para o bônus.
  - `type: "activatableAction"`: O item permite uma ação ativável.
    - `actionId`: `string` - O ID da ação genérica a ser usada.
    - `parameters`: `ActionParametersSchema` (opcional) - Os parâmetros que customizam a ação para este item.

---

## `items.schema.ts`

Este arquivo define o schema principal para itens, que une muitos dos outros schemas.

### `BaseItemSchema`

O schema base para todos os tipos de itens.

- **Tipo:** `Object`
  - `id`: `string` - Um identificador único para o item.
  - `name`: `string` - O nome do item.
  - `source`: `SourceEnum` - A fonte do item.
  - `page`: `number` - O número da página onde o item pode ser encontrado na fonte.
  - `type`: `string` - O tipo de item (será literalizado em schemas estendidos).
  - `rarity`: `RarityEnum` - A raridade do item.
  - `description`: `string` (opcional) - Uma descrição do item.
  - `weight`: `object` - O peso do item.
  - `price`: `object` (opcional) - O preço do item.
  - `requirements`: `array` de `RequirementSchema` (opcional) - Requisitos para usar o item.
  - `effects`: `array` de `EffectSchema` - Os efeitos que o item possui.

### `GearItemSchema`

Schema para itens do tipo "gear" (equipamento geral). Estende `BaseItemSchema`.

- **Tipo:** `Object`
  - `type`: `literal("gear")`

### `ToolItemSchema`

Schema para itens do tipo "tool" (ferramenta). Estende `BaseItemSchema`.

- **Tipo:** `Object`
  - `type`: `literal("tool")`

### `ArmorItemSchema`

Schema para itens do tipo "armor" (armadura). Estende `BaseItemSchema` e adiciona `armorType`.

- **Tipo:** `Object`
  - `type`: `literal("armor")`
  - `armorType`: `ArmorTypeEnum` - O tipo de armadura.

### `WeaponItemSchema`

Schema para itens do tipo "weapon" (arma). Estende `BaseItemSchema`.

- **Tipo:** `Object`
  - `type`: `literal("weapon")`

### `ItemSchema`

Uma união discriminada que representa qualquer tipo de item.

- **Tipo:** `Discriminated Union`
  - `GearItemSchema`
  - `ToolItemSchema`
  - `WeaponItemSchema`
  - `ArmorItemSchema`

### `FinalItemDataSchema`

Um array de `ItemSchema`.

- **Tipo:** `Array` de `ItemSchema`
