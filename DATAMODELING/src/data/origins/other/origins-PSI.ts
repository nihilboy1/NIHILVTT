// Arquivo gerado automaticamente
export const origins = [
  {
    "name": "Inquisitor",
    "source": "PSI",
    "page": 12,
    "skillProficiencies": [
      {
        "investigation": true,
        "religion": true
      }
    ],
    "toolProficiencies": [
      {
        "thieves' tools": true,
        "anyArtisansTool": 1
      }
    ],
    "startingEquipment": [
      {
        "_": [
          "holy symbol|phb",
          "traveler's clothes|phb",
          {
            "item": "pouch|phb",
            "containsValue": 1500
          }
        ]
      }
    ],
    "entries": [
      {
        "type": "list",
        "style": "list-hang-notitle",
        "items": [
          {
            "type": "item",
            "name": "Skill Proficiencies:",
            "entry": "{@skill Investigation}, {@skill Religion}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "{@item Thieves' tools|phb}, one type of {@filter artisan's tools|items|source=phb|miscellaneous=mundane|type=artisan's tools}"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A {@item holy symbol|phb}, a set of {@item traveler's clothes|phb}, and a belt {@item pouch|phb} containing 15 gp"
          }
        ]
      },
      {
        "name": "Feature: Legal Authority",
        "type": "entries",
        "entries": [
          "As an inquisitor of the church, you have the authority to arrest criminals. In the absence of other authorities, you are authorized to pass judgement and even carry out sentencing. If you abuse this power, however, your superiors in the church might strip it from you."
        ],
        "data": {
          "isFeature": true
        }
      }
    ],
    "hasFluff": true,
    "hasFluffImages": true
  }
];
