import { z } from "zod";

// Schema para validar a estrutura de cada objeto de ação.
export const ActionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

// Array contendo todas as ações do jogo.
// O `as const` garante que o array seja somente leitura e infere os tipos literais.
// O `satisfies` valida se o array corresponde ao schema definido, sem alargar o tipo.
export const ACTIONS = [
  // --- Ações Originais ---
  {
    id: "action-attack",
    name: "Atacar",
    description: "Realiza um ataque com uma arma ou corpo a corpo.",
  },
  {
    id: "action-cast-spell",
    name: "Conjurar Magia",
    description: "Conjura uma magia de nivel 0 a 9.",
  },
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
    id: "action-move-summoned-token",
    name: "Mover Invocação",
    description:
      "Usa uma ação para mover uma criatura ou objeto invocado que você controla.",
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
    id: "action-create-area-of-effect",
    name: "Criar Área de Efeito",
    description: "Cria uma área de efeito em uma localização designada.",
  },
  {
    id: "action-multiattack",
    name: "Ataque Múltiplo",
    description: "Realiza vários ataques em um único turno.",
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
    description: "Tenta desarmar uma armadilha.",
  },
  {
    id: "action-pick-lock",
    name: "Abrir Fechadura",
    description: "Tenta abrir uma fechadura com ferramentas de ladrão.",
  },
  {
    id: "action-force-open",
    name: "Abrir à Força",
    description: "Tenta abrir alguma coisa à força.",
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
  // --- Ações de Combate Clássicas ---
  {
    id: "action-disengage",
    name: "Desengajar",
    description:
      "Move-se cuidadosamente para não provocar ataques de oportunidade de inimigos ao seu alcance.",
  },
  {
    id: "action-dodge",
    name: "Esquivar",
    description:
      "Foca totalmente em se defender. Ataques contra você têm desvantagem até o início do seu próximo turno.",
  },
  {
    id: "action-dash",
    name: "Disparada",
    description:
      "Usa sua ação para ganhar movimento adicional igual ao seu deslocamento.",
  },
  {
    id: "action-help",
    name: "Ajudar",
    description:
      "Ajuda um aliado, concedendo-lhe vantagem no próximo teste de habilidade ou ataque que ele fizer.",
  },
  {
    id: "action-grapple",
    name: "Agarrar",
    description:
      "Tenta segurar e imobilizar uma criatura, limitando seu movimento.",
  },
  {
    id: "action-shove",
    name: "Empurrar",
    description:
      "Tenta empurrar uma criatura para longe ou derrubá-la no chão (condição 'Caído').",
  },
  {
    id: "action-ready",
    name: "Preparar Ação",
    description:
      "Prepara uma ação para ser usada como reação a um gatilho específico que você definir.",
  },
  // --- Interação com Ambiente e Habilidades ---
  {
    id: "action-search",
    name: "Procurar",
    description:
      "Dedica sua atenção para procurar ativamente por algo escondido, como portas secretas ou armadilhas.",
  },
  {
    id: "action-hide",
    name: "Esconder-se",
    description: "Tenta se esconder da vista de outras criaturas.",
  },
  {
    id: "action-stabilize",
    name: "Estabilizar Criatura",
    description:
      "Realiza um teste de Medicina para tentar estabilizar uma criatura que está morrendo.",
  },
  {
    id: "action-use-object",
    name: "Usar Objeto",
    description:
      "Interage com um objeto que requer atenção, como puxar uma alavanca, abrir um mapa ou usar um item mágico.",
  },
  // --- Ações Sociais ---
  {
    id: "action-intimidate",
    name: "Intimidar",
    description:
      "Tenta influenciar alguém através de ameaças, postura hostil ou poder.",
  },
  {
    id: "action-persuade",
    name: "Persuadir",
    description:
      "Tenta convencer uma criatura usando de argumentação, bons modos ou apelo emocional.",
  },
  {
    id: "action-deceive",
    name: "Enganar",
    description:
      "Tenta ludibriar uma criatura com mentiras, disfarces ou distrações.",
  },
  // --- Ações Bônus e Reações ---
  {
    id: "bonus-offhand-attack",
    name: "Ataque com Arma Secundária",
    description:
      "Como uma ação bônus, realiza um ataque com a arma leve que está em sua outra mão.",
  },
  {
    id: "bonus-cast-spell",
    name: "Conjurar Magia (Bônus)",
    description:
      "Conjura uma magia que tem um tempo de conjuração de Ação Bônus.",
  },
  {
    id: "reaction-opportunity-attack",
    name: "Ataque de Oportunidade",
    description:
      "Realiza um ataque de oportunidade contra uma criatura que sai do seu alcance e não usa a ação de desengajar.",
  },
  {
    id: "reaction-cast-shield",
    name: "Reação: Magia Escudo",
    description:
      "Como uma reação ao ser atingido por um ataque, conjura a magia Escudo para aumentar sua Classe de Armadura.",
  },
  {
    id: "reaction-absorb-elements",
    name: "Reação: Absorver Elementos",
    description:
      "Como uma reação ao sofrer dano elemental, usa a magia para ganhar resistência a esse dano.",
  },
] as const satisfies z.infer<(typeof ActionSchema)[]>;
