import type { Spell } from "../../domain/spell/spell.schema.js";
export const spellsLevel0 = [
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
                type: "damage",
                roll: { count: 1, faces: 6 },
                damageTypeOptions: ["acid"],
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
                type: "damage",
                roll: { count: 2, faces: 6 },
                damageTypeOptions: ["acid"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 11,
              outcomeId: "acid-splash-damage",
              newFormula: {
                type: "damage",
                roll: { count: 3, faces: 6 },
                damageTypeOptions: ["acid"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 17,
              outcomeId: "acid-splash-damage",
              newFormula: {
                type: "damage",
                roll: { count: 4, faces: 6 },
                damageTypeOptions: ["acid"],
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
    description:
      "Sempre que uma criatura fizer uma jogada de ataque contra você antes do fim da magia, o atacante subtrai 1d4 da jogada de ataque.",
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        endConditions: [{ trigger: "onLoseConcentration" }],
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
                type: "damage",
                roll: { count: 1, faces: 10 },
                damageTypeOptions: ["necrotic"],
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
                type: "damage",
                roll: { count: 2, faces: 10 },
                damageTypeOptions: ["necrotic"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 11,
              outcomeId: "chill-touch-damage",
              newFormula: {
                type: "damage",
                roll: { count: 3, faces: 10 },
                damageTypeOptions: ["necrotic"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 17,
              outcomeId: "chill-touch-damage",
              newFormula: {
                type: "damage",
                roll: { count: 4, faces: 10 },
                damageTypeOptions: ["necrotic"],
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
            },
            {
              type: "applyEffect",
              on: "success",
              effect: {
                type: "activatableAction",
                actionId: "action-move-summoned-token",
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
    description:
      "Sussurrando aos espíritos da natureza, você cria um dos seguintes efeitos dentro do alcance.",
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
            normal: 30,
            unit: "ft",
          },
          target: {
            type: "pointInSpace",
          },
          outcomes: [
            {
              id: "druidcraft-weather-sensor",
              type: "customMechanic",
              on: "custom",
              mechanic: "druidcraft_weatherSensor",
              details:
                "Cria um efeito sensorial que prevê o tempo por 24h (o efeito em si dura 1 rodada).",
            },
            {
              id: "druidcraft-bloom",
              type: "customMechanic",
              on: "custom",
              mechanic: "druidcraft_bloom",
              details:
                "Faz uma flor desabrochar, uma vagem se abrir ou um botão de folha brotar instantaneamente.",
            },
            {
              id: "druidcraft-sensory-effect",
              type: "customMechanic",
              on: "custom",
              mechanic: "druidcraft_sensoryEffect",
              details:
                "Cria um efeito sensorial inofensivo (folhas, brisa, som, etc.) em um cubo de 5 pés.",
            },
            {
              id: "druidcraft-fire-play",
              type: "customMechanic",
              on: "custom",
              mechanic: "druidcraft_firePlay",
              details:
                "Acende ou apaga uma chama pequena não mágica (vela, tocha, fogueira).",
            },
          ],
        },
      },
    ],
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
                type: "damage",
                roll: { count: 1, faces: 10 },
                damageTypeOptions: ["force"],
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
      "Você exerce controle sobre os elementos, criando um dos seguintes efeitos dentro do alcance.",
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
            normal: 30,
            unit: "ft",
          },
          target: {
            type: "pointInSpace",
          },
          outcomes: [
            {
              id: "elementalism-conjure-air",
              type: "customMechanic",
              on: "custom",
              mechanic: "elementalism_conjureAir",
              details:
                "Cria uma brisa em um cubo de 5 pés que pode farfalhar folhas e fechar portas destrancadas.",
            },
            {
              id: "elementalism-conjure-earth",
              type: "customMechanic",
              on: "custom",
              mechanic: "elementalism_conjureEarth",
              details:
                "Cria uma fina camada de poeira em uma área de 5 pés quadrados ou escreve uma palavra na terra.",
            },
            {
              id: "elementalism-conjure-fire",
              type: "customMechanic",
              on: "custom",
              mechanic: "elementalism_conjureFire",
              details:
                "Cria uma nuvem inofensiva de brasas e fumaça colorida em um cubo de 5 pés, que pode acender pequenas chamas.",
            },
            {
              id: "elementalism-conjure-water",
              type: "customMechanic",
              on: "custom",
              mechanic: "elementalism_conjureWater",
              details:
                "Cria um spray de névoa fria em um cubo de 5 pés ou 1 xícara de água limpa.",
            },
            {
              id: "elementalism-sculpt-element",
              type: "customMechanic",
              on: "custom",
              mechanic: "elementalism_sculptElement",
              details:
                "Moldar terra, areia, fogo, fumaça, névoa ou água que caiba em um cubo de 1 pé em uma forma rudimentar por 1 hora.",
            },
          ],
        },
      },
    ],
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
                type: "damage",
                roll: { count: 1, faces: 10 },
                damageTypeOptions: ["fire"],
              },
            },
            {
              id: "flammable-object-burning",
              type: "descriptive",
              on: "hit",
              details:
                "Um objeto inflamável atingido por esta magia começa a queimar se não estiver sendo vestido ou carregado.",
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
                type: "damage",
                roll: { count: 2, faces: 10 },
                damageTypeOptions: ["fire"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 11,
              outcomeId: "fire-bolt-damage",
              newFormula: {
                type: "damage",
                roll: { count: 3, faces: 10 },
                damageTypeOptions: ["fire"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 17,
              outcomeId: "fire-bolt-damage",
              newFormula: {
                type: "damage",
                roll: { count: 4, faces: 10 },
                damageTypeOptions: ["fire"],
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
        actionId: "action-cast-spell",
        endConditions: [
          { trigger: "onLoseConcentration" },
          { trigger: "onTakingDamage" },
        ],
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
          ],
        },
        additionalRules: [
          {
            id: "friends-special-rules",
            details:
              "O alvo tem sucesso automaticamente se não for um Humanoide, se você estiver lutando com ele, ou se você já usou esta magia nele nas últimas 24 horas. A magia termina antes se o alvo sofrer dano ou se você atacar, causar dano ou forçar um teste de resistência em qualquer pessoa. Ao final da magia, o alvo sabe que foi encantado por você.",
          },
        ],
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
        actionId: "action-cast-spell",
        endConditions: [{ trigger: "onLoseConcentration" }],
        parameters: {
          activation: {
            type: "action",
          },
          target: {
            type: "creature",
            quantity: 1,
          },
          range: { unit: "ft", normal: 5 },
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
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-light",
    name: ["Luz", "Light"],
    source: "LDJ2024",
    page: 292,
    level: 0,
    school: "evocation",
    description:
      "Você toca um objeto Grande ou menor que não esteja sendo vestido ou carregado por outra pessoa. Até o fim da magia, o objeto emite Luz Brilhante em um raio de 20 pés e Penumbra por mais 20 pés. A luz pode ser colorida como você desejar.",
    components: {
      types: ["verbal", "material"],
      material: {
        description: "um vaga-lume ou musgo fosforescente",
      },
    },
    duration: {
      unit: "hour",
      value: 1,
    },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        endConditions: [{ trigger: "onCastingSpellAgain" }],
        parameters: {
          activation: {
            type: "action",
          },
          range: {
            unit: "ft",
            normal: 5,
          },
          target: {
            type: "object",
            quantity: 1,
          },
          outcomes: [
            {
              id: "light-apply-light-effect",
              type: "applyEffect",
              on: "success",
              effect: {
                type: "passive_providesLight",
                properties: {
                  bright: 20,
                  dim: 20,
                },
              },
            },
            {
              id: "light-special-rules",
              type: "descriptive",
              on: "custom",
              details:
                "Cobrir o objeto com algo opaco bloqueia a luz. A magia termina se você a conjurar novamente.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-mage-hand",
    name: ["Mão Mágica", "Mage Hand"],
    source: "LDJ2024",
    page: 293,
    level: 0,
    school: "conjuration",
    description:
      "Uma mão espectral e flutuante aparece em um ponto que você escolhe dentro do alcance. A mão dura pela duração da magia.",
    components: {
      types: ["verbal", "somatic"],
    },
    duration: {
      unit: "minute",
      value: 1,
    },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        endConditions: [{ trigger: "onCastingSpellAgain" }],
        parameters: {
          activation: {
            type: "action",
          },
          range: {
            normal: 30,
            unit: "ft",
          },
          target: {
            type: "pointInSpace",
          },
          outcomes: [
            {
              id: "mage-hand-summon",
              type: "summonToken",
              on: "success",
              token: {
                name: "Mão Mágica",
                quantity: 1,
                effects: [],
              },
              duration: {
                unit: "minute",
                value: 1,
              },
            },
            {
              id: "mage-hand-grant-control-action",
              type: "applyEffect",
              on: "success",
              effect: {
                type: "activatableAction",
                actionId: "action-move-summoned-token",
                duration: {
                  unit: "minute",
                  value: 1,
                },
                parameters: {
                  activation: {
                    type: "action",
                  },
                  outcomes: [
                    {
                      type: "descriptive",
                      on: "custom",
                      details:
                        "Você pode mover a mão até 30 pés e usá-la para manipular um objeto, abrir uma porta ou recipiente destrancado, guardar ou pegar um item de um recipiente aberto, ou derramar o conteúdo de um frasco.",
                    },
                  ],
                },
              },
            },
            {
              id: "mage-hand-rules",
              type: "descriptive",
              on: "custom",
              details:
                "A mão desaparece se ficar a mais de 30 pés de você ou se você conjurar esta magia novamente. A mão não pode atacar, ativar itens mágicos ou carregar mais de 10 libras.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-mending",
    name: ["Consertar", "Mending"],
    source: "LDJ2024",
    page: 297,
    level: 0,
    school: "transmutation",
    description:
      "Este feitiço repara uma única quebra ou rasgo em um objeto que você toca, como um elo de corrente quebrado, duas metades de uma chave quebrada, uma capa rasgada ou um odre de vinho vazando. Contanto que a quebra ou rasgo não seja maior que 1 pé em qualquer dimensão, você o conserta, não deixando vestígios do dano anterior.",
    components: {
      types: ["verbal", "somatic", "material"],
      material: {
        description: "duas magnetitas",
      },
    },
    duration: {
      unit: "instantaneous",
    },
    castingTime: {
      value: 1,
      unit: "minute",
    },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        parameters: {
          activation: {
            type: "special",
          },
          range: {
            normal: 5,
            unit: "ft",
          },
          target: {
            type: "object",
            quantity: 1,
          },
          outcomes: [
            {
              id: "mending-repair-object",
              type: "customMechanic",
              on: "success",
              mechanic: "mending_repairObject",
              details:
                "Repara uma única quebra ou rasgo (não maior que 1 pé) em um objeto tocado. Pode reparar fisicamente um item mágico, mas não restaura sua magia.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-message",
    name: ["Mensagem", "Message"],
    source: "LDJ2024",
    page: 298,
    level: 0,
    school: "transmutation",
    description:
      "Você aponta para uma criatura dentro do alcance e sussurra uma mensagem. O alvo (e somente o alvo) ouve a mensagem e pode responder com um sussurro que apenas você pode ouvir.",
    components: {
      types: ["verbal", "somatic", "material"],
      material: {
        description: "um pedaço de fio de cobre",
      },
    },
    duration: {
      unit: "round",
      value: 1,
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
          outcomes: [
            {
              id: "message-communication",
              type: "customMechanic",
              on: "success",
              mechanic: "message_sendAndReceive",
              details:
                "O alvo ouve a mensagem e pode responder em um sussurro que apenas você ouve. O feitiço é bloqueado por 1 pé de pedra/metal/madeira, uma fina folha de chumbo ou silêncio mágico.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-mind-sliver",
    name: ["Fagulha Mental", "Mind Sliver"],
    source: "LDJ2024",
    page: 298,
    level: 0,
    school: "enchantment",
    description:
      "Você tenta fragmentar temporariamente a mente de uma criatura que você possa ver dentro do alcance. O alvo deve ser bem-sucedido em um teste de resistência de Inteligência ou sofrerá 1d6 de dano Psíquico e subtrairá 1d4 do próximo teste de resistência que fizer antes do final do seu próximo turno.",
    components: {
      types: ["verbal"],
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
            normal: 60,
            unit: "ft",
          },
          target: {
            type: "creature",
            quantity: 1,
          },
          save: {
            ability: "intelligence",
            dc: {
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "mind-sliver-damage",
              type: "damage",
              on: "fail",
              formula: {
                type: "damage",
                roll: { count: 1, faces: 6 },
                damageTypeOptions: ["psychic"],
              },
            },
            {
              id: "mind-sliver-debuff",
              type: "applyEffect",
              on: "fail",
              effect: {
                type: "triggeredModifier",
                trigger: "onSavingThrow",
                modifier: {
                  operation: "subtract",
                  dice: { count: 1, faces: 4 },
                  target: "saveRoll",
                  appliesTo: "self",
                },
                duration: {
                  unit: "turn",
                  value: 1,
                },
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
              outcomeId: "mind-sliver-damage",
              newFormula: {
                type: "damage",
                roll: { count: 2, faces: 6 },
                damageTypeOptions: ["psychic"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 11,
              outcomeId: "mind-sliver-damage",
              newFormula: {
                type: "damage",
                roll: { count: 3, faces: 6 },
                damageTypeOptions: ["psychic"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 17,
              outcomeId: "mind-sliver-damage",
              newFormula: {
                type: "damage",
                roll: { count: 4, faces: 6 },
                damageTypeOptions: ["psychic"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-minor-illusion",
    name: ["Ilusão Menor", "Minor Illusion"],
    source: "LDJ2024",
    page: 298,
    level: 0,
    school: "illusion",
    description:
      "Você cria um som ou a imagem de um objeto dentro do alcance que dura pela duração. A ilusão também termina se você conjurar esta magia novamente.",
    components: {
      types: ["somatic", "material"],
      material: {
        description: "um pouco de lã",
      },
    },
    duration: {
      unit: "minute",
      value: 1,
    },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        endConditions: [{ trigger: "onCastingSpellAgain" }],
        parameters: {
          activation: {
            type: "action",
          },
          range: {
            normal: 30,
            unit: "ft",
          },
          target: {
            type: "pointInSpace",
          },
          outcomes: [
            {
              id: "minor-illusion-image",
              type: "summonToken",
              on: "success",
              token: {
                name: "Ilusão Menor (Imagem)",
                quantity: 1,
                effects: [],
              },
              duration: {
                unit: "minute",
                value: 1,
              },
            },
            {
              id: "minor-illusion-sound",
              type: "customMechanic",
              on: "success",
              mechanic: "minorIllusion_createSound",
              details:
                "Cria um som, de um sussurro a um grito. Pode ser contínuo ou sons discretos.",
            },
            {
              id: "minor-illusion-investigation-rule",
              type: "descriptive",
              on: "custom",
              details:
                "Uma criatura pode usar sua ação para fazer um teste de Inteligência (Investigação) contra a CD de suas magias para discernir a ilusão. Interação física com a imagem também a revela.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-poison-spray",
    name: ["Rajada de Veneno", "Poison Spray"],
    source: "LDJ2024",
    page: 306,
    level: 0,
    school: "necromancy",
    description:
      "Você borrifa uma névoa tóxica em uma criatura dentro do alcance. Faça um ataque de magia à distância contra o alvo. Em um acerto, o alvo sofre 1d12 de dano de Veneno.",
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
            normal: 30,
            unit: "ft",
          },
          attackType: "rangedSpellAttack",
          target: {
            type: "creature",
            quantity: 1,
          },
          outcomes: [
            {
              id: "poison-spray-damage",
              type: "damage",
              on: "hit",
              formula: {
                type: "damage",
                roll: { count: 1, faces: 12 },
                damageTypeOptions: ["poison"],
              },
            },
            {
              id: "poison-spray-miss",
              type: "none",
              on: "miss",
            },
          ],
        },
        scaling: {
          type: "characterLevel",
          rules: [
            {
              type: "modifyOutcomeFormula",
              level: 5,
              outcomeId: "poison-spray-damage",
              newFormula: {
                type: "damage",
                roll: { count: 2, faces: 12 },
                damageTypeOptions: ["poison"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 11,
              outcomeId: "poison-spray-damage",
              newFormula: {
                type: "damage",
                roll: { count: 3, faces: 12 },
                damageTypeOptions: ["poison"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 17,
              outcomeId: "poison-spray-damage",
              newFormula: {
                type: "damage",
                roll: { count: 4, faces: 12 },
                damageTypeOptions: ["poison"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-prestidigitation",
    name: ["Prestidigitação", "Prestidigitation"],
    source: "LDJ2024",
    page: 307,
    level: 0,
    school: "transmutation",
    description:
      "Você cria um efeito mágico menor dentro do alcance. Escolha um da lista de efeitos.",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "hour", value: 1 },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { normal: 10, unit: "ft" },
          target: { type: "pointInSpace" },
          outcomes: [
            {
              id: "prestidigitation-sensory",
              type: "customMechanic",
              on: "success",
              mechanic: "prestidigitation_sensoryEffect",
              details:
                "Cria um efeito sensorial inofensivo e instantâneo, como uma chuva de faíscas, uma lufada de vento, notas musicais fracas ou um odor estranho.",
            },
            {
              id: "prestidigitation-fire",
              type: "customMechanic",
              on: "success",
              mechanic: "prestidigitation_firePlay",
              details:
                "Instantaneamente acende ou apaga uma vela, uma tocha ou uma pequena fogueira.",
            },
            {
              id: "prestidigitation-clean",
              type: "customMechanic",
              on: "success",
              mechanic: "prestidigitation_cleanOrSoil",
              details:
                "Instantaneamente limpa ou suja um objeto não maior que 1 pé cúbico.",
            },
            {
              id: "prestidigitation-sensation",
              type: "customMechanic",
              on: "success",
              mechanic: "prestidigitation_minorSensation",
              details:
                "Esfria, aquece ou dá sabor a até 1 pé cúbico de material não-vivo por 1 hora.",
            },
            {
              id: "prestidigitation-mark",
              type: "customMechanic",
              on: "success",
              mechanic: "prestidigitation_magicMark",
              details:
                "Faz uma cor, uma pequena marca ou um símbolo aparecer em um objeto ou superfície por 1 hora.",
            },
            {
              id: "prestidigitation-creation",
              type: "customMechanic",
              on: "success",
              mechanic: "prestidigitation_minorCreation",
              details:
                "Cria uma bugiganga não mágica ou uma imagem ilusória que cabe na sua mão e dura até o final do seu próximo turno.",
            },
            {
              id: "prestidigitation-rules",
              type: "descriptive",
              on: "custom",
              details:
                "Se conjurar esta magia múltiplas vezes, você pode ter até três de seus efeitos não-instantâneos ativos por vez.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-produce-flame",
    name: ["Produzir Chama", "Produce Flame"],
    source: "LDJ2024",
    page: 308,
    level: 0,
    school: "conjuration",
    description:
      "Uma chama tremeluzente aparece em sua mão, emitindo luz. Pela duração, você pode usar uma ação para arremessar a chama em um alvo.",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "minute", value: 10 },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        endConditions: [{ trigger: "onCastingSpellAgain" }],
        parameters: {
          activation: { type: "bonusAction" },
          target: { type: "self" },
          outcomes: [
            {
              id: "produce-flame-light",
              type: "applyEffect",
              on: "success",
              effect: {
                type: "passive_providesLight",
                properties: {
                  bright: 20,
                  dim: 20,
                  duration: { unit: "minute", value: 10 },
                },
              },
            },
            {
              id: "produce-flame-grant-hurl-action",
              type: "applyEffect",
              on: "success",
              effect: {
                type: "activatableAction",
                actionId: "action-cast-spell",
                duration: { unit: "minute", value: 10 },
                parameters: {
                  activation: { type: "action" },
                  range: { normal: 60, unit: "ft" },
                  target: { type: "creature", quantity: 1 },
                  attackType: "rangedSpellAttack",
                  outcomes: [
                    {
                      id: "produce-flame-damage",
                      type: "damage",
                      on: "hit",
                      formula: {
                        type: "damage",
                        roll: { count: 1, faces: 8 },
                        damageTypeOptions: ["fire"],
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
                      outcomeId: "produce-flame-damage",
                      newFormula: {
                        type: "damage",
                        roll: { count: 2, faces: 8 },
                        damageTypeOptions: ["fire"],
                      },
                    },
                    {
                      type: "modifyOutcomeFormula",
                      level: 11,
                      outcomeId: "produce-flame-damage",
                      newFormula: {
                        type: "damage",
                        roll: { count: 3, faces: 8 },
                        damageTypeOptions: ["fire"],
                      },
                    },
                    {
                      type: "modifyOutcomeFormula",
                      level: 17,
                      outcomeId: "produce-flame-damage",
                      newFormula: {
                        type: "damage",
                        roll: { count: 4, faces: 8 },
                        damageTypeOptions: ["fire"],
                      },
                    },
                  ],
                },
              },
            },
            {
              id: "produce-flame-rules",
              type: "descriptive",
              on: "custom",
              details: "A magia termina se você a conjurar novamente.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-ray-of-frost",
    name: ["Raio de Gelo", "Ray of Frost"],
    source: "LDJ2024",
    page: 311,
    level: 0,
    school: "evocation",
    description:
      "Um raio gélido de luz branco-azulada dispara em direção a uma criatura dentro do alcance. Faça um ataque de magia à distância contra o alvo. Em um acerto, ele sofre 1d8 de dano de Frio, e sua velocidade é reduzida em 10 pés até o início do seu próximo turno.",
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
            normal: 60,
            unit: "ft",
          },
          attackType: "rangedSpellAttack",
          target: {
            type: "creature",
            quantity: 1,
          },
          outcomes: [
            {
              id: "rof-damage",
              type: "damage",
              on: "hit",
              formula: {
                type: "damage",
                roll: { count: 1, faces: 8 },
                damageTypeOptions: ["cold"],
              },
            },
            {
              id: "rof-slow",
              type: "modifyAttribute",
              on: "hit",
              attribute: "speed",
              operation: "subtract",
              value: 10,
              duration: {
                unit: "turn",
                value: 1,
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
              outcomeId: "rof-damage",
              newFormula: {
                type: "damage",
                roll: { count: 2, faces: 8 },
                damageTypeOptions: ["cold"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 11,
              outcomeId: "rof-damage",
              newFormula: {
                type: "damage",
                roll: { count: 3, faces: 8 },
                damageTypeOptions: ["cold"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 17,
              outcomeId: "rof-damage",
              newFormula: {
                type: "damage",
                roll: { count: 4, faces: 8 },
                damageTypeOptions: ["cold"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-resistance",
    name: ["Resistência", "Resistance"],
    source: "LDJ2024",
    page: 312,
    level: 0,
    school: "abjuration",
    description:
      "Você toca uma criatura voluntária e a protege. Uma vez por turno, quando o alvo sofre dano de um tipo pré-escolhido, ele pode reduzir esse dano em 1d4.",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "minute", value: 1, isConcentration: true },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        endConditions: [{ trigger: "onLoseConcentration" }],
        parameters: {
          activation: { type: "action" },
          range: { normal: 5, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          outcomes: [
            {
              id: "resistance-apply-buff",
              type: "applyEffect",
              on: "success",
              effect: {
                type: "triggeredModifier",
                trigger: "onTakingDamage",
                requiresChoice: "damageType",
                modifier: {
                  operation: "subtract",
                  dice: { count: 1, faces: 4 },
                  target: "damageRoll",
                  appliesTo: "self",
                },
                duration: { unit: "minute", value: 1, isConcentration: true },
              },
            },
            {
              id: "resistance-rules",
              type: "descriptive",
              on: "custom",
              details:
                "Uma criatura só pode se beneficiar desta magia uma vez por turno.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-sacred-flame",
    name: ["Chama Sagrada", "Sacred Flame"],
    source: "LDJ2024",
    page: 313,
    level: 0,
    school: "evocation",
    description:
      "Uma radiação flamejante desce sobre uma criatura no alcance. O alvo deve ser bem-sucedido em um teste de resistência de Destreza ou sofrerá 1d8 de dano radiante. O alvo não se beneficia de cobertura para este teste.",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "instantaneous" },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { normal: 60, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          save: {
            ability: "dexterity",
            dc: {
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "sacred-flame-damage",
              type: "damage",
              on: "fail",
              formula: {
                type: "damage",
                roll: { count: 1, faces: 8 },
                damageTypeOptions: ["radiant"],
              },
            },
            {
              id: "sacred-flame-cover-rule",
              type: "descriptive",
              on: "custom",
              details:
                "O alvo não ganha nenhum benefício de Meia Cobertura ou Cobertura de Três Quartos para este teste de resistência.",
            },
          ],
        },
        scaling: {
          type: "characterLevel",
          rules: [
            {
              type: "modifyOutcomeFormula",
              level: 5,
              outcomeId: "sacred-flame-damage",
              newFormula: {
                type: "damage",
                roll: { count: 2, faces: 8 },
                damageTypeOptions: ["radiant"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 11,
              outcomeId: "sacred-flame-damage",
              newFormula: {
                type: "damage",
                roll: { count: 3, faces: 8 },
                damageTypeOptions: ["radiant"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 17,
              outcomeId: "sacred-flame-damage",
              newFormula: {
                type: "damage",
                roll: { count: 4, faces: 8 },
                damageTypeOptions: ["radiant"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-shillelagh",
    name: ["Bordão Místico", "Shillelagh"],
    source: "LDJ2024",
    page: 316,
    level: 0,
    school: "transmutation",
    description:
      "Um porrete ou bordão que você segura é imbuído com o poder da natureza. Pela duração, você pode usar sua habilidade de conjuração em vez de Força para as rolagens de ataque e dano, e o dado de dano da arma se torna d8. O dano pode ser de Força ou o tipo normal da arma.",
    components: {
      types: ["verbal", "somatic"],
      material: { description: "visco e uma folha de trevo" },
    },
    duration: { unit: "minute", value: 1 },
    requirements: {
      casterConditions: [
        {
          type: "equippedItem",
          itemIds: ["item-clava", "item-bordao"],
          details: "É necessário estar empunhando um Porrete ou Bordão.",
        },
      ],
    },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        endConditions: [{ trigger: "onCastingSpellAgain" }],
        parameters: {
          activation: { type: "bonusAction" },
          target: { type: "self" },
          outcomes: [
            {
              id: "shillelagh-apply-buff",
              type: "applyEffect",
              on: "success",
              effect: {
                type: "activatableAction",
                actionId: "action-attack",
                duration: { unit: "minute", value: 1 },
                parameters: {
                  activation: { type: "action" },
                  attackType: "meleeWeaponAttack",
                  overrideAbilityScore: "spellcasting",
                  outcomes: [
                    {
                      id: "shillelagh-damage",
                      type: "damage",
                      on: "hit",
                      formula: {
                        type: "damage",
                        roll: { count: 1, faces: 8 },
                        damageTypeOptions: ["bludgeoning", "force"],
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
                      outcomeId: "shillelagh-damage",
                      newFormula: {
                        type: "damage",
                        roll: { count: 1, faces: 10 },
                        damageTypeOptions: ["bludgeoning", "force"],
                      },
                    },
                    {
                      type: "modifyOutcomeFormula",
                      level: 11,
                      outcomeId: "shillelagh-damage",
                      newFormula: {
                        type: "damage",
                        roll: { count: 1, faces: 12 },
                        damageTypeOptions: ["bludgeoning", "force"],
                      },
                    },
                    {
                      type: "modifyOutcomeFormula",
                      level: 17,
                      outcomeId: "shillelagh-damage",
                      newFormula: {
                        type: "damage",
                        roll: { count: 2, faces: 6 },
                        damageTypeOptions: ["bludgeoning", "force"],
                      },
                    },
                  ],
                },
              },
            },
            {
              id: "shillelagh-end-condition",
              type: "descriptive",
              on: "custom",
              details:
                "A magia termina se você a conjurar novamente ou se largar a arma.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-shocking-grasp",
    name: ["Toque Chocante", "Shocking Grasp"],
    source: "LDJ2024",
    page: 316,
    level: 0,
    school: "evocation",
    description:
      "Eletricidade salta de sua mão para uma criatura que você tenta tocar. Em um acerto, o alvo sofre 1d8 de dano elétrico e não pode usar reações até o início de seu próximo turno.",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "instantaneous" },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { normal: 5, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          attackType: "meleeSpellAttack",
          outcomes: [
            {
              id: "shocking-grasp-damage",
              type: "damage",
              on: "hit",
              formula: {
                type: "damage",
                roll: { count: 1, faces: 8 },
                damageTypeOptions: ["lightning"],
              },
            },
            {
              id: "shocking-grasp-no-reaction",
              type: "applyEffect",
              on: "hit",
              effect: {
                type: "preventsReaction",
                duration: {
                  unit: "turn",
                  value: 1,
                },
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
              outcomeId: "shocking-grasp-damage",
              newFormula: {
                type: "damage",
                roll: { count: 2, faces: 8 },
                damageTypeOptions: ["lightning"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 11,
              outcomeId: "shocking-grasp-damage",
              newFormula: {
                type: "damage",
                roll: { count: 3, faces: 8 },
                damageTypeOptions: ["lightning"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 17,
              outcomeId: "shocking-grasp-damage",
              newFormula: {
                type: "damage",
                roll: { count: 4, faces: 8 },
                damageTypeOptions: ["lightning"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-sorcerous-burst",
    name: ["Explosão Feiticeira", "Sorcerous Burst"],
    source: "LDJ2024",
    page: 318,
    level: 0,
    school: "evocation",
    description:
      "Você lança energia mágica em uma criatura ou objeto. Em um acerto, o alvo sofre 1d8 de dano de um tipo à sua escolha. Se você rolar um 8 no d8, pode rolar um d8 adicional.",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "instantaneous" },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { normal: 120, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          attackType: "rangedSpellAttack",
          outcomes: [
            {
              id: "sorcerous-burst-damage",
              type: "damage",
              on: "hit",
              formula: {
                type: "damage",
                roll: {
                  count: 1,
                  faces: 8,
                  explodesOn: 8,
                  explodeLimit: "spellcastingModifier",
                },
                damageTypeOptions: [
                  "acid",
                  "cold",
                  "fire",
                  "lightning",
                  "poison",
                  "psychic",
                  "thunder",
                ],
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
              outcomeId: "sorcerous-burst-damage",
              newFormula: {
                type: "damage",
                roll: {
                  count: 2,
                  faces: 8,
                  explodesOn: 8,
                  explodeLimit: "spellcastingModifier",
                },
                damageTypeOptions: [
                  "acid",
                  "cold",
                  "fire",
                  "lightning",
                  "poison",
                  "psychic",
                  "thunder",
                ],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 11,
              outcomeId: "sorcerous-burst-damage",
              newFormula: {
                type: "damage",
                roll: {
                  count: 3,
                  faces: 8,
                  explodesOn: 8,
                  explodeLimit: "spellcastingModifier",
                },
                damageTypeOptions: [
                  "acid",
                  "cold",
                  "fire",
                  "lightning",
                  "poison",
                  "psychic",
                  "thunder",
                ],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 17,
              outcomeId: "sorcerous-burst-damage",
              newFormula: {
                type: "damage",
                roll: {
                  count: 4,
                  faces: 8,
                  explodesOn: 8,
                  explodeLimit: "spellcastingModifier",
                },
                damageTypeOptions: [
                  "acid",
                  "cold",
                  "fire",
                  "lightning",
                  "poison",
                  "psychic",
                  "thunder",
                ],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-spare-the-dying",
    name: ["Poupar os Moribundos", "Spare the Dying"],
    source: "LDJ2024",
    page: 318,
    level: 0,
    school: "necromancy",
    description:
      "Você estabiliza uma criatura moribunda que esteja no alcance, trazendo-a de volta com 1 Ponto de Vida.",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "instantaneous" },
    requirements: {
      targetConditions: [
        {
          type: "hasZeroHP",
          details:
            "O alvo deve ter 0 de hp ou menos para poder ser estabilizado",
        },
      ],
    },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { normal: 15, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          outcomes: [
            {
              id: "spare-the-dying-heal",
              type: "modifyHP",
              on: "success",
              operation: "set",
              vitals: ["currentHp"],
              formula: { fixed: 1, addSpellcastingModifier: false },
            },
          ],
        },
        scaling: {
          type: "characterLevel",
          rules: [
            {
              type: "modifyActionParameter",
              level: 5,
              propertyPath: "range.normal",
              newValue: 30,
            },
            {
              type: "modifyActionParameter",
              level: 11,
              propertyPath: "range.normal",
              newValue: 60,
            },
            {
              type: "modifyActionParameter",
              level: 17,
              propertyPath: "range.normal",
              newValue: 120,
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-starry-wisp",
    name: ["Císcaro Estrelado", "Starry Wisp"],
    source: "LDJ2024",
    page: 320,
    level: 0,
    school: "evocation",
    description:
      "Você lança um cisco de luz em uma criatura ou objeto. Em um acerto, o alvo sofre 1d8 de dano radiante e, até o final do seu próximo turno, emite penumbra e não pode se beneficiar da condição Invisível.",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "instantaneous" },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { normal: 60, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          attackType: "rangedSpellAttack",
          outcomes: [
            {
              id: "starry-wisp-damage",
              type: "damage",
              on: "hit",
              formula: {
                type: "damage",
                roll: { count: 1, faces: 8 },
                damageTypeOptions: ["radiant"],
              },
            },
            {
              id: "starry-wisp-light-debuff",
              type: "applyEffect",
              on: "hit",
              effect: {
                type: "passive_providesLight",
                properties: {
                  bright: 0,
                  dim: 10,
                  duration: { unit: "round", value: 1 },
                },
              },
            },
            {
              id: "starry-wisp-invisible-debuff",
              type: "customMechanic",
              on: "hit",
              mechanic: "preventsInvisibilityBenefit",
              details:
                "O alvo não pode se beneficiar da condição Invisível até o final do seu próximo turno.",
            },
          ],
        },
        scaling: {
          type: "characterLevel",
          rules: [
            {
              type: "modifyOutcomeFormula",
              level: 5,
              outcomeId: "starry-wisp-damage",
              newFormula: {
                type: "damage",
                roll: { count: 2, faces: 8 },
                damageTypeOptions: ["radiant"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 11,
              outcomeId: "starry-wisp-damage",
              newFormula: {
                type: "damage",
                roll: { count: 3, faces: 8 },
                damageTypeOptions: ["radiant"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 17,
              outcomeId: "starry-wisp-damage",
              newFormula: {
                type: "damage",
                roll: { count: 4, faces: 8 },
                damageTypeOptions: ["radiant"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-thaumaturgy",
    name: ["Taumaturgia", "Thaumaturgy"],
    source: "LDJ2024",
    page: 333,
    level: 0,
    school: "transmutation",
    description:
      "Você manifesta uma pequena maravilha, criando um de vários efeitos possíveis dentro do alcance.",
    components: { types: ["verbal"] },
    duration: { unit: "minute", value: 1 },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { normal: 30, unit: "ft" },
          target: { type: "self" },
          outcomes: [
            {
              id: "thaumaturgy-eyes",
              type: "customMechanic",
              on: "success",
              mechanic: "alterEyes",
              details: "Você altera a aparência dos seus olhos por 1 minuto.",
            },
            {
              id: "thaumaturgy-booming-voice",
              type: "applyEffect",
              on: "success",
              effect: {
                type: "passive_grantAdvantage",
                on: "skillCheck",
                skill: "intimidation",
                duration: { unit: "minute", value: 1 },
              },
            },
            {
              id: "thaumaturgy-fire-play",
              type: "customMechanic",
              on: "success",
              mechanic: "controlFlames",
              details:
                "Você faz chamas piscarem, brilharem, escurecerem ou mudarem de cor por 1 minuto.",
            },
            {
              id: "thaumaturgy-door",
              type: "customMechanic",
              on: "success",
              mechanic: "slamDoorOrWindow",
              details:
                "Você instantaneamente faz uma porta ou janela destrancada se abrir ou bater com força.",
            },
            {
              id: "thaumaturgy-sound",
              type: "customMechanic",
              on: "success",
              mechanic: "phantomSound",
              details:
                "Você cria um som instantâneo que se origina de um ponto à sua escolha dentro do alcance.",
            },
            {
              id: "thaumaturgy-tremors",
              type: "customMechanic",
              on: "success",
              mechanic: "groundTremors",
              details: "Você causa tremores inofensivos no chão por 1 minuto.",
            },
            {
              id: "thaumaturgy-rules",
              type: "descriptive",
              on: "custom",
              details:
                "Se conjurar esta magia múltiplas vezes, você pode ter até três de seus efeitos de 1 minuto ativos por vez.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-thorn-whip",
    name: ["Chicote de Espinhos", "Thorn Whip"],
    source: "LDJ2024",
    page: 333,
    level: 0,
    school: "transmutation",
    description:
      "Você cria um chicote de vinhas com espinhos que ataca uma criatura no alcance. Em um acerto, o alvo sofre 1d6 de dano perfurante e, se for Grande ou menor, você pode puxá-lo 10 pés para mais perto de você.",
    components: {
      types: ["verbal", "somatic"],
      material: { description: "o caule de uma planta com espinhos" },
    },
    duration: { unit: "instantaneous" },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { normal: 30, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          attackType: "meleeSpellAttack",
          outcomes: [
            {
              id: "thorn-whip-damage",
              type: "damage",
              on: "hit",
              formula: {
                type: "damage",
                roll: { count: 1, faces: 6 },
                damageTypeOptions: ["piercing"],
              },
            },
            {
              id: "thorn-whip-pull",
              type: "moveTarget",
              on: "hit",
              direction: "towards",
              distance: {
                value: 10,
                unit: "ft",
              },
              allowedSizes: ["tiny", "small", "medium", "large"],
            },
          ],
        },
        scaling: {
          type: "characterLevel",
          rules: [
            {
              type: "modifyOutcomeFormula",
              level: 5,
              outcomeId: "thorn-whip-damage",
              newFormula: {
                type: "damage",
                roll: { count: 2, faces: 6 },
                damageTypeOptions: ["piercing"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 11,
              outcomeId: "thorn-whip-damage",
              newFormula: {
                type: "damage",
                roll: { count: 3, faces: 6 },
                damageTypeOptions: ["piercing"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 17,
              outcomeId: "thorn-whip-damage",
              newFormula: {
                type: "damage",
                roll: { count: 4, faces: 6 },
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-thunderclap",
    name: ["Estrondo de Trovão", "Thunderclap"],
    source: "LDJ2024",
    page: 333,
    level: 0,
    school: "evocation",
    description:
      "Você cria um estrondo de trovão que pode ser ouvido a até 100 pés de distância. Cada criatura na área, exceto você, deve fazer um teste de resistência de Constituição ou sofrerá 1d6 de dano de trovão.",
    components: { types: ["somatic"] },
    duration: { unit: "instantaneous" },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        parameters: {
          activation: { type: "action" },
          target: { type: "self" },
          area: { shape: "sphere", radius: 5 },
          save: {
            ability: "constitution",
            dc: {
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "thunderclap-damage",
              type: "damage",
              on: "fail",
              formula: {
                type: "damage",
                roll: { count: 1, faces: 6 },
                damageTypeOptions: ["thunder"],
              },
            },
            {
              id: "thunderclap-sound",
              type: "descriptive",
              on: "custom",
              details:
                "O som trovejante da magia pode ser ouvido a até 100 pés de distância.",
            },
          ],
        },
        scaling: {
          type: "characterLevel",
          rules: [
            {
              type: "modifyOutcomeFormula",
              level: 5,
              outcomeId: "thunderclap-damage",
              newFormula: {
                type: "damage",
                roll: { count: 2, faces: 6 },
                damageTypeOptions: ["thunder"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 11,
              outcomeId: "thunderclap-damage",
              newFormula: {
                type: "damage",
                roll: { count: 3, faces: 6 },
                damageTypeOptions: ["thunder"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 17,
              outcomeId: "thunderclap-damage",
              newFormula: {
                type: "damage",
                roll: { count: 4, faces: 6 },
                damageTypeOptions: ["thunder"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-toll-the-dead",
    name: ["Soar dos Mortos", "Toll the Dead"],
    source: "LDJ2024",
    page: 334,
    level: 0,
    school: "necromancy",
    description:
      "Você aponta para uma criatura e o som de um sino fúnebre soa. O alvo deve passar em um teste de resistência de Sabedoria ou sofrerá 1d8 de dano necrótico. Se o alvo não estiver com todos os seus Pontos de Vida, ele sofre 1d12 de dano necrótico em vez disso.",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "instantaneous" },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { normal: 60, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          save: {
            ability: "wisdom",
            dc: {
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "toll-the-dead-damage",
              type: "damage",
              on: "fail",
              formula: {
                condition: "targetIsWounded",
                ifTrue: {
                  type: "damage",

                  roll: { count: 1, faces: 12 },
                  damageTypeOptions: ["necrotic"],
                },
                ifFalse: {
                  type: "damage",

                  roll: { count: 1, faces: 8 },
                  damageTypeOptions: ["necrotic"],
                },
              },
            },
            {
              id: "toll-the-dead-sound",
              type: "descriptive",
              on: "custom",
              details:
                "O som de um sino fúnebre é audível a até 10 pés do alvo.",
            },
          ],
        },
        scaling: {
          type: "characterLevel",
          rules: [
            {
              type: "modifyOutcomeFormula",
              level: 5,
              outcomeId: "toll-the-dead-damage",
              newFormula: {
                condition: "targetIsWounded",
                ifTrue: {
                  type: "damage",
                  roll: { count: 2, faces: 12 },
                  damageTypeOptions: ["necrotic"],
                },
                ifFalse: {
                  type: "damage",

                  roll: { count: 2, faces: 8 },
                  damageTypeOptions: ["necrotic"],
                },
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 11,
              outcomeId: "toll-the-dead-damage",
              newFormula: {
                condition: "targetIsWounded",
                ifTrue: {
                  type: "damage",

                  roll: { count: 3, faces: 12 },
                  damageTypeOptions: ["necrotic"],
                },
                ifFalse: {
                  type: "damage",

                  roll: { count: 3, faces: 8 },
                  damageTypeOptions: ["necrotic"],
                },
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 17,
              outcomeId: "toll-the-dead-damage",
              newFormula: {
                condition: "targetIsWounded",
                ifTrue: {
                  type: "damage",

                  roll: { count: 4, faces: 12 },
                  damageTypeOptions: ["necrotic"],
                },
                ifFalse: {
                  type: "damage",

                  roll: { count: 4, faces: 8 },
                  damageTypeOptions: ["necrotic"],
                },
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-true-strike",
    name: ["Ataque Certeiro", "True Strike"],
    source: "LDJ2024",
    page: 336,
    level: 0,
    school: "divination",
    description:
      "Guiado por um lampejo de insight mágico, você faz um ataque com a arma usada na conjuração da magia, usando sua habilidade de conjuração para o ataque e o dano.",
    components: {
      types: ["somatic"],
    },
    duration: { unit: "instantaneous" },
    requirements: {
      casterConditions: [
        {
          type: "beProficientWithEquippedWeapon",
          details:
            "O conjurador deve ser proficiente com a arma que está empunhando.",
        },
      ],
    },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        parameters: {
          activation: { type: "action" },
          target: { type: "creature", quantity: 1 },
          attackType: "meleeWeaponAttack",
          overrideAbilityScore: "spellcasting",
          outcomes: [
            {
              id: "true-strike-weapon-damage",
              type: "customMechanic",
              on: "hit",
              mechanic: "dealWeaponDamage",
              details:
                "Por padrão, o dano será o definido pela arma, mas você pode escolher que esse dano também seja Radiante se preferir.",
            },
            {
              id: "true-strike-extra-damage",
              type: "damage",
              on: "hit",
              formula: {
                type: "damage",
                fixed: 0,
                damageTypeOptions: ["radiant"],
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
              outcomeId: "true-strike-extra-damage",
              newFormula: {
                type: "damage",
                roll: { count: 1, faces: 6 },
                damageTypeOptions: ["radiant"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 11,
              outcomeId: "true-strike-extra-damage",
              newFormula: {
                type: "damage",
                roll: { count: 2, faces: 6 },
                damageTypeOptions: ["radiant"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 17,
              outcomeId: "true-strike-extra-damage",
              newFormula: {
                type: "damage",
                roll: { count: 3, faces: 6 },
                damageTypeOptions: ["radiant"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-vicious-mockery",
    name: ["Zombaria Viciosa", "Vicious Mockery"],
    source: "LDJ2024",
    page: 337,
    level: 0,
    school: "enchantment",
    description:
      "Você lança uma série de insultos com encantamentos sutis em uma criatura. Se ela falhar em um teste de Sabedoria, sofre 1d6 de dano psíquico e tem desvantagem na próxima jogada de ataque que fizer antes do final de seu próximo turno.",
    components: { types: ["verbal"] },
    duration: { unit: "instantaneous" },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        parameters: {
          activation: { type: "action" },
          range: { normal: 60, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          save: {
            ability: "wisdom",
            dc: {
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "vicious-mockery-damage",
              type: "damage",
              on: "fail",
              formula: {
                type: "damage",
                roll: { count: 1, faces: 6 },
                damageTypeOptions: ["psychic"],
              },
            },
            {
              id: "vicious-mockery-disadvantage",
              type: "applyEffect",
              on: "fail",
              effect: {
                type: "imposeDisadvantage",
                on: "attackRoll",
                count: 1,
                duration: {
                  unit: "round",
                  value: 1,
                },
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
              outcomeId: "vicious-mockery-damage",
              newFormula: {
                type: "damage",
                roll: { count: 2, faces: 6 },
                damageTypeOptions: ["psychic"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 11,
              outcomeId: "vicious-mockery-damage",
              newFormula: {
                type: "damage",
                roll: { count: 3, faces: 6 },
                damageTypeOptions: ["psychic"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 17,
              outcomeId: "vicious-mockery-damage",
              newFormula: {
                type: "damage",
                roll: { count: 4, faces: 6 },
                damageTypeOptions: ["psychic"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-word-of-radiance",
    name: ["Palavra de Radiancia", "Word of Radiance"],
    source: "LDJ2024",
    page: 343,
    level: 0,
    school: "evocation",
    description:
      "Radiancia divina irrompe de você. Cada criatura de sua escolha que você pode ver na área deve ser bem-sucedida em um teste de resistência de Constituição ou sofrerá 1d6 de dano radiante.",
    components: {
      types: ["verbal"],
      material: { description: "um símbolo sagrado" },
    },
    duration: { unit: "instantaneous" },
    effects: [
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        parameters: {
          activation: { type: "action" },
          target: { type: "self" },
          area: { shape: "sphere", radius: 5 },
          save: {
            ability: "constitution",
            dc: {
              base: 8,
              attributes: ["proficiency", "spellcasting"],
            },
          },
          outcomes: [
            {
              id: "word-of-radiance-damage",
              type: "damage",
              on: "fail",
              formula: {
                type: "damage",
                roll: { count: 1, faces: 6 },
                damageTypeOptions: ["radiant"],
              },
            },
            {
              id: "word-of-radiance-targeting-rule",
              type: "descriptive",
              on: "custom",
              details:
                "Você pode escolher quais criaturas dentro da área de 5 pés são afetadas pela magia.",
            },
          ],
        },
        scaling: {
          type: "characterLevel",
          rules: [
            {
              type: "modifyOutcomeFormula",
              level: 5,
              outcomeId: "word-of-radiance-damage",
              newFormula: {
                type: "damage",
                roll: { count: 2, faces: 6 },
                damageTypeOptions: ["radiant"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 11,
              outcomeId: "word-of-radiance-damage",
              newFormula: {
                type: "damage",
                roll: { count: 3, faces: 6 },
                damageTypeOptions: ["radiant"],
              },
            },
            {
              type: "modifyOutcomeFormula",
              level: 17,
              outcomeId: "word-of-radiance-damage",
              newFormula: {
                type: "damage",
                roll: { count: 4, faces: 6 },
                damageTypeOptions: ["radiant"],
              },
            },
          ],
        },
      },
    ],
  },
] as const satisfies Spell[];
