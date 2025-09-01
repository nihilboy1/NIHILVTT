import type { Spell } from "../../domain/spell/spell.schema.js";

export const spellsLevel1 = [
  {
    id: "spell-alarme",
    name: ["Alarme", "Alarm"],
    source: "LDJ2024",
    page: 239,
    level: 1,
    school: "abjuration",
    isRitual: true,
    castingTime: {
      value: 1,
      unit: "minute",
    },
    components: {
      types: ["verbal", "somatic", "material"],
      material: {
        description: "Um sininho e um fio de prata",
      },
    },
    duration: {
      unit: "hour",
      value: 8,
    },
    description:
      "Você prepara um alarme contra invasões. Escolha uma porta, uma janela ou uma área dentro do alcance que não seja maior que um cubo de 6 metros (20 pés). Até o fim da magia, um alarme alerta você sempre que uma criatura designada tocar ou entrar na área protegida.\n\nAo conjurar a magia, você pode designar criaturas que não ativarão o alarme. Você também escolhe se o alarme será audível ou mental:\n\n• **Mental**: um sinal telepático desperta você enquanto estiver a até 1 milha da área protegida.\n• **Audível**: o som de um sino toca por 10 segundos, audível a até 60 pés.\n\nA sentinela mágica é invisível e dura até o fim da magia.",
    effects: [],
  },
  {
    id: "spell-amizade-animal",
    name: ["Amizade Animal", "Animal Friendship"],
    description:
      "Você encanta uma criatura do tipo Besta. Ela deve passar em um teste de resistência de Sabedoria ou ficará com a condição 'Encantado' por você pela duração. O feitiço termina se você ou seus companheiros causarem dano ao alvo.",
    source: "LDJ2024",
    page: 239,
    level: 1,
    school: "enchantment",
    components: {
      types: ["verbal", "somatic", "material"],
      material: {
        description: "um bocado de comida",
      },
    },
    duration: {
      unit: "hour",
      value: 24,
    },
    requirements: {
      target: {
        events: [
          {
            type: "isCreatureOfType",
            creatureTypes: ["beast"],
          },
        ],
      },
    },
    effects: [
      {
        name: "Conjurar Amizade Animal",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        endConditions: {
          events: [
            {
              type: "tookDamage",
              from: ["caster", "casterAllies"],
              attackType: [
                { source: "any", range: "melee", handsInUse: "one" },
              ],
            },
          ],
        },
        parameters: {
          activation: {
            type: "action",
          },
          range: {
            normal: 30,
            unit: "ft",
          },
          target: {
            type: "creature",
            quantity: 1,
          },
          save: {
            ability: "wisdom",
            dc: {
              type: "calculated",
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "animal-friendship-charmed",
              type: "applyCondition",
              on: "fail",
              condition: "charmed",
              duration: {
                unit: "hour",
                value: 24,
              },
            },
            {
              type: "none",
              on: "success",
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementRootParameter",
              propertyPath: "target.quantity",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-cure-wounds",
    name: ["Curar Ferimentos", "Cure Wounds"],
    description:
      "Uma criatura que você toca recupera uma quantidade de pontos de vida igual a 2d8 + seu modificador de habilidade de conjuração.",
    source: "LDJ2024",
    page: 259,
    level: 1,
    school: "abjuration",
    isRitual: false,
    duration: {
      unit: "instantaneous",
    },
    components: {
      types: ["verbal", "somatic"],
    },
    effects: [
      {
        name: "Conjurar Curar Ferimentos",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: {
            type: "action",
          },
          range: {
            normal: 5,
            unit: "ft",
          },
          target: {
            type: "creature",
            quantity: 1,
          },
          outcomes: [
            {
              id: "cure-wounds-heal",
              type: "modifyTargetHP",
              on: "success",
              vitals: ["currentHp"],
              formula: {
                type: "healing",
                roll: { count: 2, faces: 8 },
                addSpellcastingModifier: true,
              },
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementOutcomeProperty",
              outcomeId: "cure-wounds-heal",
              propertyPath: "formula.roll.count",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-healing-word",
    name: ["Palavra Curativa", "Healing Word"],
    description:
      "Uma criatura à sua escolha que você pode ver dentro do alcance recupera pontos de vida iguais a 2d4 + seu modificador de habilidade de conjuração.",
    source: "LDJ2024",
    page: 284,
    level: 1,
    school: "abjuration",
    isRitual: false,
    duration: {
      unit: "instantaneous",
    },
    components: {
      types: ["verbal"],
    },
    effects: [
      {
        name: "Conjurar Palavra Curativa",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: {
            type: "bonus",
          },
          range: {
            normal: 60,
            unit: "ft",
          },
          target: {
            type: "creature",
            quantity: 1,
          },
          outcomes: [
            {
              id: "healing-word-heal",
              type: "modifyTargetHP",
              on: "success",
              vitals: ["currentHp"],
              formula: {
                type: "healing",
                roll: { count: 2, faces: 4 },
                addSpellcastingModifier: true,
              },
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementOutcomeProperty",
              outcomeId: "healing-word-heal",
              propertyPath: "formula.roll.count",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-arms-of-hadar",
    name: ["Braços de Hadar", "Arms of Hadar"],
    description:
      "**Braços de Hadar**\nVocê invoca os Braços de Hadar, fazendo com que tentáculos irrompam do seu corpo. Cada criatura em uma **área de 3 metros** centrada em você deve realizar um **teste de resistência de Força**.\n- **Falha:** O alvo sofre **2d6 de dano necrótico** e **não pode realizar Reações** até o início do próximo turno dele.\n- **Sucesso:** O alvo sofre **metade do dano**, sem efeitos adicionais.",
    source: "LDJ2024",
    page: 243,
    level: 1,
    school: "conjuration",
    components: {
      types: ["verbal", "somatic"],
    },
    effects: [
      {
        name: "Conjurar Braços de Hadar",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: {
            type: "action",
          },
          target: {
            type: "selfArea",
          },
          area: {
            shape: "sphere",
            radius: 10,
            unit: "ft",
          },
          save: {
            ability: "strength",
            dc: {
              type: "calculated",
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "arms-of-hadar-damage-fail",
              type: "modifyTargetHP",
              on: "fail",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 2, faces: 6 },
                damageTypeOptions: ["necrotic"],
              },
            },
            {
              id: "arms-of-hadar-no-reaction",
              type: "applyEffect",
              on: "fail",
              effect: {
                name: "Impedir Reações",
                type: "preventsReaction",
                duration: {
                  unit: "turn",
                  value: 1,
                },
              },
            },
            {
              id: "arms-of-hadar-damage-success",
              type: "modifyTargetHP",
              on: "success",
              vitals: ["currentHp"],
              formula: { type: "halfDamage", of: "arms-of-hadar-damage-fail" },
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementOutcomeProperty",
              outcomeId: "arms-of-hadar-damage-fail",
              propertyPath: "formula.roll.count",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-burning-hands",
    name: ["Mãos Flamejantes", "Burning Hands"],
    description:
      "Uma fina camada de chamas é expelida de suas mãos. Cada criatura em um cone de 4,5 metros (15 pés) deve fazer um teste de resistência de Destreza. Em caso de falha, sofre 3d6 de dano de fogo, ou metade do dano em caso de sucesso. Objetos inflamáveis na área que não estão sendo vestidos ou carregados pegam fogo.",
    source: "LDJ2024",
    page: 248,
    level: 1,
    school: "evocation",
    components: {
      types: ["verbal", "somatic"],
    },
    duration: {
      unit: "instantaneous",
    },
    effects: [
      {
        name: "Conjurar Mãos Flamejantes",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: {
            type: "action",
          },
          target: {
            type: "selfArea",
          },
          area: {
            shape: "cone",
            length: 15,
            unit: "ft",
          },
          save: {
            ability: "dexterity",
            dc: {
              type: "calculated",
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "burning-hands-damage-fail",
              type: "modifyTargetHP",
              on: "fail",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 3, faces: 6 },
                damageTypeOptions: ["fire"],
              },
            },
            {
              id: "burning-hands-damage-success",
              type: "modifyTargetHP",
              on: "success",
              vitals: ["currentHp"],
              formula: {
                type: "halfDamage",
                of: "burning-hands-damage-fail",
              },
            },
            {
              id: "burning-hands-ignite-objects",
              type: "applyCondition",
              on: "any",
              condition: "burning",
              requirements: {
                target: {
                  events: [
                    {
                      type: "isObject",
                      isCarried: false,
                      isFlammable: true,
                      isWorn: false,
                    },
                  ],
                },
              },
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementOutcomeProperty",
              outcomeId: "burning-hands-damage-fail",
              propertyPath: "formula.roll.count",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-bless",
    name: ["Benção", "Bless"],
    description:
      "Você abençoa até três criaturas à sua escolha dentro do alcance. Sempre que um alvo fizer uma rolagem de ataque ou um teste de resistência antes do fim da magia, o alvo pode adicionar 1d4 à rolagem.",
    source: "LDJ2024",
    page: 247,
    level: 1,
    school: "enchantment",
    components: {
      types: ["verbal", "somatic", "material"],
      material: {
        description: "um Símbolo Sagrado no valor de 5+ PO",
      },
    },
    effects: [
      {
        name: "Conjurar Benção",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: {
            type: "action",
          },
          range: {
            normal: 30,
            unit: "ft",
          },
          target: {
            type: "creature",
            quantity: 3,
          },
          outcomes: [
            {
              id: "bless-buff",
              type: "applyEffect",
              on: "any",
              effect: {
                name: "Bênção - Modificador",
                type: "triggeredModifier",
                triggers: {
                  events: [
                    { type: "madeSavingThrow" },
                    { type: "madeAttackRoll" },
                  ],
                },
                modifier: {
                  operation: "add",
                  dice: { count: 1, faces: 4 },
                  target: ["saveRoll", "attackRoll"],
                  appliesTo: "self",
                },
                duration: {
                  unit: "minute",
                  value: 1,
                  isConcentration: true,
                },
              },
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementRootParameter",
              propertyPath: "target.quantity",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-bane",
    name: ["Perdição", "Bane"],
    description:
      "Até três criaturas à sua escolha dentro do alcance devem fazer um teste de resistência de Carisma. Sempre que um alvo que falhou neste teste fizer uma rolagem de ataque ou um teste de resistência antes do fim da magia, o alvo deve subtrair 1d4 da rolagem.",
    source: "LDJ2024",
    page: 245,
    level: 1,
    school: "enchantment",
    components: {
      types: ["verbal", "somatic", "material"],
      material: {
        description: "uma gota de sangue",
      },
    },
    duration: {
      unit: "minute",
      value: 1,
      isConcentration: true,
    },
    effects: [
      {
        name: "Conjurar Perdição",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: {
            type: "action",
          },
          range: {
            normal: 30,
            unit: "ft",
          },
          target: {
            type: "creature",
            quantity: 3,
          },
          save: {
            ability: "charisma",
            dc: {
              type: "calculated",
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "bane-debuff",
              type: "applyEffect",
              on: "any",
              effect: {
                name: "Perdição - Penalidade",
                type: "triggeredModifier",
                triggers: {
                  events: [
                    { type: "madeSavingThrow" },
                    { type: "madeAttackRoll" },
                  ],
                },
                modifier: {
                  operation: "subtract",
                  dice: { count: 1, faces: 4 },
                  target: ["saveRoll", "attackRoll"],
                  appliesTo: "self",
                },
                duration: {
                  unit: "minute",
                  value: 1,
                  isConcentration: true,
                },
              },
            },
            {
              type: "none",
              on: "success",
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementRootParameter",
              propertyPath: "target.quantity",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-armor-of-agathys",
    name: ["Armadura de Agathys", "Armor of Agathys"],
    description:
      "Uma geada mágica protetora te envolve. Você ganha 5 pontos de vida temporários. Se uma criatura te atingir com um ataque corpo a corpo antes do fim da magia, ela sofre 5 de dano de frio. A magia termina se você não tiver mais os pontos de vida temporários.",
    source: "LDJ2024",
    page: 243,
    level: 1,
    school: "abjuration",
    components: {
      types: ["verbal", "somatic", "material"],
      material: {
        description: "um caco de vidro azul",
      },
    },
    duration: {
      unit: "hour",
      value: 1,
    },
    effects: [
      {
        name: "Conjurar Armadura de Agathys",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        endConditions: { events: [{ type: "tempHPDepleted" }] },
        parameters: {
          activation: {
            type: "bonus",
          },
          target: {
            type: "self",
          },
          outcomes: [
            {
              id: "agathys-temp-hp",
              type: "modifyTargetHP",
              on: "any",
              vitals: ["tempHp"],
              formula: {
                type: "healing",
                fixed: 5,
              },
            },
            {
              id: "agathys-retaliation",
              type: "applyEffect",
              on: "any",
              effect: {
                name: "Retaliação de Agathys",
                type: "triggeredEffect",
                triggers: {
                  events: [
                    {
                      type: "tookDamage",
                      attackType: [
                        { source: "weapon", range: "melee", handsInUse: "one" },
                      ],
                    },
                  ],
                },
                outcomes: [
                  {
                    id: "agathys-retaliation-damage",
                    type: "modifyTargetHP",
                    on: "any",
                    vitals: ["currentHp"],
                    formula: {
                      type: "damage",
                      fixed: 5,
                      damageTypeOptions: ["cold"],
                    },
                  },
                ],
                duration: {
                  unit: "hour",
                  value: 1,
                },
              },
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementOutcomeProperty",
              outcomeId: "agathys-temp-hp",
              propertyPath: "formula.fixed",
              increment: 5,
            },
            {
              type: "incrementOutcomeProperty",
              outcomeId: "agathys-retaliation-damage",
              propertyPath: "formula.fixed",
              increment: 5,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-charm-person",
    name: ["Enfeitiçar Pessoa", "Charm Person"],
    description:
      "Um humanoide à sua escolha, que você possa ver dentro do alcance, deve realizar um teste de resistência de Sabedoria. O alvo faz esse teste com vantagem se você ou seus aliados estiverem em combate contra ele. Em caso de falha, o alvo fica encantado por você até o fim da duração da magia ou até que você ou seus companheiros o prejudiquem. Quando a magia termina, o alvo sabe que foi enfeitiçado por você. Você tem desvantagem ao Conjurar esta magia contra uma criatura que você ou seus companheiros tenham tratado de forma hostil.",
    source: "LDJ2024",
    page: 249,
    level: 1,
    school: "enchantment",
    components: {
      types: ["verbal", "somatic"],
    },
    duration: {
      unit: "hour",
      value: 1,
    },
    requirements: {
      target: {
        events: [{ type: "isCreatureOfType", creatureTypes: ["humanoid"] }],
      },
    },
    effects: [
      {
        name: "Conjurar Enfeitiçar Pessoa",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        endConditions: {
          events: [
            {
              type: "tookDamage",
              from: ["caster", "casterAllies"],
              attackType: [
                { source: "any", range: "melee", handsInUse: "one" },
              ],
            },
          ],
        },
        parameters: {
          activation: {
            type: "action",
          },
          range: {
            normal: 30,
            unit: "ft",
          },
          target: {
            type: "creature",
            quantity: 1,
          },
          save: {
            ability: "wisdom",
            dc: {
              type: "calculated",
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "charm-person-charmed",
              type: "applyCondition",
              on: "fail",
              condition: "charmed",
              duration: {
                unit: "hour",
                value: 1,
              },
            },
            {
              type: "none",
              on: "success",
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementRootParameter",
              propertyPath: "target.quantity",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-chromatic-orb",
    name: ["Orbe Cromática", "Chromatic Orb"],
    description:
      "Você arremessa um orbe de energia. Escolha Ácido, Frio, Fogo, Relâmpago, Veneno ou Trovão e faça um ataque de magia à distância. Em um acerto, o alvo sofre 3d8 de dano do tipo escolhido. Se rolar o mesmo número em dois ou mais d8s, o orbe salta para outro alvo.",
    source: "LDJ2024",
    page: 249,
    level: 1,
    school: "evocation",
    components: {
      types: ["verbal", "somatic", "material"],
      material: { description: "um diamante no valor de 50+ PO", costGp: 50 },
    },
    duration: { unit: "instantaneous" },
    effects: [
      {
        name: "Conjurar Orbe Cromática",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { normal: 90, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          attackType: [{ source: "spell", range: "ranged", handsInUse: "one" }],
          outcomes: [
            {
              id: "chromatic-orb-damage",
              type: "modifyTargetHP",
              on: "hit",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 3, faces: 8 },
                damageTypeOptions: [
                  "acid",
                  "cold",
                  "fire",
                  "lightning",
                  "poison",
                  "thunder",
                ],
              },
            },
          ],
        },
        chainedEffects: [
          {
            triggers: {
              events: [
                {
                  type: "dicePatternRolled",
                  condition: "anyDoubles",
                  diceType: 8,
                  rollCount: 3,
                },
              ],
            },
            outcomes: [
              {
                type: "descriptive",
                on: "any",
                details:
                  "O orbe salta para um alvo diferente à sua escolha a até 30 pés. Conjure a magia novamente. Faça uma nova jogada de ataque e uma nova jogada de dano.",
              },
            ],
          },
        ],
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementOutcomeProperty",
              outcomeId: "chromatic-orb-damage",
              propertyPath: "formula.roll.count",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-color-spray",
    name: ["Leque Cromático", "Color Spray"],
    description:
      "Você lança um leque de luzes coloridas. Cada criatura em um cone de 15 pés deve ter sucesso em um teste de resistência de Constituição ou ficará Cega até o final do seu próximo turno.",
    source: "LDJ2024",
    page: 251,
    level: 1,
    school: "illusion",
    components: {
      types: ["verbal", "somatic", "material"],
      material: { description: "uma pitada de areia colorida" },
    },
    duration: { unit: "instantaneous" },
    effects: [
      {
        name: "Conjurar Leque Cromático",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "action" },
          target: { type: "selfArea" },
          area: { shape: "cone", length: 15, unit: "ft" },
          save: {
            ability: "constitution",
            dc: {
              type: "calculated",
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "color-spray-blinded",
              type: "applyCondition",
              on: "fail",
              condition: "blinded",
              duration: { unit: "turn", value: 1 },
            },
            {
              id: "color-spray-success",
              type: "none",
              on: "success",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-command",
    name: ["Comando", "Command"],
    description:
      "Você fala um comando de uma palavra para uma criatura. Ela deve passar em um teste de resistência de Sabedoria ou seguir o comando em seu próximo turno.",
    source: "LDJ2024",
    page: 251,
    level: 1,
    school: "enchantment",
    components: { types: ["verbal"] },
    duration: { unit: "instantaneous" },
    effects: [
      {
        name: "Conjurar Comando",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { normal: 60, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          save: {
            ability: "wisdom",
            dc: {
              type: "calculated",
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "command-fail",
              type: "descriptive",
              on: "fail",
              details:
                "O alvo segue um comando de uma palavra no próximo turno. Opções: **Aproxime-se**, **Largue**, **Fuja**, **Ajoelhe-se**, **Pare.**",
            },
            {
              type: "none",
              on: "success",
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementRootParameter",
              propertyPath: "target.quantity",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-compelled-duel",
    name: ["Duelo Compelido", "Compelled Duel"],
    description:
      "Você tenta compelir uma criatura para um duelo. Em uma falha em um teste de resistência de Sabedoria, o alvo tem Desvantagem em ataques contra outros que não você e não pode se mover voluntariamente para mais de 30 pés de distância de você.",
    source: "LDJ2024",
    page: 252,
    level: 1,
    school: "enchantment",
    components: { types: ["verbal"] },
    duration: { unit: "minute", value: 1, isConcentration: true },
    effects: [
      {
        name: "Conjurar Duelo Forçado",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        endConditions: {
          events: [
            { type: "lostConcentration" },
            { type: "hostile", who: ["user"], is: true },
          ],
        },

        parameters: {
          activation: { type: "bonus" },
          range: { normal: 30, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          save: {
            ability: "wisdom",
            dc: {
              type: "calculated",
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "compelled-duel-disadvantage",
              type: "applyEffect",
              on: "fail",
              effect: {
                name: "Desvantagem em Ataques",
                type: "imposeDisadvantage",
                on: "attackRoll",
                duration: { unit: "minute", value: 1, isConcentration: true },
              },
            },
            {
              id: "compelled-duel-movement-restriction",
              type: "descriptive",
              on: "fail",
              details:
                "O alvo não pode se mover voluntariamente para um espaço a mais de 30 pés de você.",
            },
            {
              type: "none",
              on: "success",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-comprehend-languages",
    name: ["Compreender Idiomas", "Comprehend Languages"],
    description:
      "Pela duração, você entende o significado literal de qualquer idioma que ouve ou vê, incluindo texto escrito que você toca.",
    source: "LDJ2024",
    page: 252,
    level: 1,
    school: "divination",
    isRitual: true,
    components: {
      types: ["verbal", "somatic", "material"],
      material: { description: "uma pitada de fuligem e sal" },
    },
    duration: { unit: "hour", value: 1 },
    effects: [
      {
        name: "Conjurar Compreender Idiomas",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "action" },
          target: { type: "self" },
          outcomes: [
            {
              id: "comprehend-languages-effect",
              type: "descriptive",
              on: "any",
              details:
                "Você entende todos os idiomas falados e escritos. Não decodifica mensagens secretas.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-create-or-destroy-water",
    name: ["Criar ou Destruir Água", "Create or Destroy Water"],
    description:
      "Você cria ou destrói água. Crie até 10 galões de água limpa, ou destrua até 10 galões de água ou um nevoeiro em um cubo de 30 pés.",
    source: "LDJ2024",
    page: 258,
    level: 1,
    school: "transmutation",
    components: {
      types: ["verbal", "somatic", "material"],
      material: { description: "uma mistura de água e areia" },
    },
    duration: { unit: "instantaneous" },
    effects: [
      {
        name: "Conjurar Criar ou Destruir Água",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { normal: 30, unit: "ft" },
          target: { type: "point" },
          choices: {
            on: "any",
            type: "chooseEffect",
            options: [
              {
                id: "create-water",
                name: "Criar Água",
                outcome: {
                  type: "descriptive",
                  on: "any",
                  details:
                    "Cria 10 galões de água em um recipiente ou como chuva em um cubo de 30 pés.",
                },
              },
              {
                id: "destroy-water",
                name: "Destruir Água",
                outcome: {
                  type: "descriptive",
                  on: "any",
                  details:
                    "Destrói 10 galões de água em um recipiente ou nevoeiro em um cubo de 30 pés.",
                },
              },
            ],
          },
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "descriptive",
              details: "Aumenta 10 galões ou 5 pés no cubo por nível de slot.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-detect-evil-and-good",
    name: ["Detectar o Bem e o Mal", "Detect Evil and Good"],
    description:
      "Pela duração, você sente a localização de qualquer Aberração, Celestial, Elemental, Feérico, Infernal ou Morto-vivo a até 30 pés de você. A magia é bloqueada por cobertura.",
    source: "LDJ2024",
    page: 261,
    level: 1,
    school: "divination",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "minute", value: 10, isConcentration: true },
    effects: [
      {
        name: "Conjurar Detectar o Bem e o Mal",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        endConditions: {
          events: [{ type: "lostConcentration" }],
        },
        parameters: {
          activation: { type: "action" },
          target: { type: "selfArea" },
          area: { shape: "sphere", radius: 30, unit: "ft" },
          outcomes: [
            {
              id: "detect-evil-good-effect",
              type: "descriptive",
              on: "any",
              details:
                "Sente a localização dos tipos de criatura especificados e a presença da magia Santificar.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-detect-magic",
    name: ["Detectar Magia", "Detect Magic"],
    description:
      "Pela duração, você sente a presença de efeitos mágicos a 30 pés. Com a ação Magia, você pode ver uma aura fraca ao redor de qualquer criatura ou objeto visível que tenha magia e aprender sua escola de magia.",
    source: "LDJ2024",
    page: 262,
    level: 1,
    school: "divination",
    isRitual: true,
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "minute", value: 10, isConcentration: true },
    effects: [
      {
        name: "Conjurar Detectar Magia",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        endConditions: {
          events: [{ type: "lostConcentration" }],
        },
        parameters: {
          activation: { type: "action" },
          target: { type: "selfArea" },
          area: { shape: "sphere", radius: 30, unit: "ft" },
          outcomes: [
            {
              id: "detect-magic-effect",
              type: "descriptive",
              on: "any",
              details:
                "Sente a presença de magia. Uma ação de Magia revela auras e a escola de magia.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-detect-poison-and-disease",
    name: ["Detectar Veneno e Doença", "Detect Poison and Disease"],
    description:
      "Pela duração, você sente a localização de venenos, criaturas venenosas e contágios mágicos a até 30 pés de você.",
    source: "LDJ2024",
    page: 262,
    level: 1,
    school: "divination",
    isRitual: true,
    components: {
      types: ["verbal", "somatic", "material"],
      material: { description: "uma folha de teixo" },
    },
    duration: { unit: "minute", value: 10, isConcentration: true },
    effects: [
      {
        name: "Conjurar Detectar Veneno e Doença",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        endConditions: {
          events: [{ type: "lostConcentration" }],
        },
        parameters: {
          activation: { type: "action" },
          target: { type: "selfArea" },
          area: { shape: "sphere", radius: 30, unit: "ft" },
          outcomes: [
            {
              id: "detect-poison-disease-effect",
              type: "descriptive",
              on: "any",
              details: "Sente a localização e o tipo de venenos e doenças.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-disguise-self",
    name: ["Disfarçar-se", "Disguise Self"],
    description:
      "Você faz a si mesmo, incluindo suas roupas e pertences, parecer diferente. A ilusão falha na inspeção física. Uma criatura pode usar uma ação de Estudo para fazer um teste de Investigação contra a CD da sua magia para perceber o disfarce.",
    source: "LDJ2024",
    page: 262,
    level: 1,
    school: "illusion",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "hour", value: 1 },
    effects: [
      {
        name: "Conjurar Disfarçar-se",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "action" },
          target: { type: "self" },
          outcomes: [
            {
              id: "disguise-self-effect",
              type: "descriptive",
              on: "any",
              details:
                "Altera a aparência visual. Pode parecer até 1 pé mais alto ou mais baixo. A inspeção física revela a ilusão. Um teste de Investigação (CD da magia) também revela a verdade.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-dissonant-whispers",
    name: ["Sussurros Dissonantes", "Dissonant Whispers"],
    description:
      "Uma criatura deve fazer um teste de resistência de Sabedoria. Em uma falha, sofre 3d6 de dano psíquico e deve usar sua reação para se mover o mais longe possível de você. Em um sucesso, sofre metade do dano.",
    source: "LDJ2024",
    page: 264,
    level: 1,
    school: "enchantment",
    components: { types: ["verbal"] },
    duration: { unit: "instantaneous" },
    effects: [
      {
        name: "Conjurar Sussurros Dissonantes",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { normal: 60, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          save: {
            ability: "wisdom",
            dc: {
              type: "calculated",
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "dissonant-whispers-damage-fail",
              type: "modifyTargetHP",
              on: "fail",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 3, faces: 6 },
                damageTypeOptions: ["psychic"],
              },
            },
            {
              id: "dissonant-whispers-move",
              type: "moveTarget",
              on: "fail",
              direction: "away",
              distance: {
                value: "max",
                unit: "ft",
              },
              usesReaction: true,
            },
            {
              id: "dissonant-whispers-damage-success",
              type: "modifyTargetHP",
              on: "success",
              vitals: ["currentHp"],
              formula: {
                type: "halfDamage",
                of: "dissonant-whispers-damage-fail",
              },
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementOutcomeProperty",
              outcomeId: "dissonant-whispers-damage-fail",
              propertyPath: "formula.roll.count",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-divine-favor",
    name: ["Favor Divino", "Divine Favor"],
    description:
      "Até o fim da magia, seus ataques com armas causam um dano radiante extra de 1d4 em um acerto.",
    source: "LDJ2024",
    page: 265,
    level: 1,
    school: "transmutation",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "minute", value: 1 },
    effects: [
      {
        name: "Conjurar Favor Divino",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "bonus" },
          target: { type: "self" },
          outcomes: [
            {
              id: "divine-favor-apply-buff",
              type: "applyEffect",
              on: "any",
              effect: {
                name: "Dano Extra Divino",
                type: "triggeredEffect",
                triggers: { events: [{ type: "dealtDamage" }] },
                outcomes: [
                  {
                    id: "divine-favor-extra-damage",
                    type: "modifyTargetHP",
                    on: "any",
                    vitals: ["currentHp"],
                    formula: {
                      type: "damage",
                      roll: { count: 1, faces: 4 },
                      damageTypeOptions: ["radiant"],
                    },
                  },
                ],
                duration: { unit: "minute", value: 1 },
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-divine-smite",
    name: ["Golpe Divino", "Divine Smite"],
    description:
      "Imediatamente após atingir um alvo com um ataque corpo a corpo, o alvo sofre um dano radiante extra de 2d8. O dano aumenta em 1d8 se o alvo for um Infernal ou Morto-vivo.",
    source: "LDJ2024",
    page: 265,
    level: 1,
    school: "evocation",
    components: { types: ["verbal"] },
    duration: { unit: "instantaneous" },
    effects: [
      {
        name: "Conjurar Golpe Divino",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: {
            type: "bonus",
          },
          target: {
            type: "descriptive",
            details:
              "Alvo recém-atingido por um ataque corpo a corpo com arma.",
          },
          outcomes: [
            {
              id: "divine-smite-damage",
              type: "modifyTargetHP",
              on: "hit",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 2, faces: 8 },
                damageTypeOptions: ["radiant"],
              },
            },
            {
              id: "divine-smite-bonus-damage",
              type: "modifyTargetHP",
              on: "hit",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 8 },
                damageTypeOptions: ["radiant"],
              },
              requirements: {
                target: {
                  events: [
                    {
                      type: "isCreatureOfType",
                      creatureTypes: ["fiend", "undead"],
                    },
                  ],
                },
              },
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementOutcomeProperty",
              outcomeId: "divine-smite-damage",
              propertyPath: "formula.roll.count",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-ensnaring-strike",
    name: ["Golpe Aprisionador", "Ensnaring Strike"],
    description:
      "Após atingir uma criatura com uma arma, vinhas surgem. Ela deve fazer um teste de resistência de Força (com Vantagem se for Grande ou maior) ou ficará Contida. Enquanto contida, sofre 1d6 de dano perfurante no início de cada um de seus turnos. A criatura pode usar uma ação para tentar se libertar com um teste de Atletismo.",
    source: "LDJ2024",
    page: 268,
    level: 1,
    school: "conjuration",
    components: { types: ["verbal"] },
    duration: { unit: "minute", value: 1, isConcentration: true },
    effects: [
      {
        name: "Conjurar Golpe Aprisionador",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        endConditions: {
          events: [{ type: "lostConcentration" }],
        },
        parameters: {
          activation: {
            type: "bonus",
          },
          target: {
            type: "creature",
            quantity: 1,
          },
          save: {
            ability: "strength",
            dc: {
              type: "calculated",
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "ensnaring-strike-restrained",
              type: "applyCondition",
              on: "fail",
              condition: "restrained",
              duration: { unit: "minute", value: 1, isConcentration: true },
            },
            {
              id: "ensnaring-strike-dot-effect",
              type: "applyEffect",
              on: "fail",
              effect: {
                name: "Dano Contínuo Aprisionador",
                type: "triggeredEffect",
                triggers: { events: [{ type: "onTurnStart" }] },
                outcomes: [
                  {
                    id: "ensnaring-strike-damage",
                    type: "modifyTargetHP",
                    on: "any",
                    vitals: ["currentHp"],
                    formula: {
                      type: "damage",
                      roll: { count: 1, faces: 6 },
                      damageTypeOptions: ["piercing"],
                    },
                  },
                ],
                duration: { unit: "minute", value: 1, isConcentration: true },
              },
            },
            {
              type: "none",
              on: "success",
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementOutcomeProperty",
              outcomeId: "ensnaring-strike-damage",
              propertyPath: "formula.roll.count",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-entangle",
    name: ["Emaranhar", "Entangle"],
    description:
      "Plantas brotam em um quadrado de 20 pés, tornando a área terreno difícil. Cada criatura na área deve passar em um teste de resistência de Força ou ficará Contida. Uma criatura contida pode usar sua ação para fazer um teste de Atletismo para se libertar.",
    source: "LDJ2024",
    page: 268,
    level: 1,
    school: "conjuration",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "minute", value: 1, isConcentration: true },
    effects: [
      {
        name: "Conjurar Emaranhar",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        endConditions: {
          events: [{ type: "lostConcentration" }],
        },
        parameters: {
          activation: { type: "action" },
          range: { normal: 90, unit: "ft" },
          area: { shape: "cube", size: 20, unit: "ft" },
          save: {
            ability: "strength",
            dc: {
              type: "calculated",
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "entangle-difficult-terrain",
              type: "descriptive",
              on: "any",
              details: "A área se torna terreno difícil pela duração.",
            },
            {
              id: "entangle-restrained",
              type: "applyCondition",
              on: "fail",
              condition: "restrained",
              duration: { unit: "minute", value: 1, isConcentration: true },
            },
            {
              id: "entangle-escape",
              type: "descriptive",
              on: "fail",
              details:
                "Uma criatura contida pode usar sua ação para fazer um teste de Força (Atletismo) contra a CD da magia para se libertar.",
            },
            {
              type: "none",
              on: "success",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-expeditious-retreat",
    name: ["Recuo Acelerado", "Expeditious Retreat"],
    description:
      "Você realiza a ação Disparada, e até o fim da magia, pode realizar essa ação novamente como uma ação bônus.",
    source: "LDJ2024",
    page: 270,
    level: 1,
    school: "transmutation",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "minute", value: 10, isConcentration: true },
    effects: [
      {
        name: "Conjurar Recuo Acelerado",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        endConditions: {
          events: [{ type: "lostConcentration" }],
        },
        parameters: {
          activation: { type: "bonus" },
          target: { type: "self" },
          outcomes: [
            {
              id: "expeditious-retreat-effect",
              type: "descriptive",
              on: "any",
              details:
                "Você imediatamente realiza a ação Disparada. Pela duração, você pode usar uma ação bônus para realizar a ação Disparada.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-faerie-fire",
    name: ["Fogo das Fadas", "Faerie Fire"],
    description:
      "Objetos e criaturas em um cubo de 20 pés são delineados por luz. Criaturas na área devem passar em um teste de resistência de Destreza. Pela duração, alvos afetados emitem penumbra e não podem se beneficiar da condição Invisível. Jogadas de ataque contra eles têm vantagem.",
    source: "LDJ2024",
    page: 271,
    level: 1,
    school: "evocation",
    components: { types: ["verbal"] },
    duration: { unit: "minute", value: 1, isConcentration: true },
    effects: [
      {
        name: "Conjurar Fogo das Fadas",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        endConditions: {
          events: [{ type: "lostConcentration" }],
        },
        parameters: {
          activation: { type: "action" },
          range: { normal: 60, unit: "ft" },
          area: { shape: "cube", size: 20, unit: "ft" },
          save: {
            ability: "dexterity",
            dc: {
              type: "calculated",
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "faerie-fire-apply-effect",
              type: "applyEffect",
              on: "fail",
              effect: {
                name: "Luz de Fada",
                type: "passive_providesLight",
                properties: {
                  bright: 0,
                  dim: 10,
                  duration: { unit: "minute", value: 1, isConcentration: true },
                },
              },
            },
            {
              id: "faerie-fire-advantage",
              type: "descriptive",
              on: "fail",
              details:
                "Jogadas de ataque contra a criatura afetada têm vantagem se o atacante puder vê-la, e a criatura não pode se beneficiar de invisibilidade.",
            },
            {
              type: "none",
              on: "success",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-false-life",
    name: ["Vida Falsa", "False Life"],
    description: "Você ganha 2d4 + 4 pontos de vida temporários.",
    source: "LDJ2024",
    page: 271,
    level: 1,
    school: "necromancy",
    components: {
      types: ["verbal", "somatic", "material"],
      material: { description: "uma gota de álcool" },
    },
    duration: { unit: "instantaneous" }, // Os PVs duram, mas a magia não. A nova regra diz 'instantâneo'.
    effects: [
      {
        name: "Conjurar Vida Falsa",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "action" },
          target: { type: "self" },
          outcomes: [
            {
              id: "false-life-temp-hp",
              type: "modifyTargetHP",
              on: "any",
              vitals: ["tempHp"],
              formula: {
                type: "healing",
                roll: { count: 2, faces: 4, bonus: { value: 4 } },
              },
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementOutcomeProperty",
              outcomeId: "false-life-temp-hp",
              propertyPath: "formula.fixed",
              increment: 5,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-feather-fall",
    name: ["Queda Suave", "Feather Fall"],
    description:
      "Quando você ou até cinco criaturas dentro do alcance caírem, você pode conjurar esta magia como uma reação. Cada criatura escolhida tem sua taxa de queda reduzida para 60 pés por rodada. Se aterrissarem antes do fim da magia, não sofrem dano de queda. A magia dura até 1 minuto.",
    source: "LDJ2024",
    page: 271,
    level: 1,
    school: "transmutation",
    components: {
      types: ["verbal", "material"],
      material: { description: "uma pena pequena" },
    },
    duration: { unit: "minute", value: 1 },
    effects: [],
  },
  {
    id: "spell-find-familiar",
    name: ["Encontrar Familiar", "Find Familiar"],
    description:
      "Você ganha o serviço de um familiar, um espírito que assume a forma de um animal. Ele age de forma independente, mas obedece aos seus comandos. O familiar é Celestial, Feérico ou Infernal. Ele obedece a seus comandos, age em sua própria iniciativa e não pode atacar. Você pode se comunicar telepaticamente, ver através de seus olhos e entregar magias de toque através dele.",
    source: "LDJ2024",
    page: 272,
    level: 1,
    school: "conjuration",
    isRitual: true,
    castingTime: { unit: "hour", value: 1 },
    components: {
      types: ["verbal", "somatic", "material"],
      material: {
        description: "incenso no valor de 10+ PO, que a magia consome",
        costGp: 10,
        isConsumed: true,
      },
    },
    duration: { unit: "instantaneous" },
    effects: [
      {
        name: "Conjurar Encontrar Familiar",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "special" },
          range: { normal: 10, unit: "ft" },
          target: { type: "point" },
          outcomes: [
            {
              id: "find-familiar-summon",
              type: "summonToken",
              on: "any",
              tokenId: "token-find-familiar",
              quantity: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-fog-cloud",
    name: ["Nuvem de Neblina", "Fog Cloud"],
    description:
      "Você cria uma esfera de neblina de 20 pés de raio, que é densamente obscurecida. Ela dura pela duração ou até ser dispersada por um vento forte.",
    source: "LDJ2024",
    page: 276,
    level: 1,
    school: "conjuration",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "hour", value: 1, isConcentration: true },
    effects: [
      {
        name: "Conjurar Nuvem de Neblina",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        endConditions: {
          events: [
            { type: "lostConcentration" },
            { type: "wasHitByStrongWind" },
          ],
        },

        parameters: {
          activation: { type: "action" },
          range: { normal: 120, unit: "ft" },
          target: { type: "point" },
          area: { shape: "sphere", radius: 20, unit: "ft" },
          outcomes: [
            {
              id: "fog-cloud-create-area",
              type: "createAreaEffect",
              on: "any",
              surfaceType: "fog",
              status: "heavilyObscured",
              duration: { unit: "hour", value: 1, isConcentration: true },
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementRootParameter",
              propertyPath: "area.radius",
              increment: 20,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-goodberry",
    name: ["Boa Baga", "Goodberry"],
    description:
      "Dez bagas aparecem em sua mão. Uma criatura pode usar uma ação bônus para comer uma, recuperando 1 PV. Uma baga fornece nutrição para um dia.",
    source: "LDJ2024",
    page: 280,
    level: 1,
    school: "conjuration",
    components: {
      types: ["verbal", "somatic", "material"],
      material: { description: "um ramo de visco" },
    },
    // A duração da magia se refere à existência das bagas
    duration: { unit: "hour", value: 24 },
    effects: [
      {
        name: "Conjurar Boa Baga",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { unit: "ft", normal: 5 },
          target: { type: "self" },
          outcomes: [
            {
              id: "goodberry-create-berries",
              type: "createItem",
              on: "any",
              itemId: "item-goodberry",
              quantity: 10,
              duration: { unit: "hour", value: 24 },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-grease",
    name: ["Graxa", "Grease"],
    description:
      "Graxa não inflamável cobre o chão em um quadrado de 10 pés, tornando-o terreno difícil. Cada criatura na área deve passar em um teste de resistência de Destreza ou cairá no chão (prone).",
    source: "LDJ2024",
    page: 280,
    level: 1,
    school: "conjuration",
    components: {
      types: ["verbal", "somatic", "material"],
      material: { description: "um pouco de casca de porco ou manteiga" },
    },
    duration: { unit: "minute", value: 1 },
    effects: [
      {
        name: "Conjurar Graxa",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { normal: 60, unit: "ft" },
          target: { type: "point" },
          area: { shape: "cube", size: 10, unit: "ft" },
          save: {
            ability: "dexterity",
            dc: {
              type: "calculated",
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "grease-initial-prone",
              type: "applyCondition",
              on: "fail",
              condition: "prone",
            },
            {
              id: "grease-create-area",
              type: "createAreaEffect",
              on: "any",
              surfaceType: "grease",
              isDifficultTerrain: true,
              duration: { unit: "minute", value: 1 },
              rules: [
                {
                  trigger: {
                    events: [
                      { type: "enteredArea" },
                      { type: "endedTurnInArea" },
                    ],
                  },
                  save: {
                    ability: "dexterity",
                    dc: {
                      type: "calculated",
                      base: 8,
                      attributes: ["proficiency", "spellcasting"],
                    },
                  },
                  outcomes: [
                    {
                      id: "grease-ongoing-prone",
                      type: "applyCondition",
                      on: "fail",
                      condition: "prone",
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-guiding-bolt",
    name: ["Raio Guiador", "Guiding Bolt"],
    description:
      "Você lança um raio de luz. Faça um ataque de magia à distância. Em um acerto, causa 4d6 de dano radiante, e a próxima jogada de ataque contra o alvo tem vantagem.",
    source: "LDJ2024",
    page: 282,
    level: 1,
    school: "evocation",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "round", value: 1 },
    effects: [
      {
        name: "Conjurar Raio Guiador",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { normal: 120, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          attackType: [{ source: "spell", range: "ranged", handsInUse: "one" }],
          outcomes: [
            {
              id: "guiding-bolt-damage",
              type: "modifyTargetHP",
              on: "hit",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 4, faces: 6 },
                damageTypeOptions: ["radiant"],
              },
            },
            {
              type: "grantAdvantageDisadvantage",
              on: "hit",
              target: { type: "creature", quantity: 1 },
              mode: "advantage",
              targetRoll: "attackRoll",
              appliesTo: "nextAttacker",
              duration: { unit: "turn", value: 1 },
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementOutcomeProperty",
              outcomeId: "guiding-bolt-damage",
              propertyPath: "formula.roll.count",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-hail-of-thorns",
    name: ["Chuva de Espinhos", "Hail of Thorns"],
    description:
      "Após acertar com uma arma de longo alcance, espinhos explodem. O alvo e cada criatura a 5 pés dele devem fazer um teste de resistência de Destreza, sofrendo 1d10 de dano perfurante em falha, ou metade em sucesso.",
    source: "LDJ2024",
    page: 283,
    level: 1,
    school: "conjuration",
    components: { types: ["verbal"] },
    duration: { unit: "instantaneous" },
    effects: [
      {
        name: "Conjurar Chuva de Espinhos",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: {
            type: "bonus",
            triggers: {
              events: [
                {
                  type: "madeAttackRoll",
                  attackType: {
                    source: "weapon",
                    range: "ranged",
                    handsInUse: "any",
                  },
                },
              ],
            },
          },
          target: {
            type: "descriptive",
            details: "O alvo do ataque e criaturas a 5 pés dele.",
          },
          area: { shape: "sphere", radius: 5, unit: "ft" },
          save: {
            ability: "dexterity",
            dc: {
              type: "calculated",
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "hail-of-thorns-damage-fail",
              type: "modifyTargetHP",
              on: "fail",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 10 },
                damageTypeOptions: ["piercing"],
              },
            },
            {
              id: "hail-of-thorns-damage-success",
              type: "modifyTargetHP",
              on: "success",
              vitals: ["currentHp"],
              formula: {
                type: "halfDamage",
                of: "hail-of-thorns-damage-fail",
              },
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementOutcomeProperty",
              outcomeId: "hail-of-thorns-damage-fail",
              propertyPath: "formula.roll.count",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-hellish-rebuke",
    name: ["Repreensão Infernal", "Hellish Rebuke"],
    description:
      "Como reação a sofrer dano, a criatura que o danificou é cercada por chamas. Ela deve fazer um teste de resistência de Destreza, sofrendo 2d10 de dano de fogo em falha, ou metade em sucesso.",
    source: "LDJ2024",
    page: 284,
    level: 1,
    school: "evocation",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "instantaneous" },
    effects: [
      {
        name: "Conjurar Repreensão Infernal",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: {
            type: "reaction",
            triggers: {
              events: [
                {
                  type: "wasAttacked",
                  byVisibleCreature: true,
                  maxDistance: { unit: "ft", normal: 60 },
                },
              ],
            },
          },
          range: { normal: 60, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          save: {
            ability: "dexterity",
            dc: {
              type: "calculated",
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "hellish-rebuke-damage-fail",
              type: "modifyTargetHP",
              on: "fail",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 2, faces: 10 },
                damageTypeOptions: ["fire"],
              },
            },
            {
              id: "hellish-rebuke-damage-success",
              type: "modifyTargetHP",
              on: "success",
              vitals: ["currentHp"],
              formula: {
                type: "halfDamage",
                of: "hellish-rebuke-damage-fail",
              },
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementOutcomeProperty",
              outcomeId: "hellish-rebuke-damage-fail",
              propertyPath: "formula.roll.count",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-heroism",
    name: ["Heroísmo", "Heroism"],
    description:
      "Uma criatura voluntária que você toca fica imune à condição Assustado e ganha PVs temporários iguais ao seu modificador de habilidade de conjuração no início de cada um de seus turnos.",
    source: "LDJ2024",
    page: 285,
    level: 1,
    school: "enchantment",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "minute", value: 1, isConcentration: true },
    effects: [
      {
        name: "Conjurar Heroísmo",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        endConditions: {
          events: [{ type: "lostConcentration" }],
        },
        parameters: {
          activation: { type: "action" },
          range: { unit: "ft", normal: 5 },
          target: { type: "creature", quantity: 1 },
          outcomes: [
            {
              id: "heroism-apply-effect",
              type: "applyEffect",
              on: "any",
              effect: {
                name: "Força Heroica",
                type: "triggeredEffect",
                triggers: { events: [{ type: "onTurnStart" }] },
                outcomes: [
                  {
                    id: "heroism-temp-hp",
                    type: "modifyTargetHP",
                    on: "any",
                    vitals: ["tempHp"],
                    formula: { type: "healing", addSpellcastingModifier: true },
                  },
                ],
                duration: { unit: "minute", value: 1, isConcentration: true },
              },
            },
            {
              id: "heroism-frightened-immunity",
              type: "descriptive",
              on: "any",
              details: "O alvo é imune à condição Assustado.",
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementRootParameter",
              propertyPath: "target.quantity",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-hex",
    name: ["Rogar Praga", "Hex"],
    description:
      "Você amaldiçoa uma criatura. Até a magia acabar, você causa 1d6 de dano necrótico extra a ela com seus ataques e ela tem desvantagem em testes de uma habilidade à sua escolha. Se o alvo morrer, você pode mover a praga.",
    source: "LDJ2024",
    page: 285,
    level: 1,
    school: "enchantment",
    components: {
      types: ["verbal", "somatic", "material"],
      material: { description: "o olho petrificado de um tritão" },
    },
    duration: { unit: "hour", value: 1, isConcentration: true },
    effects: [
      {
        name: "Conjurar Rogar Praga",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        endConditions: {
          events: [{ type: "lostConcentration" }],
        },
        parameters: {
          activation: { type: "bonus" },
          range: { normal: 90, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          outcomes: [
            {
              id: "hex-apply-curse",
              type: "applyEffect",
              on: "any",
              effect: {
                name: "Dano Extra da Maldição",
                type: "triggeredEffect",
                triggers: {
                  events: [{ type: "dealtDamage" }],
                },

                outcomes: [
                  {
                    id: "hex-extra-damage",
                    type: "modifyTargetHP",
                    on: "any",
                    vitals: ["currentHp"],
                    formula: {
                      type: "damage",
                      roll: { count: 1, faces: 6 },
                      damageTypeOptions: ["necrotic"],
                    },
                  },
                ],
                duration: { unit: "hour", value: 1, isConcentration: true },
              },
            },
            {
              id: "hex-disadvantage-rule",
              type: "descriptive",
              on: "any",
              details:
                "Escolha uma habilidade. O alvo tem desvantagem em testes com essa habilidade.",
            },
            {
              id: "hex-move-rule",
              type: "descriptive",
              on: "any",
              details:
                "Se o alvo morrer, você pode usar uma ação bônus para mover a praga para uma nova criatura.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-hunters-mark",
    name: ["Marca do Caçador", "Hunter's Mark"],
    description:
      "Você marca uma criatura como sua presa. Enquanto a magia durar, você causa 1d6 de dano de força extra a ela sempre que acertar um ataque com arma. Além disso, você tem vantagem em testes de Sabedoria (Percepção ou Sobrevivência) para encontrá-la. Se o alvo morrer antes da magia acabar, você pode usar uma ação bônus em um turno posterior para marcar uma nova criatura.",
    source: "LDJ2024",
    page: 287,
    level: 1,
    school: "divination",
    components: { types: ["verbal"] },
    duration: { unit: "hour", value: 1, isConcentration: true },
    effects: [
      {
        name: "Conjurar Marca do Caçador",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        endConditions: {
          events: [{ type: "lostConcentration" }],
        },
        parameters: {
          activation: { type: "bonus" },
          range: { normal: 90, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          outcomes: [
            {
              id: "hunters-mark-apply-effect",
              type: "applyEffect",
              on: "any",
              effect: {
                type: "triggeredEffect",
                name: "Hunters Mark",
                triggers: {
                  events: [
                    {
                      type: "tookDamage",
                      from: ["caster"],
                      attackType: [
                        { source: "weapon", range: "melee", handsInUse: "one" },
                        {
                          source: "weapon",
                          range: "ranged",
                          handsInUse: "one",
                        },
                      ],
                    },
                  ],
                },

                outcomes: [
                  {
                    id: "hunters-mark-damage",
                    type: "modifyTargetHP",
                    on: "any",
                    vitals: ["currentHp"],
                    formula: {
                      type: "damage",
                      roll: { count: 1, faces: 6 },
                      damageTypeOptions: ["force"],
                    },
                  },
                ],
                duration: { unit: "hour", value: 1, isConcentration: true },
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-ice-knife",
    name: ["Faca de Gelo", "Ice Knife"],
    description:
      "Você lança um caco de gelo. Faça um ataque de magia à distância. Em um acerto, causa 1d10 de dano perfurante. Acerte ou erre, o caco explode. O alvo e cada criatura a 5 pés dele devem passar em um teste de Destreza ou sofrerão 2d6 de dano de frio.",
    source: "LDJ2024",
    page: 287,
    level: 1,
    school: "conjuration",
    components: {
      types: ["somatic", "material"],
      material: { description: "uma gota de água ou um pedaço de gelo" },
    },
    duration: { unit: "instantaneous" },
    effects: [
      {
        name: "Conjurar Faca de Gelo",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { normal: 60, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          attackType: [{ source: "spell", range: "ranged", handsInUse: "one" }],

          outcomes: [
            {
              id: "ice-knife-piercing-damage",
              type: "modifyTargetHP",
              on: "hit",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 10 },
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
        chainedEffects: [
          {
            triggers: {
              events: [{ type: "attackHit" }, { type: "attackMissed" }],
            },
            area: { shape: "sphere", radius: 5, unit: "ft" },
            save: {
              type: "calculated",
              attributes: ["dexterity", "spellcasting"],

              base: 8,
            },
            outcomes: [
              {
                id: "ice-knife-explosion-damage",
                type: "modifyTargetHP",
                on: "fail",
                vitals: ["currentHp"],
                formula: {
                  type: "damage",
                  roll: { count: 2, faces: 6 },
                  damageTypeOptions: ["cold"],
                },
              },
              {
                id: "ice-knife-explosion-no-damage",
                type: "none",
                on: "success",
              },
            ],
          },
        ],
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementChainedEffectProperty",
              chainedEffectIndex: 0,
              outcomeId: "ice-knife-explosion-damage",
              propertyPath: "formula.roll.count",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-identify",
    name: ["Identificar", "Identify"],
    description:
      "Você toca um objeto. Se for um item mágico, você aprende suas propriedades, como usá-lo, se requer sintonização e suas cargas. Se tocar uma criatura, você aprende quais magias a afetam.",
    source: "LDJ2024",
    page: 287,
    level: 1,
    school: "divination",
    isRitual: true,
    castingTime: { unit: "minute", value: 1 },
    components: {
      types: ["verbal", "somatic", "material"],
      material: { description: "uma pérola no valor de 100+ PO", costGp: 100 },
    },
    duration: { unit: "instantaneous" },
    effects: [
      {
        name: "Conjurar Identificar",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "special" },
          range: { unit: "ft", normal: 5 },
          target: {
            type: "descriptive",
            details: "Um objeto ou criatura tocado durante toda a conjuração.",
          },
          outcomes: [
            {
              id: "identify-effect",
              type: "descriptive",
              on: "any",
              details:
                "Aprende todas as propriedades de um item mágico ou as magias que afetam uma criatura.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-illusory-script",
    name: ["Escrita Ilusória", "Illusory Script"],
    description:
      "Você escreve em um material e o imbui com uma ilusão. Para você e criaturas designadas, o texto parece normal. Para todos os outros, parece um script desconhecido. A ilusão pode ser desfeita, e Truesight a ignora.",
    source: "LDJ2024",
    page: 288,
    level: 1,
    school: "illusion",
    isRitual: true,
    castingTime: { unit: "minute", value: 1 },
    components: {
      types: ["somatic", "material"],
      material: {
        description: "tinta no valor de 10+ PO, que a magia consome",
        costGp: 10,
        isConsumed: true,
      },
    },
    duration: { unit: "day", value: 10 },
    effects: [
      {
        name: "Conjurar Escrita Ilusória",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "special" },
          range: { unit: "ft", normal: 5 },
          target: { type: "object", quantity: 1 },
          outcomes: [
            {
              id: "illusory-script-effect",
              type: "descriptive",
              on: "any",
              details:
                "O texto escrito só é legível para criaturas que você designa. Para outros, é ininteligível.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-inflict-wounds",
    name: ["Infligir Ferimentos", "Inflict Wounds"],
    description:
      "Uma criatura que você toca deve fazer um teste de resistência de Constituição, sofrendo 2d10 de dano necrótico em uma falha, ou metade em um sucesso.",
    source: "LDJ2024",
    page: 288,
    level: 1,
    school: "necromancy",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "instantaneous" },
    effects: [
      {
        name: "Conjurar Infligir Ferimentos",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { unit: "ft", normal: 5 },
          target: { type: "creature", quantity: 1 },
          save: {
            ability: "constitution",
            dc: {
              type: "calculated",
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "inflict-wounds-damage-fail",
              type: "modifyTargetHP",
              on: "fail",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 2, faces: 10 },
                damageTypeOptions: ["necrotic"],
              },
            },
            {
              id: "inflict-wounds-damage-success",
              type: "modifyTargetHP",
              on: "success",
              vitals: ["currentHp"],
              formula: {
                type: "halfDamage",
                of: "inflict-wounds-damage-fail",
              },
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementOutcomeProperty",
              outcomeId: "inflict-wounds-damage-fail",
              propertyPath: "formula.roll.count",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-jump",
    name: ["Salto", "Jump"],
    description:
      "Você toca uma criatura voluntária. Uma vez em cada um de seus turnos, até o fim da magia, essa criatura pode saltar até 30 pés gastando 10 pés de movimento.",
    source: "LDJ2024",
    page: 290,
    level: 1,
    school: "transmutation",
    components: {
      types: ["verbal", "somatic", "material"],
      material: { description: "a perna traseira de um gafanhoto" },
    },
    duration: { unit: "minute", value: 1 },
    effects: [
      {
        name: "Conjurar Salto",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "bonus" },
          range: { unit: "ft", normal: 5 },
          target: { type: "creature", quantity: 1 },
          outcomes: [
            {
              id: "jump-effect",
              type: "descriptive",
              on: "any",
              details:
                "Uma vez por turno, o alvo pode saltar até 30 pés gastando 10 pés de movimento.",
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementRootParameter",
              propertyPath: "target.quantity",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-longstrider",
    name: ["Passos Longos", "Longstrider"],
    description:
      "Você toca uma criatura. A velocidade do alvo aumenta em 10 pés até o fim da magia.",
    source: "LDJ2024",
    page: 293,
    level: 1,
    school: "transmutation",
    components: {
      types: ["verbal", "somatic", "material"],
      material: { description: "uma pitada de terra" },
    },
    duration: { unit: "hour", value: 1 },
    effects: [
      {
        name: "Conjurar Passos Longos",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { unit: "ft", normal: 5 },
          target: { type: "creature", quantity: 1 },
          outcomes: [
            {
              id: "longstrider-buff",
              type: "modifyAttribute",
              on: "any",
              attribute: "speed",
              operation: "add",
              value: 10,
              stacking: "none",
              duration: { unit: "hour", value: 1 },
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementRootParameter",
              propertyPath: "target.quantity",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-mage-armor",
    name: ["Armadura Arcana", "Mage Armor"],
    description:
      "Você toca uma criatura voluntária que não está vestindo armadura. A CA base do alvo torna-se 13 + seu modificador de Destreza. A magia termina se o alvo vestir armadura.",
    source: "LDJ2024",
    page: 293,
    level: 1,
    school: "abjuration",
    components: {
      types: ["verbal", "somatic", "material"],
      material: { description: "um pedaço de couro curado" },
    },
    duration: { unit: "hour", value: 8 },
    effects: [
      {
        name: "Conjurar Armadura Arcana",
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { unit: "ft", normal: 5 },
          target: { type: "creature", quantity: 1 },
          outcomes: [
            {
              id: "mage-armor-set-ac",
              type: "setAC",
              on: "any",
              calculation: {
                calculation: "formula",
                base: 13,
                attribute: "dexterity",
              },
              duration: { unit: "hour", value: 8 },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-magic-missile",
    name: ["Míssil Mágico", "Magic Missile"],
    description:
      "Você cria três dardos de força mágica. Cada dardo atinge uma criatura de sua escolha, causando 1d4 + 1 de dano de força.",
    source: "LDJ2024",
    page: 295,
    level: 1,
    school: "evocation",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "instantaneous" },
    effects: [
      {
        type: "activatableCastSpell",
        name: "Conjurar Míssil Mágico",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { normal: 120, unit: "ft" },
          target: { type: "creature", quantity: 3 }, // Representa os 3 dardos
          outcomes: [
            {
              id: "magic-missile-damage",
              type: "modifyTargetHP",
              on: "any", // Míssil Mágico não erra
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 4, bonus: { value: 1 } },
                damageTypeOptions: ["force"],
              },
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementRootParameter",
              propertyPath: "target.quantity",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-protection-from-evil-and-good",
    name: ["Proteção contra o Bem e o Mal", "Protection from Evil and Good"],
    description:
      "Uma criatura voluntária que você toca é protegida contra Aberrações, Celestiais, etc. Tais criaturas têm desvantagem em ataques contra o alvo, e o alvo não pode ser possuído, encantado ou amedrontado por elas.",
    source: "LDJ2024",
    page: 309,
    level: 1,
    school: "abjuration",
    components: {
      types: ["verbal", "somatic", "material"],
      material: {
        description: "água benta ou pó de prata e ferro, que a magia consome",
      },
    },
    duration: { unit: "minute", value: 10, isConcentration: true },
    effects: [
      {
        type: "activatableCastSpell",
        name: "Conjurar Proteção contra o Bem e o Mal",
        actionId: "act-cast-spell",
        endConditions: {
          events: [{ type: "lostConcentration" }],
        },
        parameters: {
          activation: { type: "action" },
          range: { unit: "ft", normal: 5 },
          target: { type: "creature", quantity: 1 },
          outcomes: [
            {
              id: "protection-from-evil-good-effect",
              type: "descriptive",
              on: "any",
              details:
                "Criaturas especificadas têm desvantagem para atacar o alvo. O alvo não pode ser encantado, amedrontado ou possuído por elas e tem vantagem em novos testes de resistência contra esses efeitos existentes.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-purify-food-and-drink",
    name: ["Purificar Comida e Bebida", "Purify Food and Drink"],
    description:
      "Você remove veneno e podridão de comida e bebida não mágicas em uma esfera de 5 pés de raio.",
    source: "LDJ2024",
    page: 310,
    level: 1,
    school: "transmutation",
    isRitual: true,
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "instantaneous" },
    effects: [
      {
        type: "activatableCastSpell",
        name: "Conjurar Purificar Comida e Bebida",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { normal: 10, unit: "ft" },
          area: { shape: "sphere", radius: 5, unit: "ft" },
          outcomes: [
            {
              id: "purify-food-drink-effect",
              type: "descriptive",
              on: "any",
              details: "purifica agua ou alimentos",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-ray-of-sickness",
    name: ["Raio da Doença", "Ray of Sickness"],
    description:
      "Você dispara um raio esverdeado. Faça um ataque de magia à distância. Em um acerto, o alvo sofre 2d8 de dano de veneno e fica envenenado até o final do seu próximo turno.",
    source: "LDJ2024",
    page: 311,
    level: 1,
    school: "necromancy",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "instantaneous" },
    effects: [
      {
        type: "activatableCastSpell",
        name: "Conjurar Raio da Doença",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { normal: 60, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          attackType: [{ source: "spell", range: "ranged", handsInUse: "one" }],
          outcomes: [
            {
              id: "ray-of-sickness-damage",
              type: "modifyTargetHP",
              on: "hit",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 2, faces: 8 },
                damageTypeOptions: ["poison"],
              },
            },
            {
              id: "ray-of-sickness-poison",
              type: "applyCondition",
              on: "hit",
              condition: "poisoned",
              duration: { unit: "turn", value: 1 },
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementOutcomeProperty",
              outcomeId: "ray-of-sickness-damage",
              propertyPath: "formula.roll.count",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-sanctuary",
    name: ["Santuário", "Sanctuary"],
    description:
      "Você protege uma criatura. Qualquer criatura que a visar com um ataque ou magia prejudicial deve primeiro fazer um teste de Sabedoria. Em uma falha, deve escolher um novo alvo ou perder o ataque/magia. A magia termina se a criatura protegida atacar, conjurar uma magia ou causar dano.",
    source: "LDJ2024",
    page: 313,
    level: 1,
    school: "abjuration",
    components: {
      types: ["verbal", "somatic", "material"],
      material: { description: "um caco de vidro de um espelho" },
    },
    duration: { unit: "minute", value: 1 },
    effects: [
      {
        type: "activatableCastSpell",
        name: "Conjurar Santuário",
        actionId: "act-cast-spell",
        endConditions: {
          events: [{ type: "hostile", who: ["user"], is: true }],
        },

        parameters: {
          activation: { type: "bonus" },
          range: { normal: 30, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          outcomes: [
            {
              id: "sanctuary-effect",
              type: "descriptive",
              on: "any",
              details:
                "Qualquer criatura que tente atacar ou prejudicar o alvo deve primeiro passar em um teste de resistência de Sabedoria (CD da magia).",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-searing-smite",
    name: ["Golpe Fervente", "Searing Smite"],
    description:
      "Ao acertar com um ataque corpo a corpo, você causa 1d6 extra de dano de fogo. No início de cada um de seus turnos, o alvo sofre 1d6 de dano de fogo e faz um teste de Constituição para encerrar o efeito.",
    source: "LDJ2024",
    page: 314,
    level: 1,
    school: "evocation",
    components: { types: ["verbal"] },
    duration: { unit: "minute", value: 1 },
    effects: [
      {
        type: "activatableCastSpell",
        name: "Conjurar Golpe Fervente",
        actionId: "act-cast-spell",
        parameters: {
          activation: {
            type: "bonus",
            triggers: {
              events: [
                {
                  type: "madeAttackRoll",
                  attackType: {
                    source: "weapon",
                    range: "melee",
                    handsInUse: "one",
                  },
                },
              ],
            },
          },
          target: { type: "descriptive", details: "Alvo do ataque." },
          outcomes: [
            {
              id: "searing-smite-initial-damage",
              type: "modifyTargetHP",
              on: "hit",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 6 },
                damageTypeOptions: ["fire"],
              },
            },
            {
              id: "searing-smite-burning-effect",
              type: "applyCondition",
              on: "hit",
              condition: "burning",
              duration: { unit: "minute", value: 1 },
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementOutcomeProperty",
              outcomeId: "searing-smite-initial-damage",
              propertyPath: "formula.roll.count",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-shield",
    name: ["Escudo Arcano", "Shield"],
    description:
      "Como reação ao ser atingido por um ataque ou alvo do Míssil Mágico, você ganha +5 de CA até o início do seu próximo turno e não sofre dano do Míssil Mágico.",
    source: "LDJ2024",
    page: 316,
    level: 1,
    school: "abjuration",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "round", value: 1 },
    effects: [
      {
        type: "activatableCastSpell",
        name: "Conjurar Escudo Arcano",
        actionId: "act-cast-spell",
        parameters: {
          activation: {
            type: "reaction",
            triggers: {
              events: [
                {
                  type: "wasAffectedBySpell",
                  spellId: "spell-magic-missile",
                },
                {
                  type: "wasAttacked",
                  byVisibleCreature: true,
                  maxDistance: { unit: "ft", normal: 60 },
                },
              ],
              conditionMode: "any",
            },
          },
          target: { type: "self" },
          outcomes: [
            {
              id: "shield-ac-bonus",
              type: "applyEffect",
              on: "any",
              effect: {
                name: "Bônus de CA do Escudo",
                type: "passive_providesBonus",
                on: "ac",
                value: 5,
                duration: { unit: "round", value: 1 },
              },
            },
            {
              id: "shield-magic-missile-immunity",
              type: "descriptive",
              on: "any",
              details: "Você não sofre dano de Míssil Mágico.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-shield-of-faith",
    name: ["Escudo da Fé", "Shield of Faith"],
    description:
      "Um campo cintilante envolve uma criatura, concedendo-lhe um bônus de +2 na CA pela duração.",
    source: "LDJ2024",
    page: 316,
    level: 1,
    school: "abjuration",
    components: {
      types: ["verbal", "somatic", "material"],
      material: { description: "um pergaminho de oração" },
    },
    duration: { unit: "minute", value: 10, isConcentration: true },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "act-cast-spell",
        name: "Conjurar Escudo Arcano",
        endConditions: {
          events: [{ type: "lostConcentration" }],
        },
        parameters: {
          activation: { type: "bonus" },
          range: { normal: 60, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          outcomes: [
            {
              id: "shield-of-faith-apply-buff",
              type: "applyEffect",
              on: "any",
              effect: {
                name: "Bônus de CA da Fé",
                type: "passive_providesBonus",
                on: "ac",
                value: 2,
                duration: { unit: "minute", value: 10, isConcentration: true },
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-silent-image",
    name: ["Imagem Silenciosa", "Silent Image"],
    description:
      "Você cria a imagem de um objeto, criatura ou fenômeno de até 15 pés cúbicos. A imagem é puramente visual. A interação física a revela como uma ilusão.",
    source: "LDJ2024",
    page: 317,
    level: 1,
    school: "illusion",
    components: {
      types: ["verbal", "somatic", "material"],
      material: { description: "um pouco de lã" },
    },
    duration: { unit: "minute", value: 10, isConcentration: true },
    effects: [
      {
        type: "activatableCastSpell",
        name: "Conjurar Imagem Silenciosa",
        actionId: "act-cast-spell",
        endConditions: {
          events: [{ type: "lostConcentration" }],
        },
        parameters: {
          activation: { type: "action" },
          range: { normal: 60, unit: "ft" },
          target: { type: "point" },
          outcomes: [
            {
              id: "silent-image-summon",
              type: "summonToken",
              on: "any",
              tokenId: "token-silent-image",
              quantity: 1,
              duration: { unit: "minute", value: 10, isConcentration: true },
            },
            {
              id: "silent-image-rules",
              type: "descriptive",
              on: "any",
              details:
                "A imagem não tem som ou outros efeitos sensoriais. Você pode movê-la com uma ação. Interação física ou um teste de Investigação bem-sucedido revelam a ilusão.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-sleep",
    name: ["Sono", "Sleep"],
    description:
      "Criaturas à sua escolha em uma esfera de 5 pés de raio devem passar em um teste de Sabedoria ou ficam Incapacitadas. Se falharem no próximo teste, ficam Inconscientes. Criaturas que não dormem são imunes.",
    source: "LDJ2024",
    page: 317,
    level: 1,
    school: "enchantment",
    components: {
      types: ["verbal", "somatic", "material"],
      material: { description: "uma pitada de areia ou pétalas de rosa" },
    },
    duration: { unit: "minute", value: 1, isConcentration: true },
    effects: [
      {
        type: "activatableCastSpell",
        name: "Conjurar Sono",
        actionId: "act-cast-spell",
        endConditions: {
          events: [{ type: "lostConcentration" }],
        },
        parameters: {
          activation: { type: "action" },
          range: { normal: 60, unit: "ft" },
          area: {
            shape: "sphere",
            radius: 5,
            unit: "ft",
            selectionMode: "choice",
          },
          save: {
            ability: "wisdom",
            dc: {
              type: "calculated",
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "sleep-incapacitated",
              type: "applyCondition",
              on: "fail",
              condition: "incapacitated",
              duration: { unit: "turn", value: 1 },
            },
            {
              id: "sleep-unconscious-rule",
              type: "descriptive",
              on: "fail",
              details:
                "No final de seu próximo turno, o alvo repete o teste de resistência. Em uma falha, fica Inconsciente pela duração.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-speak-with-animals",
    name: ["Falar com Animais", "Speak with Animals"],
    description:
      "Pela duração, você pode compreender e se comunicar verbalmente com Bestas.",
    source: "LDJ2024",
    page: 318,
    level: 1,
    school: "divination",
    isRitual: true,
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "minute", value: 10 },
    effects: [
      {
        type: "activatableCastSpell",
        name: "Conjurar Falar com Animais",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "action" },
          target: { type: "self" },
          outcomes: [
            {
              id: "speak-with-animals-effect",
              type: "descriptive",
              on: "any",
              details:
                "Você pode compreender e comunicar-se verbalmente com criaturas do tipo Besta pela duração.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-tashas-hideous-laughter",
    name: ["Riso Histérico de Tasha", "Tasha's Hideous Laughter"],
    description:
      "Uma criatura deve passar em um teste de Sabedoria ou cairá no chão (prone) e ficará Incapacitada, rindo incontrolavelmente. A cada dano sofrido ou no final de seus turnos, pode tentar um novo teste.",
    source: "LDJ2024",
    page: 331,
    level: 1,
    school: "enchantment",
    components: {
      types: ["verbal", "somatic", "material"],
      material: { description: "uma torta e uma pena" },
    },
    duration: { unit: "minute", value: 1, isConcentration: true },
    effects: [
      {
        type: "activatableCastSpell",
        name: "Conjurar Riso Histérico de Tasha",
        actionId: "act-cast-spell",
        endConditions: {
          events: [{ type: "lostConcentration" }],
        },
        parameters: {
          activation: { type: "action" },
          range: { normal: 30, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          save: {
            ability: "wisdom",
            dc: {
              type: "calculated",
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "tashas-laughter-prone",
              type: "applyCondition",
              on: "fail",
              condition: "prone",
              duration: { unit: "minute", value: 1, isConcentration: true },
            },
            {
              id: "tashas-laughter-incapacitated",
              type: "applyCondition",
              on: "fail",
              condition: "incapacitated",
              duration: { unit: "minute", value: 1, isConcentration: true },
            },
            {
              id: "tashas-laughter-repeat-save",
              type: "descriptive",
              on: "fail",
              details:
                "No final de cada um de seus turnos e cada vez que sofre dano, o alvo pode fazer outro teste de Sabedoria (com vantagem se for por dano) para encerrar o efeito.",
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementRootParameter",
              propertyPath: "target.quantity",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-tensers-floating-disk",
    name: ["Disco Flutuante de Tenser", "Tenser's Floating Disk"],
    description:
      "Cria um disco de força horizontal que pode carregar até 500 libras. Ele te segue, permanecendo a 20 pés de você.",
    source: "LDJ2024",
    page: 332,
    level: 1,
    school: "conjuration",
    isRitual: true,
    components: {
      types: ["verbal", "somatic", "material"],
      material: { description: "uma gota de mercúrio" },
    },
    duration: { unit: "hour", value: 1 },
    effects: [
      {
        type: "activatableCastSpell",
        name: "Conjurar Disco Flutuante de Tenser",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { normal: 30, unit: "ft" },
          target: { type: "point" },
          outcomes: [
            {
              id: "tensers-disk-summon",
              type: "summonToken",
              on: "any",
              tokenId: "token-tensers-floating-disk",
              quantity: 1,
              duration: { unit: "hour", value: 1 },
            },
            {
              id: "tensers-disk-rules",
              type: "descriptive",
              on: "any",
              details:
                "O disco tem 3 pés de diâmetro, flutua a 3 pés do chão e carrega até 500 libras. Ele o segue a uma distância de 20 pés. A magia termina se você se afastar mais de 100 pés.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-thunderous-smite",
    name: ["Golpe Trovejante", "Thunderous Smite"],
    description:
      "Ao acertar com um ataque corpo a corpo, você causa 2d6 extra de dano de trovão. A criatura deve passar em um teste de Força ou será empurrada 10 pés e cairá no chão (prone).",
    source: "LDJ2024",
    page: 334,
    level: 1,
    school: "evocation",
    components: { types: ["verbal"] },
    duration: { unit: "instantaneous" },
    effects: [
      {
        type: "activatableCastSpell",
        name: "Conjurar Golpe Trovejante",
        actionId: "act-cast-spell",
        parameters: {
          activation: {
            type: "bonus",
            triggers: {
              events: [
                {
                  type: "madeAttackRoll",
                  attackType: {
                    source: "weapon",
                    range: "melee",
                    handsInUse: "one",
                  },
                },
              ],
            },
          },
          target: { type: "descriptive", details: "Alvo do ataque." },
          save: {
            ability: "strength",
            dc: {
              type: "calculated",
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "thunderous-smite-damage",
              type: "modifyTargetHP",
              on: "hit",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 2, faces: 6 },
                damageTypeOptions: ["thunder"],
              },
            },
            {
              id: "thunderous-smite-push",
              type: "moveTarget",
              on: "fail",
              direction: "away",
              distance: { value: 10, unit: "ft" },
            },
            {
              id: "thunderous-smite-prone",
              type: "applyCondition",
              on: "fail",
              condition: "prone",
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementOutcomeProperty",
              outcomeId: "thunderous-smite-damage",
              propertyPath: "formula.roll.count",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-thunderwave",
    name: ["Onda Trovejante", "Thunderwave"],
    description:
      "Uma onda de energia trovejante explode de você. Cada criatura em um cubo de 15 pés deve fazer um teste de Constituição. Em falha, sofre 2d8 de dano de trovão e é empurrada 10 pés. Em sucesso, sofre metade do dano.",
    source: "LDJ2024",
    page: 334,
    level: 1,
    school: "evocation",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "instantaneous" },
    effects: [
      {
        type: "activatableCastSpell",
        name: "Conjurar Onda Trovejante",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "action" },
          target: { type: "selfArea" },
          area: { shape: "cube", size: 15, unit: "ft" },
          save: {
            ability: "constitution",
            dc: {
              type: "calculated",
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "thunderwave-damage-fail",
              type: "modifyTargetHP",
              on: "fail",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 2, faces: 8 },
                damageTypeOptions: ["thunder"],
              },
            },
            {
              id: "thunderwave-push",
              type: "moveTarget",
              on: "fail",
              direction: "away",
              distance: { value: 10, unit: "ft" },
            },
            {
              id: "thunderwave-damage-success",
              type: "modifyTargetHP",
              on: "success",
              vitals: ["currentHp"],
              formula: { type: "halfDamage", of: "thunderwave-damage-fail" },
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementOutcomeProperty",
              outcomeId: "thunderwave-damage-fail",
              propertyPath: "formula.roll.count",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-unseen-servant",
    name: ["Servo Invisível", "Unseen Servant"],
    description:
      "Cria uma força invisível, sem mente e sem forma que realiza tarefas simples ao seu comando.",
    source: "LDJ2024",
    page: 336,
    level: 1,
    school: "conjuration",
    isRitual: true,
    components: {
      types: ["verbal", "somatic", "material"],
      material: { description: "um pedaço de corda e de madeira" },
    },
    duration: { unit: "hour", value: 1 },
    effects: [
      {
        type: "activatableCastSpell",
        name: "Conjurar Servo Invisível",
        actionId: "act-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { normal: 60, unit: "ft" },
          target: { type: "point" },
          outcomes: [
            {
              id: "unseen-servant-summon",
              type: "summonToken",
              on: "any",
              tokenId: "token-unseen-servant",
              quantity: 1,
              duration: { unit: "hour", value: 1 },
            },
            {
              id: "unseen-servant-rules",
              type: "descriptive",
              on: "any",
              details:
                "O servo é Médio, tem CA 10, 1 PV, Força 2 e não pode atacar. Você pode comandá-lo com uma ação bônus para se mover e interagir com objetos.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-witch-bolt",
    name: ["Raio Enfeitiçante", "Witch Bolt"],
    description:
      "Um raio de energia crepitante atinge uma criatura. Faça um ataque de magia à distância. Em um acerto, causa 2d12 de dano de relâmpago. Em turnos subsequentes, você pode usar uma ação bônus para causar 1d12 de dano de relâmpago automaticamente.",
    source: "LDJ2024",
    page: 343,
    level: 1,
    school: "evocation",
    components: {
      types: ["verbal", "somatic", "material"],
      material: { description: "um galho atingido por um raio" },
    },
    duration: { unit: "minute", value: 1, isConcentration: true },
    effects: [
      {
        type: "activatableCastSpell",
        name: "Raio Enfeitiçante",
        actionId: "act-cast-spell",
        endConditions: {
          events: [{ type: "lostConcentration" }],
        },
        parameters: {
          activation: { type: "action" },
          range: { normal: 60, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          attackType: [{ source: "spell", range: "ranged", handsInUse: "one" }],
          outcomes: [
            {
              id: "witch-bolt-initial-damage",
              type: "modifyTargetHP",
              on: "hit",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 2, faces: 12 },
                damageTypeOptions: ["lightning"],
              },
            },
            {
              id: "witch-bolt-grant-action",
              type: "applyEffect",
              on: "hit",
              effect: {
                name: "Canalização do Witch Bolt",
                type: "activatableAction",
                actionId: "act-magic",
                duration: { unit: "minute", value: 1, isConcentration: true },
                parameters: {
                  activation: { type: "bonus" },
                  outcomes: [
                    {
                      id: "witch-bolt-recurring-damage",
                      type: "modifyTargetHP",
                      on: "any",
                      vitals: ["currentHp"],
                      formula: {
                        type: "damage",
                        roll: { count: 1, faces: 12 },
                        damageTypeOptions: ["lightning"],
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementOutcomeProperty",
              outcomeId: "witch-bolt-initial-damage",
              propertyPath: "formula.roll.count",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-wrathful-smite",
    name: ["Golpe Colérico", "Wrathful Smite"],
    description:
      "Ao acertar com um ataque corpo a corpo, causa 1d6 extra de dano necrótico e o alvo deve passar em um teste de Sabedoria ou ficará Assustado. No final de cada um de seus turnos, pode repetir o teste para encerrar o efeito.",
    source: "LDJ2024",
    page: 343,
    level: 1,
    school: "necromancy",
    components: { types: ["verbal"] },
    duration: { unit: "minute", value: 1 },
    effects: [
      {
        type: "activatableCastSpell",
        name: "Raio Enfeitiçante",
        actionId: "act-cast-spell",
        parameters: {
          activation: {
            type: "bonus",
            triggers: {
              events: [
                {
                  type: "madeAttackRoll",
                  attackType: {
                    source: "weapon",
                    range: "melee",
                    handsInUse: "one",
                  },
                },
              ],
            },
          },
          target: { type: "descriptive", details: "Alvo do ataque." },
          save: {
            ability: "wisdom",
            dc: {
              type: "calculated",
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "wrathful-smite-damage",
              type: "modifyTargetHP",
              on: "hit",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 6 },
                damageTypeOptions: ["necrotic"],
              },
            },
            {
              id: "wrathful-smite-frightened",
              type: "applyCondition",
              on: "fail",
              condition: "frightened",
              duration: { unit: "minute", value: 1 },
            },
            {
              id: "wrathful-smite-repeat-save",
              type: "descriptive",
              on: "fail",
              details:
                "No final de cada um de seus turnos, o alvo repete o teste de resistência para encerrar o efeito.",
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          rules: [
            {
              type: "incrementOutcomeProperty",
              outcomeId: "wrathful-smite-damage",
              propertyPath: "formula.roll.count",
              increment: 1,
            },
          ],
        },
      },
    ],
  },
] as const satisfies Spell[];
