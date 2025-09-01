// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_11 = [
  {
    name: "Bandit Crime Lord",
    source: "XMM",
    page: 28,
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [17],
    hp: {
      average: 169,
      formula: "26d8 + 52",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 10,
    dex: 20,
    con: 14,
    int: 18,
    wis: 14,
    cha: 15,
    save: {
      dex: "+9",
      con: "+6",
    },
    skill: {
      acrobatics: "+9",
      perception: "+10",
      stealth: "+13",
    },
    passive: 20,
    languages: ["Common", "Thieves' cant"],
    cr: "11",
    gear: [
      {
        item: "pistol|xphb",
        quantity: 2,
      },
      "scimitar|xphb",
      "studded leather armor|xphb",
    ],
    trait: [
      {
        name: "Evasion",
        entries: [
          "If the bandit is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the bandit instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the {@condition Incapacitated|XPHB} condition.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The bandit makes three attacks, using Scimitar or Pistol in any combination.",
        ],
      },
      {
        name: "Scimitar",
        entries: [
          "{@atkr m} {@hit 9}, reach 5 ft. {@h}12 ({@damage 2d6 + 5}) Slashing damage plus 14 ({@damage 4d6}) Poison damage.",
        ],
      },
      {
        name: "Pistol",
        entries: [
          "{@atkr r} {@hit 9}, range 30/90 ft. {@h}10 ({@damage 1d10 + 5}) Piercing damage plus 14 ({@damage 4d6}) Poison damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Deadly Aim",
        entries: [
          "The bandit gives itself {@variantrule Advantage|XPHB} on the next attack roll it makes during the current turn. If that attack hits, the target takes an extra 28 ({@damage 8d6}) Poison damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["any"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "TC"],
    damageTags: ["I", "P", "S"],
    miscTags: ["MA", "MLW", "RA", "RNG"],
    conditionInflict: ["incapacitated"],
  },
  {
    name: "Behir",
    source: "XMM",
    page: 34,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["H"],
    type: "monstrosity",
    alignment: ["N", "E"],
    ac: [17],
    hp: {
      average: 168,
      formula: "16d12 + 64",
    },
    speed: {
      walk: 50,
      climb: 50,
    },
    str: 23,
    dex: 16,
    con: 18,
    int: 7,
    wis: 14,
    cha: 12,
    skill: {
      perception: "+6",
      stealth: "+7",
    },
    senses: ["darkvision 90 ft."],
    passive: 16,
    immune: ["lightning"],
    languages: ["Draconic"],
    cr: "11",
    action: [
      {
        name: "Multiattack",
        entries: ["The behir makes one Bite attack and uses Constrict."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 10}, reach 10 ft. {@h}19 ({@damage 2d12 + 6}) Piercing damage plus 11 ({@damage 2d10}) Lightning damage.",
        ],
      },
      {
        name: "Constrict",
        entries: [
          "{@actSave str} {@dc 18}, one Large or smaller creature the behir can see within 5 feet. {@actSaveFail} 28 ({@damage 5d8 + 6}) Bludgeoning damage. The target has the {@condition Grappled|XPHB} condition (escape {@dc 16}), and it has the {@condition Restrained|XPHB} condition until the grapple ends.",
        ],
      },
      {
        name: "Lightning Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 16}, each creature in a 90-foot-long, 5-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 66 ({@damage 12d10}) Lightning damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Swallow",
        entries: [
          "{@actSave dex} {@dc 18}, one Large or smaller creature {@condition Grappled|XPHB} by the behir (the behir can have only one creature swallowed at a time). {@actSaveFail} The behir swallows the target, which is no longer {@condition Grappled|XPHB}. While swallowed, a creature has the {@condition Blinded|XPHB} and {@condition Restrained|XPHB} conditions, has {@variantrule Cover|XPHB|Total Cover} against attacks and other effects outside the behir, and takes 21 ({@damage 6d6}) Acid damage at the start of each of the behir's turns.",
          "If the behir takes 30 damage or more on a single turn from the swallowed creature, the behir must succeed on a {@dc 14} Constitution saving throw at the end of that turn or regurgitate the creature, which falls in a space within 10 feet of the behir and has the {@condition Prone|XPHB} condition. If the behir dies, a swallowed creature is no longer {@condition Restrained|XPHB} and can escape from the corpse by using 15 feet of movement, exiting {@condition Prone|XPHB}.",
        ],
      },
    ],
    environment: ["underdark"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/behir.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Breath Weapon", "Multiattack", "Swallow"],
    languageTags: ["DR"],
    damageTags: ["A", "B", "L", "P"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["grappled", "prone", "restrained"],
    savingThrowForced: ["constitution", "dexterity", "strength"],
  },
  {
    name: "Dao",
    group: ["Genies"],
    source: "XMM",
    page: 89,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: {
      type: "elemental",
      tags: ["genie"],
    },
    alignment: ["N"],
    ac: [18],
    hp: {
      average: 200,
      formula: "16d10 + 112",
    },
    speed: {
      walk: 30,
      burrow: 30,
      fly: {
        number: 30,
        condition: "(hover)",
      },
      canHover: true,
    },
    str: 23,
    dex: 12,
    con: 24,
    int: 12,
    wis: 13,
    cha: 18,
    save: {
      dex: "+5",
      wis: "+5",
    },
    senses: ["darkvision 120 ft."],
    passive: 11,
    conditionImmune: ["petrified"],
    languages: ["Primordial (Terran)"],
    cr: "11",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The dao casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 16}):",
        ],
        will: [
          "{@spell Detect Evil and Good|XPHB}",
          "{@spell Detect Magic|XPHB}",
          "{@spell Stone Shape|XPHB}",
        ],
        daily: {
          "1e": [
            "{@spell Gaseous Form|XPHB}",
            "{@spell Invisibility|XPHB}",
            "{@spell Move Earth|XPHB}",
            "{@spell Passwall|XPHB}",
            "{@spell Plane Shift|XPHB}",
            "{@spell Tongues|XPHB}",
            "{@spell Wall of Stone|XPHB}",
          ],
        },
        ability: "cha",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Earth Glide",
        entries: [
          "The dao can burrow through nonmagical, unworked earth and stone. While doing so, the dao doesn't disturb the material it moves through.",
        ],
      },
      {
        name: "Elemental Restoration",
        entries: [
          "If the dao dies outside the Elemental Plane of Earth, its body dissolves into dirt, and it gains a new body in {@dice 1d4} days, reviving with all its {@variantrule Hit Points|XPHB} somewhere on the Plane of Earth.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The dao has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Wishes",
        entries: [
          "The dao has a 30 percent chance of knowing the {@spell Wish|XPHB} spell. If the dao knows it, the dao can cast it only on behalf of a non-genie creature who communicates a wish in a way the dao can understand. If the dao casts the spell for the creature, the dao suffers none of the spell's stress. Once the dao has cast it three times, the dao can't do so again for 365 days.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The dao makes three Earthen Maul attacks or two Earth Burst attacks.",
        ],
      },
      {
        name: "Earthen Maul",
        entries: [
          "{@atkr m} {@hit 10}, reach 5 ft. {@h}20 ({@damage 4d6 + 6}) Bludgeoning damage. If the target is a Large or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
      {
        name: "Earth Burst",
        entries: [
          "{@atkr r} {@hit 10}, range 120 ft. {@h}15 ({@damage 2d8 + 6}) Bludgeoning damage. {@hom}Earth explodes from the target's space, creating the following effect. {@actSave dex} {@dc 16}, each creature in a 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from and including the target. {@actSaveFail} 10 ({@damage 3d6}) Thunder damage.",
        ],
      },
    ],
    environment: ["planar, earth", "underdark"],
    treasure: ["implements"],
    soundClip: {
      type: "internal",
      path: "bestiary/dao.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["P", "T"],
    damageTags: ["B", "T"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "MLW", "RA"],
    conditionInflict: ["prone"],
    conditionInflictSpell: ["invisible"],
    savingThrowForced: ["dexterity"],
    savingThrowForcedSpell: ["dexterity"],
  },
  {
    name: "Death Knight Aspirant",
    source: "XMM",
    page: 93,
    size: ["S", "M"],
    type: "undead",
    alignment: ["C", "E"],
    ac: [20],
    hp: {
      average: 178,
      formula: "21d8 + 84",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 20,
    dex: 10,
    con: 18,
    int: 10,
    wis: 12,
    cha: 16,
    save: {
      dex: "+4",
      wis: "+5",
    },
    senses: ["darkvision 120 ft."],
    passive: 11,
    immune: ["necrotic", "poison"],
    conditionImmune: ["exhaustion", "frightened", "poisoned"],
    languages: ["Abyssal", "Common"],
    cr: "11",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The aspirant casts one of the following spells, using Charisma as the spellcasting ability (spell save {@dc 15}):",
        ],
        will: ["{@spell Phantom Steed|XPHB}"],
        daily: {
          "1e": [
            "{@spell Destructive Wave|XPHB} (Necrotic)",
            "{@spell Dispel Magic|XPHB}",
          ],
        },
        ability: "cha",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Magic Resistance",
        entries: [
          "The aspirant has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Marshal Undead",
        entries: [
          "Undead creatures of the aspirant's choice (excluding itself) in a 60-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from it have {@variantrule Advantage|XPHB} on attack rolls and saving throws. It can't use this trait if it has the {@condition Incapacitated|XPHB} condition.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The aspirant makes three Dread Blade attacks."],
      },
      {
        name: "Dread Blade",
        entries: [
          "{@atkr m} {@hit 9}, reach 5 ft. {@h}14 ({@damage 2d8 + 5}) Slashing damage plus 10 ({@damage 3d6}) Necrotic damage.",
        ],
      },
      {
        name: "Hellfire Orb {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 15}, each creature in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point the aspirant can see within 120 feet of itself. {@actSaveFail} 21 ({@damage 6d6}) Fire damage plus 21 ({@damage 6d6}) Necrotic damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    reaction: [
      {
        name: "Parry",
        entries: [
          "{@actTrigger} The aspirant is hit by a melee attack roll while holding a weapon. {@actResponse} The aspirant adds 4 to its AC against that attack, possibly causing it to miss.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["armaments"],
    traitTags: ["Magic Resistance"],
    senseTags: ["SD"],
    actionTags: ["Multiattack", "Parry"],
    languageTags: ["AB", "C"],
    damageTags: ["F", "N", "S"],
    damageTagsSpell: ["N", "R", "T"],
    spellcastingTags: ["O"],
    miscTags: ["AOE", "MA"],
    conditionInflict: ["incapacitated"],
    conditionInflictSpell: ["prone"],
    savingThrowForced: ["dexterity"],
    savingThrowForcedSpell: ["constitution"],
  },
  {
    name: "Djinni",
    group: ["Genies"],
    source: "XMM",
    page: 99,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: {
      type: "elemental",
      tags: ["genie"],
    },
    alignment: ["C", "G"],
    ac: [17],
    hp: {
      average: 218,
      formula: "19d10 + 114",
    },
    speed: {
      walk: 30,
      fly: {
        number: 90,
        condition: "(hover)",
      },
      canHover: true,
    },
    str: 21,
    dex: 15,
    con: 22,
    int: 15,
    wis: 16,
    cha: 20,
    save: {
      dex: "+6",
      wis: "+7",
    },
    senses: ["darkvision 120 ft."],
    passive: 13,
    immune: ["lightning", "thunder"],
    languages: ["Primordial (Auran)"],
    cr: "11",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The djinni casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 17}):",
        ],
        will: [
          "{@spell Detect Evil and Good|XPHB}",
          "{@spell Detect Magic|XPHB}",
        ],
        daily: {
          "2e": [
            "{@spell Create Food and Water|XPHB} (can create wine instead of water)",
            "{@spell Tongues|XPHB}",
            "{@spell Wind Walk|XPHB}",
          ],
          "1e": [
            "{@spell Creation|XPHB}",
            "{@spell Gaseous Form|XPHB}",
            "{@spell Invisibility|XPHB}",
            "{@spell Major Image|XPHB}",
            "{@spell Plane Shift|XPHB}",
          ],
        },
        ability: "cha",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Elemental Restoration",
        entries: [
          "If the djinni dies outside the Elemental Plane of Air, its body dissolves into mist, and it gains a new body in {@dice 1d4} days, reviving with all its {@variantrule Hit Points|XPHB} somewhere on the Plane of Air.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The djinni has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Wishes",
        entries: [
          "The djinni has a 30 percent chance of knowing the {@spell Wish|XPHB} spell. If the djinni knows it, the djinni can cast it only on behalf of a non-genie creature who communicates a wish in a way the djinni can understand. If the djinni casts the spell for the creature, the djinni suffers none of the spell's stress. Once the djinni has cast it three times, the djinni can't do so again for 365 days.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The djinni makes three attacks, using Storm Blade or Storm Bolt in any combination.",
        ],
      },
      {
        name: "Storm Blade",
        entries: [
          "{@atkr m} {@hit 9}, reach 5 feet. {@h}12 ({@damage 2d6 + 5}) Slashing damage plus 7 ({@damage 2d6}) Lightning damage.",
        ],
      },
      {
        name: "Storm Bolt",
        entries: [
          "{@atkr r} {@hit 9}, range 120 feet. {@h}13 ({@damage 3d8}) Thunder damage. If the target is a Large or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
      {
        name: "Create Whirlwind",
        entries: [
          "The djinni conjures a whirlwind at a point it can see within 120 feet. The whirlwind fills a 20-foot-radius, 60-foot-high {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} centered on that point. The whirlwind lasts until the djinni's {@status Concentration|XPHB} on it ends. The djinni can move the whirlwind up to 20 feet at the start of each of its turns.",
          "Whenever the whirlwind enters a creature's space or a creature enters the whirlwind, that creature is subjected to the following effect. {@actSave str} {@dc 17} (a creature makes this save only once per turn, and the djinni is unaffected). {@actSaveFail} While in the whirlwind, the target has the {@condition Restrained|XPHB} condition and moves with the whirlwind. At the start of each of its turns, the {@condition Restrained|XPHB} target takes 21 ({@damage 6d6}) Thunder damage. At the end of each of its turns, the target repeats the save, ending the effect on itself on a success.",
        ],
      },
    ],
    environment: ["coastal", "planar, air"],
    treasure: ["arcana"],
    soundClip: {
      type: "internal",
      path: "bestiary/djinni.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["AU", "P"],
    damageTags: ["L", "S", "T"],
    spellcastingTags: ["O"],
    miscTags: ["AOE", "MA", "RA"],
    conditionInflict: ["prone", "restrained"],
    conditionInflictSpell: ["invisible", "stunned"],
    savingThrowForced: ["strength"],
  },
  {
    name: "Efreeti",
    group: ["Genies"],
    source: "XMM",
    page: 109,
    size: ["L"],
    type: {
      type: "elemental",
      tags: ["genie"],
    },
    alignment: ["N"],
    ac: [17],
    hp: {
      average: 212,
      formula: "17d10 + 119",
    },
    speed: {
      walk: 40,
      fly: {
        number: 60,
        condition: "(hover)",
      },
      canHover: true,
    },
    str: 22,
    dex: 12,
    con: 24,
    int: 16,
    wis: 15,
    cha: 19,
    save: {
      wis: "+6",
      cha: "+8",
    },
    senses: ["darkvision 120 ft."],
    passive: 12,
    immune: ["fire"],
    languages: ["Primordial (Ignan)"],
    cr: "11",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The efreeti casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 16}):",
        ],
        will: ["{@spell Detect Magic|XPHB}", "{@spell Elementalism|XPHB}"],
        daily: {
          "1e": [
            "{@spell Gaseous Form|XPHB}",
            "{@spell Invisibility|XPHB}",
            "{@spell Major Image|XPHB}",
            "{@spell Plane Shift|XPHB}",
            "{@spell Tongues|XPHB}",
            "{@spell Wall of Fire|XPHB} (level 7 version)",
          ],
        },
        ability: "cha",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Elemental Restoration",
        entries: [
          "If the efreeti dies outside the Elemental Plane of Fire, its body dissolves into ash, and it gains a new body in {@dice 1d4} days, reviving with all its {@variantrule Hit Points|XPHB} somewhere on the Plane of Fire.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The efreeti has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Wishes",
        entries: [
          "The efreeti has a 30 percent chance of knowing the {@spell Wish|XPHB} spell. If the efreeti knows it, the efreeti can cast it only on behalf of a non-genie creature who communicates a wish in a way the efreeti can understand. If the efreeti casts the spell for the creature, the efreeti suffers none of the spell's stress. Once the efreeti has cast it three times, the efreeti can't do so again for 365 days.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The efreeti makes three attacks, using Heated Blade or Hurl Flame in any combination.",
        ],
      },
      {
        name: "Heated Blade",
        entries: [
          "{@atkr m} {@hit 10}, reach 5 ft. {@h}13 ({@damage 2d6 + 6}) Slashing damage plus 13 ({@damage 2d12}) Fire damage.",
        ],
      },
      {
        name: "Hurl Flame",
        entries: [
          "{@atkr r} {@hit 8}, range 120 ft. {@h}24 ({@damage 7d6}) Fire damage.",
        ],
      },
    ],
    environment: ["desert", "planar, fire"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/efreeti.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["IG", "P"],
    damageTags: ["F", "S"],
    damageTagsSpell: ["F"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    conditionInflictSpell: ["invisible"],
    savingThrowForcedSpell: ["dexterity"],
  },
  {
    name: "Horned Devil",
    group: ["Devils"],
    source: "XMM",
    page: 174,
    size: ["L"],
    type: {
      type: "fiend",
      tags: ["devil"],
    },
    alignment: ["L", "E"],
    ac: [18],
    hp: {
      average: 199,
      formula: "19d10 + 95",
    },
    speed: {
      walk: 30,
      fly: 60,
    },
    initiative: {
      proficiency: 1,
    },
    str: 22,
    dex: 17,
    con: 21,
    int: 12,
    wis: 16,
    cha: 18,
    save: {
      str: "+10",
      dex: "+7",
      wis: "+7",
      cha: "+8",
    },
    senses: [
      "darkvision 150 ft. (unimpeded by magical {@variantrule Darkness|XPHB})",
    ],
    passive: 13,
    immune: ["fire", "poison"],
    conditionImmune: ["poisoned"],
    languages: ["Infernal; telepathy 120 ft."],
    cr: "11",
    trait: [
      {
        name: "Diabolical Restoration",
        entries: [
          "If the devil dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its {@variantrule Hit Points|XPHB} somewhere in the Nine Hells.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The devil has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The devil makes three attacks, using Searing Fork or Hurl Flame in any combination. It can replace one attack with a use of Infernal Tail.",
        ],
      },
      {
        name: "Searing Fork",
        entries: [
          "{@atkr m} {@hit 10}, reach 10 ft. {@h}15 ({@damage 2d8 + 6}) Piercing damage plus 9 ({@damage 2d8}) Fire damage.",
        ],
      },
      {
        name: "Hurl Flame",
        entries: [
          "{@atkr r} {@hit 8}, range 150 ft. {@h}26 ({@damage 5d8 + 4}) Fire damage. If the target is a flammable object that isn't being worn or carried, it starts {@hazard burning|XPHB}.",
        ],
      },
      {
        name: "Infernal Tail",
        entries: [
          "{@actSave dex} {@dc 17}, one creature the devil can see within 10 feet. {@actSaveFail} 10 ({@damage 1d8 + 6}) Necrotic damage, and the target receives an infernal wound if it doesn't have one. While wounded, the target loses 10 ({@dice 3d6}) {@variantrule Hit Points|XPHB} at the start of each of its turns. The wound closes after 1 minute, after a spell restores {@variantrule Hit Points|XPHB} to the target, or after the target or a creature within 5 feet of it takes an action to stanch the wound, doing so by succeeding on a {@dc 17} Wisdom ({@skill Medicine|XPHB}) check.",
        ],
      },
    ],
    environment: ["planar, nine hells"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/horned-devil.mp3",
    },
    traitTags: ["Devil's Sight", "Magic Resistance"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["I", "TP"],
    damageTags: ["F", "N", "P"],
    miscTags: ["MA", "RA", "RCH"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Marid",
    group: ["Genies"],
    source: "XMM",
    page: 203,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: {
      type: "elemental",
      tags: ["genie"],
    },
    alignment: ["C", "N"],
    ac: [17],
    hp: {
      average: 229,
      formula: "17d10 + 136",
    },
    speed: {
      walk: 30,
      fly: 60,
      swim: 90,
    },
    initiative: {
      proficiency: 1,
    },
    str: 22,
    dex: 12,
    con: 26,
    int: 18,
    wis: 17,
    cha: 18,
    save: {
      dex: "+5",
      cha: "+8",
    },
    senses: ["blindsight 30 ft.", "darkvision 120 ft."],
    passive: 13,
    resist: ["acid", "cold", "lightning"],
    languages: ["Primordial (Aquan)"],
    cr: "11",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The marid casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 16}):",
        ],
        will: [
          "{@spell Create or Destroy Water|XPHB}",
          "{@spell Detect Evil and Good|XPHB}",
          "{@spell Detect Magic|XPHB}",
          "{@spell Purify Food and Drink|XPHB}",
        ],
        daily: {
          "1e": [
            "{@spell Control Water|XPHB}",
            "{@spell Gaseous Form|XPHB}",
            "{@spell Invisibility|XPHB}",
            "{@spell Plane Shift|XPHB}",
            "{@spell Tongues|XPHB}",
          ],
        },
        ability: "cha",
        displayAs: "action",
      },
      {
        name: "Misty Veil {@recharge 5}",
        type: "spellcasting",
        headerEntries: [
          "The marid casts {@spell Fog Cloud|XPHB}, using the same spellcasting ability as Spellcasting.",
        ],
        recharge: {
          "5": ["{@spell Fog Cloud|XPHB}"],
        },
        ability: "cha",
        displayAs: "bonus",
        hidden: ["recharge"],
      },
    ],
    trait: [
      {
        name: "Amphibious",
        entries: ["The marid can breathe air and water."],
      },
      {
        name: "Elemental Restoration",
        entries: [
          "If the marid dies outside the Elemental Plane of Water, its body dissolves into brine, and it gains a new body in {@dice 1d4} days, reviving with all its {@variantrule Hit Points|XPHB} somewhere on the Plane of Water.",
        ],
      },
      {
        name: "Wishes",
        entries: [
          "The marid has a 30 percent chance of knowing the {@spell Wish|XPHB} spell. If the marid knows it, the marid can cast it only on behalf of a non-genie creature who communicates a wish in a way the marid can understand. If the marid casts the spell for the creature, the marid suffers none of the spell's stress. Once the marid has cast it three times, the marid can't do so again for 365 days.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The marid makes three Aquatic Lash attacks."],
      },
      {
        name: "Aquatic Lash",
        entries: [
          "{@atkr m} {@hit 10}, reach 15 ft. {@h}15 ({@damage 2d8 + 6}) Slashing damage plus 9 ({@damage 2d8}) Cold damage.",
        ],
      },
      {
        name: "Water Jet",
        entries: [
          "{@actSave dex} {@dc 18}, each creature in a 60-foot-long, 10-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 31 ({@damage 9d6}) Cold damage. If the target is a Huge or smaller creature, it is pushed up to 20 feet straight away from the marid and has the {@condition Prone|XPHB} condition. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    environment: ["coastal", "planar, water", "underwater"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/marid.mp3",
    },
    traitTags: ["Amphibious"],
    senseTags: ["B", "SD"],
    actionTags: ["Multiattack"],
    languageTags: ["AQ", "P"],
    damageTags: ["C", "S"],
    damageTagsSpell: ["B"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["prone"],
    conditionInflictSpell: ["invisible"],
    savingThrowForced: ["dexterity"],
    savingThrowForcedSpell: ["strength"],
  },
  {
    name: "Mind Flayer Arcanist",
    source: "XMM",
    page: 214,
    size: ["M"],
    type: "aberration",
    alignment: ["L", "E"],
    ac: [16],
    hp: {
      average: 143,
      formula: "26d8 + 26",
    },
    speed: {
      walk: 30,
      fly: {
        number: 30,
        condition: "(hover)",
      },
      canHover: true,
    },
    initiative: {
      proficiency: 1,
    },
    str: 11,
    dex: 14,
    con: 13,
    int: 20,
    wis: 17,
    cha: 17,
    save: {
      dex: "+6",
      int: "+9",
      wis: "+7",
      cha: "+7",
    },
    skill: {
      arcana: "+13",
      insight: "+7",
      perception: "+7",
      stealth: "+6",
    },
    senses: ["darkvision 120 ft."],
    passive: 17,
    immune: ["psychic"],
    conditionImmune: ["charmed", "frightened"],
    languages: ["Deep Speech", "Undercommon; telepathy 120 ft."],
    cr: "11",
    gear: ["breastplate|xphb"],
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The mind flayer casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save {@dc 17}):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Detect Thoughts|XPHB}",
          "{@spell Disguise Self|XPHB}",
          "{@spell Mage Hand|XPHB} (the hand is Invisible)",
        ],
        daily: {
          "1e": [
            "{@spell Clairvoyance|XPHB}",
            "{@spell Dimension Door|XPHB}",
            "{@spell Fireball|XPHB} (level 5 version)",
            "{@spell Lightning Bolt|XPHB} (level 5 version)",
            "{@spell Plane Shift|XPHB} (self only)",
            "{@spell Sending|XPHB}",
          ],
        },
        ability: "int",
        displayAs: "action",
      },
      {
        name: "Shield (2/Day)",
        type: "spellcasting",
        headerEntries: [
          "The mind flayer casts {@spell Shield|XPHB} in response to that spell's trigger, using the same spellcasting ability as Spellcasting.",
        ],
        daily: {
          "2": ["{@spell Shield|XPHB}"],
        },
        ability: "int",
        displayAs: "reaction",
        hidden: ["daily"],
      },
    ],
    trait: [
      {
        name: "Magic Resistance",
        entries: [
          "The mind flayer has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The mind flayer makes three Arcane Tentacles attacks."],
      },
      {
        name: "Arcane Tentacles",
        entries: [
          "{@atkr m,r} {@hit 9}, reach 5 ft. or range 120 ft. {@h}27 ({@damage 4d10 + 5}) Psychic damage, and the mind flayer can teleport the target up to 30 feet to an unoccupied space the mind flayer can see on a surface or liquid large enough to support the target. If this damage reduces the target to 0 {@variantrule Hit Points|XPHB}, the mind flayer kills it and magically devours its brain.",
        ],
      },
      {
        name: "Mind Burst {@recharge 5}",
        entries: [
          "{@actSave int} {@dc 17}, each creature in a 40-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the mind flayer. {@actSaveFail} 41 ({@damage 8d8 + 5}) Psychic damage, and the target has the {@condition Stunned|XPHB} condition until the end of the mind flayer's next turn. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    environment: ["underdark"],
    treasure: ["arcana"],
    soundClip: {
      type: "internal",
      path: "bestiary/mind-flayer-arcanist.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["DS", "TP", "U"],
    damageTags: ["Y"],
    damageTagsSpell: ["F", "L", "O"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    conditionInflict: ["stunned"],
    savingThrowForced: ["intelligence"],
    savingThrowForcedSpell: ["dexterity", "wisdom"],
  },
  {
    name: "Remorhaz",
    source: "XMM",
    page: 258,
    size: ["H"],
    type: "monstrosity",
    alignment: ["U"],
    ac: [17],
    hp: {
      average: 195,
      formula: "17d12 + 85",
    },
    speed: {
      walk: 40,
      burrow: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 24,
    dex: 13,
    con: 21,
    int: 4,
    wis: 10,
    cha: 5,
    senses: ["darkvision 60 ft.", "tremorsense 60 ft."],
    passive: 10,
    immune: ["cold", "fire"],
    cr: "11",
    trait: [
      {
        name: "Heat Aura",
        entries: [
          "At the end of each of the remorhaz's turns, each creature in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the remorhaz takes 16 ({@damage 3d10}) Fire damage.",
        ],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 11}, reach 10 ft. {@h}18 ({@damage 2d10 + 7}) Piercing damage plus 14 ({@damage 4d6}) Fire damage. If the target is a Large or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 17}), and it has the {@condition Restrained|XPHB} condition until the grapple ends.",
        ],
      },
    ],
    bonus: [
      {
        name: "Swallow",
        entries: [
          "{@actSave str} {@dc 19}, one Large or smaller creature {@condition Grappled|XPHB} by the remorhaz (it can have up to two creatures swallowed at a time). {@actSaveFail} The target is swallowed by the remorhaz, and the {@condition Grappled|XPHB} condition ends. A swallowed creature has the {@condition Blinded|XPHB} and {@condition Restrained|XPHB} conditions, it has {@variantrule Cover|XPHB|Total Cover} against attacks and other effects outside the remorhaz, and it takes 10 ({@damage 3d6}) Acid damage plus 10 ({@damage 3d6}) Fire damage at the start of each of the remorhaz's turns.",
          "If the remorhaz takes 30 damage or more on a single turn from a creature inside it, the remorhaz must succeed on a {@dc 15} Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 5 feet of the remorhaz and has the {@condition Prone|XPHB} condition. If the remorhaz dies, any swallowed creature no longer has the {@condition Restrained|XPHB} condition and can escape from the corpse by using 15 feet of movement, exiting {@condition Prone|XPHB}.",
        ],
      },
    ],
    environment: ["arctic"],
    soundClip: {
      type: "internal",
      path: "bestiary/remorhaz.mp3",
    },
    senseTags: ["D", "T"],
    actionTags: ["Swallow"],
    damageTags: ["A", "F", "P"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["grappled", "prone", "restrained"],
    savingThrowForced: ["constitution", "strength"],
  },
  {
    name: "Roc",
    source: "XMM",
    page: 261,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["G"],
    type: "monstrosity",
    alignment: ["U"],
    ac: [15],
    hp: {
      average: 248,
      formula: "16d20 + 80",
    },
    speed: {
      walk: 20,
      fly: 120,
    },
    initiative: {
      proficiency: 2,
    },
    str: 28,
    dex: 10,
    con: 20,
    int: 3,
    wis: 10,
    cha: 9,
    save: {
      dex: "+4",
      wis: "+4",
    },
    skill: {
      perception: "+8",
    },
    passive: 18,
    cr: "11",
    action: [
      {
        name: "Multiattack",
        entries: [
          "The roc makes two Beak attacks. It can replace one attack with a Talons attack.",
        ],
      },
      {
        name: "Beak",
        entries: [
          "{@atkr m} {@hit 13}, reach 10 ft. {@h}28 ({@damage 3d12 + 9}) Piercing damage.",
        ],
      },
      {
        name: "Talons",
        entries: [
          "{@atkr m} {@hit 13}, reach 5 ft. {@h}23 ({@damage 4d6 + 9}) Slashing damage. If the target is a Huge or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 19}) from both talons, and it has the {@condition Restrained|XPHB} condition until the grapple ends.",
        ],
      },
    ],
    bonus: [
      {
        name: "Swoop {@recharge 5}",
        entries: [
          "If the roc has a creature {@condition Grappled|XPHB}, the roc flies up to half its {@variantrule Fly Speed|XPHB} without provoking {@action Opportunity Attack|XPHB|Opportunity Attacks} and drops that creature.",
        ],
      },
    ],
    environment: ["arctic", "coastal", "desert", "hill", "mountain"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/roc.mp3",
    },
    actionTags: ["Multiattack"],
    damageTags: ["P", "S"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["grappled", "restrained"],
  },
  {
    name: "Sphinx of Lore",
    source: "XMM",
    page: 293,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "celestial",
    alignment: ["L", "N"],
    ac: [17],
    hp: {
      average: 170,
      formula: "20d10 + 60",
    },
    speed: {
      walk: 40,
      fly: 60,
    },
    initiative: {
      proficiency: 2,
    },
    str: 18,
    dex: 15,
    con: 16,
    int: 18,
    wis: 18,
    cha: 18,
    skill: {
      arcana: "+12",
      history: "+12",
      perception: "+8",
      religion: "+12",
    },
    senses: ["truesight 120 ft."],
    passive: 18,
    resist: ["necrotic", "radiant"],
    immune: ["psychic"],
    conditionImmune: ["charmed", "frightened"],
    languages: ["Celestial", "Common"],
    cr: {
      cr: "11",
      xpLair: 8400,
    },
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The sphinx casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save {@dc 16}):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Identify|XPHB}",
          "{@spell Mage Hand|XPHB}",
          "{@spell Minor Illusion|XPHB}",
          "{@spell Prestidigitation|XPHB}",
        ],
        daily: {
          "1e": [
            "{@spell Dispel Magic|XPHB}",
            "{@spell Legend Lore|XPHB}",
            "{@spell Locate Object|XPHB}",
            "{@spell Plane Shift|XPHB}",
            "{@spell Remove Curse|XPHB}",
            "{@spell Tongues|XPHB}",
          ],
        },
        ability: "int",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Inscrutable",
        entries: [
          "No magic can observe the sphinx remotely or detect its thoughts without its permission. Wisdom ({@skill Insight|XPHB}) checks made to ascertain its intentions or sincerity are made with {@variantrule Disadvantage|XPHB}.",
        ],
      },
      {
        name: "Legendary Resistance (3/Day, or 4/Day in Lair)",
        entries: [
          "If the sphinx fails a saving throw, it can choose to succeed instead.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The sphinx makes three Claw attacks."],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 8}, reach 5 ft. {@h}14 ({@damage 3d6 + 4}) Slashing damage.",
        ],
      },
      {
        name: "Mind-Rending Roar {@recharge 5}",
        entries: [
          "{@actSave wis} {@dc 16}, each enemy in a 300-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the sphinx. {@actSaveFail} 35 ({@damage 10d6}) Psychic damage, and the target has the {@condition Incapacitated|XPHB} condition until the start of the sphinx's next turn.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Arcane Prowl",
        entries: [
          "The sphinx can teleport up to 30 feet to an unoccupied space it can see, and it makes one Claw attack.",
        ],
      },
      {
        name: "Weight of Years",
        entries: [
          "{@actSave con} {@dc 16}, one creature the sphinx can see within 120 feet. {@actSaveFail} The target gains 1 {@condition Exhaustion|XPHB} level. While the target has any {@condition Exhaustion|XPHB} levels, it appears {@dice 3d10} years older. {@actSaveSuccessOrFail} The sphinx can't take this action again until the start of its next turn.",
        ],
      },
    ],
    legendaryGroup: {
      name: "Sphinx",
      source: "XMM",
    },
    environment: ["desert", "planar, upper"],
    treasure: ["arcana"],
    traitTags: ["Legendary Resistances"],
    senseTags: ["U"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "CE"],
    damageTags: ["S", "Y"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    conditionInflict: ["incapacitated"],
    savingThrowForced: ["constitution", "wisdom"],
  },
];
