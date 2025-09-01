import { Feat } from "../../domain/feat/feat.schema.js";

export const featsOrigin: Feat[] = [
  {
    name: ["Alerta", "Alert"],
    id: "feat-alert",
    description: "Você está sempre alerta e preparado para agir.",
    source: "LDJ2024",
    category: "origin",
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
        ],
      },
    },
    effects: [
      {
        type: "passive_grantProficiency",
        on: "initiative",
        name: "Proficiência em Iniciativa",
        description:
          "Quando você rolar Iniciativa, você pode adicionar seu Bônus de Proficiência ao resultado.",
      },
    ],
    traits: [
      {
        name: "Trocar Iniciativa",
        description:
          "Imediatamente após rolar Iniciativa, você pode trocar sua Iniciativa com a Iniciativa de um aliado disposto no mesmo combate. Você não pode fazer essa troca se você ou o aliado tiver a condição Incapacitado.",
      },
    ],
  },
  {
    id: "feat-crafter",
    name: ["Artífice", "Crafter"],
    description:
      "Você é especialista em criar itens e consegue descontos ao comprar e rapidez ao fabricar.",
    source: "LDJ2024",
    category: "origin",
    repeatable: {
      canBeRepeated: false,
    },
    traits: [
      {
        name: "Escolha de Ferramentas de Artífice",
        description:
          "Ao escolher este talento, selecione três ferramentas de artífice dentre: ferramentas de carpinteiro, de curtidor, de pedreiro, de oleiro, de ferreiro, de inventor, de tecelão ou de entalhador. Você se torna proficiente com as três escolhidas.",
      },
      {
        name: "Proficiência em Ferramentas",
        description:
          "Você adquire proficiência com três ferramentas de artífice diferentes à sua escolha da tabela de Criação Rápida.",
      },
      {
        name: "Desconto",
        description:
          "Sempre que comprar um item não mágico, você recebe 20% de desconto no valor.",
      },
      {
        name: "Criação Rápida",
        description: `Ao terminar um Descanso Longo, você pode criar um item da lista abaixo, desde que possua e seja proficiente com as ferramentas necessárias. O item dura até o próximo Descanso Longo, quando então se desfaz.\n\nFerramentas e Itens:\n- Ferramentas de Carpinteiro: Escada, Tocha\n- Ferramentas de Curtidor: Estojo para Virolas de Besta, Estojo para Mapas ou Pergaminhos, Bolsa\n- Ferramentas de Pedreiro: Bloco e Talha\n- Ferramentas de Oleiro: Jarra, Lamparina\n- Ferramentas de Ferreiro: Esferas de Ferro, Balde, Espigões, Gancho de Escalada, Panela de Ferro\n- Ferramentas de Inventor: Sino, Pá, Caixa de Fósforos\n- Ferramentas de Tecelão: Cesta, Corda, Rede, Tenda\n- Ferramentas de Entalhador: Clava, Tacape, Cajado\n`,
      },
    ],
    effects: [],
  },
  {
    id: "feat-healer",
    name: ["Curandeiro", "Healer"],
    description:
      "Você é habilidoso em estabilizar e curar aliados usando kits de primeiros socorros.",
    source: "LDJ2024",
    category: "origin",
    repeatable: {
      canBeRepeated: false,
    },
    traits: [
      {
        name: "Médico de Batalha",
        description:
          "Se você possuir um Kit de Curandeiro, pode gastar um uso dele e atender uma criatura a até 1,5 metro de você como uma ação. Essa criatura pode gastar um dado de vida, e você rola esse dado. A criatura recupera uma quantidade de pontos de vida igual ao resultado da rolagem mais seu bônus de proficiência.",
      },
      {
        name: "Rerrolagem de Cura",
        description:
          "Sempre que você rolar um dado para determinar a quantidade de pontos de vida restaurados com uma magia ou com o benefício Médico de Batalha deste talento, pode rerrolar o dado se tirar 1, devendo usar o novo resultado.",
      },
    ],
    effects: [],
  },
  {
    id: "feat-lucky",
    name: ["Sortudo", "Lucky"],
    description:
      "Você pode gastar pontos de sorte para refazer rolagens importantes.",
    source: "LDJ2024",
    category: "origin",
    repeatable: {
      canBeRepeated: false,
    },
    traits: [
      {
        name: "Pontos de Sorte",
        description:
          "Você possui um número de Pontos de Sorte igual ao seu bônus de proficiência e pode gastá-los nos benefícios abaixo. Você recupera todos os Pontos de Sorte gastos ao terminar um Descanso Longo.",
      },
      {
        name: "Vantagem",
        description:
          "Quando você rolar um d20 para um Teste de D20, pode gastar 1 Ponto de Sorte para receber Vantagem na rolagem.",
      },
      {
        name: "Desvantagem no Oponente",
        description:
          "Quando uma criatura rolar um d20 para um ataque contra você, pode gastar 1 Ponto de Sorte para impor Desvantagem nessa rolagem.",
      },
    ],
    effects: [],
  },
  {
    id: "feat-musician",
    name: ["Músico", "Musician"],
    description:
      "Você inspira aliados com música, concedendo bônus em testes de habilidade.",
    source: "LDJ2024",
    category: "origin",
    repeatable: {
      canBeRepeated: false,
    },
    traits: [
      {
        name: "Treinamento Instrumental",
        description:
          "Você adquire proficiência com três instrumentos musicais à sua escolha.",
      },
      {
        name: "Canção de Incentivo",
        description:
          "Ao terminar um Descanso Curto ou Longo, você pode tocar uma música em um instrumento no qual seja proficiente e conceder Inspiração Heroica a aliados que ouvirem a canção. O número de aliados afetados é igual ao seu bônus de proficiência.",
      },
    ],
    effects: [],
  },
  {
    id: "feat-savage-attacker",
    name: ["Atacante Selvagem", "Savage Attacker"],
    description:
      "Quando atacar, pode rolar o dado de dano duas vezes e escolher o melhor resultado.",
    source: "LDJ2024",
    category: "origin",
    repeatable: {
      canBeRepeated: false,
    },
    traits: [
      {
        name: "Ataque Devastador",
        description:
          "Uma vez por turno, ao atingir um alvo com uma arma, você pode rolar os dados de dano da arma duas vezes e escolher o melhor resultado.",
      },
    ],
    effects: [],
  },
  {
    id: "feat-skilled",
    name: ["Perito", "Skilled"],
    description:
      "Você adquire proficiência em três perícias ou ferramentas à sua escolha.",
    source: "LDJ2024",
    category: "origin",
    repeatable: {
      canBeRepeated: true,
    },
    traits: [
      {
        name: "Proficiência Versátil",
        description:
          "Você adquire proficiência em qualquer combinação de três perícias ou ferramentas à sua escolha.",
      },
    ],
    effects: [],
  },
  {
    id: "feat-tavern-brawler",
    name: ["Brigão de Taverna", "Tavern Brawler"],
    description:
      "Você é proficiente em combate desarmado e improvisa armas com facilidade.",
    source: "LDJ2024",
    category: "origin",
    repeatable: {
      canBeRepeated: false,
    },
    traits: [
      {
        name: "Ataque Desarmado Aprimorado",
        description:
          "Quando você acerta com um ataque desarmado e causa dano, pode causar dano de contusão igual a 1d4 + seu modificador de Força em vez do dano normal de um ataque desarmado.",
      },
      {
        name: "Rerrolagem de Dano",
        description:
          "Sempre que você rolar um dado de dano para seu ataque desarmado, pode rerrolar o dado se tirar 1, devendo usar o novo resultado.",
      },
      {
        name: "Armas Improvisadas",
        description: "Você possui proficiência com armas improvisadas.",
      },
      {
        name: "Empurrão",
        description:
          "Quando acertar uma criatura com um ataque desarmado como parte da ação de Ataque em seu turno, você pode causar dano e também empurrar o alvo 1,5 metro para longe de você. Só pode usar este benefício uma vez por turno.",
      },
    ],
    effects: [],
  },
  {
    name: ["Durão", "Tough"],
    id: "feat-tough",
    description: "Você é resistente e aguenta mais dano do que a maioria.",
    source: "LDJ2024",
    category: "origin",
    repeatable: {
      canBeRepeated: false,
    },
    effects: [
      {
        type: "passive_modifyUserHP",
        name: "Durão",
        operation: "multiply",
        amount: 2,
        multiplierProperty: "level",
        HPtype: "maxHp",
      },
    ],
  },
  {
    id: "feat-magic-initiate-wizard",
    name: ["Iniciado em Magia: Mago", "Magic Initiate: Wizard"],
    description:
      "Você aprende magias de Mago, podendo conjurá-las mesmo sem ser daquela classe.",
    source: "LDJ2024",
    category: "origin",
    repeatable: {
      canBeRepeated: false,
    },
    effects: [
      {
        type: "passive_providesSpellKnowledge",
        mode: "filter",
        amount: 2,
        filter: {
          level: 0,
          class: "wizard",
        },
        castingAbilityOptions: ["intelligence", "charisma", "wisdom"],
        canBeSwappedOn: "levelUp",
        name: "Truques de Mago",
        description:
          "Você aprende dois truques de Mago de sua escolha. Os truques escolhidos contam como feitiços de Mago para você.",
      },
      {
        type: "passive_providesSpellKnowledge",
        amount: 1,
        mode: "filter",
        filter: {
          level: 1,
          class: "wizard",
        },
        freeCasting: {
          amount: 1,
          recharge: {
            type: "event",
            maxCharges: 1,
            rechargeOn: "longRest",
            recoveryAmount: 1,
          },
        },
        canBeSwappedOn: "levelUp",
        castingAbilityOptions: ["intelligence", "charisma", "wisdom"],
        name: "Magias de Mago",
        description:
          "Você aprende uma magia de Mago de sua escolha. A magia escolhida conta como um feitiço de Mago para você. Sempre que você ganha um nível de Mago, pode substituir essa magia por outra magia de Mago.",
      },
    ],
  },
  {
    id: "feat-magic-initiate-cleric",
    name: ["Iniciado em Magia: Clérigo", "Magic Initiate: Cleric"],
    description:
      "Você aprende magias de Clérigo, podendo conjurá-las mesmo sem ser daquela classe.",
    source: "LDJ2024",
    category: "origin",
    repeatable: {
      canBeRepeated: false,
    },
    effects: [
      {
        type: "passive_providesSpellKnowledge",
        mode: "filter",
        amount: 2,
        filter: {
          level: 0,
          class: "cleric",
        },
        castingAbilityOptions: ["intelligence", "charisma", "wisdom"],
        canBeSwappedOn: "levelUp",
        name: "Truques de Clérigo",
        description:
          "Você aprende dois truques de Clérigo de sua escolha. Os truques escolhidos contam como feitiços de Clérigo para você.",
      },
      {
        type: "passive_providesSpellKnowledge",
        amount: 1,
        mode: "filter",
        filter: {
          level: 1,
          class: "cleric",
        },
        freeCasting: {
          amount: 1,
          recharge: {
            type: "event",
            maxCharges: 1,
            rechargeOn: "longRest",
            recoveryAmount: 1,
          },
        },
        canBeSwappedOn: "levelUp",
        castingAbilityOptions: ["intelligence", "charisma", "wisdom"],
        name: "Magias de Clérigo",
        description:
          "Você aprende uma magia de Clérigo de sua escolha. A magia escolhida conta como um feitiço de Clérigo para você. Sempre que você ganha um nível de Clérigo, pode substituir essa magia por outra magia de Clérigo.",
      },
    ],
  },
  {
    id: "feat-magic-initiate-druid",
    name: ["Iniciado em Magia: Druida", "Magic Initiate: Druid"],
    description:
      "Você aprende magias de Druida, podendo conjurá-las mesmo sem ser daquela classe.",
    source: "LDJ2024",
    category: "origin",
    repeatable: {
      canBeRepeated: false,
    },
    effects: [
      {
        type: "passive_providesSpellKnowledge",
        mode: "filter",
        amount: 2,
        filter: {
          level: 0,
          class: "druid",
        },
        castingAbilityOptions: ["intelligence", "charisma", "wisdom"],
        canBeSwappedOn: "levelUp",
        name: "Truques de Druida",
        description:
          "Você aprende dois truques de Druida de sua escolha. Os truques escolhidos contam como feitiços de Druida para você.",
      },
      {
        type: "passive_providesSpellKnowledge",
        amount: 1,
        mode: "filter",
        filter: {
          level: 1,
          class: "druid",
        },
        freeCasting: {
          amount: 1,
          recharge: {
            type: "event",
            maxCharges: 1,
            rechargeOn: "longRest",
            recoveryAmount: 1,
          },
        },
        canBeSwappedOn: "levelUp",
        castingAbilityOptions: ["intelligence", "charisma", "wisdom"],
        name: "Magias de Druida",
        description:
          "Você aprende uma magia de Druida de sua escolha. A magia escolhida conta como um feitiço de Druida para você. Sempre que você ganha um nível de Druida, pode substituir essa magia por outra magia de Druida.",
      },
    ],
  },
];
