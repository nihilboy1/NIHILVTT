
export const feats= [
  {
    id: "feat-boon-of-combat-prowess",
    name: ["Benção da Proweza em Combate", "Boon of Combat Prowess"],
    description:
      "Você pode transformar um ataque que errou em um acerto automaticamente uma vez por descanso longo.",
    source: "LDJ2024",
    category: "epicBoon",
    prerequisite: [
      {
        level: 19,
      },
    ],
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
        max: 30,
      },
    ],
    entries: [
      "You gain the following benefits.",
      {
        type: "entries",
        name: "Peerless Aim",
        entries: [
          "When you miss with an attack roll, you can hit instead. Once you use this benefit, you can't use it again until the start of your next turn.",
        ],
      },
    ],
  },
  {
    id: "feat-boon-of-dimensional-travel",
    name: ["Benção da Viagem Dimensional", "Boon of Dimensional Travel"],
    description:
      "Você pode se teletransportar até 18 metros como uma ação bônus uma vez por descanso curto ou longo.",
    source: "LDJ2024",
    category: "epicBoon",
    prerequisite: [
      {
        level: 19,
      },
    ],
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
        max: 30,
      },
    ],
    entries: [
      "You gain the following benefits.",
      {
        type: "entries",
        name: "Blink Steps",
        entries: [
          "Immediately after you take the {@action Attack|XPHB} action or the {@action Magic|XPHB} action, you can teleport up to 30 feet to an unoccupied space you can see.",
        ],
      },
    ],
  },
  {
    id: "feat-boon-of-energy-resistance",
    name: ["Benção da Resistência à Energia", "Boon of Energy Resistance"],
    description: "Você ganha resistência a um tipo de dano à sua escolha.",
    source: "LDJ2024",
    category: "epicBoon",
    prerequisite: [
      {
        level: 19,
      },
    ],
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
        max: 30,
      },
    ],
    resist: [
      {
        choose: {
          from: [
            "acid",
            "cold",
            "fire",
            "lightning",
            "necrotic",
            "poison",
            "psychic",
            "radiant",
            "thunder",
          ],
          count: 2,
        },
      },
    ],
    entries: [
      "You gain the following benefits.",
      {
        type: "entries",
        name: "Energy Resistances",
        entries: [
          "You gain Resistance to two of the following damage types of your choice: Acid, Cold, Fire, Lightning, Necrotic, Poison, Psychic, Radiant, or Thunder. Whenever you finish a Long Rest, you can change your choices.",
        ],
      },
      {
        type: "entries",
        name: "Energy Redirection",
        entries: [
          "When you take damage of one of the types chosen for the Energy Resistances benefit, you can take a Reaction to direct damage of the same type toward another creature you can see within 60 feet of yourself that isn't behind Total Cover. If you do so, that creature must succeed on a Dexterity saving throw ({@dc 8} plus your Constitution modifier and Proficiency Bonus) or take damage equal to {@dice 2d12} plus your Constitution modifier.",
        ],
      },
    ],
  },
  {
    id: "feat-boon-of-fate",
    name: ["Benção do Destino", "Boon of Fate"],
    description:
      "Você pode influenciar o destino, alterando resultados de testes para si ou aliados.",
    source: "LDJ2024",
    category: "epicBoon",
    prerequisite: [
      {
        level: 19,
      },
    ],
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
        max: 30,
      },
    ],
    entries: [
      "You gain the following benefits.",
      {
        type: "entries",
        name: "Improve Fate",
        entries: [
          "When you or another creature within 60 feet of you succeeds on or fails a {@variantrule D20 Test|XPHB}, you can roll {@dice 2d4} and apply the total rolled as a bonus or penalty to the {@dice d20} roll. Once you use this benefit, you can't use it again until you roll Initiative or finish a Short or Long Rest.",
        ],
      },
    ],
  },
  {
    id: "feat-boon-of-fortitude",
    name: ["Benção da Fortitude", "Boon of Fortitude"],
    description:
      "Sua vitalidade é extraordinária, aumentando seus pontos de vida e sua recuperação.",
    source: "LDJ2024",
    category: "epicBoon",
    prerequisite: [
      {
        level: 19,
      },
    ],
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
        max: 30,
      },
    ],
    entries: [
      "You gain the following benefits.",
      {
        type: "entries",
        name: "Fortified Health",
        entries: [
          "Your Hit Point maximum increases by 40. In addition, whenever you regain Hit Points, you can regain additional Hit Points equal to your Constitution modifier. Once you've regained these additional Hit Points, you can't do so again until the start of your next turn.",
        ],
      },
    ],
  },
  {
    id: "feat-boon-of-irresistible-offense",
    name: ["Benção do Ofensivo Irresistível", "Boon of Irresistible Offense"],
    description:
      "Seus ataques ignoram resistências e podem causar dano extra em acertos críticos.",
    source: "LDJ2024",
    category: "epicBoon",
    prerequisite: [
      {
        level: 19,
      },
    ],
    ability: [
      {
        choose: {
          from: ["strength", "dexterity"],
        },
        max: 30,
      },
    ],
    entries: [
      "You gain the following benefits.",
      {
        type: "entries",
        name: "Overcome Defenses",
        entries: [
          "The Bludgeoning, Piercing, and Slashing damage you deal always ignores Resistance.",
        ],
      },
      {
        type: "entries",
        name: "Overwhelming Strike",
        entries: [
          "When you roll a 20 on the {@dice d20} for an attack roll, you can deal extra damage to the target equal to the ability score increased by this feat. The extra damage's type is the same as the attack's type.",
        ],
      },
    ],
  },
  {
    id: "feat-boon-of-recovery",
    name: ["Benção da Recuperação", "Boon of Recovery"],
    description:
      "Você se recupera rapidamente de ferimentos graves e pode restaurar muitos pontos de vida.",
    source: "LDJ2024",
    category: "epicBoon",
    prerequisite: [
      {
        level: 19,
      },
    ],
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
        max: 30,
      },
    ],
    entries: [
      "You gain the following benefits.",
      {
        type: "entries",
        name: "Last Stand",
        entries: [
          "When you would be reduced to 0 Hit Points, you can drop to 1 Hit Point instead and regain a number of Hit Points equal to half your Hit Point maximum. Once you use this benefit, you can't use it again until you finish a Long Rest.",
        ],
      },
      {
        type: "entries",
        name: "Recover Vitality",
        entries: [
          "You have a pool of ten d10s. As a Bonus Action, you can expend dice from the pool, roll those dice, and regain a number of Hit Points equal to the roll's total. You regain all the expended dice when you finish a Long Rest.",
        ],
      },
    ],
  },
  {
    id: "feat-boon-of-skill",
    name: ["Benção da Perícia", "Boon of Skill"],
    description:
      "Você se torna proficiente em todas as perícias e pode escolher uma para obter especialização.",
    source: "LDJ2024",
    category: "epicBoon",
    prerequisite: [
      {
        level: 19,
      },
    ],
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
        max: 30,
      },
    ],
    skillProficiencies: [
      {
        athletics: true,
        acrobatics: true,
        "sleight of hand": true,
        stealth: true,
        arcana: true,
        history: true,
        investigation: true,
        nature: true,
        religion: true,
        "animal handling": true,
        insight: true,
        medicine: true,
        perception: true,
        survival: true,
        deception: true,
        intimidation: true,
        performance: true,
        persuasion: true,
      },
    ],
    expertise: [
      {
        anyProficientSkill: 1,
      },
    ],
    entries: [
      "You gain the following benefits.",
      {
        type: "entries",
        name: "All-Around Adept",
        entries: ["You gain proficiency in all skills."],
      },
      {
        type: "entries",
        name: "Expertise",
        entries: [
          "Choose one skill in which you lack Expertise. You gain Expertise in that skill.",
        ],
      },
    ],
  },
  {
    id: "feat-boon-of-speed",
    name: ["Benção da Velocidade", "Boon of Speed"],
    description:
      "Sua velocidade e agilidade aumentam consideravelmente, permitindo movimentos rápidos e evasivos.",
    source: "LDJ2024",
    category: "epicBoon",
    prerequisite: [
      {
        level: 19,
      },
    ],
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
        max: 30,
      },
    ],
    entries: [
      "You gain the following benefits.",
      {
        type: "entries",
        name: "Escape Artist",
        entries: [
          "As a Bonus Action, you can take the {@action Disengage|XPHB} action, which also ends the {@condition Grappled|XPHB} condition on you.",
        ],
      },
      {
        type: "entries",
        name: "Quickness",
        entries: ["Your Speed increases by 30 feet."],
      },
    ],
  },
  {
    id: "feat-boon-of-spell-recall",
    name: ["Benção da Memória Mágica", "Boon of Spell Recall"],
    description:
      "Você pode recuperar magias gastas ao conjurar, tornando-se um conjurador mais eficiente.",
    source: "LDJ2024",
    category: "epicBoon",
    prerequisite: [
      {
        level: 19,
        spellcasting2020: true,
      },
    ],
    ability: [
      {
        choose: {
          from: ["intelligence", "wisdom", "charisma"],
        },
        max: 30,
      },
    ],
    entries: [
      "You gain the following benefits.",
      {
        type: "entries",
        name: "Free Casting",
        entries: [
          "Whenever you cast a spell with a level 1-4 spell slot, roll {@dice 1d4}. If the number you roll is the same as the slot's level, the slot isn't expended.",
        ],
      },
    ],
  },
  {
    id: "feat-boon-of-the-night-spirit",
    name: ["Benção do Espírito Noturno", "Boon of the Night Spirit"],
    description:
      "Você pode se tornar invisível nas sombras e resiste a quase todos os tipos de dano nesse ambiente.",
    source: "LDJ2024",
    category: "epicBoon",
    prerequisite: [
      {
        level: 19,
      },
    ],
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
        max: 30,
      },
    ],
    entries: [
      "You gain the following benefits.",
      {
        type: "entries",
        name: "Merge with Shadows",
        entries: [
          "While within Dim Light or Darkness, you can give yourself the {@condition Invisible|XPHB} condition as a Bonus Action. The condition ends on you immediately after you take an action, a Bonus Action, or a Reaction.",
        ],
      },
      {
        type: "entries",
        name: "Shadowy Form",
        entries: [
          "While within Dim Light or Darkness, you have Resistance to all damage except Psychic and Radiant.",
        ],
      },
    ],
  },
  {
    id: "feat-boon-of-truesight",
    name: ["Benção da Visão Verdadeira", "Boon of Truesight"],
    description:
      "Você adquire visão verdadeira, enxergando através de ilusões e escuridão mágica.",
    source: "LDJ2024",
    category: "epicBoon",
    prerequisite: [
      {
        level: 19,
      },
    ],
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
        max: 30,
      },
    ],
    senses: [
      {
        truesight: 60,
      },
    ],
    entries: [
      "You gain the following benefits.",
      {
        type: "entries",
        name: "Truesight",
        entries: ["You have {@sense Truesight|XPHB} with a range of 60 feet."],
      },
    ],
  },
];
