import { Item } from "../../domain/item/item.schema";

export const itemsTool = [
  {
    id: "tool-alchemists-supplies",
    name: ["Suprimentos de Alquimista", "Alchemist's Supplies"],
    source: "LDJ2024",
    page: 221,
    type: "tool",
    rarity: "common",
    weight: { value: 8, unit: "lb" },
    price: { quantity: 50, unit: "gold" },
    description:
      "Inclui recipientes de vidro e ingredientes para preparar poções e compostos alquímicos. Proficiência: testes de criar/analisar substâncias.",
    effects: [
      {
        type: "passive_providesBonus",
        name: "Suprimentos de Alquimista",
        on: "action",
        appliesToActions: ["act-use-object"],
        value: "proficiency",
      },
    ],
  },
  {
    id: "tool-artisans-tools",
    name: ["Ferramentas de Artesão", "Artisan's Tools"],
    source: "LDJ2024",
    page: 221,
    type: "tool",
    rarity: "common",
    weight: { value: 5, unit: "lb" },
    price: { quantity: 15, unit: "gold" },
    description:
      "Conjunto genérico que cobre ferramentas de vários ofícios (ferreiro, carpinteiro, sapateiro, joalheiro, etc.).",
    effects: [
      {
        type: "passive_providesBonus",
        name: "Ferramentas de Artesão",
        on: "action",
        appliesToActions: ["act-use-object"],
        value: "proficiency",
      },
    ],
  },
  {
    id: "tool-calligraphers-supplies",
    name: ["Suprimentos de Calígrafo", "Calligrapher's Supplies"],
    source: "LDJ2024",
    page: 221,
    type: "tool",
    rarity: "common",
    weight: { value: 5, unit: "lb" },
    price: { quantity: 10, unit: "gold" },
    description:
      "Papel de qualidade, penas e tintas refinadas para escrita artística e documentos formais. Proficiência: testes de caligrafia e documentos oficiais.",
    effects: [
      {
        type: "passive_providesBonus",
        name: "Suprimentos de Calígrafo",
        on: "action",
        appliesToActions: ["act-use-object"],
        value: "proficiency",
      },
    ],
  },
  {
    id: "tool-cooks-utensils",
    name: ["Utensílios de Cozinheiro", "Cook's Utensils"],
    source: "LDJ2024",
    page: 221,
    type: "tool",
    rarity: "common",
    weight: { value: 8, unit: "lb" },
    price: { quantity: 1, unit: "gold" },
    description:
      "Panelas, frigideiras, cutelo, conchas e outros apetrechos de cozinha. Proficiência: testes de cozinhar e criar refeições especiais.",
    effects: [
      {
        type: "passive_providesBonus",
        name: "Utensílios de Cozinheiro",
        on: "action",
        appliesToActions: ["act-use-object"],
        value: "proficiency",
      },
    ],
  },
  {
    id: "tool-carpenters-tools",
    name: ["Ferramentas de Carpinteiro", "Carpenter's Tools"],
    source: "LDJ2024",
    page: 221,
    type: "tool",
    rarity: "common",
    weight: { value: 6, unit: "lb" },
    price: { quantity: 8, unit: "gold" },
    description:
      "Inclui serras, martelos, pregos, plainas e outros instrumentos usados para trabalhar madeira. Proficiência: testes de construir, reparar ou identificar estruturas e objetos de madeira.",
    effects: [
      {
        type: "passive_providesBonus",
        name: "Ferramentas de Carpinteiro",
        on: "action",
        appliesToActions: ["act-use-object"],
        value: "proficiency",
      },
    ],
  },
  {
    id: "tool-cartographers-tools",
    name: ["Ferramentas de Cartógrafo", "Cartographer's Tools"],
    source: "LDJ2024",
    page: 221,
    type: "tool",
    rarity: "common",
    weight: { value: 6, unit: "lb" },
    price: { quantity: 15, unit: "gold" },
    description:
      "Inclui bússolas, escalas, pergaminhos, tinta e instrumentos para desenhar mapas. Proficiência: testes de navegação, leitura ou elaboração de mapas, e identificação de terrenos.",
    effects: [
      {
        type: "passive_providesBonus",
        name: "Ferramentas de Cartógrafo",
        on: "action",
        appliesToActions: ["act-use-object"],
        value: "proficiency",
      },
    ],
  },
  {
    id: "tool-navigators-tools",
    name: ["Ferramentas de Navegador", "Navigator's Tools"],
    source: "LDJ2024",
    page: 221,
    type: "tool",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 25, unit: "gold" },
    description:
      "Inclui bússola, mapas náuticos, réguas e instrumentos de navegação marítima. Proficiência: testes de navegação em mar aberto, leitura de estrelas e orientação em viagens.",
    effects: [
      {
        type: "passive_providesBonus",
        name: "Ferramentas de Navegador",
        on: "action",
        appliesToActions: ["act-use-object"],
        value: "proficiency",
      },
    ],
  },

  {
    id: "tool-disguise-kit",
    name: ["Kit de Disfarce", "Disguise Kit"],
    source: "LDJ2024",
    page: 221,
    type: "tool",
    rarity: "common",
    weight: { value: 3, unit: "lb" },
    price: { quantity: 25, unit: "gold" },
    description:
      "Cosméticos, tintas e acessórios para alterar a aparência física. Proficiência: testes de criar disfarces.",
    effects: [
      {
        type: "passive_providesBonus",
        name: "Kit de Disfarce",
        on: "action",
        appliesToActions: ["act-deceive", "act-use-object"],
        value: "proficiency",
      },
    ],
  },
  {
    id: "tool-forgery-kit",
    name: ["Kit de Falsificação", "Forgery Kit"],
    source: "LDJ2024",
    page: 221,
    type: "tool",
    rarity: "common",
    weight: { value: 5, unit: "lb" },
    price: { quantity: 15, unit: "gold" },
    description:
      "Inclui papéis, penas, tintas e selos para criar documentos convincentes. Proficiência: testes de falsificação.",
    effects: [
      {
        type: "passive_providesBonus",
        name: "Kit de Falsificação",
        on: "action",
        appliesToActions: ["act-deceive", "act-use-object"],
        value: "proficiency",
      },
    ],
  },
  {
    id: "tool-herbalism-kit",
    name: ["Kit de Herbalismo", "Herbalism Kit"],
    source: "LDJ2024",
    page: 221,
    type: "tool",
    rarity: "common",
    weight: { value: 3, unit: "lb" },
    price: { quantity: 5, unit: "gold" },
    description:
      "Almofariz, frascos e instrumentos para criar remédios e poções. Proficiência: testes de identificar/aplicar ervas.",
    effects: [
      {
        type: "passive_providesBonus",
        name: "Kit de Herbalismo",
        on: "action",
        appliesToActions: ["act-use-object"],
        value: "proficiency",
      },
    ],
  },
  {
    id: "tool-poisoners-kit",
    name: ["Kit de Envenenador", "Poisoner's Kit"],
    source: "LDJ2024",
    page: 221,
    type: "tool",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 50, unit: "gold" },
    description:
      "Frascos e produtos químicos para criação de venenos. Proficiência: testes de fabricar, aplicar ou identificar venenos.",
    effects: [
      {
        type: "passive_providesBonus",
        name: "Kit de Envenenador",
        on: "action",
        appliesToActions: ["act-use-object", "act-apply-effect"],
        value: "proficiency",
      },
    ],
  },
  {
    id: "tool-gaming-set",
    name: ["Conjunto de Jogos", "Gaming Set"],
    source: "LDJ2024",
    page: 222,
    type: "tool",
    rarity: "common",
    weight: { value: 0.1, unit: "lb" },
    price: { quantity: 5, unit: "silver" },
    description:
      "Inclui baralho de cartas, dados ou outros jogos populares. Proficiência: testes relacionados a jogos de azar.",
    effects: [
      {
        type: "passive_providesBonus",
        name: "Conjunto de Jogos",
        on: "action",
        appliesToActions: ["act-use-object"],
        value: "proficiency",
      },
    ],
  },
  {
    id: "tool-musical-instrument",
    name: ["Instrumento Musical", "Musical Instrument"],
    source: "LDJ2024",
    page: 222,
    type: "tool",
    rarity: "common",
    weight: { value: 2, unit: "lb" },
    price: { quantity: 5, unit: "gold" },
    description:
      "Pode ser flauta, alaúde, tambor ou outro instrumento musical. Proficiência: testes de tocar, entreter ou compor música.",
    effects: [
      {
        type: "passive_providesBonus",
        name: "Instrumento Musical",
        on: "action",
        appliesToActions: ["act-use-object"],
        value: "proficiency",
      },
    ],
  },
  {
    id: "tool-thieves-tools",
    name: ["Ferramentas de Ladrão", "Thieves' Tools"],
    source: "LDJ2024",
    page: 221,
    type: "tool",
    rarity: "common",
    weight: { value: 1, unit: "lb" },
    price: { quantity: 25, unit: "gold" },
    description:
      "Inclui gazuas, pequenos espelhos e alicates. Proficiência: testes de abrir fechaduras ou desarmar armadilhas.",
    effects: [
      {
        type: "passive_providesBonus",
        name: "Ferramentas de Ladrão",
        on: "action",
        appliesToActions: ["act-disarm-trap", "act-pick-lock"],
        value: "proficiency",
      },
    ],
  },
  {
    id: "tool-healers-kit",
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
        actionId: "act-utilize",
        name: "Usar Kit de Curandeiro",
        parameters: {
          charges: { type: "static", amount: 10, max: 10 },
          activation: {
            type: "action",
            extraCost: {
              amount: 1,
              source: "item",
              resourceType: "charge",
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
] as const satisfies Item[];
