// Arquivo gerado automaticamente
export const species = [
  {
    name: "Goblin (Dankwood)",
    source: "AWM",
    _copy: {
      name: "Goblin",
      source: "VGM",
      _mod: {
        entries: [
          {
            mode: "appendArr",
            items: {
              name: "Alignment",
              entries: [
                "Dankwood goblins are typically neutral or neutral good, though some mischievous Dankwood goblins are chaotic neutral.",
              ],
            },
          },
          {
            mode: "replaceArr",
            replace: "Fury of the Small",
            items: {
              name: "Speak with Small Beasts",
              entries: [
                "Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts. Dankwood goblins love animals and often keep squirrels, badgers, rabbits, moles, woodpeckers, and other creatures as beloved pets.",
              ],
            },
          },
        ],
      },
      _preserve: {
        reprintedAs: true,
      },
    },
    ability: [
      {
        dex: 2,
        wis: 1,
      },
    ],
    heightAndWeight: null,
    soundClip: {
      type: "internal",
      path: "races/goblin.mp3",
    },
  },
];
