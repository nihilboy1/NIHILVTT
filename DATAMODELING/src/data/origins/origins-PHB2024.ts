import { OriginType } from "../../domain/origin/origin.schema.js";

export const PHB2024ORIGINS = [
  {
    id: "origin-acolyte",
    name: ["Acólito", "Acolyte"],
    source: "LDJ2024",
    description:
      "Um acólito é um devoto que serve como assistente em rituais religiosos e cerimônias sagradas. Além de ajudar em rituais, eles estudam textos sagrados, aprendem os preceitos de sua fé e podem oferecer orientação espiritual a outros.",
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            operation: "add",
            pick: {
              amount: "any",
              from: ["intelligence", "wisdom", "charisma"],
            },
            value: 3,
          },
        ],
        maxScore: 20,
        name: "Melhoria nos Atributos",
      },
      {
        type: "passive_providesFeat",
        selection: { mode: "specific", feats: ["feat-magic-initiate-cleric"] },
        name: "Talento: Iniciado na Magia (Clérigo)",
      },
      {
        type: "passive_grantProficiency",
        on: "skill",
        choose: { from: ["insight", "religion"], count: 2 },
        name: "Proficiência em Perícias",
        description:
          "Você ganha proficiência em duas perícias. Intuição e Religião.",
      },
      {
        type: "passive_grantProficiency",
        on: "tool",
        choose: { count: 1, from: ["tool-calligraphers-supplies"] },
        name: "Proficiência em Ferramentas",
        description: "Você ganha proficiência com o kit de caligrafia.",
      },
    ],

    startingEquipment: [
      {
        type: "choice",
        count: 1,
        choices: [
          {
            id: "starting_equipment",
            contents: [
              { type: "item", id: "gear-book", quantity: 1 },
              {
                type: "item",
                id: "tool-calligraphers-supplies",
                quantity: 1,
              },
              { type: "item", id: "gear-holy-symbol", quantity: 1 },
              { type: "item", id: "gear-parchment", quantity: 10 },
              { type: "item", id: "gear-robe", quantity: 1 },
              { type: "currency", amount: 8, unit: "gold" },
            ],
          },
          {
            id: "starting_gold",
            contents: [{ type: "currency", amount: 50, unit: "gold" }],
          },
        ],
      },
    ],
  },
  {
    id: "origin-artisan",
    name: ["Artesão", "Artisan"],
    source: "LDJ2024",
    description:
      "Um artesão é um mestre artífice especializado na criação de objetos úteis e estéticos. Com habilidades manuais excepcionais, o artesão combina precisão técnica com criatividade para produzir itens de qualidade.",
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            operation: "add",
            pick: {
              amount: "any",
              from: ["strength", "dexterity", "intelligence"],
            },
            value: 3,
          },
        ],
        maxScore: 20,
        name: "Melhoria nos Atributos",
      },
      {
        type: "passive_providesFeat",
        selection: { mode: "specific", feats: ["feat-inspiring-leader"] },
        name: "Talento: Líder Inspirador",
      },
      {
        type: "passive_grantProficiency",
        on: "skill",
        choose: { from: ["investigation", "persuasion"], count: 2 },
        name: "Proficiência em Perícias",
        description:
          "Você ganha proficiência em duas perícias. Investigação e Persuasão.",
      },
      {
        type: "passive_grantProficiency",
        on: "tool",
        choose: {
          count: 1,
          from: ["tool-artisans-tools"],
        },
        name: "Proficiência em Ferramentas",
        description:
          "Você ganha proficiência com uma ferramenta de artesão à sua escolha.",
      },
    ],

    startingEquipment: [
      {
        type: "choice",
        count: 1,
        choices: [
          {
            id: "starting_equipment",
            contents: [
              { type: "item", id: "tool-artisans-tools", quantity: 1 },
              { type: "item", id: "gear-pouch", quantity: 2 },
              { type: "item", id: "gear-travelers-clothes", quantity: 1 },
              { type: "currency", amount: 32, unit: "gold" },
            ],
          },
          {
            id: "starting_gold",
            contents: [{ type: "currency", amount: 50, unit: "gold" }],
          },
        ],
      },
    ],
  },
  {
    id: "origin-charlatan",
    name: ["Charlatão", "Charlatan"],
    source: "LDJ2024",
    description:
      "Um charlatão é um mestre da enganação, que utiliza seu charme e astúcia para manipular os outros. Com habilidades de persuasão excepcionais e um talento para falsificação, o charlatão consegue se passar por quem não é para obter vantagens.",
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            operation: "add",
            pick: {
              amount: "any",
              from: ["dexterity", "constitution", "charisma"],
            },
            value: 3,
          },
        ],
        maxScore: 20,
        name: "Melhoria nos Atributos",
      },
      {
        type: "passive_providesFeat",
        selection: { mode: "specific", feats: ["feat-skilled"] },
        name: "Talento: Perito",
      },
      {
        type: "passive_grantProficiency",
        on: "skill",
        choose: { from: ["deception", "sleightOfHand"], count: 2 },
        name: "Proficiência em Perícias",
        description:
          "Você ganha proficiência em duas perícias. Enganação e Prestidigitação.",
      },
      {
        type: "passive_grantProficiency",
        on: "tool",
        choose: { count: 1, from: ["tool-forgery-kit"] },
        name: "Proficiência em Ferramentas",
        description: "Você ganha proficiência com o kit de falsificação.",
      },
    ],

    startingEquipment: [
      {
        type: "choice",
        count: 1,
        choices: [
          {
            id: "starting_equipment",
            contents: [
              { type: "item", id: "tool-forgery-kit", quantity: 1 },
              { type: "item", id: "gear-costume", quantity: 1 },
              { type: "item", id: "gear-fine-clothes", quantity: 1 },
              { type: "currency", amount: 15, unit: "gold" },
            ],
          },
          {
            id: "starting_gold",
            contents: [{ type: "currency", amount: 50, unit: "gold" }],
          },
        ],
      },
    ],
  },
  {
    id: "origin-criminal",
    name: ["Criminoso", "Criminal"],
    source: "LDJ2024",
    description:
      "Um criminoso é alguém que vive à margem da sociedade, quebrando leis e vivendo através de roubos, furtos ou outros delitos. Com habilidades furtivas e reflexos rápidos, o criminoso sobrevive utilizando astúcia e destreza para evitar ser pego.",
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            operation: "add",
            pick: {
              amount: "any",
              from: ["dexterity", "constitution", "intelligence"],
            },
            value: 3,
          },
        ],
        maxScore: 20,
        name: "Melhoria nos Atributos",
      },
      {
        type: "passive_providesFeat",
        selection: { mode: "specific", feats: ["feat-alert"] },
        name: "Talento: Alerta",
      },
      {
        type: "passive_grantProficiency",
        on: "skill",
        choose: { from: ["sleightOfHand", "stealth"], count: 2 },
        name: "Proficiência em Perícias",
        description:
          "Você ganha proficiência em duas perícias. Prestidigitação e Furtividade.",
      },
      {
        type: "passive_grantProficiency",
        on: "tool",
        choose: { count: 1, from: ["tool-thieves-tools"] },
        name: "Proficiência em Ferramentas",
        description: "Você ganha proficiência com ferramentas de ladrão.",
      },
    ],

    startingEquipment: [
      {
        type: "choice",
        count: 1,
        choices: [
          {
            id: "starting_equipment",
            contents: [
              { type: "item", id: "weapon-adaga", quantity: 2 },
              { type: "item", id: "tool-thieves-tools", quantity: 1 },
              { type: "item", id: "gear-pe-de-cabra", quantity: 1 },
              { type: "item", id: "gear-pouch", quantity: 2 },
              { type: "item", id: "gear-travelers-clothes", quantity: 1 },
              { type: "currency", amount: 16, unit: "gold" },
            ],
          },
          {
            id: "starting_gold",
            contents: [{ type: "currency", amount: 50, unit: "gold" }],
          },
        ],
      },
    ],
  },
  {
    id: "origin-entertainer",
    name: ["Artista", "Entertainer"],
    source: "LDJ2024",
    description:
      "Um artista é alguém que entretém plateias com suas performances de música, dança, atuação ou acrobacias. Com carisma e talento naturais, o artista busca reconhecimento e aplausos através de suas habilidades expressivas.",
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            operation: "add",
            pick: {
              amount: "any",
              from: ["strength", "dexterity", "charisma"],
            },
            value: 3,
          },
        ],
        maxScore: 20,
        name: "Melhoria nos Atributos",
      },
      {
        type: "passive_providesFeat",
        selection: { mode: "specific", feats: ["feat-musician"] },
        name: "Talento: Músico",
      },
      {
        type: "passive_grantProficiency",
        on: "skill",
        choose: { from: ["acrobatics", "performance"], count: 2 },
        name: "Proficiência em Perícias",
        description:
          "Você ganha proficiência em duas perícias. Acrobacia e Atuação.",
      },
      {
        type: "passive_grantProficiency",
        on: "musicalInstrument",
        choose: {
          count: 1,
          from: [
            "musical-instrument-bagpipes",
            "musical-instrument-horn",
            "musical-instrument-lyre",
            "musical-instrument-flute",
            "musical-instrument-viol",
            "musical-instrument-pan-flute",
          ],
        },
        name: "Proficiência em Ferramentas",
        description:
          "Você ganha proficiência com um instrumento musical à sua escolha.",
      },
    ],

    startingEquipment: [
      {
        type: "choice",
        count: 1,
        choices: [
          {
            id: "starting_equipment",
            contents: [
              { type: "item", id: "gear-costume", quantity: 2 },
              { type: "item", id: "gear-mirror", quantity: 1 },
              { type: "item", id: "gear-perfume", quantity: 1 },
              { type: "item", id: "gear-travelers-clothes", quantity: 1 },
              { type: "currency", amount: 11, unit: "gold" },
            ],
          },
          {
            id: "starting_gold",
            contents: [{ type: "currency", amount: 50, unit: "gold" }],
          },
        ],
      },
      {
        type: "choice",
        count: 1,
        choices: [
          {
            id: "musical-instrument",
            contents: [
              { type: "item", id: "musical-instrument-bagpipes", quantity: 1 },
              { type: "item", id: "musical-instrument-horn", quantity: 1 },
              { type: "item", id: "musical-instrument-lyre", quantity: 1 },
              { type: "item", id: "musical-instrument-flute", quantity: 1 },
              { type: "item", id: "musical-instrument-viol", quantity: 1 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "origin-farmer",
    name: ["Fazendeiro", "Farmer"],
    source: "LDJ2024",
    description:
      "Um fazendeiro é alguém que cultiva a terra, cria animais e produz alimentos. Com conhecimento profundo sobre a natureza e habilidades práticas desenvolvidas pelo trabalho diário, o fazendeiro possui uma força e resistência naturais advindas do trabalho árduo no campo.",
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            operation: "add",
            pick: {
              amount: "any",
              from: ["strength", "constitution", "wisdom"],
            },
            value: 3,
          },
        ],
        maxScore: 20,
        name: "Melhoria nos Atributos",
      },
      {
        type: "passive_providesFeat",
        selection: { mode: "specific", feats: ["feat-tough"] },
        name: "Talento: Durão",
      },
      {
        type: "passive_grantProficiency",
        on: "skill",
        choose: { from: ["animalHandling", "nature"], count: 2 },
        name: "Proficiência em Perícias",
        description:
          "Você ganha proficiência em duas perícias. Adestrar Animais e Natureza.",
      },
      {
        type: "passive_grantProficiency",
        on: "tool",
        choose: { count: 1, from: ["tool-carpenters-tools"] },
        name: "Proficiência em Ferramentas",
        description: "Você ganha proficiência com ferramentas de carpinteiro.",
      },
    ],

    startingEquipment: [
      {
        type: "choice",
        count: 1,
        choices: [
          {
            id: "starting_equipment",
            contents: [
              { type: "item", id: "weapon-foice-curta", quantity: 1 },
              { type: "item", id: "tool-carpenters-tools", quantity: 1 },
              { type: "item", id: "tool-healers-kit", quantity: 1 },
              { type: "item", id: "gear-iron-pot", quantity: 1 },
              { type: "item", id: "gear-shovel", quantity: 1 },
              { type: "item", id: "gear-travelers-clothes", quantity: 1 },
              { type: "currency", amount: 30, unit: "gold" },
            ],
          },
          {
            id: "starting_gold",
            contents: [{ type: "currency", amount: 50, unit: "gold" }],
          },
        ],
      },
    ],
  },
  {
    id: "origin-guard",
    name: ["Guarda", "Guard"],
    source: "LDJ2024",
    description:
      "Um guarda é um vigilante treinado para proteger pessoas, propriedades e manter a ordem. Com olhos atentos e reflexos rápidos, o guarda está sempre alerta para qualquer sinal de perigo ou ameaça.",
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            operation: "add",
            pick: {
              amount: "any",
              from: ["strength", "intelligence", "wisdom"],
            },
            value: 3,
          },
        ],
        maxScore: 20,
        name: "Melhoria nos Atributos",
      },
      {
        type: "passive_providesFeat",
        selection: { mode: "specific", feats: ["feat-alert"] },
        name: "Talento: Alerta",
      },
      {
        type: "passive_grantProficiency",
        on: "skill",
        choose: { from: ["athletics", "perception"], count: 2 },
        name: "Proficiência em Perícias",
        description:
          "Você ganha proficiência em duas perícias. Atletismo e Percepção.",
      },
      {
        type: "passive_grantProficiency",
        on: "tool",
        choose: { count: 1, from: ["tool-gaming-set"] },
        name: "Proficiência em Ferramentas",
        description:
          "Você ganha proficiência com um conjunto de jogos à sua escolha.",
      },
    ],

    startingEquipment: [
      {
        type: "choice",
        count: 1,
        choices: [
          {
            id: "starting_equipment",
            contents: [
              { type: "item", id: "weapon-lanca", quantity: 1 },
              { type: "item", id: "weapon-besta-leve", quantity: 1 },
              { type: "item", id: "gear-dice-set", quantity: 1 },
              { type: "item", id: "gear-hooded-lantern", quantity: 1 },
              { type: "item", id: "gear-manacles", quantity: 1 },
              { type: "item", id: "gear-travelers-clothes", quantity: 1 },
              { type: "currency", amount: 12, unit: "gold" },
            ],
          },
          {
            id: "starting_gold",
            contents: [{ type: "currency", amount: 50, unit: "gold" }],
          },
        ],
      },
    ],
  },
  {
    id: "origin-guide",
    name: ["Guia", "Guide"],
    source: "LDJ2024",
    description:
      "Um guia é um viajante experiente que conhece os caminhos e perigos do mundo selvagem. Com instintos aguçados e habilidades de sobrevivência, o guia é capaz de conduzir grupos através de territórios inexplorados e hostis.",
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            operation: "add",
            pick: {
              amount: "any",
              from: ["dexterity", "constitution", "wisdom"],
            },
            value: 3,
          },
        ],
        maxScore: 20,
        name: "Melhoria nos Atributos",
      },
      {
        type: "passive_providesFeat",
        selection: { mode: "specific", feats: ["feat-magic-initiate-druid"] },
        name: "Talento: Iniciado na Magia (Druida)",
      },
      {
        type: "passive_grantProficiency",
        on: "skill",
        choose: { from: ["stealth", "survival"], count: 2 },
        name: "Proficiência em Perícias",
        description:
          "Você ganha proficiência em duas perícias. Furtividade e Sobrevivência.",
      },
      {
        type: "passive_grantProficiency",
        on: "tool",
        choose: { count: 1, from: ["tool-cartographers-tools"] },
        name: "Proficiência em Ferramentas",
        description: "Você ganha proficiência com ferramentas de cartógrafo.",
      },
    ],

    startingEquipment: [
      {
        type: "choice",
        count: 1,
        choices: [
          {
            id: "starting_equipment",
            contents: [
              { type: "item", id: "weapon-arco-curto", quantity: 1 },
              { type: "item", id: "tool-cartographers-tools", quantity: 1 },
              { type: "item", id: "gear-bedroll", quantity: 1 },
              { type: "item", id: "gear-tent", quantity: 1 },
              { type: "item", id: "gear-travelers-clothes", quantity: 1 },
              { type: "currency", amount: 3, unit: "gold" },
            ],
          },
          {
            id: "starting_gold",
            contents: [{ type: "currency", amount: 50, unit: "gold" }],
          },
        ],
      },
    ],
  },
  {
    id: "origin-hermit",
    name: ["Eremita", "Hermit"],
    source: "LDJ2024",
    description:
      "Um eremita é alguém que buscou o isolamento, vivendo afastado da sociedade para contemplação, meditação ou estudos. Com conhecimentos sobre ervas medicinais e rituais sagrados, o eremita desenvolve sabedoria e intuição únicas.",
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            operation: "add",
            pick: {
              amount: "any",
              from: ["constitution", "wisdom", "charisma"],
            },
            value: 3,
          },
        ],
        maxScore: 20,
        name: "Melhoria nos Atributos",
      },
      {
        type: "passive_providesFeat",
        selection: { mode: "specific", feats: ["feat-healer"] },
        name: "Talento: Curandeiro",
      },
      {
        type: "passive_grantProficiency",
        on: "skill",
        choose: { from: ["medicine", "religion"], count: 2 },
        name: "Proficiência em Perícias",
        description:
          "Você ganha proficiência em duas perícias. Medicina e Religião.",
      },
      {
        type: "passive_grantProficiency",
        on: "tool",
        choose: { count: 1, from: ["tool-herbalism-kit"] },
        name: "Proficiência em Ferramentas",
        description: "Você ganha proficiência com kit de herbalismo.",
      },
    ],

    startingEquipment: [
      {
        type: "choice",
        count: 1,
        choices: [
          {
            id: "starting_equipment",
            contents: [
              { type: "item", id: "weapon-bordao", quantity: 1 },
              { type: "item", id: "tool-herbalism-kit", quantity: 1 },
              { type: "item", id: "gear-bedroll", quantity: 1 },
              { type: "item", id: "gear-book", quantity: 1 },
              { type: "item", id: "gear-lampiao", quantity: 1 },
              { type: "item", id: "gear-oleo", quantity: 3 },
              { type: "item", id: "gear-travelers-clothes", quantity: 1 },
              { type: "currency", amount: 16, unit: "gold" },
            ],
          },
          {
            id: "starting_gold",
            contents: [{ type: "currency", amount: 50, unit: "gold" }],
          },
        ],
      },
    ],
  },
  {
    id: "origin-merchant",
    name: ["Mercador", "Merchant"],
    source: "LDJ2024",
    description:
      "Um mercador é um especialista em comércio, negociação e transporte de mercadorias. Com habilidades de persuasão, conhecimento de rotas comerciais e talento para os negócios, o mercador prospera conectando compradores e vendedores.",
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            operation: "add",
            pick: {
              amount: "any",
              from: ["constitution", "intelligence", "charisma"],
            },
            value: 3,
          },
        ],
        maxScore: 20,
        name: "Melhoria nos Atributos",
      },
      {
        type: "passive_providesFeat",
        selection: { mode: "specific", feats: ["feat-lucky"] },
        name: "Talento: Sortudo",
      },
      {
        type: "passive_grantProficiency",
        on: "skill",
        choose: { from: ["animalHandling", "persuasion"], count: 2 },
        name: "Proficiência em Perícias",
        description:
          "Você ganha proficiência em duas perícias. Adestrar Animais e Persuasão.",
      },
      {
        type: "passive_grantProficiency",
        on: "tool",
        choose: { count: 1, from: ["tool-navigators-tools"] },
        name: "Proficiência em Ferramentas",
        description: "Você ganha proficiência com ferramentas de navegador.",
      },
    ],

    startingEquipment: [
      {
        type: "choice",
        count: 1,
        choices: [
          {
            id: "starting_equipment",
            contents: [
              { type: "item", id: "tool-navigators-tools", quantity: 1 },
              { type: "item", id: "gear-pouch", quantity: 2 },
              { type: "item", id: "gear-travelers-clothes", quantity: 1 },
              { type: "currency", amount: 22, unit: "gold" },
            ],
          },
          {
            id: "starting_gold",
            contents: [{ type: "currency", amount: 50, unit: "gold" }],
          },
        ],
      },
    ],
  },
  {
    id: "origin-noble",
    name: ["Nobre", "Noble"],
    source: "LDJ2024",
    description:
      "Um nobre pertence à aristocracia, sendo educado em etiqueta, política e cultura. Com posição social privilegiada, conhecimento histórico e habilidades sociais refinadas, o nobre exerce influência e liderança na sociedade.",
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            operation: "add",
            pick: {
              amount: "any",
              from: ["intelligence", "wisdom", "charisma"],
            },
            value: 3,
          },
        ],
        maxScore: 20,
        name: "Melhoria nos Atributos",
      },
      {
        type: "passive_providesFeat",
        selection: { mode: "specific", feats: ["feat-inspiring-leader"] },
        name: "Talento: Líder Inspirador",
      },
      {
        type: "passive_grantProficiency",
        on: "skill",
        choose: { from: ["history", "persuasion"], count: 2 },
        name: "Proficiência em Perícias",
        description:
          "Você ganha proficiência em duas perícias. História e Persuasão.",
      },
      {
        type: "passive_grantProficiency",
        on: "tool",
        choose: { count: 1, from: ["tool-gaming-set"] },
        name: "Proficiência em Ferramentas",
        description: "Você ganha proficiência com jogos de tabuleiro.",
      },
    ],

    startingEquipment: [
      {
        type: "choice",
        count: 1,
        choices: [
          {
            id: "starting_equipment",
            contents: [
              { type: "item", id: "gear-dice-set", quantity: 1 },
              { type: "item", id: "gear-pouch", quantity: 2 },
              { type: "item", id: "gear-fine-clothes", quantity: 1 },
              { type: "currency", amount: 25, unit: "gold" },
            ],
          },
          {
            id: "starting_gold",
            contents: [{ type: "currency", amount: 50, unit: "gold" }],
          },
        ],
      },
    ],
  },
  {
    id: "origin-sage",
    name: ["Sábio", "Sage"],
    source: "LDJ2024",
    description:
      "Um sábio é um estudioso que dedicou sua vida ao conhecimento e à pesquisa. Com vasto conhecimento em diversos campos e uma mente inquisitiva, o sábio é valorizado por sua erudição e capacidade de encontrar informações obscuras.",
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            operation: "add",
            pick: {
              amount: "any",
              from: ["constitution", "intelligence", "wisdom"],
            },
            value: 3,
          },
        ],
        maxScore: 20,
        name: "Melhoria nos Atributos",
      },
      {
        type: "passive_providesFeat",
        selection: { mode: "specific", feats: ["feat-magic-initiate-wizard"] },
        name: "Talento: Iniciado na Magia (Mago)",
      },
      {
        type: "passive_grantProficiency",
        on: "skill",
        choose: { from: ["arcana", "history"], count: 2 },
        name: "Proficiência em Perícias",
        description:
          "Você ganha proficiência em duas perícias. Arcana e História.",
      },
      {
        type: "passive_grantProficiency",
        on: "tool",
        choose: { count: 1, from: ["tool-calligraphers-supplies"] },
        name: "Proficiência em Ferramentas",
        description: "Você ganha proficiência com o kit de caligrafia.",
      },
    ],

    startingEquipment: [
      {
        type: "choice",
        count: 1,
        choices: [
          {
            id: "starting_equipment",
            contents: [
              { type: "item", id: "weapon-bordao", quantity: 1 },
              { type: "item", id: "tool-calligraphers-supplies", quantity: 1 },
              { type: "item", id: "gear-book", quantity: 1 },
              { type: "item", id: "gear-parchment", quantity: 8 },
              { type: "item", id: "gear-robe", quantity: 1 },
              { type: "currency", amount: 8, unit: "gold" },
            ],
          },
          {
            id: "starting_gold",
            contents: [{ type: "currency", amount: 50, unit: "gold" }],
          },
        ],
      },
    ],
  },
  {
    id: "origin-sailor",
    name: ["Marinheiro", "Sailor"],
    source: "LDJ2024",
    description:
      "Um marinheiro é um navegante experiente que trabalha em embarcações. Com conhecimentos sobre navegação, clima marítimo e manutenção de navios, o marinheiro domina as técnicas de sobrevivência em alto mar e é resistente às adversidades encontradas durante longas viagens.",
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            operation: "add",
            pick: {
              amount: "any",
              from: ["strength", "dexterity", "wisdom"],
            },
            value: 3,
          },
        ],
        maxScore: 20,
        name: "Melhoria nos Atributos",
      },
      {
        type: "passive_providesFeat",
        selection: { mode: "specific", feats: ["feat-tavern-brawler"] },
        name: "Talento: Brigão de Taverna",
      },
      {
        type: "passive_grantProficiency",
        on: "skill",
        choose: { from: ["acrobatics", "perception"], count: 2 },
        name: "Proficiência em Perícias",
        description:
          "Você ganha proficiência em duas perícias. Acrobacia e Percepção.",
      },
      {
        type: "passive_grantProficiency",
        on: "tool",
        choose: { count: 1, from: ["tool-navigators-tools"] },
        name: "Proficiência em Ferramentas",
        description: "Você ganha proficiência com ferramentas de navegador.",
      },
    ],

    startingEquipment: [
      {
        type: "choice",
        count: 1,
        choices: [
          {
            id: "starting_equipment",
            contents: [
              { type: "item", id: "weapon-adaga", quantity: 1 },
              { type: "item", id: "tool-navigators-tools", quantity: 1 },
              { type: "item", id: "gear-rope", quantity: 1 },
              { type: "item", id: "gear-travelers-clothes", quantity: 1 },
              { type: "currency", amount: 20, unit: "gold" },
            ],
          },
          {
            id: "starting_gold",
            contents: [{ type: "currency", amount: 50, unit: "gold" }],
          },
        ],
      },
    ],
  },
  {
    id: "origin-scribe",
    name: ["Escriba", "Scribe"],
    source: "LDJ2024",
    description:
      "Um escriba é um especialista em documentação e registro de informações. Com habilidades precisas de escrita, organização e atenção aos detalhes, o escriba preserva conhecimentos e mantém registros importantes para a sociedade.",
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            operation: "add",
            pick: {
              amount: "any",
              from: ["dexterity", "intelligence", "wisdom"],
            },
            value: 3,
          },
        ],
        maxScore: 20,
        name: "Melhoria nos Atributos",
      },
      {
        type: "passive_providesFeat",
        selection: { mode: "specific", feats: ["feat-skilled"] },
        name: "Talento: Perito",
      },
      {
        type: "passive_grantProficiency",
        on: "skill",
        choose: { from: ["investigation", "perception"], count: 2 },
        name: "Proficiência em Perícias",
        description:
          "Você ganha proficiência em duas perícias. Investigação e Percepção.",
      },
      {
        type: "passive_grantProficiency",
        on: "tool",
        choose: { count: 1, from: ["tool-calligraphers-supplies"] },
        name: "Proficiência em Ferramentas",
        description: "Você ganha proficiência com o kit de caligrafia.",
      },
    ],

    startingEquipment: [
      {
        type: "choice",
        count: 1,
        choices: [
          {
            id: "starting_equipment",
            contents: [
              { type: "item", id: "tool-calligraphers-supplies", quantity: 1 },
              { type: "item", id: "gear-fine-clothes", quantity: 1 },
              { type: "item", id: "gear-lampiao", quantity: 1 },
              { type: "item", id: "gear-oleo", quantity: 3 },
              { type: "item", id: "gear-parchment", quantity: 12 },
              { type: "currency", amount: 23, unit: "gold" },
            ],
          },
          {
            id: "starting_gold",
            contents: [{ type: "currency", amount: 50, unit: "gold" }],
          },
        ],
      },
    ],
  },
  {
    id: "origin-soldier",
    name: ["Soldado", "Soldier"],
    source: "LDJ2024",
    description:
      "Um soldado é um combatente treinado que serviu em exércitos ou forças militares organizadas. Com disciplina e experiência em táticas de combate, o soldado possui resistência física, habilidades marciais e um senso de camaradagem forjado nos campos de batalha.",
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            operation: "add",
            pick: {
              amount: "any",
              from: ["strength", "dexterity", "constitution"],
            },
            value: 3,
          },
        ],
        maxScore: 20,
        name: "Melhoria nos Atributos",
      },
      {
        type: "passive_providesFeat",
        selection: { mode: "specific", feats: ["feat-savage-attacker"] },
        name: "Talento: Atacante Selvagem",
      },
      {
        type: "passive_grantProficiency",
        on: "skill",
        choose: { from: ["athletics", "intimidation"], count: 2 },
        name: "Proficiência em Perícias",
        description:
          "Você ganha proficiência em duas perícias. Atletismo e Intimidação.",
      },
      {
        type: "passive_grantProficiency",
        on: "tool",
        choose: { count: 1, from: ["tool-gaming-set"] },
        name: "Proficiência em Ferramentas",
        description:
          "Você ganha proficiência com um conjunto de jogos à sua escolha.",
      },
    ],

    startingEquipment: [
      {
        type: "choice",
        count: 1,
        choices: [
          {
            id: "starting_equipment",
            contents: [
              { type: "item", id: "weapon-lanca", quantity: 1 },
              { type: "item", id: "weapon-arco-curto", quantity: 1 },
              { type: "item", id: "tool-gaming-set", quantity: 1 },
              { type: "item", id: "tool-healers-kit", quantity: 1 },
              { type: "item", id: "gear-travelers-clothes", quantity: 1 },
              { type: "currency", amount: 14, unit: "gold" },
            ],
          },
          {
            id: "starting_gold",
            contents: [{ type: "currency", amount: 50, unit: "gold" }],
          },
        ],
      },
    ],
  },
  {
    id: "origin-wayfarer",
    name: ["Andarilho", "Wayfarer"],
    source: "LDJ2024",
    description:
      "Um andarilho é um viajante sem raízes que percorre as estradas em busca de oportunidades e aventuras. Com experiência em múltiplos ambientes e culturas, o andarilho desenvolveu perspicácia e adaptabilidade para sobreviver em qualquer situação.",
    effects: [
      {
        type: "passive_modifyAbilityScore",
        choices: [
          {
            operation: "add",
            pick: {
              amount: "any",
              from: ["dexterity", "wisdom", "charisma"],
            },
            value: 3,
          },
        ],
        maxScore: 20,
        name: "Melhoria nos Atributos",
      },
      {
        type: "passive_providesFeat",
        selection: { mode: "specific", feats: ["feat-lucky"] },
        name: "Talento: Sortudo",
      },
      {
        type: "passive_grantProficiency",
        on: "skill",
        choose: { from: ["insight", "stealth"], count: 2 },
        name: "Proficiência em Perícias",
        description:
          "Você ganha proficiência em duas perícias. Intuição e Furtividade.",
      },
      {
        type: "passive_grantProficiency",
        on: "tool",
        choose: { count: 1, from: ["tool-thieves-tools"] },
        name: "Proficiência em Ferramentas",
        description: "Você ganha proficiência com ferramentas de ladrão.",
      },
    ],

    startingEquipment: [
      {
        type: "choice",
        count: 1,
        choices: [
          {
            id: "starting_equipment",
            contents: [
              { type: "item", id: "weapon-adaga", quantity: 2 },
              { type: "item", id: "tool-thieves-tools", quantity: 1 },
              { type: "item", id: "tool-gaming-set", quantity: 1 },
              { type: "item", id: "gear-bedroll", quantity: 1 },
              { type: "item", id: "gear-pouch", quantity: 2 },
              { type: "item", id: "gear-travelers-clothes", quantity: 1 },
              { type: "currency", amount: 16, unit: "gold" },
            ],
          },
          {
            id: "starting_gold",
            contents: [{ type: "currency", amount: 50, unit: "gold" }],
          },
        ],
      },
    ],
  },
] as const satisfies OriginType[];
