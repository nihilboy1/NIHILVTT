// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_4 = [
  {
    name: "Aarakocra Aeromancer",
    source: "XMM",
    page: 10,
    size: ["M"],
    type: "elemental",
    alignment: ["N"],
    ac: [16],
    hp: {
      average: 66,
      formula: "12d8 + 12",
    },
    speed: {
      walk: 20,
      fly: 50,
    },
    str: 10,
    dex: 16,
    con: 12,
    int: 13,
    wis: 17,
    cha: 12,
    save: {
      dex: "+5",
      wis: "+5",
    },
    skill: {
      arcana: "+3",
      nature: "+5",
      perception: "+7",
    },
    passive: 17,
    languages: ["Aarakocra", "Primordial (Auran)"],
    cr: "4",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The aarakocra casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save {@dc 13}):",
        ],
        will: [
          "{@spell Elementalism|XPHB}",
          "{@spell Gust of Wind|XPHB}",
          "{@spell Mage Hand|XPHB}",
          "{@spell Message|XPHB}",
        ],
        daily: {
          "1": ["{@spell Lightning Bolt|XPHB}"],
        },
        ability: "wis",
        displayAs: "action",
      },
      {
        name: "Feather Fall (1/Day)",
        type: "spellcasting",
        headerEntries: [
          "The aarakocra casts {@spell Feather Fall|XPHB} in response to that spell's trigger, using the same spellcasting ability as Spellcasting.",
        ],
        daily: {
          "1": ["{@spell Feather Fall|XPHB}"],
        },
        ability: "wis",
        displayAs: "reaction",
        hidden: ["daily"],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The aarakocra makes two Wind Staff attacks, and it can use Spellcasting to cast {@spell Gust of Wind|XPHB}.",
        ],
      },
      {
        name: "Wind Staff",
        entries: [
          "{@atkr m,r} {@hit 5}, reach 5 ft. or range 120 ft. {@h}7 ({@damage 1d8 + 3}) Bludgeoning damage plus 11 ({@damage 2d10}) Lightning damage.",
        ],
      },
    ],
    environment: ["mountain", "planar, air"],
    treasure: ["implements", "individual"],
    actionTags: ["Multiattack"],
    languageTags: ["AU", "OTH", "P"],
    damageTags: ["B", "L"],
    damageTagsSpell: ["L"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    savingThrowForcedSpell: ["dexterity", "strength"],
  },
  {
    name: "Archelon",
    group: ["Dinosaurs"],
    source: "XMM",
    page: 349,
    size: ["H"],
    type: {
      type: "beast",
      tags: ["dinosaur"],
    },
    alignment: ["U"],
    ac: [17],
    hp: {
      average: 90,
      formula: "12d12 + 12",
    },
    speed: {
      walk: 20,
      swim: 80,
    },
    str: 18,
    dex: 16,
    con: 13,
    int: 4,
    wis: 14,
    cha: 6,
    skill: {
      stealth: "+5",
    },
    passive: 12,
    cr: "4",
    trait: [
      {
        name: "Amphibious",
        entries: ["The archelon can breathe air and water."],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The archelon makes two Bite attacks."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}14 ({@damage 3d6 + 4}) Piercing damage.",
        ],
      },
    ],
    environment: ["underwater"],
    traitTags: ["Amphibious"],
    actionTags: ["Multiattack"],
    damageTags: ["P"],
    miscTags: ["MA"],
  },
  {
    name: "Banshee",
    source: "XMM",
    page: 29,
    size: ["M"],
    type: "undead",
    alignment: ["C", "E"],
    ac: [12],
    hp: {
      average: 54,
      formula: "12d8",
    },
    speed: {
      walk: 5,
      fly: {
        number: 40,
        condition: "(hover)",
      },
      canHover: true,
    },
    str: 1,
    dex: 14,
    con: 10,
    int: 12,
    wis: 11,
    cha: 17,
    save: {
      wis: "+2",
    },
    senses: ["darkvision 60 ft."],
    passive: 10,
    resist: [
      "acid",
      "bludgeoning",
      "fire",
      "lightning",
      "piercing",
      "slashing",
      "thunder",
    ],
    immune: ["cold", "necrotic", "poison"],
    conditionImmune: [
      "charmed",
      "exhaustion",
      "frightened",
      "grappled",
      "paralyzed",
      "petrified",
      "poisoned",
      "prone",
      "restrained",
    ],
    languages: ["Common", "Elvish"],
    cr: "4",
    trait: [
      {
        name: "Detect Life",
        entries: [
          "The banshee magically senses the direction of creatures up to 1 mile away that aren't Constructs or Undead.",
        ],
      },
      {
        name: "Incorporeal Movement",
        entries: [
          "The banshee can move through other creatures and objects as if they were {@variantrule Difficult Terrain|XPHB}. It takes 5 ({@damage 1d10}) Force damage if it ends its turn inside an object.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The banshee makes two Corrupting Touch attacks and uses Horrify.",
        ],
      },
      {
        name: "Corrupting Touch",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}7 ({@damage 1d8 + 3}) Necrotic damage.",
        ],
      },
      {
        name: "Horrify",
        entries: [
          "{@actSave wis} {@dc 13}, one creature the banshee can see within 60 feet that can see the banshee. {@actSaveFail} The target has the {@condition Frightened|XPHB} condition until the start of the banshee's next turn. {@actSaveSuccess} The target is immune to this banshee's Horrify for 24 hours.",
        ],
      },
      {
        name: "Deathly Wail (1/Day)",
        entries: [
          "The banshee releases a mournful wail if it isn't in sunlight. {@actSave con} {@dc 13}, each creature within 30 feet that can hear the wail and isn't a Construct or an Undead. {@actSaveFail} If the target has 25 {@variantrule Hit Points|XPHB} or fewer, it drops to 0 {@variantrule Hit Points|XPHB}. Otherwise, the target takes 10 ({@damage 3d6}) Psychic damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/banshee.mp3",
    },
    traitTags: ["Incorporeal Movement"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "E"],
    damageTags: ["N", "O", "Y"],
    miscTags: ["AOE", "MA"],
    conditionInflict: ["frightened"],
    savingThrowForced: ["constitution", "wisdom"],
  },
  {
    name: "Black Pudding",
    source: "XMM",
    page: 42,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "ooze",
    alignment: ["U"],
    ac: [7],
    hp: {
      average: 68,
      formula: "8d10 + 24",
    },
    speed: {
      walk: 20,
      climb: 20,
    },
    str: 16,
    dex: 5,
    con: 16,
    int: 1,
    wis: 6,
    cha: 1,
    senses: ["blindsight 60 ft."],
    passive: 8,
    immune: ["acid", "cold", "lightning", "slashing"],
    conditionImmune: [
      "charmed",
      "deafened",
      "exhaustion",
      "frightened",
      "grappled",
      "prone",
      "restrained",
    ],
    cr: "4",
    trait: [
      {
        name: "Amorphous",
        entries: [
          "The pudding can move through a space as narrow as 1 inch without expending extra movement to do so.",
        ],
      },
      {
        name: "Corrosive Form",
        entries: [
          "A creature that hits the pudding with a melee attack roll takes 4 ({@damage 1d8}) Acid damage. Nonmagical ammunition is destroyed immediately after hitting the pudding and dealing any damage. Any nonmagical weapon takes a cumulative -1 penalty to attack rolls immediately after dealing damage to the pudding and coming into contact with it. The weapon is destroyed if the penalty reaches -5. The penalty can be removed by casting the {@spell Mending|XPHB} spell on the weapon.",
          "In 1 minute, the pudding can eat through 2 feet of nonmagical wood or metal.",
        ],
      },
      {
        name: "Spider Climb",
        entries: [
          "The pudding can climb difficult surfaces, including along ceilings, without needing to make an ability check.",
        ],
      },
    ],
    action: [
      {
        name: "Dissolving Pseudopod",
        entries: [
          "{@atkr m} {@hit 5}, reach 10 ft. {@h}17 ({@damage 4d6 + 3}) Acid damage. Nonmagical armor worn by the target takes a -1 penalty to the AC it offers. The armor is destroyed if the penalty reduces its AC to 10. The penalty can be removed by casting the {@spell Mending|XPHB} spell on the armor.",
        ],
      },
    ],
    reaction: [
      {
        name: "Split",
        entries: [
          "{@actTrigger} While the pudding is Large or Medium and has 10+ {@variantrule Hit Points|XPHB}, it becomes {@variantrule Bloodied|XPHB} or is subjected to Lightning or Slashing damage. {@actResponse} The pudding splits into two new Black Puddings. Each new pudding is one size smaller than the original pudding and acts on its {@variantrule Initiative|XPHB}. The original pudding's {@variantrule Hit Points|XPHB} are divided evenly between the new puddings (round down).",
        ],
      },
    ],
    environment: ["underdark"],
    soundClip: {
      type: "internal",
      path: "bestiary/black-pudding.mp3",
    },
    traitTags: ["Amorphous", "Spider Climb"],
    senseTags: ["B"],
    damageTags: ["A"],
    miscTags: ["MA", "RCH"],
  },
  {
    name: "Bone Naga",
    source: "XMM",
    page: 53,
    size: ["L"],
    type: "undead",
    alignment: ["N", "E"],
    ac: [15],
    hp: {
      average: 65,
      formula: "10d10 + 10",
    },
    speed: {
      walk: 40,
    },
    str: 15,
    dex: 16,
    con: 12,
    int: 16,
    wis: 15,
    cha: 15,
    senses: ["darkvision 60 ft."],
    passive: 12,
    immune: ["poison"],
    conditionImmune: ["charmed", "exhaustion", "paralyzed", "poisoned"],
    languages: ["Common plus one other language"],
    cr: "4",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The naga casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save {@dc 13}):",
        ],
        will: ["{@spell Mage Hand|XPHB}", "{@spell Thaumaturgy|XPHB}"],
        daily: {
          "1e": [
            "{@spell Command|XPHB}",
            "{@spell Detect Thoughts|XPHB}",
            "{@spell Lightning Bolt|XPHB}",
          ],
        },
        ability: "int",
        displayAs: "action",
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The naga makes two Bite attacks. It can replace any attack with a use of Serpentine Gaze.",
        ],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 5}, reach 10 ft. {@h}10 ({@damage 2d6 + 3}) Piercing damage plus 7 ({@damage 2d6}) Necrotic damage.",
        ],
      },
      {
        name: "Serpentine Gaze",
        entries: [
          "{@actSave wis} {@dc 13}, one creature the naga can see within 60 feet. {@actSaveFail} 13 ({@damage 3d6 + 3}) Psychic damage, and the target has the {@condition Charmed|XPHB} condition until the start of the naga's next turn.",
        ],
      },
    ],
    environment: ["underdark"],
    treasure: ["relics"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["N", "P", "Y"],
    damageTagsSpell: ["L"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["charmed"],
    conditionInflictSpell: ["prone"],
    savingThrowForced: ["wisdom"],
    savingThrowForcedSpell: ["dexterity", "wisdom"],
  },
  {
    name: "Bullywug Bog Sage",
    source: "XMM",
    page: 64,
    otherSources: [
      {
        source: "UtHftLH",
      },
    ],
    size: ["M"],
    type: "fey",
    alignment: ["N"],
    ac: [16],
    hp: {
      average: 52,
      formula: "8d8 + 16",
    },
    speed: {
      walk: 30,
      swim: 30,
    },
    str: 8,
    dex: 16,
    con: 14,
    int: 10,
    wis: 16,
    cha: 12,
    save: {
      con: "+4",
      wis: "+5",
      cha: "+3",
    },
    skill: {
      nature: "+4",
      stealth: "+5",
    },
    passive: 13,
    languages: ["Bullywug", "Common"],
    cr: "4",
    gear: ["component pouch|xphb"],
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The bullywug casts one of the following spells, using Wisdom as the spellcasting ability (spell save {@dc 13}, {@hit 5} to hit with spell attacks):",
        ],
        will: [
          "{@spell Dancing Lights|XPHB}",
          "{@spell Druidcraft|XPHB}",
          "{@spell Ray of Sickness|XPHB}",
        ],
        daily: {
          "1e": [
            "{@spell Speak with Plants|XPHB}",
            "{@spell Vitriolic Sphere|XPHB}",
          ],
        },
        ability: "wis",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Amphibious",
        entries: ["The bullywug can breathe air and water."],
      },
      {
        name: "Speak with Frogs and Toads",
        entries: [
          "The bullywug can communicate simple concepts to frogs and toads when it speaks in Bullywug.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The bullywug makes two Bog Staff attacks. It can replace any attack with a use of Spellcasting to cast {@spell Ray of Sickness|XPHB}.",
        ],
      },
      {
        name: "Bog Staff",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}7 ({@damage 1d8 + 3}) Bludgeoning damage plus 10 ({@damage 3d6}) Poison damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Leap",
        entries: [
          "The bullywug can jump up to 30 feet by spending 10 feet of movement.",
        ],
      },
    ],
    environment: ["swamp"],
    treasure: ["implements", "individual"],
    traitTags: ["Amphibious"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "OTH"],
    damageTags: ["B", "I"],
    damageTagsSpell: ["A", "I"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    conditionInflictSpell: ["poisoned"],
    savingThrowForcedSpell: ["dexterity"],
  },
  {
    name: "Chuul",
    source: "XMM",
    page: 71,
    size: ["L"],
    type: "aberration",
    alignment: ["C", "E"],
    ac: [16],
    hp: {
      average: 76,
      formula: "9d10 + 27",
    },
    speed: {
      walk: 30,
      swim: 30,
    },
    str: 19,
    dex: 10,
    con: 16,
    int: 5,
    wis: 11,
    cha: 5,
    skill: {
      perception: "+4",
    },
    senses: ["darkvision 60 ft."],
    passive: 14,
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    languages: ["understands Deep Speech but can't speak"],
    cr: "4",
    trait: [
      {
        name: "Amphibious",
        entries: ["The chuul can breathe air and water."],
      },
      {
        name: "Sense Magic",
        entries: [
          "The chuul senses magic within 120 feet of itself. This trait otherwise works like the {@spell Detect Magic|XPHB} spell but isn't itself magical.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The chuul makes two Pincer attacks and uses Paralyzing Tentacles.",
        ],
      },
      {
        name: "Pincer",
        entries: [
          "{@atkr m} {@hit 6}, reach 10 ft. {@h}9 ({@damage 1d10 + 4}) Bludgeoning damage. If the target is a Large or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 14}) from one of two pincers.",
        ],
      },
      {
        name: "Paralyzing Tentacles",
        entries: [
          "{@actSave con} {@dc 13}, one creature {@condition Grappled|XPHB} by the chuul. {@actSaveFail} The target has the {@condition Poisoned|XPHB} condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. While {@condition Poisoned|XPHB}, the target has the {@condition Paralyzed|XPHB} condition.",
        ],
      },
    ],
    environment: ["coastal", "swamp", "underdark"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/chuul.mp3",
    },
    traitTags: ["Amphibious"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["CS", "DS"],
    damageTags: ["B"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["grappled", "paralyzed", "poisoned"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Couatl",
    source: "XMM",
    page: 82,
    size: ["M"],
    type: "celestial",
    alignment: ["L", "G"],
    ac: [19],
    hp: {
      average: 60,
      formula: "8d8 + 24",
    },
    speed: {
      walk: 30,
      fly: 90,
    },
    str: 16,
    dex: 20,
    con: 17,
    int: 18,
    wis: 20,
    cha: 18,
    save: {
      con: "+5",
      wis: "+7",
    },
    senses: ["truesight 120 ft."],
    passive: 15,
    resist: ["bludgeoning", "piercing", "slashing"],
    immune: ["psychic", "radiant"],
    languages: ["all; telepathy 120 ft."],
    cr: "4",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The couatl casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability (spell save {@dc 15}):",
        ],
        will: [
          "{@spell Detect Evil and Good|XPHB}",
          "{@spell Detect Magic|XPHB}",
          "{@spell Detect Thoughts|XPHB}",
          "{@spell Shapechange|XPHB} (Beast or Humanoid form only, no {@variantrule Temporary Hit Points|XPHB} gained from the spell, and no Concentration or {@variantrule Temporary Hit Points|XPHB} required to maintain the spell)",
        ],
        daily: {
          "1e": [
            "{@spell Create Food and Water|XPHB}",
            "{@spell Dream|XPHB}",
            "{@spell Greater Restoration|XPHB}",
            "{@spell Scrying|XPHB}",
            "{@spell Sleep|XPHB}",
          ],
        },
        ability: "wis",
        displayAs: "action",
      },
      {
        name: "Divine Aid (2/Day)",
        type: "spellcasting",
        headerEntries: [
          "The couatl casts {@spell Bless|XPHB}, {@spell Lesser Restoration|XPHB}, or {@spell Sanctuary|XPHB}, requiring no spell components and using the same spellcasting ability as Spellcasting.",
        ],
        daily: {
          "2": [
            "{@spell Bless|XPHB}",
            "{@spell Lesser Restoration|XPHB}",
            "{@spell Sanctuary|XPHB}",
          ],
        },
        ability: "wis",
        displayAs: "bonus",
        hidden: ["daily"],
      },
    ],
    trait: [
      {
        name: "Shielded Mind",
        entries: [
          "The couatl's thoughts can't be read by any means, and other creatures can communicate with it telepathically only if it allows them.",
        ],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}11 ({@damage 1d12 + 5}) Piercing damage, and the target has the {@condition Poisoned|XPHB} condition until the end of the couatl's next turn.",
        ],
      },
      {
        name: "Constrict",
        entries: [
          "{@actSave str} {@dc 15}, one Medium or smaller creature the couatl can see within 5 feet. {@actSaveFail} 8 ({@damage 1d6 + 5}) Bludgeoning damage. The target has the {@condition Grappled|XPHB} condition (escape {@dc 13}), and it has the {@condition Restrained|XPHB} condition until the grapple ends.",
        ],
      },
    ],
    environment: ["desert", "forest", "grassland", "urban"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/couatl.mp3",
    },
    senseTags: ["U"],
    languageTags: ["TP", "XX"],
    damageTags: ["B", "P"],
    damageTagsSpell: ["Y"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    conditionInflict: ["grappled", "poisoned", "restrained"],
    conditionInflictSpell: ["incapacitated", "unconscious"],
    savingThrowForced: ["strength"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Elephant",
    source: "XMM",
    page: 353,
    otherSources: [
      {
        source: "XPHB",
        page: 349,
      },
      {
        source: "HBTD",
      },
    ],
    size: ["H"],
    type: "beast",
    alignment: ["U"],
    ac: [12],
    hp: {
      average: 76,
      formula: "8d12 + 24",
    },
    speed: {
      walk: 40,
    },
    str: 22,
    dex: 9,
    con: 17,
    int: 3,
    wis: 11,
    cha: 6,
    passive: 10,
    cr: "4",
    action: [
      {
        name: "Multiattack",
        entries: ["The elephant makes two Gore attacks."],
      },
      {
        name: "Gore",
        entries: [
          "{@atkr m} {@hit 8}, reach 5 ft. {@h}15 ({@damage 2d8 + 6}) Piercing damage. If the target is a Huge or smaller creature and the elephant moved 20+ feet straight toward it immediately before the hit, the target has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    bonus: [
      {
        name: "Trample",
        entries: [
          "{@actSave dex} {@dc 16}, one creature within 5 feet that has the {@condition Prone|XPHB} condition. {@actSaveFail} 17 ({@damage 2d10 + 6}) Bludgeoning damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["grassland"],
    soundClip: {
      type: "internal",
      path: "bestiary/elephant.mp3",
    },
    actionTags: ["Multiattack"],
    damageTags: ["B", "P"],
    miscTags: ["MA"],
    conditionInflict: ["prone"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Ettin",
    source: "XMM",
    page: 116,
    size: ["L"],
    type: "giant",
    alignment: ["C", "E"],
    ac: [12],
    hp: {
      average: 85,
      formula: "10d10 + 30",
    },
    speed: {
      walk: 40,
    },
    str: 21,
    dex: 8,
    con: 17,
    int: 6,
    wis: 10,
    cha: 8,
    skill: {
      perception: "+4",
    },
    senses: ["darkvision 60 ft."],
    passive: 14,
    conditionImmune: [
      "blinded",
      "charmed",
      "deafened",
      "frightened",
      "stunned",
      "unconscious",
    ],
    languages: ["Giant"],
    cr: "4",
    gear: ["battleaxe|xphb", "morningstar|xphb"],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The ettin makes one Battleaxe attack and one Morningstar attack.",
        ],
      },
      {
        name: "Battleaxe",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}14 ({@damage 2d8 + 5}) Slashing damage. If the target is a Large or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
      {
        name: "Morningstar",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}14 ({@damage 2d8 + 5}) Piercing damage, and the target has {@variantrule Disadvantage|XPHB} on the next attack roll it makes before the end of its next turn.",
        ],
      },
    ],
    environment: ["hill", "mountain", "underdark"],
    treasure: ["individual"],
    soundClip: {
      type: "internal",
      path: "bestiary/ettin.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["GI"],
    damageTags: ["P", "S"],
    miscTags: ["MA", "MLW"],
    conditionInflict: ["prone"],
  },
  {
    name: "Flameskull",
    source: "XMM",
    page: 120,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["T"],
    type: "undead",
    alignment: ["N", "E"],
    ac: [13],
    hp: {
      average: 40,
      formula: "9d4 + 18",
    },
    speed: {
      walk: 5,
      fly: {
        number: 40,
        condition: "(hover)",
      },
      canHover: true,
    },
    str: 1,
    dex: 17,
    con: 14,
    int: 16,
    wis: 10,
    cha: 11,
    skill: {
      arcana: "+5",
      perception: "+2",
    },
    senses: ["darkvision 60 ft."],
    passive: 12,
    immune: ["fire", "necrotic", "poison"],
    conditionImmune: [
      "charmed",
      "exhaustion",
      "frightened",
      "paralyzed",
      "poisoned",
      "prone",
    ],
    languages: ["Common plus two other languages"],
    cr: "4",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The flameskull casts one of the following spells, requiring no Somatic or Material components and using Intelligence as the spellcasting ability (spell save {@dc 13}):",
        ],
        will: ["{@spell Mage Hand|XPHB}"],
        daily: {
          "1": ["{@spell Fireball|XPHB}"],
          "2": ["{@spell Magic Missile|XPHB} (level 2 version)"],
        },
        ability: "int",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Illumination",
        entries: [
          "The flameskull sheds {@variantrule Bright Light|XPHB} in a 15-foot radius and {@variantrule Dim Light|XPHB} for an additional 15 feet.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The flameskull has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Undead Restoration",
        entries: [
          "If the flameskull is destroyed, it regains all its {@variantrule Hit Points|XPHB} in 1 hour unless Holy Water is sprinkled on its remains or the {@spell Dispel Evil and Good|XPHB} spell is cast on them.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The flameskull makes two Fire Ray attacks."],
      },
      {
        name: "Fire Ray",
        entries: [
          "{@atkr m,r} {@hit 5}, reach 5 ft. or range 60 ft. {@h}13 ({@damage 3d6 + 3}) Fire damage.",
        ],
      },
    ],
    environment: ["underdark"],
    treasure: ["arcana"],
    soundClip: {
      type: "internal",
      path: "bestiary/flameskull.mp3",
    },
    traitTags: ["Illumination", "Magic Resistance"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["F"],
    damageTagsSpell: ["F", "O"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    savingThrowForcedSpell: ["dexterity"],
  },
  {
    name: "Ghost",
    source: "XMM",
    page: 131,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: "undead",
    alignment: ["N"],
    ac: [11],
    hp: {
      average: 45,
      formula: "10d8",
    },
    speed: {
      walk: 5,
      fly: {
        number: 40,
        condition: "(hover)",
      },
      canHover: true,
    },
    str: 7,
    dex: 13,
    con: 10,
    int: 10,
    wis: 12,
    cha: 17,
    senses: ["darkvision 60 ft."],
    passive: 11,
    resist: [
      "acid",
      "bludgeoning",
      "cold",
      "fire",
      "lightning",
      "piercing",
      "slashing",
      "thunder",
    ],
    immune: ["necrotic", "poison"],
    conditionImmune: [
      "charmed",
      "exhaustion",
      "frightened",
      "grappled",
      "paralyzed",
      "petrified",
      "poisoned",
      "prone",
      "restrained",
    ],
    languages: ["Common plus one other language"],
    cr: "4",
    spellcasting: [
      {
        name: "Etherealness",
        type: "spellcasting",
        headerEntries: [
          "The ghost casts the {@spell Etherealness|XPHB} spell, requiring no spell components and using Charisma as the spellcasting ability. The ghost is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.",
        ],
        will: ["{@spell Etherealness|XPHB}"],
        ability: "cha",
        displayAs: "action",
        hidden: ["will"],
      },
    ],
    trait: [
      {
        name: "Ethereal Sight",
        entries: [
          "The ghost can see 60 feet into the Ethereal Plane when it is on the Material Plane.",
        ],
      },
      {
        name: "Incorporeal Movement",
        entries: [
          "The ghost can move through other creatures and objects as if they were {@variantrule Difficult Terrain|XPHB}. It takes 5 ({@damage 1d10}) Force damage if it ends its turn inside an object.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The ghost makes two Withering Touch attacks."],
      },
      {
        name: "Withering Touch",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}19 ({@damage 3d10 + 3}) Necrotic damage.",
        ],
      },
      {
        name: "Horrific Visage",
        entries: [
          "{@actSave wis} {@dc 13}, each creature in a 60-foot {@variantrule Cone [Area of Effect]|XPHB|Cone} that can see the ghost and isn't an Undead. {@actSaveFail} 10 ({@damage 2d6 + 3}) Psychic damage, and the target has the {@condition Frightened|XPHB} condition until the start of the ghost's next turn. {@actSaveSuccess} The target is immune to this ghost's Horrific Visage for 24 hours.",
        ],
      },
      {
        name: "Possession {@recharge}",
        entries: [
          "{@actSave cha} {@dc 13}, one Humanoid the ghost can see within 5 feet. {@actSaveFail} The target is possessed by the ghost; the ghost disappears, and the target has the {@condition Incapacitated|XPHB} condition and loses control of its body. The ghost now controls the body, but the target retains awareness. The ghost can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The ghost's game statistics are the same, except it uses the possessed target's {@variantrule Speed|XPHB}, as well as the target's Strength, Dexterity, and Constitution modifiers.",
          "The possession lasts until the body drops to 0 {@variantrule Hit Points|XPHB} or the ghost leaves as a {@variantrule Bonus Action|XPHB}. When the possession ends, the ghost appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's {@variantrule Possession|XPHB} for 24 hours. {@actSaveSuccess} The target is immune to this ghost's {@variantrule Possession|XPHB} for 24 hours.",
        ],
      },
    ],
    environment: ["underdark", "urban"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/ghost.mp3",
    },
    traitTags: ["Incorporeal Movement"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["N", "O", "Y"],
    damageTagsSpell: ["O"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    conditionInflict: ["frightened", "incapacitated"],
    savingThrowForced: ["charisma", "wisdom"],
  },
  {
    name: "Gnoll Fang of Yeenoghu",
    source: "XMM",
    page: 141,
    size: ["M"],
    type: "fiend",
    alignment: ["C", "E"],
    ac: [14],
    hp: {
      average: 71,
      formula: "11d8 + 22",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 17,
    dex: 15,
    con: 15,
    int: 10,
    wis: 11,
    cha: 13,
    save: {
      con: "+4",
      wis: "+2",
      cha: "+3",
    },
    senses: ["darkvision 60 ft."],
    passive: 10,
    languages: ["Abyssal", "Gnoll"],
    cr: "4",
    action: [
      {
        name: "Multiattack",
        entries: [
          "The gnoll makes one Bite attack and two Bone Flail attacks.",
        ],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}6 ({@damage 1d6 + 3}) Piercing damage plus 7 ({@damage 2d6}) Poison damage, and the target has the {@condition Poisoned|XPHB} condition until the start of the gnoll's next turn.",
        ],
      },
      {
        name: "Bone Flail",
        entries: [
          "{@atkr m} {@hit 5}, reach 10 ft. {@h}7 ({@damage 1d8 + 3}) Piercing damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Rampage (2/Day)",
        entries: [
          "Immediately after dealing damage to a creature that is already {@variantrule Bloodied|XPHB}, the gnoll moves up to half its {@variantrule Speed|XPHB}, and it makes one Bite attack.",
        ],
      },
    ],
    environment: ["desert", "forest", "grassland", "hill"],
    treasure: ["armaments", "individual"],
    soundClip: {
      type: "internal",
      path: "bestiary/gnoll-fang-of-yeenoghu.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "OTH"],
    damageTags: ["I", "P"],
    miscTags: ["MA", "MLW", "RCH"],
    conditionInflict: ["poisoned"],
  },
  {
    name: "Guard Captain",
    source: "XMM",
    page: 162,
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [18],
    hp: {
      average: 75,
      formula: "10d8 + 30",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 18,
    dex: 14,
    con: 16,
    int: 12,
    wis: 14,
    cha: 13,
    skill: {
      athletics: "+6",
      perception: "+4",
    },
    passive: 14,
    languages: ["Common"],
    cr: "4",
    gear: [
      "breastplate|xphb",
      {
        item: "javelin|xphb",
        quantity: 6,
      },
      "longsword|xphb",
      "shield|xphb",
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The guard makes two attacks, using Javelin or Longsword in any combination.",
        ],
      },
      {
        name: "Javelin",
        entries: [
          "{@atkr m,r} {@hit 6}, reach 5 ft. or range 30/120 ft. {@h}14 ({@damage 3d6 + 4}) Piercing damage.",
        ],
      },
      {
        name: "Longsword",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}15 ({@damage 2d10 + 4}) Slashing damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["armaments", "individual"],
    actionTags: ["Multiattack"],
    languageTags: ["C"],
    damageTags: ["P", "S"],
    miscTags: ["MA", "MLW", "RA", "THW"],
  },
  {
    name: "Helmed Horror",
    source: "XMM",
    page: 166,
    size: ["M"],
    type: "construct",
    alignment: ["N"],
    ac: [20],
    hp: {
      average: 67,
      formula: "9d8 + 27",
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
    str: 18,
    dex: 13,
    con: 16,
    int: 10,
    wis: 10,
    cha: 10,
    skill: {
      perception: "+4",
    },
    senses: ["blindsight 60 ft."],
    passive: 14,
    immune: ["necrotic", "poison"],
    conditionImmune: [
      "blinded",
      "charmed",
      "deafened",
      "exhaustion",
      "frightened",
      "paralyzed",
      "petrified",
      "poisoned",
      "stunned",
    ],
    languages: ["understands Common plus one other language but can't speak"],
    cr: "4",
    gear: ["shield|xphb"],
    trait: [
      {
        name: "Magic Resistance",
        entries: [
          "The helmed horror has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Spell Immunity",
        entries: [
          "The helmed horror is immune to three spells chosen by its creator. Typical choices include {@spell Heat Metal|XPHB}, {@spell Lightning Bolt|XPHB}, and {@spell Magic Missile|XPHB}.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The helmed horror makes two Arcane Sword attacks."],
      },
      {
        name: "Arcane Sword",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}8 ({@damage 1d8 + 4}) Slashing damage plus 5 ({@damage 1d10}) Force damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/helmed-horror.mp3",
    },
    traitTags: ["Magic Resistance", "Spell Immunity"],
    senseTags: ["B"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "CS", "X"],
    damageTags: ["O", "S"],
    miscTags: ["MA"],
  },
  {
    name: "Hippopotamus",
    source: "XMM",
    page: 362,
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [14],
    hp: {
      average: 82,
      formula: "11d10 + 22",
    },
    speed: {
      walk: 30,
      swim: 30,
    },
    str: 21,
    dex: 7,
    con: 15,
    int: 2,
    wis: 12,
    cha: 4,
    save: {
      str: "+7",
    },
    skill: {
      perception: "+3",
    },
    passive: 13,
    cr: "4",
    trait: [
      {
        name: "Hold Breath",
        entries: ["The hippopotamus can hold its breath for 10 minutes."],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The hippopotamus makes two Bite attacks."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}16 ({@damage 2d10 + 5}) Piercing damage.",
        ],
      },
    ],
    environment: ["forest", "grassland", "swamp"],
    traitTags: ["Hold Breath"],
    actionTags: ["Multiattack"],
    damageTags: ["P"],
    miscTags: ["MA"],
  },
  {
    name: "Incubus",
    source: "XMM",
    page: 178,
    otherSources: [
      {
        source: "ScoEE",
      },
    ],
    size: ["M"],
    type: "fiend",
    alignment: ["N", "E"],
    ac: [15],
    hp: {
      average: 66,
      formula: "12d8 + 12",
    },
    speed: {
      walk: 30,
      fly: 60,
    },
    str: 8,
    dex: 17,
    con: 13,
    int: 15,
    wis: 12,
    cha: 20,
    skill: {
      deception: "+9",
      insight: "+5",
      perception: "+5",
      persuasion: "+9",
      stealth: "+7",
    },
    senses: ["darkvision 60 ft."],
    passive: 15,
    resist: ["cold", "fire", "poison", "psychic"],
    languages: ["Abyssal", "Common", "Infernal; telepathy 60 ft."],
    cr: "4",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The incubus casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 15}):",
        ],
        will: ["{@spell Disguise Self|XPHB}", "{@spell Etherealness|XPHB}"],
        daily: {
          "1e": ["{@spell Dream|XPHB}", "{@spell Hypnotic Pattern|XPHB}"],
        },
        ability: "cha",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Succubus Form",
        entries: [
          "When the incubus finishes a {@variantrule Long Rest|XPHB}, it can shape-shift into a {@creature Succubus|XMM}, using that stat block instead of this one. Any equipment it's wearing or carrying isn't transformed.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The incubus makes two Restless Touch attacks."],
      },
      {
        name: "Restless Touch",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}15 ({@damage 3d6 + 5}) Psychic damage, and the target is cursed for 24 hours or until the incubus dies. Until the curse ends, the target gains no benefit from finishing Short Rests.",
        ],
      },
    ],
    bonus: [
      {
        name: "Nightmare {@recharge}",
        entries: [
          "{@actSave wis} {@dc 15}, one creature the incubus can see within 60 feet. {@actSaveFail} If the target has 20 {@variantrule Hit Points|XPHB} or fewer, it has the {@condition Unconscious|XPHB} condition for 1 hour, until it takes damage, or until a creature within 5 feet of it takes an action to wake it. Otherwise, the target takes 18 ({@damage 4d8}) Psychic damage.",
        ],
      },
    ],
    environment: ["planar, lower", "urban"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/succubus-incubus.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "C", "I", "TP"],
    damageTags: ["Y"],
    damageTagsSpell: ["O", "Y"],
    spellcastingTags: ["O"],
    miscTags: ["CUR", "MA"],
    conditionInflict: ["unconscious"],
    conditionInflictSpell: ["charmed", "incapacitated"],
    savingThrowForced: ["wisdom"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Juvenile Shadow Dragon",
    source: "XMM",
    page: 275,
    size: ["M"],
    type: "dragon",
    alignment: ["C", "E"],
    ac: [15],
    hp: {
      average: 45,
      formula: "6d8 + 18",
    },
    speed: {
      walk: 30,
      climb: 30,
      fly: 60,
    },
    initiative: {
      proficiency: 1,
    },
    str: 17,
    dex: 14,
    con: 17,
    int: 12,
    wis: 11,
    cha: 15,
    save: {
      dex: "+4",
    },
    skill: {
      perception: "+4",
      stealth: "+6",
    },
    senses: ["blindsight 10 ft.", "darkvision 60 ft."],
    passive: 14,
    resist: [
      {
        special: "See Living Shadow",
      },
    ],
    immune: ["necrotic"],
    languages: ["Common", "Draconic"],
    cr: "4",
    trait: [
      {
        name: "Living Shadow",
        entries: [
          "While in {@variantrule Dim Light|XPHB} or {@variantrule Darkness|XPHB}, the dragon has {@variantrule Resistance|XPHB} to damage that isn't Force, Psychic, or Radiant.",
        ],
      },
      {
        name: "Sunlight Sensitivity",
        entries: [
          "While in sunlight, the dragon has {@variantrule Disadvantage|XPHB} on ability checks and attack rolls.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The dragon makes two Rend attacks."],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 5}, reach 10 ft. {@h}7 ({@damage 1d8 + 3}) Slashing damage plus 3 ({@damage 1d6}) Necrotic damage.",
        ],
      },
      {
        name: "Shadow Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 13}, each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 17 ({@damage 5d6}) Necrotic damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} A Humanoid reduced to 0 {@variantrule Hit Points|XPHB} by this damage dies, and a {@creature Shadow|XMM} rises from its corpse. The shadow is under the dragon's control and shares the dragon's {@variantrule Initiative|XPHB} count but acts immediately after the dragon.",
        ],
      },
    ],
    bonus: [
      {
        name: "Shadow Stealth",
        entries: [
          "While in {@variantrule Dim Light|XPHB} or {@variantrule Darkness|XPHB}, the dragon takes the Hide action.",
        ],
      },
    ],
    environment: ["planar, shadowfell", "underdark"],
    treasure: ["any"],
    traitTags: ["Sunlight Sensitivity"],
    senseTags: ["B", "D"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["N", "S"],
    miscTags: ["MA", "RCH"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Lamia",
    source: "XMM",
    page: 192,
    size: ["L"],
    type: "fiend",
    alignment: ["C", "E"],
    ac: [13],
    hp: {
      average: 97,
      formula: "13d10 + 26",
    },
    speed: {
      walk: 40,
    },
    str: 16,
    dex: 13,
    con: 15,
    int: 14,
    wis: 15,
    cha: 16,
    skill: {
      deception: "+7",
      insight: "+4",
      stealth: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 12,
    languages: ["Abyssal", "Common"],
    cr: "4",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The lamia casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 13}):",
        ],
        will: [
          "{@spell Disguise Self|XPHB} (can appear as a Large or Medium biped)",
          "{@spell Minor Illusion|XPHB}",
        ],
        daily: {
          "1e": [
            "{@spell Geas|XPHB}",
            "{@spell Major Image|XPHB}",
            "{@spell Scrying|XPHB}",
          ],
        },
        ability: "cha",
        displayAs: "action",
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The lamia makes two Claw attacks. It can replace one attack with a use of Corrupting Touch.",
        ],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}7 ({@damage 1d8 + 3}) Slashing damage plus 7 ({@damage 2d6}) Psychic damage.",
        ],
      },
      {
        name: "Corrupting Touch",
        entries: [
          "{@actSave wis} {@dc 13}, one creature the lamia can see within 5 feet. {@actSaveFail} 13 ({@damage 3d8}) Psychic damage, and the target is cursed for 1 hour. Until the curse ends, the target has the {@condition Charmed|XPHB} and {@condition Poisoned|XPHB} conditions.",
        ],
      },
    ],
    bonus: [
      {
        name: "Leap",
        entries: [
          "The lamia jumps up to 30 feet by spending 10 feet of movement.",
        ],
      },
    ],
    environment: ["desert"],
    treasure: ["arcana"],
    soundClip: {
      type: "internal",
      path: "bestiary/lamia.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "C"],
    damageTags: ["S", "Y"],
    damageTagsSpell: ["Y"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    conditionInflictSpell: ["charmed"],
    savingThrowForced: ["wisdom"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Lizardfolk Sovereign",
    source: "XMM",
    page: 197,
    size: ["M"],
    type: "elemental",
    alignment: ["N"],
    ac: [15],
    hp: {
      average: 78,
      formula: "12d8 + 24",
    },
    speed: {
      walk: 30,
      burrow: 20,
      swim: 30,
    },
    str: 17,
    dex: 12,
    con: 15,
    int: 11,
    wis: 11,
    cha: 15,
    save: {
      con: "+4",
      wis: "+2",
    },
    skill: {
      perception: "+4",
      stealth: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 14,
    conditionImmune: ["frightened"],
    languages: ["Draconic", "Primordial (Terran)"],
    cr: "4",
    action: [
      {
        name: "Multiattack",
        entries: [
          "The lizardfolk makes one Bite attack and one Earthen Maul attack.",
        ],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}8 ({@damage 1d10 + 3}) Piercing damage. If the target is a creature that isn't a Construct or an Undead, the lizardfolk gains {@variantrule Temporary Hit Points|XPHB} equal to the damage dealt.",
        ],
      },
      {
        name: "Earthen Maul",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}10 ({@damage 2d6 + 3}) Bludgeoning damage. If the target is a Medium or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    bonus: [
      {
        name: "Charge",
        entries: [
          "The lizardfolk moves up to its {@variantrule Speed|XPHB} or {@variantrule Swim Speed|XPHB} straight toward an enemy it can see.",
        ],
      },
    ],
    environment: ["forest", "swamp"],
    treasure: ["individual"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["DR", "P", "T"],
    damageTags: ["B", "P"],
    miscTags: ["MA", "MLW"],
    conditionInflict: ["prone"],
  },
  {
    name: "Red Dragon Wyrmling",
    group: ["Chromatic Dragons"],
    source: "XMM",
    page: 254,
    size: ["M"],
    type: {
      type: "dragon",
      tags: ["chromatic"],
    },
    alignment: ["C", "E"],
    ac: [17],
    hp: {
      average: 75,
      formula: "10d8 + 30",
    },
    speed: {
      walk: 30,
      climb: 30,
      fly: 60,
    },
    initiative: {
      proficiency: 1,
    },
    str: 19,
    dex: 10,
    con: 17,
    int: 12,
    wis: 11,
    cha: 15,
    save: {
      dex: "+2",
      wis: "+2",
    },
    skill: {
      perception: "+4",
      stealth: "+2",
    },
    senses: ["blindsight 10 ft.", "darkvision 60 ft."],
    passive: 14,
    immune: ["fire"],
    languages: ["Draconic"],
    cr: "4",
    action: [
      {
        name: "Multiattack",
        entries: ["The dragon makes two Rend attacks."],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}9 ({@damage 1d10 + 4}) Slashing damage plus 3 ({@damage 1d6}) Fire damage.",
        ],
      },
      {
        name: "Fire Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 13}, each creature in a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 24 ({@damage 7d6}) Fire damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["hill", "mountain"],
    treasure: ["any"],
    dragonAge: "wyrmling",
    soundClip: {
      type: "internal",
      path: "bestiary/red-dragon-wyrmling.mp3",
    },
    senseTags: ["B", "D"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["DR"],
    damageTags: ["F", "S"],
    miscTags: ["MA"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Shadow Demon",
    group: ["Demons"],
    source: "XMM",
    page: 273,
    size: ["M"],
    type: {
      type: "fiend",
      tags: ["demon"],
    },
    alignment: ["C", "E"],
    ac: [14],
    hp: {
      average: 66,
      formula: "12d8 + 12",
    },
    speed: {
      walk: 30,
      fly: {
        number: 30,
        condition: "(hover)",
      },
      canHover: true,
    },
    str: 1,
    dex: 17,
    con: 12,
    int: 14,
    wis: 13,
    cha: 14,
    save: {
      dex: "+5",
      cha: "+4",
    },
    skill: {
      stealth: "+7",
    },
    senses: ["darkvision 120 ft."],
    passive: 11,
    resist: [
      "acid",
      "bludgeoning",
      "cold",
      "fire",
      "lightning",
      "piercing",
      "slashing",
      "thunder",
    ],
    immune: ["necrotic", "poison"],
    vulnerable: ["radiant"],
    conditionImmune: [
      "exhaustion",
      "grappled",
      "paralyzed",
      "petrified",
      "poisoned",
      "prone",
      "restrained",
    ],
    languages: ["Abyssal; telepathy 120 ft."],
    cr: "4",
    trait: [
      {
        name: "Demonic Restoration",
        entries: [
          "If the demon dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its {@variantrule Hit Points|XPHB} somewhere in the Abyss.",
        ],
      },
      {
        name: "Incorporeal Movement",
        entries: [
          "The demon can move through other creatures and objects as if they were {@variantrule Difficult Terrain|XPHB}. It takes 5 ({@damage 1d10}) Force damage if it ends its turn inside an object.",
        ],
      },
      {
        name: "Light Sensitivity",
        entries: [
          "While in {@variantrule Bright Light|XPHB}, the demon has {@variantrule Disadvantage|XPHB} on ability checks and attack rolls.",
        ],
      },
    ],
    action: [
      {
        name: "Umbral Claw",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}16 ({@damage 3d8 + 3}) Psychic damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Shadow Stealth",
        entries: [
          "While in {@variantrule Dim Light|XPHB} or {@variantrule Darkness|XPHB}, the demon takes the Hide action.",
        ],
      },
    ],
    environment: ["planar, abyss"],
    soundClip: {
      type: "internal",
      path: "bestiary/shadow-demon.mp3",
    },
    traitTags: ["Incorporeal Movement", "Light Sensitivity"],
    senseTags: ["SD"],
    languageTags: ["AB", "TP"],
    damageTags: ["O", "Y"],
    miscTags: ["MA"],
  },
  {
    name: "Succubus",
    source: "XMM",
    page: 303,
    otherSources: [
      {
        source: "ScoEE",
      },
    ],
    size: ["M"],
    type: "fiend",
    alignment: ["N", "E"],
    ac: [15],
    hp: {
      average: 71,
      formula: "13d8 + 13",
    },
    speed: {
      walk: 30,
      fly: 60,
    },
    str: 8,
    dex: 17,
    con: 13,
    int: 15,
    wis: 12,
    cha: 20,
    skill: {
      deception: "+9",
      insight: "+5",
      perception: "+5",
      persuasion: "+9",
      stealth: "+7",
    },
    senses: ["darkvision 60 ft."],
    passive: 15,
    resist: ["cold", "fire", "poison", "psychic"],
    languages: ["Abyssal", "Common", "Infernal; telepathy 60 ft."],
    cr: "4",
    trait: [
      {
        name: "Incubus Form",
        entries: [
          "When the succubus finishes a {@variantrule Long Rest|XPHB}, it can shape-shift into an {@creature Incubus|XMM}, using that stat block instead of this one.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The succubus makes one Fiendish Touch attack and uses Charm or Draining Kiss.",
        ],
      },
      {
        name: "Fiendish Touch",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}16 ({@damage 2d10 + 5}) Psychic damage.",
        ],
      },
      {
        name: "Charm",
        entries: [
          "The succubus casts {@spell Dominate Person|XPHB} (level 8 version), requiring no spell components and using Charisma as the spellcasting ability (spell save {@dc 15}).",
        ],
      },
      {
        name: "Draining Kiss",
        entries: [
          "{@actSave con} {@dc 15}, one creature {@condition Charmed|XPHB} by the succubus within 5 feet. {@actSaveFail} 13 ({@damage 3d8}) Psychic damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} The target's {@variantrule Hit Points|XPHB|Hit Point} maximum decreases by an amount equal to the damage taken.",
        ],
      },
    ],
    bonus: [
      {
        name: "Shape-Shift",
        entries: [
          "The succubus shape-shifts to resemble a Medium or Small Humanoid or back into its true form. Its game statistics are the same in each form, except its {@variantrule Fly Speed|XPHB} is available only in its true form. Any equipment it's wearing or carrying isn't transformed.",
        ],
      },
    ],
    environment: ["planar, lower", "urban"],
    treasure: ["implements"],
    soundClip: {
      type: "internal",
      path: "bestiary/succubus-incubus.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "C", "I", "TP"],
    damageTags: ["Y"],
    miscTags: ["MA"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Swarm of Dretches",
    group: ["Demons"],
    source: "XMM",
    page: 104,
    size: ["L"],
    type: {
      type: "fiend",
      swarmSize: "S",
      tags: ["demon"],
    },
    alignment: ["C", "E"],
    ac: [12],
    hp: {
      average: 45,
      formula: "6d10 + 12",
    },
    speed: {
      walk: 40,
    },
    str: 14,
    dex: 11,
    con: 14,
    int: 5,
    wis: 8,
    cha: 3,
    senses: ["darkvision 60 ft."],
    passive: 9,
    resist: [
      "bludgeoning",
      "cold",
      "fire",
      "lightning",
      "piercing",
      "slashing",
    ],
    immune: ["poison"],
    conditionImmune: [
      "charmed",
      "frightened",
      "grappled",
      "paralyzed",
      "petrified",
      "poisoned",
      "prone",
      "restrained",
      "stunned",
    ],
    languages: [
      "Abyssal; telepathy 60 ft. (works only with creatures that understand Abyssal)",
    ],
    cr: "4",
    trait: [
      {
        name: "Fetid Aura",
        entries: [
          "{@actSave con} {@dc 12}, any creature that starts its turn in a 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the swarm. {@actSaveFail} The target has the {@condition Poisoned|XPHB} condition until the start of its next turn. While {@condition Poisoned|XPHB}, the target can take either an action or a {@variantrule Bonus Action|XPHB} on its turn, not both, and it can't take Reactions.",
        ],
      },
      {
        name: "Swarm",
        entries: [
          "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Small creature. The swarm can't regain {@variantrule Hit Points|XPHB} or gain {@variantrule Temporary Hit Points|XPHB}.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The swarm makes two Rend attacks."],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}12 ({@damage 3d6 + 2}) Slashing damage, or 9 ({@damage 3d4 + 2}) Slashing damage if the swarm is {@variantrule Bloodied|XPHB}.",
        ],
      },
    ],
    environment: ["planar, abyss"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "TP"],
    damageTags: ["S"],
    miscTags: ["MA"],
    conditionInflict: ["poisoned"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Tough Boss",
    source: "XMM",
    page: 307,
    otherSources: [
      {
        source: "ScoEE",
      },
      {
        source: "DrDe",
      },
    ],
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [16],
    hp: {
      average: 82,
      formula: "11d8 + 33",
    },
    speed: {
      walk: 30,
    },
    str: 17,
    dex: 14,
    con: 16,
    int: 11,
    wis: 10,
    cha: 11,
    save: {
      str: "+5",
      con: "+5",
      cha: "+2",
    },
    passive: 10,
    languages: ["Common plus one other language"],
    cr: "4",
    gear: ["chain mail|xphb", "heavy crossbow|xphb", "warhammer|xphb"],
    trait: [
      {
        name: "Pack Tactics",
        entries: [
          "The tough has {@variantrule Advantage|XPHB} on an attack roll against a creature if at least one of the tough's allies is within 5 feet of the creature and the ally doesn't have the {@condition Incapacitated|XPHB} condition.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The tough makes two attacks, using Warhammer or Heavy Crossbow in any combination.",
        ],
      },
      {
        name: "Warhammer",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}12 ({@damage 2d8 + 3}) Bludgeoning damage. If the target is a Large or smaller creature, the tough pushes the target up to 10 feet straight away from itself.",
        ],
      },
      {
        name: "Heavy Crossbow",
        entries: [
          "{@atkr r} {@hit 4}, range 100/400 ft. {@h}13 ({@damage 2d10 + 2}) Piercing damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["armaments"],
    traitTags: ["Pack Tactics"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["B", "P"],
    miscTags: ["MA", "MLW", "RA", "RNG"],
  },
  {
    name: "Wereboar",
    group: ["Lycanthropes"],
    source: "XMM",
    page: 325,
    size: ["S", "M"],
    type: {
      type: "monstrosity",
      tags: ["lycanthrope"],
    },
    alignment: ["N", "E"],
    ac: [15],
    hp: {
      average: 97,
      formula: "15d8 + 30",
    },
    speed: {
      walk: 30,
      alternate: {
        walk: [
          {
            number: 40,
            condition: "(boar form only)",
          },
        ],
      },
    },
    initiative: {
      proficiency: 1,
    },
    str: 17,
    dex: 10,
    con: 15,
    int: 10,
    wis: 11,
    cha: 8,
    skill: {
      perception: "+2",
    },
    passive: 12,
    languages: ["Common (can't speak in boar form)"],
    cr: "4",
    gear: [
      {
        item: "javelin|xphb",
        quantity: 6,
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The wereboar makes two attacks, using Javelin or Tusk in any combination. It can replace one attack with a Gore attack.",
        ],
      },
      {
        name: "Gore (Boar or Hybrid Form Only)",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}12 ({@damage 2d8 + 3}) Piercing damage. If the target is a Humanoid, it is subjected to the following effect. {@actSave con} {@dc 12}. {@actSaveFail} The target is cursed. If the cursed target drops to 0 {@variantrule Hit Points|XPHB}, it instead becomes a Wereboar under the DM's control and has 10 {@variantrule Hit Points|XPHB}. {@actSaveSuccess} The target is immune to this wereboar's curse for 24 hours.",
        ],
      },
      {
        name: "Javelin (Humanoid or Hybrid Form Only)",
        entries: [
          "{@atkr m,r} {@hit 5}, reach 5 ft. or range 30/120 ft. {@h}13 ({@damage 3d6 + 3}) Piercing damage.",
        ],
      },
      {
        name: "Tusk (Boar or Hybrid Form Only)",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}10 ({@damage 2d6 + 3}) Piercing damage. If the target is a Medium or smaller creature and the wereboar moved 20+ feet straight toward it immediately before the hit, the target takes an extra 7 ({@damage 2d6}) Piercing damage and has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    bonus: [
      {
        name: "Shape-Shift",
        entries: [
          "The wereboar shape-shifts into a Medium boar-humanoid hybrid or a Small boar, or it returns to its true humanoid form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.",
        ],
      },
    ],
    environment: ["forest", "grassland", "hill"],
    treasure: ["individual"],
    soundClip: {
      type: "internal",
      path: "bestiary/wereboar.mp3",
    },
    actionTags: ["Multiattack"],
    languageTags: ["C", "CS"],
    damageTags: ["P"],
    miscTags: ["CUR", "MA", "MLW", "RA", "THW"],
    conditionInflict: ["prone"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Weretiger",
    group: ["Lycanthropes"],
    source: "XMM",
    page: 326,
    size: ["S", "M"],
    type: {
      type: "monstrosity",
      tags: ["lycanthrope"],
    },
    alignment: ["N"],
    ac: [12],
    hp: {
      average: 120,
      formula: "16d8 + 48",
    },
    speed: {
      walk: 30,
      alternate: {
        walk: [
          {
            number: 40,
            condition: "(tiger form only)",
          },
        ],
      },
    },
    str: 17,
    dex: 15,
    con: 16,
    int: 10,
    wis: 13,
    cha: 11,
    skill: {
      perception: "+5",
      stealth: "+4",
    },
    senses: ["darkvision 60 ft."],
    passive: 15,
    languages: ["Common (can't speak in tiger form)"],
    cr: "4",
    gear: ["longbow|xphb"],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The weretiger makes two attacks, using Scratch or Longbow in any combination. It can replace one attack with a Bite attack.",
        ],
      },
      {
        name: "Bite (Tiger or Hybrid Form Only)",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}12 ({@damage 2d8 + 3}) Piercing damage. If the target is a Humanoid, it is subjected to the following effect. {@actSave con} {@dc 13}. {@actSaveFail} The target is cursed. If the cursed target drops to 0 {@variantrule Hit Points|XPHB}, it instead becomes a Weretiger under the DM's control and has 10 {@variantrule Hit Points|XPHB}. {@actSaveSuccess} The target is immune to this weretiger's curse for 24 hours.",
        ],
      },
      {
        name: "Scratch",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}10 ({@damage 2d6 + 3}) Slashing damage.",
        ],
      },
      {
        name: "Longbow (Humanoid or Hybrid Form Only)",
        entries: [
          "{@atkr r} {@hit 4}, range 150/600 ft. {@h}11 ({@damage 2d8 + 2}) Piercing damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Prowl (Tiger or Hybrid Form Only)",
        entries: [
          "The weretiger moves up to its {@variantrule Speed|XPHB} without provoking {@action Opportunity Attack|XPHB|Opportunity Attacks}. At the end of this movement, the weretiger can take the Hide action.",
        ],
      },
      {
        name: "Shape-Shift",
        entries: [
          "The weretiger shape-shifts into a Large tiger-humanoid hybrid or a Large tiger, or it returns to its true humanoid form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.",
        ],
      },
    ],
    environment: ["desert", "forest", "grassland"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/weretiger.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "CS"],
    damageTags: ["P", "S"],
    miscTags: ["CUR", "MA", "RA", "RNG"],
    savingThrowForced: ["constitution"],
  },
];
