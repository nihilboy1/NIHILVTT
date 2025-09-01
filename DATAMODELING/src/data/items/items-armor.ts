import { Item } from "../../domain/item/item.schema";

export const itemsArmor = [
  {
    id: "armor-peitoral-de-aco",
    name: ["Peitoral de Aço", "Breastplate"],
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "uncommon",
    weight: { value: 20, unit: "lb" },
    price: { quantity: 400, unit: "gold" },
    description:
      "Esta armadura consiste em uma placa de metal usada com couro flexível por baixo. Embora deixe os membros vulneráveis, protege os órgãos vitais.",
    effects: [
      {
        type: "onEquip_setAC",
        name: "Peitoral de Aço",
        armorType: "medium",
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
    id: "armor-cota-de-malha",
    name: ["Cota de Malha", "Chain Mail"],
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "uncommon",
    weight: { value: 55, unit: "lb" },
    price: { quantity: 75, unit: "gold" },
    description:
      "Feita de anéis de metal interligados, a cota de malha oferece proteção substancial, mas seu peso e barulho impõem desvantagem em testes de Furtividade.",
    requirements: {
      user: {
        events: [
          {
            type: "hasAttribute",
            comparison: "greaterOrEqual",
            attribute: "strength",
            value: 13,
          },
        ],
      },
    },
    effects: [
      {
        type: "onEquip_setAC",
        name: "Cota de Malha",
        armorType: "heavy",
        calculation: { calculation: "base", value: 16 },
      },
      {
        type: "onEquip_imposeDisadvantage",
        name: "Cota de Malha",
        on: "skillCheck",
        skill: "stealth",
      },
    ],
  },
  {
    id: "armor-camisao-de-malha",
    name: ["Camisão de Malha", "Chain Shirt"],
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "common",
    weight: { value: 20, unit: "lb" },
    price: { quantity: 50, unit: "gold" },
    description:
      "Um camisão de malha que cobre o torso, mas não os braços ou pernas, oferecendo uma proteção modesta.",
    effects: [
      {
        type: "onEquip_setAC",
        name: "Camisão de Malha",
        armorType: "medium",
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
    id: "armor-meia-armadura-de-placas",
    name: ["Meia Armadura de Placas", "Half Plate Armor"],
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "rare",
    weight: { value: 40, unit: "lb" },
    price: { quantity: 750, unit: "gold" },
    description:
      "Composta por placas de metal moldadas que cobrem a maior parte do corpo, esta armadura oferece excelente proteção, mas seu peso e rigidez impõem desvantagem em testes de Furtividade.",
    effects: [
      {
        type: "onEquip_setAC",
        name: "Meia Armadura de Placas",
        armorType: "medium",
        calculation: {
          calculation: "formula",
          base: 15,
          attribute: "dexterity",
          maxBonus: 2,
        },
      },
      {
        type: "onEquip_imposeDisadvantage",
        name: "Meia Armadura de Placas",
        on: "skillCheck",
        skill: "stealth",
      },
    ],
  },
  {
    id: "armor-armadura-de-peles",
    name: ["Armadura de Peles", "Hide Armor"],
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "common",
    weight: { value: 12, unit: "lb" },
    price: { quantity: 10, unit: "gold" },
    description:
      "Uma armadura rústica feita de peles e couros grossos de animais.",
    effects: [
      {
        type: "onEquip_setAC",
        name: "Armadura de Peles",
        armorType: "medium",
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
    id: "armor-armadura-de-couro",
    name: ["Armadura de Couro", "Leather Armor"],
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "common",
    weight: { value: 10, unit: "lb" },
    price: { quantity: 10, unit: "gold" },
    description:
      "Uma armadura leve feita de couro endurecido em óleo fervente.",
    effects: [
      {
        type: "onEquip_setAC",
        name: "Armadura de Couro",
        armorType: "light",
        calculation: {
          calculation: "formula",
          base: 11,
          attribute: "dexterity",
        },
      },
    ],
  },
  {
    id: "armor-armadura-acolchoada",
    name: ["Armadura Acolchoada", "Padded Armor"],
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "common",
    weight: { value: 8, unit: "lb" },
    price: { quantity: 5, unit: "gold" },
    description:
      "Uma armadura leve feita de camadas de tecido acolchoado. Oferece proteção mínima e impõe desvantagem em testes de Furtividade.",
    effects: [
      {
        type: "onEquip_setAC",
        name: "Armadura Acolchoada",
        armorType: "light",
        calculation: {
          calculation: "formula",
          base: 11,
          attribute: "dexterity",
        },
      },
      {
        type: "onEquip_imposeDisadvantage",
        on: "skillCheck",
        name: "Armadura Acolchoada",
        skill: "stealth",
      },
    ],
  },
  {
    id: "armor-armadura-de-placas",
    name: ["Armadura de Placas", "Plate Armor"],
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "veryRare",
    weight: { value: 65, unit: "lb" },
    price: { quantity: 1500, unit: "gold" },
    description:
      "O auge da proteção pessoal, esta armadura consiste em placas de metal moldadas para cobrir todo o corpo. Requer força considerável para ser usada e impõe desvantagem em testes de Furtividade.",
    requirements: {
      user: {
        events: [
          {
            type: "hasAttribute",
            comparison: "greaterOrEqual",
            attribute: "strength",
            value: 15,
          },
        ],
      },
    },
    effects: [
      {
        type: "onEquip_setAC",
        name: "Armadura de Placas",
        armorType: "heavy",
        calculation: { calculation: "base", value: 18 },
      },
      {
        type: "onEquip_imposeDisadvantage",
        name: "Armadura de Placas",
        on: "skillCheck",
        skill: "stealth",
      },
    ],
  },
  {
    id: "armor-armadura-de-aneis",
    name: ["Armadura de Anéis", "Ring Mail"],
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "uncommon",
    weight: { value: 40, unit: "lb" },
    price: { quantity: 30, unit: "gold" },
    description:
      "Uma armadura pesada feita de anéis de metal costurados em um suporte de couro. É inferior à cota de malha e impõe desvantagem em testes de Furtividade.",
    effects: [
      {
        type: "onEquip_setAC",
        name: "Armadura de Anéis",
        armorType: "heavy",
        calculation: { calculation: "base", value: 14 },
      },
      {
        type: "onEquip_imposeDisadvantage",
        name: "Armadura de Anéis",
        on: "skillCheck",
        skill: "stealth",
      },
    ],
  },
  {
    id: "armor-armadura-de-escamas",
    name: ["Armadura de Escamas", "Scale Mail"],
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "uncommon",
    weight: { value: 45, unit: "lb" },
    price: { quantity: 50, unit: "gold" },
    description:
      "Esta armadura consiste em um casaco de couro com pequenas escamas de metal sobrepostas. Impõe desvantagem em testes de Furtividade.",
    effects: [
      {
        type: "onEquip_setAC",
        name: "Armadura de Escamas",
        armorType: "medium",
        calculation: {
          calculation: "formula",
          base: 14,
          attribute: "dexterity",
          maxBonus: 2,
        },
      },
      {
        type: "onEquip_imposeDisadvantage",
        name: "Armadura de Escamas",
        on: "skillCheck",
        skill: "stealth",
      },
    ],
  },
  {
    id: "armor-escudo",
    name: ["Escudo", "Shield"],
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "common",
    weight: { value: 6, unit: "lb" },
    price: { quantity: 10, unit: "gold" },
    description:
      "Um escudo de madeira ou metal, empunhado em uma mão. Empunhar um escudo aumenta sua Classe de Armadura em 2. Você só pode se beneficiar de um escudo por vez.",
    effects: [
      {
        type: "onEquip_setAC",
        name: "Escudo",
        armorType: "shield",
        calculation: { calculation: "bonus", value: 2 },
      },
    ],
  },
  {
    id: "armor-armadura-de-talas",
    name: ["Armadura de Talas", "Splint Armor"],
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "rare",
    weight: { value: 60, unit: "lb" },
    price: { quantity: 200, unit: "gold" },
    description:
      "Uma armadura pesada feita de tiras verticais de metal rebitadas a um suporte de couro. Requer força considerável e impõe desvantagem em testes de Furtividade.",
    requirements: {
      user: {
        events: [
          {
            type: "hasAttribute",
            comparison: "greaterOrEqual",
            attribute: "strength",
            value: 15,
          },
        ],
      },
    },
    effects: [
      {
        type: "onEquip_setAC",
        name: "Armadura de Talas",
        armorType: "heavy",
        calculation: { calculation: "base", value: 17 },
      },
      {
        type: "onEquip_imposeDisadvantage",
        name: "Armadura de Talas",
        on: "skillCheck",
        skill: "stealth",
      },
    ],
  },
  {
    id: "armor-armadura-de-couro-batido",
    name: ["Armadura de Couro Batido", "Studded Leather Armor"],
    source: "LDJ2024",
    page: 219,
    type: "armor",
    rarity: "common",
    weight: { value: 13, unit: "lb" },
    price: { quantity: 45, unit: "gold" },
    description:
      "Uma armadura leve feita de couro resistente, reforçada com rebites ou cravos.",
    effects: [
      {
        type: "onEquip_setAC",
        name: "Armadura de Couro Batido",
        armorType: "light",
        calculation: {
          calculation: "formula",
          base: 12,
          attribute: "dexterity",
        },
      },
    ],
  },
] as const satisfies Item[];

