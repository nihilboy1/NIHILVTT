import { SummonedTokenType } from "../../domain/token/token.schema";

export const SummonedTokensData: SummonedTokenType[] = [
  {
    id: "token-hunting-trap-armed",
    name: "Armadilha de Caça (Armada)",
    description: "Uma armadilha de aço que se fecha ao ser pisada.",
    effects: [
      {
        type: "triggeredEffect",
        name: "Armadilha de Caça (Armada)",
        triggers: { events: [{ type: "enteredArea" }] },
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
    capabilities: {
      controllable: false,
      autonomous: false,
      physical: true,
    },
  },
  {
    id: "token-dancing-lights",
    name: "Luzes Dançantes",
    description: "Luzes dançantes",
    effects: [
      {
        type: "passive_providesLight",
        name: "Luzes Dançantes",
        properties: {
          dim: 10,
          duration: { isConcentration: true, unit: "minute", value: 1 },
        },
        endConditions: {
          events: [
            { type: "isFarFromCaster", distance: { unit: "ft", normal: 120 } },
          ],
        },
      },
    ],
    capabilities: {
      controllable: true,
      autonomous: false,
      physical: false,
    },
  },
  {
    id: "token-magic-hand",
    name: "Mão Mágica",
    description:
      "Uma mão espectral e flutuante que obedece a comandos simples. Não pode atacar, ativar itens mágicos ou carregar mais de 10 libras.",
    effects: [],
    capabilities: {
      controllable: true,
      autonomous: false,
      physical: false,
    },
  },
  {
    id: "token-minor-illusion",
    name: "Ilusão Menor (Imagem)",
    description:
      "A imagem de um objeto que não é maior que um cubo de 1,5 metro. A interação física revela que é uma ilusão.",
    effects: [],
    capabilities: {
      controllable: false,
      autonomous: false,
      physical: false,
    },
  },
  {
    id: "token-find-familiar",
    name: "Familiar",
    description:
      "Um espírito que assume a forma de um animal. Ele obedece aos seus comandos, mas não pode atacar.",
    effects: [],
    capabilities: {
      controllable: true,
      autonomous: true,
      physical: true,
    },
  },
  {
    id: "token-silent-image",
    name: "Imagem Silenciosa",
    description:
      "Uma imagem puramente visual de um objeto, criatura ou fenômeno. A interação física a revela como uma ilusão.",
    effects: [],
    capabilities: {
      controllable: true,
      autonomous: false,
      physical: false,
    },
  },
  {
    id: "token-tensers-floating-disk",
    name: "Disco Flutuante de Tenser",
    description:
      "Um disco de força horizontal que pode carregar até 500 libras e o segue.",
    effects: [],
    capabilities: {
      controllable: true,
      autonomous: false,
      physical: true,
    },
  },
  {
    id: "token-unseen-servant",
    name: "Servo Invisível",
    description:
      "Uma força invisível, sem mente e sem forma que realiza tarefas simples.",
    effects: [],
    capabilities: {
      controllable: true,
      autonomous: true,
      physical: false,
    },
  },
];
