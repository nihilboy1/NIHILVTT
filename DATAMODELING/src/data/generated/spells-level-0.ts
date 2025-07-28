import z from "zod";
import { FinalSpellDataSchema } from "../../domain/schemas.js";

type FinalSpellDataSchemaProps = z.infer<typeof FinalSpellDataSchema>;
export const spellsLevel0: FinalSpellDataSchemaProps = [
  {
    id: "spell-bolha-acida",
    name: "Bolha Ácida",
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
                dice: "1d6",
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
              level: 5,
              outcomeId: "acid-splash-damage",
              newFormula: {
                dice: "2d6",
                damageType: "acid",
              },
            },
            {
              level: 11,
              outcomeId: "acid-splash-damage",
              newFormula: {
                dice: "3d6",
                damageType: "acid",
              },
            },
            {
              level: 17,
              outcomeId: "acid-splash-damage",
              newFormula: {
                dice: "4d6",
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
    name: "Proteção Contra Lâminas",
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
                  dice: "-1d4",
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
    name: "Toque Arrepiante",
    source: "LDJ2024",
    page: 249,
    level: 0,
    school: "necromancy",
    components: { types: ["verbal", "somatic"] },
    duration: { unit: "instantaneous" },
    description:
      "Você cria uma mão esquelética fantasmagórica no espaço de uma criatura ao seu alcance. Faça um ataque mágico corpo a corpo contra a criatura. Se acertar, o alvo sofre 1d10 de dano necrótico e não pode recuperar pontos de vida até o início do seu próximo turno. Se você acertar um morto-vivo, ele também tem desvantagem nas jogadas de ataque contra você até o final do seu próximo turno.",
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
              formula: { dice: "1d10", damageType: "necrotic" },
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
              level: 5,
              outcomeId: "chill-touch-damage",
              newFormula: { dice: "2d6", damageType: "necrotic" },
            },
            {
              level: 11,
              outcomeId: "chill-touch-damage",
              newFormula: { dice: "3d6", damageType: "necrotic" },
            },
            {
              level: 17,
              outcomeId: "chill-touch-damage",
              newFormula: { dice: "4d6", damageType: "necrotic" },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-luzes-dancantes",
    name: "Luzes Dançantes",
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
    name: "Druidismo",
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
    name: "Rajada Mística",
    source: "LDJ2024",
    page: 267,
    level: 0,
    school: "evocation",
    description:
      "Você arremessa um raio de energia crepitante. Faça um ataque mágico à distância contra uma criatura ou objeto no alcance. Em caso de acerto, o alvo sofre 1d10 de dano de Força.",
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
                dice: "1d10",
                damageType: "force",
              },
            },
          ],
        },
        scaling: {
          type: "characterLevel",
          rules: [
            {
              level: 5,
              outcomeId: "eldritch-blast-damage",
              newFormula: {
                dice: "2d10",
                damageType: "force",
              },
            },
            {
              level: 11,
              outcomeId: "eldritch-blast-damage",
              newFormula: {
                dice: "3d10",
                damageType: "force",
              },
            },
            {
              level: 17,
              outcomeId: "eldritch-blast-damage",
              newFormula: {
                dice: "4d10",
                damageType: "force",
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "spell-elementalismo",
    name: "Elementalismo",
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
    name: "Raio de Fogo",
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
                dice: "1d10",
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
              level: 5,
              outcomeId: "fire-bolt-damage",
              newFormula: {
                dice: "2d10",
                damageType: "fire",
              },
            },
            {
              level: 11,
              outcomeId: "fire-bolt-damage",
              newFormula: {
                dice: "3d10",
                damageType: "fire",
              },
            },
            {
              level: 17,
              outcomeId: "fire-bolt-damage",
              newFormula: {
                dice: "4d10",
                damageType: "fire",
              },
            },
          ],
        },
      },
    ],
  },
] as const;
