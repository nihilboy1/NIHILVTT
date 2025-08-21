import { on } from "events";
import { Monster } from "../../domain/creature/creature.schema";

export const monsters_cr_1_2_modeled: Monster[] = [
  {
    id: "monster-ape",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    name: ["Macaco", "Ape"],
    description:
      "O Macaco é um primata inteligente e ágil, conhecido por sua força e habilidade de escalar árvores com facilidade.",
    source: "MM2024",
    size: "medium",
    type: "beast",
    alignment: "unaligned",
    armorClass: 12,
    hitPoints: {
      average: 19,
      formula: { count: 3, faces: 8, bonus: 6 },
    },
    speed: {
      walk: 30,
      climb: 30,
      unit: "ft",
    },
    environment: ["forest"],
    abilityScores: {
      strength: 16,
      dexterity: 14,
      constitution: 14,
      intelligence: 6,
      wisdom: 12,
      charisma: 7,
    },
    proficiencyBonus: {
      skills: [
        { skill: "athletics", bonus: 5 },
        { skill: "perception", bonus: 3 },
      ],
    },
    senses: {
      passivePerception: 13,
    },
    challengeRating: "1/2",
    traits: [
      {
        name: "Escalada Ágil",
        description:
          "O macaco pode escalar superfícies difíceis sem precisar fazer um teste de habilidade.",
      },
    ],
    effects: [
      {
        type: "multiAttack",
        name: "Ataque Múltiplo",
        attacksName: ["Soco"],
        amount: 2,
        actionId: "action-multiattack",
        parameters: {
          activation: { type: "action" },
        },
      },
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Soco",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 5,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 4, bonus: 3 },
                damageTypeOptions: ["bludgeoning"],
              },
            },
          ],
        },
      },
      {
        type: "activatableAction",
        name: "Pedra",
        actionId: "action-throw-item",
        parameters: {
          activation: { type: "action" },
          attackType: ["rangedWeaponAttack"],
          attackBonus: 5,
          charges: {
            type: "dice",
            max: 1,
            successOn: [1],
            roll: { count: 1, faces: 6 },
            triggers: { events: [{ type: "onTurnStart" }] },
          },
          range: { normal: 25, long: 50, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 2, faces: 6, bonus: 3 },
                damageTypeOptions: ["bludgeoning"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-black-bear",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    name: ["Urso Negro", "Black Bear"],
    description:
      "O Urso Negro é um mamífero poderoso e territorial, encontrado em florestas densas. É conhecido por sua força e habilidade de escalar árvores.",
    source: "MM2024",
    size: "medium",
    type: "beast",
    alignment: "unaligned",
    armorClass: 11,
    hitPoints: {
      average: 19,
      formula: { count: 3, faces: 8, bonus: 6 },
    },
    speed: {
      walk: 30,
      climb: 30,
      swim: 30,
      unit: "ft",
    },
    environment: ["forest"],
    abilityScores: {
      strength: 15,
      dexterity: 12,
      constitution: 14,
      intelligence: 2,
      wisdom: 12,
      charisma: 7,
    },
    proficiencyBonus: {
      skills: [{ skill: "perception", bonus: 5 }],
    },
    senses: {
      passivePerception: 15,
      vision: { darkvision: 60 },
    },
    challengeRating: "1/2",
    traits: [
      {
        name: "Faro Aguçado",
        description:
          "O urso tem vantagem em testes de Sabedoria (Percepção) que dependam do olfato.",
      },
    ],
    effects: [
      {
        type: "multiAttack",
        name: "Ataque Múltiplo",
        attacksName: ["Dilacerar"],
        amount: 2,
        actionId: "action-multiattack",
        parameters: {
          activation: { type: "action" },
        },
      },
      {
        type: "activatableAction",
        name: "Dilacerar",
        actionId: "action-attack",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 4,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 6, bonus: 2 },
                damageTypeOptions: ["slashing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-cockatrice",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    name: ["Cocatriz", "Cockatrice"],
    description:
      "A Cocatriz é uma criatura pequena e feroz, conhecida por sua mordida capaz de petrificar suas vítimas.",
    source: "MM2024",
    size: "small",
    type: "monstrosity",
    alignment: "unaligned",
    armorClass: 11,
    hitPoints: {
      average: 22,
      formula: { count: 5, faces: 6, bonus: 5 },
    },
    speed: {
      walk: 20,
      fly: 40,
      unit: "ft",
    },
    environment: ["grassland"],
    abilityScores: {
      strength: 6,
      dexterity: 12,
      constitution: 12,
      intelligence: 2,
      wisdom: 13,
      charisma: 5,
    },
    senses: {
      passivePerception: 11,
      vision: { darkvision: 60 },
    },
    defenses: {
      immunities: {
        condition: ["petrified"],
      },
    },
    languages: [],
    challengeRating: "1/2",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Mordida Petrificante",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 3,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 4, bonus: 1 },
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
        chainedEffects: [
          {
            triggers: { events: [{ type: "attackHit" }] },
            save: {
              type: "fixed",
              attributes: ["constitution"],
              value: 11,
            },
            outcomes: [
              {
                on: "fail",
                type: "applyCondition",
                condition: "restrained",
                duration: {
                  unit: "turn",
                  value: 1,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "monster-crocodile",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    name: ["Crocodilo", "Crocodile"],
    description:
      "O Crocodilo é um réptil predador que habita áreas alagadas e é conhecido por sua mordida poderosa e emboscadas sorrateiras.",
    source: "MM2024",
    size: "large",
    type: "beast",
    alignment: "unaligned",
    armorClass: 12,
    hitPoints: {
      average: 13,
      formula: { count: 2, faces: 10, bonus: 2 },
    },
    speed: {
      walk: 20,
      swim: 30,
      unit: "ft",
    },
    environment: ["coast", "swamp", "urban"],
    abilityScores: {
      strength: 15,
      dexterity: 10,
      constitution: 13,
      intelligence: 2,
      wisdom: 10,
      charisma: 5,
    },
    proficiencyBonus: {
      skills: [{ skill: "stealth", bonus: 2 }],
    },
    senses: {
      passivePerception: 10,
    },
    languages: [],
    challengeRating: "1/2",
    traits: [
      {
        name: "Fôlego Prolongado",
        description: "O crocodilo pode prender a respiração por 1 hora.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Mordida",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 4,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 8, bonus: 2 },
                damageTypeOptions: ["piercing"],
              },
            },
            {
              on: "hit",
              type: "applyCondition",
              condition: "grappled",
              duration: { unit: "indefinite" },
              requirements: {
                target: {
                  events: [
                    {
                      type: "isCreatureOfSize",
                      creatureSizes: ["medium", "small", "tiny"],
                    },
                  ],
                },
              },
            },
            {
              on: "hit",
              type: "applyCondition",
              condition: "restrained",
              duration: { unit: "indefinite" },
              requirements: {
                target: {
                  events: [
                    {
                      type: "isCreatureOfSize",
                      creatureSizes: ["medium", "small", "tiny"],
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-darkmantle",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    name: ["Manto Sombrio", "Darkmantle"],
    description:
      "O Manto Sombrio é uma criatura das profundezas que caça suas presas mergulhando do teto de cavernas e sufocando-as na escuridão.",
    source: "MM2024",
    size: "small",
    type: "aberration",
    alignment: "unaligned",
    armorClass: 11,
    hitPoints: {
      average: 22,
      formula: { count: 5, faces: 6, bonus: 5 },
    },
    speed: {
      walk: 10,
      fly: 30,
      unit: "ft",
    },
    environment: ["underdark"],
    abilityScores: {
      strength: 16,
      dexterity: 12,
      constitution: 13,
      intelligence: 2,
      wisdom: 10,
      charisma: 5,
    },
    proficiencyBonus: {
      skills: [{ skill: "stealth", bonus: 3 }],
    },
    senses: {
      passivePerception: 10,
      vision: { blindsight: 60 },
    },
    languages: [],
    challengeRating: "1/2",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Esmagar",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 5,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 6, bonus: 3 },
                damageTypeOptions: ["bludgeoning"],
              },
            },
          ],
        },
      },

      {
        type: "activatableAction",
        actionId: "action-create-area-of-effect",
        name: "Escuridão",
        parameters: {
          activation: { type: "action" },
          range: { normal: 15, unit: "ft" },
          area: { shape: "sphere", radius: 15, unit: "ft" },
          outcomes: [
            {
              type: "createAreaEffect",
              duration: { unit: "minute", value: 10 },
              on: "any",
              surfaceType: "darkness",
              id: "darkness-area",
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-dust-mephit",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    name: ["Mefit de Poeira", "Dust Mephit"],
    description:
      "O Mefit de Poeira é um elemental travesso formado de poeira e vento, conhecido por suas explosões ao morrer.",
    source: "MM2024",
    size: "small",
    type: "elemental",
    alignment: "neutralEvil",
    armorClass: 12,
    hitPoints: {
      average: 17,
      formula: { count: 5, faces: 6 },
    },
    speed: {
      walk: 30,
      fly: 30,
      unit: "ft",
    },
    environment: ["planar"],
    abilityScores: {
      strength: 5,
      dexterity: 14,
      constitution: 10,
      intelligence: 9,
      wisdom: 11,
      charisma: 10,
    },
    proficiencyBonus: {
      skills: [
        { skill: "perception", bonus: 2 },
        { skill: "stealth", bonus: 4 },
      ],
    },
    senses: {
      passivePerception: 12,
      vision: { darkvision: 60 },
    },
    defenses: {
      immunities: { damage: ["poison"], condition: ["exhausted", "poisoned"] },
      vulnerabilities: ["fire"],
    },
    languages: ["primordial"],
    challengeRating: "1/2",

    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Garra",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 4,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 4, bonus: 2 },
                damageTypeOptions: ["slashing"],
              },
            },
          ],
        },
      },
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        name: "Sopro Cegante",
        parameters: {
          activation: { type: "action" },
          range: { normal: 15, unit: "ft" },
          area: { shape: "cone", length: 15, unit: "ft" },
          save: {
            ability: "dexterity",
            dc: { type: "fixed", value: 10 },
          },
          outcomes: [
            {
              on: "fail",
              type: "applyCondition",
              condition: "blinded",
              duration: { unit: "turn", value: 1 },
            },
          ],
          charges: {
            type: "dice",
            max: 1,
            roll: { count: 1, faces: 6 },
            successOn: [6],
            triggers: { events: [{ type: "onTurnStart" }] },
          },
        },
      },
      {
        type: "triggeredEffect",
        triggers: { events: [{ type: "died" }] },
        name: "Explosão Mortal",
        parameters: {
          activation: { type: "special" },
          area: { shape: "sphere", radius: 15, unit: "ft" },
        },
        save: {
          type: "fixed",
          value: 10,
          attributes: ["dexterity"],
        },
        outcomes: [
          {
            on: "fail",
            type: "modifyTargetHP",
            vitals: ["currentHp"],
            formula: {
              type: "damage",
              roll: { count: 2, faces: 4 },
              damageTypeOptions: ["bludgeoning"],
            },
          },
        ],
      },
    ],
  },
  {
    id: "monster-gas-spore-fungus",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    name: ["Fungo Esporo de Gás", "Gas Spore Fungus"],
    description:
      "O Fungo Esporo de Gás se assemelha a um perigoso beholder, mas explode liberando esporos mortais ao ser atacado.",
    source: "MM2024",
    size: "large",
    type: "plant",
    alignment: "unaligned",
    armorClass: 8,
    hitPoints: {
      average: 13,
      formula: { count: 9, faces: 10, bonus: -36 },
    },
    speed: {
      walk: 5,
      fly: 10,
      unit: "ft",
    },
    environment: ["underdark"],
    abilityScores: {
      strength: 5,
      dexterity: 1,
      constitution: 3,
      intelligence: 1,
      wisdom: 1,
      charisma: 1,
    },
    senses: {
      passivePerception: 5,
      vision: { blindsight: 30 },
    },
    defenses: {
      immunities: {
        damage: ["poison"],
        condition: [
          "blinded",
          "charmed",
          "deafened",
          "frightened",
          "paralyzed",
          "poisoned",
          "prone",
        ],
      },
    },
    languages: [],
    challengeRating: "1/2",
    traits: [
      {
        name: "Explosão Mortal",
        description:
          "O esporo de gás explode ao morrer. Teste de resistência de Constituição CD 10, cada criatura em uma área de 6 metros de emanação originada do esporo. Em caso de falha: O alvo sofre 10 (3d6) de dano de veneno e fica envenenado por 1d12 horas. Se a condição não for removida, o alvo morre ao final desse tempo e brotam 2d4 Fungos Esporo de Gás Pequenos (cada um com 1 Ponto de Vida). Após 2d6 dias, eles se tornam Grandes e têm 13 Pontos de Vida.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Tentáculo",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 0,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 6 },
                damageTypeOptions: ["poison"],
              },
            },
            {
              on: "hit",
              type: "applyCondition",
              condition: "poisoned",
              duration: { unit: "turn", value: 1 },
            },
          ],
        },
      },
      {
        type: "triggeredEffect",
        name: "Explosão de Esporos",
        triggers: { events: [{ type: "died" }] },
        outcomes: [
          {
            on: "any",
            type: "descriptive",
            details:
              "O fungo explode, causando dano de veneno e a condição de Envenenado.",
          },
        ],
      },
    ],
  },
  {
    id: "monster-giant-goat",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    name: ["Cabra Gigante", "Giant Goat"],
    description:
      "A Cabra Gigante é um animal robusto e ágil, capaz de escalar terrenos íngremes e sobreviver em ambientes montanhosos hostis.",
    source: "MM2024",
    size: "large",
    type: "beast",
    alignment: "unaligned",
    armorClass: 11,
    hitPoints: {
      average: 19,
      formula: { count: 3, faces: 10, bonus: 3 },
    },
    speed: {
      walk: 40,
      climb: 30,
      unit: "ft",
    },
    environment: ["grassland", "hill", "mountain"],
    abilityScores: {
      strength: 17,
      dexterity: 13,
      constitution: 12,
      intelligence: 3,
      wisdom: 12,
      charisma: 6,
    },
    proficiencyBonus: {
      skills: [{ skill: "perception", bonus: 3 }],
    },
    senses: {
      passivePerception: 13,
      vision: { darkvision: 60 },
    },
    languages: [],
    challengeRating: "1/2",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Investida",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 5,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 6, bonus: 3 },
                damageTypeOptions: ["bludgeoning"],
              },
            },
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 2, faces: 4 },
                damageTypeOptions: ["bludgeoning"],
              },
              requirements: {
                user: {
                  events: [
                    {
                      type: "movesAtLeast",
                      distance: { normal: 20, unit: "ft" },
                    },
                  ],
                },
              },
            },
            {
              on: "hit",
              type: "applyCondition",
              condition: "prone",
              requirements: {
                user: {
                  events: [
                    {
                      type: "movesAtLeast",
                      distance: { normal: 20, unit: "ft" },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-giant-seahorse",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    name: ["Cavalo-Marinho Gigante", "Giant Seahorse"],
    description:
      "O Cavalo-Marinho Gigante é uma criatura aquática de grande porte, frequentemente usada como montaria por criaturas submarinas.",
    source: "MM2024",
    size: "large",
    type: "beast",
    alignment: "unaligned",
    armorClass: 14,
    hitPoints: {
      average: 16,
      formula: { count: 3, faces: 10 },
    },
    speed: {
      walk: 5,
      swim: 40,
      unit: "ft",
    },
    environment: ["underwater"],
    abilityScores: {
      strength: 15,
      dexterity: 12,
      constitution: 11,
      intelligence: 2,
      wisdom: 12,
      charisma: 5,
    },
    senses: { passivePerception: 11 },
    languages: [],
    challengeRating: "1/2",
    traits: [
      {
        name: "Respiração Aquática",
        description: "O cavalo-marinho só pode respirar debaixo d'água.",
      },
      {
        name: "Corrida Borbulhante",
        description:
          "Enquanto estiver debaixo d'água, o cavalo-marinho se move até metade de sua Velocidade de Natação sem provocar Ataques de Oportunidade.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Investida",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 4,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 2, faces: 6, bonus: 2 },
                damageTypeOptions: ["bludgeoning"],
              },
            },
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 2, faces: 8, bonus: 2 },
                damageTypeOptions: ["bludgeoning"],
              },
              requirements: {
                user: {
                  events: [
                    {
                      type: "movesAtLeast",
                      distance: { normal: 20, unit: "ft" },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-giant-wasp",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    name: ["Vespa Gigante", "Giant Wasp"],
    description:
      "A Vespa Gigante é um inseto predador de tamanho impressionante, conhecido por seu ferrão venenoso e voo ágil.",
    source: "MM2024",
    size: "medium",
    type: "beast",
    alignment: "unaligned",
    armorClass: 13,
    hitPoints: {
      average: 22,
      formula: { count: 5, faces: 8 },
    },
    speed: {
      walk: 10,
      fly: 50,
      unit: "ft",
    },
    environment: ["forest", "grassland", "urban"],
    abilityScores: {
      strength: 10,
      dexterity: 14,
      constitution: 10,
      intelligence: 1,
      wisdom: 10,
      charisma: 3,
    },
    senses: { passivePerception: 10 },
    languages: [],
    challengeRating: "1/2",
    traits: [
      {
        name: "Voo Rasante",
        description:
          "A vespa não provoca Ataques de Oportunidade quando voa para fora do alcance de um inimigo.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Ferrão",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 4,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 6, bonus: 2 },
                damageTypeOptions: ["piercing"],
              },
            },
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 2, faces: 4 },
                damageTypeOptions: ["poison"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-gnoll-warrior",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    name: ["Gnoll Guerreiro", "Gnoll Warrior"],
    description:
      "O Gnoll Guerreiro é um feroz combatente das tribos gnoll, conhecido por sua selvageria e táticas brutais em batalha.",
    source: "MM2024",
    size: "medium",
    type: "fiend",
    alignment: "chaoticEvil",
    armorClass: 15,
    hitPoints: {
      average: 27,
      formula: { count: 6, faces: 8 },
    },
    speed: {
      walk: 30,
      unit: "ft",
    },
    environment: ["desert", "forest", "grassland", "hill"],
    abilityScores: {
      strength: 14,
      dexterity: 12,
      constitution: 11,
      intelligence: 6,
      wisdom: 10,
      charisma: 7,
    },
    senses: {
      passivePerception: 10,
      vision: { darkvision: 60 },
    },
    languages: ["gnoll"],
    challengeRating: "1/2",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Rasgar",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 4,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 6, bonus: 2 },
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Arco de Ossos",
        parameters: {
          activation: { type: "action" },
          attackType: ["rangedWeaponAttack"],
          attackBonus: 3,
          range: { normal: 150, long: 600, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 10, bonus: 1 },
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-gray-ooze",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    name: ["Lodo Cinzento", "Gray Ooze"],
    description:
      "O Lodo Cinzento é uma criatura amorfa e corrosiva, encontrada em masmorras e cavernas, capaz de dissolver metal e carne.",
    source: "MM2024",
    size: "medium",
    type: "ooze",
    alignment: "unaligned",
    armorClass: 9,
    hitPoints: {
      average: 22,
      formula: { count: 3, faces: 8, bonus: 9 },
    },
    speed: {
      walk: 10,
      climb: 10,
      unit: "ft",
    },
    environment: ["underdark"],
    abilityScores: {
      strength: 12,
      dexterity: 6,
      constitution: 16,
      intelligence: 1,
      wisdom: 6,
      charisma: 2,
    },
    proficiencyBonus: {
      skills: [{ skill: "stealth", bonus: 2 }],
    },
    senses: {
      passivePerception: 8,
      vision: { blindsight: 60 },
    },
    defenses: {
      resistances: ["acid", "cold", "fire"],
      immunities: {
        condition: [
          "blinded",
          "charmed",
          "deafened",
          "exhausted",
          "frightened",
          "grappled",
          "prone",
          "restrained",
        ],
      },
    },
    languages: [],
    challengeRating: "1/2",
    traits: [
      {
        name: "Amorfo",
        description:
          "O lodo pode se mover por espaços tão estreitos quanto 2,5 cm sem gastar movimento extra para isso.",
      },
      {
        name: "Forma Corrosiva",
        description:
          "Munição não mágica é destruída imediatamente após atingir o lodo e causar qualquer dano. Qualquer arma não mágica recebe um penalizador cumulativo de -1 nas jogadas de ataque após causar dano ao lodo e entrar em contato com ele. A arma é destruída se o penalizador chegar a -5. O penalizador pode ser removido com a magia Reparar. O lodo pode corroer metal ou madeira não mágica de até 5 cm de espessura em 1 rodada.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Pseudópode",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 3,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 2, faces: 8, bonus: 1 },
                damageTypeOptions: ["acid"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-hobgoblin-warrior",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    name: ["Hobgoblin Guerreiro", "Hobgoblin Warrior"],
    description:
      "O Hobgoblin Guerreiro é um soldado disciplinado das legiões hobgoblin, treinado em táticas de combate em grupo.",
    source: "MM2024",
    size: "medium",
    type: "fey",
    alignment: "lawfulEvil",
    armorClass: 18,
    hitPoints: {
      average: 11,
      formula: { count: 2, faces: 8, bonus: 2 },
    },
    speed: {
      walk: 30,
      unit: "ft",
    },
    environment: [
      "desert",
      "forest",
      "grassland",
      "hill",
      "mountain",
      "planar",
      "acheron",
      "underdark",
    ],
    abilityScores: {
      strength: 13,
      dexterity: 12,
      constitution: 12,
      intelligence: 10,
      wisdom: 10,
      charisma: 9,
    },
    senses: {
      passivePerception: 10,
      vision: { darkvision: 60 },
    },
    languages: ["common", "goblin"],
    challengeRating: "1/2",
    traits: [
      {
        name: "Táticas de Matilha",
        description:
          "O hobgoblin tem vantagem em jogadas de ataque contra uma criatura se pelo menos um aliado do hobgoblin estiver a até 1,5 metro da criatura e não estiver incapacitado.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Espada Longa",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeWeaponAttack"],
          attackBonus: 3,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 2, faces: 10, bonus: 1 },
                damageTypeOptions: ["slashing"],
              },
            },
          ],
        },
      },
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Arco Longo",
        parameters: {
          activation: { type: "action" },
          attackType: ["rangedWeaponAttack"],
          attackBonus: 3,
          range: { normal: 150, long: 600, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 8, bonus: 1 },
                damageTypeOptions: ["piercing"],
              },
            },
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 3, faces: 4 },
                damageTypeOptions: ["poison"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-ice-mephit",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    name: ["Mefit de Gelo", "Ice Mephit"],
    description:
      "O Mefit de Gelo é um elemental travesso formado de gelo e ar frio, capaz de liberar rajadas congelantes.",
    source: "MM2024",
    size: "small",
    type: "elemental",
    alignment: "neutralEvil",
    armorClass: 11,
    hitPoints: {
      average: 21,
      formula: { count: 6, faces: 6 },
    },
    speed: {
      walk: 30,
      fly: 30,
      unit: "ft",
    },
    environment: ["planar"],
    abilityScores: {
      strength: 7,
      dexterity: 13,
      constitution: 10,
      intelligence: 9,
      wisdom: 11,
      charisma: 12,
    },
    proficiencyBonus: {
      skills: [
        { skill: "perception", bonus: 2 },
        { skill: "stealth", bonus: 3 },
      ],
    },
    senses: {
      passivePerception: 12,
      vision: { darkvision: 60 },
    },
    defenses: {
      immunities: {
        damage: ["cold", "poison"],
        condition: ["exhausted", "poisoned"],
      },
      vulnerabilities: ["fire"],
    },
    languages: ["primordial"],
    challengeRating: "1/2",
    traits: [
      {
        name: "Explosão Mortal",
        description:
          "O mefit explode ao morrer. Teste de resistência de Constituição CD 10, cada criatura em uma área de 1,5 metro de emanação originada do mefit. Em caso de falha: 5 (2d4) de dano de frio. Sucesso: Metade do dano.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Garra",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 3,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 4, bonus: 1 },
                damageTypeOptions: ["slashing"],
              },
            },
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 4 },
                damageTypeOptions: ["cold"],
              },
            },
          ],
        },
      },
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        name: "Sopro Gélido",
        parameters: {
          activation: { type: "action" },
          range: { normal: 15, unit: "ft" },
          area: { shape: "cone", length: 15, unit: "ft" },
          save: {
            ability: "constitution",
            dc: { type: "fixed", value: 10 },
          },
          outcomes: [
            {
              on: "fail",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 3, faces: 4 },
                damageTypeOptions: ["cold"],
              },
            },
            {
              on: "success",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "halfDamage",
                of: "frost-breath-damage",
              },
            },
          ],
          charges: {
            type: "dice",
            max: 1,
            roll: { count: 1, faces: 6 },
            successOn: [6],
            triggers: { events: [{ type: "onTurnStart" }] },
          },
        },
      },
    ],
  },
  {
    id: "monster-jackalwere",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    name: ["Homem-Chacal", "Jackalwere"],
    description:
      "O Homem-Chacal é uma criatura maligna capaz de alternar entre forma de chacal e humanoide, conhecida por sua astúcia e ataques em grupo.",
    source: "MM2024",
    size: "small",
    type: "fiend",
    alignment: "chaoticEvil",
    armorClass: 12,
    hitPoints: {
      average: 18,
      formula: { count: 4, faces: 6, bonus: 4 },
    },
    speed: {
      walk: 40,
      unit: "ft",
    },
    environment: ["desert", "grassland"],
    abilityScores: {
      strength: 11,
      dexterity: 15,
      constitution: 12,
      intelligence: 13,
      wisdom: 11,
      charisma: 10,
    },
    proficiencyBonus: {
      skills: [
        { skill: "deception", bonus: 4 },
        { skill: "perception", bonus: 4 },
        { skill: "stealth", bonus: 4 },
      ],
    },
    senses: {
      passivePerception: 14,
      vision: { darkvision: 90 },
    },
    languages: ["common"],
    challengeRating: "1/2",
    traits: [
      {
        name: "Táticas de Matilha",
        description:
          "O chacalwere tem vantagem em jogadas de ataque contra uma criatura se pelo menos um aliado do chacalwere estiver a até 1,5 metro da criatura e não estiver incapacitado.",
      },
    ],
    effects: [
      {
        type: "multiAttack",
        name: "Ataque Múltiplo",
        attacksName: ["Rend", "Slam"],
        amount: 2,
        actionId: "action-multiattack",
        parameters: {
          activation: { type: "action" },
        },
      },
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Rasgar",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 4,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 6, bonus: 2 },
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Slam",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 4,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 4, bonus: 2 },
                damageTypeOptions: ["bludgeoning"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-magma-mephit",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    name: ["Mefit de Magma", "Magma Mephit"],
    description:
      "O Mefit de Magma é um elemental travesso composto de rocha derretida e fogo, explodindo em chamas ao morrer.",
    source: "MM2024",
    size: "small",
    type: "elemental",
    alignment: "neutralEvil",
    armorClass: 11,
    hitPoints: {
      average: 18,
      formula: { count: 4, faces: 6, bonus: 4 },
    },
    speed: {
      walk: 30,
      fly: 30,
      unit: "ft",
    },
    environment: ["planar"],
    abilityScores: {
      strength: 8,
      dexterity: 12,
      constitution: 12,
      intelligence: 7,
      wisdom: 10,
      charisma: 10,
    },
    proficiencyBonus: {
      skills: [{ skill: "stealth", bonus: 3 }],
    },
    senses: {
      passivePerception: 10,
      vision: { darkvision: 60 },
    },
    defenses: {
      immunities: {
        damage: ["fire", "poison"],
        condition: ["exhausted", "poisoned"],
      },
      vulnerabilities: ["cold"],
    },
    languages: ["primordial"],
    challengeRating: "1/2",
    traits: [
      {
        name: "Explosão Mortal",
        description:
          "O mefit explode ao morrer. Teste de resistência de Destreza CD 11, cada criatura em uma área de 1,5 metro de emanação originada do mefit. Em caso de falha: 7 (2d6) de dano de fogo. Sucesso: Metade do dano.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Claw",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 3,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 4, bonus: 1 },
                damageTypeOptions: ["slashing"],
              },
            },
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 6 },
                damageTypeOptions: ["fire"],
              },
            },
          ],
        },
      },
      {
        type: "activatableCastSpell",
        actionId: "action-cast-spell",
        name: "Sopro de Fogo",
        parameters: {
          activation: { type: "action" },
          range: { normal: 15, unit: "ft" },
          area: { shape: "cone", length: 15, unit: "ft" },
          save: {
            ability: "dexterity",
            dc: { type: "fixed", value: 11 },
          },
          outcomes: [
            {
              on: "fail",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 2, faces: 6 },
                damageTypeOptions: ["fire"],
              },
            },
            {
              on: "success",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "halfDamage",
                of: "fire-breath-damage",
              },
            },
          ],
          charges: {
            type: "dice",
            max: 1,
            roll: { count: 1, faces: 6 },
            successOn: [6],
            triggers: { events: [{ type: "onTurnStart" }] },
          },
        },
      },
    ],
  },
  {
    id: "monster-magmin",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    name: ["Magmin", "Magmin"],
    description:
      "O Magmin é uma criatura elemental de fogo, pequena e incandescente, que incendeia tudo o que toca.",
    source: "MM2024",
    size: "small",
    type: "elemental",
    alignment: "chaoticNeutral",
    armorClass: 14,
    hitPoints: {
      average: 13,
      formula: { count: 3, faces: 6, bonus: 3 },
    },
    speed: {
      walk: 30,
      unit: "ft",
    },
    environment: ["planar"],
    abilityScores: {
      strength: 7,
      dexterity: 15,
      constitution: 12,
      intelligence: 8,
      wisdom: 11,
      charisma: 10,
    },
    senses: {
      passivePerception: 10,
      vision: { darkvision: 60 },
    },
    defenses: {
      immunities: { damage: ["fire"] },
    },
    languages: ["primordial"],
    challengeRating: "1/2",
    traits: [
      {
        name: "Explosão Mortal",
        description:
          "O magmin explode ao morrer. Teste de resistência de Destreza CD 11, cada criatura em uma área de 3 metros de emanação originada do magmin. Em caso de falha: 7 (2d6) de dano de fogo. Sucesso: Metade do dano.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Toque",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 4,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 2, faces: 4, bonus: 2 },
                damageTypeOptions: ["fire"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-modron-tridrone",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    name: ["Modron Tridrone", "Modron Tridrone"],
    description:
      "O Modron Tridrone é um construto extraplanar de forma geométrica, servindo como soldado e supervisor nas fileiras modron.",
    source: "MM2024",
    size: "medium",
    type: "construct",
    alignment: "lawfulNeutral",
    armorClass: 15,
    hitPoints: {
      average: 16,
      formula: { count: 3, faces: 8, bonus: 3 },
    },
    speed: {
      walk: 30,
      unit: "ft",
    },
    environment: ["planar"],
    abilityScores: {
      strength: 12,
      dexterity: 13,
      constitution: 12,
      intelligence: 9,
      wisdom: 10,
      charisma: 9,
    },
    senses: {
      passivePerception: 10,
      vision: { truesight: 120 },
    },
    defenses: {
      immunities: { condition: ["charmed"] },
    },
    languages: ["modron"],
    challengeRating: "1/2",
    traits: [
      {
        name: "Desintegração",
        description:
          "Se o modron morrer, ele se desintegra em pó, deixando para trás tudo o que estava vestindo ou carregando.",
      },
    ],
    effects: [
      {
        type: "multiAttack",
        name: "Ataque Múltiplo",
        attacksName: ["Clockwork Spear"],
        amount: 3,
        actionId: "action-multiattack",
        parameters: {
          activation: { type: "action" },
        },
      },
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Lança Mecânica",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeWeaponAttack", "rangedWeaponAttack"],
          attackBonus: 3,
          range: { normal: 5, unit: "ft", long: 120 },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 6, bonus: 1 },
                damageTypeOptions: ["force"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-myconid-adult",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    name: ["Miconídeo Adulto", "Myconid Adult"],
    description:
      "O Miconídeo Adulto é um fungo inteligente do Subterrâneo, vivendo em colônias e comunicando-se por esporos telepáticos.",
    source: "MM2024",
    size: "medium",
    type: "plant",
    alignment: "lawfulNeutral",
    armorClass: 12,
    hitPoints: {
      average: 16,
      formula: { count: 3, faces: 8, bonus: 3 },
    },
    speed: {
      walk: 20,
      unit: "ft",
    },
    environment: ["underdark"],
    abilityScores: {
      strength: 10,
      dexterity: 10,
      constitution: 12,
      intelligence: 10,
      wisdom: 13,
      charisma: 7,
    },
    senses: {
      passivePerception: 11,
      vision: { darkvision: 120 },
    },
    languages: ["telepathy"],
    challengeRating: "1/2",
    traits: [
      {
        name: "Doença Solar",
        description:
          "Enquanto estiver sob luz solar, o miconídeo tem desvantagem em testes de D20. O miconídeo morre se passar mais de 1 hora sob luz solar.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Esmagamento",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 2,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 8 },
                damageTypeOptions: ["bludgeoning"],
              },
            },
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 6 },
                damageTypeOptions: ["poison"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-performer",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    name: ["Artista", "Performer"],
    description:
      "O Artista é um humanoide talentoso em apresentações, usando agilidade e carisma tanto no palco quanto em situações de perigo.",
    source: "MM2024",
    size: "medium",
    type: "humanoid",
    alignment: "unaligned",
    armorClass: 13,
    hitPoints: {
      average: 27,
      formula: { count: 5, faces: 8, bonus: 5 },
    },
    speed: {
      walk: 30,
      unit: "ft",
    },
    environment: ["any"],
    abilityScores: {
      strength: 12,
      dexterity: 16,
      constitution: 12,
      intelligence: 13,
      wisdom: 14,
      charisma: 16,
    },
    proficiencyBonus: {
      skills: [
        { skill: "acrobatics", bonus: 5 },
        { skill: "athletics", bonus: 3 },
        { skill: "performance", bonus: 7 },
      ],
    },
    senses: {
      passivePerception: 12,
    },
    languages: ["common"],
    challengeRating: "1/2",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Shortsword",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeWeaponAttack"],
          attackBonus: 5,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 6, bonus: 3 },
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-piercer",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    name: ["Perfurador", "Piercer"],
    description:
      "O Perfurador é uma aberração cavernícola que se assemelha a uma estalactite, caindo do teto para atacar suas presas.",
    source: "MM2024",
    size: "medium",
    type: "aberration",
    alignment: "unaligned",
    armorClass: 15,
    hitPoints: {
      average: 22,
      formula: { count: 3, faces: 8, bonus: 9 },
    },
    speed: {
      walk: 5,
      climb: 15,
      unit: "ft",
    },
    environment: ["underdark"],
    abilityScores: {
      strength: 13,
      dexterity: 13,
      constitution: 16,
      intelligence: 1,
      wisdom: 7,
      charisma: 3,
    },
    proficiencyBonus: {
      skills: [{ skill: "stealth", bonus: 5 }],
    },
    senses: {
      passivePerception: 8,
      vision: { blindsight: 30, darkvision: 60 },
    },
    languages: [],
    challengeRating: "1/2",
    traits: [
      {
        name: "Escalar como Aranha",
        description:
          "O perfurador pode escalar superfícies difíceis, incluindo tetos, sem precisar fazer um teste de habilidade.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Mordida",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 3,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 8, bonus: 1 },
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Queda",
        parameters: {
          activation: { type: "action" },
          range: { normal: 5, unit: "ft" },
          save: {
            ability: "dexterity",
            dc: { type: "fixed", value: 11 },
          },
          outcomes: [
            {
              on: "fail",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 3, faces: 6 },
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-reef-shark",
    name: ["Tubarão de Recife", "Reef Shark"],
    description:
      "O Tubarão de Recife é um predador ágil dos mares rasos, caçando em grupos e atacando presas feridas.",
    source: "MM2024",
    size: "medium",
    type: "beast",
    alignment: "unaligned",
    armorClass: 12,
    hitPoints: {
      average: 22,
      formula: { count: 4, faces: 8, bonus: 4 },
    },
    speed: {
      walk: 5,
      swim: 30,
      unit: "ft",
    },
    environment: ["underwater"],
    abilityScores: {
      strength: 14,
      dexterity: 15,
      constitution: 13,
      intelligence: 1,
      wisdom: 10,
      charisma: 4,
    },
    senses: {
      passivePerception: 12,
      vision: { blindsight: 30 },
    },
    languages: [],
    challengeRating: "1/2",
    traits: [
      {
        name: "Táticas de Matilha",
        description:
          "O tubarão tem vantagem em jogadas de ataque contra uma criatura se pelo menos um aliado do tubarão estiver a até 1,5 metro da criatura e não estiver incapacitado.",
      },
      {
        name: "Respiração Aquática",
        description: "O tubarão só pode respirar debaixo d'água.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Bite",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 4,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 2, faces: 4, bonus: 2 },
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-rust-monster",
    name: ["Monstro da Ferrugem", "Rust Monster"],
    description:
      "O Monstro da Ferrugem é uma criatura subterrânea que se alimenta de metais, especialmente ferro, sendo temida por aventureiros equipados.",
    source: "MM2024",
    size: "medium",
    type: "monstrosity",
    alignment: "unaligned",
    armorClass: 14,
    hitPoints: {
      average: 33,
      formula: { count: 6, faces: 8, bonus: 6 },
    },
    speed: {
      walk: 40,
      unit: "ft",
    },
    environment: ["underdark"],
    abilityScores: {
      strength: 13,
      dexterity: 12,
      constitution: 13,
      intelligence: 2,
      wisdom: 13,
      charisma: 6,
    },
    senses: {
      passivePerception: 11,
      vision: { darkvision: 60 },
    },
    languages: [],
    challengeRating: "1/2",
    traits: [
      {
        name: "Olfato de Ferro",
        description:
          "O monstro da ferrugem pode localizar com precisão metais ferrosos em um raio de 9 metros.",
      },
    ],
    effects: [
      {
        type: "multiAttack",
        name: "Ataque Múltiplo",
        attacksName: ["Bite", "Antennae"],
        amount: 2,
        actionId: "action-multiattack",
        parameters: {
          activation: { type: "action" },
        },
      },
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Bite",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 3,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 8, bonus: 1 },
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-sahuagin-warrior",
    name: ["Sahuagin Guerreiro", "Sahuagin Warrior"],
    description:
      "O Sahuagin Guerreiro é um feroz habitante dos mares, conhecido por sua agressividade e domínio sobre tubarões.",
    source: "MM2024",
    size: "medium",
    type: "fiend",
    alignment: "lawfulEvil",
    armorClass: 12,
    hitPoints: {
      average: 22,
      formula: { count: 4, faces: 8, bonus: 4 },
    },
    speed: {
      walk: 30,
      swim: 40,
      unit: "ft",
    },
    environment: ["coast", "underwater"],
    abilityScores: {
      strength: 13,
      dexterity: 11,
      constitution: 12,
      intelligence: 12,
      wisdom: 13,
      charisma: 9,
    },
    proficiencyBonus: {
      skills: [{ skill: "perception", bonus: 5 }],
    },
    senses: {
      passivePerception: 15,
      vision: { darkvision: 120 },
    },
    defenses: {
      resistances: ["acid", "cold"],
    },
    languages: ["sahuagin"],
    challengeRating: "1/2",
    traits: [
      {
        name: "Frenesi de Sangue",
        description:
          "O sahuagin tem vantagem nas jogadas de ataque contra qualquer criatura que não esteja com todos os seus pontos de vida.",
      },
      {
        name: "Anfíbio Limitado",
        description:
          "O sahuagin pode respirar ar e água, mas deve submergir pelo menos uma vez a cada 4 horas para evitar sufocamento fora d'água.",
      },
      {
        name: "Telepatia com Tubarões",
        description:
          "O sahuagin pode controlar magicamente tubarões em um raio de 36 metros, usando uma telepatia especial.",
      },
    ],
    effects: [
      {
        type: "multiAttack",
        name: "Ataque Múltiplo",
        attacksName: ["Claw"],
        amount: 2,
        actionId: "action-multiattack",
        parameters: {
          activation: { type: "action" },
        },
      },
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Garra",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 3,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 6, bonus: 1 },
                damageTypeOptions: ["slashing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-satyr",
    name: ["Sátiro", "Satyr"],
    description:
      "O Sátiro é uma criatura fey festiva e travessa, famosa por sua música, dança e resistência mágica.",
    source: "MM2024",
    size: "medium",
    type: "fey",
    alignment: "chaoticNeutral",
    armorClass: 13,
    hitPoints: {
      average: 31,
      formula: { count: 7, faces: 8 },
    },
    speed: {
      walk: 40,
      unit: "ft",
    },
    environment: ["forest", "planar", "feywild"],
    abilityScores: {
      strength: 12,
      dexterity: 16,
      constitution: 11,
      intelligence: 12,
      wisdom: 10,
      charisma: 14,
    },
    proficiencyBonus: {
      skills: [
        { skill: "perception", bonus: 2 },
        { skill: "performance", bonus: 6 },
        { skill: "stealth", bonus: 5 },
      ],
    },
    senses: {
      passivePerception: 12,
      vision: { darkvision: 60 },
    },
    languages: ["common", "elvish", "sylvan"],
    challengeRating: "1/2",
    traits: [
      {
        name: "Resistência à Magia",
        description:
          "O sátiro tem vantagem em testes de resistência contra magias e outros efeitos mágicos.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Hooves",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 5,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 4, bonus: 3 },
                damageTypeOptions: ["bludgeoning"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-scout",
    name: ["Batedor", "Scout"],
    description:
      "O Batedor é um explorador habilidoso, mestre em sobrevivência, furtividade e reconhecimento de terreno.",
    source: "MM2024",
    size: "medium",
    type: "humanoid",
    alignment: "unaligned",
    armorClass: 13,
    hitPoints: {
      average: 16,
      formula: { count: 3, faces: 8, bonus: 3 },
    },
    speed: {
      walk: 30,
      unit: "ft",
    },
    environment: ["any"],
    abilityScores: {
      strength: 11,
      dexterity: 14,
      constitution: 12,
      intelligence: 11,
      wisdom: 13,
      charisma: 11,
    },
    proficiencyBonus: {
      skills: [
        { skill: "nature", bonus: 4 },
        { skill: "perception", bonus: 5 },
        { skill: "stealth", bonus: 6 },
        { skill: "survival", bonus: 5 },
      ],
    },
    senses: {
      passivePerception: 15,
    },
    languages: ["common"],
    challengeRating: "1/2",
    effects: [
      {
        type: "multiAttack",
        name: "Ataque Múltiplo",
        attacksName: ["Shortsword", "Longbow"],
        amount: 2,
        actionId: "action-multiattack",
        parameters: {
          activation: { type: "action" },
        },
      },
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Espada Curta",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeWeaponAttack"],
          attackBonus: 4,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 6, bonus: 2 },
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Arco Longo",
        parameters: {
          activation: { type: "action" },
          attackType: ["rangedWeaponAttack"],
          attackBonus: 4,
          range: { normal: 150, long: 600, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 8, bonus: 2 },
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-shadow",
    name: ["Sombra", "Shadow"],
    description:
      "A Sombra é um morto-vivo incorpóreo que drena a força vital de suas vítimas, temendo a luz do sol.",
    source: "MM2024",
    size: "medium",
    type: "undead",
    alignment: "chaoticEvil",
    armorClass: 12,
    hitPoints: {
      average: 27,
      formula: { count: 5, faces: 8, bonus: 5 },
    },
    speed: {
      walk: 40,
      unit: "ft",
    },
    environment: ["planar", "underdark", "urban"],
    abilityScores: {
      strength: 6,
      dexterity: 14,
      constitution: 13,
      intelligence: 6,
      wisdom: 10,
      charisma: 8,
    },
    proficiencyBonus: {
      skills: [{ skill: "stealth", bonus: 6 }],
    },
    senses: {
      passivePerception: 10,
      vision: { darkvision: 60 },
    },
    defenses: {
      resistances: ["acid", "cold", "fire", "lightning", "thunder"],
      immunities: {
        damage: ["necrotic", "poison"],
        condition: [
          "exhausted",
          "frightened",
          "grappled",
          "paralyzed",
          "petrified",
          "poisoned",
          "prone",
          "restrained",
          "unconscious",
        ],
      },
      vulnerabilities: ["radiant"],
    },
    languages: [],
    challengeRating: "1/2",
    traits: [
      {
        name: "Amorfo",
        description:
          "A sombra pode se mover através de espaços tão estreitos quanto 2,5 centímetros sem gastar movimento extra para isso.",
      },
      {
        name: "Vulnerabilidade à Luz Solar",
        description:
          "Enquanto estiver sob luz solar, a sombra tem desvantagem em testes de d20.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Toque Drenante",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 4,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 6, bonus: 2 },
                damageTypeOptions: ["necrotic"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-swarm-of-insects",
    name: ["Enxame de Insetos", "Swarm of Insects"],
    description:
      "O Enxame de Insetos é uma massa de criaturas pequenas que ataca em conjunto, difícil de ser contida por ataques convencionais.",
    source: "MM2024",
    size: "medium",
    type: "beast",
    alignment: "unaligned",
    armorClass: 11,
    hitPoints: {
      average: 19,
      formula: { count: 3, faces: 8, bonus: 6 },
    },
    speed: {
      walk: 20,
      climb: 20,
      fly: 20,
      unit: "ft",
    },
    environment: [
      "desert",
      "forest",
      "grassland",
      "hill",
      "swamp",
      "underdark",
      "urban",
    ],
    abilityScores: {
      strength: 3,
      dexterity: 13,
      constitution: 14,
      intelligence: 1,
      wisdom: 7,
      charisma: 1,
    },
    senses: {
      passivePerception: 8,
      vision: { blindsight: 30 },
    },
    defenses: {
      resistances: ["bludgeoning", "piercing", "slashing"],
      immunities: {
        condition: [
          "charmed",
          "frightened",
          "grappled",
          "paralyzed",
          "petrified",
          "prone",
          "restrained",
          "stunned",
        ],
      },
    },
    languages: [],
    challengeRating: "1/2",
    traits: [
      {
        name: "Escalada de Aranha",
        description:
          "Se o enxame tiver velocidade de escalada, ele pode escalar superfícies difíceis, incluindo tetos, sem precisar fazer testes de habilidade.",
      },
      {
        name: "Enxame",
        description:
          "O enxame pode ocupar o espaço de outra criatura e vice-versa, e o enxame pode se mover através de qualquer abertura grande o suficiente para um inseto Minúsculo. O enxame não pode recuperar pontos de vida ou ganhar pontos de vida temporários.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Mordidas",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 3,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 2, faces: 4, bonus: 1 },
                damageTypeOptions: ["poison"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-tough",
    name: ["Durão", "Tough"],
    description:
      "O Durão é um humanoide robusto e resistente, acostumado a combates e a proteger aliados em situações perigosas.",
    source: "MM2024",
    size: "medium",
    type: "humanoid",
    alignment: "unaligned",
    armorClass: 12,
    hitPoints: {
      average: 32,
      formula: { count: 5, faces: 8, bonus: 10 },
    },
    speed: {
      walk: 30,
      unit: "ft",
    },
    environment: ["any"],
    abilityScores: {
      strength: 15,
      dexterity: 12,
      constitution: 14,
      intelligence: 10,
      wisdom: 10,
      charisma: 11,
    },
    senses: { passivePerception: 10 },
    languages: ["common"],
    challengeRating: "1/2",
    traits: [
      {
        name: "Táticas de Grupo",
        description:
          "O durão tem vantagem nas jogadas de ataque contra uma criatura se pelo menos um dos aliados do durão estiver a 1,5 metro da criatura e o aliado não estiver incapacitado.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Maça",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeWeaponAttack"],
          attackBonus: 4,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 6, bonus: 2 },
                damageTypeOptions: ["bludgeoning"],
              },
            },
          ],
        },
      },
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Besta Pesada",
        parameters: {
          activation: { type: "action" },
          attackType: ["rangedWeaponAttack"],
          attackBonus: 3,
          range: { normal: 100, long: 400, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 10, bonus: 1 },
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-troll-limb",
    name: ["Membro de Troll", "Troll Limb"],
    description:
      "O Membro de Troll é uma parte viva e independente de um troll, capaz de se mover e atacar até regenerar ou definhar.",
    source: "MM2024",
    size: "small",
    type: "giant",
    alignment: "chaoticEvil",
    armorClass: 13,
    hitPoints: {
      average: 14,
      formula: { count: 4, faces: 6 },
    },
    speed: {
      walk: 20,
      unit: "ft",
    },
    environment: ["arctic", "forest", "hill", "mountain", "swamp", "underdark"],
    abilityScores: {
      strength: 18,
      dexterity: 12,
      constitution: 10,
      intelligence: 1,
      wisdom: 9,
      charisma: 1,
    },
    senses: {
      passivePerception: 9,
      vision: { darkvision: 60 },
    },
    languages: [],
    challengeRating: "1/2",
    traits: [
      {
        name: "Regeneração",
        description:
          "O membro recupera 5 pontos de vida no início de cada um de seus turnos. Se o membro sofrer dano de ácido ou fogo, esta característica não funciona no próximo turno do membro. O membro só morre se começar seu turno com 0 pontos de vida e não se regenerar.",
      },
      {
        name: "Prole de Troll",
        description:
          "O membro estranhamente tem os mesmos sentidos de um troll completo. Se o membro não for destruído dentro de 24 horas, role 1d12. Em um resultado 12, o membro se transforma em um Troll. Caso contrário, o membro murcha.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Rasgar",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 6,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 2, faces: 4, bonus: 4 },
                damageTypeOptions: ["slashing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-vine-blight",
    name: ["Praga de Videira", "Vine Blight"],
    description:
      "A Praga de Videira é uma planta monstruosa que usa vinhas para agarrar e sufocar suas vítimas em florestas sombrias.",
    source: "MM2024",
    size: "medium",
    type: "plant",
    alignment: "neutralEvil",
    armorClass: 12,
    hitPoints: {
      average: 19,
      formula: { count: 3, faces: 8, bonus: 6 },
    },
    speed: {
      walk: 20,
      unit: "ft",
    },
    environment: ["forest"],
    abilityScores: {
      strength: 15,
      dexterity: 8,
      constitution: 14,
      intelligence: 5,
      wisdom: 10,
      charisma: 3,
    },
    proficiencyBonus: {
      skills: [{ skill: "stealth", bonus: 1 }],
    },
    senses: {
      passivePerception: 10,
      vision: { blindsight: 60 },
    },
    defenses: {
      immunities: { condition: ["deafened"] },
    },
    languages: ["common"],
    challengeRating: "1/2",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Vinha Constritora",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 4,
          range: { normal: 10, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 8, bonus: 2 },
                damageTypeOptions: ["bludgeoning"],
              },
            },
            {
              on: "hit",
              type: "applyCondition",
              condition: "grappled",
              duration: { unit: "indefinite" },
              requirements: {
                target: {
                  events: [
                    {
                      type: "isCreatureOfSize",
                      creatureSizes: ["medium", "small", "tiny"],
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-warhorse",
    name: ["Cavalo de Guerra", "Warhorse"],
    description:
      "O Cavalo de Guerra é um animal treinado para batalha, forte e veloz, usado como montaria por cavaleiros e soldados.",
    source: "MM2024",
    size: "large",
    type: "beast",
    alignment: "unaligned",
    armorClass: 11,
    hitPoints: {
      average: 19,
      formula: { count: 3, faces: 10, bonus: 3 },
    },
    speed: {
      walk: 60,
      unit: "ft",
    },
    environment: ["urban"],
    abilityScores: {
      strength: 18,
      dexterity: 12,
      constitution: 13,
      intelligence: 2,
      wisdom: 12,
      charisma: 7,
    },
    senses: {
      passivePerception: 11,
    },
    languages: [],
    challengeRating: "1/2",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Casco",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 6,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 2, faces: 4, bonus: 4 },
                damageTypeOptions: ["bludgeoning"],
              },
            },
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 2, faces: 4 },
                damageTypeOptions: ["bludgeoning"],
              },
              requirements: {
                user: {
                  events: [
                    {
                      type: "movesAtLeast",
                      distance: { normal: 20, unit: "ft" },
                    },
                  ],
                },
              },
            },
            {
              on: "hit",
              type: "applyCondition",
              condition: "prone",
              requirements: {
                user: {
                  events: [
                    {
                      type: "movesAtLeast",
                      distance: { normal: 20, unit: "ft" },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-warhorse-skeleton",
    name: ["Cavalo de Guerra Esqueleto", "Warhorse Skeleton"],
    description:
      "O Cavalo de Guerra Esqueleto é um morto-vivo animado por magia, servindo como montaria incansável em exércitos necromânticos.",
    source: "MM2024",
    size: "large",
    type: "undead",
    alignment: "lawfulEvil",
    armorClass: 13,
    hitPoints: {
      average: 22,
      formula: { count: 3, faces: 10, bonus: 6 },
    },
    speed: {
      walk: 60,
      unit: "ft",
    },
    environment: ["planar", "underdark", "urban"],
    abilityScores: {
      strength: 18,
      dexterity: 12,
      constitution: 15,
      intelligence: 2,
      wisdom: 8,
      charisma: 5,
    },
    senses: {
      passivePerception: 9,
      vision: { darkvision: 60 },
    },
    defenses: {
      vulnerabilities: ["bludgeoning"],
      immunities: { damage: ["poison"], condition: ["exhausted", "poisoned"] },
    },
    languages: ["common"],
    challengeRating: "1/2",
    traits: [
      {
        name: "Fortitude Morto-vivo",
        description:
          "Se um dano reduzir o zumbi a 0 pontos de vida, ele faz um teste de resistência de Constituição (CD 5 + o dano sofrido), a menos que o dano seja radiante ou de um acerto crítico. Em caso de sucesso, o zumbi cai para 1 ponto de vida em vez disso.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Casco",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 6,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 6, bonus: 4 },
                damageTypeOptions: ["bludgeoning"],
              },
            },
            {
              on: "hit",
              type: "applyCondition",
              condition: "prone",
              requirements: {
                user: {
                  events: [
                    {
                      type: "movesAtLeast",
                      distance: { normal: 20, unit: "ft" },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-worg",
    name: ["Worg", "Worg"],
    description:
      "O Worg é uma criatura lupina inteligente e maligna, frequentemente aliada a goblins e usada como montaria.",
    source: "MM2024",
    size: "large",
    type: "fey",
    alignment: "neutralEvil",
    armorClass: 13,
    hitPoints: {
      average: 26,
      formula: { count: 4, faces: 10, bonus: 4 },
    },
    speed: {
      walk: 50,
      unit: "ft",
    },
    environment: ["forest", "grassland", "hill", "planar", "feywild"],
    abilityScores: {
      strength: 16,
      dexterity: 13,
      constitution: 13,
      intelligence: 7,
      wisdom: 11,
      charisma: 8,
    },
    proficiencyBonus: {
      skills: [{ skill: "perception", bonus: 4 }],
    },
    senses: {
      passivePerception: 14,
      vision: { darkvision: 60 },
    },
    languages: ["goblin", "worg"],
    challengeRating: "1/2",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Mordida",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 5,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 8, bonus: 3 },
                damageTypeOptions: ["piercing"],
              },
            },
            {
              on: "hit",
              type: "descriptive",
              details:
                "O próximo ataque feito contra o alvo antes do início do próximo turno do worg tem vantagem.",
            },
          ],
        },
      },
    ],
  },
];
