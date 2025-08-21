import { Monster } from "../../domain/creature/creature.schema";

export const monsters_cr_0: Monster[] = [
  {
    id: "monster-awakened-shrub",
    name: ["Arbusto Desperto", "Awakened Shrub"],
    description:
      "Despertado por magia, este arbusto ganhou senciência e a capacidade de se mover. Geralmente protege locais naturais ou serve a quem o despertou.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "small",
    type: "plant",
    alignment: "trueNeutral",
    armorClass: 9,
    hitPoints: {
      average: 10,
      formula: { count: 3, faces: 6 },
    },
    speed: {
      walk: 20,
      unit: "ft",
    },
    environment: ["forest"],
    abilityScores: {
      strength: 3,
      dexterity: 8,
      constitution: 11,
      intelligence: 10,
      wisdom: 10,
      charisma: 6,
    },
    senses: { passivePerception: 10 },
    defenses: {
      resistances: ["piercing"],
      vulnerabilities: ["fire"],
    },
    languages: ["common", "other"],
    challengeRating: "0",
    traits: [
      {
        name: "Aparência Falsa",
        description:
          "Enquanto o Arbusto Desperto permanece imóvel e não é danificado, ele é indistinguível de um arbusto normal.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Rastrar",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 1,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                fixed: 1,
                damageTypeOptions: ["slashing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-baboon",
    name: ["Babuíno", "Baboon"],
    description:
      "Babuínos são primatas agressivos que vivem em bandos. Eles são conhecidos por sua tática de matilha e mordidas ferozes.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "small",
    type: "beast",
    alignment: "unaligned",
    armorClass: 12,
    hitPoints: {
      average: 3,
      formula: { count: 1, faces: 6 },
    },
    speed: {
      walk: 30,
      climb: 30,
      unit: "ft",
    },
    environment: ["forest", "hill"],
    isFamiliar: true,
    abilityScores: {
      strength: 8,
      dexterity: 14,
      constitution: 11,
      intelligence: 4,
      wisdom: 12,
      charisma: 6,
    },
    senses: { passivePerception: 11 },
    challengeRating: "0",
    effects: [
      {
        type: "passive_grantAdvantage",
        name: "Táticas de Matilha",
        on: "attackRoll",
        triggers: {
          events: [
            {
              type: "hasAllyNearby",
              allyIsNotIncapacitated: true,
              range: { normal: 5, unit: "ft" },
            },
          ],
        },
      },
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Mordida",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 1,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 4, bonus: -1 },
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-badger",
    name: ["Texugo", "Badger"],
    description:
      "Texugos são mamíferos escavadores conhecidos por sua ferocidade quando ameaçados. Eles têm uma mordida poderosa e garras afiadas.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "tiny",
    type: "beast",
    alignment: "unaligned",
    armorClass: 11,
    hitPoints: {
      average: 5,
      formula: { count: 1, faces: 4, bonus: 3 },
    },
    speed: {
      walk: 20,
      burrow: 5,
      unit: "ft",
    },
    environment: ["forest"],
    isFamiliar: true,
    abilityScores: {
      strength: 10,
      dexterity: 11,
      constitution: 16,
      intelligence: 2,
      wisdom: 12,
      charisma: 5,
    },
    proficiencyBonus: {
      skills: [{ skill: "perception", bonus: 3 }],
    },
    senses: {
      passivePerception: 13,
      vision: {
        darkvision: 30,
      },
    },
    defenses: {
      resistances: ["poison"],
    },
    challengeRating: "0",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Mordida",
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
                fixed: 1,
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-bat",
    name: ["Morcego", "Bat"],
    description:
      "Morcegos são criaturas noturnas que usam ecolocalização para navegar e caçar. Embora pequenos, podem ser encontrados em grandes enxames.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "tiny",
    type: "beast",
    alignment: "unaligned",
    armorClass: 12,
    hitPoints: {
      average: 1,
      formula: { count: 1, faces: 4, bonus: -1 },
    },
    speed: {
      walk: 5,
      fly: 30,
      unit: "ft",
    },
    environment: ["forest", "mountain", "underdark", "urban"],
    isFamiliar: true,
    abilityScores: {
      strength: 2,
      dexterity: 15,
      constitution: 8,
      intelligence: 2,
      wisdom: 12,
      charisma: 4,
    },
    senses: {
      passivePerception: 11,
      vision: {
        blindsight: 60,
      },
    },
    challengeRating: "0",
    traits: [
      {
        name: "Ecolocalização",
        description:
          "O morcego não pode usar sua visão às cegas enquanto estiver surdo.",
      },
      {
        name: "Audição Aguçada",
        description:
          "O morcego tem vantagem em testes de Sabedoria (Percepção) que dependem da audição.",
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
                fixed: 1,
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-cat",
    name: ["Gato", "Cat"],
    description:
      "Gatos são predadores ágeis e furtivos, frequentemente encontrados em áreas urbanas e selvagens. São conhecidos por seu olfato aguçado e garras afiadas.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "tiny",
    type: "beast",
    alignment: "unaligned",
    armorClass: 12,
    hitPoints: {
      average: 2,
      formula: { count: 1, faces: 4 },
    },
    speed: {
      walk: 40,
      climb: 40,
      unit: "ft",
    },
    environment: ["desert", "forest", "grassland", "urban"],
    isFamiliar: true,
    abilityScores: {
      strength: 3,
      dexterity: 15,
      constitution: 10,
      intelligence: 3,
      wisdom: 12,
      charisma: 7,
    },
    proficiencyBonus: {
      skills: [
        { skill: "perception", bonus: 3 },
        { skill: "stealth", bonus: 4 },
      ],
    },
    senses: {
      passivePerception: 13,
    },
    challengeRating: "0",
    traits: [
      {
        name: "Olfato Aguçado",
        description:
          "O gato tem vantagem em testes de Sabedoria (Percepção) que dependem do olfato.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Garras",
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
                fixed: 1,
                damageTypeOptions: ["slashing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-commoner",
    name: ["Plebeu", "Commoner"],
    description:
      "Plebeus são as pessoas comuns encontradas em cidades, vilas e aldeias. Eles não são guerreiros, mas podem lutar para defender seus lares e famílias.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "medium",
    type: "humanoid",
    alignment: "trueNeutral",
    armorClass: 10,
    hitPoints: {
      average: 4,
      formula: { count: 1, faces: 8 },
    },
    speed: {
      walk: 30,
      unit: "ft",
    },
    environment: ["any"],
    abilityScores: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    senses: {
      passivePerception: 10,
    },
    languages: ["common"],
    challengeRating: "0",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Clava",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeWeaponAttack"],
          range: { normal: 5, unit: "ft" },
          target: { type: "creature", quantity: 1 },
          outcomes: [
            {
              id: "commoner-club-damage",
              type: "modifyTargetHP",
              on: "hit",
              formula: {
                type: "damage",
                roll: { count: 1, faces: 4 },
                damageTypeOptions: ["bludgeoning"],
              },
              vitals: ["currentHp"],
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-crab",
    name: ["Caranguejo", "Crab"],
    description:
      "Caranguejos são crustáceos que habitam costas e áreas subaquáticas. Eles usam suas garras para se defender e podem respirar tanto na água quanto no ar.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "tiny",
    type: "beast",
    alignment: "unaligned",
    armorClass: 11,
    hitPoints: {
      average: 3,
      formula: { count: 1, faces: 4, bonus: 1 },
    },
    speed: {
      walk: 20,
      swim: 20,
      unit: "ft",
    },
    environment: ["coast", "underwater"],
    isFamiliar: true,
    abilityScores: {
      strength: 6,
      dexterity: 11,
      constitution: 12,
      intelligence: 1,
      wisdom: 8,
      charisma: 2,
    },
    proficiencyBonus: {
      skills: [{ skill: "stealth", bonus: 2 }],
    },
    senses: {
      passivePerception: 9,
      vision: {
        blindsight: 30,
      },
    },
    challengeRating: "0",
    traits: [
      {
        name: "Anfíbio",
        description: "O caranguejo pode respirar ar e água.",
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
          attackBonus: 2,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                fixed: 1,
                damageTypeOptions: ["bludgeoning"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-crawling-claw",
    name: ["Garra Rastejante", "Crawling Claw"],
    description:
      "Uma mão humana decepada e animada por magia negra. A Garra Rastejante se move por conta própria e obedece cegamente às ordens de seu criador.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "tiny",
    type: "undead",
    alignment: "neutralEvil",
    armorClass: 12,
    hitPoints: {
      average: 2,
      formula: { count: 1, faces: 4 },
    },
    speed: {
      walk: 20,
      climb: 20,
      unit: "ft",
    },
    environment: ["any"],
    abilityScores: {
      strength: 13,
      dexterity: 14,
      constitution: 11,
      intelligence: 5,
      wisdom: 10,
      charisma: 4,
    },
    senses: {
      passivePerception: 10,
      vision: {
        blindsight: 30,
      },
    },
    defenses: {
      immunities: {
        damage: ["necrotic", "poison"],
        condition: [
          "charmed",
          "exhausted",
          "frightened",
          "incapacitated",
          "poisoned",
        ],
      },
    },
    languages: ["common"],
    challengeRating: "0",
    traits: [
      {
        name: "Imunidade a Afastar",
        description: "A garra é imune a efeitos que afastam mortos-vivos.",
      },
      {
        name: "Natureza Incomum",
        description: "A garra não precisa de ar, comida, bebida ou sono.",
      },
      {
        name: "Fala Limitada",
        description: "A garra entende Comum, mas não pode falar.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Pancada",
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
                fixed: 2,
                damageTypeOptions: ["necrotic"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-deer",
    name: ["Cervo", "Deer"],
    description:
      "Cervos são herbívoros graciosos encontrados em fdescstas e campos. Embora geralmente pacíficos, um macho pode usar seus chifres para se defender.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "medium",
    type: "beast",
    alignment: "unaligned",
    armorClass: 13,
    hitPoints: {
      average: 4,
      formula: { count: 1, faces: 8 },
    },
    speed: {
      walk: 50,
      unit: "ft",
    },
    environment: ["forest", "grassland"],
    isFamiliar: true,
    abilityScores: {
      strength: 11,
      dexterity: 16,
      constitution: 11,
      intelligence: 2,
      wisdom: 14,
      charisma: 5,
    },
    proficiencyBonus: {
      skills: [{ skill: "perception", bonus: 4 }],
    },
    senses: {
      passivePerception: 14,
    },
    challengeRating: "0",
    traits: [
      {
        name: "Investida",
        description:
          "Se o cervo se mover pelo menos 6 metros em linha reta em direção a um alvo e então o atingir com um ataque de chifres na mesma rodada, o alvo sofre 2 (1d4) de dano de concussão extra.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Chifres",
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
                roll: { count: 1, faces: 4 },
                damageTypeOptions: ["bludgeoning"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-eagle",
    name: ["Águia", "Eagle"],
    description:
      "Águias são aves de rapina majestosas com visão aguçada. Elas caçam de grandes alturas, mergulhando para capturar presas com suas garras poderosas.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "small",
    type: "beast",
    alignment: "unaligned",
    armorClass: 12,
    hitPoints: {
      average: 4,
      formula: { count: 1, faces: 6, bonus: 1 },
    },
    speed: {
      walk: 10,
      fly: 60,
      unit: "ft",
    },
    environment: ["coast", "grassland", "hill", "mountain"],
    isFamiliar: true,
    abilityScores: {
      strength: 6,
      dexterity: 15,
      constitution: 12,
      intelligence: 2,
      wisdom: 14,
      charisma: 7,
    },
    proficiencyBonus: {
      skills: [{ skill: "perception", bonus: 6 }],
    },
    senses: {
      passivePerception: 16,
    },
    challengeRating: "0",
    traits: [
      {
        name: "Visão Aguçada",
        description:
          "A águia tem vantagem em testes de Sabedoria (Percepção) que dependem da visão.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Garras",
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
    ],
  },
  {
    id: "monster-frog",
    name: ["Sapo", "Frog"],
    description:
      "Sapos são anfíbios comuns encontrados perto da água. Eles são conhecidos por sua capacidade de dar grandes saltos e usar sua língua para capturar presas.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "tiny",
    type: "beast",
    alignment: "unaligned",
    armorClass: 11,
    hitPoints: {
      average: 1,
      formula: { count: 1, faces: 4, bonus: -1 },
    },
    speed: {
      walk: 20,
      swim: 20,
      unit: "ft",
    },
    environment: ["forest", "swamp"],
    isFamiliar: true,
    abilityScores: {
      strength: 1,
      dexterity: 13,
      constitution: 8,
      intelligence: 1,
      wisdom: 8,
      charisma: 3,
    },
    proficiencyBonus: {
      skills: [
        { skill: "perception", bonus: 1 },
        { skill: "stealth", bonus: 3 },
      ],
    },
    senses: {
      passivePerception: 11,
      vision: {
        darkvision: 30,
      },
    },
    challengeRating: "0",
    traits: [
      {
        name: "Anfíbio",
        description: "O sapo pode respirar ar e água.",
      },
      {
        name: "Salto Parado",
        description:
          "O salto em distância do sapo é de até 3 metros e seu salto em altura é de até 1,5 metros, com ou sem um início de corrida.",
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
                fixed: 1,
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-giant-fire-beetle",
    name: ["Besouro de Fogo Gigante", "Giant Fire Beetle"],
    description:
      "Estes besouros de tamanho considerável são encontrados no subterrâneo. Suas glândulas luminescentes emitem um brilho constante, tornando-os valiosos para exploradores.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "small",
    type: "beast",
    alignment: "unaligned",
    armorClass: 13,
    hitPoints: {
      average: 4,
      formula: { count: 1, faces: 6, bonus: 1 },
    },
    speed: {
      walk: 30,
      climb: 30,
      unit: "ft",
    },
    environment: ["underdark"],
    isFamiliar: true,
    abilityScores: {
      strength: 8,
      dexterity: 10,
      constitution: 12,
      intelligence: 1,
      wisdom: 7,
      charisma: 3,
    },
    senses: {
      passivePerception: 8,
      vision: {
        blindsight: 30,
      },
    },
    defenses: {
      resistances: ["fire"],
    },
    challengeRating: "0",
    effects: [
      {
        type: "passive_providesLight",
        name: "Iluminação",
        properties: {
          bright: 10,
          dim: 10,
        },
      },
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Mordida",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 1,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                fixed: 1,
                damageTypeOptions: ["fire"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-goat",
    name: ["Cabra", "Goat"],
    description:
      "Cabras são animais de rebanho teimosos, conhecidos por sua capacidade de escalar terrenos íngremes. Um bode pode dar uma cabeçada poderosa.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "medium",
    type: "beast",
    alignment: "unaligned",
    armorClass: 10,
    hitPoints: {
      average: 4,
      formula: { count: 1, faces: 8 },
    },
    speed: {
      walk: 40,
      climb: 30,
      unit: "ft",
    },
    environment: ["grassland", "hill", "mountain", "urban"],
    isFamiliar: true,
    abilityScores: {
      strength: 11,
      dexterity: 10,
      constitution: 11,
      intelligence: 2,
      wisdom: 10,
      charisma: 5,
    },
    senses: {
      passivePerception: 12,
      vision: {
        darkvision: 60,
      },
    },
    challengeRating: "0",
    traits: [
      {
        name: "Investida",
        description:
          "Se a cabra se mover pelo menos 6 metros em linha reta em direção a um alvo e então o atingir com um ataque de chifres na mesma rodada, o alvo sofre 2 (1d4) de dano de concussão extra.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Chifres",
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
                roll: { count: 1, faces: 4 },
                damageTypeOptions: ["bludgeoning"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-hawk",
    name: ["Falcão", "Hawk"],
    description:
      "Falcões são aves de rapina rápidas e ágeis, com uma visão excepcionalmente aguçada. Eles são caçadores eficientes, frequentemente treinados para falcoaria.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "tiny",
    type: "beast",
    alignment: "unaligned",
    armorClass: 13,
    hitPoints: {
      average: 1,
      formula: { count: 1, faces: 4, bonus: -1 },
    },
    speed: {
      walk: 10,
      fly: 60,
      unit: "ft",
    },
    environment: ["arctic", "coast", "forest", "grassland", "hill", "mountain"],
    isFamiliar: true,
    abilityScores: {
      strength: 5,
      dexterity: 16,
      constitution: 8,
      intelligence: 2,
      wisdom: 14,
      charisma: 6,
    },
    proficiencyBonus: {
      skills: [{ skill: "perception", bonus: 6 }],
    },
    senses: {
      passivePerception: 16,
    },
    challengeRating: "0",
    traits: [
      {
        name: "Visão Aguçada",
        description:
          "O falcão tem vantagem em testes de Sabedoria (Percepção) que dependem da visão.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Garras",
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
                fixed: 1,
                damageTypeOptions: ["slashing"],
              },
            },
          ],
        },
      },
      {
        type: "reaction",
        actionId: "reaction-opportunity-attack",
        name: "Ataque de Oportunidade",
        parameters: {
          activation: { type: "reaction" },
          triggers: {
            events: [
              {
                type: "targetLeftReach",
              },
            ],
          },
        },
      },
    ],
  },
  {
    id: "monster-homunculus",
    name: ["Homúnculo", "Homunculus"],
    description:
      "Um homúnculo é um pequeno construto criado por um mago para servir como assistente, espião ou mensageiro. Ele compartilha um vínculo telepático com seu mestre.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "tiny",
    type: "construct",
    alignment: "trueNeutral",
    armorClass: 13,
    hitPoints: {
      average: 4,
      formula: { count: 1, faces: 4, bonus: 2 },
    },
    speed: {
      walk: 20,
      fly: 40,
      unit: "ft",
    },
    environment: ["any"],
    abilityScores: {
      strength: 4,
      dexterity: 15,
      constitution: 14,
      intelligence: 10,
      wisdom: 10,
      charisma: 7,
    },
    senses: {
      passivePerception: 10,
      vision: {
        darkvision: 60,
      },
    },
    defenses: {
      immunities: {
        damage: ["poison"],
        condition: ["charmed", "poisoned"],
      },
    },
    languages: ["common", "other"],
    challengeRating: "0",
    traits: [
      {
        name: "Vínculo Telepático",
        description:
          "Enquanto o homúnculo está no mesmo plano de existência que seu mestre, os dois podem se comunicar telepaticamente um com o outro.",
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
                fixed: 1,
                damageTypeOptions: ["piercing"],
              },
            },
            {
              on: "hit",
              type: "applyCondition",
              condition: "poisoned",
              duration: {
                unit: "round",
                value: 1,
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-hyena",
    name: ["Hiena", "Hyena"],
    description:
      "Hienas são carniceiros que caçam em matilhas. Elas são conhecidas por suas 'risadas' distintas e por sua tática de cercar e sobrepujar suas presas.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "medium",
    type: "beast",
    alignment: "unaligned",
    armorClass: 11,
    hitPoints: {
      average: 5,
      formula: { count: 1, faces: 8, bonus: 1 },
    },
    speed: {
      walk: 50,
      unit: "ft",
    },
    environment: ["desert", "forest", "grassland", "hill"],
    isFamiliar: true,
    abilityScores: {
      strength: 11,
      dexterity: 13,
      constitution: 12,
      intelligence: 2,
      wisdom: 12,
      charisma: 5,
    },
    proficiencyBonus: {
      skills: [{ skill: "perception", bonus: 3 }],
    },
    senses: {
      passivePerception: 13,
      vision: {
        darkvision: 60,
      },
    },
    challengeRating: "0",
    effects: [
      {
        type: "passive_grantAdvantage",
        name: "Táticas de Matilha",
        on: "attackRoll",
        triggers: {
          events: [
            {
              type: "hasAllyNearby",
              allyIsNotIncapacitated: true,
              range: { normal: 5, unit: "ft" },
            },
          ],
        },
      },
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
                roll: { count: 1, faces: 6 },
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-jackal",
    name: ["Chacal", "Jackal"],
    description:
      "Chacais são canídeos carniceiros encontrados em desertos e pastagens. Eles são conhecidos por sua astúcia e por caçar em pequenos grupos.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "small",
    type: "beast",
    alignment: "unaligned",
    armorClass: 12,
    hitPoints: {
      average: 3,
      formula: { count: 1, faces: 6 },
    },
    speed: {
      walk: 40,
      unit: "ft",
    },
    environment: ["desert", "grassland"],
    isFamiliar: true,
    abilityScores: {
      strength: 8,
      dexterity: 15,
      constitution: 11,
      intelligence: 3,
      wisdom: 12,
      charisma: 6,
    },
    proficiencyBonus: {
      skills: [
        { skill: "perception", bonus: 5 },
        { skill: "stealth", bonus: 4 },
      ],
    },
    senses: {
      passivePerception: 15,
      vision: {
        darkvision: 90,
      },
    },
    challengeRating: "0",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Mordida",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 1,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 4, bonus: -1 },
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-larva",
    name: ["Larva", "Larva"],
    description:
      "Larvas são as formas atormentadas e descarnadas das almas de mortais malignos. Elas infestam os planos inferiores e são consumidas por demônios maiores.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "medium",
    type: "fiend",
    alignment: "neutralEvil",
    armorClass: 9,
    hitPoints: {
      average: 9,
      formula: { count: 2, faces: 8 },
    },
    speed: {
      walk: 20,
      unit: "ft",
    },
    environment: ["any"],
    abilityScores: {
      strength: 9,
      dexterity: 9,
      constitution: 10,
      intelligence: 6,
      wisdom: 10,
      charisma: 2,
    },
    senses: {
      passivePerception: 10,
      vision: {
        darkvision: 60,
      },
    },
    languages: ["common", "other"],
    challengeRating: "0",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Mordida",
        parameters: {
          activation: { type: "action" },
          attackType: ["meleeNaturalAttack"],
          attackBonus: 1,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 4, bonus: -1 },
                damageTypeOptions: ["necrotic"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-lemure",
    name: ["Lêmure", "Lemure"],
    description:
      "Lêmures são as formas mais baixas de diabos, bolhas de carne derretida com um torso e cabeça vagamente humanoides. Eles são servos irracionais nos Nove Infernos.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "medium",
    type: "fiend",
    alignment: "lawfulEvil",
    armorClass: 9,
    hitPoints: {
      average: 9,
      formula: { count: 2, faces: 8 },
    },
    speed: {
      walk: 20,
      unit: "ft",
    },
    environment: ["any"],
    abilityScores: {
      strength: 10,
      dexterity: 5,
      constitution: 11,
      intelligence: 1,
      wisdom: 11,
      charisma: 3,
    },
    senses: {
      passivePerception: 10,
      vision: {
        darkvision: 120,
      },
    },
    defenses: {
      resistances: ["cold"],
      immunities: {
        damage: ["fire", "poison"],
        condition: ["charmed", "frightened", "poisoned"],
      },
    },
    languages: ["infernal", "other"],
    challengeRating: "0",
    traits: [
      {
        name: "Rejuvenescimento Infernal",
        description:
          "Se o lêmure morrer nos Nove Infernos, ele retorna à vida com todos os seus pontos de vida em 1d10 dias, a menos que seja morto por uma criatura de alinhamento bom com uma magia de bênção lançada sobre ela ou seus restos mortais sejam aspergidos com água benta.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Limo Vil",
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
                roll: { count: 1, faces: 4 },
                damageTypeOptions: ["poison"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-lizard",
    name: ["Lagarto", "Lizard"],
    description:
      "Lagartos são répteis comuns encontrados em muitos ambientes. A maioria é inofensiva, mas alguns podem morder se provocados. Eles são excelentes escaladores.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "tiny",
    type: "beast",
    alignment: "unaligned",
    armorClass: 10,
    hitPoints: {
      average: 2,
      formula: { count: 1, faces: 4 },
    },
    speed: {
      walk: 20,
      climb: 20,
      unit: "ft",
    },
    environment: ["coast", "desert", "forest", "swamp", "underdark"],
    isFamiliar: true,
    abilityScores: {
      strength: 2,
      dexterity: 11,
      constitution: 10,
      intelligence: 1,
      wisdom: 8,
      charisma: 3,
    },
    senses: {
      passivePerception: 9,
      vision: {
        darkvision: 30,
      },
    },
    challengeRating: "0",
    traits: [
      {
        name: "Escalada de Aranha",
        description:
          "O lagarto pode escalar superfícies difíceis, incluindo de cabeça para baixo em tetos, sem precisar fazer um teste de habilidade.",
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
          attackBonus: 1,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                fixed: 1,
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-myconid-sprout",
    name: ["Brote de Miconídeo", "Myconid Sprout"],
    description:
      "Brotes de miconídeos são os membros mais jovens de uma colônia de miconídeos. Eles são tímidos e se comunicam através de esporos telepáticos.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "small",
    type: "plant",
    alignment: "lawfulNeutral",
    armorClass: 10,
    hitPoints: {
      average: 3,
      formula: { count: 1, faces: 6 },
    },
    speed: {
      walk: 10,
      unit: "ft",
    },
    environment: ["underdark"],
    abilityScores: {
      strength: 8,
      dexterity: 10,
      constitution: 10,
      intelligence: 8,
      wisdom: 11,
      charisma: 5,
    },
    senses: {
      passivePerception: 10,
      vision: {
        darkvision: 120,
      },
    },
    languages: ["other"],
    challengeRating: "0",
    traits: [
      {
        name: "Doença do Sol",
        description:
          "Enquanto estiver sob a luz do sol, o miconídeo tem desvantagem em testes de habilidade e rolagens de ataque. O miconídeo morre se passar mais de 1 hora sob a luz direta do sol.",
      },
      {
        name: "Esporos de Rapport",
        description:
          "O miconídeo expeli esporos em uma emanação de 30 pés que se origina dele. Criaturas nessa área com uma pontuação de Inteligência de 2 ou mais que não sejam Construtos, Elementais ou Mortos-Vivos ganham telepatia com um alcance de 30 pés por 1 hora.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Pancada",
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
                roll: { count: 1, faces: 4, bonus: -1 },
                damageTypeOptions: ["bludgeoning"],
              },
            },
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 4 },
                damageTypeOptions: ["poison"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-octopus",
    name: ["Polvo", "Octopus"],
    description:
      "Polvos são moluscos inteligentes conhecidos por sua capacidade de se camuflar e soltar uma nuvem de tinta para escapar de predadores.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "small",
    type: "beast",
    alignment: "unaligned",
    armorClass: 12,
    hitPoints: {
      average: 3,
      formula: { count: 1, faces: 6 },
    },
    speed: {
      walk: 5,
      swim: 30,
      unit: "ft",
    },
    environment: ["underwater"],
    isFamiliar: true,
    abilityScores: {
      strength: 4,
      dexterity: 15,
      constitution: 11,
      intelligence: 3,
      wisdom: 10,
      charisma: 4,
    },
    proficiencyBonus: {
      skills: [
        { skill: "perception", bonus: 2 },
        { skill: "stealth", bonus: 6 },
      ],
    },
    senses: {
      passivePerception: 12,
      vision: {
        darkvision: 30,
      },
    },
    challengeRating: "0",
    traits: [
      {
        name: "Segurar a Respiração",
        description: "O polvo pode prender a respiração por 30 minutos.",
      },
      {
        name: "Camuflagem Subaquática",
        description:
          "O polvo tem vantagem em testes de Destreza (Furtividade) feitos debaixo d'água.",
      },
      {
        name: "Respiração Aquática",
        description: "O polvo só pode respirar debaixo d'água.",
      },
      {
        name: "Compressão",
        description:
          "O polvo pode se mover através de um espaço tão estreito quanto 1 polegada sem gastar movimento extra para fazê-lo.",
      },
      {
        name: "Nuvem de Tinta (1/Dia)",
        description:
          "Uma criatura termina seu turno a 5 pés do polvo enquanto está debaixo d'água. Resposta: O polvo libera tinta que preenche um Cubo de 5 pés centrado nele, e o polvo se move até sua Velocidade de Natação. O Cubo é Fortemente Obscurecido por 1 minuto ou até que uma corrente forte ou efeito semelhante disperse a tinta.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Tentáculos",
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
                fixed: 1,
                damageTypeOptions: ["bludgeoning"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-owl",
    name: ["Coruja", "Owl"],
    description:
      "Corujas são caçadoras noturnas com audição e visão excepcionais. Elas voam silenciosamente e podem girar a cabeça quase que completamente.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "tiny",
    type: "beast",
    alignment: "unaligned",
    armorClass: 11,
    hitPoints: {
      average: 1,
      formula: { count: 1, faces: 4, bonus: -1 },
    },
    speed: {
      walk: 5,
      fly: 60,
      unit: "ft",
    },
    environment: ["arctic", "forest", "hill"],
    isFamiliar: true,
    abilityScores: {
      strength: 3,
      dexterity: 13,
      constitution: 8,
      intelligence: 2,
      wisdom: 12,
      charisma: 7,
    },
    proficiencyBonus: {
      skills: [
        { skill: "perception", bonus: 5 },
        { skill: "stealth", bonus: 5 },
      ],
    },
    senses: {
      passivePerception: 15,
      vision: {
        darkvision: 120,
      },
    },
    challengeRating: "0",
    traits: [
      {
        name: "Voo Rápido",
        description:
          "A coruja não provoca ataques de oportunidade quando voa para fora do alcance de um inimigo.",
      },
      {
        name: "Audição e Visão Aguçadas",
        description:
          "A coruja tem vantagem em testes de Sabedoria (Percepção) que dependem da audição ou da visão.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Garras",
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
                fixed: 1,
                damageTypeOptions: ["slashing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-piranha",
    name: ["Piranha", "Piranha"],
    description:
      "Piranhas são peixes carnívoros de água doce, conhecidos por seus dentes afiados e apetite voraz. Elas entram em frenesi ao cheiro de sangue.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "tiny",
    type: "beast",
    alignment: "unaligned",
    armorClass: 13,
    hitPoints: {
      average: 1,
      formula: { count: 1, faces: 4, bonus: -1 },
    },
    speed: {
      walk: 5,
      swim: 40,
      unit: "ft",
    },
    environment: ["underwater"],
    isFamiliar: true,
    abilityScores: {
      strength: 2,
      dexterity: 16,
      constitution: 9,
      intelligence: 1,
      wisdom: 7,
      charisma: 2,
    },
    senses: {
      passivePerception: 8,
      vision: {
        darkvision: 60,
      },
    },
    challengeRating: "0",
    traits: [
      {
        name: "Frenesi de Sangue",
        description:
          "A piranha tem vantagem nas rolagens de ataque corpo a corpo contra qualquer criatura que não tenha todos os seus pontos de vida.",
      },
      {
        name: "Respiração Aquática",
        description: "A piranha só pode respirar debaixo d'água.",
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
          attackBonus: 5,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                fixed: 1,
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-rat",
    name: ["Rato", "Rat"],
    description:
      "Ratos são roedores onipresentes, frequentemente encontrados em esgotos e porões. Eles são conhecidos por sua capacidade de sobreviver e se multiplicar rapidamente.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "tiny",
    type: "beast",
    alignment: "unaligned",
    armorClass: 10,
    hitPoints: {
      average: 1,
      formula: { count: 1, faces: 4, bonus: -1 },
    },
    speed: {
      walk: 20,
      climb: 20,
      unit: "ft",
    },
    environment: ["forest", "swamp", "underdark", "urban"],
    isFamiliar: true,
    abilityScores: {
      strength: 2,
      dexterity: 11,
      constitution: 9,
      intelligence: 2,
      wisdom: 10,
      charisma: 4,
    },
    proficiencyBonus: {
      skills: [{ skill: "perception", bonus: 2 }],
    },
    senses: {
      passivePerception: 12,
      vision: {
        darkvision: 30,
      },
    },
    challengeRating: "0",
    traits: [
      {
        name: "Olfato Aguçado",
        description:
          "O rato tem vantagem em testes de Sabedoria (Percepção) que dependem do olfato.",
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
          attackBonus: 2,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                fixed: 1,
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-raven",
    name: ["Corvo", "Raven"],
    description:
      "Corvos são pássaros inteligentes e misteriosos, muitas vezes associados a presságios e magia. Eles são capazes de imitar sons que ouvem.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "tiny",
    type: "beast",
    alignment: "unaligned",
    armorClass: 12,
    hitPoints: {
      average: 2,
      formula: { count: 1, faces: 4 },
    },
    speed: {
      walk: 10,
      fly: 50,
      unit: "ft",
    },
    environment: ["hill", "swamp", "urban"],
    isFamiliar: true,
    abilityScores: {
      strength: 2,
      dexterity: 14,
      constitution: 10,
      intelligence: 5,
      wisdom: 13,
      charisma: 6,
    },
    proficiencyBonus: {
      skills: [{ skill: "perception", bonus: 3 }],
    },
    senses: {
      passivePerception: 13,
    },
    challengeRating: "0",
    traits: [
      {
        name: "Mimetismo",
        description:
          "O corvo pode imitar sons simples que ouviu, como uma pessoa sussurrando, um bebê chorando ou um animal chilreando. Uma criatura que ouve os sons pode dizer que são imitações com um teste bem-sucedido de Sabedoria (Intuição) CD 10.",
      },
    ],
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Bico",
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
                fixed: 1,
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-scorpion",
    name: ["Escorpião", "Scorpion"],
    description:
      "Escorpiões são aracnídeos venenosos encontrados em desertos e outras regiões áridas. Eles usam seu ferrão na cauda para injetar veneno em suas presas.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "tiny",
    type: "beast",
    alignment: "unaligned",
    armorClass: 11,
    hitPoints: {
      average: 1,
      formula: { count: 1, faces: 4, bonus: -1 },
    },
    speed: {
      walk: 10,
      unit: "ft",
    },
    environment: ["desert"],
    isFamiliar: true,
    abilityScores: {
      strength: 2,
      dexterity: 11,
      constitution: 8,
      intelligence: 1,
      wisdom: 8,
      charisma: 2,
    },
    senses: {
      passivePerception: 9,
      vision: {
        blindsight: 10,
      },
    },
    challengeRating: "0",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Ferrão",
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
                fixed: 1,
                damageTypeOptions: ["piercing"],
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
    id: "monster-seahorse",
    name: ["Cavalo-Marinho", "Seahorse"],
    description:
      "Cavalos-marinhos são pequenos peixes encontrados em águas rasas. Eles são conhecidos por sua aparência única e por nadarem na vertical.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "tiny",
    type: "beast",
    alignment: "unaligned",
    armorClass: 12,
    hitPoints: {
      average: 1,
      formula: { count: 1, faces: 4, bonus: -1 },
    },
    speed: {
      walk: 5,
      swim: 20,
      unit: "ft",
    },
    environment: ["underwater"],
    isFamiliar: true,
    abilityScores: {
      strength: 1,
      dexterity: 12,
      constitution: 8,
      intelligence: 1,
      wisdom: 10,
      charisma: 2,
    },
    proficiencyBonus: {
      skills: [
        { skill: "perception", bonus: 2 },
        { skill: "stealth", bonus: 5 },
      ],
    },
    senses: {
      passivePerception: 12,
    },
    challengeRating: "0",
    traits: [
      {
        name: "Respiração Aquática",
        description: "O cavalo-marinho só pode respirar debaixo d'água.",
      },
    ],
    effects: [],
  },
  {
    id: "monster-shrieker-fungus",
    name: ["Fungo Berrador", "Shrieker Fungus"],
    description:
      "Este fungo subterrâneo emite um grito agudo quando detecta luz ou movimento próximo, alertando outras criaturas da presença de intrusos.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "medium",
    type: "plant",
    alignment: "unaligned",
    armorClass: 5,
    hitPoints: {
      average: 13,
      formula: { count: 3, faces: 8 },
    },
    speed: {
      walk: 5,
      unit: "ft",
    },
    environment: ["underdark"],
    abilityScores: {
      strength: 1,
      dexterity: 1,
      constitution: 10,
      intelligence: 1,
      wisdom: 3,
      charisma: 1,
    },
    senses: {
      passivePerception: 6,
      vision: {
        blindsight: 30,
      },
    },
    defenses: {
      immunities: {
        condition: ["blinded", "charmed", "deafened", "frightened"],
      },
    },
    challengeRating: "0",
    traits: [
      {
        name: "Aparência Falsa",
        description:
          "Enquanto o fungo berrador permanece imóvel, ele é indistinguível de um fungo comum.",
      },
    ],
    effects: [],
  },
  {
    id: "monster-spider",
    name: ["Aranha", "Spider"],
    description:
      "Aranhas são predadoras de oito patas que tecem teias para capturar suas presas. A maioria é pequena e inofensiva, mas algumas podem ter uma mordida venenosa.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "tiny",
    type: "beast",
    alignment: "unaligned",
    armorClass: 12,
    hitPoints: {
      average: 1,
      formula: { count: 1, faces: 4, bonus: -1 },
    },
    speed: {
      walk: 20,
      climb: 20,
      unit: "ft",
    },
    environment: ["desert", "forest", "swamp", "underdark", "urban"],
    isFamiliar: true,
    abilityScores: {
      strength: 2,
      dexterity: 14,
      constitution: 8,
      intelligence: 1,
      wisdom: 10,
      charisma: 2,
    },
    proficiencyBonus: {
      skills: [{ skill: "stealth", bonus: 4 }],
    },
    senses: {
      passivePerception: 10,
      vision: {
        darkvision: 30,
      },
    },
    challengeRating: "0",
    traits: [
      {
        name: "Escalada de Aranha",
        description:
          "A aranha pode escalar superfícies difíceis, incluindo de cabeça para baixo em tetos, sem precisar fazer um teste de habilidade.",
      },
      {
        name: "Sentido na Teia",
        description:
          "Enquanto em contato com uma teia, a aranha sabe a localização exata de qualquer outra criatura em contato com a mesma teia.",
      },
      {
        name: "Andarilho da Teia",
        description:
          "A aranha ignora as restrições de movimento causadas por teias.",
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
          attackBonus: 2,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                fixed: 1,
                damageTypeOptions: ["piercing"],
              },
            },
            {
              on: "hit",
              type: "applyCondition",
              condition: "poisoned",
              duration: {
                unit: "round",
                value: 1,
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-vulture",
    name: ["Abutre", "Vulture"],
    description:
      "Abutres são aves carniceiras que sobrevoam desertos e campos de batalha em busca de carcaças. Eles usam seu bico afiado para rasgar a carne.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "medium",
    type: "beast",
    alignment: "unaligned",
    armorClass: 10,
    hitPoints: {
      average: 5,
      formula: { count: 1, faces: 8, bonus: 1 },
    },
    speed: {
      walk: 10,
      fly: 50,
      unit: "ft",
    },
    environment: ["desert", "grassland", "hill"],
    isFamiliar: true,
    abilityScores: {
      strength: 7,
      dexterity: 10,
      constitution: 13,
      intelligence: 2,
      wisdom: 12,
      charisma: 4,
    },
    proficiencyBonus: {
      skills: [{ skill: "perception", bonus: 3 }],
    },
    senses: {
      passivePerception: 13,
    },
    challengeRating: "0",
    traits: [
      {
        name: "Visão e Olfato Aguçados",
        description:
          "O abutre tem vantagem em testes de Sabedoria (Percepção) que dependem da visão ou do olfato.",
      },
    ],
    effects: [
      {
        type: "passive_grantAdvantage",
        name: "Táticas de Matilha",
        on: "attackRoll",
        triggers: {
          events: [
            {
              type: "hasAllyNearby",
              allyIsNotIncapacitated: true,
              range: { normal: 5, unit: "ft" },
            },
          ],
        },
      },
      {
        type: "activatableAction",
        actionId: "action-attack",
        name: "Bico",
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
                roll: { count: 1, faces: 4 },
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "monster-weasel",
    name: ["Doninha", "Weasel"],
    description:
      "Doninhas são predadores pequenos, rápidos e furtivos. Elas são conhecidas por sua agilidade e por sua capacidade de caçar presas maiores que elas.",
    tokenUrl: "https://i.imgur.com/TtwflB2.png",
    splashArtUrl: "https://i.imgur.com/MW6e0c1.png",
    source: "MM2024",
    size: "tiny",
    type: "beast",
    alignment: "unaligned",
    armorClass: 13,
    hitPoints: {
      average: 1,
      formula: { count: 1, faces: 4, bonus: -1 },
    },
    speed: {
      walk: 30,
      climb: 30,
      unit: "ft",
    },
    environment: ["forest", "grassland", "hill"],
    isFamiliar: true,
    abilityScores: {
      strength: 3,
      dexterity: 16,
      constitution: 8,
      intelligence: 2,
      wisdom: 12,
      charisma: 3,
    },
    proficiencyBonus: {
      skills: [
        { skill: "acrobatics", bonus: 5 },
        { skill: "perception", bonus: 3 },
        { skill: "stealth", bonus: 5 },
      ],
    },
    senses: {
      passivePerception: 13,
      vision: {
        darkvision: 60,
      },
    },
    challengeRating: "0",
    traits: [
      {
        name: "Audição e Olfato Aguçados",
        description:
          "A doninha tem vantagem em testes de Sabedoria (Percepção) que dependem da audição ou do olfato.",
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
          attackBonus: 2,
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                fixed: 1,
                damageTypeOptions: ["piercing"],
              },
            },
          ],
        },
      },
    ],
  },
];
