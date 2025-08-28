import { Feat } from "../../domain/feat/feat.schema.js";

export const feats: Feat[] = [
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
      "Aumente um atributo em 2, ou dois atributos em 1. Você pode pegar este talento múltiplas vezes.",
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
  },
  {
    name: ["Ator", "Actor"],
    source: "LDJ2024",
    id: "feat-actor",
    repeatable: {
      canBeRepeated: false,
    },
    description:
      "Você é um mestre da interpretação e pode imitar outras criaturas com facilidade.",
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
        name: "Interpretação",
        description:
          "Enquanto você está disfarçado como uma pessoa real ou fictícia, você tem Vantagem em testes de Carisma (Enganação ou Performance) para convencer os outros de que você é essa pessoa.",
      },
      {
        name: "Mímico",
        description:
          "Você pode imitar os sons de outras criaturas, incluindo a fala. Uma criatura que ouve a imitação deve ter sucesso em um teste de Sabedoria (Intuição) para determinar se o efeito é falso (CD 8) + seu modificador de Carisma + seu Bônus de Proficiência.",
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
      "Você treinou para ser excepcionalmente forte e ágil, ganhando habilidades físicas aprimoradas.",
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
        name: "Velocidade de Escalada",
        description:
          "Você ganha uma Velocidade de Escalada igual à sua Velocidade.",
      },
      {
        name: "Levantar-se Rapidamente",
        description:
          "Quando você tem a condição Caído, você pode se levantar com apenas 5 pés de movimento.",
      },
      {
        name: "Salto",
        description:
          "Você pode fazer um Salto em Distância ou Altura correndo após se mover apenas 5 pés.",
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
      "Você é especialista em avançar rapidamente e atacar com força após se mover.",
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
        name: "Improved Dash",
        description:
          "Quando você realiza a ação de Dash, sua Velocidade aumenta em 10 pés durante essa ação.",
      },
      {
        name: "Charge Attack",
        description:
          "Se você se mover pelo menos 10 pés em linha reta em direção a um alvo imediatamente antes de atingi-lo com um ataque corpo a corpo como parte da ação de Ataque, escolha um dos seguintes efeitos: ganhe um bônus de 1d8 na rolagem de dano do ataque ou empurre o alvo até 10 pés para longe de você se ele não for mais do que um tamanho maior que você. Você pode usar esse benefício apenas uma vez em cada um dos seus turnos.",
      },
    ],
  },
  {
    id: "feat-chef",
    name: ["Cozinheiro", "Chef"],
    description:
      "Você é habilidoso em preparar refeições que restauram e fortalecem seus aliados.",
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
        name: "Cook's Utensils",
        description:
          "You gain proficiency with Cook's Utensils if you don't already have it.",
      },
      {
        name: "Replenishing Meal",
        description:
          "As part of a Short Rest, you can cook special food if you have ingredients and Cook's Utensils on hand. You can prepare enough of this food for a number of creatures equal to 4 plus your Proficiency Bonus. At the end of the Short Rest, any creature who eats the food and spends one or more Hit Dice to regain Hit Points regains an extra {@dice 1d8} Hit Points.",
      },
      {
        name: "Bolstering Treats",
        description:
          "With 1 hour of work or when you finish a Long Rest, you can cook a number of treats equal to your Proficiency Bonus if you have ingredients and Cook's Utensils on hand. These special treats last 8 hours after being made. A creature can use a Bonus Action to eat one of those treats to gain a number of Temporary Hit Points equal to your Proficiency Bonus.",
      },
    ],
  },
  {
    id: "feat-crossbow-expert",
    name: ["Especialista em Bestas", "Crossbow Expert"],
    description:
      "Você é treinado no uso de bestas, podendo recarregá-las rapidamente e atacar à queima-roupa.",
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
        name: "Ignore Loading",
        description:
          "You ignore the Loading property of the Hand Crossbow, Heavy Crossbow, and Light Crossbow (all called crossbows elsewhere in this feat). If you're holding one of them, you can load a piece of ammunition into it even if you lack a free hand.",
      },
      {
        name: "Firing in Melee",
        description:
          "Being within 5 feet of an enemy doesn't impose Disadvantage on your attack rolls with crossbows.",
      },
      {
        name: "Dual Wielding",
        description:
          "When you make the extra attack of the Light property, you can add your ability modifier to the damage of the extra attack if that attack is with a crossbow that has the Light property and you aren't already adding that modifier to the damage.",
      },
    ],
  },
  {
    id: "feat-crusher",
    name: ["Esmagador", "Crusher"],
    description:
      "Você é especialista em ataques contundentes, empurrando inimigos e aproveitando acertos críticos.",
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
        name: "Empurrar",
        description:
          "Uma vez por turno, quando você acerta uma criatura com um ataque que causa dano de Concussão, você pode movê-la 5 pés para um espaço desocupado se o alvo não for mais de um tamanho maior que você.",
      },
      {
        name: "Crítico Aprimorado",
        description:
          "Quando você faz um Acerto Crítico que causa dano de Concussão a uma criatura, jogadas de ataque contra essa criatura têm Vantagem até o início do seu próximo turno.",
      },
    ],
  },
  {
    id: "feat-defensive-duelist",
    name: ["Duelista Defensivo", "Defensive Duelist"],
    description:
      "Você é hábil em se defender com armas de uma mão, desviando ataques com destreza.",
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
        name: "Aparar",
        description:
          "Se você estiver empunhando uma arma com a propriedade Acuidade e outra criatura acertar você com um ataque corpo a corpo, você pode usar uma Reação para adicionar seu Bônus de Proficiência à sua Classe de Armadura, potencialmente fazendo com que o ataque erre. Você ganha esse bônus à sua CA contra ataques corpo a corpo até o início do seu próximo turno.",
      },
    ],
  },
  {
    id: "feat-dual-wielder",
    name: ["Ambidestro", "Dual Wielder"],
    description:
      "Você pode lutar com uma arma em cada mão com mais eficiência do que a maioria.",
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
        name: "Empunhadura Dupla Aprimorada",
        description:
          "Quando você usa a ação de Ataque no seu turno e ataca com uma arma que tem a propriedade Leve, você pode fazer um ataque extra como uma Ação Bônus mais tarde no mesmo turno com uma arma diferente, que deve ser uma arma Corpo a Corpo que não tenha a propriedade de Duas Mãos. Você não adiciona seu modificador de habilidade ao dano do ataque extra, a menos que esse modificador seja negativo.",
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
      "Você é notavelmente resistente, recuperando-se rapidamente de ferimentos.",
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
        name: "Desafiar a Morte",
        description:
          "Você tem Vantagem em Testes de Resistência contra a Morte.",
      },
      {
        name: "Recuperação Rápida",
        description:
          "Como uma Ação Bônus, você pode gastar um dos seus Dados de Vida, rolar o dado e recuperar um número de Pontos de Vida igual ao resultado.",
      },
    ],
  },
  {
    id: "feat-elemental-adept",
    name: ["Adepto Elemental", "Elemental Adept"],
    description:
      "Você ignora resistência a um tipo de dano elemental e melhora o dano de magias desse tipo.",
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
        name: "Maestria Elemental",
        description:
          "Escolha um dos seguintes tipos de dano: Ácido, Frio, Fogo, Elétrico ou Trovão. As magias que você conjura ignoram a Resistência ao dano do tipo escolhido. Além disso, quando você rolar dano para uma magia que conjura e que causa dano desse tipo, você pode tratar qualquer resultado 1 em um dado de dano como 2.",
      },
      {
        name: "Repetível",
        description:
          "Você pode escolher este talento mais de uma vez, mas deve escolher um tipo de dano diferente para Maestria Elemental a cada vez.",
      },
    ],
  },
  {
    id: "feat-fey-touched",
    name: ["Tocado pela Fey", "Fey-Touched"],
    description:
      "Sua exposição à magia do Plano Feérico concede a você os seguintes benefícios: Magia Feérica - Escolha uma magia de nível 1 da escola de Adivinhação ou Encantamento. Você sempre tem essa magia e a magia Passo Nebuloso preparadas. Você pode conjurar cada uma dessas magias sem gastar um espaço de magia. Uma vez que você conjure qualquer uma dessas magias dessa maneira, você não pode conjurá-la novamente até completar um descanso longo. Você também pode conjurar essas magias usando espaços de magia que você tenha do nível apropriado. A habilidade de conjuração das magias é a habilidade aumentada por este talento.",
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
        type: "passive_grantSpellKnowledge",
        mode: "fixedSpells",
        spells: ["spell-misty-step"],
        canBeSwappedOn: "never",
        freeCasting: {
          amount: 1,
          recharge: { max: 1, rest: "dawn", type: "rest" },
        },
        name: "Magia Feérica",
        castingAbilityOptions: ["selectedByFeat"],
        description:
          "Você ganha a magia Passo Nebuloso como uma magia conhecida.",
      },
      {
        type: "passive_grantSpellKnowledge",
        mode: "filter",
        filter: { school: ["divination", "enchantment"], level: 1 },
        amount: 1,
        freeCasting: {
          amount: 1,
          recharge: { max: 1, rest: "dawn", type: "rest" },
        },
        canBeSwappedOn: "levelUp",
        description:
          "Você ganha uma magia de nível 1 da escola de Adivinhação ou Encantamento como uma magia conhecida.",
        name: "Magia Feérica",
        castingAbilityOptions: ["selectedByFeat"],
      },
    ],
  },
  {
    id: "feat-grappler",
    name: ["Agarrador", "Grappler"],
    description:
      "Você é especialista em agarrar inimigos e mantê-los sob controle.",
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
        name: "Golpear e Agarrar",
        description:
          "Quando você acerta uma criatura com um Ataque Desarmado como parte da ação de Ataque em seu turno, você pode usar tanto a opção de Dano quanto a de Agarrar. Você pode usar esse benefício apenas uma vez por turno.",
      },
      {
        name: "Vantagem no Ataque",
        description:
          "Você tem Vantagem em jogadas de ataque contra uma criatura Agarrada por você.",
      },
      {
        name: "Lutador Ágil",
        description:
          "Você não precisa gastar movimento extra para mover uma criatura Agarrada por você se a criatura for do seu tamanho ou menor.",
      },
    ],
  },
  {
    id: "feat-great-weapon-master",
    name: ["Mestre de Arma Pesada", "Great Weapon Master"],
    description:
      "Você é especialista em causar grandes danos com armas pesadas, podendo atacar novamente ao abater ou critar.",
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
        name: "Heavy Weapon Mastery",
        description:
          "Quando você acerta uma criatura com uma arma que tem a propriedade Pesada como parte da ação de Ataque em seu turno, você pode fazer com que a arma cause dano extra ao alvo. O dano extra é igual ao seu Bônus de Proficiência.",
      },
      {
        name: "Golpe de Corte",
        description:
          "Imediatamente após você conseguir um Acerto Crítico com uma arma Corpo a Corpo ou reduzir uma criatura a 0 Pontos de Vida com uma, você pode fazer um ataque com a mesma arma como uma Ação Bônus.",
      },
    ],
  },
  {
    id: "feat-heavily-armored",
    name: ["Pesadamente Armadurado", "Heavily Armored"],
    description:
      "Você treinou para usar armaduras pesadas com eficiência, aumentando sua proteção.",
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
        name: "Treinamento com Armadura",
        description: "Você ganha treinamento com armaduras Pesadas.",
      },
    ],
  },
  {
    id: "feat-heavy-armor-master",
    name: ["Mestre em Armadura Pesada", "Heavy Armor Master"],
    description:
      "Você recebe menos dano de ataques físicos enquanto usa armadura pesada.",
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
        name: "Damage Reduction",
        description:
          "When you're hit by an attack while you're wearing Heavy armor, any Bludgeoning, Piercing, and Slashing damage dealt to you by that attack is reduced by an amount equal to your Proficiency Bonus.",
      },
    ],
  },
  {
    id: "feat-inspiring-leader",
    name: ["Líder Inspirador", "Inspiring Leader"],
    description:
      "Você pode inspirar seus aliados, concedendo pontos de vida temporários após um discurso.",
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
        name: "Bolstering Performance",
        description:
          "When you finish a Short or Long Rest, you can give an inspiring performance: a speech, song, or dance. When you do so, choose up to six allies (which can include yourself) within 30 feet of yourself who witness the performance. The chosen creatures each gain Temporary Hit Points equal to your character level plus the modifier of the ability you increased with this feat.",
      },
    ],
  },
  {
    id: "feat-keen-mind",
    name: ["Mente Aguçada", "Keen Mind"],
    description: "Você tem memória excepcional e senso de direção perfeito.",
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
        name: "Estudo Rápido",
        description: "Você pode realizar a ação Estudar como uma Ação Bônus.",
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
      "Você treinou para usar armaduras leves, aumentando sua defesa.",
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
          from: ["light", "heavy"],
          count: 1,
        },
        name: "Treinamento com Armadura Pesada",
      },
    ],
    repeatable: { canBeRepeated: false },
    traits: [
      {
        name: "Armor Training",
        description: "You gain training with Light armor and Shields.",
      },
    ],
  },
  {
    id: "feat-mage-slayer",
    name: ["Matador de Magos", "Mage Slayer"],
    description:
      "Você é eficaz em combater conjuradores, interrompendo magias e atacando à curta distância.",
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
        name: "Concentration Breaker",
        description:
          "When you damage a creature that is {@status Concentration|XPHB|Concentrating}, it has Disadvantage on the saving throw it makes to maintain {@status Concentration|XPHB}.",
      },
      {
        name: "Guarded Mind",
        description:
          "If you fail an Intelligence, a Wisdom, or a Charisma saving throw, you can cause yourself to succeed instead. Once you use this benefit, you can't use it again until you finish a Short or Long Rest.",
      },
    ],
  },
  {
    id: "feat-martial-weapon-training",
    name: ["Treinamento em Armas Marciais", "Martial Weapon Training"],
    description:
      "Você recebe proficiência com armas marciais, ampliando seu arsenal de combate.",
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
  },
  {
    id: "feat-medium-armor-master",
    name: ["Mestre em Armadura Média", "Medium Armor Master"],
    description:
      "Você usa armaduras médias com mais eficiência, reduzindo penalidades e aumentando a defesa.",
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
        name: "Dexterous Wearer",
        description:
          "While you're wearing Medium armor, you can add 3, rather than 2 to your AC if you have a Dexterity score of 16 or higher.",
      },
    ],
  },
  {
    id: "feat-moderately-armored",
    name: ["Moderadamente Armadurado", "Moderately Armored"],
    description:
      "Você treinou para usar armaduras médias e escudos, aumentando sua proteção.",
    source: "LDJ2024",
    category: "general",
    prerequisite: [
      {
        level: 4,
        proficiency: [
          {
            armor: "light",
          },
        ],
      },
    ],
    effects: [
      {
        type: "passive_grantProficiency",
        on: "armorType",
        choose: {
          from: ["medium"],
          count: "all",
        },
        name: "Treinamento com Armadura Média",
        description: "Você ganha proficiência com armaduras Médias",
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
  },
  {
    id: "feat-mounted-combatant",
    name: ["Combatente Montado", "Mounted Combatant"],
    description:
      "Você é especialista em lutar montado, protegendo sua montaria e atacando com precisão.",
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
    ability: [
      {
        choose: {
          from: ["strength", "dexterity", "wisdom"],
        },
      },
    ],
    traits: [
      {
        name: "Mounted Strike",
        description: [
          "While {@book mounted|XPHB|1|Mounted Combat}, you have Advantage on attack rolls against any unmounted creature within 5 feet of your mount that is at least one size smaller than the mount.",
        ],
      },
      {
        name: "Leap Aside",
        description: [
          "If your mount is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, it instead takes no damage if it succeeds on the saving throw and only half damage if it fails. For your mount to gain this benefit, you must be riding it, and neither of you can have the {@condition Incapacitated|XPHB} condition.",
        ],
      },
      {
        name: "Veer",
        description: [
          "While {@book mounted|XPHB|1|Mounted Combat}, you can force an attack that hits your mount to hit you instead if you don't have the {@condition Incapacitated|XPHB} condition.",
        ],
      },
    ],
  },
  {
    id: "feat-observant",
    name: ["Observador", "Observant"],
    description:
      "Você é atento aos detalhes, percebendo pistas e lendo lábios com facilidade.",
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
    ability: [
      {
        choose: {
          from: ["intelligence", "wisdom"],
        },
      },
    ],
    skillProficiencies: [
      {
        choose: {
          from: ["insight", "investigation", "perception"],
        },
      },
    ],
    traits: [
      {
        name: "Keen Observer",
        description: [
          "Choose one of the following skills: {@skill Insight|XPHB}, {@skill Investigation|XPHB}, or {@skill Perception|XPHB}. If you lack proficiency with the chosen skill, you gain proficiency in it, and if you already have proficiency in it, you gain Expertise in it.",
        ],
      },
      {
        name: "Quick Search",
        description: [
          "You can take the {@action Search|XPHB} action as a Bonus Action.",
        ],
      },
    ],
  },
  {
    id: "feat-piercer",
    name: ["Perfurador", "Piercer"],
    description:
      "Você é especialista em causar dano perfurante, podendo aumentar o dano e acertar com mais precisão.",
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
        name: "Puncture",
        description:
          "Uma vez por turno, quando você acerta uma criatura com um ataque que causa dano perfurante, você pode rolar novamente um dos dados de dano do ataque, e deve usar o novo resultado.",
      },
      {
        name: "Enhanced Critical",
        description:
          "Quando você faz um Acerto Crítico que causa dano perfurante a uma criatura, você pode rolar um dado de dano adicional ao determinar o dano perfurante extra que o alvo sofre.",
      },
    ],
  },
  {
    id: "feat-poisoner",
    name: ["Envenenador", "Poisoner"],
    description:
      "Você domina o uso de venenos, aplicando-os rapidamente e com eficácia.",
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
    ability: [
      {
        choose: {
          from: ["dexterity", "intelligence"],
        },
      },
    ],
    toolProficiencies: [
      {
        "poisoner's kit": true,
      },
    ],
    traits: [
      {
        name: "Potent Poison",
        description: [
          "When you make a damage roll that deals Poison damage, it ignores Resistance to Poison damage.",
        ],
      },
      {
        name: "Brew Poison",
        description: [
          "You gain proficiency with the Poisoner's Kit. With 1 hour of work using such a kit and expending 50 GP worth of materials, you can create a number of poison doses equal to your Proficiency Bonus. As a Bonus Action, you can apply a poison dose to a weapon or piece of ammunition. Once applied, the poison retains its potency for 1 minute or until you deal damage with the poisoned item, whichever is shorter. When a creature takes damage from the poisoned item, that creature must succeed on a Constitution saving throw ({@dc 8} plus the modifier of the ability increased by this feat and your Proficiency Bonus) or take {@damage 2d8} Poison damage and have the {@condition Poisoned|XPHB} condition until the end of your next turn.",
        ],
      },
    ],
  },
  {
    id: "feat-polearm-master",
    name: ["Mestre em Haste", "Polearm Master"],
    description:
      "Você é hábil com armas de haste, podendo atacar ao receber inimigos e com a outra extremidade da arma.",
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
    ability: [
      {
        choose: {
          from: ["dexterity", "strength"],
        },
      },
    ],
    traits: [
      {
        name: "Pole Strike",
        description: [
          "Immediately after you take the {@action Attack|XPHB} action and attack with a {@item Quarterstaff|XPHB}, a {@item Spear|XPHB}, or a {@filter weapon that has the Heavy and Reach properties|items|type=melee weapon;ranged weapon|property=heavy;reach}, you can use a Bonus Action to make a melee attack with the opposite end of the weapon. The weapon deals Bludgeoning damage, and the weapon's damage die for this attack is a {@dice d4}.",
        ],
      },
      {
        name: "Reactive Strike",
        description: [
          "While you're holding a {@item Quarterstaff|XPHB}, a {@item Spear|XPHB}, or a {@filter weapon that has the Heavy and Reach properties|items|type=melee weapon;ranged weapon|property=heavy;reach}, you can take a Reaction to make one melee attack against a creature that enters the reach you have with that weapon.",
        ],
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
      "Você aumenta um atributo à sua escolha em +1 e ganha proficiência nas salvaguardas desse atributo.",
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
  },
  {
    id: "feat-ritual-caster",
    name: ["Ritualista", "Ritual Caster"],
    description:
      "Você pode preparar e conjurar magias como rituais, ampliando sua versatilidade mágica.",
    source: "LDJ2024",
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
    ability: [
      {
        choose: {
          from: ["intelligence", "wisdom", "charisma"],
        },
      },
    ],
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
    additionalSpells: [
      {
        prepared: {
          "1": [
            {
              choose: "level=1|components & miscellaneous=ritual",
              amount: 2,
            },
          ],
          "5": [
            {
              choose: "level=1|components & miscellaneous=ritual",
              amount: 1,
            },
          ],
          "9": [
            {
              choose: "level=1|components & miscellaneous=ritual",
              amount: 1,
            },
          ],
          "13": [
            {
              choose: "level=1|components & miscellaneous=ritual",
              amount: 1,
            },
          ],
          "17": [
            {
              choose: "level=1|components & miscellaneous=ritual",
              amount: 1,
            },
          ],
        },
      },
    ],
    traits: [
      {
        name: "Ritual Spells",
        description: [
          "Choose a number of level 1 spells equal to your Proficiency Bonus that have the {@filter Ritual tag|spells|level=1|components & miscellaneous=ritual}. You always have those spells prepared, and you can cast them with any spell slots you have. The spells' spellcasting ability is the ability increased by this feat. Whenever your Proficiency Bonus increases thereafter, you can add an additional level 1 spell with the Ritual tag to the spells always prepared with this feature.",
        ],
      },
      {
        name: "Quick Ritual",
        description: [
          "With this benefit, you can cast a Ritual spell that you have prepared using its regular casting time rather than the extended time for a Ritual. Doing so doesn't require a spell slot. Once you cast the spell in this way, you can't use this benefit again until you finish a Long Rest.",
        ],
      },
    ],
  },
  {
    id: "feat-sentinel",
    name: ["Sentinela", "Sentinel"],
    description:
      "Você impede inimigos de fugir e pode atacar quem atinge aliados próximos.",
    source: "LDJ2024",
    category: "general",
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
        name: "Guardian",
        description: [
          "Immediately after a creature within 5 feet of you takes the {@action Disengage|XPHB} action or hits a target other than you with an attack, you can make an {@action Opportunity Attack|XPHB} against that creature.",
        ],
      },
      {
        name: "Halt",
        description: [
          "When you hit a creature with an {@action Opportunity Attack|XPHB}, the creature's Speed becomes 0 for the rest of the current turn.",
        ],
      },
    ],
  },
  {
    id: "feat-shadow-touched",
    name: ["Tocado pelas Sombras", "Shadow-Touched"],
    description:
      "Você foi tocado pela energia sombria, ganhando magias e aumento de atributo.",
    source: "LDJ2024",
    category: "general",
    requirements: {
      user: {
        events: [{ type: "hasLevel", value: 4, comparison: "greaterOrEqual" }],
      },
    },
    ability: [
      {
        choose: {
          from: ["intelligence", "wisdom", "charisma"],
        },
      },
    ],
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
    additionalSpells: [
      {
        ability: "inherit",
        innate: {
          _: {
            daily: {
              "1e": [
                "invisibility|xphb",
                {
                  choose: "level=1|school=I;N",
                },
              ],
            },
          },
        },
      },
    ],
    description:
      "Sua exposição à magia do Plano das Sombras concede a você os seguintes benefícios: Magia das Sombras - Escolha uma magia de nível 1 da escola de Ilusão ou Necromancia. Você sempre tem essa magia e a magia Invisibilidade preparadas. Você pode conjurar cada uma dessas magias sem gastar um espaço de magia. Uma vez que você conjure qualquer uma dessas magias dessa maneira, você não pode conjurá-la novamente até completar um descanso longo. Você também pode conjurar essas magias usando espaços de magia que você tenha do nível apropriado. A habilidade de conjuração das magias é a habilidade aumentada por este talento.",
  },
  {
    id: "feat-sharpshooter",
    name: ["Franco-atirador", "Sharpshooter"],
    description:
      "Você é especialista em ataques à distância, ignorando cobertura e causando mais dano.",
    source: "LDJ2024",
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
    ],
    traits: [
      {
        name: "Bypass Cover",
        description: [
          "Your ranged attacks with weapons ignore Half Cover and Three-Quarters Cover.",
        ],
      },
      {
        name: "Firing in Melee",
        description: [
          "Being within 5 feet of an enemy doesn't impose Disadvantage on your attack rolls with Ranged weapons.",
        ],
      },
      {
        name: "Long Shots",
        description: [
          "Attacking at long range doesn't impose Disadvantage on your attack rolls with Ranged weapons.",
        ],
      },
    ],
  },
  {
    id: "feat-shield-master",
    name: ["Mestre do Escudo", "Shield Master"],
    description:
      "Você usa o escudo de forma ofensiva e defensiva, protegendo-se de efeitos e ataques.",
    source: "LDJ2024",
    category: "general",
    prerequisite: [
      {
        level: 4,
        proficiency: [
          {
            armor: "shield",
          },
        ],
      },
    ],
    ability: [
      {
        str: 1,
      },
    ],
    traits: [
      {
        name: "Shield Bash",
        description: [
          "If you attack a creature within 5 feet of you as part of the {@action Attack|XPHB} action and hit with a Melee weapon, you can immediately bash the target with your Shield if it's equipped, forcing the target to make a Strength saving throw ({@dc 8} plus your Strength modifier and Proficiency Bonus). On a failed save, you either push the target 5 feet from you or cause it to have the {@condition Prone|XPHB} condition (your choice). You can use this benefit only once on each of your turns.",
        ],
      },
      {
        name: "Interpose Shield",
        description: [
          "If you're subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you can take a Reaction to take no damage if you succeed on the saving throw and are holding a Shield.",
        ],
      },
    ],
  },
  {
    id: "feat-skill-expert",
    name: ["Especialista em Perícias", "Skill Expert"],
    description:
      "Você aprimora uma perícia, ganha proficiência em outra e aumenta um atributo à sua escolha.",
    source: "LDJ2024",
    category: "general",
    requirements: {
      user: {
        events: [{ type: "hasLevel", value: 4, comparison: "greaterOrEqual" }],
      },
    },
    ability: [
      {
        choose: {
          from: [
            "strength",
            "dexterity",
            "constitution",
            "intelligence",
            "wisdom",
            "charisma",
          ],
        },
      },
    ],
    skillProficiencies: [
      {
        any: 1,
      },
    ],
    expertise: [
      {
        anyProficientSkill: 1,
      },
    ],
    traits: [
      {
        name: "Skill Proficiency",
        description: "Você ganha proficiência em uma perícia à sua escolha.",
      },
      {
        name: "Expertise",
        description:
          "Escolha uma perícia na qual você tenha proficiência, mas não tenha Especialização. Você ganha Especialização nessa perícia.",
      },
    ],
  },
  {
    id: "feat-skulker",
    name: ["Furtivo", "Skulker"],
    description:
      "Você é mestre em se esconder, mesmo em condições difíceis de visibilidade.",
    source: "LDJ2024",
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
    ],
    senses: [
      {
        blindsight: 10,
      },
    ],
    traits: [
      {
        name: "Blindsight",
        description: [
          "You have {@sense Blindsight|XPHB} with a range of 10 feet.",
        ],
      },
      {
        name: "Fog of War",
        description: [
          "You exploit the distractions of battle, gaining Advantage on any Dexterity ({@skill Stealth|XPHB}) check you make as part of the {@action Hide|XPHB} action during combat.",
        ],
      },
      {
        name: "Sniper",
        description: [
          "If you make an attack roll while hidden and the roll misses, making the attack roll doesn't reveal your location.",
        ],
      },
    ],
  },
  {
    id: "feat-slasher",
    name: ["Cortador", "Slasher"],
    description:
      "Você é especialista em causar dano cortante, reduzindo a mobilidade dos inimigos.",
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
        name: "Hamstring",
        description: [
          "Once per turn when you hit a creature with an attack that deals Slashing damage, you can reduce the Speed of that creature by 10 feet until the start of your next turn.",
        ],
      },
      {
        name: "Enhanced Critical",
        description: [
          "When you score a Critical Hit that deals Slashing damage to a creature, it has Disadvantage on attack rolls until the start of your next turn.",
        ],
      },
    ],
  },
  {
    id: "feat-speedy",
    name: ["Veloz", "Speedy"],
    description:
      "Você se move mais rápido do que o normal, aumentando sua velocidade base.",
    source: "LDJ2024",
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
    ability: [
      {
        choose: {
          from: ["dexterity", "constitution"],
        },
      },
    ],
    traits: [
      {
        name: "Speed Increase",
        description: "Sua Velocidade aumenta em 10 pés.",
      },
      {
        name: "Dash over Difficult Terrain",
        description:
          "Quando você usa a ação de Disparada no seu turno, o Terreno Difícil não custa movimento extra pelo resto do turno.",
      },
      {
        name: "Agile Movement",
        description: "Ataques de Oportunidade têm Desvantagem contra você.",
      },
    ],
  },
  {
    id: "feat-spell-sniper",
    name: ["Franco-atirador de Magia", "Spell Sniper"],
    description:
      "Você dobra o alcance de magias de ataque e ignora cobertura parcial.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: false,
    },
    prerequisite: [
      {
        level: 4,
        spellcasting2020: true,
      },
    ],
    ability: [
      {
        choose: {
          from: ["intelligence", "wisdom", "charisma"],
        },
      },
    ],
    traits: [
      {
        name: "Bypass Cover",
        description:
          "Suas jogadas de ataque com magias ignoram Meia Cobertura e Três Quartos de Cobertura.",
      },
      {
        name: "Casting in Melee",
        description:
          "Estar a até 5 pés de um inimigo não impõe Desvantagem nas suas jogadas de ataque com magias.",
      },
      {
        name: "Increased Range",
        description:
          "Quando você conjura uma magia que tem um alcance de pelo menos 10 pés e exige que você faça uma jogada de ataque, você pode aumentar o alcance da magia em 60 pés.",
      },
    ],
  },
  {
    id: "feat-telekinetic",
    name: ["Telecinético", "Telekinetic"],
    description: "Você pode mover objetos e criaturas com o poder da mente.",
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
    ability: [
      {
        choose: {
          from: ["intelligence", "wisdom", "charisma"],
        },
      },
    ],
    additionalSpells: [
      {
        ability: "inherit",
        known: {
          _: ["mage hand|xphb#c"],
        },
      },
    ],
    traits: [
      {
        name: "Minor Telekinesis",
        description: [
          "You learn the {@spell Mage Hand|XPHB} spell. You can cast it without Verbal or Somatic components, you can make the spectral hand {@condition Invisible|XPHB}, and its range and the distance it can be away from you both increase by 30 feet when you cast it. The spell's spellcasting ability is the ability increased by this feat.",
        ],
      },
      {
        name: "Telekinetic Shove",
        description: [
          "As a Bonus Action, you can telekinetically shove one creature you can see within 30 feet of yourself. When you do so, the target must succeed on a Strength saving throw ({@dc 8} plus the ability modifier of the score increased by this feat and your Proficiency Bonus) or be moved 5 feet toward or away from you.",
        ],
      },
    ],
  },
  {
    id: "feat-telepathic",
    name: ["Telepata", "Telepathic"],
    description: "Você pode se comunicar telepaticamente com outras criaturas.",
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
    ability: [
      {
        choose: {
          from: ["intelligence", "wisdom", "charisma"],
        },
      },
    ],
    additionalSpells: [
      {
        ability: "inherit",
        innate: {
          _: {
            daily: {
              "1": ["detect thoughts|xphb"],
            },
          },
        },
      },
    ],
    traits: [
      {
        name: "Telepathic Utterance",
        description: [
          "You can speak telepathically to any creature you can see within 60 feet of yourself. Your telepathic utterances are in a language you know, and the creature understands you only if it knows that language. Your communication doesn't give the creature the ability to respond to you telepathically.",
        ],
      },
      {
        name: "Detect Thoughts",
        description: [
          "You always have the {@spell Detect Thoughts|XPHB} spell prepared. You can cast it without a spell slot or spell components, and you must finish a Long Rest before you can cast it in this way again. You can also cast it using spell slots you have of the appropriate level. Your spellcasting ability for the spell is the ability increased by this feat.",
        ],
      },
    ],
  },
  {
    id: "feat-war-caster",
    name: ["Conjurador de Guerra", "War Caster"],
    description:
      "Você é especialista em conjurar magias em combate, mantendo concentração e usando reações.",
    source: "LDJ2024",
    category: "general",
    repeatable: {
      canBeRepeated: false,
    },
    prerequisite: [
      {
        level: 4,
        spellcasting2020: true,
      },
    ],
    ability: [
      {
        choose: {
          from: ["intelligence", "wisdom", "charisma"],
        },
      },
    ],
    traits: [
      {
        name: "Concentration",
        description: [
          "You have Advantage on Constitution saving throws that you make to maintain {@status Concentration|XPHB}.",
        ],
      },
      {
        name: "Reactive Spell",
        description: [
          "When a creature provokes an {@action Opportunity Attack|XPHB} from you by leaving your reach, you can take a Reaction to cast a spell at the creature rather than making an {@action Opportunity Attack|XPHB}. The spell must have a casting time of one action and must target only that creature.",
        ],
      },
      {
        name: "Somatic Components",
        description: [
          "You can perform the Somatic components of spells even when you have weapons or a Shield in one or both hands.",
        ],
      },
    ],
  },
  {
    id: "feat-weapon-master",
    name: ["Mestre em Armas", "Weapon Master"],
    description: "Você adquire proficiência com quatro armas à sua escolha.",
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
        name: "Mastery Property",
        description: [
          "Your training with weapons allows you to use the mastery property of one kind of Simple or Martial weapon of your choice, provided you have proficiency with it. Whenever you finish a Long Rest, you can change the kind of weapon to another eligible kind.",
        ],
      },
    ],
  },
];
