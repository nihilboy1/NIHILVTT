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

- `copper` (Peça de Cobre)
- `silver` (Peça de Prata)
- `gold` (Peça de Ouro)
- `platinum` (Peça de Platina)

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
- `special` (Especial)

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

### `CreatureTypeEnum`

Define os tipos de criaturas.

- `aberration` (Aberração)
- `beast` (Besta)
- `celestial` (Celestial)
- `construct` (Constructo)
- `dragon` (Dragão)
- `elemental` (Elemental)
- `fey` (Fada)
- `fiend` (Corruptor)
- `giant` (Gigante)
- `humanoid` (Humanoide)
- `monstrosity` (Monstruosidade)
- `ooze` (Limo)
- `plant` (Planta)
- `undead` (Morto-Vivo)

### `BaseConditionEnum`

Define as condições básicas que podem ser aplicadas a criaturas.

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

### `PseudoConditionEnum`

Define condições temporárias ou de ambiente que podem afetar criaturas.

- `inflamable` (Inflamável)
- `wet` (Molhado)
- `frozen` (Congelado)
- `burning` (Em Chamas)

### `ReactionTriggerEnum`

Define os gatilhos para reações.

- `targetEntersReach` (Alvo entra no alcance)
- `targetLeavesReach` (Alvo sai do alcance)
- `allyIsHit` (Aliado é atingido)
- `selfIsDamaged` (Próprio é danificado)

### `ItemTypeEnum`

Define os tipos gerais de itens.

- `gear` (Equipamento Geral)
- `tool` (Ferramenta)
- `weapon` (Arma)
- `armor` (Armadura)

### `ScalablePropertyEnum`

Define as propriedades que podem ser escalonadas em efeitos.

- `dice` (Dado de rolagem)
- `bonus` (Bônus numérico)
- `value` (Valor numérico genérico)
- `radius` (Raio de uma área)
- `length` (Comprimento de uma área)

### `SurfaceTypeEnum`

Define os tipos de superfícies ativas no ambiente.

- `fire` (Fogo)
- `ice` (Gelo)
- `acid` (Ácido)
- `grease` (Graxa)
- `water` (Água)
- `web` (Teia)
- `darkness` (Escuridão)

### `SurfaceTriggerEnum`

Define os gatilhos para efeitos de superfície.

- `onEnterArea` (Ao entrar na área)
- `onStartTurnInArea` (Ao iniciar o turno na área)
- `onEndTurnInArea` (Ao terminar o turno na área)

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

### `DiceRollSchema`

Define uma rolagem de dados.

- **Tipo:** `Object`
  - `count`: `number` - A quantidade de dados a serem rolados (ex: 1 para "1d6").
  - `faces`: `number` - O número de faces do dado (ex: 6 para "1d6").
  - `bonus`: `number` (opcional) - Um bônus fixo a ser adicionado ao resultado da rolagem.
  - `explodesOn`: `number` (opcional) - O valor no qual o dado "explode" (rola novamente e adiciona o resultado).
  - `explodeLimit`: `number` ou `literal("spellcastingModifier")` (opcional) - O limite de vezes que um dado pode explodir.

### `DamageFormulaSchema`

Define uma fórmula de dano.

- **Tipo:** `Union`
  - `BaseDamageFormulaSchema`: Uma fórmula de dano básica.
  - `ConditionalDamageFormulaSchema`: Uma fórmula de dano que se aplica sob uma condição específica.

### `BaseDamageFormulaSchema`

Define uma fórmula de dano ou cura básica.

- **Tipo:** `Discriminated Union`
  - `type: "damage"`: Causa dano.
    - `roll`: `DiceRollSchema` (opcional) - A rolagem de dados para o dano.
    - `fixed`: `number` (opcional) - Um valor de dano fixo.
    - `damageTypeOptions`: `array` de `DamageTypeEnum` - Os tipos de dano possíveis.
  - `type: "healing"`: Causa cura.
    - `roll`: `DiceRollSchema` (opcional) - A rolagem de dados para a cura.
    - `fixed`: `number` (opcional) - Um valor de cura fixo.

### `ConditionalDamageFormulaSchema`

Define uma fórmula de dano que se aplica sob uma condição específica.

- **Tipo:** `Object`
  - `condition`: `literal("targetIsWounded")` - A condição para aplicar esta fórmula (ex: "o alvo está ferido").
  - `ifTrue`: `BaseDamageFormulaSchema` - A fórmula de dano se a condição for verdadeira.
  - `ifFalse`: `BaseDamageFormulaSchema` - A fórmula de dano se a condição for falsa.

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

### `HPFormulaSchema`

Define uma fórmula para calcular pontos de vida (HP).

- **Tipo:** `Object`
  - `roll`: `DiceRollSchema` (opcional) - A rolagem de dados para o HP.
  - `fixed`: `number` (opcional) - Um valor fixo de HP.
  - `addSpellcastingModifier`: `boolean` (opcional) - Indica se o modificador de atributo de conjuração deve ser adicionado.

### `RangeSchema`

Define o alcance de uma ação ou magia.

- **Tipo:** `Object`
  - `normal`: `number` (opcional) - O alcance normal em unidades (ex: 60 para "60 ft"). Opcional para alcances como "self" ou "touch".
  - `long`: `number` (opcional) - O alcance longo (máximo) em unidades. Ataques neste alcance geralmente têm desvantagem.
  - `unit`: `DistanceUnitEnum` - A unidade de medida do alcance (ex: "ft", "mile"). O padrão é "ft".

### `TargetSchema`

Define o alvo de uma ação ou magia. É uma união discriminada baseada no campo `type`.

- **Tipo:** `Discriminated Union`
  - `type: "self"`: O alvo é o próprio lançador.
  - `type: "pointInSpace"`: O alvo é um ponto no espaço.
  - `type: "selfArea"`: O alvo é uma área centrada no próprio lançador.
  - `type: "creature"`: O alvo é uma ou mais criaturas.
    - `quantity`: `number` (opcional) - A quantidade de criaturas afetadas. O padrão é 1.
  - `type: "object"`: O alvo é um ou mais objetos.
    - `quantity`: `number` (opcional) - A quantidade de objetos afetados. O padrão é 1.
  - `type: "descriptive"`: O alvo é descrito textualmente para casos complexos ou com condições especiais.
    - `details`: `string` - A descrição textual do alvo (ex: "fiend or undead", "humanoids only").

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

### `SpellRequirementsSchema`

Define os requisitos para conjurar uma magia.

- **Tipo:** `Object`
  - `casterConditions`: `array` de `CasterConditionSchema` (opcional) - Condições que o conjurador deve atender.
  - `targetConditions`: `array` de `TargetConditionSchema` (opcional) - Condições que o alvo deve atender.

### `CasterEquippedItemSchema`

Define um requisito de item equipado para o conjurador.

- **Tipo:** `Object`
  - `type`: `literal("equippedItem")`
  - `itemIds`: `array` de `string` - IDs dos itens que devem estar equipados.
  - `details`: `string` (opcional) - Descrição adicional.

### `CasterProficientWithEquippedWeaponSchema`

Define um requisito de proficiência com arma equipada para o conjurador.

- **Tipo:** `Object`
  - `type`: `literal("beProficientWithEquippedWeapon")`
  - `details`: `string` (opcional) - Descrição adicional.

### `CasterConditionSchema`

Uma união discriminada que representa as condições que o conjurador deve atender.

- **Tipo:** `Discriminated Union`
  - `CasterEquippedItemSchema`
  - `CasterProficientWithEquippedWeaponSchema`

### `TargetHasZeroHPSchema`

Define uma condição de alvo com 0 HP.

- **Tipo:** `Object`
  - `type`: `literal("hasZeroHP")`
  - `details`: `string` (opcional) - Descrição adicional.

### `TargetIsCreatureType`

Define uma condição de alvo ser de um tipo de criatura específico.

- **Tipo:** `Object`
  - `type`: `literal("isCreatureType")`
  - `creatureType`: `CreatureTypeEnum` - O tipo de criatura requerido.
  - `details`: `string` (opcional) - Descrição adicional.

### `TargetConditionSchema`

Uma união discriminada que representa as condições que o alvo deve atender.

- **Tipo:** `Discriminated Union`
  - `TargetHasZeroHPSchema`
  - `TargetIsCreatureType`

### `WeaponPropertySchema`

Define uma propriedade de arma.

- **Tipo:** `Object`
  - `property`: `array` de `WeaponPropertyEnum` - As propriedades da arma.
  - `condition`: `string` (opcional) - A condição para a propriedade ser aplicada.

### `AreaSchema`

Define uma área de efeito para uma ação ou magia. É uma união discriminada baseada na forma (`shape`).

- **Tipo:** `Discriminated Union`
  - `shape: "sphere"`
    - `radius`: `number` - O raio da esfera.
    - `unit`: `DistanceUnitEnum` - A unidade de medida (ex: "ft").
  - `shape: "cube"`
    - `size`: `number` - O tamanho do lado do cubo.
    - `unit`: `DistanceUnitEnum` - A unidade de medida (ex: "ft").
  - `shape: "cone"`
    - `length`: `number` - O comprimento do cone.
    - `unit`: `DistanceUnitEnum` - A unidade de medida (ex: "ft").
  - `shape: "line"`
    - `length`: `number` - O comprimento da linha.
    - `width`: `number` - A largura da linha.
    - `unit`: `DistanceUnitEnum` - A unidade de medida (ex: "ft").

### `DurationSchema`

Define a duração de um efeito ou magia.

- **Tipo:** `Object`
  - `unit`: `DurationUnitEnum` - A unidade de tempo da duração (ex: "round", "minute", "instantaneous").
  - `value`: `number` (opcional) - O valor numérico da duração, se aplicável (ex: 10 para "10 minutes"). Opcional para durações como "instantaneous" ou "special".
  - `isConcentration`: `boolean` (opcional) - Indica se a duração requer concentração. O padrão é `false`.

### `AdditionalRulesSchema`

Define regras adicionais puramente textuais para um efeito ou magia.

- **Tipo:** `Object`
  - `id`: `string` - Um identificador único para a regra.
  - `details`: `string` - A descrição detalhada da regra.

---

## `outcomes.schema.ts`

Este arquivo define os possíveis resultados de uma ação.

### `NoneOutcomeSchema`

Representa um resultado que não tem efeito específico.

- **Tipo:** `Object`
  - `id`: `string` (opcional) - Um identificador único para este resultado.
  - `on`: `EffectOutcomeEnum` - Quando este resultado ocorre (ex: `success`, `fail`, `custom`).
  - `type`: `literal("none")` - O tipo de resultado.

### `DamageOutcomeSchema`

Representa um resultado que causa dano.

- **Tipo:** `Object`
  - `id`: `string` (opcional) - Um identificador único para este resultado de dano, útil para referências em escalonamento de magia.
  - `type`: `literal("damage")` - O tipo de resultado.
  - `on`: `EffectOutcomeEnum` - Quando este resultado ocorre.
  - `formula`: `DamageFormulaSchema` - A fórmula para calcular o dano.

### `MoveTargetOutcomeSchema`

Representa um resultado que move o alvo.

- **Tipo:** `Object`
  - `id`: `string` (opcional) - Um identificador único para este resultado.
  - `type`: `literal("moveTarget")` - O tipo de resultado.
  - `on`: `EffectOutcomeEnum` - Quando este resultado ocorre.
  - `direction`: `enum` (`"towards"`, `"away"`) - A direção do movimento (para perto ou para longe).
  - `distance`: `object` - A distância do movimento.
    - `value`: `number` - O valor da distância.
    - `unit`: `DistanceUnitEnum` - A unidade de medida da distância.
  - `allowedSizes`: `array` de `CreatureSizeEnum` (opcional) - Tamanhos de criaturas que podem ser afetadas.

### `ModifyHPOutcomeSchema`

Representa um resultado que modifica os pontos de vida (HP) do alvo.

- **Tipo:** `Object`
  - `id`: `string` (opcional) - Um identificador único para este resultado.
  - `type`: `literal("modifyHP")` - O tipo de resultado.
  - `on`: `EffectOutcomeEnum` - Quando este resultado ocorre.
  - `vitals`: `array` de `enum` (`"maxHp"`, `"currentHp"`, `"tempHp"`) - Quais tipos de HP serão modificados.
  - `operation`: `enum` (`"add"`, `"subtract"`, `"set"`) - A operação a ser realizada (adicionar, subtrair, definir).
  - `formula`: `HPFormulaSchema` - A fórmula para calcular o valor da modificação.

### `ApplyConditionOutcomeSchema`

Representa um resultado que aplica uma condição padrão.

- **Tipo:** `Object`
  - `id`: `string` (opcional) - Um identificador único para este resultado.
  - `type`: `literal("applyCondition")` - O tipo de resultado.
  - `on`: `EffectOutcomeEnum` - Quando este resultado ocorre.
  - `condition`: `ConditionEnum` - A condição a ser aplicada.
  - `duration`: `DurationSchema` (opcional) - A duração da condição.

### `DescriptiveOutcomeSchema`

Representa um resultado que é puramente descritivo, sem mecânica automatizável.

- **Tipo:** `Object`
  - `id`: `string` (opcional) - Um identificador único para este resultado.
  - `type`: `literal("descriptive")` - O tipo de resultado.
  - `on`: `EffectOutcomeEnum` - Quando este resultado ocorre.
  - `details`: `string` - A descrição textual do resultado.

### `CustomMechanicOutcomeSchema`

Representa um resultado com uma mecânica única que não se encaixa nas outras categorias.

- **Tipo:** `Object`
  - `id`: `string` (opcional) - Um identificador único para este resultado.
  - `type`: `literal("customMechanic")` - O tipo de resultado.
  - `on`: `EffectOutcomeEnum` - Quando este resultado ocorre.
  - `mechanic`: `string` - O nome da mecânica (ex: "stabilizeCreature", "grantAdvantage").
  - `details`: `any` (opcional) - Detalhes extras para a mecânica, um objeto onde as chaves são strings e os valores podem ser de qualquer tipo.

### `ApplyCustomEffectOutcomeSchema`

Representa um resultado que aplica um efeito customizado ou temporário que não é uma condição padrão.

- **Tipo:** `Object`
  - `id`: `string` (opcional) - Um identificador único para este resultado.
  - `type`: `literal("applyCustomEffect")` - O tipo de resultado.
  - `on`: `EffectOutcomeEnum` - Quando este resultado ocorre.
  - `effect`: `string` - O nome do efeito customizado (ex: "oiled", "movementReduced").
  - `value`: `number` (opcional) - Um valor associado ao efeito.

### `ApplyEffectOutcomeSchema`

Representa um resultado que aplica um `EffectSchema` completo a um alvo.

- **Tipo:** `Object`
  - `id`: `string` (opcional) - Um identificador único para este resultado.
  - `type`: `literal("applyEffect")` - O tipo de resultado.
  - `on`: `EffectOutcomeEnum` - Quando este resultado ocorre.
  - `effect`: `ApplicableEffectType` - O schema do efeito a ser aplicado.

### `SummonTokenOutcomeSchema`

Representa um resultado que invoca um token (criatura ou objeto) no campo de batalha.

- **Tipo:** `Object`
  - `id`: `string` (opcional) - Um identificador único para este resultado.
  - `type`: `literal("summonToken")` - O tipo de resultado.
  - `on`: `EffectOutcomeEnum` - Quando este resultado ocorre.
  - `token`: `object` - Detalhes do token a ser invocado.
    - `name`: `string` - O nome do token.
    - `quantity`: `number` - A quantidade de tokens a invocar.
    - `effects`: `array` de `EffectSchema` - Efeitos que o token invocado possui.
  - `duration`: `DurationSchema` (opcional) - A duração da invocação.

### `ModifyAttributeOutcomeSchema`

Representa um resultado que modifica um atributo específico do alvo.

- **Tipo:** `Object`
  - `id`: `string` (opcional) - Um identificador único para este resultado.
  - `type`: `literal("modifyAttribute")` - O tipo de resultado.
  - `on`: `EffectOutcomeEnum` - Quando este resultado ocorre.
  - `attribute`: `enum` (`"speed"`) - O atributo a ser modificado.
  - `operation`: `enum` (`"add"`, `"subtract"`) - A operação a ser realizada.
  - `value`: `number` - O valor da modificação.
  - `duration`: `DurationSchema` - A duração da modificação.

### `BaseActionOutcomesSchema`

Uma união discriminada que representa os resultados básicos de uma ação.

- **Tipo:** `Discriminated Union`
  - `NoneOutcomeSchema`
  - `DamageOutcomeSchema`
  - `ModifyHPOutcomeSchema`
  - `ApplyConditionOutcomeSchema`
  - `DescriptiveOutcomeSchema`
  - `CustomMechanicOutcomeSchema`
  - `ApplyCustomEffectOutcomeSchema`

### `ActionOutcomeSchema`

Uma união discriminada que representa qualquer tipo de resultado de ação.

- **Tipo:** `Discriminated Union`
  - `DamageOutcomeSchema`
  - `ApplyConditionOutcomeSchema`
  - `ApplyCustomEffectOutcomeSchema`
  - `CustomMechanicOutcomeSchema`
  - `NoneOutcomeSchema`
  - `MoveTargetOutcomeSchema`
  - `ModifyHPOutcomeSchema`
  - `DescriptiveOutcomeSchema`
  - `ApplyEffectOutcomeSchema`
  - `SummonTokenOutcomeSchema`
  - `ModifyAttributeOutcomeSchema`

### `ActionOutcomeType`

Tipo inferido do `ActionOutcomeSchema`.

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
    - `trigger`: `ReactionTriggerEnum` (opcional) - Uma descrição textual do gatilho da ação (ex: "quando você é atingido").
  - `attackType`: `AttackTypeEnum` (opcional) - O tipo de ataque (ex: "meleeWeaponAttack", "rangedSpellAttack").
  - `range`: `RangeSchema` (opcional) - O alcance da ação.
  - `overrideAbilityScore`: `AbilityScoreEnum` ou `literal("spellcasting")` (opcional) - O atributo a ser usado para o ataque ou teste, substituindo o padrão.
  - `area`: `AreaSchema` (opcional) - A área de efeito da ação.
  - `target`: `TargetSchema` (opcional) - O alvo da ação.
  - `save`: `object` (opcional) - O teste de resistência para resistir à ação.
    - `ability`: `AbilityScoreEnum` - A habilidade do teste.
    - `dc`: `DcSchema` - A Classe de Dificuldade.
  - `outcomes`: `array` de `ActionOutcomeSchema` (opcional) - Os resultados da ação.
  - `charges`: `object` (opcional) - Informações sobre cargas da ação, se aplicável.
    - `max`: `number` - O número máximo de cargas.
    - `recharge`: `object` (opcional) - Como as cargas são recarregadas.
      - `amount`: `DiceRollSchema` - A quantidade recarregada (ex: "1d4").
      - `event`: `RechargeEventEnum` - O evento que aciona a recarga (ex: "dawn", "longRest").

### `ActionParametersType`

Tipo inferido do `ActionParametersSchema`.

### `FinalActionDataSchema`

Um array de `ActionSchema`.

- **Tipo:** `Array` de `ActionSchema`

---

## `effects.schema.ts`

Este arquivo define os schemas para vários efeitos que os itens podem ter. É uma união discriminada baseada no campo `type`.

### `EndOnTakingDamageConditionSchema`

Define uma condição de término para um efeito quando o alvo sofre dano.

- **Tipo:** `Object`
  - `trigger`: `literal("onTakingDamage")` - O gatilho.
  - `from`: `array` de `enum` (`"caster"`, `"casterAllies"`, `"any"`) (opcional) - De quem o dano deve vir.
  - `damageType`: `array` de `DamageTypeEnum` (opcional) - Tipos de dano que ativam a condição.

### `EndOnCastingAgainConditionSchema`

Define uma condição de término para um efeito quando a magia é conjurada novamente.

- **Tipo:** `Object`
  - `trigger`: `literal("onCastingSpellAgain")` - O gatilho.

### `EndOnLoseConcentration`

Define uma condição de término para um efeito quando a concentração é perdida.

- **Tipo:** `Object`
  - `trigger`: `literal("onLoseConcentration")` - O gatilho.

### `EndOnDropItem`

Define uma condição de término para um efeito quando um item é derrubado.

- **Tipo:** `Object`
  - `trigger`: `literal("onDropItem")` - O gatilho.

### `EndConditionSchema`

Uma união discriminada que representa todas as possíveis condições de término automatizáveis para um efeito.

- **Tipo:** `Discriminated Union`
  - `EndOnTakingDamageConditionSchema`
  - `EndOnCastingAgainConditionSchema`
  - `EndOnLoseConcentration`

### `BaseEffectSchema`

Define propriedades comuns a todos os efeitos.

- **Tipo:** `Object`
  - `endConditions`: `array` de `EndConditionSchema` (opcional) - Condições para o término automático do efeito.
  - `additionalRules`: `array` de `AdditionalRulesSchema` (opcional) - Regras textuais adicionais não automatizáveis.

### `ActivatableActionEffectSchema`

Define um efeito que permite uma ação ativável.

- **Tipo:** `Object` (estende `BaseEffectSchema`)
  - `type`: `literal("activatableAction")`
  - `actionId`: `ActionIdEnum` - O ID da ação genérica a ser usada.
  - `parameters`: `ActionParametersSchema` (opcional) - Parâmetros que customizam a ação.
  - `duration`: `DurationSchema` (opcional) - Duração do efeito.
  - `scaling`: `SpellScalingSchema` (opcional) - Regras de escalonamento, se aplicável.

### `ActivatableCastSpellEffectSchema`

Define um efeito que permite conjurar uma magia.

- **Tipo:** `Object` (estende `BaseEffectSchema`)
  - `type`: `literal("activatableCastSpell")`
  - `actionId`: `ActionIdEnum` - O ID da ação genérica de conjurar magia.
  - `parameters`: `ActionParametersSchema` - Parâmetros que customizam a conjuração da magia.
  - `scaling`: `SpellScalingSchema` (opcional) - Regras de escalonamento de dano da magia.

### `OnEquipSetACEffectSchema`

Define um efeito que define a CA quando o item é equipado.

- **Tipo:** `Object` (estende `BaseEffectSchema`)
  - `type`: `literal("onEquip_setAC")`
  - `armorType`: `ArmorTypeEnum` - O tipo de armadura.
  - `calculation`: `AcSchema` - A fórmula ou valor da CA.

### `OnEquipImposeDisadvantageEffectSchema`

Define um efeito que impõe desvantagem em um teste de perícia quando o item é equipado.

- **Tipo:** `Object` (estende `BaseEffectSchema`)
  - `type`: `literal("onEquip_imposeDisadvantage")`
  - `on`: `literal("skillCheck")` - O tipo de teste afetado.
  - `skill`: `SkillEnum` - A perícia específica afetada.

### `OnEquipProvidesContainerEffectSchema`

Define um efeito onde o item fornece um contêiner quando equipado.

- **Tipo:** `Object` (estende `BaseEffectSchema`)
  - `type`: `literal("onEquip_providesContainer")`
  - `properties`: `object` - Propriedades do contêiner.
    - `capacity`: `object` - Capacidade de peso.
      - `value`: `number` - O valor da capacidade.
      - `unit`: `WeightUnitEnum` - A unidade de peso (ex: "lb").
    - `volume`: `object` (opcional) - Volume do contêiner.
      - `value`: `number` - O valor do volume.
      - `unit`: `string` - A unidade do volume (ex: "cubic_foot").

### `OnWieldGrantWeaponAttackEffectSchema`

Define um efeito que concede um ataque de arma quando o item é empunhado.

- **Tipo:** `Object` (estende `BaseEffectSchema`)
  - `type`: `literal("onWield_grantWeaponAttack")`
  - `weaponCategory`: `WeaponCategoryEnum` - A categoria da arma.
  - `weaponType`: `WeaponTypeEnum` - O tipo de arma.
  - `properties`: `array` de `WeaponPropertySchema` - Propriedades especiais da arma.
  - `mastery`: `array` de `WeaponMasteryEnum` - Maestrias da arma.
  - `damage`: `object` (opcional) - O dano do ataque.
    - `primary`: `DamageFormulaSchema` - A fórmula de dano principal.
    - `versatile`: `DamageFormulaSchema` (opcional) - Fórmula de dano para uso versátil.
  - `range`: `RangeSchema` (opcional) - O alcance do ataque.
  - `outcomes`: `array` de `ActionOutcomeSchema` (opcional) - Resultados adicionais do ataque.
  - `cost`: `object` (opcional) - Custo para usar o ataque.
    - `amount`: `number` - Quantidade do custo.
    - `source`: `literal("inventory")` - A origem do custo.
    - `resourceId`: `string` - O ID do recurso.

### `PassiveGrantAdvantageEffectSchema`

Define um efeito que concede vantagem passivamente.

- **Tipo:** `Object` (estende `BaseEffectSchema`)
  - `type`: `literal("passive_grantAdvantage")`
  - `on`: `enum` (`"abilityCheck"`, `"skillCheck"`, `"savingThrow"`) - O tipo de teste onde a vantagem se aplica.
  - `ability`: `AbilityScoreEnum` (opcional) - A habilidade específica afetada.
  - `skill`: `SkillEnum` (opcional) - A perícia específica afetada.
  - `condition`: `string` (opcional) - Uma descrição da condição para a vantagem ser aplicada.
  - `duration`: `DurationSchema` (opcional) - Duração do efeito.

### `PassiveProvidesLightEffectSchema`

Define um efeito onde o item fornece luz passivamente.

- **Tipo:** `Object` (estende `BaseEffectSchema`)
  - `type`: `literal("passive_providesLight")`
  - `properties`: `object` - Propriedades da luz.
    - `bright`: `number` - Raio de luz brilhante em pés.
    - `dim`: `number` - Raio de luz penumbra em pés.
    - `duration`: `DurationSchema` (opcional) - Duração da luz.

### `PassivePropertyEffectSchema`

Define um efeito que concede uma propriedade passiva genérica.

- **Tipo:** `Object` (estende `BaseEffectSchema`)
  - `type`: `literal("passive_property")`
  - `property`: `ItemPropertyEnum` - O nome da propriedade.
  - `value`: `union` de `string`, `number`, `boolean` - O valor da propriedade.

### `PassiveGrantBonusEffectSchema`

Define um efeito que concede um bônus passivo.

- **Tipo:** `Object` (estende `BaseEffectSchema`)
  - `type`: `literal("passive_grantBonus")`
  - `on`: `enum` (`"attackRoll"`, `"damageRoll"`, `"ac"`, `"savingThrow"`) - Onde o bônus se aplica.
  - `value`: `number` - O valor do bônus.
  - `condition`: `string` (opcional) - Condição para o bônus.

### `GrantConditionalBonusEffectSchema`

Define um efeito que concede um bônus condicional.

- **Tipo:** `Object` (estende `BaseEffectSchema`)
  - `type`: `literal("grantConditionalBonus")`
  - `on`: `enum` (`"abilityCheck"`, `"skillCheck"`) - O tipo de teste onde o bônus se aplica.
  - `modifier`: `DiceRollSchema` - A rolagem de dados para o bônus.
  - `requiresChoice`: `literal("skill")` - Indica que o usuário deve escolher uma perícia.
  - `duration`: `DurationSchema` (opcional) - Duração do efeito.

### `TriggeredModifierEffectSchema`

Define um efeito que aplica um modificador quando um gatilho específico ocorre.

- **Tipo:** `Object` (estende `BaseEffectSchema`)
  - `type`: `literal("triggeredModifier")`
  - `trigger`: `enum` (`"onBeingAttacked"`, `"onAttackRoll"`, `"onDealingDamage"`, `"onTakingDamage"`, `"onSavingThrow"`) - O evento que aciona o modificador.
  - `modifier`: `object` - Detalhes do modificador.
    - `operation`: `enum` (`"add"`, `"subtract"`) - A operação do modificador.
    - `dice`: `DiceRollSchema` - A rolagem de dados para o modificador.
    - `target`: `enum` (`"attackRoll"`, `"damageRoll"`, `"saveRoll"`, `"ac"`) - Onde o modificador se aplica.
    - `appliesTo`: `enum` (`"self"`, `"attacker"`, `"targetCreature"`) - A quem o modificador se aplica.
  - `duration`: `DurationSchema` (opcional) - Duração do efeito.
  - `requiresChoice`: `literal("damageType")` (opcional) - Indica que o usuário deve escolher um tipo de dano.

### `PreventsHealingEffectSchema`

Define um efeito que impede a cura.

- **Tipo:** `Object` (estende `BaseEffectSchema`)
  - `type`: `literal("preventsHealing")`
  - `duration`: `DurationSchema` - Duração do efeito.

### `ImposeDisadvantageEffectSchema`

Define um efeito que impõe desvantagem em testes.

- **Tipo:** `Object` (estende `BaseEffectSchema`)
  - `type`: `literal("imposeDisadvantage")`
  - `on`: `enum` (`"attackRoll"`, `"abilityCheck"`, `"skillCheck"`, `"savingThrow"`) - O tipo de teste afetado.
  - `count`: `number` - O número de vezes que a desvantagem é imposta.
  - `duration`: `DurationSchema` - Duração do efeito.

### `PreventsReactionEffectSchema`

Define um efeito que impede reações.

- **Tipo:** `Object` (estende `BaseEffectSchema`)
  - `type`: `literal("preventsReaction")`
  - `duration`: `DurationSchema` - Duração do efeito.

### `SpellScalingRuleSchema`

Define uma regra para o escalonamento de dano de uma magia com base no nível do personagem ou no nível do espaço de magia.

- **Tipo:** `Discriminated Union`
  - `ModifyOutcomeFormulaRuleSchema`
  - `ModifyActionParameterRuleSchema`
  - `IncrementActionParameterRuleSchema`
  - `IncrementOutcomePropertyRuleSchema`

### `ModifyOutcomeFormulaRuleSchema`

Define uma regra de escalonamento que modifica a fórmula de um resultado de dano.

- **Tipo:** `Object`
  - `type`: `literal("modifyOutcomeFormula")`
  - `level`: `number` - O nível no qual esta regra se aplica.
  - `outcomeId`: `string` - O ID do resultado de dano ao qual esta regra se refere.
  - `newFormula`: `DamageFormulaSchema` - A nova fórmula de dano.

### `ModifyActionParameterRuleSchema`

Define uma regra de escalonamento que modifica um parâmetro de ação.

- **Tipo:** `Object`
  - `type`: `literal("modifyActionParameter")`
  - `level`: `number` - O nível no qual esta regra se aplica.
  - `propertyPath`: `RootParameterPaths` - O caminho da propriedade a ser modificada.
  - `newValue`: `any` - O novo valor da propriedade.

### `IncrementActionParameterRuleSchema`

Define uma regra de escalonamento que incrementa um parâmetro de ação.

- **Tipo:** `Object`
  - `type`: `literal("incrementRootParameter")`
  - `propertyPath`: `RootParameterPaths` - O caminho da propriedade a ser incrementada.
  - `increment`: `number` - O valor a ser adicionado.

### `IncrementOutcomePropertyRuleSchema`

Define uma regra de escalonamento que incrementa uma propriedade de um resultado.

- **Tipo:** `Object`
  - `type`: `literal("incrementOutcomeProperty")`
  - `outcomeId`: `string` - O ID do resultado a ser modificado.
  - `propertyPath`: `OutcomeParameterPaths` - O caminho da propriedade do resultado a ser incrementada.
  - `increment`: `number` - O valor a ser adicionado.

### `EffectSchema`

Uma união discriminada que representa um efeito que um item ou magia pode ter.

- **Tipo:** `Discriminated Union`
  - `ActivatableActionEffectSchema`
  - `ActivatableCastSpellEffectSchema`
  - `OnEquipSetACEffectSchema`
  - `OnEquipImposeDisadvantageEffectSchema`
  - `OnEquipProvidesContainerEffectSchema`
  - `OnWieldGrantWeaponAttackEffectSchema`
  - `PassiveGrantAdvantageEffectSchema`
  - `PassiveProvidesLightEffectSchema`
  - `PassivePropertyEffectSchema`
  - `PassiveGrantBonusEffectSchema`
  - `GrantConditionalBonusEffectSchema`
  - `TriggeredModifierEffectSchema`
  - `PreventsHealingEffectSchema`
  - `ImposeDisadvantageEffectSchema`
  - `PreventsReactionEffectSchema`

### `EffectType`

Tipo inferido do `EffectSchema`.

### `ApplicableEffectType`

Tipo inferido do `applicableEffectSchema`, representando efeitos que podem ser aplicados a um alvo.

### `SpellScalingSchema`

Define como o dano de uma magia escala com o nível. É uma união discriminada baseada no campo `type`.

- **Tipo:** `Discriminated Union`
  - `type: "characterLevel"`: O escalonamento é baseado no nível do personagem.
    - `rules`: `array` de `SpellScalingRuleSchema` - Um array de regras de escalonamento.
  - `type: "spellSlot"`: O escalonamento é baseado no nível do espaço de magia usado.
    - `rules`: `array` de `SpellScalingRuleSchema` - Um array de regras de escalonamento.

---

## `items.schema.ts`

Este arquivo define o schema principal para itens, que une muitos dos outros schemas.

### `BaseItemSchema`

O schema base para todos os tipos de itens.

- **Tipo:** `Object`
  - `id`: `string` - Um identificador único para o item.
  - `name`: `string` ou `array` de `string` - O nome do item.
  - `source`: `SourceEnum` - A fonte do item.
  - `page`: `number` - O número da página onde o item pode ser encontrado na fonte.
  - `type`: `ItemTypeEnum` - O tipo de item (será literalizado em schemas estendidos).
  - `rarity`: `RarityEnum` - A raridade do item.
  - `requiresAttunement`: `boolean` (opcional) - Indica se o item requer sintonização para que seus efeitos mágicos funcionem. O padrão é `false`.
  - `description`: `string` (opcional) - Uma descrição do item.
  - `weight`: `object` - O peso do item.
    - `value`: `number` - O valor do peso.
    - `unit`: `WeightUnitEnum` - A unidade de peso.
  - `price`: `object` (opcional) - O preço do item.
    - `quantity`: `number` - A quantidade da unidade de custo.
    - `unit`: `CostUnitEnum` - A unidade de custo.
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

### `Item`

Tipo inferido do `ItemSchema`.

### `FinalItemDataSchema`

Um array de `ItemSchema`.

- **Tipo:** `Array` de `ItemSchema`

---

## `spells.schema.ts`

Este arquivo define o schema para magias. Similar aos itens, uma magia é um contêiner para um ou mais `effects`. A ação de "conjurar magia" é o efeito mais comum.

### `baseSpellSchema`

O schema base para magias, definindo a estrutura fundamental.

- **Tipo:** `Object`
  - `id`: `string` - Um identificador único para a magia.
  - `name`: `string` ou `array` de `string` - O nome da magia.
  - `description`: `string` - A descrição textual da magia.
  - `source`: `SourceEnum` - A fonte da magia.
  - `page`: `number` - O número da página na fonte.
  - `level`: `number` - O nível da magia (0 a 9).
  - `school`: `MagicSchoolEnum` - A escola de magia.
  - `additionalRules`: `array` de `object` (opcional) - Regras textuais adicionais.
    - `id`: `string` - Identificador da regra.
    - `details`: `string` - Detalhes da regra.
  - `isRitual`: `boolean` (opcional) - Indica se a magia pode ser conjurada como um ritual. Padrão é `false`.
  - `components`: `object` - Os componentes necessários.
    - `types`: `array` de `SpellComponentEnum` - Tipos de componentes.
    - `material`: `object` (opcional) - Descrição dos componentes materiais.
      - `description`: `string` - Descrição do material.
      - `costGp`: `number` (opcional) - Custo em peças de ouro.
      - `isConsumed`: `boolean` (opcional) - Indica se o material é consumido. Padrão é `false`.
  - `requirements`: `SpellRequirementsSchema` (opcional) - Requisitos para conjurar a magia.
  - `duration`: `DurationSchema` (opcional) - A duração da magia.
  - `castingTime`: `DurationSchema` (opcional) - O tempo de conjuração da magia. Padrão é "instantaneous".
  - `effects`: `array` de `EffectSchema` - Os efeitos que a magia possui.

### `SpellSchema`

O schema principal para magias, com validações adicionais.

- **Tipo:** `Object` (estende `baseSpellSchema`)
  - Inclui validação para garantir que `outcomeId` em regras de escalonamento de magia (`modifyOutcomeFormula`) corresponda a um `outcome.id` definido na magia.

### `Spell`

Tipo inferido do `SpellSchema`.

### `FinalSpellDataSchema`

Um array de `SpellSchema`.

- **Tipo:** `Array` de `SpellSchema`

---

## `domain/game/game-state.schema.ts`

Este arquivo define os schemas relacionados ao estado do jogo, como superfícies ativas.

### `SurfaceRuleSchema`

Define uma regra que se aplica a uma superfície ativa.

- **Tipo:** `Object`
  - `trigger`: `SurfaceTriggerEnum` - O gatilho para a regra (ex: "onEnterArea").
  - `save`: `object` (opcional) - O teste de resistência para resistir ao efeito da regra.
    - `ability`: `AbilityScoreEnum` - A habilidade do teste.
    - `dc`: `DcSchema` - A Classe de Dificuldade.
  - `outcomes`: `array` de `ActionOutcomeSchema` - Os resultados que ocorrem quando a regra é acionada.

### `ActiveSurfaceSchema`

Define uma superfície ativa no campo de batalha.

- **Tipo:** `Object`
  - `id`: `string` - Um identificador único para a superfície.
  - `shape`: `AreaSchema` - A forma e tamanho da área da superfície.
  - `surfaceType`: `SurfaceTypeEnum` - O tipo da superfície (ex: "fire", "ice").
  - `rules`: `array` de `SurfaceRuleSchema` - As regras que se aplicam a esta superfície.
  - `duration`: `DurationSchema` (opcional) - A duração da superfície.

### `GameStateSchema`

O schema principal que representa o estado atual do jogo.

- **Tipo:** `Object`
  - `activeSurfaces`: `array` de `ActiveSurfaceSchema` - Uma lista de todas as superfícies ativas no jogo.

---

## `shared/property-paths.schemas.ts`

Este arquivo é gerado automaticamente e contém enums Zod para caminhos de propriedades usados em regras de escalonamento e modificação.

### `RootParameterPaths`

Define os caminhos de propriedades para parâmetros de ação raiz que podem ser modificados.

- **Tipo:** `Enum` de `string`
  - Exemplos: `"activation.cost.amount"`, `"area.radius"`, `"target.type"`

### `OutcomeParameterPaths`

Define os caminhos de propriedades para parâmetros dentro de resultados de ação que podem ser modificados.

- **Tipo:** `Enum` de `string`
  - Exemplos: `"formula.roll.count"`, `"effect.duration.unit"`, `"token.quantity"`
