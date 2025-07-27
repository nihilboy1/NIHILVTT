# Documentação dos Schemas

DATA DRIVEN

Este documento fornece uma explicação detalhada dos schemas Zod usados neste projeto. Os schemas são usados para validar os dados de itens, ações e seus efeitos.

## Visão Geral dos Schemas

Os schemas estão organizados em vários arquivos, cada um com um propósito específico:

- **`primitives.ts`**: Contém os blocos de construção básicos, principalmente `enum`s do Zod, que são usados em outros arquivos de schema.
- **`blocks.schema.ts`**: Define schemas mais complexos e reutilizáveis que são compostos pelos primitivos.
- **`outcomes.schema.ts`**: Define os possíveis resultados das ações.
- **`actions.schema.ts`**: Define o schema para ações que podem ser executadas.
- **`effects.schema.ts`**: Define os schemas para vários efeitos que os itens podem ter.
- **`items.schema.ts`**: Define o schema principal para itens, que une muitos dos outros schemas.
- **`spells.schema.ts`**: Define o schema principal para magias, que também utiliza o sistema de `effects`.

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

### `MagicSchoolEnum`

Define as escolas de magia.

- `abjuration` (Abjuração)
- `conjuration` (Conjuração)
- `divination` (Adivinhação)
- `enchantment` (Encantamento)
- `evocation` (Evocação)
- `illusion` (Ilusão)
- `necromancy` (Necromancia)
- `transmutation` (Transmutação)

### `SpellComponentSchema`

Define os tipos de componentes necessários para conjurar uma magia.

- `verbal` (Verbal)
- `somatic` (Somático)
- `material` (Material)

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

### `DurationUnitEnum`

Define as unidades de duração para efeitos e magias.

- `round` (Rodada)
- `minute` (Minuto)
- `hour` (Hora)
- `day` (Dia)
- `turn` (Turno)
- `instantaneous` (Instantâneo)
- `special` (Especial)
- `unlimited` (Ilimitado)

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

### `DistanceUnitEnum`

Define as unidades de distância para alcance de magias e ações.

- `ft` (Pés)
- `mile` (Milhas)
- `self` (O alcance é o próprio lançador)
- `touch` (Alcance de toque)
- `special` (Para alcances especiais descritos no texto)
- `unlimited` (Alcance ilimitado)

### `AttackTypeEnum`

Define os tipos de ataque.

- `meleeWeaponAttack` (Ataque com arma corpo a corpo)
- `rangedWeaponAttack` (Ataque com arma à distância)
- `meleeSpellAttack` (Ataque com magia corpo a corpo)
- `rangedSpellAttack` (Ataque com magia à distância)
- `rangedItemAttack` (Ataque com item à distância)
- `meleeItemAttack` (Ataque com item corpo a corpo)

### `RechargeEventEnum`

Define os eventos que recarregam uma habilidade ou carga.

- `dawn` (Ao amanhecer)
- `dusk` (Ao anoitecer)
- `shortRest` (Após um descanso curto)
- `longRest` (Após um descanso longo)

### `ResourceCostIdEnum`

Define os IDs de recursos que podem ser consumidos como custo.

- `action` (Ação principal)
- `bonusAction` (Ação bônus)
- `reaction` (Reação)
- `itemCharge` (Carga do próprio item)
- `spellSlot` (Espaço de magia de um determinado nível)

### `ItemPropertyEnum`

Define propriedades específicas de itens.

- `pickLockDC` (Dificuldade para arrombar fechaduras)
- `burstDC` (Dificuldade para arrebentar com Força)

### `ActionIdEnum`

Define os IDs únicos para ações genéricas que podem ser referenciadas por itens ou magias.

- `action-throw-item` (Arremessar Item)
- `action-consume-item` (Consumir Item)
- `action-use-gear-area` (Usar Item em Área)
- `action-apply-poison` (Aplicar Veneno)
- `action-light-item` (Acender Item)
- `action-cover-lantern` (Cobrir Lanterna)
- `action-set-trap` (Armar Armadilha)
- `action-use-kit-charge` (Usar Carga de Kit)
- `action-cast-spell` (Conjurar Magia)

---

## `blocks.schema.ts`

Este arquivo define schemas mais complexos e reutilizáveis que são compostos a partir dos primitivos.

### `DcSchema`

Define a Classe de Dificuldade (CD) para um teste. Pode ser um número inteiro ou um objeto para cálculo.

- **Tipo:** `Union`
  - `number`: Um valor de CD fixo.
  - `object`: Um objeto para calcular a CD.
    - `base`: `number` - O valor base da CD.
    - `attributes`: `array` de `AbilityScoreEnum` ou `proficiency` ou `spellcasting` - Os atributos a serem somados à base. `spellcasting` é um literal genérico que será substituído pelo atributo de conjuração correto em tempo de execução.

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
  - `type: "attunement"`: Indica que o item requer sintonização.

### `DurationSchema`

Define a duração de um efeito ou magia.

- **Tipo:** `Object`
  - `unit`: `DurationUnitEnum` - A unidade de tempo da duração (ex: "round", "minute", "instantaneous").
  - `value`: `number` (opcional) - O valor numérico da duração, se aplicável (ex: 10 para "10 minutes"). Opcional para durações como "instantaneous" ou "special".

### `RangeSchema`

Define o alcance de uma ação ou magia.

- **Tipo:** `Object`
  - `normal`: `number` (opcional) - O alcance normal em unidades (ex: 60 para "60 ft"). Opcional para alcances como "self" ou "touch".
  - `long`: `number` (opcional) - O alcance longo (máximo) em unidades. Ataques neste alcance geralmente têm desvantagem.
  - `unit`: `DistanceUnitEnum` - A unidade de medida do alcance (ex: "ft", "mile", "self", "touch"). O padrão é "ft".

### `TargetSchema`

Define o alvo de uma ação ou magia. É uma união discriminada baseada no campo `type`.

- **Tipo:** `Discriminated Union`
  - `type: "self"`: O alvo é o próprio lançador.
  - `type: "touch"`: O alvo é uma criatura ou objeto tocado.
  - `type: "pointInSpace"`: O alvo é um ponto no espaço.
  - `type: "creature"`: O alvo é uma ou mais criaturas.
    - `quantity`: `number` (opcional) - A quantidade de criaturas afetadas. O padrão é 1.
  - `type: "object"`: O alvo é um ou mais objetos.
    - `quantity`: `number` (opcional) - A quantidade de objetos afetados. O padrão é 1.
  - `type: "descriptive"`: O alvo é descrito textualmente para casos complexos ou com condições especiais.
    - `text`: `string` - A descrição textual do alvo (ex: "fiend or undead", "humanoids only").

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
  - `id`: `string` (opcional) - Um identificador único para este resultado de dano, útil para referências em escalonamento de magia.
  - `type`: `literal("damage")` - O tipo de resultado.
  - `on`: `EffectOutcomeEnum` - Quando este resultado ocorre.
  - `formula`: `DamageFormulaSchema` - A fórmula para calcular o dano.

### `ApplyConditionOutcomeSchema`

Representa um resultado que aplica uma condição padrão.

- **Tipo:** `Object`
  - `type`: `literal("applyCondition")` - O tipo de resultado.
  - `on`: `EffectOutcomeEnum` - Quando este resultado ocorre.
  - `condition`: `ConditionEnum` - A condição a ser aplicada.
  - `duration`: `DurationSchema` (opcional) - A duração da condição.

### `ApplyCustomEffectOutcomeSchema`

Representa um resultado que aplica um efeito customizado ou temporário que não é uma condição padrão.

- **Tipo:** `Object`
  - `type`: `literal("applyCustomEffect")` - O tipo de resultado.
  - `on`: `EffectOutcomeEnum` - Quando este resultado ocorre.
  - `effect`: `string` - O nome do efeito customizado (ex: "oiled", "movementReduced").
  - `value`: `union` de `string`, `number`, `boolean` (opcional) - Um valor associado ao efeito.
  - `duration`: `DurationSchema` (opcional) - A duração do efeito.

### `CustomMechanicOutcomeSchema`

Representa um resultado com uma mecânica única que não se encaixa nas outras categorias.

- **Tipo:** `Object`
  - `type`: `literal("customMechanic")` - O tipo de resultado.
  - `on`: `EffectOutcomeEnum` - Quando este resultado ocorre.
  - `mechanic`: `string` - O nome da mecânica (ex: "stabilizeCreature", "grantAdvantage").
  - `details`: `record` (opcional) - Detalhes extras para a mecânica, um objeto onde as chaves são strings e os valores podem ser de qualquer tipo.

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
    - `cost`: `object` (opcional) - O custo de recurso para a ativação.
      - `amount`: `number` - A quantidade do recurso.
      - `source`: `enum` (`"item"`, `"character"`) - A origem do recurso (ex: do item ou do personagem).
      - `resourceId`: `ResourceCostIdEnum` - O ID do recurso consumido (ex: "action", "itemCharge").
    - `trigger`: `string` (opcional) - Uma descrição textual do gatilho da ação (ex: "quando você é atingido").
  - `attackType`: `AttackTypeEnum` (opcional) - O tipo de ataque (ex: "meleeWeaponAttack", "rangedSpellAttack").
  - `range`: `RangeSchema` (opcional) - O alcance da ação.
  - `area`: `AreaSchema` (opcional) - A área de efeito da ação.
  - `target`: `TargetSchema` (opcional) - O alvo da ação.
  - `save`: `object` (opcional) - O teste de resistência para resistir à ação.
    - `ability`: `AbilityScoreEnum` - A habilidade do teste.
    - `dc`: `DcSchema` - A Classe de Dificuldade.
  - `outcomes`: `array` de `ActionOutcomeSchema` (opcional) - Os resultados da ação.
  - `charges`: `object` (opcional) - Informações sobre cargas da ação, se aplicável.
    - `max`: `number` - O número máximo de cargas.
    - `recharge`: `object` (opcional) - Como as cargas são recarregadas.
      - `amount`: `string` - A quantidade recarregada (ex: "1d4").
      - `event`: `RechargeEventEnum` - O evento que aciona a recarga (ex: "dawn", "longRest").

### `FinalActionDataSchema`

Um array de `ActionSchema`.

- **Tipo:** `Array` de `ActionSchema`

---

## `effects.schema.ts`

Este arquivo define os schemas para vários efeitos que os itens podem ter. É uma união discriminada baseada no campo `type`.

### `SpellScalingRuleSchema`

Define uma regra para o escalonamento de dano de uma magia com base no nível do personagem ou no nível do espaço de magia.

- **Tipo:** `Object`
  - `level`: `number` - O nível (de personagem ou de espaço de magia) no qual esta regra de escalonamento se aplica.
  - `outcomeId`: `string` - O ID do resultado de dano (`DamageOutcomeSchema`) ao qual esta regra se refere.
  - `newFormula`: `DamageFormulaSchema` - A nova fórmula de dano a ser aplicada a partir deste nível.

### `SpellScalingSchema`

Define como o dano de uma magia escala com o nível. É uma união discriminada baseada no campo `type`.

- **Tipo:** `Discriminated Union`
  - `type: "characterLevel"`: O escalonamento é baseado no nível do personagem.
    - `rules`: `array` de `SpellScalingRuleSchema` - Um array de regras de escalonamento.
  - `type: "spellSlot"`: O escalonamento é baseado no nível do espaço de magia usado.
    - `rules`: `array` de `SpellScalingRuleSchema` - Um array de regras de escalonamento.

### `EffectSchema`

Uma união discriminada que representa um efeito que um item ou magia pode ter.

- **Tipo:** `Discriminated Union`
  - `type: "onEquip_setAC"`: Define a CA quando o item é equipado.
    - `calculation`: `AcSchema` - A fórmula ou valor da CA.
  - `type: "onEquip_imposeDisadvantage"`: Impõe desvantagem em um teste de perícia quando o item é equipado.
    - `on`: `literal("skillCheck")` - O tipo de teste afetado.
    - `skill`: `SkillEnum` - A perícia específica afetada (ex: "stealth").
  - `type: "onEquip_providesContainer"`: O item fornece um contêiner quando equipado.
    - `properties`: `object` - Propriedades do contêiner.
      - `capacity`: `object` - Capacidade de peso.
        - `value`: `number` - O valor da capacidade.
        - `unit`: `WeightUnitEnum` - A unidade de peso (ex: "lb").
      - `volume`: `object` (opcional) - Volume do contêiner.
        - `value`: `number` - O valor do volume.
        - `unit`: `string` - A unidade do volume (ex: "cubic_foot").
  - `type: "onWield_grantWeaponAttack"`: Concede um ataque de arma quando o item é empunhado.
    - `weaponCategory`: `WeaponCategoryEnum` - A categoria da arma (ex: "simple", "martial").
    - `weaponType`: `WeaponTypeEnum` - O tipo de arma (ex: "melee", "ranged").
    - `properties`: `array` de `WeaponPropertySchema` - Propriedades especiais da arma.
    - `mastery`: `array` de `WeaponMasteryEnum` - Maestrias da arma.
    - `damage`: `object` (opcional) - O dano do ataque.
      - `primary`: `DamageFormulaSchema` - A fórmula de dano principal.
      - `versatile`: `DamageFormulaSchema` (opcional) - Fórmula de dano para uso versátil (com duas mãos).
    - `range`: `RangeSchema` (opcional) - O alcance do ataque.
    - `outcomes`: `array` de `ActionOutcomeSchema` (opcional) - Resultados adicionais do ataque (ex: aplicar condição).
    - `cost`: `object` (opcional) - Custo para usar o ataque (ex: munição).
      - `amount`: `number` - Quantidade do custo.
      - `source`: `literal("inventory")` - A origem do custo (do inventário).
      - `resourceId`: `string` - O ID do recurso (ex: "arrow", "bolt").
  - `type: "passive_grantAdvantage"`: Concede vantagem passivamente.
    - `on`: `enum` (`"abilityCheck"`, `"skillCheck"`, `"savingThrow"`) - O tipo de teste onde a vantagem se aplica.
    - `ability`: `AbilityScoreEnum` (opcional) - A habilidade específica afetada.
    - `skill`: `SkillEnum` (opcional) - A perícia específica afetada.
    - `condition`: `string` (opcional) - Uma descrição da condição para a vantagem ser aplicada.
  - `type: "passive_providesLight"`: O item fornece luz passivamente.
    - `properties`: `object` - Propriedades da luz.
      - `bright`: `number` - Raio de luz brilhante em pés.
      - `dim`: `number` - Raio de luz penumbra em pés.
      - `duration`: `DurationSchema` (opcional) - Duração da luz.
  - `type: "passive_property"`: Concede uma propriedade passiva genérica.
    - `property`: `ItemPropertyEnum` - O nome da propriedade (ex: "pickLockDC", "burstDC").
    - `value`: `union` de `string`, `number`, `boolean` - O valor da propriedade.
  - `type: "activatableAction"`: O item permite uma ação ativável.
    - `actionId`: `ActionIdEnum` - O ID da ação genérica a ser usada (ex: "action-throw-item").
    - `parameters`: `ActionParametersSchema` (opcional) - Os parâmetros que customizam a ação para este item.
  - `type: "passive_grantBonus"`: Concede um bônus passivo.
    - `on`: `enum` (`"attackRoll"`, `"damageRoll"`, `"ac"`, `"savingThrow"`) - Onde o bônus se aplica.
    - `value`: `number` - O valor do bônus.
    - `condition`: `string` (opcional) - Condição para o bônus.
  - `type: "activatable_castSpell"`: O item ou magia permite conjurar uma magia.
    - `actionId`: `ActionIdEnum` - O ID da ação genérica de conjurar magia (ex: "action-cast-spell").
    - `parameters`: `ActionParametersSchema` - Os parâmetros que customizam a conjuração da magia.
    - `scaling`: `SpellScalingSchema` (opcional) - Regras de escalonamento de dano da magia.

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
  - `requiresAttunement`: `boolean` (opcional) - Indica se o item requer sintonização para que seus efeitos mágicos funcionem. O padrão é `false`.
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

---

## `spells.schema.ts`

Este arquivo define o schema para magias. Similar aos itens, uma magia é um contêiner para um ou mais `effects`. A ação de "conjurar magia" é o efeito mais comum.

### `SpellSchema`

O schema principal para magias.

- **Tipo:** `Object`
  - `id`: `string` - Um identificador único para a magia.
  - `name`: `string` - O nome da magia.
  - `description`: `string` - A descrição textual da magia, como encontrada no livro de regras.
  - `source`: `SourceEnum` - A fonte da magia (ex: "LDJ2024").
  - `page`: `number` - O número da página na fonte.
  - `level`: `number` - O nível da magia, de 0 (truque) a 9.
  - `school`: `MagicSchoolEnum` - A escola de magia (ex: "evocation", "transmutation").
  - `components`: `object` - Os componentes necessários para conjurar a magia.
    - `types`: `array` de `SpellComponentSchema` - Um array com os tipos de componentes (ex: "verbal", "somatic").
    - `material`: `string` (opcional) - A descrição dos componentes materiais, se houver.
  - `duration`: `DurationSchema` - A duração da magia (ex: "instantaneous", "1 minute").
  - `effects`: `array` de `EffectSchema` - O coração da magia, definindo o que ela faz. Geralmente conterá um efeito principal do tipo `activatable_castSpell`.

### `FinalSpellDataSchema`

Um array de `SpellSchema`.

- **Tipo:** `Array` de `SpellSchema`
