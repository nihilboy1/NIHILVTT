import { z } from "zod";
import {
  DistanceUnitEnum,
  DurationUnitEnum,
} from "./primitives/world.primitives.js";
import { AbilityScoreEnum } from "./primitives/character.primitives.js";
import {
  CoverEnum,
  DamageTypeEnum,
  RechargeEventEnum,
  RollModeEnum,
} from "./primitives/combat.primitives.js";
import { CreatureTypeEnum } from "./primitives/system.primitives.js";
import { GameEventSchema } from "./game-events.schema.js";

interface ConditionalHPFormulaType {
  type: "conditional";
  variables: z.infer<typeof GameEventSchema>;
  ifTrue: HPFormulaType;
  ifFalse?: HPFormulaType;
}
type HPFormulaType =
  | z.infer<typeof HealingFormulaSchema>
  | z.infer<typeof DamageFormulaSchema>
  | ConditionalHPFormulaType
  | z.infer<typeof HalfDamageFormulaSchema>;

export const DcSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("fixed"),
    value: z.number().int(),
    attributes: z
      .array(
        AbilityScoreEnum.or(z.literal("proficiency")).or(
          z.literal("spellcasting"),
        ),
      )
      .optional(),
  }),
  z.object({
    type: z.literal("calculated"),
    base: z.number().int(),
    attributes: z.array(
      AbilityScoreEnum.or(z.literal("proficiency")).or(
        z.literal("spellcasting"),
      ),
    ),
  }),
]);

export const BaseRollModifierSchema = z.object({
  type: z.literal("rollModifier"),
  mode: RollModeEnum,
});

export const SavingThrowSchema = z.object({
  ability: AbilityScoreEnum,
  dc: DcSchema,
  ignoreCovers: z.array(CoverEnum).optional(),
});

export const DurationSchema = z.object({
  unit: DurationUnitEnum,
  value: z.number().int().optional(),
  isConcentration: z.boolean().default(false).optional(),
});

export const DiceRollSchema = z.object({
  count: z.number().int().min(1, "A quantidade de dados deve ser no mínimo 1."),
  faces: z
    .number()
    .int()
    .min(1, "O número de faces do dado deve ser no mínimo 1."),
  bonus: z.number().int().optional(),
  explodesOn: z.number().optional(),
  explodeLimit: z
    .union([z.number().int(), z.literal("spellcastingModifier")])
    .optional(),
});

export const RechargeSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("dice"), // p/ "Recharge 6" ou "Recharge 5-6"
    roll: DiceRollSchema, // ex: "1d6"
    successOn: z.array(z.number()), // ex: [6] ou [5,6]
    triggers: GameEventSchema,
    max: z.number().int().min(1)
  }),
  z.object({
    type: z.literal("rest"), // p/ varinhas, bastões, etc.
    rest: RechargeEventEnum, // "longRest" | "shortRest"
    amount: z.union([z.number(), DiceRollSchema]).optional(),
    max: z.number().int().min(1)
  }),
  z.object({
    type: z.literal("time"), // recarrega após X tempo
    duration: DurationSchema,
    max: z.number().int().min(1)
  }),
  z.object({
    type: z.literal("static"),
    amount: z.union([z.number(), DiceRollSchema]),
    max: z.number().int().min(1)
  }),
]);

// charges em si
export const ChargesSchema = z.object({
  max: z.number().int(),
  current: z.number().int().optional(), // estado atual
  recharge: RechargeSchema.optional(),
});

export const HealingFormulaSchema = z.object({
  type: z.literal("healing"),
  roll: DiceRollSchema.optional(),
  fixed: z.number().int().optional(),
  addSpellcastingModifier: z.boolean().optional(),
});

export const DamageFormulaSchema = z.object({
  type: z.literal("damage"),
  roll: DiceRollSchema.optional(),
  fixed: z.number().int().optional(),
  damageTypeOptions: z.array(DamageTypeEnum),
});



export const RangeSchema = z.object({
  normal: z.number().int().optional(),
  long: z.number().int().optional(),
  unit: DistanceUnitEnum.default("ft"),
});

export const TargetSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("self") }),
  z.object({
    type: z.literal("selfArea"),
    selective: z.boolean().default(false).optional(),
    excludeSelf: z.boolean().default(false).optional(),
  }),
  z.object({
    type: z.literal("creature"),
    quantity: z.number().int().default(1),
    creatureTypes: z.array(CreatureTypeEnum).optional(),
  }),
  z.object({
    type: z.literal("object"),
    quantity: z.number().int().default(1),
  }),
  z.object({
    type: z.literal("weapon"),
    quantity: z.number().int().default(1),
    properties: z.array(DamageTypeEnum).optional(),
  }),
  z.object({ type: z.literal("point") }),
  z.object({
    type: z.literal("descriptive"),
    details: z.string(),
  }),
]);

export const RollModifierSchema = z.lazy(() =>
  z.discriminatedUnion("type", [
    BaseRollModifierSchema,
    z.object({
      type: z.literal("conditionalRollModifier"),
      triggers: GameEventSchema.array(),
      ifTrue: BaseRollModifierSchema,
      ifFalse: BaseRollModifierSchema,
    }),
  ]),
);

const HalfDamageFormulaSchema = z.object({
  type: z.literal("halfDamage"),
  of: z
    .string()
    .min(1, "É necessário especificar o ID do outcome de dano original."),
});

export const ConditionalHPFormulaSchema = z.object({
  type: z.literal("conditional"),
  variables: GameEventSchema,
  ifTrue: z.lazy(() => HPFormulaSchema),
  ifFalse: z.lazy(() => HPFormulaSchema).optional(),
});

export const HPFormulaSchema: z.ZodType<HPFormulaType> = z
  .discriminatedUnion("type", [
    HealingFormulaSchema,
    DamageFormulaSchema,
    ConditionalHPFormulaSchema,
    HalfDamageFormulaSchema,
  ])
  .refine(
    (data) => {
      if (data.type === "conditional" || data.type === "halfDamage")
        return true;
      return data.roll || data.fixed !== undefined;
    },
    {
      message:
        "A fórmula precisa ter pelo menos uma rolagem (roll) ou um valor fixo (fixed).",
    },
  );

export const AcSchema = z.discriminatedUnion("calculation", [
  z.object({ calculation: z.literal("base"), value: z.number() }),
  z.object({ calculation: z.literal("bonus"), value: z.number() }),
  z.object({
    calculation: z.literal("formula"),
    base: z.number(),
    attribute: AbilityScoreEnum,
    maxBonus: z.number().optional(),
  }),
]);

const SelectionModeEnum = z.enum(["choice", "all"]);

export const RequirementSchema = z.object({
  user: GameEventSchema.optional(),
  target: GameEventSchema.optional(),
  allTargetsInArea: GameEventSchema.optional(),
  environment: z.array(z.any()).optional(),
});

export const AreaSchema = z.discriminatedUnion("shape", [
  z.object({
    shape: z.literal("sphere"),
    radius: z.number(),
    unit: DistanceUnitEnum.default("ft"),
    selectionMode: SelectionModeEnum.default("all").optional(),
  }),
  z.object({
    shape: z.literal("cube"),
    size: z.number(),
    unit: DistanceUnitEnum.default("ft"),
    selectionMode: SelectionModeEnum.default("all").optional(),
  }),
  z.object({
    shape: z.literal("cone"),
    length: z.number(),
    unit: DistanceUnitEnum.default("ft"),
    selectionMode: SelectionModeEnum.default("all").optional(),
  }),
  z.object({
    shape: z.literal("line"),
    length: z.number(),
    width: z.number(),
    unit: DistanceUnitEnum.default("ft"),
    selectionMode: SelectionModeEnum.default("all").optional(),
  }),
]);
