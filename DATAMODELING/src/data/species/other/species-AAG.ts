// Arquivo gerado automaticamente
export const species = [
  {
    name: "Astral Elf",
    source: "AAG",
    lineage: "VRGR",
    creatureTypes: ["humanoid"],
    creatureTypeTags: ["elf"],
    size: ["M"],
    speed: 30,
    age: {
      max: 750,
    },
    darkvision: 60,
    skillProficiencies: [
      {
        perception: true,
      },
    ],
    additionalSpells: [
      {
        known: {
          "1": ["dancing lights#c"],
        },
        ability: {
          choose: ["int", "wis", "cha"],
        },
      },
      {
        known: {
          "1": ["light#c"],
        },
        ability: {
          choose: ["int", "wis", "cha"],
        },
      },
      {
        known: {
          "1": ["sacred flame#c"],
        },
        ability: {
          choose: ["int", "wis", "cha"],
        },
      },
    ],
    entries: [
      {
        name: "Creature Type",
        entries: [
          "You are a Humanoid. You are also considered an elf for any prerequisite or effect that requires you to be an elf.",
        ],
      },
      {
        name: "Astral Fire",
        entries: [
          "You know one of the following cantrips of your choice: {@spell dancing lights}, {@spell light}, or {@spell sacred flame}. Intelligence, Wisdom, or Charisma is your spellcasting ability for it (choose when you select this race).",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of yourself as if it were bright light, and in darkness as if it were dim light. You discern colors in that darkness only as shades of gray.",
        ],
      },
      {
        name: "Fey Ancestry",
        entries: [
          "You have advantage on saving throws you make to avoid or end the {@condition charmed} condition on yourself.",
        ],
      },
      {
        name: "Keen Senses",
        entries: ["You have proficiency in the {@skill Perception} skill."],
      },
      {
        name: "Starlight Step",
        entries: [
          "As a bonus action, you can magically teleport up to 30 feet to an unoccupied space you can see. You can use this trait a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
        ],
      },
      {
        name: "Astral Trance",
        entries: [
          "You don't need to sleep, and magic can't put you to sleep. You can finish a long rest in 4 hours if you spend those hours in a trancelike meditation, during which you remain conscious.",
          "Whenever you finish this trance, you gain proficiency in one skill of your choice and with one weapon or tool of your choice, selected from the {@book Player's Handbook|PHB}. You mystically acquire these proficiencies by drawing them from shared elven memory and the experiences of entities on the Astral Plane, and you retain them until you finish your next long rest.",
        ],
      },
    ],
  },
  {
    name: "Autognome",
    source: "AAG",
    lineage: "VRGR",
    creatureTypes: ["construct"],
    size: ["S"],
    speed: 30,
    toolProficiencies: [
      {
        any: 2,
      },
    ],
    resist: ["poison"],
    conditionImmune: ["disease"],
    entries: [
      {
        name: "Creature Type",
        entries: ["You are a Construct."],
      },
      {
        name: "Armored Casing",
        entries: [
          "You are encased in thin metal or some other durable material. While you aren't wearing armor, your base Armor Class is 13 + your Dexterity modifier.",
        ],
      },
      {
        name: "Built for Success",
        entries: [
          "You can add a {@dice d4} to one attack roll, ability check, or saving throw you make, and you can do so after seeing the {@dice d20} roll but before the effects of the roll are resolved. You can use this trait a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
        ],
      },
      {
        name: "Healing Machine",
        entries: [
          "If the {@spell mending} spell is cast on you, you can spend a Hit Die, roll it, and regain a number of hit points equal to the roll plus your Constitution modifier (minimum of 1 hit point).",
          "In addition, your creator designed you to benefit from several spells that preserve life but that normally don't affect Constructs: {@spell cure wounds}, {@spell healing word}, {@spell mass cure wounds}, {@spell mass healing word}, and {@spell spare the dying}.",
        ],
      },
      {
        name: "Mechanical Nature",
        entries: [
          "You have resistance to poison damage and immunity to disease, and you have advantage on saving throws against being {@condition paralyzed} or {@condition poisoned}. You don't need to eat, drink, or breathe.",
        ],
      },
      {
        name: "Sentry's Rest",
        entries: [
          "When you take a long rest, you spend at least 6 hours in an inactive, motionless state, instead of sleeping. In this state, you appear inert, but you remain conscious.",
        ],
      },
      {
        name: "Specialized Design",
        entries: [
          "You gain two tool proficiencies of your choice, selected from the {@book Player's Handbook|PHB}.",
        ],
      },
    ],
  },
  {
    name: "Giff",
    source: "AAG",
    lineage: "VRGR",
    size: ["M"],
    speed: {
      walk: 30,
      swim: true,
    },
    weaponProficiencies: [
      {
        firearms: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/giff.mp3",
    },
    entries: [
      {
        name: "Astral Spark",
        entries: [
          "Your psychic connection to the Astral Plane enables you to mystically access a spark of divine power, which you can channel through your weapons. When you hit a target with a {@filter simple or martial weapon|items|source=phb|category=basic|type=martial weapon;simple weapon}, you can cause the target to take extra force damage equal to your proficiency bonus.",
          "You can use this trait a number of times equal to your proficiency bonus, but you can use it no more than once per turn. You regain all expended uses when you finish a long rest.",
        ],
      },
      {
        name: "Firearms Mastery",
        entries: [
          "You have a mystical connection to firearms that traces back to the gods of the giff, who delighted in such weapons. You have proficiency with all firearms and ignore the loading property of any firearm. In addition, attacking at long range with a firearm doesn't impose disadvantage on your attack roll.",
        ],
      },
      {
        name: "Hippo Build",
        entries: [
          "You have advantage on Strength-based ability checks and Strength saving throws. In addition, you count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.",
        ],
      },
    ],
  },
  {
    name: "Hadozee",
    source: "AAG",
    lineage: "VRGR",
    size: ["S", "M"],
    speed: {
      walk: 30,
      climb: true,
    },
    entries: [
      {
        name: "Size",
        entries: [
          "You are Medium or Small. You choose the size when you select this race.",
        ],
      },
      {
        name: "Dexterous Feet",
        entries: [
          "As a bonus action, you can use your feet to manipulate an object, open or close a door or container, or pick up or set down a Tiny object.",
        ],
      },
      {
        name: "Glide",
        entries: [
          "When you fall at least 10 feet above the ground, you can use your reaction to extend your skin membranes to glide horizontally a number of feet equal to your walking speed, and you take 0 damage from the fall. You determine the direction of the glide.",
        ],
      },
      {
        name: "Hadozee Dodge",
        entries: [
          "The magic that runs in your veins heightens your natural defenses. When you take damage, you can use your reaction to roll a {@dice d6}. Add your proficiency bonus to the number rolled, and reduce the damage you take by an amount equal to that total (minimum of 0 damage).",
          "You can use this trait a number of times equal to your proficiency bonus. You regain all expended uses when you finish a long rest.",
        ],
      },
    ],
  },
  {
    name: "Plasmoid",
    source: "AAG",
    lineage: "VRGR",
    creatureTypes: ["ooze"],
    size: ["S", "M"],
    speed: 30,
    darkvision: 60,
    resist: ["acid", "poison"],
    entries: [
      {
        name: "Creature Type",
        entries: ["You are an Ooze."],
      },
      {
        name: "Size",
        entries: [
          "You are Medium or Small. You choose the size when you select this race.",
        ],
      },
      {
        name: "Amorphous",
        entries: [
          "You can squeeze through a space as narrow as 1 inch wide, provided you are wearing and carrying nothing. You have advantage on ability checks you make to initiate or escape a grapple.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of yourself as if it were bright light, and in darkness as if it were dim light. You discern colors in that darkness only as shades of gray.",
        ],
      },
      {
        name: "Hold Breath",
        entries: ["You can hold your breath for 1 hour."],
      },
      {
        name: "Natural Resilience",
        entries: [
          "You have resistance to acid and poison damage, and you have advantage on saving throws against being {@condition poisoned}.",
        ],
      },
      {
        name: "Shape Self",
        entries: [
          "As an action, you can reshape your body to give yourself a head, one or two arms, one or two legs, and makeshift hands and feet, or you can revert to a limbless blob. While you have a humanlike shape, you can wear clothing and armor made for a Humanoid of your size.",
          "As a bonus action, you can extrude a pseudopod that is up to 6 inches wide and 10 feet long or reabsorb it into your body. As part of the same bonus action, you can use this pseudopod to manipulate an object, open or close a door or container, or pick up or set down a Tiny object. The pseudopod contains no sensory organs and can't attack, activate magic items, or lift more than 10 pounds.",
        ],
      },
    ],
  },
  {
    name: "Thri-kreen",
    source: "AAG",
    lineage: "VRGR",
    creatureTypes: ["monstrosity"],
    size: ["S", "M"],
    speed: 30,
    darkvision: 60,
    soundClip: {
      type: "internal",
      path: "races/thri-kreen.mp3",
    },
    entries: [
      {
        name: "Creature Type",
        entries: ["You are a Monstrosity."],
      },
      {
        name: "Size",
        entries: [
          "You are Medium or Small. You choose the size when you select this race.",
        ],
      },
      {
        name: "Chameleon Carapace",
        entries: [
          "While you aren't wearing armor, your carapace gives you a base Armor Class of 13 + your Dexterity modifier.",
          "As an action, you can change the color of your carapace to match the color and texture of your surroundings, giving you advantage on Dexterity ({@skill Stealth}) checks made to {@action hide} in those surroundings.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of yourself as if it were bright light, and in darkness as if it were dim light. You discern colors in that darkness only as shades of gray.",
        ],
      },
      {
        name: "Secondary Arms",
        entries: [
          "You have two slightly smaller secondary arms below your primary pair of arms. The secondary arms can manipulate an object, open or close a door or container, pick up or set down a Tiny object, or wield a weapon that has the light property.",
        ],
      },
      {
        name: "Sleepless",
        entries: [
          "You do not require sleep and can remain conscious during a long rest, though you must still refrain from strenuous activity to gain the benefit of the rest.",
        ],
      },
      {
        name: "Thri-kreen Telepathy",
        entries: [
          "Without the assistance of magic, you can't speak the non-thri-kreen languages you know. Instead you use telepathy to convey your thoughts. You have the magical ability to transmit your thoughts mentally to willing creatures within 120 feet of yourself. A contacted creature doesn't need to share a language with you to understand your thoughts, but it must be able to understand at least one language. Your telepathic link to a creature is broken if you and the creature move more than 120 feet apart, if either of you is {@condition incapacitated}, or if either of you mentally breaks the contact (no action required).",
        ],
      },
    ],
  },
];
