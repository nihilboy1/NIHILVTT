// Arquivo gerado automaticamente
export const species = [
  {
    name: "Dhampir",
    source: "VRGR",
    lineage: "VRGR",
    size: ["S", "M"],
    speed: {
      walk: 35,
      climb: true,
    },
    darkvision: 60,
    entries: [
      {
        name: "Size",
        entries: [
          "You are Medium or Small. You choose the size when you gain this lineage.",
        ],
      },
      {
        name: "Ancestral Legacy",
        entries: [
          "If you replace a race with this lineage, you can keep the following elements of that race: any skill proficiencies you gained from it and any climbing, flying, or swimming speed you gained from it.",
          "If you don't keep any of those elements or you choose this lineage at character creation, you gain proficiency in two skills of your choice.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light and in darkness as if it were dim light. You discern colors in that darkness as shades of gray.",
        ],
      },
      {
        name: "Deathless Nature",
        entries: ["You don't need to breathe."],
      },
      {
        name: "Spider Climb",
        entries: [
          "You have a climbing speed equal to your walking speed. In addition, at 3rd level, you can move up, down, and across vertical surfaces and upside down along ceilings, while leaving your hands free.",
        ],
      },
      {
        name: "Vampiric Bite",
        entries: [
          "Your fanged bite is a natural weapon, which counts as a simple melee weapon with which you are proficient. You add your Constitution modifier, instead of your Strength modifier, to the attack and damage rolls when you attack with this bite. It deals {@damage 1d4} piercing damage on a hit. While you are missing half or more of your hit points, you have advantage on attack rolls you make with this bite.",
          "When you attack with this bite and hit a creature that isn't a Construct or an Undead, you can empower yourself in one of the following ways of your choice:",
          {
            type: "list",
            items: [
              "You regain hit points equal to the piercing damage dealt by the bite.",
              "You gain a bonus to the next ability check or attack roll you make; the bonus equals the piercing damage dealt by the bite",
            ],
          },
          "You can empower yourself with this bite a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
        ],
      },
    ],
  },
  {
    name: "Hexblood",
    source: "VRGR",
    lineage: "VRGR",
    creatureTypes: ["fey"],
    size: ["S", "M"],
    speed: 30,
    darkvision: 60,
    skillProficiencies: [
      {
        any: 2,
      },
    ],
    additionalSpells: [
      {
        ability: {
          choose: ["int", "wis", "cha"],
        },
        known: {
          "1": ["disguise self", "hex"],
        },
      },
    ],
    entries: [
      {
        name: "Creature Type",
        entries: ["You are a Fey."],
      },
      {
        name: "Size",
        entries: [
          "You are Medium or Small. You choose the size when you gain this lineage.",
        ],
      },
      {
        name: "Ancestral Legacy",
        entries: [
          "If you replace a race with this lineage, you can keep the following elements of that race: any skill proficiencies you gained from it and any climbing, flying, or swimming speed you gained from it.",
          "If you don't keep any of those elements or you choose this lineage at character creation, you gain proficiency in two skills of your choice.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light and in darkness as if it were dim light. You discern colors in that darkness as shades of gray.",
        ],
      },
      {
        name: "Eerie Token",
        entries: [
          "As a bonus action, you can harmlessly remove a lock of your hair, one of your nails, or one of your teeth. This token is imbued with magic until you finish a long rest. While the token is imbued in this way, you can take these actions:",
          {
            type: "list",
            style: "list-hang-notitle",
            items: [
              {
                type: "item",
                name: "Telepathic Message",
                entry:
                  "As an action, you can send a telepathic message to the creature holding or carrying the token, as long as you are within 10 miles of it. The message can contain up to twenty-five words.",
              },
              {
                type: "item",
                name: "Remote Viewing",
                entry:
                  "If you are within 10 miles of the token, you can enter a trance as an action. The trance lasts for 1 minute, but it ends early if you dismiss it (no action required) or are {@condition incapacitated}. During this trance, you can see and hear from the token as if you were located where it is. While you are using your senses at the token's location, you are {@condition blinded} and {@condition deafened} in regard to your own surroundings. When the trance ends, the token is harmlessly destroyed.",
              },
            ],
          },
          "Once you create a token using this feature, you can't do so again until you finish a long rest, at which point your missing part regrows.",
        ],
      },
      {
        name: "Hex Magic",
        entries: [
          "You can cast the {@spell disguise self} and {@spell hex} spells with this trait. Once you cast either of these spells with this trait, you can't cast that spell with it again until you finish a long rest. You can also cast these spells using any spell slots you have.",
          "Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells (choose the ability when you gain this lineage).",
          {
            type: "inset",
            name: "Becoming a Hag",
            entries: [
              "Hags can undertake a ritual to irreversibly transform a hexblood they created into a new hag, either one of their own kind or that embodies the hexblood's nature. This requires that both the hag and hexblood be in the same place and consent to the lengthy ritual—circumstances most hexbloods shun but might come to accept over the course of centuries. Once a hexblood undergoes this irreversible ritual, they emerge as a hag NPC no longer under the control of the hexblood's player, unless the DM rules otherwise.",
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Reborn",
    source: "VRGR",
    lineage: "VRGR",
    size: ["S", "M"],
    speed: 30,
    resist: ["poison"],
    entries: [
      {
        name: "Size",
        entries: [
          "You are Medium or Small. You choose the size when you gain this lineage.",
        ],
      },
      {
        name: "Ancestral Legacy",
        entries: [
          "If you replace a race with this lineage, you can keep the following elements of that race: any skill proficiencies you gained from it and any climbing, flying, or swimming speed you gained from it.",
          "If you don't keep any of those elements or you choose this lineage at character creation, you gain proficiency in two skills of your choice.",
        ],
      },
      {
        name: "Deathless Nature",
        entries: [
          "You have escaped death, a fact represented by the following benefits:",
          {
            type: "list",
            items: [
              "You have advantage on saving throws against disease and being {@condition poisoned}, and you have resistance to poison damage.",
              "You have advantage on death saving throws.",
              "You don't need to eat, drink, or breathe.",
              "You don't need to sleep, and magic can't put you to sleep. You can finish a long rest in 4 hours if you spend those hours in an inactive, motionless state, during which you retain consciousness.",
            ],
          },
        ],
      },
      {
        name: "Knowledge from a Past Life",
        entries: [
          "You temporarily remember glimpses of the past, perhaps faded memories from ages ago or a previous life. When you make an ability check that uses a skill, you can roll a {@dice d6} immediately after seeing the number on the {@dice d20} and add the number on the {@dice d6} to the check. You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
        ],
      },
    ],
  },
];
