import { z } from "zod";

export const ActionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export const ACTIONS = [
  {
    id: "action-attack",
    name: "Atacar",
    description: "Realiza um ataque com uma arma ou corpo a corpo.",
  },
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
    id: "action-disarm-trap",
    name: "Desarmar Armadilha",
    description: "Tenta desarmar uma armadilha",
  },
  {
    id: "action-pick-lock",
    name: "Abrir fechadura",
    description: "Tenta abrir uma fechadura com ferramentas de ladrão",
  },
  {
    id: "action-use-kit-charge",
    name: "Usar Carga de Kit",
    description: "Gasta um uso de um kit para um efeito específico.",
  },
  {
    id: "action-witch-bolt-channel",
    name: "Canalizar Raio de Bruxa",
    description:
      "Canaliza a energia do Raio de Bruxa para causar dano contínuo.",
  },
  {
    id: "action-cast-spell",
    name: "Conjurar Magia",
    description: "Conjura uma magia de nivel 0 a 9",
  },
  {
    id: "action-force-open",
    name: "Abrir à força",
    description: "Tenta abrir alguma coisa à força",
  },
] as const satisfies z.infer<(typeof ActionSchema)[]>;
