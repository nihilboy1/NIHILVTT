import type { Spell } from "../../domain/spell/spell.schema.js";

export const spellsLevel0: Spell[] = [
  {
    id: "spell-bolha-acida",
    name: ["Bolha Ácida", "Acid Splash"],
    source: "LDJ2024",
    page: 239,
    level: 0,
    school: "evocation",
    components: {
      types: ["verbal", "somatic"],
    },
    duration: {
      unit: "instantaneous",
    },
    description:
      "Você cria uma bolha ácida em um ponto dentro do alcance, onde ela explode em um raio de 1,5 metro (5 foot). Cada criatura nessa área deve ser bem-sucedida em um teste de resistência de Destreza ou sofrer 1d6 de dano ácido.",
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        parameters: {
          activation: {
            type: "action",
          },
          range: {
            normal: 60,
            unit: "ft",
          },
          area: {
            shape: "sphere",
            radius: 5,
          },
          save: {
            ability: "dexterity",
            dc: {
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "acid-splash-damage",
              type: "damage",
              on: "fail",
              formula: {
                roll: { count: 1, faces: 6 },
                damageType: "acid",
              },
            },
            {
              type: "none",
              on: "success",
            },
          ],
        },
        scaling: {
          type: "characterLevel",
          rules: [
            {
              type: "modifyOutcomeFormula",
              level: 5,
              outcomeId: "acid-splash-damage",
              newFormula: {
                roll: { count: 2, faces: 6 },
                damageType: "acid",
              },
            },
            {
              type: "modifyOutcomeFormula",

              level: 11,
              outcomeId: "acid-splash-damage",
              newFormula: {
                roll: { count: 3, faces: 6 },
                damageType: "acid",
              },
            },
            {
              type: "modifyOutcomeFormula",

              level: 17,
              outcomeId: "acid-splash-damage",
              newFormula: {
                roll: { count: 4, faces: 6 },
                damageType: "acid",
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-protecao-contra-laminas",
    name: ["Proteção Contra Lâminas", "Blade Ward"],
    source: "LDJ2024",
    page: 247,
    level: 0,
    school: "abjuration",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "minute", value: 1, isConcentration: true },
    description:
      "Sempre que uma criatura fizer uma jogada de ataque contra você antes do fim da magia, o atacante subtrai 1d4 da jogada de ataque.",
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        parameters: {
          activation: { type: "action" },
          target: { type: "self" },
          outcomes: [
            {
              type: "applyEffect",
              on: "success",
              effect: {
                type: "triggeredModifier",
                trigger: "onBeingAttacked",
                modifier: {
                  operation: "subtract",
                  dice: { count: 1, faces: 4 },
                  target: "attackRoll",
                  appliesTo: "attacker",
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
      },
    ],
  },
  {
    id: "spell-toque-arrepiante",
    name: ["Toque Arrepiante", "Chill Touch"],
    source: "LDJ2024",
    page: 249,
    level: 0,
    school: "necromancy",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "instantaneous" },
    description:
      "Canalizando o frio da sepultura, você realiza um ataque corpo a corpo com magia contra uma criatura ao seu alcance. Em um acerto, o alvo sofre **1d10 de dano necrótico** e **não pode recuperar pontos de vida** até o final do seu próximo turno.\n\n**Aprimoramento de Truque:** O dano aumenta em **1d10** quando você alcança os níveis **5 (2d10)**, **11 (3d10)** e **17 (4d10)**.",
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        parameters: {
          activation: { type: "action" },
          target: { type: "creature", quantity: 1 },
          attackType: "meleeSpellAttack",
          outcomes: [
            {
              id: "chill-touch-damage",
              type: "damage",
              on: "hit",
              formula: {
                roll: { count: 1, faces: 10 },
                damageType: "necrotic",
              },
            },
            {
              type: "applyEffect",
              on: "hit",
              effect: {
                type: "preventsHealing",
                duration: { unit: "turn", value: 1 },
              },
            },
          ],
        },
        scaling: {
          type: "characterLevel",
          rules: [
            {
              type: "modifyOutcomeFormula",
              level: 5,
              outcomeId: "chill-touch-damage",
              newFormula: {
                roll: { count: 2, faces: 10 },
                damageType: "necrotic",
              },
            },
            {
              type: "modifyOutcomeFormula",

              level: 11,
              outcomeId: "chill-touch-damage",
              newFormula: {
                roll: { count: 3, faces: 10 },
                damageType: "necrotic",
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 17,
              outcomeId: "chill-touch-damage",
              newFormula: {
                roll: { count: 4, faces: 10 },
                damageType: "necrotic",
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-luzes-dancantes",
    name: ["Luzes Dançantes", "Dancing Lights"],
    source: "LDJ2024",
    page: 259,
    level: 0,
    school: "illusion",
    components: {
      types: ["verbal", "somatic"],
      material: {
        description: "a bit of phosphorus",
        costGp: 0,
        isConsumed: false,
      },
    },
    duration: { unit: "minute", value: 1, isConcentration: true },
    description:
      "Você cria até quatro luzes do tamanho de tochas dentro do alcance...",
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { normal: 120, unit: "ft" },
          target: { type: "pointInSpace" },
          outcomes: [
            {
              type: "summonToken",
              on: "success",
              token: {
                name: "Dancing Light",
                quantity: 4,
                effects: [
                  {
                    type: "passive_providesLight",
                    properties: { bright: 0, dim: 10 },
                  },
                ],
              },
              duration: { unit: "minute", value: 1, isConcentration: true },
            },
            {
              type: "applyEffect",
              on: "success",
              effect: {
                type: "activatableAction",
                actionId: "action-move-summoned-token",
                duration: { unit: "minute", value: 1, isConcentration: true },
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-druidismo",
    name: ["Druidismo", "Druidcraft"],
    source: "LDJ2024",
    page: 266,
    level: 0,
    school: "transmutation",
    components: {
      types: ["verbal", "somatic"],
    },
    duration: {
      unit: "instantaneous",
    },
    description:
      "Você sussurra para os espíritos da natureza, criando um dos seguintes efeitos dentro do alcance: Você cria um efeito sensorial inofensivo e minúsculo que prevê o clima em sua localização pelas próximas 24 horas. O efeito pode se manifestar como um orbe dourado para céus claros, uma nuvem para chuva, flocos de neve caindo para neve, e assim por diante. Esse efeito persiste por 1 rodada. Você instantaneamente faz uma flor desabrochar, uma vagem se abrir ou um botão de folha brotar. Você cria um efeito sensorial inofensivo, como folhas caindo, fadas espectrais dançantes, uma brisa suave, o som de um animal ou o cheiro fraco de gambá. O efeito deve caber em um cubo de 1,5 metro (5 pés). Você acende ou apaga uma vela, uma tocha ou uma fogueira.",
    effects: [],
  },
  {
    id: "spell-rajada-mistica",
    name: ["Rajada Mística", "Eldritch Blast"],
    source: "LDJ2024",
    page: 267,
    level: 0,
    school: "evocation",
    description:
      "Você arremessa um raio de energia crepitante. Faça um ataque mágico à distância contra uma criatura ou objeto no alcance. Em caso de acerto, o alvo sofre 1d10 de dano de Força. A magia cria mais de um raio quando você alcança níveis mais altos: dois raios no 5º nível, três raios no 11º nível e quatro raios no 17º nível. Você pode direcionar os raios para o mesmo alvo ou para alvos diferentes. Faça uma jogada de ataque separada para cada raio.",
    components: {
      types: ["verbal", "somatic"],
    },
    duration: {
      unit: "instantaneous",
    },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        parameters: {
          activation: {
            type: "action",
          },
          range: {
            normal: 120,
            unit: "ft",
          },

          target: {
            type: "creature",
            quantity: 1,
          },
          attackType: "rangedSpellAttack",

          outcomes: [
            {
              id: "eldritch-blast-damage",
              type: "damage",
              on: "hit",
              formula: {
                roll: { count: 1, faces: 10 },
                damageType: "force",
              },
            },
          ],
        },
        scaling: {
          type: "characterLevel",
          rules: [
            {
              type: "modifyActionParameter",
              level: 5,
              propertyPath: "target.quantity",
              newValue: 2,
            },

            {
              type: "modifyActionParameter",
              level: 11,
              propertyPath: "target.quantity",
              newValue: 3,
            },

            {
              type: "modifyActionParameter",
              level: 17,
              propertyPath: "target.quantity",
              newValue: 4,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-elementalismo",
    name: ["Elementalismo", "Elementalism"],
    source: "LDJ2024",
    page: 267,
    level: 0,
    school: "transmutation",
    description:
      "Você exerce controle sobre os elementos, criando um dos seguintes efeitos dentro do alcance:\n\n**Conjurando o Ar:** Você cria uma brisa forte o suficiente para ondular tecidos, levantar poeira, farfalhar folhas e fechar portas e persianas abertas, tudo em um cubo de 1,5 metro. Portas e persianas sendo mantidas abertas por alguém ou algo não são afetadas.\n\n**Conjurando a Terra:** Você cria uma fina camada de poeira ou areia que cobre superfícies em uma área de 1,5 metro quadrado, ou faz com que uma única palavra apareça em sua caligrafia em um pedaço de terra ou areia.\n\n**Conjurando o Fogo:** Você cria uma fina nuvem de brasas inofensivas e fumaça colorida e perfumada em um cubo de 1,5 metro. Você escolhe a cor e o perfume, e as brasas podem acender velas, tochas ou lâmpadas naquela área. O perfume da fumaça dura 1 minuto.\n\n**Conjurando a Água:** Você cria um spray de névoa fria que umedece levemente criaturas e objetos em um cubo de 1,5 metro. Alternativamente, você cria 1 xícara de água limpa em um recipiente aberto ou em uma superfície, e a água evapora em 1 minuto.\n\n**Esculpir Elemento:** Você faz com que sujeira, areia, fogo, fumaça, névoa ou água que caiba em um cubo de 30 centímetros assuma uma forma rudimentar (como a de uma criatura) por 1 hora.",

    components: {
      types: ["verbal", "somatic"],
    },
    duration: {
      unit: "instantaneous",
    },
    effects: [],
  },
  {
    id: "spell-raio-de-fogo",
    name: ["Raio de Fogo", "Fire Bolt"],
    source: "LDJ2024",
    page: 274,
    level: 0,
    school: "evocation",
    description:
      "Você arremessa uma fagulha de fogo em uma criatura ou um objeto dentro do alcance. Faça um ataque mágico à distância contra o alvo. Em caso de acerto, o alvo sofre 1d10 de dano de Fogo. Um objeto inflamável atingido por esta magia começa a queimar se não estiver sendo vestido ou carregado.",
    components: {
      types: ["verbal", "somatic"],
    },
    duration: {
      unit: "instantaneous",
    },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        parameters: {
          activation: {
            type: "action",
          },
          range: {
            normal: 120,
            unit: "ft",
          },
          target: {
            type: "creature",
            quantity: 1,
          },
          attackType: "rangedSpellAttack",
          outcomes: [
            {
              id: "fire-bolt-damage",
              type: "damage",
              on: "hit",
              formula: {
                roll: { count: 1, faces: 10 },
                damageType: "fire",
              },
            },
            {
              id: "flammable-object-burning",
              type: "descriptive",
              on: "hit",
              text: "Um objeto inflamável atingido por esta magia começa a queimar se não estiver sendo vestido ou carregado.",
            },
          ],
        },
        scaling: {
          type: "characterLevel",
          rules: [
            {
              type: "modifyOutcomeFormula",
              level: 5,
              outcomeId: "fire-bolt-damage",
              newFormula: {
                roll: { count: 2, faces: 10 },
                damageType: "fire",
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 11,
              outcomeId: "fire-bolt-damage",
              newFormula: {
                roll: { count: 3, faces: 10 },
                damageType: "fire",
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 17,
              outcomeId: "fire-bolt-damage",
              newFormula: {
                roll: { count: 4, faces: 10 },
                damageType: "fire",
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-friends",
    name: ["Amizade", "Friends"],
    source: "LDJ2024",
    page: 277,
    level: 0,
    school: "enchantment",
    description:
      "Você emana magicamente uma sensação de amizade para uma criatura que você possa ver dentro do alcance. O alvo deve ser bem-sucedido em um teste de resistência de Sabedoria ou ficará com a condição Encantado (Charmed) pela duração. Quando a magia termina, o alvo sabe que foi encantado por você.",
    components: {
      types: ["somatic", "material"],
      material: {
        description: "um pouco de maquiagem",
        isConsumed: false,
      },
    },
    duration: {
      unit: "minute",
      value: 1,
      isConcentration: true,
    },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell-friends",
        parameters: {
          activation: {
            type: "action",
          },
          range: {
            normal: 10,
            unit: "ft",
          },
          target: {
            type: "creature",
            quantity: 1,
          },
          save: {
            ability: "wisdom",
            dc: {
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "friends-charmed",
              type: "applyCondition",
              on: "fail",
              condition: "charmed",
            },
            {
              type: "none",
              on: "success",
            },
            {
              id: "friends-special-rules",
              type: "descriptive",
              on: "success",
              text: "O alvo tem sucesso automaticamente se não for um Humanoide, se você estiver lutando com ele, ou se você já usou esta magia nele nas últimas 24 horas. A magia termina antes se o alvo sofrer dano ou se você atacar, causar dano ou forçar um teste de resistência em qualquer pessoa. Ao final da magia, o alvo sabe que foi encantado por você.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-guidance",
    name: ["Orientação", "Guidance"],
    source: "LDJ2024",
    page: 282,
    level: 0,
    school: "divination",
    description:
      "Você toca uma criatura voluntária e escolhe uma perícia. Até o fim da magia, a criatura adiciona 1d4 a qualquer teste de perícia usando a perícia escolhida.",
    components: {
      types: ["verbal", "somatic"],
    },
    duration: {
      unit: "minute",
      value: 1,
      isConcentration: true,
    },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell-guidance",
        parameters: {
          activation: {
            type: "action",
          },
          target: {
            type: "touch",
          },

          outcomes: [
            {
              id: "guidance-buff",
              type: "applyEffect",
              on: "success",
              effect: {
                type: "grantConditionalBonus",
                on: "skillCheck",
                modifier: { count: 1, faces: 4 },
                requiresChoice: "skill",

                duration: {
                  unit: "minute",
                  value: 1,
                  isConcentration: true,
                },
              },
            },
          ],
        },
      },
    ],
  },
  {
    name: "Light",
    source: "LDJ2024",
    page: 292,
    level: 0,
    school: "evocation",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "touch",
      },
    },
    components: {
      v: true,
      m: "a firefly or phosphorescent moss",
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "hour",
          amount: 1,
        },
      },
    ],
    entries: [
      "You touch one Large or smaller object that isn't being worn or carried by someone else. Until the spell ends, the object sheds {@variantrule Bright Light|XPHB} in a 20-foot radius and {@variantrule Dim Light|XPHB} for an additional 20 feet. The light can be colored as you like.",
      "Covering the object with something opaque blocks the light. The spell ends if you cast it again.",
    ],
    miscTags: ["LGT", "OBJ"],
  },
  {
    name: "Mage Hand",
    source: "LDJ2024",
    page: 293,
    level: 0,
    school: "conjuration",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 30,
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "minute",
          amount: 1,
        },
      },
    ],
    entries: [
      "A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again.",
      "When you cast the spell, you can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a vial.",
      "As a {@action Magic|XPHB} action on your later turns, you can control the hand thus again. As part of that action, you can move the hand up to 30 feet.",
      "The hand can't attack, activate magic items, or carry more than 10 pounds.",
    ],
    miscTags: ["OBJ"],
  },
  {
    name: "Mending",
    source: "LDJ2024",
    page: 297,
    level: 0,
    school: "transmutation",
    castingTime: [
      {
        number: 1,
        unit: "minute",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "touch",
      },
    },
    components: {
      v: true,
      s: true,
      m: "two lodestones",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "This spell repairs a single break or tear in an object you touch, such as a broken chain link, two halves of a broken key, a torn cloak, or a leaking wineskin. As long as the break or tear is no larger than 1 foot in any dimension, you mend it, leaving no trace of the former damage.",
      "This spell can physically repair a magic item, but it can't restore magic to such an object.",
    ],
    miscTags: ["OBJ"],
  },
  {
    name: "Message",
    source: "LDJ2024",
    page: 298,
    level: 0,
    school: "transmutation",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 120,
      },
    },
    components: {
      s: true,
      m: "a copper wire",
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "round",
          amount: 1,
        },
      },
    ],
    entries: [
      "You point toward a creature within range and whisper a message. The target (and only the target) hears the message and can reply in a whisper that only you can hear.",
      "You can cast this spell through solid objects if you are familiar with the target and know it is beyond the barrier. Magical silence; 1 foot of stone, metal, or wood; or a thin sheet of lead blocks the spell.",
    ],
    areaTags: ["ST"],
  },
  {
    name: "Mind Sliver",
    source: "LDJ2024",
    page: 298,
    level: 0,
    school: "enchantment",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 60,
      },
    },
    components: {
      v: true,
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You try to temporarily sliver the mind of one creature you can see within range. The target must succeed on an Intelligence saving throw or take {@damage 1d6} Psychic damage and subtract {@dice 1d4} from the next saving throw it makes before the end of your next turn.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Cantrip Upgrade",
        entries: [
          "The damage increases by {@damage 1d6} when you reach levels 5 ({@damage 2d6}), 11 ({@damage 3d6}), and 17 ({@damage 4d6}).",
        ],
      },
    ],
    scalingLevelDice: {
      label: "Psychic damage",
      scaling: {
        "1": "1d6",
        "5": "2d6",
        "11": "3d6",
        "17": "4d6",
      },
    },
    damageInflict: ["psychic"],
    savingThrow: ["intelligence"],
    miscTags: ["SCL", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Minor Illusion",
    source: "LDJ2024",
    page: 298,
    level: 0,
    school: "illusion",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 30,
      },
    },
    components: {
      s: true,
      m: "a bit of fleece",
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "minute",
          amount: 1,
        },
      },
    ],
    entries: [
      "You create a sound or an image of an object within range that lasts for the duration. See the descriptions below for the effects of each. The illusion ends if you cast this spell again.",
      "If a creature takes a {@action Study|XPHB} action to examine the sound or image, the creature can determine that it is an illusion with a successful Intelligence ({@skill Investigation|XPHB}) check against your spell save DC. If a creature discerns the illusion for what it is, the illusion becomes faint to the creature.",
      {
        type: "entries",
        name: "Sound",
        entries: [
          "If you create a sound, its volume can range from a whisper to a scream. It can be your voice, someone else's voice, a lion's roar, a beating of drums, or any other sound you choose. The sound continues unabated throughout the duration, or you can make discrete sounds at different times before the spell ends.",
        ],
      },
      {
        type: "entries",
        name: "Image",
        entries: [
          "If you create an image of an object—such as a chair, muddy footprints, or a small chest—it must be no larger than a 5-foot {@variantrule Cube [Area of Effect]|XPHB|Cube}. The image can't create sound, light, smell, or any other sensory effect. Physical interaction with the image reveals it to be an illusion, since things can pass through it.",
        ],
      },
    ],
    abilityCheck: ["intelligence"],
  },
  {
    name: "Poison Spray",
    source: "LDJ2024",
    page: 306,
    level: 0,
    school: "necromancy",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 30,
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You spray toxic mist at a creature within range. Make a ranged spell attack against the target. On a hit, the target takes {@damage 1d12} Poison damage.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Cantrip Upgrade",
        entries: [
          "The damage increases by {@damage 1d12} when you reach levels 5 ({@damage 2d12}), 11 ({@damage 3d12}), and 17 ({@damage 4d12}).",
        ],
      },
    ],
    scalingLevelDice: {
      label: "Poison damage",
      scaling: {
        "1": "1d12",
        "5": "2d12",
        "11": "3d12",
        "17": "4d12",
      },
    },
    damageInflict: ["poison"],
    spellAttack: ["R"],
    miscTags: ["SCL"],
    areaTags: ["ST"],
  },
  {
    name: "Prestidigitation",
    source: "LDJ2024",
    page: 307,
    level: 0,
    school: "transmutation",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 10,
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "hour",
          amount: 1,
        },
      },
    ],
    entries: [
      "You create a magical effect within range. Choose the effect from the options below. If you cast this spell multiple times, you can have up to three of its non-instantaneous effects active at a time.",
      {
        type: "entries",
        name: "Sensory Effect",
        entries: [
          "You create an instantaneous, harmless sensory effect, such as a shower of sparks, a puff of wind, faint musical notes, or an odd odor.",
        ],
      },
      {
        type: "entries",
        name: "Fire Play",
        entries: [
          "You instantaneously light or snuff out a candle, a torch, or a small campfire.",
        ],
      },
      {
        type: "entries",
        name: "Clean or Soil",
        entries: [
          "You instantaneously clean or soil an object no larger than 1 cubic foot.",
        ],
      },
      {
        type: "entries",
        name: "Minor Sensation",
        entries: [
          "You chill, warm, or flavor up to 1 cubic foot of nonliving material for 1 hour.",
        ],
      },
      {
        type: "entries",
        name: "Magic Mark",
        entries: [
          "You make a color, a small mark, or a symbol appear on an object or a surface for 1 hour.",
        ],
      },
      {
        type: "entries",
        name: "Minor Creation",
        entries: [
          "You create a nonmagical trinket or an illusory image that can fit in your hand. It lasts until the end of your next turn. A trinket can deal no damage and has no monetary worth.",
        ],
      },
    ],
    miscTags: ["OBJ"],
  },
  {
    name: "Produce Flame",
    source: "LDJ2024",
    page: 308,
    level: 0,
    school: "conjuration",
    castingTime: [
      {
        number: 1,
        unit: "bonus",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "self",
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "minute",
          amount: 10,
        },
      },
    ],
    entries: [
      "A flickering flame appears in your hand and remains there for the duration. While there, the flame emits no heat and ignites nothing, and it sheds {@variantrule Bright Light|XPHB} in a 20-foot radius and {@variantrule Dim Light|XPHB} for an additional 20 feet. The spell ends if you cast it again.",
      "Until the spell ends, you can take a {@action Magic|XPHB} action to hurl fire at a creature or an object within 60 feet of you. Make a ranged spell attack. On a hit, the target takes {@damage 1d8} Fire damage.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Cantrip Upgrade",
        entries: [
          "The damage increases by {@damage 1d8} when you reach levels 5 ({@damage 2d8}), 11 ({@damage 3d8}), and 17 ({@damage 4d8}).",
        ],
      },
    ],
    scalingLevelDice: {
      label: "Fire damage",
      scaling: {
        "1": "1d8",
        "5": "2d8",
        "11": "3d8",
        "17": "4d8",
      },
    },
    damageInflict: ["fire"],
    spellAttack: ["R"],
    miscTags: ["LGT", "OBJ", "SCL"],
    areaTags: ["ST"],
  },
  {
    name: "Ray of Frost",
    source: "LDJ2024",
    page: 311,
    level: 0,
    school: "evocation",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 60,
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, it takes {@damage 1d8} Cold damage, and its {@variantrule Speed|XPHB} is reduced by 10 feet until the start of your next turn.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Cantrip Upgrade",
        entries: [
          "The damage increases by {@damage 1d8} when you reach levels 5 ({@damage 2d8}), 11 ({@damage 3d8}), and 17 ({@damage 4d8}).",
        ],
      },
    ],
    scalingLevelDice: {
      label: "Cold damage",
      scaling: {
        "1": "1d8",
        "5": "2d8",
        "11": "3d8",
        "17": "4d8",
      },
    },
    damageInflict: ["cold"],
    spellAttack: ["R"],
    miscTags: ["SCL"],
    areaTags: ["ST"],
  },
  {
    name: "Resistance",
    source: "LDJ2024",
    page: 312,
    level: 0,
    school: "abjuration",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "touch",
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "minute",
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "You touch a willing creature and choose a damage type: Acid, Bludgeoning, Cold, Fire, Lightning, Necrotic, Piercing, Poison, Radiant, Slashing, or Thunder. When the creature takes damage of the chosen type before the spell ends, the creature reduces the total damage taken by {@dice 1d4}. A creature can benefit from this spell only once per turn.",
    ],
    areaTags: ["ST"],
  },
  {
    name: "Sacred Flame",
    source: "LDJ2024",
    page: 313,
    level: 0,
    school: "evocation",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 60,
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "Flame-like radiance descends on a creature that you can see within range. The target must succeed on a Dexterity saving throw or take {@damage 1d8} Radiant damage. The target gains no benefit from Half {@variantrule Cover|XPHB} or Three-Quarters {@variantrule Cover|XPHB} for this save.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Cantrip Upgrade",
        entries: [
          "The damage increases by {@damage 1d8} when you reach levels 5 ({@damage 2d8}), 11 ({@damage 3d8}), and 17 ({@damage 4d8}).",
        ],
      },
    ],
    scalingLevelDice: {
      label: "Radiant damage",
      scaling: {
        "1": "1d8",
        "5": "2d8",
        "11": "3d8",
        "17": "4d8",
      },
    },
    damageInflict: ["radiant"],
    savingThrow: ["dexterity"],
    miscTags: ["SCL", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Shillelagh",
    source: "LDJ2024",
    page: 316,
    level: 0,
    school: "transmutation",
    castingTime: [
      {
        number: 1,
        unit: "bonus",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "touch",
      },
    },
    components: {
      v: true,
      s: true,
      m: "mistletoe",
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "minute",
          amount: 1,
        },
      },
    ],
    entries: [
      "A Club or Quarterstaff you are holding is imbued with nature's power. For the duration, you can use your spellcasting ability instead of Strength for the attack and damage rolls of melee attacks using that weapon, and the weapon's damage die becomes a {@dice d8}. If the attack deals damage, it can be Force damage or the weapon's normal damage type (your choice).",
      "The spell ends early if you cast it again or if you let go of the weapon.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Cantrip Upgrade",
        entries: [
          "The damage die changes when you reach levels 5 ({@damage d10}), 11 ({@damage d12}), and 17 ({@damage 2d6}).",
        ],
      },
    ],
    scalingLevelDice: {
      label: "damage",
      scaling: {
        "1": "1d8",
        "5": "1d10",
        "11": "1d12",
        "17": "2d6",
      },
    },
    miscTags: ["AAD", "SCL"],
  },
  {
    name: "Shocking Grasp",
    source: "LDJ2024",
    page: 316,
    level: 0,
    school: "evocation",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "touch",
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "Lightning springs from you to a creature that you try to touch. Make a melee spell attack against the target. On a hit, the target takes {@damage 1d8} Lightning damage, and it can't make {@action Opportunity Attack|XPHB|Opportunity Attacks} until the start of its next turn.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Cantrip Upgrade",
        entries: [
          "The damage increases by {@damage 1d8} when you reach levels 5 ({@damage 2d8}), 11 ({@damage 3d8}), and 17 ({@damage 4d8}).",
        ],
      },
    ],
    scalingLevelDice: {
      label: "Lightning damage",
      scaling: {
        "1": "1d8",
        "5": "2d8",
        "11": "3d8",
        "17": "4d8",
      },
    },
    damageInflict: ["lightning"],
    spellAttack: ["M"],
    miscTags: ["SCL"],
    areaTags: ["ST"],
  },
  {
    name: "Sorcerous Burst",
    source: "LDJ2024",
    page: 318,
    level: 0,
    school: "evocation",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 120,
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You cast sorcerous energy at one creature or object within range. Make a ranged attack roll against the target. On a hit, the target takes {@damage 1d8} damage of a type you choose: Acid, Cold, Fire, Lightning, Poison, Psychic, or Thunder.",
      "If you roll an 8 on a {@dice d8} for this spell, you can roll another {@dice d8}, and add it to the damage. When you cast this spell, the maximum number of these d8s you can add to the spell's damage equals your spellcasting ability modifier.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Cantrip Upgrade",
        entries: [
          "The damage increases by {@damage 1d8} when you reach levels 5 ({@damage 2d8}), 11 ({@damage 3d8}), and 17 ({@damage 4d8}).",
        ],
      },
    ],
    scalingLevelDice: {
      label: "damage",
      scaling: {
        "1": "1d8",
        "5": "2d8",
        "11": "3d8",
        "17": "4d8",
      },
    },
    damageInflict: [
      "acid",
      "cold",
      "fire",
      "lightning",
      "poison",
      "psychic",
      "thunder",
    ],
    spellAttack: ["R"],
    miscTags: ["OBJ", "SCL"],
    areaTags: ["ST"],
  },
  {
    name: "Spare the Dying",
    source: "LDJ2024",
    page: 318,
    level: 0,
    school: "necromancy",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 15,
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "Choose a creature within range that has 0 {@variantrule Hit Points|XPHB} and isn't dead. The creature becomes {@variantrule Stable|XPHB}.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Cantrip Upgrade",
        entries: [
          "The range doubles when you reach levels 5 (30 feet), 11 (60 feet), and 17 (120 feet).",
        ],
      },
    ],
    miscTags: ["SCL"],
    areaTags: ["ST"],
  },
  {
    name: "Starry Wisp",
    source: "LDJ2024",
    page: 320,
    level: 0,
    school: "evocation",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 60,
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You launch a mote of light at one creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes {@damage 1d8} Radiant damage, and until the end of your next turn, it emits {@variantrule Dim Light|XPHB} in a 10-foot radius and can't benefit from the {@condition Invisible|XPHB} condition.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Cantrip Upgrade",
        entries: [
          "The damage increases by {@damage 1d8} when you reach levels 5 ({@damage 2d8}), 11 ({@damage 3d8}), and 17 ({@damage 4d8}).",
        ],
      },
    ],
    scalingLevelDice: {
      label: "Radiant damage",
      scaling: {
        "1": "1d8",
        "5": "2d8",
        "11": "3d8",
        "17": "4d8",
      },
    },
    damageInflict: ["radiant"],
    spellAttack: ["R"],
    miscTags: ["LGT", "OBJ", "SCL"],
    areaTags: ["ST"],
  },
  {
    name: "Thaumaturgy",
    source: "LDJ2024",
    page: 333,
    level: 0,
    school: "transmutation",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 30,
      },
    },
    components: {
      v: true,
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "minute",
          amount: 1,
        },
      },
    ],
    entries: [
      "You manifest a minor wonder within range. You create one of the effects below within range. If you cast this spell multiple times, you can have up to three of its 1-minute effects active at a time.",
      {
        type: "entries",
        name: "Altered Eyes",
        entries: ["You alter the appearance of your eyes for 1 minute."],
      },
      {
        type: "entries",
        name: "Booming Voice",
        entries: [
          "Your voice booms up to three times as loud as normal for 1 minute. For the duration, you have {@variantrule Advantage|XPHB} on Charisma ({@skill Intimidation|XPHB}) checks.",
        ],
      },
      {
        type: "entries",
        name: "Fire Play",
        entries: [
          "You cause flames to flicker, brighten, dim, or change color for 1 minute.",
        ],
      },
      {
        type: "entries",
        name: "Invisible Hand",
        entries: [
          "You instantaneously cause an unlocked door or window to fly open or slam shut.",
        ],
      },
      {
        type: "entries",
        name: "Phantom Sound",
        entries: [
          "You create an instantaneous sound that originates from a point of your choice within range, such as a rumble of thunder, the cry of a raven, or ominous whispers.",
        ],
      },
      {
        type: "entries",
        name: "Tremors",
        entries: ["You cause harmless tremors in the ground for 1 minute."],
      },
    ],
    miscTags: ["ADV"],
  },
  {
    name: "Thorn Whip",
    source: "LDJ2024",
    page: 333,
    level: 0,
    school: "transmutation",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 30,
      },
    },
    components: {
      v: true,
      s: true,
      m: "the stem of a plant with thorns",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You create a vine-like whip covered in thorns that lashes out at your command toward a creature in range. Make a melee spell attack against the target. On a hit, the target takes {@damage 1d6} Piercing damage, and if it is Large or smaller, you can pull it up to 10 feet closer to you.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Cantrip Upgrade",
        entries: [
          "The damage increases by {@damage 1d6} when you reach levels 5 ({@damage 2d6}), 11 ({@damage 3d6}), and 17 ({@damage 4d6}).",
        ],
      },
    ],
    scalingLevelDice: {
      label: "Piercing damage",
      scaling: {
        "1": "1d6",
        "5": "2d6",
        "11": "3d6",
        "17": "4d6",
      },
    },
    damageInflict: ["piercing"],
    spellAttack: ["M"],
    miscTags: ["FMV", "SCL"],
    areaTags: ["ST"],
  },
  {
    name: "Thunderclap",
    source: "LDJ2024",
    page: 333,
    level: 0,
    school: "evocation",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "emanation",
      distance: {
        type: "feet",
        amount: 5,
      },
    },
    components: {
      s: true,
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "Each creature in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from you must succeed on a Constitution saving throw or take {@damage 1d6} Thunder damage. The spell's thunderous sound can be heard up to 100 feet away.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Cantrip Upgrade",
        entries: [
          "The damage increases by {@damage 1d6} when you reach levels 5 ({@damage 2d6}), 11 ({@damage 3d6}), and 17 ({@damage 4d6}).",
        ],
      },
    ],
    scalingLevelDice: {
      label: "Thunder damage",
      scaling: {
        "1": "1d6",
        "5": "2d6",
        "11": "3d6",
        "17": "4d6",
      },
    },
    damageInflict: ["thunder"],
    savingThrow: ["constitution"],
    miscTags: ["SCL"],
    areaTags: ["S"],
  },
  {
    name: "Toll the Dead",
    source: "LDJ2024",
    page: 334,
    level: 0,
    school: "necromancy",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 60,
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You point at one creature you can see within range, and the single chime of a dolorous bell is audible within 10 feet of the target. The target must succeed on a Wisdom saving throw or take {@damage 1d8} Necrotic damage. If the target is missing any of its {@variantrule Hit Points|XPHB}, it instead takes {@damage 1d12} Necrotic damage.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Cantrip Upgrade",
        entries: [
          "The damage increases by one die when you reach levels 5 ({@damage 2d8} or {@damage 2d12}), 11 ({@damage 3d8} or {@damage 3d12}), and 17 ({@damage 4d8} or {@damage 4d12}).",
        ],
      },
    ],
    scalingLevelDice: [
      {
        label: "Necrotic damage",
        scaling: {
          "1": "1d8",
          "5": "2d8",
          "11": "3d8",
          "17": "4d8",
        },
      },
      {
        label: "Necrotic damage to wounded creature",
        scaling: {
          "1": "1d12",
          "5": "2d12",
          "11": "3d12",
          "17": "4d12",
        },
      },
    ],
    damageInflict: ["necrotic"],
    savingThrow: ["wisdom"],
    miscTags: ["SCL", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "True Strike",
    source: "LDJ2024",
    page: 336,
    level: 0,
    school: "divination",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "self",
      },
    },
    components: {
      s: true,
      m: {
        text: "a weapon with which you have proficiency and that is worth 1+ CP",
        cost: 1,
      },
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "Guided by a flash of magical insight, you make one attack with the weapon used in the spell's casting. The attack uses your spellcasting ability for the attack and damage rolls instead of using Strength or Dexterity. If the attack deals damage, it can be Radiant damage or the weapon's normal damage type (your choice).",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Cantrip Upgrade",
        entries: [
          "Whether you deal Radiant damage or the weapon's normal damage type, the attack deals extra Radiant damage when you reach levels 5 ({@damage 1d6}), 11 ({@damage 2d6}), and 17 ({@damage 3d6}).",
        ],
      },
    ],
    scalingLevelDice: [
      {
        label: "extra Radiant damage",
        scaling: {
          "5": "1d6",
          "11": "2d6",
          "17": "3d6",
        },
      },
    ],
    damageInflict: ["radiant"],
    miscTags: ["AAD"],
    areaTags: ["ST"],
  },
  {
    name: "Vicious Mockery",
    source: "LDJ2024",
    page: 337,
    level: 0,
    school: "enchantment",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 60,
      },
    },
    components: {
      v: true,
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You unleash a string of insults laced with subtle enchantments at one creature you can see or hear within range. The target must succeed on a Wisdom saving throw or take {@damage 1d6} Psychic damage and have {@variantrule Disadvantage|XPHB} on the next attack roll it makes before the end of its next turn.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Cantrip Upgrade",
        entries: [
          "The damage increases by {@damage 1d6} when you reach levels 5 ({@damage 2d6}), 11 ({@damage 3d6}), and 17 ({@damage 4d6}).",
        ],
      },
    ],
    scalingLevelDice: {
      label: "Psychic damage",
      scaling: {
        "1": "1d6",
        "5": "2d6",
        "11": "3d6",
        "17": "4d6",
      },
    },
    damageInflict: ["psychic"],
    savingThrow: ["wisdom"],
    miscTags: ["SCL", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Word of Radiance",
    source: "LDJ2024",
    page: 343,
    level: 0,
    school: "evocation",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "emanation",
      distance: {
        type: "feet",
        amount: 5,
      },
    },
    components: {
      v: true,
      m: "a sunburst token",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "Burning radiance erupts from you in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation}. Each creature of your choice that you can see in it must succeed on a Constitution saving throw or take {@damage 1d6} Radiant damage.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Cantrip Upgrade",
        entries: [
          "The damage increases by {@damage 1d6} when you reach levels 5 ({@damage 2d6}), 11 ({@damage 3d6}), and 17 ({@damage 4d6}).",
        ],
      },
    ],
    scalingLevelDice: {
      label: "Radiant damage",
      scaling: {
        "1": "1d6",
        "5": "2d6",
        "11": "3d6",
        "17": "4d6",
      },
    },
    damageInflict: ["radiant"],
    savingThrow: ["constitution"],
    miscTags: ["SCL", "SGT"],
    areaTags: ["MT"],
  },
];
