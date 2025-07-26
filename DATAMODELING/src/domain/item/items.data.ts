import z from "zod";

import { FinalItemDataSchema } from "../item/items.schema";

type ItemArray = z.infer<typeof FinalItemDataSchema>;

export const PHB2024ITEMS: ItemArray = [
  {
    id: "item-acido",
    name: "Ácido",
    source: "LDJ2024",
    page: 222,
    type: "gear",
    rarity: "common",
    weight: { value: 1, unit: "lb" },
    price: { quantity: 25, unit: "GoldPiece" },
    description:
      "Como uma ação, você pode arremessar este frasco em uma criatura ou objeto a até 6 metros (20 pés). Faça um ataque à distância com o item. Em um acerto, o alvo sofre 2d6 de dano de ácido.",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-throw-item",
        parameters: {
          range: { normal: 20, unit: "ft" },
          attackType: "rangedItemAttack",
          effects: [
            {
              on: "hit",
              type: "damage",

              formula: { dice: "2d6", damageType: "acid" },
            },
          ],
        },
      },
    ],
  },
  {
    id: "item-fogo-alquimico",
    name: "Fogo Alquímico",
    source: "LDJ2024",
    page: 222,
    type: "gear",
    rarity: "common",
    weight: { value: 1, unit: "lb" },
    price: { quantity: 50, unit: "GoldPiece" },
    description:
      "Como uma ação, você pode arremessar este frasco em uma criatura a até 20 pés. A criatura deve ser bem-sucedida em um teste de resistência de Destreza (CD 10) ou sofrerá 1d4 de dano de fogo no início de cada um de seus turnos.",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-throw-item",
        parameters: {
          range: { normal: 20, unit: "ft" },
          save: { ability: "dexterity", dc: 10 },
          effects: [
            {
              on: "fail",
              type: "damage",

              formula: { dice: "1d4", damageType: "fire" },
            },
          ],
        },
      },
    ],
  },
  {
    id: "item-antidoto",
    name: "Antídoto",
    source: "LDJ2024",
    page: 222,
    type: "gear",
    rarity: "common",
    weight: { value: 0, unit: "lb" },
    price: { quantity: 50, unit: "GoldPiece" },
    description:
      "Como uma ação, você pode beber este frasco para ganhar vantagem em testes de resistência contra veneno por 1 hora.",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-consume-item",
        parameters: {
          activation: {
            type: "action",
            cost: {
              amount: 1,
              source: "character",
              resourceId: "action", // Indica que consome a Ação principal do personagem
            },
          },
          effects: [
            {
              on: "success",
              type: "customMechanic",
              mechanic: "grantAdvantage",
              details: {
                on: "savingThrow",
                against: "poison",
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
    name: "Mochila",
    source: "LDJ2024",
    page: 224,
    type: "gear",
    rarity: "common",
    weight: { value: 5, unit: "lb" },
    price: { quantity: 2, unit: "GoldPiece" },
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
    name: "Esferas Metálicas",
    source: "LDJ2024",
    page: 224,
    type: "gear",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 1, unit: "GoldPiece" },
    description:
      "Como uma ação, você pode espalhar estas esferas para cobrir uma área de 10 pés quadrados. Uma criatura que se mova pela área deve ser bem-sucedida em um teste de resistência de Destreza (CD 10) ou ficará caída.",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-use-gear-area",
        parameters: {
          area: { shape: "cube", size: 10 },
          save: { ability: "dexterity", dc: 10 },
          effects: [{ on: "fail", type: "applyCondition", condition: "prone" }],
        },
      },
    ],
  },
  {
    id: "item-veneno-basico",
    name: "Veneno Básico",
    source: "LDJ2024",
    page: 227,
    type: "gear",
    rarity: "common",
    weight: { value: 0, unit: "lb" },
    price: { quantity: 100, unit: "GoldPiece" },
    description:
      "Você pode usar uma ação para aplicar este veneno em uma arma. Uma criatura atingida deve fazer um teste de resistência de Constituição (CD 10) ou sofrerá 1d4 de dano de veneno.",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-apply-poison",
        parameters: {
          activation: {
            type: "action",
            cost: {
              amount: 1,
              source: "character",
              resourceId: "action",
            },
          },
          target: {
            type: "descriptive",
            text: "one weapon or 3 pieces of ammunition",
          },
          save: { ability: "constitution", dc: 10 },
          effects: [
            {
              on: "fail",
              type: "damage",

              formula: { dice: "1d4", damageType: "poison" },
            },
          ],
        },
      },
    ],
  },
  {
    id: "item-abrolhos",
    name: "Abrolhos",
    source: "LDJ2024",
    page: 224,
    type: "gear",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 1, unit: "GoldPiece" },
    description:
      "Como uma ação, você pode espalhar abrolhos para cobrir uma área de 5 pés quadrados. Uma criatura que entrar na área deve ter sucesso em um teste de Destreza (CD 15) ou para de se mover e sofre 1 de dano perfurante. Até recuperar 1 PV, seu deslocamento é reduzido em 10 pés.",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-use-gear-area",
        parameters: {
          area: { shape: "cube", size: 5 },
          save: { ability: "dexterity", dc: 15 },
          effects: [
            {
              on: "fail",
              type: "damage",
              formula: { dice: "1d1", bonus: -1, damageType: "piercing" },
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
    name: "Vela",
    source: "LDJ2024",
    page: 224,
    type: "gear",
    rarity: "none",
    weight: { value: 0, unit: "lb" },
    price: { quantity: 1, unit: "CooperPiece" },
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
    name: "Corrente",
    source: "LDJ2024",
    page: 224,
    type: "gear",
    rarity: "common",
    weight: { value: 10, unit: "lb" },
    price: { quantity: 5, unit: "GoldPiece" },
    description:
      "Uma corrente de 10 pés de comprimento. Pode ser arrebentada com um teste de Força (CD 20).",
    effects: [],
  },
  {
    id: "item-pe-de-cabra",
    name: "Pé de Cabra",
    source: "LDJ2024",
    page: 225,
    type: "gear",
    rarity: "common",
    weight: { value: 5, unit: "lb" },
    price: { quantity: 2, unit: "GoldPiece" },
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
    name: "Kit de Curandeiro",
    source: "LDJ2024",
    page: 225,
    type: "gear",
    rarity: "common",
    weight: { value: 3, unit: "lb" },
    price: { quantity: 5, unit: "GoldPiece" },
    description:
      "Este kit tem 10 usos. Como uma ação, você pode gastar um uso para estabilizar uma criatura com 0 PV, sem precisar de um teste de Medicina.",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-use-kit-charge",
        parameters: {
          activation: {
            type: "action",
            cost: { amount: 1, source: "item", resourceId: "itemCharge" },
          },

          charges: { max: 10 },
          effects: [
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
    name: "Água Benta",
    source: "LDJ2024",
    page: 226,
    type: "gear",
    rarity: "common",
    weight: { value: 1, unit: "lb" },
    price: { quantity: 25, unit: "GoldPiece" },
    description:
      "Como uma ação, você pode arremessar este frasco a até 20 pés. Se o alvo for um demônio ou morto-vivo, ele sofre 2d6 de dano radiante.",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-throw-item",
        parameters: {
          range: { normal: 20, unit: "ft" },
          target: { type: "descriptive", text: "fiend or undead" },
          effects: [
            {
              on: "hit",
              type: "damage",

              formula: { dice: "2d6", damageType: "radiant" },
            },
          ],
        },
      },
    ],
  },
  {
    id: "item-lanterna-coberta",
    name: "Lanterna Coberta",
    source: "LDJ2024",
    page: 226,
    type: "gear",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 5, unit: "GoldPiece" },
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
    name: "Armadilha de Caça",
    source: "LDJ2024",
    page: 226,
    type: "gear",
    rarity: "common",
    weight: { value: 25, unit: "lb" },
    price: { quantity: 5, unit: "GoldPiece" },
    description:
      "Quando você usa sua ação para armá-la, esta armadilha forma um anel de aço com dentes que se fecha quando uma criatura pisa na placa de pressão no centro. A armadilha é fixada por uma corrente pesada a um objeto imóvel. Uma criatura que pisar na placa deve ser bem-sucedida em um teste de resistência de Destreza (CD 13) ou sofrerá 1d4 de dano perfurante e parará de se mover. Enquanto estiver presa, a criatura está 'contida' (restrained).",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-set-trap",
        parameters: {
          activation: {
            type: "action",
            cost: {
              amount: 1,
              source: "character",
              resourceId: "action",
            },
          },
          save: { ability: "dexterity", dc: 13 },
          effects: [
            {
              on: "fail",
              type: "damage",
              formula: { dice: "1d4", damageType: "piercing" },
            },

            { on: "fail", type: "applyCondition", condition: "restrained" },
          ],
        },
      },
    ],
  },
  {
    id: "item-lampiao",
    name: "Lampião",
    source: "LDJ2024",
    page: 226,
    type: "gear",
    rarity: "common",
    weight: { value: 1, unit: "lb" },
    price: { quantity: 5, unit: "SilverPiece" },
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
    name: "Cadeado",
    source: "LDJ2024",
    page: 226,
    type: "gear",
    rarity: "common",
    weight: { value: 1, unit: "lb" },
    price: { quantity: 10, unit: "GoldPiece" },
    description:
      "Um cadeado vem com uma chave. Sem a chave, uma criatura proficiente com ferramentas de ladrão pode abrir a fechadura com um teste de Destreza (CD 15) bem-sucedido.",
    effects: [{ type: "passive_property", property: "pickLockDC", value: 15 }],
  },
  {
    id: "item-rede",
    name: "Rede",
    source: "LDJ2024",
    page: 227,
    type: "weapon",
    rarity: "common",
    weight: { value: 3, unit: "lb" },
    price: { quantity: 1, unit: "GoldPiece" },
    description:
      "Uma arma especial de arremesso. Uma criatura Grande ou menor atingida por uma rede fica 'contida' (restrained) até se libertar. A rede não tem efeito em criaturas sem forma ou criaturas Enormes ou maiores. Uma criatura pode usar sua ação para fazer um teste de Força (CD 10) para se libertar ou libertar outra criatura ao alcance. Causar 5 de dano cortante à rede (CA 10) também liberta a criatura sem feri-la, encerrando o efeito e destruindo a rede.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "simple",
        weaponType: "ranged",
        properties: [
          {
            name: "special",
            condition:
              "A Large or smaller creature hit by a net is restrained until it is freed.",
          },
        ],
        mastery: [],
        range: { normal: 5, long: 15, unit: "ft" },
        outcomes: [
          { on: "hit", type: "applyCondition", condition: "restrained" },
        ],
      },
    ],
  },
  {
    id: "item-oleo",
    name: "Óleo",
    source: "LDJ2024",
    page: 227,
    type: "gear",
    rarity: "common",
    weight: { value: 1, unit: "lb" },
    price: { quantity: 1, unit: "SilverPiece" },
    description:
      "Como uma ação, você pode espalhar o óleo deste frasco em uma criatura a até 5 pés ou arremessá-lo a até 20 pés, quebrando-o com o impacto. Em ambos os casos, faça um ataque à distância. Se acertar, o alvo fica coberto de óleo. Se o alvo sofrer qualquer dano de fogo antes que o óleo seque (após 1 minuto), ele sofre 5 de dano de fogo adicional. Você também pode derramar o óleo no chão para cobrir uma área de 5 pés quadrados, criando uma superfície escorregadia. Quando a área coberta de óleo é exposta ao fogo, ela queima por 2 rodadas e causa 5 de dano de fogo a qualquer criatura que entrar na área ou terminar seu turno nela.",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-throw-item",
        parameters: {
          range: { normal: 20, unit: "ft" },
          attackType: "rangedItemAttack",
          effects: [{ on: "hit", type: "applyCustomEffect", effect: "oiled" }],
        },
      },
    ],
  },
  {
    id: "item-bolsa-de-componentes",
    name: "Bolsa de Componentes",
    source: "LDJ2024",
    page: 228,
    type: "gear",
    rarity: "common",
    weight: { value: 1, unit: "lb" },
    price: { quantity: 5, unit: "SilverPiece" },
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
    name: "Corda",
    source: "LDJ2024",
    page: 228,
    type: "gear",
    rarity: "common",
    weight: { value: 5, unit: "lb" },
    price: { quantity: 1, unit: "GoldPiece" },
    description:
      "Uma corda de cânhamo com 50 pés de comprimento. Pode ser arrebentada com um teste de Força (CD 17).",
    effects: [{ type: "passive_property", property: "burstDC", value: 17 }],
  },
  {
    id: "item-ferramentas-de-ladrao",
    name: "Ferramentas de Ladrão",
    source: "LDJ2024",
    page: 221,
    type: "tool",
    rarity: "common",
    weight: { value: 1, unit: "lb" },
    price: { quantity: 25, unit: "GoldPiece" },
    description:
      "Este conjunto de ferramentas inclui uma pequena lixa, um conjunto de gazuas, um pequeno espelho montado em um cabo de metal, um conjunto de tesouras de lâminas finas e um par de alicates. A proficiência com essas ferramentas permite que você adicione seu bônus de proficiência a quaisquer testes de habilidade que você fizer para desarmar armadilhas ou abrir fechaduras.",
    effects: [
      {
        type: "passive_grantAdvantage",
        on: "skillCheck",
        skill: "sleightOfHand", // Ou uma perícia customizada "thievery"
        condition: "when picking locks or disarming traps",
      },
    ],
  },
  {
    id: "item-pederneira",
    name: "Pederneira",
    source: "LDJ2024",
    page: 229,
    type: "gear",
    rarity: "common",
    weight: { value: 1, unit: "lb" },
    price: { quantity: 5, unit: "SilverPiece" },
    description:
      "Este pequeno recipiente contém pederneira, aço e isca (geralmente um pano seco embebido em óleo leve) usados para acender fogo. Usá-lo para acender uma tocha ou algo com combustível exposto leva uma ação. Acender qualquer outro fogo leva 1 minuto.",
    effects: [
      {
        type: "activatableAction",
        actionId: "action-light-item",
        parameters: {
          activation: {
            type: "action",
            cost: {
              amount: 1,
              source: "character",
              resourceId: "action",
            },
          },
          target: { text: "torch or other exposed fuel", type: "descriptive" },
        },
      },
    ],
  },
  {
    id: "item-tocha",
    name: "Tocha",
    source: "LDJ2024",
    page: 229,
    type: "gear",
    rarity: "common",
    weight: { value: 1, unit: "lb" },
    price: { quantity: 1, unit: "CooperPiece" },
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
        damage: {
          primary: { dice: "1d1", bonus: -1, damageType: "fire" }, // Dano 1
        },
      },
    ],
  },
  {
    id: "item-frasco",
    name: "Frasco",
    source: "LDJ2024",
    page: 229,
    type: "gear",
    rarity: "none",
    weight: { value: 0.1, unit: "lb" },
    price: { quantity: 1, unit: "GoldPiece" },
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
    name: "Odre",
    source: "LDJ2024",
    page: 229,
    type: "gear",
    rarity: "common",
    weight: { value: 5, unit: "lb" }, // Peso quando cheio
    price: { quantity: 2, unit: "SilverPiece" },
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
  {
    id: "item-machado-de-batalha",
    name: "Machado de Batalha",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 4, unit: "lb" },
    price: { quantity: 10, unit: "GoldPiece" },
    description:
      "Uma arma marcial versátil, preferida por guerreiros e bárbaros.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "martial",
        weaponType: "melee",
        properties: ["versatile"],
        mastery: ["topple"],
        damage: {
          primary: { dice: "1d8", damageType: "slashing" },
          versatile: { dice: "1d10", damageType: "slashing" },
        },
      },
    ],
  },
  {
    id: "item-peitoral-de-aco",
    name: "Peitoral de Aço",
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "uncommon",
    weight: { value: 20, unit: "lb" },
    price: { quantity: 400, unit: "GoldPiece" },
    description:
      "Esta armadura consiste em uma placa de metal usada com couro flexível por baixo. Embora deixe os membros vulneráveis, protege os órgãos vitais.",
    armorType: "medium",
    effects: [
      {
        type: "onEquip_setAC",
        calculation: {
          calculation: "formula",
          base: 14,
          attribute: "dexterity",
          maxBonus: 2,
        },
      },
    ],
  },
  {
    id: "item-cota-de-malha",
    name: "Cota de Malha",
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "uncommon",
    weight: { value: 55, unit: "lb" },
    price: { quantity: 75, unit: "GoldPiece" },
    description:
      "Feita de anéis de metal interligados, a cota de malha oferece proteção substancial, mas seu peso e barulho impõem desvantagem em testes de Furtividade.",
    armorType: "heavy",
    requirements: [{ type: "attribute", attribute: "strength", value: 13 }],
    effects: [
      {
        type: "onEquip_setAC",
        calculation: { calculation: "base", value: 16 },
      },
      {
        type: "onEquip_imposeDisadvantage",
        on: "skillCheck",
        skill: "stealth",
      },
    ],
  },
  {
    id: "item-camisao-de-malha",
    name: "Camisão de Malha",
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "common",
    weight: { value: 20, unit: "lb" },
    price: { quantity: 50, unit: "GoldPiece" },
    description:
      "Um camisão de malha que cobre o torso, mas não os braços ou pernas, oferecendo uma proteção modesta.",
    armorType: "medium",
    effects: [
      {
        type: "onEquip_setAC",
        calculation: {
          calculation: "formula",
          base: 13,
          attribute: "dexterity",
          maxBonus: 2,
        },
      },
    ],
  },
  {
    id: "item-clava",
    name: "Clava",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 1, unit: "SilverPiece" },
    description:
      "Um pedaço de madeira pesado, simples mas eficaz como arma de concussão.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "simple",
        weaponType: "melee",
        properties: ["light"],
        mastery: ["slow"],
        damage: {
          primary: { dice: "1d4", damageType: "bludgeoning" },
        },
      },
    ],
  },
  {
    id: "item-adaga",
    name: "Adaga",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 1, unit: "lb" },
    price: { quantity: 2, unit: "GoldPiece" },
    description:
      "Uma faca de lâmina curta, comum entre aventureiros. Possui acuidade e pode ser arremessada.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "simple",
        weaponType: "melee",
        properties: ["finesse", "light", "thrown"],
        mastery: ["nick"],
        damage: {
          primary: { dice: "1d4", damageType: "piercing" },
        },
        range: { normal: 20, long: 60, unit: "ft" },
      },
    ],
  },
  {
    id: "item-dardo",
    name: "Dardo",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 0.25, unit: "lb" },
    price: { quantity: 5, unit: "CooperPiece" },
    description: "Uma pequena e fina arma de arremesso.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "simple",
        weaponType: "ranged",
        properties: ["finesse", "thrown"],
        mastery: ["vex"],
        damage: {
          primary: { dice: "1d4", damageType: "piercing" },
        },
        range: { normal: 20, long: 60, unit: "ft" },
      },
    ],
  },
  {
    id: "item-mangual",
    name: "Mangual",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 10, unit: "GoldPiece" },
    description:
      "Uma arma marcial que consiste em uma cabeça de metal presa a um cabo por uma corrente.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "martial",
        weaponType: "melee",
        properties: [],
        mastery: ["sap"],
        damage: {
          primary: { dice: "1d8", damageType: "bludgeoning" },
        },
      },
    ],
  },
  {
    id: "item-glaive",
    name: "Glaive",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 6, unit: "lb" },
    price: { quantity: 20, unit: "GoldPiece" },
    description:
      "Uma arma de haste marcial com uma lâmina na ponta, conhecida por seu alcance estendido.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "martial",
        weaponType: "melee",
        properties: ["heavy", "reach", "twoHanded"],
        mastery: ["graze"],
        damage: {
          primary: { dice: "1d10", damageType: "slashing" },
        },
      },
    ],
  },
  {
    id: "item-machado-grande",
    name: "Machado Grande",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 7, unit: "lb" },
    price: { quantity: 30, unit: "GoldPiece" },
    description:
      "Uma poderosa arma marcial de duas mãos, capaz de infligir dano massivo.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "martial",
        weaponType: "melee",
        properties: ["heavy", "twoHanded"],
        mastery: ["cleave"],
        damage: {
          primary: { dice: "1d12", damageType: "slashing" },
        },
      },
    ],
  },
  {
    id: "item-clava-grande",
    name: "Clava Grande",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 10, unit: "lb" },
    price: { quantity: 2, unit: "SilverPiece" },
    description:
      "Uma versão maior e mais pesada da clava comum, que precisa ser empunhada com as duas mãos.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "simple",
        weaponType: "melee",
        properties: ["twoHanded"],
        mastery: ["push"],
        damage: {
          primary: { dice: "1d8", damageType: "bludgeoning" },
        },
      },
    ],
  },
  {
    id: "item-espada-grande",
    name: "Espada Grande",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "uncommon",
    weight: { value: 6, unit: "lb" },
    price: { quantity: 50, unit: "GoldPiece" },
    description:
      "Uma espada marcial massiva que deve ser usada com as duas mãos, conhecida por seu potencial de dano devastador.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "martial",
        weaponType: "melee",
        properties: ["heavy", "twoHanded"],
        mastery: ["graze"],
        damage: {
          primary: { dice: "2d6", damageType: "slashing" },
        },
      },
    ],
  },
  {
    id: "item-alabarda",
    name: "Alabarda",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "uncommon",
    weight: { value: 6, unit: "lb" },
    price: { quantity: 20, unit: "GoldPiece" },
    description:
      "Uma arma de haste marcial que combina a ponta de uma lança com a lâmina de um machado, oferecendo alcance estendido.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "martial",
        weaponType: "melee",
        properties: ["heavy", "reach", "twoHanded"],
        mastery: ["cleave"],
        damage: {
          primary: { dice: "1d10", damageType: "slashing" },
        },
      },
    ],
  },
  {
    id: "item-meia-armadura-de-placas",
    name: "Meia Armadura de Placas",
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "rare",
    weight: { value: 40, unit: "lb" },
    price: { quantity: 750, unit: "GoldPiece" },
    description:
      "Composta por placas de metal moldadas que cobrem a maior parte do corpo, esta armadura oferece excelente proteção, mas seu peso e rigidez impõem desvantagem em testes de Furtividade.",
    armorType: "medium",
    effects: [
      {
        type: "onEquip_setAC",
        calculation: {
          calculation: "formula",
          base: 15,
          attribute: "dexterity",
          maxBonus: 2,
        },
      },
      {
        type: "onEquip_imposeDisadvantage",
        on: "skillCheck",
        skill: "stealth",
      },
    ],
  },
  {
    id: "item-besta-de-mao",
    name: "Besta de Mão",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "uncommon",
    weight: { value: 3, unit: "lb" },
    price: { quantity: 75, unit: "GoldPiece" },
    description:
      "Uma besta pequena o suficiente para ser usada com uma mão. É leve, mas requer tempo para recarregar.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "martial",
        weaponType: "ranged",
        properties: ["ammunition", "light", "loading"],
        mastery: ["vex"],
        range: { normal: 30, long: 120, unit: "ft" },
        damage: {
          primary: { dice: "1d6", damageType: "piercing" },
        },
      },
    ],
  },
  {
    id: "item-machadinha",
    name: "Machadinha",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 5, unit: "GoldPiece" },
    description:
      "Um machado leve, simples e versátil, que pode ser usado tanto em combate corpo a corpo quanto arremessado.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "simple",
        weaponType: "melee",
        properties: ["light", "thrown"],
        mastery: ["vex"],
        range: { normal: 20, long: 60, unit: "ft" },
        damage: {
          primary: { dice: "1d6", damageType: "slashing" },
        },
      },
    ],
  },
  {
    id: "item-besta-pesada",
    name: "Besta Pesada",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "uncommon",
    weight: { value: 18, unit: "lb" },
    price: { quantity: 50, unit: "GoldPiece" },
    description:
      "Uma arma de projéteis poderosa e de longo alcance, mas pesada e lenta para recarregar.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "martial",
        weaponType: "ranged",
        properties: ["ammunition", "heavy", "loading", "twoHanded"],
        mastery: ["push"],
        range: { normal: 100, long: 400, unit: "ft" },
        damage: {
          primary: { dice: "1d10", damageType: "piercing" },
        },
      },
    ],
  },
  {
    id: "item-armadura-de-peles",
    name: "Armadura de Peles",
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "common",
    weight: { value: 12, unit: "lb" },
    price: { quantity: 10, unit: "GoldPiece" },
    description:
      "Uma armadura rústica feita de peles e couros grossos de animais.",
    armorType: "medium",
    effects: [
      {
        type: "onEquip_setAC",
        calculation: {
          calculation: "formula",
          base: 12,
          attribute: "dexterity",
          maxBonus: 2,
        },
      },
    ],
  },
  {
    id: "item-azagaia",
    name: "Azagaia",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 5, unit: "SilverPiece" },
    description:
      "Uma lança leve projetada para ser arremessada, mas que também pode ser usada em combate corpo a corpo.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "simple",
        weaponType: "melee",
        properties: ["thrown"],
        mastery: ["slow"],
        range: { normal: 30, long: 120, unit: "ft" },
        damage: {
          primary: { dice: "1d6", damageType: "piercing" },
        },
      },
    ],
  },
  {
    id: "item-lanca-de-justa",
    name: "Lança de Justa",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "uncommon",
    weight: { value: 6, unit: "lb" },
    price: { quantity: 10, unit: "GoldPiece" },
    description:
      "Uma lança longa e pesada, projetada para ser usada em combate montado. Requer duas mãos para ser usada a pé.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "martial",
        weaponType: "melee",
        properties: [
          "reach",
          {
            name: "special",
            condition:
              "Disadvantage to attack targets within 5 feet. Requires two hands unless mounted.",
          },
        ],
        mastery: ["topple"],
        damage: {
          primary: { dice: "1d12", damageType: "piercing" },
        },
      },
    ],
  },
  {
    id: "item-armadura-de-couro",
    name: "Armadura de Couro",
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "common",
    weight: { value: 10, unit: "lb" },
    price: { quantity: 10, unit: "GoldPiece" },
    description:
      "Uma armadura leve feita de couro endurecido em óleo fervente.",
    armorType: "light",
    effects: [
      {
        type: "onEquip_setAC",
        calculation: {
          calculation: "formula",
          base: 11,
          attribute: "dexterity",
        },
      },
    ],
  },
  {
    id: "item-besta-leve",
    name: "Besta Leve",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 5, unit: "lb" },
    price: { quantity: 25, unit: "GoldPiece" },
    description:
      "Uma besta simples e confiável, mais fácil de manejar que sua versão pesada.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "simple",
        weaponType: "ranged",
        properties: ["ammunition", "loading", "twoHanded"],
        mastery: ["slow"],
        range: { normal: 80, long: 320, unit: "ft" },
        damage: {
          primary: { dice: "1d8", damageType: "piercing" },
        },
      },
    ],
  },
  {
    id: "item-martelo-leve",
    name: "Martelo Leve",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 2, unit: "GoldPiece" },
    description: "Um martelo pequeno e balanceado que pode ser arremessado.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "simple",
        weaponType: "melee",
        properties: ["light", "thrown"],
        mastery: ["nick"],
        range: { normal: 20, long: 60, unit: "ft" },
        damage: {
          primary: { dice: "1d4", damageType: "bludgeoning" },
        },
      },
    ],
  },
  {
    id: "item-arco-longo",
    name: "Arco Longo",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "uncommon",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 50, unit: "GoldPiece" },
    description:
      "Um arco marcial grande e poderoso, com um alcance impressionante.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "martial",
        weaponType: "ranged",
        properties: ["ammunition", "heavy", "twoHanded"],
        mastery: ["slow"],
        range: { normal: 150, long: 600, unit: "ft" },
        damage: {
          primary: { dice: "1d8", damageType: "piercing" },
        },
      },
    ],
  },
  {
    id: "item-espada-longa",
    name: "Espada Longa",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 3, unit: "lb" },
    price: { quantity: 15, unit: "GoldPiece" },
    description:
      "Uma espada marcial clássica, que pode ser usada com uma ou duas mãos para maior dano.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "martial",
        weaponType: "melee",
        properties: ["versatile"],
        mastery: ["sap"],
        damage: {
          primary: { dice: "1d8", damageType: "slashing" },
          versatile: { dice: "1d10", damageType: "slashing" },
        },
      },
    ],
  },
  {
    id: "item-maca",
    name: "Maça",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 4, unit: "lb" },
    price: { quantity: 5, unit: "GoldPiece" },
    description:
      "Uma arma de concussão simples, consistindo de uma cabeça de metal em um cabo.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "simple",
        weaponType: "melee",
        properties: [],
        mastery: ["sap"],
        damage: {
          primary: { dice: "1d6", damageType: "bludgeoning" },
        },
      },
    ],
  },
  {
    id: "item-malho",
    name: "Malho",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "uncommon",
    weight: { value: 10, unit: "lb" },
    price: { quantity: 10, unit: "GoldPiece" },
    description:
      "Um martelo de guerra massivo de duas mãos, projetado para esmagar armaduras e ossos.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "martial",
        weaponType: "melee",
        properties: ["heavy", "twoHanded"],
        mastery: ["topple"],
        damage: {
          primary: { dice: "2d6", damageType: "bludgeoning" },
        },
      },
    ],
  },
  {
    id: "item-estrela-da-manha",
    name: "Estrela-d'alva",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 4, unit: "lb" },
    price: { quantity: 15, unit: "GoldPiece" },
    description:
      "Uma arma marcial que combina a força de uma maça com uma cabeça cravejada de espinhos para perfurar.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "martial",
        weaponType: "melee",
        properties: [],
        mastery: ["sap"],
        damage: {
          primary: { dice: "1d8", damageType: "piercing" },
        },
      },
    ],
  },
  {
    id: "item-mosquete",
    name: "Mosquete",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "uncommon",
    weight: { value: 10, unit: "lb" },
    price: { quantity: 500, unit: "GoldPiece" },
    description:
      "Uma arma de fogo marcial, de longo alcance, mas barulhenta e lenta para recarregar.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "martial",
        weaponType: "ranged",
        properties: ["ammunition", "loading", "twoHanded"],
        mastery: ["slow"],
        range: { normal: 40, long: 120, unit: "ft" },
        damage: {
          primary: { dice: "1d12", damageType: "piercing" },
        },
      },
    ],
  },
  {
    id: "item-armadura-acolchoada",
    name: "Armadura Acolchoada",
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "common",
    weight: { value: 8, unit: "lb" },
    price: { quantity: 5, unit: "GoldPiece" },
    description:
      "Uma armadura leve feita de camadas de tecido acolchoado. Oferece proteção mínima e impõe desvantagem em testes de Furtividade.",
    armorType: "light",
    effects: [
      {
        type: "onEquip_setAC",
        calculation: {
          calculation: "formula",
          base: 11,
          attribute: "dexterity",
        },
      },
      {
        type: "onEquip_imposeDisadvantage",
        on: "skillCheck",
        skill: "stealth",
      },
    ],
  },
  {
    id: "item-pique",
    name: "Pique",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "uncommon",
    weight: { value: 18, unit: "lb" },
    price: { quantity: 5, unit: "GoldPiece" },
    description:
      "Uma lança marcial extremamente longa, usada por formações de infantaria para manter o inimigo à distância.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "martial",
        weaponType: "melee",
        properties: ["heavy", "reach", "twoHanded"],
        mastery: ["push"],
        damage: {
          primary: { dice: "1d10", damageType: "piercing" },
        },
      },
    ],
  },
  {
    id: "item-pistola",
    name: "Pistola",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "uncommon",
    weight: { value: 3, unit: "lb" },
    price: { quantity: 250, unit: "GoldPiece" },
    description:
      "Uma arma de fogo marcial de uma mão, com menor alcance mas mais fácil de recarregar que um mosquete.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "martial",
        weaponType: "ranged",
        properties: ["ammunition", "loading"],
        mastery: ["vex"],
        range: { normal: 30, long: 90, unit: "ft" },
        damage: {
          primary: { dice: "1d10", damageType: "piercing" },
        },
      },
    ],
  },
  {
    id: "item-armadura-de-placas",
    name: "Armadura de Placas",
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "veryRare",
    weight: { value: 65, unit: "lb" },
    price: { quantity: 1500, unit: "GoldPiece" },
    description:
      "O auge da proteção pessoal, esta armadura consiste em placas de metal moldadas para cobrir todo o corpo. Requer força considerável para ser usada e impõe desvantagem em testes de Furtividade.",
    armorType: "heavy",
    requirements: [{ type: "attribute", attribute: "strength", value: 15 }],
    effects: [
      {
        type: "onEquip_setAC",
        calculation: { calculation: "base", value: 18 },
      },
      {
        type: "onEquip_imposeDisadvantage",
        on: "skillCheck",
        skill: "stealth",
      },
    ],
  },
  {
    id: "item-bordao",
    name: "Bordão",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 4, unit: "lb" },
    price: { quantity: 2, unit: "SilverPiece" },
    description:
      "Um cajado de madeira simples, mas versátil, que pode ser usado com uma ou duas mãos.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "simple",
        weaponType: "melee",
        properties: ["versatile"],
        mastery: ["topple"],
        damage: {
          primary: { dice: "1d6", damageType: "bludgeoning" },
          versatile: { dice: "1d8", damageType: "bludgeoning" },
        },
      },
    ],
  },
  {
    id: "item-rapieira",
    name: "Rapieira",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 25, unit: "GoldPiece" },
    description:
      "Uma espada marcial fina e pontiaguda, ideal para estocadas precisas.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "martial",
        weaponType: "melee",
        properties: ["finesse"],
        mastery: ["vex"],
        damage: {
          primary: { dice: "1d8", damageType: "piercing" },
        },
      },
    ],
  },
  {
    id: "item-armadura-de-aneis",
    name: "Armadura de Anéis",
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "uncommon",
    weight: { value: 40, unit: "lb" },
    price: { quantity: 30, unit: "GoldPiece" },
    description:
      "Uma armadura pesada feita de anéis de metal costurados em um suporte de couro. É inferior à cota de malha e impõe desvantagem em testes de Furtividade.",
    armorType: "heavy",
    effects: [
      {
        type: "onEquip_setAC",
        calculation: { calculation: "base", value: 14 },
      },
      {
        type: "onEquip_imposeDisadvantage",
        on: "skillCheck",
        skill: "stealth",
      },
    ],
  },
  {
    id: "item-armadura-de-escamas",
    name: "Armadura de Escamas",
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "uncommon",
    weight: { value: 45, unit: "lb" },
    price: { quantity: 50, unit: "GoldPiece" },
    description:
      "Esta armadura consiste em um casaco de couro com pequenas escamas de metal sobrepostas. Impõe desvantagem em testes de Furtividade.",
    armorType: "medium",
    effects: [
      {
        type: "onEquip_setAC",
        calculation: {
          calculation: "formula",
          base: 14,
          attribute: "dexterity",
          maxBonus: 2,
        },
      },
      {
        type: "onEquip_imposeDisadvantage",
        on: "skillCheck",
        skill: "stealth",
      },
    ],
  },
  {
    id: "item-cimitarra",
    name: "Cimitarra",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 3, unit: "lb" },
    price: { quantity: 25, unit: "GoldPiece" },
    description: "Uma espada marcial de lâmina curva, leve e precisa.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "martial",
        weaponType: "melee",
        properties: ["finesse", "light"],
        mastery: ["nick"],
        damage: {
          primary: { dice: "1d6", damageType: "slashing" },
        },
      },
    ],
  },
  {
    id: "item-escudo",
    name: "Escudo",
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "common",
    weight: { value: 6, unit: "lb" },
    price: { quantity: 10, unit: "GoldPiece" },
    description:
      "Um escudo de madeira ou metal, empunhado em uma mão. Empunhar um escudo aumenta sua Classe de Armadura em 2. Você só pode se beneficiar de um escudo por vez.",
    armorType: "shield",
    effects: [
      {
        type: "onEquip_setAC",
        calculation: { calculation: "bonus", value: 2 },
      },
    ],
  },
  {
    id: "item-arco-curto",
    name: "Arco Curto",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 25, unit: "GoldPiece" },
    description:
      "Um arco simples e leve, ideal para arqueiros que precisam de mobilidade.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "simple",
        weaponType: "ranged",
        properties: ["ammunition", "twoHanded"],
        mastery: ["vex"],
        range: { normal: 80, long: 320, unit: "ft" },
        damage: {
          primary: { dice: "1d6", damageType: "piercing" },
        },
      },
    ],
  },
  {
    id: "item-espada-curta",
    name: "Espada Curta",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 10, unit: "GoldPiece" },
    description:
      "Uma espada marcial leve e precisa, ideal para ataques rápidos.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "martial",
        weaponType: "melee",
        properties: ["finesse", "light"],
        mastery: ["vex"],
        damage: {
          primary: { dice: "1d6", damageType: "piercing" },
        },
      },
    ],
  },
  {
    id: "item-foice-curta",
    name: "Foice Curta",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 1, unit: "GoldPiece" },
    description:
      "Uma arma simples com uma lâmina curva, leve e fácil de manusear.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "simple",
        weaponType: "melee",
        properties: ["light"],
        mastery: ["nick"],
        damage: {
          primary: { dice: "1d4", damageType: "slashing" },
        },
      },
    ],
  },
  {
    id: "item-funda",
    name: "Funda",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 0, unit: "lb" },
    price: { quantity: 1, unit: "SilverPiece" },
    description:
      "Uma arma de arremesso simples que consiste em uma tira de couro para atirar pedras ou balas de funda.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "simple",
        weaponType: "ranged",
        properties: ["ammunition"],
        mastery: ["slow"],
        range: { normal: 30, long: 120, unit: "ft" },
        damage: {
          primary: { dice: "1d4", damageType: "bludgeoning" },
        },
      },
    ],
  },
  {
    id: "item-lanca",
    name: "Lança",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 3, unit: "lb" },
    price: { quantity: 1, unit: "GoldPiece" },
    description:
      "Uma arma simples e versátil, que pode ser usada em combate corpo a corpo com uma ou duas mãos, ou arremessada.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "simple",
        weaponType: "melee",
        properties: ["thrown", "versatile"],
        mastery: ["sap"],
        range: { normal: 20, long: 60, unit: "ft" },
        damage: {
          primary: { dice: "1d6", damageType: "piercing" },
          versatile: { dice: "1d8", damageType: "piercing" },
        },
      },
    ],
  },
  {
    id: "item-armadura-de-talas",
    name: "Armadura de Talas",
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "rare",
    weight: { value: 60, unit: "lb" },
    price: { quantity: 200, unit: "GoldPiece" },
    description:
      "Uma armadura pesada feita de tiras verticais de metal rebitadas a um suporte de couro. Requer força considerável e impõe desvantagem em testes de Furtividade.",
    armorType: "heavy",
    requirements: [{ type: "attribute", attribute: "strength", value: 15 }],
    effects: [
      {
        type: "onEquip_setAC",
        calculation: { calculation: "base", value: 17 },
      },
      {
        type: "onEquip_imposeDisadvantage",
        on: "skillCheck",
        skill: "stealth",
      },
    ],
  },
  {
    id: "item-armadura-de-couro-batido",
    name: "Armadura de Couro Batido",
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "common",
    weight: { value: 13, unit: "lb" },
    price: { quantity: 45, unit: "GoldPiece" },
    description:
      "Uma armadura leve feita de couro resistente, reforçada com rebites ou cravos.",
    armorType: "light",
    effects: [
      {
        type: "onEquip_setAC",
        calculation: {
          calculation: "formula",
          base: 12,
          attribute: "dexterity",
        },
      },
    ],
  },
  {
    id: "item-tridente",
    name: "Tridente",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 4, unit: "lb" },
    price: { quantity: 5, unit: "GoldPiece" },
    description:
      "Uma lança marcial de três pontas, que pode ser usada em combate corpo a corpo ou arremessada.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "martial",
        weaponType: "melee",
        properties: ["thrown", "versatile"],
        mastery: ["topple"],
        range: { normal: 20, long: 60, unit: "ft" },
        damage: {
          primary: { dice: "1d6", damageType: "piercing" },
          versatile: { dice: "1d8", damageType: "piercing" },
        },
      },
    ],
  },
  {
    id: "item-picareta-de-guerra",
    name: "Picareta de Guerra",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 5, unit: "GoldPiece" },
    description:
      "Uma arma marcial com uma ponta afiada projetada para perfurar armaduras.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "martial",
        weaponType: "melee",
        properties: [],
        mastery: ["sap"],
        damage: {
          primary: { dice: "1d8", damageType: "piercing" },
        },
      },
    ],
  },
  {
    id: "item-martelo-de-guerra",
    name: "Martelo de Guerra",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 15, unit: "GoldPiece" },
    description:
      "Uma arma marcial versátil, com uma cabeça pesada para esmagar e uma ponta para perfurar.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "martial",
        weaponType: "melee",
        properties: ["versatile"],
        mastery: ["push"],
        damage: {
          primary: { dice: "1d8", damageType: "bludgeoning" },
          versatile: { dice: "1d10", damageType: "bludgeoning" },
        },
      },
    ],
  },
  {
    id: "item-chicote",
    name: "Chicote",
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 3, unit: "lb" },
    price: { quantity: 2, unit: "GoldPiece" },
    description:
      "Uma arma marcial que oferece alcance estendido e acuidade, permitindo ataques precisos à distância.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        weaponCategory: "martial",
        weaponType: "melee",
        properties: ["finesse", "reach"],
        mastery: ["slow"],
        damage: {
          primary: { dice: "1d4", damageType: "slashing" },
        },
      },
    ],
  },
] as const;
