import {  ItemType } from "../../domain/item/item.schema";

export const itemsWeapon = [
  {
    id: "weapon-machado-de-batalha",
    name: ["Machado de Batalha", "Battleaxe"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 4, unit: "lb" },
    price: { quantity: 10, unit: "gold" },
    description:
      "Uma arma marcial versátil, preferida por guerreiros e bárbaros.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Machado de Batalha",
        weaponType: "martial",
        weaponRange: "melee",
        properties: ["versatile"],
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 8 },
            damageTypeOptions: ["slashing"],
          },
          versatile: {
            type: "damage",
            roll: { count: 1, faces: 10 },
            damageTypeOptions: ["slashing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-clava",
    name: ["Clava", "Club"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 1, unit: "silver" },
    description:
      "Um pedaço de madeira leve, simples mas eficaz como arma de concussão.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Clava",
        weaponType: "simple",
        weaponRange: "melee",
        properties: ["light"],
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 4 },
            damageTypeOptions: ["bludgeoning"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-adaga",
    name: ["Adaga", "Dagger"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 1, unit: "lb" },
    price: { quantity: 2, unit: "gold" },
    description:
      "Uma faca de lâmina curta, comum entre aventureiros. Possui acuidade e pode ser arremessada.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Adaga",
        weaponType: "simple",
        weaponRange: "melee",
        properties: ["light", "thrown"],
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 4 },
            damageTypeOptions: ["piercing"],
          },
        },
        range: { normal: 20, long: 60, unit: "ft" },
      },
    ],
  },
  {
    id: "weapon-dardo",
    name: ["Dardo", "Dart"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 0.25, unit: "lb" },
    price: { quantity: 5, unit: "copper" },
    description: "Uma pequena e fina arma de arremesso.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Dardo",
        weaponType: "simple",
        weaponRange: "ranged",
        properties: ["finesse", "thrown"],
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 4 },
            damageTypeOptions: ["piercing"],
          },
        },
        range: { normal: 20, long: 60, unit: "ft" },
      },
    ],
  },
  {
    id: "weapon-mangual",
    name: ["Mangual", "Flail"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 10, unit: "gold" },
    description:
      "Uma arma marcial que consiste em uma cabeça de metal presa a um cabo por uma corrente.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Mangual",
        weaponType: "martial",
        weaponRange: "melee",
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 8 },
            damageTypeOptions: ["bludgeoning"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-glaive",
    name: ["Glaive", "Glaive"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 6, unit: "lb" },
    price: { quantity: 20, unit: "gold" },
    description:
      "Uma arma de haste marcial com uma lâmina na ponta, conhecida por seu alcance estendido.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Glaive",
        weaponType: "martial",
        weaponRange: "melee",
        properties: ["heavy", "reach", "twoHanded"],
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 10 },
            damageTypeOptions: ["slashing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-machado-grande",
    name: ["Machado Grande", "Greataxe"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 7, unit: "lb" },
    price: { quantity: 30, unit: "gold" },
    description:
      "Uma poderosa arma marcial de duas mãos, capaz de infligir dano massivo.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Machado Grande",
        weaponType: "martial",
        weaponRange: "melee",
        properties: ["heavy", "twoHanded"],
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 12 },
            damageTypeOptions: ["slashing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-clava-grande",
    name: ["Clava Grande", "Greatclub"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 10, unit: "lb" },
    price: { quantity: 2, unit: "silver" },
    description:
      "Uma versão maior e mais pesada da clava comum, que precisa ser empunhada com as duas mãos.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Clava Grande",
        weaponType: "simple",
        weaponRange: "melee",
        properties: ["twoHanded"],
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 8 },
            damageTypeOptions: ["bludgeoning"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-espada-grande",
    name: ["Espada Grande", "Greatsword"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "uncommon",
    weight: { value: 6, unit: "lb" },
    price: { quantity: 50, unit: "gold" },
    description:
      "Uma espada marcial massiva que deve ser usada com as duas mãos, conhecida por seu potencial de dano devastador.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Espada Grande",
        weaponType: "martial",
        weaponRange: "melee",
        properties: ["heavy", "twoHanded"],
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 2, faces: 6 },
            damageTypeOptions: ["slashing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-alabarda",
    name: ["Alabarda", "Halberd"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "uncommon",
    weight: { value: 6, unit: "lb" },
    price: { quantity: 20, unit: "gold" },
    description:
      "Uma arma de haste marcial que combina a ponta de uma lança com a lâmina de um machado, oferecendo alcance estendido.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Alabarda",
        weaponType: "martial",
        weaponRange: "melee",
        properties: ["heavy", "reach", "twoHanded"],
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 10 },
            damageTypeOptions: ["slashing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-besta-de-mao",
    name: ["Besta de Mão", "Hand Crossbow"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "uncommon",
    weight: { value: 3, unit: "lb" },
    price: { quantity: 75, unit: "gold" },
    description:
      "Uma besta pequena o suficiente para ser usada com uma mão. É leve, mas requer tempo para recarregar.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Besta de Mão",
        weaponType: "martial",
        weaponRange: "ranged",
        properties: ["ammunition", "light", "loading"],
        range: { normal: 30, long: 120, unit: "ft" },
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 6 },
            damageTypeOptions: ["piercing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-machadinha",
    name: ["Machadinha", "Handaxe"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 5, unit: "gold" },
    description:
      "Um machado leve, simples e versátil, que pode ser usado tanto em combate corpo a corpo quanto arremessado.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Machadinha",
        weaponType: "simple",
        weaponRange: "melee",
        properties: ["light", "thrown"],
        range: { normal: 20, long: 60, unit: "ft" },
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 6 },
            damageTypeOptions: ["slashing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-besta-pesada",
    name: ["Besta Pesada", "Heavy Crossbow"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "uncommon",
    weight: { value: 18, unit: "lb" },
    price: { quantity: 50, unit: "gold" },
    description:
      "Uma arma de projéteis poderosa e de longo alcance, mas pesada e lenta para recarregar.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Besta Pesada",
        weaponType: "martial",
        weaponRange: "ranged",
        properties: ["ammunition", "heavy", "loading", "twoHanded"],
        range: { normal: 100, long: 400, unit: "ft" },
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 10 },
            damageTypeOptions: ["piercing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-azagaia",
    name: ["Azagaia", "Javelin"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 5, unit: "silver" },
    description:
      "Uma lança leve projetada para ser arremessada, mas que também pode ser usada em combate corpo a corpo.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Azagaia",
        weaponType: "simple",
        weaponRange: "melee",
        properties: ["thrown"],
        range: { normal: 30, long: 120, unit: "ft" },
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 6 },
            damageTypeOptions: ["piercing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-besta-leve",
    name: ["Besta Leve", "Light Crossbow"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 5, unit: "lb" },
    price: { quantity: 25, unit: "gold" },
    description:
      "Uma besta simples e confiável, mais fácil de manejar que sua versão pesada.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Besta Leve",
        weaponType: "simple",
        weaponRange: "ranged",
        properties: ["ammunition", "loading", "twoHanded"],
        range: { normal: 80, long: 320, unit: "ft" },
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 8 },
            damageTypeOptions: ["piercing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-martelo-leve",
    name: ["Martelo Leve", "Light Hammer"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 2, unit: "gold" },
    description: "Um martelo pequeno e balanceado que pode ser arremessado.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Martelo Leve",
        weaponType: "simple",
        weaponRange: "melee",
        properties: ["light", "thrown"],
        range: { normal: 20, long: 60, unit: "ft" },
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 4 },
            damageTypeOptions: ["bludgeoning"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-arco-longo",
    name: ["Arco Longo", "Longbow"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "uncommon",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 50, unit: "gold" },
    description:
      "Um arco marcial grande e poderoso, com um alcance impressionante.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Arco Longo",
        weaponType: "martial",
        weaponRange: "ranged",
        properties: ["ammunition", "heavy", "twoHanded"],
        range: { normal: 150, long: 600, unit: "ft" },
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 8 },
            damageTypeOptions: ["piercing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-espada-longa",
    name: ["Espada Longa", "Longsword"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 3, unit: "lb" },
    price: { quantity: 15, unit: "gold" },
    description:
      "Uma espada marcial clássica, que pode ser usada com uma ou duas mãos para maior dano.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Espada Longa",
        weaponType: "martial",
        weaponRange: "melee",
        properties: ["versatile"],
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 8 },
            damageTypeOptions: ["slashing"],
          },
          versatile: {
            type: "damage",
            roll: { count: 1, faces: 10 },
            damageTypeOptions: ["slashing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-maca",
    name: ["Maça", "Mace"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 4, unit: "lb" },
    price: { quantity: 5, unit: "gold" },
    description:
      "Uma arma de concussão simples, consistindo de uma cabeça de metal em um cabo.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Maça",
        weaponType: "simple",
        weaponRange: "melee",
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 6 },
            damageTypeOptions: ["bludgeoning"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-malho",
    name: ["Malho", "Maul"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "uncommon",
    weight: { value: 10, unit: "lb" },
    price: { quantity: 10, unit: "gold" },
    description:
      "Um martelo de guerra massivo de duas mãos, projetado para esmagar armaduras e ossos.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Malho",
        weaponType: "martial",
        weaponRange: "melee",
        properties: ["heavy", "twoHanded"],
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 2, faces: 6 },
            damageTypeOptions: ["bludgeoning"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-estrela-da-manha",
    name: ["Estrela-d'alva", "Morningstar"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 4, unit: "lb" },
    price: { quantity: 15, unit: "gold" },
    description:
      "Uma arma marcial que combina a força de uma maça com uma cabeça cravejada de espinhos para perfurar.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Estrela-d'alva",
        weaponType: "martial",
        weaponRange: "melee",
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 8 },
            damageTypeOptions: ["piercing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-mosquete",
    name: ["Mosquete", "Musket"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "uncommon",
    weight: { value: 10, unit: "lb" },
    price: { quantity: 500, unit: "gold" },
    description:
      "Uma arma de fogo marcial, de longo alcance, mas barulhenta e lenta para recarregar.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Mosquete",
        weaponType: "martial",
        weaponRange: "ranged",
        properties: ["ammunition", "loading", "twoHanded"],
        range: { normal: 40, long: 120, unit: "ft" },
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 12 },
            damageTypeOptions: ["piercing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-pique",
    name: ["Pique", "Pike"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "uncommon",
    weight: { value: 18, unit: "lb" },
    price: { quantity: 5, unit: "gold" },
    description:
      "Uma lança marcial extremamente longa, usada por formações de infantaria para manter o inimigo à distância.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Pique",
        weaponType: "martial",
        weaponRange: "melee",
        properties: ["heavy", "reach", "twoHanded"],
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 10 },
            damageTypeOptions: ["piercing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-pistola",
    name: ["Pistola", "Pistol"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "uncommon",
    weight: { value: 3, unit: "lb" },
    price: { quantity: 250, unit: "gold" },
    description:
      "Uma arma de fogo marcial de uma mão, com menor alcance mas mais fácil de recarregar que um mosquete.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Pistola",
        weaponType: "martial",
        weaponRange: "ranged",
        properties: ["ammunition", "loading"],
        range: { normal: 30, long: 90, unit: "ft" },
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 10 },
            damageTypeOptions: ["piercing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-bordao",
    name: ["Bordão", "Quarterstaff"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 4, unit: "lb" },
    price: { quantity: 2, unit: "silver" },
    description:
      "Um cajado de madeira simples, mas versátil, que pode ser usado com uma ou duas mãos.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Bordão",
        weaponType: "simple",
        weaponRange: "melee",
        properties: ["versatile"],
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 6 },
            damageTypeOptions: ["bludgeoning"],
          },
          versatile: {
            type: "damage",
            roll: { count: 1, faces: 8 },
            damageTypeOptions: ["bludgeoning"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-rapieira",
    name: ["Rapieira", "Rapier"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 25, unit: "gold" },
    description:
      "Uma espada marcial fina e pontiaguda, ideal para estocadas precisas.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Rapieira",
        weaponType: "martial",
        weaponRange: "melee",
        properties: ["finesse"],
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 8 },
            damageTypeOptions: ["piercing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-cimitarra",
    name: ["Cimitarra", "Scimitar"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 3, unit: "lb" },
    price: { quantity: 25, unit: "gold" },
    description: "Uma espada marcial de lâmina curva, leve e precisa.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Cimitarra",
        weaponType: "martial",
        weaponRange: "melee",
        properties: ["finesse", "light"],
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 6 },
            damageTypeOptions: ["slashing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-arco-curto",
    name: ["Arco Curto", "Shortbow"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 25, unit: "gold" },
    description:
      "Um arco simples e leve, ideal para arqueiros que precisam de mobilidade.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Arco Curto",
        weaponType: "simple",
        weaponRange: "ranged",
        properties: ["ammunition", "twoHanded"],
        range: { normal: 80, long: 320, unit: "ft" },
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 6 },
            damageTypeOptions: ["piercing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-espada-curta",
    name: ["Espada Curta", "Shortsword"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 10, unit: "gold" },
    description:
      "Uma espada marcial leve e precisa, ideal para ataques rápidos.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Espada Curta",
        weaponType: "martial",
        weaponRange: "melee",
        properties: ["finesse", "light"],
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 6 },
            damageTypeOptions: ["piercing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-foice-curta",
    name: ["Foice Curta", "Sickle"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 1, unit: "gold" },
    description:
      "Uma arma simples com uma lâmina curva, leve e fácil de manusear.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Foice Curta",
        weaponType: "simple",
        weaponRange: "melee",
        properties: ["light"],
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 4 },
            damageTypeOptions: ["slashing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-funda",
    name: ["Funda", "Sling"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 0, unit: "lb" },
    price: { quantity: 1, unit: "silver" },
    description:
      "Uma arma de arremesso simples que consiste em uma tira de couro para atirar pedras ou balas de funda.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Funda",
        weaponType: "simple",
        weaponRange: "ranged",
        properties: ["ammunition"],
        range: { normal: 30, long: 120, unit: "ft" },
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 4 },
            damageTypeOptions: ["bludgeoning"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-lanca",
    name: ["Lança", "Spear"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 3, unit: "lb" },
    price: { quantity: 1, unit: "gold" },
    description:
      "Uma arma simples e versátil, que pode ser usada em combate corpo a corpo com uma ou duas mãos, ou arremessada.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Lança",
        weaponType: "simple",
        weaponRange: "melee",
        properties: ["thrown", "versatile"],
        range: { normal: 20, long: 60, unit: "ft" },
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 6 },
            damageTypeOptions: ["piercing"],
          },
          versatile: {
            type: "damage",
            roll: { count: 1, faces: 8 },
            damageTypeOptions: ["piercing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-tridente",
    name: ["Tridente", "Trident"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 4, unit: "lb" },
    price: { quantity: 5, unit: "gold" },
    description:
      "Uma lança marcial de três pontas, que pode ser usada em combate corpo a corpo ou arremessada.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Tridente",
        weaponType: "martial",
        weaponRange: "melee",
        properties: ["thrown", "versatile"],
        range: { normal: 20, long: 60, unit: "ft" },
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 6 },
            damageTypeOptions: ["piercing"],
          },
          versatile: {
            type: "damage",
            roll: { count: 1, faces: 8 },
            damageTypeOptions: ["piercing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-picareta-de-guerra",
    name: ["Picareta de Guerra", "War Pick"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 5, unit: "gold" },
    description:
      "Uma arma marcial com uma ponta afiada projetada para perfurar armaduras.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Picareta de Guerra",
        weaponType: "martial",
        weaponRange: "melee",
        properties: ["versatile"],
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 8 },
            damageTypeOptions: ["piercing"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-martelo-de-guerra",
    name: ["Martelo de Guerra", "Warhammer"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 15, unit: "gold" },
    description:
      "Uma arma marcial versátil, com uma cabeça pesada para esmagar e uma ponta para perfurar.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Martelo de Guerra",
        weaponType: "martial",
        weaponRange: "melee",
        properties: ["versatile"],
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 8 },
            damageTypeOptions: ["bludgeoning"],
          },
          versatile: {
            type: "damage",
            roll: { count: 1, faces: 10 },
            damageTypeOptions: ["bludgeoning"],
          },
        },
      },
    ],
  },
  {
    id: "weapon-chicote",
    name: ["Chicote", "Whip"],
    source: "LDJ2024",
    page: 215,
    type: "weapon",
    rarity: "common",
    weight: { value: 3, unit: "lb" },
    price: { quantity: 2, unit: "gold" },
    description:
      "Uma arma marcial que oferece alcance estendido e acuidade, permitindo ataques precisos à distância.",
    effects: [
      {
        type: "onWield_grantWeaponAttack",
        name: "Chicote",
        weaponType: "martial",
        weaponRange: "melee",
        properties: ["finesse", "reach"],
        damageFormulas: {
          primary: {
            type: "damage",
            roll: { count: 1, faces: 4 },
            damageTypeOptions: ["slashing"],
          },
        },
      },
    ],
  },
] as const satisfies ItemType[];
