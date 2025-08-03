import { Item } from "../../domain/item/items.schema";

export const itemsGear: Item[] = [
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
        actionId: "action-throw-item",
        parameters: {
          range: { normal: 20, unit: "ft" },
          save: { ability: "dexterity", dc: { type: "fixed", value: 10 } },
          outcomes: [
            {
              on: "fail",
              type: "modifyTargetHP",
              vitals: ["currentHp"],
              formula: {
                type: "damage",
                roll: { count: 1, faces: 4 },
                damageTypeOptions: ["fire"],
              },
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
      "Como uma ação, você pode beber este frasco para ganhar vantagem em testes de resistência contra veneno por 1 hora.",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-consume-item",
        parameters: {
          activation: {
            type: "action",
          },
          outcomes: [
            {
              on: "success",
              type: "customMechanic",
              mechanic: "grantAdvantage",
              details: {
                on: "savingThrow",
                against: ["poison"],
                duration: { value: 1, unit: "hour" },
              },
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
      "Como uma ação, você pode espalhar estas esferas para cobrir uma área de 10 pés quadrados. Uma criatura que se mova pela área deve ser bem-sucedida em um teste de resistência de Destreza (CD 10) ou ficará caída.",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-use-gear-area",
        parameters: {
          area: { shape: "cube", size: 10, unit: "ft" },
          save: { ability: "dexterity", dc: { type: "fixed", value: 10 } },
          outcomes: [
            { on: "fail", type: "applyCondition", condition: "prone" },
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
    weight: { value: 0, unit: "lb" },
    price: { quantity: 100, unit: "gold" },
    description:
      "Você pode usar uma ação para aplicar este veneno em uma arma. Uma criatura atingida deve fazer um teste de resistência de Constituição (CD 10) ou sofrerá 1d4 de dano de veneno.",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-apply-poison",
        parameters: {
          activation: {
            type: "action",
          },
          target: {
            type: "descriptive",
            details: "one weapon or 3 pieces of ammunition",
          },
          save: { ability: "constitution", dc: { type: "fixed", value: 10 } },
          outcomes: [
            {
              on: "fail",
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
    id: "item-abrolhos",
    name: ["Abrolhos", "Caltrops"],
    source: "LDJ2024",
    page: 224,
    type: "gear",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 1, unit: "gold" },
    description:
      "Como uma ação, você pode espalhar abrolhos para cobrir uma área de 5 pés quadrados. Uma criatura que entrar na área deve ter sucesso em um teste de Destreza (CD 15) ou para de se mover e sofre 1 de dano perfurante. Até recuperar 1 PV, seu deslocamento é reduzido em 10 pés.",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-use-gear-area",
        parameters: {
          area: { shape: "cube", size: 5, unit: "ft" },
          save: {
            ability: "dexterity",
            dc: { type: "calculated", attributes: ["dexterity"], base: 15 },
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
              type: "applyCustomEffect",
              effect: "movementReduced",
              value: 10,
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
        properties: {
          bright: 5,
          dim: 5,
          duration: { value: 1, unit: "hour" },
        },
      },
      {
        type: "activatableAction",
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
    effects: [],
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
        on: "abilityCheck",
        ability: "strength",
        condition: "where leverage can be applied",
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
    weight: { value: 3, unit: "lb" },
    price: { quantity: 5, unit: "gold" },
    description:
      "Este kit tem 10 usos. Como uma ação, você pode gastar um uso para estabilizar uma criatura com 0 PV, sem precisar de um teste de Medicina.",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-use-kit-charge",
        parameters: {
          charges: { max: 10 },
          activation: {
            type: "action",
            extraCost: { amount: 1, source: "item", resourceId: "itemCharge" },
          },

          outcomes: [
            {
              on: "success",
              type: "customMechanic",
              mechanic: "stabilizeCreature",
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
        actionId: "action-throw-item",
        parameters: {
          range: { normal: 20, unit: "ft" },
          target: { type: "descriptive", details: "fiend or undead" },
          outcomes: [
            {
              on: "hit",
              type: "modifyTargetHP",
              vitals: ["currentHp"],

              formula: {
                type: "damage",
                roll: { count: 2, faces: 6 },
                damageTypeOptions: ["radiant"],
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
        properties: {
          bright: 30,
          dim: 30,
          duration: { value: 6, unit: "hour" },
        },
      },
      {
        type: "activatableAction",
        actionId: "action-light-item",
      },
      {
        type: "activatableAction",
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
        actionId: "action-set-trap",
        parameters: {
          target: { type: "point" },
          activation: {
            type: "action",
          },
          outcomes: [
            {
              type: "summonToken",
              on: "any",
              token: {
                name: "Armadilha de Caça (Armada)",
                quantity: 1,
                effects: [
                  {
                    type: "triggeredEffect",
                    triggers: [{ on: "onEnterArea" }],
                    save: {
                      type: "calculated",
                      attributes: ["dexterity"],
                      base: 13,
                    },
                    outcomes: [
                      {
                        on: "fail",
                        type: "modifyTargetHP",
                        vitals: ["currentHp"],
                        formula: {
                          type: "damage",
                          roll: { count: 1, faces: 4 },
                          damageTypeOptions: ["piercing"],
                        },
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
        properties: {
          bright: 15,
          dim: 30,
          duration: { value: 6, unit: "hour" },
        },
      },
      {
        type: "activatableAction",
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
    effects: [{ type: "passive_property", property: "pickLockDC", value: 15 }],
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
      "Como uma ação, você pode espalhar o óleo deste frasco em uma criatura a até 5 pés ou arremessá-lo a até 20 pés, quebrando-o com o impacto. Em ambos os casos, faça um ataque à distância. Se acertar, o alvo fica coberto de óleo. Se o alvo sofrer qualquer dano de fogo antes que o óleo seque (após 1 minuto), ele sofre 5 de dano de fogo adicional. Você também pode derramar o óleo no chão para cobrir uma área de 5 pés quadrados, criando uma superfície escorregadia. Quando a área coberta de óleo é exposta ao fogo, ela queima por 2 rodadas e causa 5 de dano de fogo a qualquer criatura que entrar na área ou terminar seu turno nela.",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-throw-item",
        parameters: {
          range: { normal: 20, unit: "ft" },
          attackType: ["rangedItemAttack"],
          outcomes: [
            { on: "hit", type: "applyCondition", condition: "flammable" },
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
    effects: [{ type: "passive_property", property: "burstDC", value: 17 }],
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
        properties: {
          bright: 20,
          dim: 20,
          duration: { value: 1, unit: "hour" },
        },
      },
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "simple",
        weaponType: "melee",
        properties: [],
        mastery: [],
        damageFormulas: {
          primary: { type: "damage", fixed: 1, damageTypeOptions: ["fire"] }, // Dano 1}
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
        properties: {
          capacity: { value: 4, unit: "lb" }, // 4 pintos ~ 4 libras
        },
      },
    ],
  },
];
