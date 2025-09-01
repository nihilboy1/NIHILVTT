// Arquivo gerado automaticamente
export const species = [
  {
    name: "Orc",
    source: "EGW",
    reprintedAs: ["Orc|XPHB"],
    _copy: {
      name: "Orc",
      source: "ERLW",
      _mod: {
        entries: [
          {
            mode: "replaceArr",
            replace: "Age",
            items: {
              name: "Age",
              entries: [
                "Orcs reach adulthood at age 16, and live up to 80 years.",
              ],
            },
          },
          {
            mode: "replaceArr",
            replace: "Alignment",
            items: {
              name: "Alignment",
              entries: [
                "Orcs fear the curse of ruin that is said to plague their race, and tend strongly toward either chaos (accepting their fate), or toward law (rejecting it).",
              ],
            },
          },
          {
            mode: "replaceArr",
            replace: "Size",
            items: {
              name: "Size",
              entries: [
                "Orcs stand easily 8 feet tall and corded with powerful muscles, weighing up to 280 pounds. Your size is Medium.",
              ],
            },
          },
          {
            mode: "replaceArr",
            replace: "Primal Intuition",
            items: {
              name: "Primal Intuition",
              entries: [
                "You have proficiency in two of the following skills of your choice: {@skill Animal Handling}, {@skill Insight}, {@skill Intimidation}, {@skill Medicine}, {@skill Perception}, and {@skill Survival}.",
              ],
            },
          },
        ],
      },
      _preserve: {
        reprintedAs: true,
      },
    },
    heightAndWeight: null,
    skillProficiencies: [
      {
        choose: {
          from: [
            "animal handling",
            "insight",
            "intimidation",
            "medicine",
            "perception",
            "survival",
          ],
          count: 2,
        },
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/orc.mp3",
    },
  },
];
