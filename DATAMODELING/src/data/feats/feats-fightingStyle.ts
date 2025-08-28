import { Feat } from "../../domain/feat/feat.schema.js";

export const feats: Feat[] = [
  {
    name: ["Arquearia", "Archery"],
    source: "LDJ2024",
    category: "fightingStyle",
    id: "feat-archery",
    description:
      "Você é um especialista em combate à distância, capaz de fazer tiros precisos com armas de longo alcance.",
    repeatable: {
      canBeRepeated: false,
    },
    effects: [
      {
        type: "passive_grantBonus",
        on: "attackRoll",
        name: "Bônus de Arquearia",
        value: 2,
        appliesToAttackType: {
          range: "ranged",
          source: "weapon",
          handsInUse: "any",
        },
        description:
          "Você ganha um bônus de +2 em testes de ataque que você faz com armas à distância.",
      },
    ],
  },
  {
    name: ["Guerreiro Abençoado", "Blessed Warrior"],
    description:
      "Você é um guerreiro abençoado, capaz de canalizar a energia divina em combate.",
    id: "feat-blessed-warrior",
    repeatable: {
      canBeRepeated: false,
    },
    source: "LDJ2024",
    category: "fightingStyle",
    requirements: {
      user: {
        conditionMode: "all",
        events: [
          {
            type: "hasLevel",
            value: 2,
            comparison: "greaterOrEqual",
          },
          {
            type: "hasClass",
            class: "paladin",
          },
        ],
      },
    },
    effects: [
      {
        type: "passive_grantSpellKnowledge",
        amount: 2,
        filter: {
          level: 0,
          class: "cleric",
        },
        canBeSwappedOn: "levelUp",
        name: "Truques de Clérigo",
        castingAbilityOptions: ["charisma"],
        description:
          "Você aprende dois truques de Clérigo de sua escolha. Os truques escolhidos contam como feitiços de Paladino para você, e Carisma é sua habilidade de conjuração para eles. Sempre que você ganha um nível de Paladino, pode substituir um desses truques por outro cantrip de Clérigo.",
      },
    ],
  },
  {
    id: "feat-blindsight",
    repeatable: {
      canBeRepeated: false,
    },
    name: ["Sentido as Cegas", "Blindsight"],
    source: "LDJ2024",
    category: "fightingStyle",
    description:
      "Você ganha a capacidade de ver no escuro como se estivesse em plena luz do dia.",
    effects: [
      {
        type: "passive_providesVision",
        name: "Sentido as Cegas",
        vision: "blindsight",
        range: {
          normal: 10,
          unit: "ft",
        },
      },
    ],
  },
  {
    id: "feat-defense",
    name: ["Defensivo", "Defense"],
    description:
      "Enquanto estiver vestindo armadura leve, média ou pesada, você recebe +1 na Classe de Armadura.",
    source: "LDJ2024",
    category: "fightingStyle",
    repeatable: {
      canBeRepeated: false,
    },
    effects: [
      {
        type: "passive_grantBonus",
        on: "ac",
        name: "Defensivo",
        appliesToArmor: ["light", "medium", "heavy"],
        value: 1,
      },
    ],
  },
  {
    id: "feat-druidic-warrior",
    name: ["Guerreiro Druídico", "Druidic Warrior"],
    description:
      "Você aprende dois truques de Druida à sua escolha, que contam como magias de Patrulheiro para você.",
    source: "LDJ2024",
    repeatable: {
      canBeRepeated: false,
    },
    category: "fightingStyle",
    requirements: {
      user: {
        events: [
          {
            type: "hasLevel",
            value: 2,
            comparison: "greaterOrEqual",
          },
        ],
      },
    },
    effects: [
      {
        type: "passive_grantSpellKnowledge",
        amount: 2,
        filter: {
          level: 0,
          class: "druid",
        },
        canBeSwappedOn: "levelUp",
        name: "Truques de Druida",
        castingAbilityOptions: ["wisdom"],
        description:
          "Você aprende dois truques de Druida de sua escolha. Os truques escolhidos contam como feitiços de Patrulheiro para você, e Sabedoria é sua habilidade de conjuração para eles. Sempre que você ganha um nível de Patrulheiro, pode substituir um desses truques por outro cantrip de Druida.",
      },
    ],
  },
  {
    id: "feat-dueling",
    name: ["Duelista", "Dueling"],
    description:
      "Quando estiver empunhando uma arma corpo a corpo em uma mão e nenhuma outra arma, você recebe +2 nas rolagens de dano com essa arma.",
    source: "LDJ2024",
    category: "fightingStyle",
    repeatable: {
      canBeRepeated: false,
    },
    effects: [
      {
        type: "passive_grantBonus",
        on: "damageRoll",
        name: "Bônus de Duelismo",
        value: 2,
        appliesToAttackType: {
          range: "melee",
          source: "weapon",
          handsInUse: "one",
        },
        description:
          "Quando você está segurando uma arma corpo a corpo em uma mão e nenhuma outra arma, você ganha um bônus de +2 nas rolagens de dano com essa arma.",
      },
    ],
  },
  {
    id: "feat-great-weapon-fighting",
    name: ["Lutador com Arma Pesada", "Great Weapon Fighting"],
    description:
      "Quando rolar 1 ou 2 no dado de dano de uma arma pesada, pode rolar novamente e usar o novo resultado.",
    source: "LDJ2024",
    category: "fightingStyle",
    repeatable: { canBeRepeated: false },
    effects: [],
    traits: [
      {
        name: "Dano Mínimo com Arma Pesada",
        description:
          "Quando você rola o dano de um ataque feito com uma arma corpo a corpo empunhada com as duas mãos, pode tratar qualquer resultado 1 ou 2 em um dado de dano como 3. A arma deve ter a propriedade Duas Mãos ou Versátil para receber esse benefício.",
      },
    ],
  },
  {
    id: "feat-interception",
    name: ["Intercepção", "Interception"],
    description:
      "Você pode usar sua reação para reduzir o dano que um aliado próximo sofre ao ser atacado.",
    source: "LDJ2024",
    category: "fightingStyle",
    repeatable: { canBeRepeated: false },
    effects: [],
    traits: [
      {
        name: "Intercepção Defensiva",
        description:
          "Quando uma criatura que você possa ver acerta outra criatura a até 1,5 metro de você com um ataque, você pode usar sua Reação para reduzir o dano causado ao alvo em 1d10 + seu bônus de proficiência. Você deve estar segurando um escudo ou uma arma simples ou marcial para usar essa Reação.",
      },
    ],
  },
  {
    id: "feat-protection",
    name: ["Proteção", "Protection"],
    description:
      "Você pode usar seu escudo para impor desvantagem em ataques contra aliados próximos.",
    source: "LDJ2024",
    category: "fightingStyle",
    repeatable: { canBeRepeated: false },
    effects: [],
    traits: [
      {
        name: "Proteção com Escudo",
        description:
          "Quando uma criatura que você possa ver atacar um alvo que não seja você e que esteja a até 1,5 metro de você, você pode usar sua Reação para interpor seu escudo, se estiver segurando um. Você impõe desvantagem na rolagem de ataque que desencadeou a reação e em todas as outras rolagens de ataque contra o alvo até o início do seu próximo turno, se permanecer a até 1,5 metro dele.",
      },
    ],
  },
  {
    id: "feat-thrown-weapon-fighting",
    name: ["Combate com Armas Arremessadas", "Thrown Weapon Fighting"],
    description:
      "Você é especialista em usar armas arremessadas, causando mais dano e sacando rapidamente.",
    source: "LDJ2024",
    category: "fightingStyle",
    repeatable: { canBeRepeated: false },
    effects: [],
    traits: [
      {
        name: "Dano Aprimorado com Arma Arremessada",
        description:
          "Quando você acerta um ataque à distância usando uma arma com a propriedade Arremesso, você recebe +2 de bônus na rolagem de dano.",
      },
    ],
  },
  {
    name: ["luta com Duas Armas", "Two-Weapon Fighting"],
    id: "feat-luta-com-duas-armas",
    repeatable: {
      canBeRepeated: false,
    },
    description: "Você se torna mais eficaz em combate com duas armas.",
    source: "LDJ2024",
    category: "fightingStyle",
    effects: [
      {
        type: "passive_grantBonus",
        on: "damageRoll",
        name: "Luta com Duas Armas",
        value: "abilityModifier",
        requirements: {
          user: {
            events: [
              {
                type: "madeAttackRoll",
                weaponProperty: "light",
                actionType: "bonus",
              },
            ],
          },
        },
        description:
          "Quando você fizer um ataque extra usando sua Ação Bônus com uma arma que tenha a propriedade Leve, você pode adicionar seu modificador de habilidade ao dano desse ataque, caso ainda não esteja adicionando esse modificador de outra forma.",
      },
    ],
  },
  {
    id: "feat-unarmed-fighting",
    name: ["Combate Desarmado", "Unarmed Fighting"],
    description:
      "Você causa mais dano com ataques desarmados e pode agarrar com mais eficiência.",
    source: "LDJ2024",
    category: "fightingStyle",
    repeatable: { canBeRepeated: false },
    effects: [],
    traits: [
      {
        name: "Dano Aprimorado Desarmado",
        description:
          "Quando você acerta com um ataque desarmado e causa dano, pode causar dano de contusão igual a 1d6 + seu modificador de Força em vez do dano normal de um ataque desarmado. Se não estiver segurando armas ou escudo ao fazer o ataque, o d6 se torna um d8.",
      },
      {
        name: "Dano em Oponente Agarrado",
        description:
          "No início de cada um dos seus turnos, você pode causar 1d4 de dano de contusão a uma criatura agarrada por você.",
      },
    ],
  },
];
