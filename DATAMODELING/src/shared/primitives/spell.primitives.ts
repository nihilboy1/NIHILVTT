import z from "zod";

export const MagicSchoolEnum = z.enum([
  "abjuration",
  "conjuration",
  "divination",
  "enchantment",
  "evocation",
  "illusion",
  "necromancy",
  "transmutation",
]);

export const SpellComponentEnum = z.enum(["verbal", "somatic", "material"]);
