import { z } from "zod";

/**
 * Define a estrutura de uma Ação.
 * category:
 *  - action   → Ações padrão (consomem sua ação do turno)
 *  - bonus    → Ações bônus
 *  - reaction → Reações
 *  - free     → Ações livres (sem custo de ação)
 */
export const ActionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.enum(["action", "bonus", "reaction", "free"]),
});

// Tipagem inferida
export type Action = z.infer<typeof ActionSchema>;

/**
 * Lista oficial de Ações do D&D 5e + One D&D 2024 (5.5)
 */
export const ACTIONS: Action[] = [
  // --- AÇÕES DE COMBATE CLÁSSICAS ---
  {
    id: "act-attack",
    name: "Atacar",
    description: "Realiza um ataque com uma arma ou corpo a corpo.",
    category: "action",
  },
  {
    id: "act-apply-effect",
    name: "Aplicar Efeito",
    description: "Aplica um efeito a uma criatura ou objeto.",
    category: "action",
  },
  {
    id: "act-disarm-trap",
    name: "Desarmar Armadilha",
    description: "Desarma uma armadilha em um objeto ou área.",
    category: "action",
  },
  {
    id: "act-pick-lock",
    name: "Destrancar",
    description: "Destranca um objeto trancado.",
    category: "action",
  },
  {
    id: "act-create-area-of-effect",
    name: "Criar Área de Efeito",
    description: "Cria uma área de efeito em um ponto no espaço.",
    category: "action",
  },
  {
    id: "act-throw",
    name: "Arremessar",
    description: "Arremessa um objeto ou uma criatura.",
    category: "action",
  },
  {
    id: "act-multiattack",
    name: "Ataque Múltiplo",
    description: "Realiza dois ataques em um único turno.",
    category: "action",
  },
  {
    id: "act-cast-spell",
    name: "Conjurar Magia",
    description: "Conjura uma magia com tempo de conjuração de 1 ação.",
    category: "action",
  },
  {
    id: "act-dash",
    name: "Correr (Dash)",
    description: "Move-se uma distância adicional igual ao seu deslocamento.",
    category: "action",
  },
  {
    id: "act-disengage",
    name: "Desengajar",
    description:
      "Seus movimentos não provocam ataques de oportunidade neste turno.",
    category: "action",
  },
  {
    id: "act-dodge",
    name: "Esquivar",
    description:
      "Concentra-se em evitar ataques. Ataques contra você têm Desvantagem até seu próximo turno.",
    category: "action",
  },
  {
    id: "act-help",
    name: "Ajudar",
    description:
      "Concede Vantagem em uma rolagem de ataque de um aliado ou teste de habilidade.",
    category: "action",
  },
  {
    id: "act-hide",
    name: "Esconder-se",
    description: "Faz um teste de Destreza (Furtividade) para se esconder.",
    category: "action",
  },
  {
    id: "act-ready",
    name: "Preparar (Ready)",
    description:
      "Define uma ação e uma reação desencadeada por uma condição específica.",
    category: "action",
  },
  {
    id: "act-search",
    name: "Procurar",
    description:
      "Faz um teste de Sabedoria (Percepção) ou Inteligência (Investigação) para encontrar algo.",
    category: "action",
  },
  {
    id: "act-use-object",
    name: "Usar Objeto",
    description:
      "Interage com um objeto que requer uma ação dedicada (não mágico).",
    category: "action",
  },

  {
    id: "act-influence",
    name: "Influenciar (Influence)",
    description:
      "Tenta influenciar uma criatura controlada pelo DM (persuasão, intimidação, engano etc.). Requer teste de Carisma; CD = maior entre 15 ou Inteligência da criatura.",
    category: "action",
  },
  {
    id: "act-set-trap",
    name: "Armar Armadilha",
    description: "Arma uma armadilha em um local específico.",
    category: "action",
  },
  {
    id: "act-light-item",
    name: "Iluminar (Light)",
    description: "Ilumina um objeto ou área.",
    category: "action",
  },
  {
    id: "act-consume",
    name: "Consumir (Consume)",
    description:
      "Usa um item consumível, como poções ou outros recursos que são gastos ao serem usados.",
    category: "action",
  },
  {
    id: "act-magic",
    name: "Ação Mágica (Magic)",
    description:
      "Substitui 'Conjurar Magia'. Inclui conjurar magias, usar itens mágicos ou habilidades mágicas que exigem a Magic Action.",
    category: "action",
  },
  {
    id: "act-study",
    name: "Estudar (Study)",
    description:
      "Faz um teste de Inteligência para lembrar informação, identificar magia em curso ou ver através de ilusões.",
    category: "action",
  },
  {
    id: "act-utilize",
    name: "Utilizar (Utilize)",
    description:
      "Usa um objeto não mágico que requer uma ação dedicada. Renomeação de 'Usar Objeto' no One D&D.",
    category: "action",
  },

  // --- AÇÕES SOCIAIS ---
  {
    id: "act-intimidate",
    name: "Intimidar",
    description:
      "Tenta influenciar alguém através de ameaças ou postura hostil.",
    category: "action",
  },
  {
    id: "act-persuade",
    name: "Persuadir",
    description:
      "Tenta convencer uma criatura usando argumentação ou apelo emocional.",
    category: "action",
  },
  {
    id: "act-deceive",
    name: "Enganar",
    description: "Tenta ludibriar uma criatura com mentiras ou distrações.",
    category: "action",
  },

  // --- AÇÕES BÔNUS ---
  {
    id: "bonus-offhand-attack",
    name: "Ataque com Arma Secundária",
    description: "Ataca com a arma leve que está na outra mão.",
    category: "bonus",
  },
  {
    id: "bonus-cast-spell",
    name: "Conjurar Magia (Bônus)",
    description: "Conjura uma magia com tempo de conjuração de Ação Bônus.",
    category: "bonus",
  },

  // --- REAÇÕES ---
  {
    id: "react-opportunity-attack",
    name: "Ataque de Oportunidade",
    description: "Ataca uma criatura que sai do seu alcance sem desengajar.",
    category: "reaction",
  },
  {
    id: "react-cast-shield",
    name: "Magia Escudo",
    description: "Conjura a magia Escudo ao ser atingido por um ataque.",
    category: "reaction",
  },
  {
    id: "react-absorb-elements",
    name: "Absorver Elementos",
    description: "Conjura a magia Absorver Elementos ao sofrer dano elemental.",
    category: "reaction",
  },

  // --- AÇÕES LIVRES ---
  {
    id: "free-use-resource",
    name: "Usar Recurso (Livre)",
    description:
      "Usa um recurso que não consome ação, como habilidade passiva ou item de uso livre.",
    category: "free",
  },
];
