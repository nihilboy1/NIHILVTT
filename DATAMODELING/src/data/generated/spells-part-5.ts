export const spellsPart5= [
  {
    "name": "Blight",
    "source": "XPHB",
    "page": 247,
    "srd52": true,
    "basicRules2024": true,
    "level": 4,
    "school": "N",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "point",
      "distance": {
        "type": "feet",
        "amount": 30
      }
    },
    "components": {
      "v": true,
      "s": true
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "A creature that you can see within range makes a Constitution saving throw, taking {@damage 8d8} Necrotic damage on a failed save or half as much damage on a successful one. A Plant creature automatically fails the save.",
      "Alternatively, target a nonmagical plant that isn't a creature, such as a tree or shrub. It doesn't make a save; it simply withers and dies."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 8d8|4-9|1d8} for each spell slot level above 4."
        ]
      }
    ],
    "damageInflict": [
      "necrotic"
    ],
    "savingThrow": [
      "constitution"
    ],
    "miscTags": [
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Blinding Smite",
    "source": "XPHB",
    "page": 247,
    "level": 3,
    "school": "V",
    "time": [
      {
        "number": 1,
        "unit": "bonus",
        "condition": "which you take immediately after hitting a creature with a Melee weapon or an {@variantrule Unarmed Strike|XPHB}"
      }
    ],
    "range": {
      "type": "point",
      "distance": {
        "type": "self"
      }
    },
    "components": {
      "v": true
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "minute",
          "amount": 1
        }
      }
    ],
    "entries": [
      "The target hit by the strike takes an extra {@damage 3d8} Radiant damage from the attack, and the target has the {@condition Blinded|XPHB} condition until the spell ends. At the end of each of its turns, the {@condition Blinded|XPHB} target makes a Constitution saving throw, ending the spell on itself on a success."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The extra damage increases by {@scaledamage 3d8|3-9|1d8} for each spell slot level above 3."
        ]
      }
    ],
    "damageInflict": [
      "radiant"
    ],
    "conditionInflict": [
      "blinded"
    ],
    "savingThrow": [
      "constitution"
    ],
    "miscTags": [
      "AAD"
    ]
  },
  {
    "name": "Blindness/Deafness",
    "source": "XPHB",
    "page": 248,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
    "school": "T",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "point",
      "distance": {
        "type": "feet",
        "amount": 120
      }
    },
    "components": {
      "v": true
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "minute",
          "amount": 1
        }
      }
    ],
    "entries": [
      "One creature that you can see within range must succeed on a Constitution saving throw, or it has the {@condition Blinded|XPHB} or {@condition Deafened|XPHB} condition (your choice) for the duration. At the end of each of its turns, the target repeats the save, ending the spell on itself on a success."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "You can target one additional creature for each spell slot level above 2."
        ]
      }
    ],
    "conditionInflict": [
      "blinded",
      "deafened"
    ],
    "savingThrow": [
      "constitution"
    ],
    "miscTags": [
      "SCT",
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Blink",
    "source": "XPHB",
    "page": 248,
    "srd52": true,
    "basicRules2024": true,
    "level": 3,
    "school": "T",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "point",
      "distance": {
        "type": "self"
      }
    },
    "components": {
      "v": true,
      "s": true
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "minute",
          "amount": 1
        }
      }
    ],
    "entries": [
      "Roll {@dice 1d6} at the end of each of your turns for the duration. On a roll of 4-6, you vanish from your current plane of existence and appear in the Ethereal Plane (the spell ends instantly if you are already on that plane). While on the Ethereal Plane, you can perceive the plane you left, which is cast in shades of gray, but you can't see anything there more than 60 feet away. You can affect and be affected only by other creatures on the Ethereal Plane, and creatures on the other plane can't perceive you unless they have a special ability that lets them perceive things on the Ethereal Plane.",
      "You return to the other plane at the start of your next turn and when the spell ends if you are on the Ethereal Plane. You return to an unoccupied space of your choice that you can see within 10 feet of the space you left. If no unoccupied space is available within that range, you appear in the nearest unoccupied space."
    ],
    "miscTags": [
      "SGT"
    ]
  },
  {
    "name": "Blur",
    "source": "XPHB",
    "page": 248,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
    "school": "I",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "point",
      "distance": {
        "type": "self"
      }
    },
    "components": {
      "v": true
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "minute",
          "amount": 1
        },
        "concentration": true
      }
    ],
    "entries": [
      "Your body becomes blurred. For the duration, any creature has {@variantrule Disadvantage|XPHB} on attack rolls against you. An attacker is immune to this effect if it perceives you with {@sense Blindsight|XPHB} or {@sense Truesight|XPHB}."
    ]
  },
  {
    "name": "Burning Hands",
    "source": "XPHB",
    "page": 248,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
    "school": "V",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "cone",
      "distance": {
        "type": "feet",
        "amount": 15
      }
    },
    "components": {
      "v": true,
      "s": true
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "A thin sheet of flames shoots forth from you. Each creature in a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone} makes a Dexterity saving throw, taking {@damage 3d6} Fire damage on a failed save or half as much damage on a successful one.",
      "Flammable objects in the {@variantrule Cone [Area of Effect]|XPHB|Cone} that aren't being worn or carried start {@hazard burning|XPHB}."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 3d6|1-9|1d6} for each spell slot level above 1."
        ]
      }
    ],
    "damageInflict": [
      "fire"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "OBJ"
    ],
    "areaTags": [
      "N"
    ]
  },
  {
    "name": "Call Lightning",
    "source": "XPHB",
    "page": 248,
    "srd52": true,
    "basicRules2024": true,
    "level": 3,
    "school": "C",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "point",
      "distance": {
        "type": "feet",
        "amount": 120
      }
    },
    "components": {
      "v": true,
      "s": true
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "minute",
          "amount": 10
        },
        "concentration": true
      }
    ],
    "entries": [
      "A storm cloud appears at a point within range that you can see above yourself. It takes the shape of a {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} that is 10 feet tall with a 60-foot radius.",
      "When you cast the spell, choose a point you can see under the cloud. A lightning bolt shoots from the cloud to that point. Each creature within 5 feet of that point makes a Dexterity saving throw, taking {@damage 3d10} Lightning damage on a failed save or half as much damage on a successful one.",
      "Until the spell ends, you can take a {@action Magic|XPHB} action to call down lightning in that way again, targeting the same point or a different one.",
      "If you're outdoors in a storm when you cast this spell, the spell gives you control over that storm instead of creating a new one. Under such conditions, the spell's damage increases by {@damage 1d10}."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 3d10|3-9|1d10} for each spell slot level above 3."
        ]
      }
    ],
    "damageInflict": [
      "lightning"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "SGT"
    ],
    "areaTags": [
      "S",
      "Y"
    ]
  },
  {
    "name": "Calm Emotions",
    "source": "XPHB",
    "page": 249,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
    "school": "E",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "point",
      "distance": {
        "type": "feet",
        "amount": 60
      }
    },
    "components": {
      "v": true,
      "s": true
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "minute",
          "amount": 1
        },
        "concentration": true
      }
    ],
    "entries": [
      "Each Humanoid in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point you choose within range must succeed on a Charisma saving throw or be affected by one of the following effects (choose for each creature):",
      {
        "type": "list",
        "items": [
          "The creature has {@variantrule Immunity|XPHB} to the {@condition Charmed|XPHB} and {@condition Frightened|XPHB} conditions until the spell ends. If the creature was already {@condition Charmed|XPHB} or {@condition Frightened|XPHB}, those conditions are suppressed for the duration.",
          "The creature becomes {@variantrule Indifferent [Attitude]|XPHB|Indifferent} about creatures of your choice that it's {@variantrule Hostile [Attitude]|XPHB|Hostile} toward. This indifference ends if the target takes damage or witnesses its allies taking damage. When the spell ends, the creature's attitude returns to normal."
        ]
      }
    ],
    "savingThrow": [
      "charisma"
    ],
    "affectsCreatureType": [
      "humanoid"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Chain Lightning",
    "source": "XPHB",
    "page": 249,
    "srd52": true,
    "basicRules2024": true,
    "level": 6,
    "school": "V",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "point",
      "distance": {
        "type": "feet",
        "amount": 150
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "three silver pins"
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You launch a lightning bolt toward a target you can see within range. Three bolts then leap from that target to as many as three other targets of your choice, each of which must be within 30 feet of the first target. A target can be a creature or an object and can be targeted by only one of the bolts.",
      "Each target makes a Dexterity saving throw, taking {@damage 10d8} Lightning damage on a failed save or half as much damage on a successful one."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "One additional bolt leaps from the first target to another target for each spell slot level above 6."
        ]
      }
    ],
    "damageInflict": [
      "lightning"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "OBJ",
      "SCT",
      "SGT"
    ],
    "areaTags": [
      "MT",
      "ST"
    ]
  }
];
