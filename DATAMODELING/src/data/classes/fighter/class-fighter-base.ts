import { Class } from "../../../domain/class/class.schema";

export const classes = [
  {
    id: "class-fighter",
    name: ["Fighter", "Guerreiro"],
    source: "LDJ2024",
    primaryAbilities: { choose: { from: ["strength", "dexterity"], count: 1 } },
    description:
      "O Guerreiro é um mestre do combate, capaz de enfrentar qualquer desafio com força bruta e habilidade marcial.",
    initialHitPoints: {
      count: 1,
      faces: 10,
    },
    effects: [
      {
        type: "passive_grantProficiency",
        on: "savingThrow",
        choose: { from: ["strength", "constitution"], count: "all" },
        name: "Proficiência em Testes de Resistência",
      },
      {
        type: "passive_grantProficiency",
        on: "skill",
        choose: {
          from: [
            "acrobatics",
            "animalHandling",
            "athletics",
            "history",
            "insight",
            "intimidation",
            "perception",
            "survival",
          ],
          count: 2,
        },
        name: "Proficiência em Perícias",
      },
      {
        type: "passive_grantProficiency",
        on: "armorType",
        choose: { from: ["light", "medium", "heavy", "shield"], count: "all" },
        name: "Proficiência em Armaduras",
      },
      {
        type: "passive_grantProficiency",
        on: "weaponType",
        choose: { from: ["simple", "martial"], count: "all" },
        name: "Proficiência em Armas",
      },
    ],
    classResources: {
      class: "fighter",
      classResourceIds: ["resource-secondWind"],
    },
    startingEquipment: [
      {
        type: "choice",
        count: 1,
        choices: [
          {
            id: "starting_equipment_A",
            contents: [
              { type: "item", id: "armor-cota-de-malha", quantity: 1 },
              { type: "item", id: "weapon-espada-grande", quantity: 1 },
              { type: "item", id: "weapon-mangual", quantity: 1 },
              { type: "item", id: "weapon-azagaia", quantity: 8 },
              { type: "item", id: "gear-mochila", quantity: 1 },
              { type: "currency", amount: 4, unit: "gold" },
            ],
          },
          {
            id: "starting_equipment_B",
            contents: [
              {
                type: "item",
                id: "armor-armadura-de-couro-batido",
                quantity: 1,
              },
              { type: "item", id: "weapon-cimitarra", quantity: 1 },
              { type: "item", id: "weapon-espada-curta", quantity: 1 },
              { type: "item", id: "weapon-arco-longo", quantity: 1 },
              { type: "item", id: "gear-pouch", quantity: 1 },
              { type: "item", id: "gear-mochila", quantity: 1 },
              { type: "currency", amount: 11, unit: "gold" },
            ],
          },
          {
            id: "starting_gold",
            contents: [{ type: "currency", amount: 155, unit: "gold" }],
          },
        ],
      },
    ],
    multiclassingBenefits: [
      {
        type: "passive_grantProficiency",
        on: "weaponType",
        choose: { from: ["martial"], count: "all" },
        name: "Proficiência em Armas Marciais",
      },
      {
        type: "passive_grantProficiency",
        on: "armorType",
        choose: { from: ["light", "medium", "shield"], count: "all" },
        name: "Proficiência em Armaduras",
      },
    ],
    multiclassingRequirements: {
      user: {
        conditionMode: "any",
        events: [
          {
            type: "hasAttribute",
            attribute: "strength",
            comparison: "greaterOrEqual",
            value: 13,
          },
          {
            type: "hasAttribute",
            attribute: "dexterity",
            comparison: "greaterOrEqual",
            value: 13,
          },
        ],
      },
    },
    classProgression: {
      class: "fighter",
      progression: [
        {
          level: 1,
          secondWind: 2,
          features: [
            /* Estilo de Luta */
            {
              type: "passive_providesFeat",
              selection: {
                mode: "category",
                source: ["fightingStyle"],
                count: 1,
              },
              name: "Estilo de Luta",
              description: "Escolha um estilo de luta para se especializar.",
            },
            /* Retomar Fôlego */
            {
              type: "activatableAction",
              name: "Retomar Fôlego",
              actionId: "bonus-cast-spell",
              parameters: {
                activation: {
                  type: "bonus",
                  extraCost: {
                    resourceType: "charge",
                    amount: 1,
                    resourceId: "secondWind",
                    source: "character",
                  },
                },
                target: { type: "self" },
                charges: {
                  type: "event",
                  rechargeOn: "shortRest",
                  maxCharges: 1,
                  recoveryAmount: 1,
                },
                outcomes: [
                  {
                    id: "secondWind",
                    type: "modifyTargetHP",
                    on: "any",
                    vitals: ["currentHp"],
                    formula: {
                      type: "healing",
                      roll: {
                        count: 1,
                        faces: 10,
                        bonus: { variable: "level" },
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
        {
          level: 2,
          secondWind: 2,
          features: [
            /* Surto de Ação */
            {
              type: "activatableAction",
              name: "Surto de Ação",
              description:
                "Você pode ultrapassar seus limites normais por um momento. Em seu turno, você pode realizar uma ação adicional, exceto a ação Magia.",
              actionId: "free-use-resource",
              parameters: {
                activation: { type: "free" },
                requirements: {
                  user: {
                    conditionMode: "all",
                    events: [
                      {
                        type: "hasActionEconomy",
                        actionType: "action",
                        isAvailable: false,
                      },
                    ],
                  },
                },
                target: { type: "self" },
                charges: {
                  type: "event",
                  rechargeOn: "shortRest",
                  maxCharges: 1,
                  recoveryAmount: 1,
                },
                outcomes: [
                  {
                    id: "actionSurge",
                    type: "providesNewAction",
                    on: "any",
                    actionTypes: ["action"],
                    duration: { unit: "turn" },
                  },
                ],
              },
            },
            {
              type: "activatableAction",
              name: "Mente Tática",
              actionId: "bonus-cast-spell",
              parameters: {
                activation: {
                  type: "bonus",
                  extraCost: {
                    resourceType: "charge",
                    amount: 1,
                    resourceId: "secondWind",
                    source: "character",
                  },
                },
                target: { type: "none" },
                charges: {
                  type: "event",
                  rechargeOn: "shortRest",
                  maxCharges: 1,
                  recoveryAmount: 1,
                },
                outcomes: [
                  {
                    id: "tacticalMind",
                    type: "descriptive",
                    on: "any",
                    roll: {
                      count: 2,
                      faces: 8,
                    },
                    details:
                      "Você tem uma mente para táticas dentro e fora do campo de batalha. Quando você falha em um teste de habilidade, pode gastar uma utilização de seu Retomar Fôlego para se esforçar em direção ao sucesso. Em vez de recuperar Pontos de Vida, você rola 2d8 e adiciona o número rolado ao teste de habilidade, potencialmente transformando-o em um sucesso.",
                  },
                ],
              },
            },
          ],
        },
        { level: 3, secondWind: 2, features: [] },
        { level: 4, secondWind: 3, features: [] },
        { level: 5, secondWind: 3, features: [] },
        { level: 6, secondWind: 3, features: [] },
        { level: 7, secondWind: 3, features: [] },
        { level: 8, secondWind: 3, features: [] },
        { level: 9, secondWind: 3, features: [] },
        { level: 10, secondWind: 4, features: [] },
        { level: 11, secondWind: 4, features: [] },
        { level: 12, secondWind: 4, features: [] },
        { level: 13, secondWind: 4, features: [] },
        { level: 14, secondWind: 4, features: [] },
        { level: 15, secondWind: 4, features: [] },
        { level: 16, secondWind: 4, features: [] },
        {
          level: 17,
          secondWind: 4,
          features: [
            {
              type: "activatableAction",
              name: "Surto de Ação Aprimorado",
              description:
                "A partir do nível 17, você pode usar o Surto de Ação duas vezes antes de precisar descansar, mas apenas uma vez por turno.",
              actionId: "free-use-resource",
              parameters: {
                activation: { type: "free" },
                requirements: {
                  user: {
                    conditionMode: "all",
                    events: [
                      {
                        type: "hasActionEconomy",
                        actionType: "action",
                        isAvailable: false,
                      },
                    ],
                  },
                },
                target: { type: "self" },
                charges: {
                  type: "event",
                  rechargeOn: "shortRest",
                  maxCharges: 2,
                  recoveryAmount: 2,
                },
                outcomes: [
                  {
                    id: "actionSurgeImproved",
                    type: "providesNewAction",
                    on: "any",
                    actionTypes: ["action"],
                    duration: { unit: "turn" },
                  },
                ],
              },
              duration: {
                unit: "instantaneous",
              },
            },
          ],
        },
        { level: 18, secondWind: 4, features: [] },
        { level: 19, secondWind: 4, features: [] },
        { level: 20, secondWind: 4, features: [] },
      ],
    },
  },
] as const satisfies Class[];
