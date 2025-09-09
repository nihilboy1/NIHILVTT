import { FeatType } from "../../domain/feat/feat.schema.js";

export const featsGeneral: FeatType[] = [
  {
    id: "feat-ability-score-improvement",
    name: [
      "Melhoramento nos Pontos de Habilidade",
      "Ability Score Improvement",
    ],
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: true,
    },
    description:
      "Aumente um de seus atributos em 2, ou dois atributos em 1. Você pode pegar este talento várias vezes.",
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            pick: {
              from: [
                "strength",
                "dexterity",
                "constitution",
                "intelligence",
                "wisdom",
                "charisma",
              ],
              amount: 1,
            },
            value: 2,
            operation: "add",
          },
          {
            pick: {
              from: [
                "strength",
                "dexterity",
                "constitution",
                "intelligence",
                "wisdom",
                "charisma",
              ],
              amount: 2,
            },
            value: 1,
            operation: "add",
          },
        ],
        maxScore: 20,
        name: "Melhoramento nos Pontos de Habilidade",
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description:
          "Aumente um de seus atributos em 2, ou dois atributos em 1.",
      },
    ],
  },
  {
    name: ["Ator", "Actor"],
    source: "LDJ2024",
    id: "feat-actor",
    repeatable: {
      canBeRepeated: false,
    },
    description:
      "Você é um mestre da atuação, capaz de imitar outras criaturas e se passar por outras pessoas com notável facilidade.",
    category: "general",
    requirements: {
      user: {
        conditionMode: "all",
        events: [
          {
            type: "hasLevel",
            value: 4,
            comparison: "greaterOrEqual",
          },
        ],
      },
    },
    traits: [
      {
        name: "Aumento de Atributo",
        description: "Aumente seu valor de Carisma em 1 ponto.",
      },
      {
        name: "Interpretação",
        description:
          "Você tem Vantagem em testes de Carisma (Enganação ou Atuação) feitos para se passar por outra pessoa.",
      },
      {
        name: "Mímico",
        description:
          "Você pode imitar os sons de criaturas ou a fala. Uma criatura que ouve a imitação precisa ser bem-sucedida em um teste de Sabedoria (Intuição) contra uma CD igual a 8 + seu modificador de Carisma + seu Bônus de Proficiência para perceber que a imitação é falsa.",
      },
    ],
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            pick: {
              from: ["charisma"],
              amount: 1,
            },
            value: 1,
            operation: "add",
          },
        ],
        maxScore: 20,
        name: "Ator",
      },
    ],
  },
  {
    name: ["Atleta", "Athlete"],
    id: "feat-athlete",
    source: "LDJ2024",
    category: "general",
    description:
      "Você treinou intensamente para ser um atleta excepcional, aprimorando sua força e agilidade.",
    repeatable: {
      canBeRepeated: false,
    },
    requirements: {
      user: {
        conditionMode: "all",
        events: [
          {
            type: "hasLevel",
            value: 4,
            comparison: "greaterOrEqual",
          },
          {
            conditionMode: "any",
            events: [
              {
                type: "hasAttribute",
                attribute: "strength",
                value: 13,
                comparison: "greaterOrEqual",
              },
              {
                type: "hasAttribute",
                attribute: "dexterity",
                value: 13,
                comparison: "greaterOrEqual",
              },
            ],
          },
        ],
      },
    },
    traits: [
      {
        name: "Aumento de Atributo",
        description: "Aumenta seu valor de Força ou Destreza em 1 ponto.",
      },
      {
        name: "Velocidade de Escalada",
        description:
          "Você ganha uma Velocidade de Escalada igual à sua Velocidade de Caminhada.",
      },
      {
        name: "Levantar-se Rapidamente",
        description:
          "Quando você tem a condição Caído, você pode se levantar gastando apenas 5 pés de movimento.",
      },
      {
        name: "Salto Aprimorado",
        description:
          "Você pode realizar um Salto em Distância ou Salto em Altura após se mover apenas 5 pés, em vez dos 10 pés normais.",
      },
    ],
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            pick: {
              from: ["strength", "dexterity"],
              amount: 1,
            },
            value: 1,
            operation: "add",
          },
        ],
        maxScore: 20,
        name: "Atleta",
      },
    ],
  },
  {
    id: "feat-charger",
    name: ["Investida", "Charger"],
    description:
      "Você é um especialista em investidas rápidas, atacando com força e aproveitando o impulso do seu movimento.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: false,
    },
    requirements: {
      user: {
        conditionMode: "all",
        events: [
          {
            type: "hasLevel",
            value: 4,
            comparison: "greaterOrEqual",
          },
          {
            conditionMode: "any",
            events: [
              {
                type: "hasAttribute",
                attribute: "strength",
                value: 13,
                comparison: "greaterOrEqual",
              },
              {
                type: "hasAttribute",
                attribute: "dexterity",
                value: 13,
                comparison: "greaterOrEqual",
              },
            ],
          },
        ],
      },
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            pick: {
              from: ["strength", "dexterity"],
              amount: 1,
            },
            value: 1,
            operation: "add",
          },
        ],
        maxScore: 20,
        name: "Charger",
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description: "Aumenta seu valor de Força ou Destreza em 1 ponto.",
      },
      {
        name: "Investida Aprimorada",
        description:
          "Quando você usa a ação **Disparada**, seu deslocamento aumenta em 10 pés durante esse turno.",
      },
      {
        name: "Ataque de Investida",
        description:
          "Se você se mover no mínimo 10 pés em linha reta em direção a um alvo e o acertar com um ataque corpo a corpo no mesmo turno, você pode escolher um dos seguintes efeitos: adicione um bônus de 1d8 à rolagem de dano do ataque ou empurre o alvo até 10 pés para longe de você. O alvo deve ser, no máximo, uma categoria de tamanho maior que a sua. Você só pode usar este benefício uma vez por turno.",
      },
    ],
  },
  {
    id: "feat-chef",
    name: ["Cozinheiro", "Chef"],
    description:
      "Você é um mestre culinário, capaz de preparar refeições especiais que curam e fortalecem seus companheiros durante a aventura.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: false,
    },
    requirements: {
      user: {
        events: [{ type: "hasLevel", value: 4, comparison: "greaterOrEqual" }],
      },
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        name: "Aumento de Atributo",
        choices: [
          {
            pick: {
              from: ["constitution", "wisdom"],
              amount: 1,
            },
            value: 1,
            operation: "add",
          },
        ],
        maxScore: 20,
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description:
          "Aumenta seu valor de Constituição ou Sabedoria em 1 ponto.",
      },
      {
        name: "Utensílios de Cozinha",
        description:
          "Você ganha proficiência com utensílios de cozinha, caso ainda não a tenha.",
      },
      {
        name: "Refeição Restauradora",
        description:
          "Durante um **Descanso Curto**, se tiver ingredientes e utensílios de cozinha, você pode preparar uma refeição especial para até **4 + seu Bônus de Proficiência** criaturas. Ao final do descanso, qualquer criatura que comer a refeição e gastar um ou mais Dados de Vida para recuperar pontos de vida, recupera um bônus de **1d8** pontos de vida.",
      },
      {
        name: "Doces Fortificantes",
        description:
          "Com 1 hora de trabalho ou ao terminar um **Descanso Longo**, você pode cozinhar um número de doces igual ao seu Bônus de Proficiência. Esses doces duram 8 horas. Uma criatura pode usar uma **Ação Bônus** para comer um desses doces e ganhar pontos de vida temporários iguais ao seu Bônus de Proficiência.",
      },
    ],
  },
  {
    id: "feat-crossbow-expert",
    name: ["Especialista em Bestas", "Crossbow Expert"],
    description:
      "Você domina o uso de bestas, podendo recarregar e atirar em combate corpo a corpo com uma velocidade impressionante.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: false,
    },
    requirements: {
      user: {
        events: [
          { type: "hasLevel", value: 4, comparison: "greaterOrEqual" },
          {
            type: "hasAttribute",
            attribute: "dexterity",
            value: 13,
            comparison: "greaterOrEqual",
          },
        ],
      },
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        name: "Aumento de Destreza",
        choices: [
          {
            pick: { from: ["dexterity"], amount: 1 },
            value: 1,
            operation: "add",
          },
        ],
        maxScore: 20,
      },
    ],
    traits: [
      {
        name: "Aumento de Destreza",
        description: "Aumenta seu valor de Destreza em 1 ponto.",
      },
      {
        name: "Ignorar Recarga",
        description:
          "Você ignora a propriedade Recarga das bestas de mão, pesadas e leves. Se estiver segurando uma, você pode recarregar uma munição mesmo sem ter uma mão livre.",
      },
      {
        name: "Disparar em Combate Corpo a Corpo",
        description:
          "Estar a 5 pés de um inimigo não impõe Desvantagem em suas jogadas de ataque com bestas.",
      },
      {
        name: "Empunhadura Dupla",
        description:
          "Quando você faz o ataque extra da propriedade Leve, você pode adicionar seu modificador de habilidade ao dano desse ataque extra se a arma for uma besta com a propriedade Leve e você ainda não tiver adicionado o modificador ao dano.",
      },
    ],
  },
  {
    id: "feat-crusher",
    name: ["Esmagador", "Crusher"],
    description:
      "Seus ataques de concussão são brutais, permitindo que você empurre inimigos e crie aberturas para seus aliados após um acerto crítico.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: false,
    },
    requirements: {
      user: {
        events: [
          {
            type: "hasLevel",
            value: 4,
            comparison: "greaterOrEqual",
          },
        ],
      },
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            pick: {
              amount: 1,
              from: ["constitution", "strength"],
            },
            value: 1,
            operation: "add",
          },
        ],
        description: "Aumenta sua Constituição em 1 ponto.",
        maxScore: 20,
        name: "Esmagador",
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description: "Aumenta seu valor de Força ou Constituição em 1 ponto.",
      },
      {
        name: "Empurrar",
        description:
          "Uma vez por turno, quando você acerta uma criatura com um ataque que causa dano de Concussão, você pode movê-la 5 pés para um espaço desocupado se o alvo não for mais de um tamanho maior que você.",
      },
      {
        name: "Crítico Aprimorado",
        description:
          "Quando você consegue um acerto crítico que causa dano de Concussão a uma criatura, as jogadas de ataque contra essa criatura têm Vantagem até o início do seu próximo turno.",
      },
    ],
  },
  {
    id: "feat-defensive-duelist",
    name: ["Duelista Defensivo", "Defensive Duelist"],
    description:
      "Você domina a arte do duelo, utilizando uma arma leve para desviar ataques e defender-se com agilidade.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: false,
    },
    requirements: {
      user: {
        events: [
          { type: "hasLevel", value: 4, comparison: "greaterOrEqual" },
          {
            type: "hasAttribute",
            attribute: "dexterity",
            value: 13,
            comparison: "greaterOrEqual",
          },
        ],
      },
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        name: "Aumento de Destreza",
        choices: [
          {
            pick: { from: ["dexterity"], amount: 1 },
            value: 1,
            operation: "add",
          },
        ],
        maxScore: 20,
      },
    ],
    traits: [
      {
        name: "Aumento de Destreza",
        description: "Aumenta seu valor de Destreza em 1 ponto.",
      },
      {
        name: "Aparar",
        description:
          "Se você estiver empunhando uma arma com a propriedade Acuidade e for alvo de um ataque corpo a corpo, você pode usar sua **Reação** para adicionar seu Bônus de Proficiência à sua Classe de Armadura (CA) contra esse ataque. Isso pode fazer com que o ataque erre. O bônus dura até o início do seu próximo turno.",
      },
    ],
  },
  {
    id: "feat-dual-wielder",
    name: ["Ambidestro", "Dual Wielder"],
    description:
      "Você é um combatente mortal com uma arma em cada mão, dominando a arte da empunhadura dupla.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: false,
    },
    requirements: {
      user: {
        events: [{ type: "hasLevel", value: 4, comparison: "greaterOrEqual" }],
        conditionMode: "all",
      },
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        maxScore: 20,
        choices: [
          {
            operation: "add",
            pick: { from: ["dexterity", "strength"], amount: 1 },
            value: 1,
          },
        ],
        name: "Aumento no valor de Atributo",
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description: "Aumenta seu valor de Destreza ou Força em 1 ponto.",
      },
      {
        name: "Combate com Duas Armas Aprimorado",
        description:
          "Quando você usa a ação **Ataque** e ataca com uma arma com a propriedade Leve, pode usar sua **Ação Bônus** para fazer um ataque extra com uma arma diferente que não tenha a propriedade de Duas Mãos. Você adiciona seu modificador de habilidade ao dano, a menos que ele seja negativo.",
      },
      {
        name: "Saque Rápido",
        description:
          "Você pode sacar ou guardar duas armas que não tenham a propriedade de Duas Mãos quando normalmente só poderia sacar ou guardar uma.",
      },
    ],
  },
  {
    id: "feat-durable",
    name: ["Durável", "Durable"],
    description:
      "Sua resistência física é notável, permitindo que você se recupere rapidamente de ferimentos graves.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: false,
    },
    requirements: {
      user: {
        events: [{ type: "hasLevel", value: 4, comparison: "greaterOrEqual" }],
      },
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        name: "Aumento de Atributo",
        choices: [
          {
            pick: {
              from: ["constitution"],
              amount: 1,
            },
            value: 1,
            operation: "add",
          },
        ],
        maxScore: 20,
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description: "Aumenta seu valor de Constituição em 1 ponto.",
      },
      {
        name: "Desafiar a Morte",
        description:
          "Você tem Vantagem em Testes de Resistência contra a Morte.",
      },
      {
        name: "Recuperação Rápida",
        description:
          "Como uma **Ação Bônus**, você pode gastar um de seus Dados de Vida, rolar o dado e recuperar um número de Pontos de Vida igual ao resultado.",
      },
    ],
  },
  {
    id: "feat-elemental-adept",
    name: ["Adepto Elemental", "Elemental Adept"],
    description:
      "Sua conexão com a magia de um elemento específico é tão forte que suas magias ignoram a resistência do alvo e causam um dano ainda maior.",
    source: "LDJ2024",
    category: "general",
    requirements: {
      user: {
        events: [
          { type: "hasLevel", value: 4, comparison: "greaterOrEqual" },
          { type: "hasSpellcasting" },
        ],
      },
    },
    repeatable: {
      canBeRepeated: true,
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        name: "Aumento de Atributo",
        choices: [
          {
            pick: {
              from: ["intelligence", "wisdom", "charisma"],
              amount: 1,
            },
            value: 1,
            operation: "add",
          },
        ],
        maxScore: 20,
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description:
          "Aumenta seu valor de Inteligência, Sabedoria ou Carisma em 1 ponto.",
      },
      {
        name: "Maestria Elemental",
        description:
          "Escolha um tipo de dano (Ácido, Frio, Fogo, Elétrico ou Trovão). Suas magias de dano desse tipo ignoram resistência a esse dano. Além disso, sempre que você rolar um '1' em um dado de dano para uma magia desse tipo, pode tratá-lo como um '2'.",
      },
      {
        name: "Foco Expandido",
        description:
          "Você pode escolher este talento mais de uma vez, mas deve selecionar um tipo de dano diferente para a Maestria Elemental a cada vez.",
      },
    ],
  },
  {
    id: "feat-fey-touched",
    name: ["Tocado pela Fey", "Fey-Touched"],
    description:
      "A exposição à magia do Plano Feérico deixou uma marca em você, concedendo a habilidade de conjurar magias etéreas.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: true,
    },
    requirements: {
      user: {
        events: [{ type: "hasLevel", value: 4, comparison: "greaterOrEqual" }],
      },
    },

    effects: [
      {
        type: "passive_modifyAbilityScore",
        name: "Aumento de Atributo",
        choices: [
          {
            pick: {
              from: ["intelligence", "wisdom", "charisma"],
              amount: 1,
            },
            value: 1,
            operation: "add",
          },
        ],
        maxScore: 20,
      },
      {
        type: "passive_providesSpellKnowledge",
        mode: "fixedSpells",
        spells: ["spell-misty-step"],
        canBeSwappedOn: "never",
        freeCasting: {
          amount: 1,
          recharge: { maxCharges: 1, rechargeOn: "dawn", type: "event", recoveryAmount:1 },
        },
        name: "Magia Feérica",
        castingAbilityOptions: ["selectedByFeat"],
        description:
          "Você aprende a magia Passo Nebuloso. Você pode conjurá-la uma vez por Descanso Longo sem gastar um espaço de magia. Você também pode conjurá-la normalmente usando seus espaços de magia.",
      },
      {
        type: "passive_providesSpellKnowledge",
        mode: "filter",
        filter: { school: ["divination", "enchantment"], level: 1 },
        amount: 1,
        freeCasting: {
          amount: 1,
          recharge: { maxCharges: 1, rechargeOn: "dawn", type: "event", recoveryAmount: 1 },
        },
        canBeSwappedOn: "levelUp",
        description:
          "Você aprende uma magia de 1º nível à sua escolha das escolas de Adivinhação ou Encantamento. Você pode conjurá-la uma vez por Descanso Longo sem gastar um espaço de magia. Você também pode conjurá-la normalmente usando seus espaços de magia.",
        name: "Magia Bônus",
        castingAbilityOptions: ["selectedByFeat"],
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description:
          "Aumenta seu valor de Inteligência, Sabedoria ou Carisma em 1 ponto.",
      },
      {
        name: "Magia Feérica",
        description:
          "Você aprende a magia Passo Nebuloso e pode conjurá-la uma vez por Descanso Longo sem gastar um espaço de magia. Você também pode conjurá-la normalmente usando seus espaços de magia.",
      },
      {
        name: "Magia Bônus",
        description:
          "Você aprende uma magia de 1º nível à sua escolha das escolas de Adivinhação ou Encantamento. Você pode conjurá-la uma vez por Descanso Longo sem gastar um espaço de magia. Você também pode conjurá-la normalmente usando seus espaços de magia.",
      },
    ],
  },
  {
    id: "feat-grappler",
    name: ["Agarrador", "Grappler"],
    description:
      "Você é um mestre em combate corpo a corpo, capaz de agarrar e imobilizar seus oponentes com facilidade.",
    source: "LDJ2024",
    category: "general",
    repeatable: { canBeRepeated: false },
    requirements: {
      user: {
        events: [{ type: "hasLevel", value: 4, comparison: "greaterOrEqual" }],
        conditionMode: "all",
      },
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        maxScore: 20,
        choices: [
          {
            operation: "add",
            pick: { from: ["dexterity", "strength"], amount: 1 },
            value: 1,
          },
        ],
        name: "Aumento no valor de Atributo",
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description: "Aumenta seu valor de Força ou Destreza em 1 ponto.",
      },
      {
        name: "Golpear e Agarrar",
        description:
          "Quando você acerta uma criatura com um ataque desarmado na sua ação **Ataque**, você pode tentar agarrá-la como parte da mesma ação. Você só pode usar este benefício uma vez por turno.",
      },
      {
        name: "Vantagem no Ataque",
        description:
          "Você tem Vantagem em jogadas de ataque contra uma criatura que você está agarrando.",
      },
      {
        name: "Lutador Ágil",
        description:
          "Você não precisa gastar movimento extra para mover uma criatura que você está agarrando se a criatura for do seu tamanho ou menor.",
      },
    ],
  },
  {
    id: "feat-great-weapon-master",
    name: ["Mestre de Arma Pesada", "Great Weapon Master"],
    description:
      "Você domina o uso de armas pesadas de duas mãos, capaz de desferir golpes devastadores e encadear ataques ao derrotar seus inimigos ou conseguir um acerto crítico.",
    source: "LDJ2024",
    category: "general",
    repeatable: { canBeRepeated: false },
    requirements: {
      user: {
        events: [
          { type: "hasLevel", value: 4, comparison: "greaterOrEqual" },
          {
            type: "hasAttribute",
            attribute: "strength",
            value: 13,
            comparison: "greaterOrEqual",
          },
        ],
      },
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        name: "Aumento de Atributo",
        choices: [
          {
            pick: {
              from: ["strength"],
              amount: 1,
            },
            value: 1,
            operation: "add",
          },
        ],
        maxScore: 20,
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description: "Aumenta seu valor de Força em 1 ponto.",
      },
      {
        name: "Maestria com Arma Pesada",
        description:
          "Quando você atinge uma criatura com uma arma que tem a propriedade Pesada, o ataque causa um dano extra igual ao seu Bônus de Proficiência.",
      },
      {
        name: "Ataque Furioso",
        description:
          "Após conseguir um acerto crítico com uma arma corpo a corpo ou reduzir uma criatura a 0 Pontos de Vida, você pode fazer um ataque extra com a mesma arma como uma **Ação Bônus**.",
      },
    ],
  },
  {
    id: "feat-heavily-armored",
    name: ["Pesadamente Armadurado", "Heavily Armored"],
    description:
      "Você treinou exaustivamente para usar armaduras pesadas, ganhando proficiência com elas e um bônus em um de seus atributos.",
    source: "LDJ2024",
    category: "general",
    repeatable: { canBeRepeated: false },
    requirements: {
      user: {
        events: [
          { type: "hasLevel", value: 4, comparison: "greaterOrEqual" },
          { type: "isProficientWith", armorType: "medium" },
        ],
      },
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            pick: { from: ["strength", "constitution"], amount: 1 },
            value: 1,
            operation: "add",
          },
        ],
        maxScore: 20,
        name: "Aumento no valor de Atributo",
      },
      {
        type: "passive_grantProficiency",
        on: "armorType",
        choose: {
          count: 1,
          from: ["heavy"],
        },
        name: "Treinamento com Armadura Pesada",
      },
    ],

    traits: [
      {
        name: "Aumento de Atributo",
        description: "Aumenta seu valor de Força ou Constituição em 1 ponto.",
      },
      {
        name: "Treinamento com Armadura",
        description: "Você ganha proficiência com armaduras Pesadas.",
      },
    ],
  },
  {
    id: "feat-heavy-armor-master",
    name: ["Mestre em Armadura Pesada", "Heavy Armor Master"],
    description:
      "Sua armadura pesada é uma verdadeira fortaleza, absorvendo os impactos de ataques físicos e reduzindo o dano recebido.",
    source: "LDJ2024",
    category: "general",
    repeatable: { canBeRepeated: false },
    requirements: {
      user: {
        events: [
          { type: "hasLevel", value: 4, comparison: "greaterOrEqual" },
          { type: "isProficientWith", armorType: "heavy" },
        ],
      },
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            pick: { from: ["strength", "constitution"], amount: 1 },
            value: 1,
            operation: "add",
          },
        ],
        maxScore: 20,
        name: "Aumento no valor de Atributo",
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description: "Aumenta seu valor de Força ou Constituição em 1 ponto.",
      },
      {
        name: "Redução de Dano",
        description:
          "Quando você é atingido por um ataque enquanto veste armadura Pesada, o dano de Concussão, Perfurante e Cortante que você recebe é reduzido em um valor igual ao seu Bônus de Proficiência.",
      },
    ],
  },
  {
    id: "feat-inspiring-leader",
    name: ["Líder Inspirador", "Inspiring Leader"],
    description:
      "Seu carisma e sua liderança são inspiradores, motivando seus aliados e concedendo-lhes pontos de vida temporários com um discurso encorajador.",
    source: "LDJ2024",
    category: "general",
    repeatable: { canBeRepeated: false },
    requirements: {
      user: {
        conditionMode: "all",
        events: [
          {
            type: "hasLevel",
            value: 4,
            comparison: "greaterOrEqual",
          },
          {
            conditionMode: "any",
            events: [
              {
                type: "hasAttribute",
                attribute: "charisma",
                value: 13,
                comparison: "greaterOrEqual",
              },
              {
                type: "hasAttribute",
                attribute: "wisdom",
                value: 13,
                comparison: "greaterOrEqual",
              },
            ],
          },
        ],
      },
    },

    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            pick: { from: ["charisma", "wisdom"], amount: 1 },
            operation: "add",
            value: 1,
          },
        ],
        maxScore: 20,
        name: "Aumento no valor de Atributo",
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description: "Aumenta seu valor de Carisma ou Sabedoria em 1 ponto.",
      },
      {
        name: "Performance de Encorajamento",
        description:
          "Ao terminar um **Descanso Curto ou Longo**, você pode fazer uma apresentação inspiradora (discurso, canção ou dança). Escolha até 6 aliados (incluindo você) a até 30 pés de distância. Cada criatura escolhida ganha Pontos de Vida Temporários iguais ao seu nível de personagem mais o modificador do atributo que você aumentou com este talento.",
      },
    ],
  },
  {
    id: "feat-keen-mind",
    name: ["Mente Aguçada", "Keen Mind"],
    description:
      "Sua mente é afiada como uma lâmina, permitindo que você retenha informações e se localize com precisão.",
    source: "LDJ2024",
    category: "general",
    repeatable: { canBeRepeated: false },
    requirements: {
      user: {
        events: [
          {
            type: "hasLevel",
            value: 4,
            comparison: "greaterOrEqual",
          },
          {
            type: "hasAttribute",
            attribute: "intelligence",
            value: 13,
            comparison: "greaterOrEqual",
          },
        ],
      },
    },
    traits: [
      {
        name: "Aumento de Atributo",
        description: "Aumenta seu valor de Inteligência em 1 ponto.",
      },
      {
        name: "Conhecimento Histórico",
        description:
          "Você ganha proficiência em uma das seguintes habilidades: Arcana, História, Investigação, Natureza ou Religião. Se você não tiver proficiência na habilidade escolhida, você ganha proficiência nela, e se você já tiver proficiência nela, você ganha Especialização nela.",
      },
      {
        name: "Estudo Aprimorado",
        description:
          "Você pode usar a ação de **Estudar** como uma **Ação Bônus**.",
      },
    ],
    effects: [
      {
        type: "passive_modifyAbilityScore",
        maxScore: 20,
        choices: [
          {
            operation: "add",
            pick: { from: ["intelligence"], amount: 1 },
            value: 1,
          },
        ],
        name: "Mente Aguçada",
      },
      {
        type: "passive_grantProficiency",
        on: "skill",
        grantsExpertise: true,
        choose: {
          count: 1,
          from: ["arcana", "history", "investigation", "nature", "religion"],
        },
        name: "Conhecimento Histórico",
        description:
          "Você ganha proficiência em uma das seguintes habilidades: Arcana, História, Investigação, Natureza ou Religião. Se você não tiver proficiência na habilidade escolhida, você ganha proficiência nela, e se você já tiver proficiência nela, você ganha Especialização nela.",
      },
    ],
  },
  {
    id: "feat-lightly-armored",
    name: ["Levemente Armadurado", "Lightly Armored"],
    description:
      "Você aprendeu a usar armaduras leves e escudos, aumentando sua capacidade de defesa de forma ágil.",
    source: "LDJ2024",
    category: "general",
    repeatable: { canBeRepeated: false },

    requirements: {
      user: {
        events: [{ type: "hasLevel", value: 4, comparison: "greaterOrEqual" }],
      },
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        maxScore: 20,
        choices: [
          {
            operation: "add",
            pick: { from: ["dexterity", "strength"], amount: 1 },
            value: 1,
          },
        ],
        name: "Aumento no valor de Atributo",
      },
      {
        type: "passive_grantProficiency",
        on: "armorType",
        choose: {
          from: ["light", "shield"],
          count: 2,
        },
        name: "Treinamento com Armadura Leve",
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description: "Aumenta seu valor de Força ou Destreza em 1 ponto.",
      },
      {
        name: "Treinamento com Armadura",
        description: "Você ganha proficiência com armaduras Leves e Escudos.",
      },
    ],
  },
  {
    id: "feat-mage-slayer",
    name: ["Matador de Magos", "Mage Slayer"],
    description:
      "Você é um caçador de magos, capaz de romper a concentração de conjuradores, resistir a seus efeitos e atacá-los com ferocidade.",
    source: "LDJ2024",
    category: "general",
    repeatable: { canBeRepeated: false },
    requirements: {
      user: {
        events: [{ type: "hasLevel", value: 4, comparison: "greaterOrEqual" }],
      },
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        maxScore: 20,
        choices: [
          {
            operation: "add",
            pick: { from: ["dexterity", "strength"], amount: 1 },
            value: 1,
          },
        ],
        name: "Aumento no valor de Atributo",
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description: "Aumenta seu valor de Força ou Destreza em 1 ponto.",
      },
      {
        name: "Quebrador de Concentração",
        description:
          "Quando você causa dano a uma criatura que está se concentrando em uma magia, ela faz com Desvantagem o teste de resistência para manter a concentração.",
      },
      {
        name: "Mente Guardada",
        description:
          "Se você falhar em um teste de resistência de Inteligência, Sabedoria ou Carisma, pode usar sua **Reação** para ser bem-sucedido em vez disso. Após usar este benefício, você não pode usá-lo novamente até terminar um Descanso Curto ou Longo.",
      },
    ],
  },
  {
    id: "feat-martial-weapon-training",
    name: ["Treinamento em Armas Marciais", "Martial Weapon Training"],
    description:
      "Você é um guerreiro versátil, ganhando proficiência com todas as armas marciais para expandir seu arsenal de combate.",
    source: "LDJ2024",
    category: "general",
    repeatable: { canBeRepeated: false },
    requirements: {
      user: {
        events: [{ type: "hasLevel", value: 4, comparison: "greaterOrEqual" }],
      },
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        maxScore: 20,
        choices: [
          {
            operation: "add",
            pick: { from: ["dexterity", "strength"], amount: 1 },
            value: 1,
          },
        ],
        name: "Aumento no valor de Atributo",
      },
      {
        type: "passive_grantProficiency",
        on: "weaponType",
        choose: {
          from: ["martial"],
          count: "all",
        },
        name: "Treinamento em Armas Marciais",
        description: "Você ganha proficiência com armas marciais.",
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description: "Aumenta seu valor de Força ou Destreza em 1 ponto.",
      },
      {
        name: "Treinamento em Armas Marciais",
        description: "Você ganha proficiência com armas marciais.",
      },
    ],
  },
  {
    id: "feat-medium-armor-master",
    name: ["Mestre em Armadura Média", "Medium Armor Master"],
    description:
      "Você domina o uso de armaduras médias, maximizando sua defesa e minimizando as restrições de movimento.",
    source: "LDJ2024",
    repeatable: { canBeRepeated: false },
    category: "general",
    requirements: {
      user: {
        events: [
          { type: "hasLevel", value: 4, comparison: "greaterOrEqual" },
          { type: "isProficientWith", armorType: "medium" },
        ],
      },
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        maxScore: 20,
        choices: [
          {
            operation: "add",
            pick: { from: ["dexterity", "strength"], amount: 1 },
            value: 1,
          },
        ],
        name: "Aumento no valor de Atributo",
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description: "Aumenta seu valor de Força ou Destreza em 1 ponto.",
      },
      {
        name: "Usuário de Armadura Ágil",
        description:
          "Enquanto veste uma armadura Média, você pode adicionar até +3, em vez de +2, à sua Classe de Armadura (CA) se tiver Destreza 16 ou superior.",
      },
    ],
  },
  {
    id: "feat-moderately-armored",
    name: ["Moderadamente Armadurado", "Moderately Armored"],
    description:
      "Você se tornou proficiente no uso de armaduras médias e escudos, aprimorando significativamente sua proteção em combate.",
    source: "LDJ2024",
    category: "general",
    repeatable: { canBeRepeated: false },
    requirements: {
      user: {
        events: [
          {
            type: "hasLevel",
            value: 4,
            comparison: "greaterOrEqual",
          },
          {
            type: "isProficientWith",
            armorType: "light",
          },
        ],
      },
    },
    effects: [
      {
        type: "passive_grantProficiency",
        on: "armorType",
        choose: {
          from: ["medium", "shield"],
          count: 2,
        },
        name: "Treinamento com Armadura Média",
        description: "Você ganha proficiência com armaduras Médias e Escudos.",
      },
      {
        type: "passive_modifyAbilityScore",
        maxScore: 20,
        choices: [
          {
            operation: "add",
            pick: { from: ["dexterity", "strength"], amount: 1 },
            value: 1,
          },
        ],
        name: "Aumento no valor de Atributo",
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description: "Aumenta seu valor de Força ou Destreza em 1 ponto.",
      },
      {
        name: "Treinamento com Armadura",
        description: "Você ganha proficiência com armaduras Médias e escudos.",
      },
    ],
  },
  {
    id: "feat-mounted-combatant",
    name: ["Combatente Montado", "Mounted Combatant"],
    description:
      "Você é um guerreiro formidável em sua montaria, capaz de proteger seu corcel e desferir ataques com precisão.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: false,
    },
    requirements: {
      user: {
        events: [{ type: "hasLevel", value: 4, comparison: "greaterOrEqual" }],
      },
    },

    effects: [
      {
        type: "passive_modifyAbilityScore",
        maxScore: 20,
        choices: [
          {
            operation: "add",
            pick: { from: ["strength", "dexterity", "wisdom"], amount: 1 },
            value: 1,
          },
        ],
        name: "Aumento no valor de Atributo",
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description:
          "Aumenta seu valor de Força, Destreza ou Sabedoria em 1 ponto.",
      },
      {
        name: "Ataque Montado",
        description:
          "Enquanto estiver montado, você tem Vantagem em jogadas de ataque contra qualquer criatura não-montada a 5 pés de sua montaria que seja pelo menos um tamanho menor que ela.",
      },
      {
        name: "Salto Evasivo",
        description:
          "Se sua montaria for alvo de um efeito que permite um teste de resistência de Destreza para receber apenas metade do dano, ela não recebe dano algum se for bem-sucedida no teste, e recebe apenas metade do dano se falhar. Para que sua montaria obtenha este benefício, você deve estar montado nela e nenhum dos dois pode estar Incapacitado.",
      },
      {
        name: "Desviar Ataque",
        description:
          "Enquanto estiver montado, você pode forçar um ataque que atinge sua montaria a atingir você em vez disso, desde que você não esteja Incapacitado.",
      },
    ],
  },
  {
    id: "feat-observant",
    name: ["Observador", "Observant"],
    description:
      "Sua atenção aos detalhes é inigualável, permitindo que você perceba pistas, leia lábios e encontre coisas escondidas com facilidade.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: false,
    },
    requirements: {
      user: {
        conditionMode: "all",
        events: [
          {
            type: "hasLevel",
            value: 4,
            comparison: "greaterOrEqual",
          },
          {
            conditionMode: "any",
            events: [
              {
                type: "hasAttribute",
                attribute: "intelligence",
                value: 13,
                comparison: "greaterOrEqual",
              },
              {
                type: "hasAttribute",
                attribute: "wisdom",
                value: 13,
                comparison: "greaterOrEqual",
              },
            ],
          },
        ],
      },
    },

    effects: [
      {
        type: "passive_grantProficiency",
        on: "skill",
        name: "Proficiência em Habilidade",
        choose: {
          count: 1,
          from: ["insight", "investigation", "perception"],
        },
      },
      {
        type: "passive_modifyAbilityScore",
        maxScore: 20,
        name: "Aumento no valor de Atributo",
        choices: [
          {
            operation: "add",
            pick: { from: ["intelligence", "wisdom"], amount: 1 },
            value: 1,
          },
        ],
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description:
          "Aumenta seu valor de Inteligência ou Sabedoria em 1 ponto.",
      },
      {
        name: "Proficiência em Perícia",
        description:
          "Escolha uma das seguintes perícias: **Intuição, Investigação ou Percepção**. Você ganha proficiência nela.",
      },
      {
        name: "Observador Ávido",
        description:
          "Se você já for proficiente em uma das perícias de Intuição, Investigação ou Percepção, você ganha Especialização (Expertise) em vez disso.",
      },
      {
        name: "Busca Rápida",
        description:
          "Você pode usar a ação de **Buscar** como uma **Ação Bônus**.",
      },
    ],
  },
  {
    id: "feat-piercer",
    name: ["Perfurador", "Piercer"],
    description:
      "Você é um especialista em ataques que perfuram a armadura, capaz de aumentar o dano e desferir golpes críticos devastadores.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: false,
    },
    requirements: {
      user: {
        events: [{ type: "hasLevel", value: 4, comparison: "greaterOrEqual" }],
      },
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        maxScore: 20,
        choices: [
          {
            operation: "add",
            pick: { from: ["dexterity", "strength"], amount: 1 },
            value: 1,
          },
        ],
        name: "Aumento no valor de Atributo",
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description: "Aumenta seu valor de Força ou Destreza em 1 ponto.",
      },
      {
        name: "Perfurar",
        description:
          "Uma vez por turno, ao acertar uma criatura com um ataque que causa dano perfurante, você pode rolar novamente um dos dados de dano do ataque e deve usar o novo resultado.",
      },
      {
        name: "Crítico Aprimorado",
        description:
          "Quando você consegue um acerto crítico que causa dano perfurante, você pode rolar um dado de dano adicional e adicioná-lo ao dano total do ataque.",
      },
    ],
  },
  {
    id: "feat-poisoner",
    name: ["Envenenador", "Poisoner"],
    description:
      "Você domina a arte da toxicologia, capaz de criar e aplicar venenos de forma rápida e letal.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: false,
    },
    requirements: {
      user: {
        events: [{ type: "hasLevel", value: 4, comparison: "greaterOrEqual" }],
      },
    },

    effects: [
      {
        type: "passive_modifyAbilityScore",
        maxScore: 20,
        choices: [
          {
            operation: "add",
            pick: { from: ["dexterity", "intelligence"], amount: 1 },
            value: 1,
          },
        ],
        name: "Aumento no valor de Atributo",
      },
      {
        type: "passive_grantProficiency",
        on: "tool",
        name: "Proficiência em kit de venenos",
        choose: { count: "all", from: ["tool-poisoners-kit"] },
      },
    ],

    traits: [
      {
        name: "Aumento de Atributo",
        description:
          "Aumenta seu valor de Destreza ou Inteligência em 1 ponto.",
      },
      {
        name: "Proficiência em Kit de Envenenador",
        description: "Você ganha proficiência com o **Kit de Envenenador**.",
      },
      {
        name: "Veneno Potente",
        description:
          "Quando você causa dano de Veneno, ele ignora Resistência a esse tipo de dano.",
      },
      {
        name: "Preparar Veneno",
        description:
          "Com 1 hora de trabalho e 50 PO em materiais, você pode criar um número de doses de veneno igual ao seu Bônus de Proficiência. Com uma **Ação Bônus**, você pode aplicar uma dose em uma arma ou munição. O veneno dura por 1 minuto ou até causar dano. Quando uma criatura é atingida pela arma envenenada, ela deve ser bem-sucedida em um teste de resistência de Constituição (CD = **8 + mod. do atributo aumentado + Bônus de Proficiência**) ou receber **2d8** de dano de Veneno e ficar com a condição Envenenado até o final do seu próximo turno.",
      },
    ],
  },
  {
    id: "feat-polearm-master",
    name: ["Mestre em Haste", "Polearm Master"],
    description:
      "Você é um mestre no combate com armas de haste, capaz de controlar o campo de batalha e atacar com a ponta e a extremidade da arma.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: false,
    },
    requirements: {
      user: {
        events: [{ type: "hasLevel", value: 4, comparison: "greaterOrEqual" }],
        conditionMode: "all",
      },
    },

    effects: [
      {
        type: "passive_modifyAbilityScore",
        maxScore: 20,
        name: "Aumento no valor de Atributo",
        choices: [
          {
            operation: "add",
            pick: { from: ["dexterity", "strength"], amount: 1 },
            value: 1,
          },
        ],
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description: "Aumenta seu valor de Força ou Destreza em 1 ponto.",
      },
      {
        name: "Ataque com Haste",
        description:
          "Logo após usar a ação **Ataque** com um bordão, lança, ou uma arma com as propriedades Pesada e Alcance, você pode usar uma **Ação Bônus** para fazer um ataque corpo a corpo com a outra extremidade da arma. O ataque causa dano de Concussão e o dado de dano é um d4.",
      },
      {
        name: "Ataque Reativo",
        description:
          "Enquanto estiver segurando um bordão, lança, ou uma arma com as propriedades Pesada e Alcance, você pode usar sua **Reação** para fazer um ataque corpo a corpo contra uma criatura que entrar no seu alcance.",
      },
    ],
  },
  {
    id: "feat-resilient",
    name: ["Resistente", "Resilient"],
    repeatable: {
      canBeRepeated: false,
    },
    source: "LDJ2024",
    category: "general",
    description:
      "Sua resiliência é a sua maior força. Você aumenta um atributo à sua escolha em +1 e ganha proficiência nos testes de resistência desse mesmo atributo.",
    requirements: {
      user: {
        events: [
          {
            type: "hasLevel",
            value: 4,
            comparison: "greaterOrEqual",
          },
        ],
      },
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        name: "Aumento de Atributo",
        choices: [
          {
            pick: {
              from: [
                "strength",
                "dexterity",
                "constitution",
                "intelligence",
                "wisdom",
                "charisma",
              ],
              amount: 1,
            },
            value: 1,
            operation: "add",
          },
        ],
        maxScore: 20,
      },
      {
        type: "passive_grantProficiency",
        name: "Proficiência em Salvaguarda",
        on: "savingThrow",
        choose: {
          from: [
            "strength",
            "dexterity",
            "constitution",
            "intelligence",
            "wisdom",
            "charisma",
          ],
          count: 1,
        },
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description:
          "Aumenta seu valor de um atributo à sua escolha em 1 ponto.",
      },
      {
        name: "Proficiência em Salvaguarda",
        description:
          "Você ganha proficiência nos testes de resistência do mesmo atributo que você aumentou.",
      },
    ],
  },
  {
    id: "feat-ritual-caster",
    name: ["Ritualista", "Ritual Caster"],
    description:
      "Você aprofundou seus estudos em magia, tornando-se capaz de conjurar magias como rituais, o que expande sua versatilidade mágica sem a necessidade de espaços de magia.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: false,
    },
    requirements: {
      user: {
        conditionMode: "all",
        events: [
          {
            type: "hasLevel",
            value: 4,
            comparison: "greaterOrEqual",
          },
          {
            conditionMode: "any",
            events: [
              {
                type: "hasAttribute",
                attribute: "intelligence",
                value: 13,
                comparison: "greaterOrEqual",
              },
              {
                type: "hasAttribute",
                attribute: "wisdom",
                value: 13,
                comparison: "greaterOrEqual",
              },
              {
                type: "hasAttribute",
                attribute: "charisma",
                value: 13,
                comparison: "greaterOrEqual",
              },
            ],
          },
        ],
      },
    },

    effects: [
      {
        type: "passive_modifyAbilityScore",
        name: "Aumento de Atributo",
        choices: [
          {
            pick: {
              from: ["intelligence", "wisdom", "charisma"],
              amount: 1,
            },
            value: 1,
            operation: "add",
          },
        ],
        maxScore: 20,
      },
    ],

    traits: [
      {
        name: "Aumento de Atributo",
        description:
          "Aumenta seu valor de Inteligência, Sabedoria ou Carisma em 1 ponto.",
      },
      {
        name: "Magias Rituais",
        description:
          "Escolha um número de magias de 1º nível com a tag Ritual, igual ao seu Bônus de Proficiência. Você sempre tem essas magias preparadas e pode conjurá-las com seus espaços de magia. Quando seu Bônus de Proficiência aumentar, você pode adicionar uma magia de 1º nível com a tag Ritual à sua lista.",
      },
      {
        name: "Ritual Rápido",
        description:
          "Você pode conjurar uma magia com a tag Ritual que você tenha preparada usando seu tempo de conjuração normal, em vez do tempo estendido de ritual. Isso não gasta um espaço de magia. Após usar este benefício, você não pode usá-lo novamente até terminar um Descanso Longo.",
      },
    ],
  },
  {
    id: "feat-sentinel",
    name: ["Sentinela", "Sentinel"],
    description:
      "Você é um guardião implacável, capaz de impedir que inimigos fujam do seu alcance e de atacar aqueles que se atrevem a ferir seus aliados.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: false,
    },
    requirements: {
      user: {
        events: [{ type: "hasLevel", value: 4, comparison: "greaterOrEqual" }],
        conditionMode: "all",
      },
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        maxScore: 20,
        choices: [
          {
            operation: "add",
            pick: { from: ["dexterity", "strength"], amount: 1 },
            value: 1,
          },
        ],
        name: "Aumento no valor de Atributo",
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description: "Aumenta seu valor de Força ou Destreza em 1 ponto.",
      },
      {
        name: "Guardião",
        description:
          "Logo após uma criatura a 5 pés de você usar a ação **Desengajar** ou atingir um alvo que não seja você, você pode fazer um **Ataque de Oportunidade** contra ela.",
      },
      {
        name: "Imobilizar",
        description:
          "Quando você atinge uma criatura com um **Ataque de Oportunidade**, o deslocamento dela se torna 0 pelo resto do turno.",
      },
    ],
  },
  {
    id: "feat-shadow-touched",
    name: ["Tocado pelas Sombras", "Shadow-Touched"],
    description:
      "O contato com as Sombras deixou uma marca em você, concedendo a habilidade de conjurar magias furtivas.",
    repeatable: { canBeRepeated: false },
    source: "LDJ2024",
    category: "general",
    requirements: {
      user: {
        events: [{ type: "hasLevel", value: 4, comparison: "greaterOrEqual" }],
      },
    },

    effects: [
      {
        type: "passive_modifyAbilityScore",
        name: "Aumento de Atributo",
        choices: [
          {
            pick: {
              from: ["intelligence", "wisdom", "charisma"],
              amount: 1,
            },
            value: 1,
            operation: "add",
          },
        ],
        maxScore: 20,
      },
      {
        type: "passive_providesSpellKnowledge",
        mode: "fixedSpells",
        spells: ["spell-invisibility"],
        canBeSwappedOn: "never",
        name: "Magia Sombria",
        castingAbilityOptions: ["selectedByFeat"],
        freeCasting: {
          amount: 1,
          recharge: { maxCharges: 1, rechargeOn: "dawn", type: "event", recoveryAmount: 1 },
        },
        description:
          "Você aprende a magia Invisibilidade. Você pode conjurá-la uma vez por Descanso Longo sem gastar um espaço de magia. Você também pode conjurá-la normalmente usando seus espaços de magia.",
      },
      {
        type: "passive_providesSpellKnowledge",
        mode: "filter",
        filter: { school: ["illusion", "necromancy"], level: 1 },
        amount: 1,
        freeCasting: {
          amount: 1,
          recharge: { maxCharges: 1, rechargeOn: "dawn", type: "event", recoveryAmount: 1 },
        },
        canBeSwappedOn: "levelUp",
        description:
          "Você aprende uma magia de 1º nível à sua escolha das escolas de Ilusão ou Necromancia. Você pode conjurá-la uma vez por Descanso Longo sem gastar um espaço de magia. Você também pode conjurá-la normalmente usando seus espaços de magia.",
        name: "Magia Bônus",
        castingAbilityOptions: ["selectedByFeat"],
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description:
          "Aumenta seu valor de Inteligência, Sabedoria ou Carisma em 1 ponto.",
      },
      {
        name: "Magia Sombria",
        description:
          "Você aprende a magia Invisibilidade e pode conjurá-la uma vez por Descanso Longo sem gastar um espaço de magia. Você também pode conjurá-la normalmente usando seus espaços de magia.",
      },
      {
        name: "Magia Bônus",
        description:
          "Você aprende uma magia de 1º nível à sua escolha das escolas de Ilusão ou Necromancia. Você pode conjurá-la uma vez por Descanso Longo sem gastar um espaço de magia. Você também pode conjurá-la normalmente usando seus espaços de magia.",
      },
    ],
  },
  {
    id: "feat-sharpshooter",
    name: ["Franco-atirador", "Sharpshooter"],
    description:
      "Você é um franco-atirador letal, capaz de acertar alvos a longas distâncias, ignorar a cobertura do inimigo e desferir golpes mais precisos.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: false,
    },
    requirements: {
      user: {
        events: [
          { type: "hasLevel", value: 4, comparison: "greaterOrEqual" },
          {
            type: "hasAttribute",
            attribute: "dexterity",
            value: 13,
            comparison: "greaterOrEqual",
          },
        ],
      },
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        name: "Aumento de Destreza",
        choices: [
          {
            pick: { from: ["dexterity"], amount: 1 },
            value: 1,
            operation: "add",
          },
        ],
        maxScore: 20,
      },
    ],
    traits: [
      {
        name: "Aumento de Destreza",
        description: "Aumenta seu valor de Destreza em 1 ponto.",
      },
      {
        name: "Ignorar Cobertura",
        description:
          "Seus ataques com armas de longo alcance ignoram as defesas de Meia Cobertura e Três Quartos de Cobertura.",
      },
      {
        name: "Disparar em Combate Corpo a Corpo",
        description:
          "Estar a 5 pés de um inimigo não impõe Desvantagem em suas jogadas de ataque com armas de longo alcance.",
      },
      {
        name: "Tiros de Longa Distância",
        description:
          "Atacar no alcance longo de uma arma de longo alcance não impõe Desvantagem em suas jogadas de ataque.",
      },
    ],
  },
  {
    id: "feat-shield-master",
    name: ["Mestre do Escudo", "Shield Master"],
    description:
      "Você não usa o escudo apenas para se defender, mas como uma extensão de seu corpo em combate, capaz de usá-lo para atacar, derrubar inimigos e se proteger de efeitos mágicos.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: false,
    },
    requirements: {
      user: {
        events: [
          { type: "hasLevel", value: 4, comparison: "greaterOrEqual" },
          {
            type: "isProficientWith",
            armorType: "shield",
          },
        ],
      },
    },

    effects: [
      {
        type: "passive_modifyAbilityScore",
        name: "Aumento de Força",
        choices: [
          {
            pick: { from: ["strength"], amount: 1 },
            value: 1,
            operation: "add",
          },
        ],
        maxScore: 20,
      },
    ],
    traits: [
      {
        name: "Aumento de Força",
        description: "Aumenta seu valor de Força em 1 ponto.",
      },
      {
        name: "Pancada de Escudo",
        description:
          "Se você acertar uma criatura a 5 pés de você com um ataque corpo a corpo, pode usar seu escudo para empurrá-la ou derrubá-la como uma **Ação Bônus**. O alvo deve ser bem-sucedido em um teste de resistência de Força (CD = **8 + mod. de Força + Bônus de Proficiência**) para evitar o efeito.",
      },
      {
        name: "Interpor Escudo",
        description:
          "Se você for alvo de um efeito que permite um teste de resistência de Destreza para receber apenas metade do dano, pode usar sua **Reação** para não receber dano se for bem-sucedido, desde que esteja segurando um escudo.",
      },
    ],
  },
  {
    id: "feat-skill-expert",
    name: ["Especialista em Perícias", "Skill Expert"],
    description:
      "Seu treinamento focou em aprimorar suas capacidades, concedendo proficiência e especialização em perícias, além de aumentar um de seus atributos.",
    source: "LDJ2024",
    repeatable: { canBeRepeated: false },
    category: "general",
    requirements: {
      user: {
        events: [{ type: "hasLevel", value: 4, comparison: "greaterOrEqual" }],
      },
    },

    effects: [
      {
        type: "passive_modifyAbilityScore",
        maxScore: 20,
        choices: [
          {
            operation: "add",
            pick: {
              from: [
                "strength",
                "dexterity",
                "constitution",
                "intelligence",
                "wisdom",
                "charisma",
              ],
              amount: 1,
            },
            value: 1,
          },
        ],
        name: "Aumento no valor de Atributo",
      },
      {
        type: "passive_grantProficiency",
        on: "skill",
        choose: { count: 1, from: "any" },
        name: "Proficiência em Perícia",
      },
      {
        type: "passive_grantExpertise",
        on: "skill",
        choose: { count: 1, from: "anyProficient" },
        name: "Especialização em Perícia",
      },
    ],

    traits: [
      {
        name: "Aumento de Atributo",
        description:
          "Aumenta seu valor de um atributo à sua escolha em 1 ponto.",
      },
      {
        name: "Proficiência em Perícia",
        description: "Você ganha proficiência em uma perícia à sua escolha.",
      },
      {
        name: "Especialização",
        description:
          "Escolha uma perícia na qual você já seja proficiente e ganhe Especialização nela.",
      },
    ],
  },
  {
    id: "feat-skulker",
    name: ["Furtivo", "Skulker"],
    description:
      "Você é um mestre da furtividade, capaz de se esconder e se mover sem ser notado mesmo em situações de visibilidade limitada ou no calor do combate.",
    source: "LDJ2024",
    repeatable: { canBeRepeated: false },
    category: "general",
    requirements: {
      user: {
        events: [
          { type: "hasLevel", value: 4, comparison: "greaterOrEqual" },
          {
            type: "hasAttribute",
            attribute: "dexterity",
            value: 13,
            comparison: "greaterOrEqual",
          },
        ],
      },
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        name: "Aumento de Destreza",
        choices: [
          {
            pick: { from: ["dexterity"], amount: 1 },
            value: 1,
            operation: "add",
          },
        ],
        maxScore: 20,
      },
      {
        type: "passive_providesVision",
        name: "Visão no Escuro",
        vision: "blindsight",
        range: { normal: 10, unit: "ft" },
      },
    ],

    traits: [
      {
        name: "Aumento de Destreza",
        description: "Aumenta seu valor de Destreza em 1 ponto.",
      },
      {
        name: "Visão Cega",
        description: "Você tem Visão Cega até um alcance de 10 pés.",
      },
      {
        name: "Aproveitar o Combate",
        description:
          "Você explora as distrações do combate, ganhando Vantagem em qualquer teste de Destreza (**Furtividade**) que fizer como parte da ação de **Esconder** durante o combate.",
      },
      {
        name: "Atirador",
        description:
          "Se você fizer um ataque enquanto estiver escondido e errar, a jogada de ataque não revela sua posição.",
      },
    ],
  },
  {
    id: "feat-slasher",
    name: ["Cortador", "Slasher"],
    description:
      "Seus ataques cortantes são tão precisos que ferem seus inimigos de forma a dificultar seus movimentos, e um golpe crítico pode deixá-los atordoados.",
    source: "LDJ2024",
    repeatable: { canBeRepeated: false },
    category: "general",
    requirements: {
      user: {
        events: [{ type: "hasLevel", value: 4, comparison: "greaterOrEqual" }],
      },
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        maxScore: 20,
        choices: [
          {
            operation: "add",
            pick: { from: ["dexterity", "strength"], amount: 1 },
            value: 1,
          },
        ],
        name: "Aumento no valor de Atributo",
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description: "Aumenta seu valor de Força ou Destreza em 1 ponto.",
      },
      {
        name: "Tendão Cortado",
        description:
          "Uma vez por turno, ao acertar uma criatura com um ataque que causa dano Cortante, você pode reduzir o deslocamento dela em 10 pés até o início do seu próximo turno.",
      },
      {
        name: "Crítico Aprimorado",
        description:
          "Quando você consegue um acerto crítico que causa dano Cortante, o alvo faz suas jogadas de ataque com Desvantagem até o início do seu próximo turno.",
      },
    ],
  },
  {
    id: "feat-speedy",
    name: ["Veloz", "Speedy"],
    description:
      "Sua velocidade e agilidade são superiores, permitindo que você se mova rapidamente pelo campo de batalha e evite ataques de oportunidade.",
    source: "LDJ2024",
    repeatable: { canBeRepeated: false },
    category: "general",
    requirements: {
      user: {
        conditionMode: "all",
        events: [
          { type: "hasLevel", value: 4, comparison: "greaterOrEqual" },
          {
            conditionMode: "any",
            events: [
              {
                type: "hasAttribute",
                attribute: "dexterity",
                value: 13,
                comparison: "greaterOrEqual",
              },
              {
                type: "hasAttribute",
                attribute: "constitution",
                value: 13,
                comparison: "greaterOrEqual",
              },
            ],
          },
        ],
      },
    },

    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            operation: "add",
            pick: { from: ["dexterity", "constitution"], amount: 1 },
            value: 1,
          },
        ],
        maxScore: 20,
        name: "Aumento no valor de Atributo",
      },
    ],

    traits: [
      {
        name: "Aumento de Atributo",
        description:
          "Aumenta seu valor de Destreza ou Constituição em 1 ponto.",
      },
      {
        name: "Aumento de Deslocamento",
        description: "Seu deslocamento aumenta em 10 pés.",
      },
      {
        name: "Disparada em Terreno Difícil",
        description:
          "Quando você usa a ação **Disparada**, o Terreno Difícil não reduz seu deslocamento durante este turno.",
      },
      {
        name: "Movimento Ágil",
        description:
          "Ataques de Oportunidade feitos contra você têm Desvantagem.",
      },
    ],
  },
  {
    id: "feat-spell-sniper",
    name: ["Franco-atirador de Magia", "Spell Sniper"],
    description:
      "Você é um mestre da magia de longo alcance. Suas magias de ataque atingem alvos a distâncias impressionantes e ignoram as defesas de cobertura.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: false,
    },
    requirements: {
      user: {
        events: [
          { type: "hasLevel", value: 4, comparison: "greaterOrEqual" },
          { type: "hasSpellcasting" },
        ],
      },
    },

    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            operation: "add",
            pick: { from: ["intelligence", "wisdom", "charisma"], amount: 1 },
            value: 1,
          },
        ],
        maxScore: 20,
        name: "Aumento no valor de Atributo",
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description:
          "Aumenta seu valor de Inteligência, Sabedoria ou Carisma em 1 ponto.",
      },
      {
        name: "Ignorar Cobertura",
        description:
          "Suas magias de ataque ignoram as defesas de Meia Cobertura e Três Quartos de Cobertura.",
      },
      {
        name: "Conjurando em Combate Corpo a Corpo",
        description:
          "Estar a até 5 pés de um inimigo não impõe Desvantagem nas suas jogadas de ataque com magias.",
      },
      {
        name: "Alcance Aprimorado",
        description:
          "Quando você conjura uma magia que tem um alcance de pelo menos 10 pés e exige que você faça uma jogada de ataque, o alcance da magia é dobrado.",
      },
    ],
  },
  {
    id: "feat-telekinetic",
    name: ["Telecinético", "Telekinetic"],
    description:
      "Sua mente é uma ferramenta poderosa. Você é capaz de mover objetos e criaturas usando apenas telecinese, além de conjurar a magia Mão do Mago.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: false,
    },
    requirements: {
      user: {
        events: [{ type: "hasLevel", value: 4, comparison: "greaterOrEqual" }],
      },
    },

    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            operation: "add",
            pick: { from: ["intelligence", "wisdom", "charisma"], amount: 1 },
            value: 1,
          },
        ],
        maxScore: 20,
        name: "Aumento no valor de Atributo",
      },
      {
        type: "passive_providesSpellKnowledge",
        mode: "fixedSpells",
        spells: ["spell-mage-hand"],
        canBeSwappedOn: "never",
        freeCasting: {
          amount: 1,
          recharge: { maxCharges: 1, rechargeOn: "dawn", type: "event", recoveryAmount: 1 },
        },
        name: "Magia Telecinética",
        castingAbilityOptions: ["selectedByFeat"],
        description:
          "Você aprende a magia Mão do Mago. Você pode conjurá-la sem componentes verbais ou somáticos, torná-la invisível, e o alcance e a distância que ela pode se afastar de você aumentam em 30 pés. O atributo de conjuração é o atributo que você aumentou com este talento.",
      },
    ],

    traits: [
      {
        name: "Aumento de Atributo",
        description:
          "Aumenta seu valor de Inteligência, Sabedoria ou Carisma em 1 ponto.",
      },
      {
        name: "Telecinese Menor",
        description:
          "Você aprende a magia **Mão do Mago**. Você pode conjurá-la sem componentes verbais ou somáticos, torná-la invisível, e o alcance e a distância que ela pode se afastar de você aumentam em 30 pés. O atributo de conjuração é o atributo que você aumentou com este talento.",
      },
      {
        name: "Empurrão Telecinético",
        description:
          "Como uma **Ação Bônus**, você pode empurrar telecineticamente uma criatura que possa ver a até 30 pés de você. A criatura deve ser bem-sucedida em um teste de resistência de Força (CD = **8 + mod. do atributo aumentado + Bônus de Proficiência**) ou ser movida 5 pés para perto ou para longe de você.",
      },
    ],
  },
  {
    id: "feat-telepathic",
    name: ["Telepata", "Telepathic"],
    description:
      "Você despertou suas habilidades psíquicas. Agora, pode se comunicar telepaticamente com outras criaturas e até mesmo detectar seus pensamentos.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: false,
    },
    requirements: {
      user: {
        events: [{ type: "hasLevel", value: 4, comparison: "greaterOrEqual" }],
      },
    },

    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            operation: "add",
            pick: { from: ["intelligence", "wisdom", "charisma"], amount: 1 },
            value: 1,
          },
        ],
        maxScore: 20,
        name: "Aumento no valor de Atributo",
      },
      {
        type: "passive_providesSpellKnowledge",
        mode: "fixedSpells",
        spells: ["spell-detect-thoughts"],
        canBeSwappedOn: "never",
        freeCasting: {
          amount: 1,
          recharge: { maxCharges: 1, rechargeOn: "dawn", type: "event", recoveryAmount: 1 },
        },
        name: "Magia Feérica",
        castingAbilityOptions: ["selectedByFeat"],
        description:
          "Você ganha a magia Passo Nebuloso como uma magia conhecida.",
      },
    ],

    traits: [
      {
        name: "Aumento de Atributo",
        description:
          "Aumenta seu valor de Inteligência, Sabedoria ou Carisma em 1 ponto.",
      },
      {
        name: "Comunicação Telepática",
        description:
          "Você pode se comunicar telepaticamente com qualquer criatura que possa ver a até 60 pés. A comunicação é em uma língua que você conhece, e a criatura só a entende se também souber a língua. A criatura não pode responder telepatidamente.",
      },
      {
        name: "Detectar Pensamentos",
        description:
          "Você sempre tem a magia **Detectar Pensamentos** preparada. Você pode conjurá-la uma vez por Descanso Longo sem gastar um espaço de magia. Você também pode conjurá-la normalmente usando seus espaços de magia. O atributo de conjuração é o atributo que você aumentou com este talento.",
      },
    ],
  },
  {
    id: "feat-war-caster",
    name: ["Conjurador de Guerra", "War Caster"],
    description:
      "Você é um conjurador treinado para o combate. Você consegue manter a concentração em suas magias sob ataque, pode conjurar magias de forma reativa e até mesmo realizar os componentes somáticos com as mãos ocupadas.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: false,
    },
    requirements: {
      user: {
        events: [
          { type: "hasLevel", value: 4, comparison: "greaterOrEqual" },
          { type: "hasSpellcasting" },
        ],
      },
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            operation: "add",
            pick: { from: ["intelligence", "wisdom", "charisma"], amount: 1 },
            value: 1,
          },
        ],
        maxScore: 20,
        name: "Aumento no valor de Atributo",
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description:
          "Aumenta seu valor de Inteligência, Sabedoria ou Carisma em 1 ponto.",
      },
      {
        name: "Concentração",
        description:
          "Você tem Vantagem em testes de resistência de Constituição feitos para manter a concentração em magias.",
      },
      {
        name: "Magia Reativa",
        description:
          "Quando uma criatura provoca um **Ataque de Oportunidade** ao deixar seu alcance, você pode usar sua **Reação** para conjurar uma magia que tenha um tempo de conjuração de 1 ação e que afete apenas a criatura que o provocou.",
      },
      {
        name: "Componentes Somáticos",
        description:
          "Você pode realizar os componentes somáticos de magias mesmo quando estiver segurando armas ou um escudo em uma ou ambas as mãos.",
      },
    ],
  },
  {
    id: "feat-weapon-master",
    name: ["Mestre em Armas", "Weapon Master"],
    description:
      "Seu domínio com armas é notável. Você ganha proficiência com um conjunto de armas, e pode usar a propriedade de Maestria de uma delas.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: false,
    },
    requirements: {
      user: {
        events: [{ type: "hasLevel", value: 4, comparison: "greaterOrEqual" }],
      },
    },
    effects: [
      {
        type: "passive_modifyAbilityScore",
        maxScore: 20,
        choices: [
          {
            operation: "add",
            pick: { from: ["dexterity", "strength"], amount: 1 },
            value: 1,
          },
        ],
        name: "Aumento no valor de Atributo",
      },
    ],
    traits: [
      {
        name: "Aumento de Atributo",
        description: "Aumenta seu valor de Força ou Destreza em 1 ponto.",
      },
      {
        name: "Propriedade de Maestria",
        description:
          "Seu treinamento com armas permite que você use a propriedade de Maestria de um tipo de arma Simples ou Marcial de sua escolha, desde que seja proficiente nela. Ao terminar um **Descanso Longo**, você pode mudar o tipo de arma para outro elegível.",
      },
      {
        name: "Proficiência com Arma",
        description:
          "Você adquire proficiência com quatro armas à sua escolha.",
      },
    ],
  },
];
