// Arquivo gerado automaticamente
export const species = [
  {
    name: "Aven",
    source: "PSA",
    size: ["M"],
    speed: {
      walk: 25,
      fly: 30,
    },
    ability: [
      {
        dex: 2,
      },
    ],
    age: {
      mature: 20,
      max: 100,
    },
    languageProficiencies: [
      {
        common: true,
        other: true,
      },
    ],
    entries: [
      {
        name: "Age",
        entries: [
          "Like humans, aven reach adulthood in their late teens and can theoretically live into their 80s. Of course, most find a glorious (or inglorious) death long before that point.",
        ],
      },
      {
        name: "Alignment",
        entries: [
          "Most aven lean toward some form of neutrality. Ibis-headed aven, focused more on knowledge than any other virtue, are usually neutral. Hawk-headed aven are inclined toward lawful neutral.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Aven stand from 5 to 6 feet tall, but their bodies are slender and their bones are partially hollow to facilitate their flight. Your size is Medium.",
        ],
      },
      {
        name: "Flight",
        entries: [
          "You have a flying speed of 30 feet. You can't use your flying speed while you wear medium or heavy armor. (If your campaign uses the variant rule for encumbrance, you can't use your flying speed if you are encumbered.) ",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Aven."],
      },
    ],
  },
  {
    name: "Human (Amonkhet)",
    source: "PSA",
    size: ["M"],
    speed: 30,
    ability: [
      {
        choose: {
          from: ["str", "dex", "con", "int", "wis", "cha"],
          count: 2,
        },
      },
    ],
    age: {
      mature: 20,
      max: 100,
    },
    feats: [
      {
        any: 1,
      },
    ],
    skillProficiencies: [
      {
        any: 1,
      },
    ],
    languageProficiencies: [
      {
        common: true,
        anyStandard: 1,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/human.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: [
          "Humans reach adulthood in their late teens. Most human initiates have completed the trials and found a glorious or inglorious death before they turn 30. Viziers can enjoy longer service to their gods, in theory living up to a century.",
        ],
      },
      {
        name: "Alignment",
        entries: [
          "Humans tend toward no particular alignment. The best and the worst are found among them.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Humans vary widely in height and build, from barely 5 feet to well over 6 feet tall. Regardless of your position in that range, your size is Medium",
        ],
      },
      {
        name: "Skills",
        entries: ["You gain proficiency in one skill of your choice."],
      },
      {
        name: "Feat",
        entries: ["You gain one {@5etools feat|feats.html} of your choice."],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write Common and one extra language of your choice.",
        ],
      },
    ],
  },
  {
    name: "Khenra",
    source: "PSA",
    size: ["M"],
    speed: 35,
    ability: [
      {
        dex: 2,
        str: 1,
      },
    ],
    age: {
      mature: 13,
      max: 60,
    },
    languageProficiencies: [
      {
        common: true,
        other: true,
      },
    ],
    weaponProficiencies: [
      {
        "longsword|phb": true,
        "spear|phb": true,
        "javelin|phb": true,
      },
    ],
    entries: [
      {
        name: "Age",
        entries: [
          "Khenra mature quickly, reaching adulthood in their early teens. Khenra initiates are usually the youngest in a crop, completing the trials by their late teens. Even without a violent death, they rarely live past 60.",
        ],
      },
      {
        name: "Alignment",
        entries: [
          "Most khenra lean toward chaotic alignments. They have no particular inclination toward good or evil.",
        ],
      },
      {
        name: "Size",
        entries: ["Khenra have similar builds to humans. Your size is Medium."],
      },
      {
        name: "Khenra Weapon Training",
        entries: [
          "You have proficiency with the khopesh ({@item longsword|phb}), {@item spear|phb}, and {@item javelin|phb}.",
        ],
      },
      {
        name: "Khenra Twins",
        entries: [
          "If your twin is alive and you can see your twin, whenever you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll. If your twin is dead (or if you were born without a twin), you can't be {@condition frightened}.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Khenra."],
      },
    ],
  },
  {
    name: "Minotaur (Amonkhet)",
    source: "PSA",
    size: ["M"],
    speed: 30,
    ability: [
      {
        str: 2,
        con: 1,
      },
    ],
    age: {
      mature: 20,
      max: 40,
    },
    skillProficiencies: [
      {
        intimidation: true,
      },
    ],
    languageProficiencies: [
      {
        common: true,
        other: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/minotaur.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: [
          "Minotaurs develop more slowly than humans, reaching full maturity around the age of 20. They typically become acolytes at around 8 or 9 years old, making them among the older members of their crops. Once they reach maturity, though, minotaurs age quickly, rushing headlong through the trials (as they do all aspects of life) to complete them before they pass their peak. A minotaur allowed to die of old age would rarely live beyond 40.",
        ],
      },
      {
        name: "Alignment",
        entries: [
          "Most minotaurs lean toward chaotic alignments, and they have a slight inclination toward evil.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Minotaurs average over 6 feet in height, and they have strong, stocky builds. Your size is Medium.",
        ],
      },
      {
        name: "Natural Weapon",
        entries: [
          "You can use your horns as a natural weapon to make unarmed strikes. If you hit with your horns, you deal bludgeoning damage equal to {@damage 1d6} + your Strength modifier.",
        ],
      },
      {
        name: "Menacing",
        entries: ["You gain proficiency in the {@skill Intimidation} skill."],
      },
      {
        name: "Relentless Endurance",
        entries: [
          "When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can't use this feature again until you finish a long rest.",
        ],
      },
      {
        name: "Savage Attacks",
        entries: [
          "When you score a critical hit with a melee weapon attack, you can roll one of the weapon's damage dice one additional time and add it to the extra damage of the critical hit.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Minotaur."],
      },
    ],
  },
  {
    name: "Naga",
    source: "PSA",
    size: ["M"],
    speed: 30,
    ability: [
      {
        con: 2,
        int: 1,
      },
    ],
    age: {
      mature: 20,
      max: 100,
    },
    languageProficiencies: [
      {
        common: true,
        other: true,
      },
    ],
    toolProficiencies: [
      {
        "poisoner's kit": true,
      },
    ],
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    entries: [
      {
        name: "Age",
        entries: [
          "Like humans, naga reach adulthood in their late teens. They show no signs of aging beyond that point except for growing larger, so in theory, a naga could live well over a century.",
        ],
      },
      {
        name: "Alignment",
        entries: ["Most naga are either neutral or neutral evil in alignment."],
      },
      {
        name: "Size",
        entries: [
          "Naga stand about 5 feet tall when upright, but the total length of their bodies, head to tail, ranges from 10 to as much as 20 feet. Your size is Medium.",
        ],
      },
      {
        name: "Speed Burst",
        entries: [
          "By lowering your body to the ground and propelling yourself with your arms, you can move more quickly for a time. As a bonus action on your turn, if you have both hands free, you can increase your walking speed by 5 feet until the end of your turn.",
        ],
      },
      {
        name: "Natural Weapons",
        entries: [
          "Your fanged maw and constricting serpentine body are natural weapons, which you can use to make unarmed strikes.",
          "If you hit with your bite, you deal piercing damage equal to {@damage 1d4} + your Strength modifier, and your target must make a Constitution saving throw ({@dc 8} + your proficiency bonus + your Constitution modifier). On a failed save, the target takes {@damage 1d4} poison damage.",
          "If you hit with your constrict attack, you deal bludgeoning damage equal to {@damage 1d6} + your Strength modifier, and the target is {@condition grappled} (escape {@dc 8} + your proficiency bonus + your Strength modifier). Until this grapple ends, the target is {@condition restrained}, and you can't constrict another target.",
        ],
      },
      {
        name: "Poison Immunity",
        entries: [
          "You are immune to poison damage and can't be {@condition poisoned}.",
        ],
      },
      {
        name: "Poison Affinity",
        entries: ["You gain proficiency with the {@item poisoner's kit|phb}."],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Naga."],
      },
    ],
  },
];
