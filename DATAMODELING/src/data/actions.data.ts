import { z } from "zod";
import { FinalActionDataSchema } from "../schemas/actions.schema"; // Mantemos para validar a estrutura

// O truque mágico é o "as const" no final.
// Ele diz ao TypeScript para tratar este array como um valor imutável
// e inferir os tipos mais específicos possíveis (ex: "action-throw-item" em vez de string).
export const ACTIONS = [
  {
    id: "action-throw-item",
    name: "Arremessar Item",
    description: "Uma ação para arremessar um item em um alvo ou área.",
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
] as const; // <-- A MÁGICA ACONTECE AQUI!

// Validando se os dados estão corretos com o schema (boa prática)
FinalActionDataSchema.parse(ACTIONS);

// Agora, vamos derivar o enum a partir dos dados!
// 1. Pegamos todos os IDs do nosso array de dados.
const allActionIds = ACTIONS.map((action) => action.id);

// 2. Criamos o enum Zod a partir dessa lista.
export const ActionIdEnum = z.enum(allActionIds);
