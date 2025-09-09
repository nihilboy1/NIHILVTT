import { z } from "zod";
import {
  DistanceUnitEnum,
  DurationUnitEnum,
} from "./primitives/world.primitives.js";
import { AbilityScoreEnum } from "./primitives/character.primitives.js";
import {
  DamageTypeEnum,
  RechargeEventEnum,
  RollModeEnum,
} from "./primitives/combat.primitives.js";
import { GameEventSchema } from "./game-events.schema.js";
import { DiceRollSchema } from "./character-blocks.schema.js";

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

export const BaseRollModifierSchema = z.object({
  type: z.literal("rollModifier"),
  mode: RollModeEnum,
});

export const DurationSchema = z.object({
  unit: DurationUnitEnum,
  value: z.number().int().optional(),
  isConcentration: z.boolean().default(false).optional(),
});



export const RechargeSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("dice"),
    roll: DiceRollSchema,
    successOn: z.array(z.number()),
    triggers: GameEventSchema,
    max: z.number().int().min(1),
  }),
  z.object({
    type: z.literal("event"),
    rechargeOn: RechargeEventEnum,
    recoveryAmount: z.union([z.number(), DiceRollSchema]),
    maxCharges: z.number().int().min(1),
  }),
  z.object({
    type: z.literal("time"),
    duration: DurationSchema,
    max: z.number().int().min(1),
  }),
  z.object({
    type: z.literal("static"),
    amount: z.union([z.number(), DiceRollSchema]),
    max: z.number().int().min(1),
  }),
]);

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
      if (data.type === "conditional" || data.type === "halfDamage") {
        return true;
      }
      if (data.type === "healing") {
        return (
          data.roll || data.fixed !== undefined || data.addSpellcastingModifier
        );
      }
      return data.roll || data.fixed !== undefined;
    },
    {
      message:
        "A fórmula precisa ter pelo menos uma rolagem (roll), um valor fixo (fixed) ou usar addSpellcastingModifier.",
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
