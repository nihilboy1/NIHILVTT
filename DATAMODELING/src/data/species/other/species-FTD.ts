// Arquivo gerado automaticamente
export const species = [
  {
    name: "Dragonborn (Chromatic)",
    source: "FTD",
    reprintedAs: ["Dragonborn|XPHB"],
    lineage: "VRGR",
    size: ["M"],
    speed: 30,
    resist: [
      {
        choose: {
          from: ["acid", "lightning", "poison", "fire", "cold"],
        },
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/dragonborn.mp3",
    },
    entries: [
      {
        name: "Chromatic Ancestry",
        entries: [
          "You have a chromatic dragon ancestor, granting you a special magical affinity. Choose one kind of dragon from the Chromatic Ancestry table. This determines the damage type for your other traits, as shown in the table.",
          {
            type: "table",
            caption: "Chromatic Ancestry",
            colLabels: ["Dragon", "Damage Type"],
            colStyles: ["col-6 text-center", "col-6 text-center"],
            rows: [
              ["Black", "Acid"],
              ["Blue", "Lightning"],
              ["Green", "Poison"],
              ["Red", "Fire"],
              ["White", "Cold"],
            ],
          },
        ],
      },
      {
        name: "Breath Weapon",
        entries: [
          "When you take the {@action Attack} action on your turn, you can replace one of your attacks with an exhalation of magical energy in a 30-foot line that is 5 feet wide. Each creature in that area must make a Dexterity saving throw (DC = 8 + your Constitution modifier + your proficiency bonus). On a failed save, the creature takes {@damage 1d10} damage of the type associated with your Chromatic Ancestry. On a successful save, it takes half as much damage. This damage increases by {@damage 1d10} when you reach 5th level ({@damage 2d10}), 11th level ({@damage 3d10}), and 17th level ({@damage 4d10}).",
          "You can use your Breath Weapon a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
        ],
      },
      {
        name: "Draconic Resistance",
        entries: [
          "You have resistance to the damage type associated with your Chromatic Ancestry.",
        ],
      },
      {
        name: "Chromatic Warding",
        entries: [
          "Starting at 5th level, as an action, you can channel your draconic energy to protect yourself. For 1 minute, you become immune to the damage type associated with your Chromatic Ancestry. Once you use this trait, you can't do so again until you finish a long rest.",
        ],
      },
    ],
    _versions: [
      {
        _abstract: {
          name: "Dragonborn (Chromatic; {{color}})",
          source: "FTD",
          _mod: {
            entries: [
              {
                mode: "removeArr",
                names: "Chromatic Ancestry",
              },
              {
                mode: "replaceArr",
                replace: "Breath Weapon",
                items: {
                  name: "Breath Weapon",
                  entries: [
                    "When you take the {@action Attack} action on your turn, you can replace one of your attacks with an exhalation of magical energy in a 30-foot line that is 5 feet wide. Each creature in that area must make a Dexterity saving throw (DC = 8 + your Constitution modifier + your proficiency bonus). On a failed save, the creature takes {@damage 1d10} {{damageType}} damage. On a successful save, it takes half as much damage. This damage increases by {@damage 1d10} when you reach 5th level ({@damage 2d10}), 11th level ({@damage 3d10}), and 17th level ({@damage 4d10}).",
                    "You can use your Breath Weapon a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
                  ],
                },
              },
              {
                mode: "replaceArr",
                replace: "Draconic Resistance",
                items: {
                  name: "Draconic Resistance",
                  entries: ["You have resistance to {{damageType}} damage."],
                },
              },
            ],
          },
        },
        _implementations: [
          {
            _variables: {
              color: "Black",
              damageType: "acid",
              resist: ["acid"],
            },
          },
          {
            _variables: {
              color: "Blue",
              damageType: "lightning",
              resist: ["lightning"],
            },
          },
          {
            _variables: {
              color: "Green",
              damageType: "poison",
              resist: ["poison"],
            },
          },
          {
            _variables: {
              color: "Red",
              damageType: "fire",
              resist: ["fire"],
            },
          },
          {
            _variables: {
              color: "White",
              damageType: "cold",
              resist: ["cold"],
            },
          },
        ],
      },
    ],
  },
  {
    name: "Dragonborn (Gem)",
    source: "FTD",
    lineage: "VRGR",
    size: ["M"],
    speed: 30,
    resist: [
      {
        choose: {
          from: ["force", "radiant", "psychic", "thunder", "necrotic"],
        },
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/dragonborn.mp3",
    },
    entries: [
      {
        name: "Gem Ancestry",
        entries: [
          "You have a gem dragon ancestor, granting you a special magical affinity. Choose one kind of dragon from the Gem Ancestry table. This determines the damage type for your other traits, as shown in the table.",
          {
            type: "table",
            caption: "Gem Ancestry",
            colLabels: ["Dragon", "Damage Type"],
            colStyles: ["col-6 text-center", "col-6 text-center"],
            rows: [
              ["Amethyst", "Force"],
              ["Crystal", "Radiant"],
              ["Emerald", "Psychic"],
              ["Sapphire", "Thunder"],
              ["Topaz", "Necrotic"],
            ],
          },
        ],
      },
      {
        name: "Breath Weapon",
        entries: [
          "When you take the {@action Attack} action on your turn, you can replace one of your attacks with an exhalation of magical energy in a 15-foot cone. Each creature in that area must make a Dexterity saving throw (DC = 8 + your Constitution modifier + your proficiency bonus). On a failed save, the creature takes {@damage 1d10} damage of the type associated with your Gem Ancestry. On a successful save, it takes half as much damage. This damage increases by {@damage 1d10} when you reach 5th level ({@damage 2d10}), 11th level ({@damage 3d10}), and 17th level ({@damage 4d10}).",
          "You can use your Breath Weapon a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
        ],
      },
      {
        name: "Draconic Resistance",
        entries: [
          "You have resistance to the damage type associated with your Gem Ancestry.",
        ],
      },
      {
        name: "Psionic Mind",
        entries: [
          "You can send telepathic messages to any creature you can see within 30 feet of you. You don't need to share a language with the creature for it to understand these messages, but it must be able to understand at least one language to comprehend them.",
        ],
      },
      {
        name: "Gem Flight",
        entries: [
          "Starting at 5th level, you can use a bonus action to manifest spectral wings on your body. These wings last for 1 minute. For the duration, you gain a flying speed equal to your walking speed and can hover. Once you use this trait, you can't do so again until you finish a long rest.",
        ],
      },
    ],
    _versions: [
      {
        _abstract: {
          name: "Dragonborn (Gem; {{color}})",
          source: "FTD",
          _mod: {
            entries: [
              {
                mode: "removeArr",
                names: "Gem Ancestry",
              },
              {
                mode: "replaceArr",
                replace: "Breath Weapon",
                items: {
                  name: "Breath Weapon",
                  entries: [
                    "When you take the {@action Attack} action on your turn, you can replace one of your attacks with an exhalation of magical energy in a 15-foot cone. Each creature in that area must make a Dexterity saving throw (DC = 8 + your Constitution modifier + your proficiency bonus). On a failed save, the creature takes {@damage 1d10} {{damageType}} damage. On a successful save, it takes half as much damage. This damage increases by {@damage 1d10} when you reach 5th level ({@damage 2d10}), 11th level ({@damage 3d10}), and 17th level ({@damage 4d10}).",
                    "You can use your Breath Weapon a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
                  ],
                },
              },
              {
                mode: "replaceArr",
                replace: "Draconic Resistance",
                items: {
                  name: "Draconic Resistance",
                  entries: ["You have resistance to {{damageType}} damage."],
                },
              },
            ],
          },
        },
        _implementations: [
          {
            _variables: {
              color: "Amethyst",
              damageType: "force",
            },
            resist: ["force"],
          },
          {
            _variables: {
              color: "Crystal",
              damageType: "radiant",
            },
            resist: ["radiant"],
          },
          {
            _variables: {
              color: "Emerald",
              damageType: "psychic",
            },
            resist: ["psychic"],
          },
          {
            _variables: {
              color: "Sapphire",
              damageType: "thunder",
            },
            resist: ["thunder"],
          },
          {
            _variables: {
              color: "Topaz",
              damageType: "necrotic",
            },
            resist: ["necrotic"],
          },
        ],
      },
    ],
  },
  {
    name: "Dragonborn (Metallic)",
    source: "FTD",
    reprintedAs: ["Dragonborn|XPHB"],
    lineage: "VRGR",
    size: ["M"],
    speed: 30,
    resist: [
      {
        choose: {
          from: ["fire", "lightning", "acid", "cold"],
        },
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/dragonborn.mp3",
    },
    entries: [
      {
        name: "Metallic Ancestry",
        entries: [
          "You have a metallic dragon ancestor, granting you a special magical affinity. Choose one kind of dragon from the Metallic Ancestry table. This determines the damage type for your other traits, as shown in the table.",
          {
            type: "table",
            caption: "Metallic Ancestry",
            colLabels: ["Dragon", "Damage Type"],
            colStyles: ["col-6 text-center", "col-6 text-center"],
            rows: [
              ["Brass", "Fire"],
              ["Bronze", "Lightning"],
              ["Copper", "Acid"],
              ["Gold", "Fire"],
              ["Silver", "Cold"],
            ],
          },
        ],
      },
      {
        name: "Breath Weapon",
        entries: [
          "When you take the {@action Attack} action on your turn, you can replace one of your attacks with an exhalation of magical energy in a 15-foot cone. Each creature in that area must make a Dexterity saving throw (DC = 8 + your Constitution modifier + your proficiency bonus). On a failed save, the creature takes {@damage 1d10} damage of the type associated with your Metallic Ancestry. On a successful save, it takes half as much damage. This damage increases by {@damage 1d10} when you reach 5th level ({@damage 2d10}), 11th level ({@damage 3d10}), and 17th level ({@damage 4d10}).",
          "You can use your Breath Weapon a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
        ],
      },
      {
        name: "Draconic Resistance",
        entries: [
          "You have resistance to the damage type associated with your Metallic Ancestry.",
        ],
      },
      {
        name: "Metallic Breath Weapon",
        entries: [
          "At 5th level, you gain a second breath weapon. When you take the {@action Attack} action on your turn, you can replace one of your attacks with an exhalation in a 15-foot cone. The save DC for this breath is 8 + your Constitution modifier + your proficiency bonus. Whenever you use this trait, choose one:",
          {
            type: "list",
            style: "list-hang-notitle",
            items: [
              {
                type: "item",
                name: "Enervating Breath",
                entries: [
                  "Each creature in the cone must succeed on a Constitution saving throw or become {@condition incapacitated} until the start of your next turn.",
                ],
              },
              {
                type: "item",
                name: "Repulsion Breath",
                entries: [
                  "Each creature in the cone must succeed on a Strength saving throw or be pushed 20 feet away from you and be knocked {@condition prone}.",
                ],
              },
            ],
          },
          "Once you use your Metallic Breath Weapon, you can't do so again until you finish a long rest.",
        ],
      },
    ],
    _versions: [
      {
        _abstract: {
          name: "Dragonborn (Metallic; {{color}})",
          source: "FTD",
          _mod: {
            entries: [
              {
                mode: "removeArr",
                names: "Metallic Ancestry",
              },
              {
                mode: "replaceArr",
                replace: "Breath Weapon",
                items: {
                  name: "Breath Weapon",
                  entries: [
                    "When you take the {@action Attack} action on your turn, you can replace one of your attacks with an exhalation of magical energy in a 15-foot cone. Each creature in that area must make a Dexterity saving throw (DC = 8 + your Constitution modifier + your proficiency bonus). On a failed save, the creature takes {@damage 1d10} {{damageType}} damage. On a successful save, it takes half as much damage. This damage increases by {@damage 1d10} when you reach 5th level ({@damage 2d10}), 11th level ({@damage 3d10}), and 17th level ({@damage 4d10}).",
                    "You can use your Breath Weapon a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
                  ],
                },
              },
              {
                mode: "replaceArr",
                replace: "Draconic Resistance",
                items: {
                  name: "Draconic Resistance",
                  entries: ["You have resistance to {{damageType}} damage."],
                },
              },
            ],
          },
        },
        _implementations: [
          {
            _variables: {
              color: "Brass",
              damageType: "fire",
            },
            resist: ["fire"],
          },
          {
            _variables: {
              color: "Bronze",
              damageType: "lightning",
            },
            resist: ["lightning"],
          },
          {
            _variables: {
              color: "Copper",
              damageType: "acid",
            },
            resist: ["acid"],
          },
          {
            _variables: {
              color: "Gold",
              damageType: "fire",
            },
            resist: ["fire"],
          },
          {
            _variables: {
              color: "Silver",
              damageType: "cold",
            },
            resist: ["cold"],
          },
        ],
      },
    ],
  },
];
