import { Item } from "../../domain/item/items.schema";
import z from "zod";
export const itemsGear = [
  {
    id: "item-acido",
    name: ["Ácido", "Acid"],
    source: "LDJ2024",
    page: 222,
    type: "gear",
    rarity: "common",
    weight: { value: 1, unit: "lb" },
    price: { quantity: 25, unit: "gold" },
    description:
      "Como uma ação, você pode arremessar este frasco em uma criatura ou objeto a até 6 metros (20 pés). Faça um ataque à distância com o item. Em um acerto, o alvo sofre 2d6 de dano de ácido.",
    effects: [
      {
        type: "activatableAction",
        name: "Arremessar Ácido",
        actionId: "action-throw-item",
        parameters: {
          range: { normal: 20, unit: "ft" },
          attackType: ["rangedItemAttack"],
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 2, faces: 6 },
                damageTypeOptions: ["acid"],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "item-fogo-alquimico",
    name: ["Fogo Alquímico", "Alchemist's Fire"],
    source: "LDJ2024",
    page: 222,
    type: "gear",
    rarity: "common",
    weight: { value: 1, unit: "lb" },
    price: { quantity: 50, unit: "gold" },
    description:
      "Como uma ação, você pode arremessar este frasco em uma criatura a até 20 pés. A criatura deve ser bem-sucedida em um teste de resistência de Destreza (CD 10) ou sofrerá 1d4 de dano de fogo no início de cada um de seus turnos.",
    effects: [
      {
        type: "activatableAction",
        name: "Arremessar Fogo Alquímico",
        actionId: "action-throw-item",
        parameters: {
          attackType: ["rangedItemAttack"],
          range: { normal: 20, unit: "ft" },
          save: { ability: "dexterity", dc: { type: "fixed", value: 10 } },
          outcomes: [
            {
              type: "damageOverTime",
              on: "fail",
              triggers: { events: [{ type: "onTurnStart" }] },
              damage: {
                formula: {
                  type: "damage",
                  damageTypeOptions: ["fire"],
                  roll: { count: 1, faces: 4 },
                },
              },
              save: {
                ability: "dexterity",
                dc: { type: "fixed", value: 10 },
                endsOnSuccess: true,
              },
              duration: { unit: "indefinite" },
            },
          ],
        },
      },
    ],
  },
  {
    id: "item-antidoto",
    name: ["Antídoto", "Antitoxin"],
    source: "LDJ2024",
    page: 222,
    type: "gear",
    rarity: "common",
    weight: { value: 0, unit: "lb" },
    price: { quantity: 50, unit: "gold" },
    description:
      "Como uma Ação Bônus, você pode beber um frasco de Antitoxina para ganhar Vantagem em testes de resistência para evitar ou encerrar a condição Envenenado por 1 hora.",
    effects: [
      {
        type: "activatableAction",
        name: "Consumir Antídoto",
        actionId: "action-consume-item",
        parameters: {
          activation: {
            type: "bonusAction",
          },
          outcomes: [
            {
              on: "any",
              type: "grantAdvantageDisadvantage",
              target: { type: "self" },
              duration: { unit: "hour", value: 1 },
              mode: "advantage",
              targetRoll: "savingThrow",
              appliesToFilter: {
                status: ["poisoned"],
              },
              appliesTo: "self",
            },
          ],
        },
      },
    ],
  },
  {
    id: "item-mochila",
    name: ["Mochila", "Backpack"],
    source: "LDJ2024",
    page: 224,
    type: "gear",
    rarity: "common",
    weight: { value: 5, unit: "lb" },
    price: { quantity: 2, unit: "gold" },
    description:
      "Uma mochila de couro com alças, capaz de carregar até 30 libras (ou 1 pé cúbico) de equipamento.",
    effects: [
      {
        type: "onEquip_providesContainer",
        name: "Compartimento de Armazenamento",
        properties: {
          capacity: { value: 30, unit: "lb" },
          volume: { value: 1, unit: "cubic_foot" },
        },
      },
    ],
  },
  {
    id: "item-esferas-metalicas",
    name: ["Esferas Metálicas", "Ball Bearings"],
    source: "LDJ2024",
    page: 224,
    type: "gear",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 1, unit: "gold" },
    description:
      "Como uma ação, você pode espalhar estas esferas para cobrir uma área de 10 pés quadrados. Uma criatura que se mova pela área deve ser bem-sucedida em um teste de resistência de Destreza (CD 10) ou ficará caída. A área é considerada terreno difícil.",
    effects: [
      {
        type: "activatableAction",
        name: "Espalhar Esferas",
        actionId: "action-use-gear-area",
        parameters: {
          range: { normal: 5, unit: "ft" },
          area: { shape: "cube", size: 10, unit: "ft" },
          outcomes: [
            {
              on: "any",
              type: "createAreaEffect",
              surfaceType: "ballBearings",
              isDifficultTerrain: true,
              duration: { unit: "indefinite" },
              rules: [
                {
                  trigger: {
                    events: [{ type: "enteredArea" }, { type: "movedInArea" }],
                  },
                  save: {
                    ability: "dexterity",
                    dc: { type: "fixed", value: 10 },
                  },
                  outcomes: [
                    { on: "fail", type: "applyCondition", condition: "prone" },
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
    id: "item-veneno-basico",
    name: ["Veneno Básico", "Basic Poison"],
    source: "LDJ2024",
    page: 227,
    type: "gear",
    rarity: "common",
    weight: {
      value: 0,
      unit: "lb",
    },
    price: {
      quantity: 100,
      unit: "gold",
    },
    description:
      "Você pode usar uma ação para aplicar este veneno em uma arma cortante ou perfurante, ou em até três peças de munição. A arma ou munição permanece venenosa por 1 minuto ou até acertar um ataque. Uma criatura atingida por essa arma deve fazer um teste de resistência de Constituição (CD 10) ou sofrerá 1d4 de dano de veneno.",
    effects: [
      {
        type: "activatableAction",
        name: "Aplicar Veneno em Arma",
        actionId: "action-apply-poison",
        parameters: {
          activation: {
            type: "action",
          },
          target: {
            type: "weapon",
            quantity: 1,
            properties: ["slashing", "piercing"],
          },
          outcomes: [
            {
              on: "any",
              type: "modifyWeaponProperties",
              duration: {
                unit: "minute",
                value: 1,
              },
              charges: 1,
              addedEffect: {
                trigger: "onHit",
                save: {
                  ability: "constitution",
                  dc: {
                    type: "fixed",
                    value: 10,
                  },
                },
                outcomes: [
                  {
                    on: "fail",
                    type: "modifyTargetHP",
                    vitals: ["currentHp"],
                    formula: {
                      type: "damage",
                      damageTypeOptions: ["poison"],
                      roll: {
                        count: 1,
                        faces: 4,
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "item-estrepes",
    name: ["Estrepes", "Caltrops"],
    source: "LDJ2024",
    page: 224,
    type: "gear",
    rarity: "common",
    weight: {
      value: 2,
      unit: "lb",
    },
    price: {
      quantity: 1,
      unit: "gold",
    },
    description:
      "Como uma ação, você pode espalhar um saco de estrepes para cobrir uma área de 5 pés quadrados. Qualquer criatura que entrar na área deve ter sucesso em um teste de resistência de Destreza (CD 15) ou para de se mover e sofre 1 de dano perfurante. Até que a criatura recupere pelo menos 1 ponto de vida, seu deslocamento é reduzido em 10 pés. Uma criatura que se mova pela área com metade do seu deslocamento não precisa fazer o teste.",
    effects: [
      {
        type: "activatableAction",
        name: "Espalhar Estrepes",
        actionId: "action-use-gear-area",
        parameters: {
          area: {
            shape: "cube",
            size: 5,
            unit: "ft",
          },
          range: { normal: 5, unit: "ft" },
          outcomes: [
            {
              on: "any",
              type: "createAreaEffect",
              surfaceType: "caltrops",
              isDifficultTerrain: true,
              duration: {
                unit: "indefinite",
              },
              rules: [
                {
                  trigger: {
                    events: [{ type: "enteredArea" }],
                  },
                  save: {
                    ability: "dexterity",
                    dc: {
                      type: "fixed",
                      value: 15,
                    },
                  },
                  outcomes: [
                    {
                      on: "fail",
                      type: "modifyTargetHP",
                      vitals: ["currentHp"],
                      formula: {
                        type: "damage",
                        fixed: 1,
                        damageTypeOptions: ["piercing"],
                      },
                    },
                    {
                      on: "fail",
                      type: "modifyAttribute",
                      attribute: "speed",
                      operation: "subtract",
                      value: "all",
                      stacking: "none",
                      duration: {
                        unit: "turn",
                        value: 1,
                      },
                      endConditions: [{ events: [{ type: "wasHealed" }] }],
                    },
                    {
                      on: "fail",
                      type: "applyCondition",
                      condition: "restrained",
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
    id: "item-vela",
    name: ["Vela", "Candle"],
    source: "LDJ2024",
    page: 224,
    type: "gear",
    rarity: "none",
    weight: { value: 0, unit: "lb" },
    price: { quantity: 1, unit: "copper" },
    description:
      "Por 1 hora, uma vela emite luz brilhante em um raio de 5 pés e penumbra por mais 5 pés.",
    effects: [
      {
        type: "passive_providesLight",
        name: "Iluminação de Vela",
        properties: {
          bright: 5,
          dim: 5,
          duration: { value: 1, unit: "hour" },
        },
      },
      {
        type: "activatableAction",
        name: "Acender Vela",
        actionId: "action-light-item",
      },
    ],
  },
  {
    id: "item-corrente",
    name: ["Corrente", "Chain"],
    source: "LDJ2024",
    page: 224,
    type: "gear",
    rarity: "common",
    weight: { value: 10, unit: "lb" },
    price: { quantity: 5, unit: "gold" },
    description:
      "Uma corrente de 10 pés de comprimento. Pode ser arrebentada com um teste de Força (CD 20).",
    effects: [
      {
        type: "passive_property",
        name: "CD para Arrebentar",
        property: "burstDC",
        value: 20,
      },
    ],
  },
  {
    id: "item-pe-de-cabra",
    name: ["Pé de Cabra", "Crowbar"],
    source: "LDJ2024",
    page: 225,
    type: "gear",
    rarity: "common",
    weight: { value: 5, unit: "lb" },
    price: { quantity: 2, unit: "gold" },
    description:
      "Usar um pé de cabra concede vantagem em testes de Força onde a alavancagem da ferramenta possa ser aplicada.",
    effects: [
      {
        type: "passive_grantAdvantage",
        name: "Vantagem em Força",
        on: "abilityCheck",
        ability: "strength",
        appliesToActions: ["action-force-open"],
      },
    ],
  },
  {
    id: "item-kit-de-curandeiro",
    name: ["Kit de Curandeiro", "Healer's Kit"],
    source: "LDJ2024",
    page: 225,
    type: "gear",
    rarity: "common",
    weight: {
      value: 3,
      unit: "lb",
    },
    price: {
      quantity: 5,
      unit: "gold",
    },
    description:
      "Este kit tem 10 usos. Como uma ação, você pode gastar um uso para estabilizar uma criatura com 0 Pontos de Vida, fazendo-a retornar a 1 Ponto de Vida.",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-use-kit-charge",
        name: "Usar Kit de Curandeiro",
        parameters: {
          charges: { type: "static", amount: 10, max: 10 },
          activation: {
            type: "action",
            extraCost: {
              amount: 1,
              source: "item",
              resourceId: "itemCharge",
            },
          },
          target: {
            type: "creature",
            quantity: 1,
          },
          requirements: {
            target: { events: [{ type: "hasZeroHP" }] },
          },
          outcomes: [
            {
              on: "any",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "healing",
                fixed: 1,
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "item-agua-benta",
    name: ["Água Benta", "Holy Water"],
    source: "LDJ2024",
    page: 226,
    type: "gear",
    rarity: "common",
    weight: { value: 1, unit: "lb" },
    price: { quantity: 25, unit: "gold" },
    description:
      "Como uma ação, você pode arremessar este frasco a até 20 pés. Se o alvo for um demônio ou morto-vivo, ele sofre 2d6 de dano radiante.",
    effects: [
      {
        type: "activatableAction",
        name: "Arremessar Água Benta",
        actionId: "action-throw-item",
        parameters: {
          attackType: ["rangedItemAttack"],
          range: { normal: 20, unit: "ft" },
          target: {
            type: "creature",
            quantity: 1,
          },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "conditional",
                variables: {
                  events: [
                    {
                      type: "isCreatureOfType",
                      creatureTypes: ["fiend", "undead"],
                    },
                  ],
                },
                ifTrue: {
                  type: "damage",
                  roll: { count: 2, faces: 6 },
                  damageTypeOptions: ["radiant"],
                },
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "item-lanterna-coberta",
    name: ["Lanterna Coberta", "Hooded Lantern"],
    source: "LDJ2024",
    page: 226,
    type: "gear",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 5, unit: "gold" },
    description:
      "Uma lanterna coberta emite luz brilhante em um raio de 30 pés e penumbra por mais 30 pés. Uma vez acesa, ela queima por 6 horas com um frasco (1 pinto) de óleo. Como uma ação, você pode abaixar a cobertura, reduzindo a luz para penumbra em um raio de 5 pés.",
    effects: [
      {
        type: "passive_providesLight",
        name: "Iluminação de Lanterna",
        properties: {
          bright: 30,
          dim: 30,
          duration: { value: 6, unit: "hour" },
        },
      },
      {
        type: "activatableAction",
        name: "Acender Lanterna",
        actionId: "action-light-item",
      },
      {
        type: "activatableAction",
        name: "Cobrir Lanterna",
        actionId: "action-cover-lantern",
      },
    ],
  },
  {
    id: "item-armadilha-de-caca",
    name: ["Armadilha de Caça", "Hunting Trap"],
    source: "LDJ2024",
    page: 226,
    type: "gear",
    rarity: "common",
    weight: { value: 25, unit: "lb" },
    price: { quantity: 5, unit: "gold" },
    description:
      "Quando você usa sua ação para armá-la, esta armadilha forma um anel de aço com dentes que se fecha quando uma criatura pisa na placa de pressão no centro. A armadilha é fixada por uma corrente pesada a um objeto imóvel. Uma criatura que pisar na placa deve ser bem-sucedida em um teste de resistência de Destreza (CD 13) ou sofrerá 1d4 de dano perfurante e parará de se mover. Enquanto estiver presa, a criatura está 'contida' (restrained).",
    effects: [
      {
        type: "activatableAction",
        name: "Armar Armadilha",
        actionId: "action-set-trap",
        parameters: {
          target: { type: "point" },
          range: { normal: 5, unit: "ft" },
          activation: {
            type: "action",
          },
          outcomes: [
            {
              type: "summonToken",
              tokenId: "template-hunting-trap-armed",
              on: "any",
              quantity: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "item-lampiao",
    name: ["Lampião", "Lamp"],
    source: "LDJ2024",
    page: 226,
    type: "gear",
    rarity: "common",
    weight: { value: 1, unit: "lb" },
    price: { quantity: 5, unit: "silver" },
    description:
      "Um lampião emite luz brilhante em um raio de 15 pés e penumbra por mais 30 pés. Uma vez aceso, ele queima por 6 horas com um frasco (1 pinto) de óleo.",
    effects: [
      {
        type: "passive_providesLight",
        name: "Iluminação de Lampião",
        properties: {
          bright: 15,
          dim: 30,
          duration: { value: 6, unit: "hour" },
        },
      },
      {
        type: "activatableAction",
        name: "Acender Lampião",
        actionId: "action-light-item",
      },
    ],
  },
  {
    id: "item-cadeado",
    name: ["Cadeado", "Lock"],
    source: "LDJ2024",
    page: 226,
    type: "gear",
    rarity: "common",
    weight: { value: 1, unit: "lb" },
    price: { quantity: 10, unit: "gold" },
    description:
      "Um cadeado vem com uma chave. Sem a chave, uma criatura proficiente com ferramentas de ladrão pode abrir a fechadura com um teste de Destreza (CD 15) bem-sucedido.",
    effects: [
      {
        type: "passive_property",
        name: "CD para Abrir Fechadura",
        property: "pickLockDC",
        value: 15,
      },
    ],
  },
  {
    id: "item-oleo",
    name: ["Óleo", "Oil"],
    source: "LDJ2024",
    page: 227,
    type: "gear",
    rarity: "common",
    weight: { value: 1, unit: "lb" },
    price: { quantity: 1, unit: "silver" },
    description:
      "Como uma ação, você pode derramar o óleo no chão para cobrir uma área de 5 pés quadrados, criando uma superfície escorregadia. Quando a área coberta de óleo é exposta ao fogo, ela queima por 2 rodadas e causa 5 de dano de fogo a qualquer criatura que entrar na área ou terminar seu turno nela.",
    effects: [
      {
        type: "activatableAction",
        name: "Derramar Óleo",
        actionId: "action-use-gear-area",
        parameters: {
          activation: { type: "action" },
          range: { normal: 5, unit: "ft" },
          area: { shape: "cube", size: 5, unit: "ft" },
          outcomes: [
            {
              on: "any",
              type: "createAreaEffect",
              surfaceType: "oil",
              isDifficultTerrain: true,
              duration: { unit: "indefinite" },
              rules: [
                {
                  trigger: { events: [{ type: "enteredArea" }] },
                  save: {
                    ability: "dexterity",
                    dc: { type: "fixed", value: 10 },
                  },
                  outcomes: [
                    { on: "fail", type: "applyCondition", condition: "prone" },
                  ],
                },
              ],
              transformRules: [
                {
                  trigger: {
                    events: [{ type: "tookDamage", damageTypes: ["fire"] }],
                  },
                  newSurface: {
                    on: "any",
                    type: "createAreaEffect",
                    surfaceType: "fire",
                    duration: { unit: "round", value: 2 },
                    rules: [
                      {
                        trigger: {
                          events: [
                            { type: "enteredArea" },
                            { type: "endedTurnInArea" },
                          ],
                        },
                        outcomes: [
                          {
                            on: "any",
                            type: "modifyTargetHP",
                            vitals: ["currentHp"],
                            formula: {
                              type: "damage",
                              fixed: 5,
                              damageTypeOptions: ["fire"],
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      },
    ],
  },
  {
    id: "item-bolsa-de-componentes",
    name: ["Bolsa de Componentes", "Component Pouch"],
    source: "LDJ2024",
    page: 228,
    type: "gear",
    rarity: "common",
    weight: { value: 1, unit: "lb" },
    price: { quantity: 5, unit: "silver" },
    description:
      "Uma pequena bolsa de couro com um cinto, capaz de carregar até 6 libras de material.",
    effects: [
      {
        type: "onEquip_providesContainer",
        name: "Compartimento de Armazenamento",
        properties: {
          capacity: { value: 6, unit: "lb" },
          volume: { value: 0.2, unit: "cubic_foot" },
        },
      },
    ],
  },
  {
    id: "item-corda",
    name: ["Corda", "Rope"],
    source: "LDJ2024",
    page: 228,
    type: "gear",
    rarity: "common",
    weight: { value: 5, unit: "lb" },
    price: { quantity: 1, unit: "gold" },
    description:
      "Uma corda de cânhamo com 50 pés de comprimento. Pode ser arrebentada com um teste de Força (CD 17).",
    effects: [
      {
        type: "passive_property",
        name: "CD para Arrebentar",
        property: "burstDC",
        value: 17,
      },
    ],
  },
  {
    id: "item-pederneira",
    name: ["Pederneira", "Tinderbox"],
    source: "LDJ2024",
    page: 229,
    type: "gear",
    rarity: "common",
    weight: { value: 1, unit: "lb" },
    price: { quantity: 5, unit: "silver" },
    description:
      "Este pequeno recipiente contém pederneira, aço e isca (geralmente um pano seco embebido em óleo leve) usados para acender fogo. Usá-lo para acender uma tocha ou algo com combustível exposto leva uma ação. Acender qualquer outro fogo leva 1 minuto.",
    effects: [
      {
        type: "activatableAction",
        name: "Acender Fogo",
        actionId: "action-light-item",
        parameters: {
          activation: {
            type: "action",
          },
          target: {
            details: "torch or other exposed fuel",
            type: "descriptive",
          },
        },
      },
    ],
  },
  {
    id: "item-tocha",
    name: ["Tocha", "Torch"],
    source: "LDJ2024",
    page: 229,
    type: "gear",
    rarity: "common",
    weight: { value: 1, unit: "lb" },
    price: { quantity: 1, unit: "copper" },
    description:
      "Uma tocha acesa emite luz brilhante em um raio de 20 pés e penumbra por mais 20 pés. Se usada para atacar, causa 1 de dano de fogo.",
    effects: [
      {
        type: "passive_providesLight",
        name: "Iluminação de Tocha",
        properties: {
          bright: 20,
          dim: 20,
          duration: { value: 1, unit: "hour" },
        },
      },
      {
        type: "onWield_grantWeaponAttack",
        name: "Ataque com Tocha",
        weaponCategory: "simple",
        weaponType: "melee",
        mastery: [],
        properties: ["light"],
        damageFormulas: {
          primary: { type: "damage", fixed: 1, damageTypeOptions: ["fire"] },
        },
      },
    ],
  },
  {
    id: "item-frasco",
    name: ["Frasco", "Vial"],
    source: "LDJ2024",
    page: 229,
    type: "gear",
    rarity: "none",
    weight: { value: 0.1, unit: "lb" },
    price: { quantity: 1, unit: "gold" },
    description:
      "Um frasco de vidro ou cerâmica que comporta até 4 onças de líquido.",
    effects: [
      {
        type: "onEquip_providesContainer",
        name: "Compartimento do Frasco",
        properties: {
          capacity: { value: 0.25, unit: "lb" }, // 4 onças
        },
      },
    ],
  },
  {
    id: "item-odre",
    name: ["Odre", "Wineskin"],
    source: "LDJ2024",
    page: 229,
    type: "gear",
    rarity: "common",
    weight: { value: 5, unit: "lb" }, // Peso quando cheio
    price: { quantity: 2, unit: "silver" },
    description: "Um odre de couro que comporta até 4 pintos de líquido.",
    effects: [
      {
        type: "onEquip_providesContainer",
        name: "Compartimento do Odre",
        properties: {
          capacity: { value: 4, unit: "lb" }, // 4 pintos ~ 4 libras
        },
      },
    ],
  },
] as const satisfies Item[];
const allGearIds = itemsGear.map((gear) => gear.id);
if (allGearIds.length === 0) {
  throw new Error(
    "Nenhum equipamento encontrado em items-gear.ts para criar o GearIdEnum.",
  );
}
const [firstGearId, ...restGearIds] = allGearIds;
export const GearIdEnum = z.enum([firstGearId, ...restGearIds]);
export type GearId = z.infer<typeof GearIdEnum>;
