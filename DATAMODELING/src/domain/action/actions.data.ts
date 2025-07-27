import { z } from "zod";
import { FinalActionDataSchema } from "../action/actions.schema.js";

export const ACTIONS = [
  {
    id: "action-throw-item",
    name: "Arremessar Item",
    description: "Uma ação para arremessar um item em um alvo ou área.",
  },
  {
    id: "action-move-summoned-token",
    name: "Mover Invocação",
    description:
      "Usa uma ação para mover uma criatura ou objeto invocado que você controla.",
  },
  {
    id: "action-consume-item",
    name: "Consumir Item",
    description: "Uma ação para beber uma poção ou usar um item consumível.",
  },
  {
    id: "action-use-gear-area",
    name: "Usar Item em Área",
    description: "Espalha ou usa um item para cobrir uma área designada.",
  },
  {
    id: "action-apply-poison",
    name: "Aplicar Veneno",
    description: "Aplica veneno em uma arma ou munição.",
  },
  {
    id: "action-light-item",
    name: "Acender Item",
    description:
      "Usa uma fonte de ignição para acender um item como uma tocha ou lampião.",
  },
  {
    id: "action-cover-lantern",
    name: "Cobrir Lanterna",
    description: "Abaixa a cobertura de uma lanterna para reduzir sua luz.",
  },
  {
    id: "action-set-trap",
    name: "Armar Armadilha",
    description: "Prepara uma armadilha mecânica no chão.",
  },
  {
    id: "action-use-kit-charge",
    name: "Usar Carga de Kit",
    description: "Gasta um uso de um kit para um efeito específico.",
  },
  {
    id: "action-cast-spell",
    name: "Conjurar Magia",
    description: "Conjura uma magia de nivel 0 a 9",
  },
] as const;

FinalActionDataSchema.parse(ACTIONS);

const allActionIds = ACTIONS.map((action) => action.id);

export const ActionIdEnum = z.enum(allActionIds);
