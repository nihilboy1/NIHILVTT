import { Item } from "../../domain/item/item.schema";
import z from "zod";

export const itemsTool = [
  {
    id: "item-ferramentas-de-ladrao",
    name: ["Ferramentas de Ladrão", "Thieves' Tools"],
    source: "LDJ2024",
    page: 221,
    type: "tool",
    rarity: "common",
    weight: { value: 1, unit: "lb" },
    price: { quantity: 25, unit: "gold" },
    description:
      "Este conjunto de ferramentas inclui uma pequena lixa, um conjunto de gazuas, um pequeno espelho montado em um cabo de metal, um conjunto de tesouras de lâminas finas e um par de alicates. A proficiência com essas ferramentas permite que você adicione seu bônus de proficiência a quaisquer testes de habilidade que você fizer para desarmar armadilhas ou abrir fechaduras.",
    effects: [
      {
        type: "passive_grantBonus",
        name: "Ferramentas de Ladrão",
        on: "action",
        appliesToActions: ["action-disarm-trap", "action-pick-lock"],
        value: "proficiency",
      },
    ],
  },
] as const satisfies Item[];

const allToolIds = itemsTool.map((tool) => tool.id);

if (allToolIds.length === 0) {
  throw new Error(
    "Nenhuma ferramenta encontrada em items-tool.ts para criar o ToolIdEnum.",
  );
}

const [firstToolId, ...restToolIds] = allToolIds;

export const ToolIdEnum = z.enum([firstToolId, ...restToolIds]);
export type ToolId = z.infer<typeof ToolIdEnum>;
