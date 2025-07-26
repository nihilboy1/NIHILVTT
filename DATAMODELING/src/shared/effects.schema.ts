// Em schemas/effects.schema.ts (Versão Corrigida)
import { z } from "zod";
import {
  WeaponCategoryEnum,
  WeaponTypeEnum,
  WeaponMasteryEnum,
  SkillEnum,
  AbilityScoreEnum,
  WeightUnitEnum,
  ItemPropertyEnum,
} from "./primitives.js";
import {
  AcSchema,
  DamageFormulaSchema,
  DurationSchema,
  RangeSchema,
  WeaponPropertySchema,
} from "./blocks.schema.js";
import { ActionParametersSchema } from "../domain/action/actions.schema.js";
import { ActionOutcomeSchema } from "../shared/outcomes.schema.js";
import { ActionIdEnum } from "../domain/action/actions.data.js";

export const EffectSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("onEquip_setAC"),
    calculation: AcSchema,
  }),
  z.object({
    type: z.literal("onEquip_imposeDisadvantage"),
    on: z.literal("skillCheck"),
    skill: SkillEnum,
  }),
  z.object({
    type: z.literal("onEquip_providesContainer"),
    properties: z.object({
      capacity: z.object({ value: z.number(), unit: WeightUnitEnum }),
      volume: z.object({ value: z.number(), unit: z.string() }).optional(),
    }),
  }),
  z.object({
    type: z.literal("onWield_grantWeaponAttack"),
    weaponCategory: WeaponCategoryEnum,
    weaponType: WeaponTypeEnum,
    properties: z.array(WeaponPropertySchema),
    mastery: z.array(WeaponMasteryEnum),
    damage: z
      .object({
        primary: DamageFormulaSchema,
        versatile: DamageFormulaSchema.optional(),
      })
      .optional(),
    range: RangeSchema.optional(),
    outcomes: z.array(ActionOutcomeSchema).optional(),
    cost: z
      .object({
        amount: z.number(),
        source: z.enum(["inventory"]), // Por enquanto, apenas do inventário
        resourceId: z.string(), // "item-flecha", "item-virote-de-besta"
      })
      .optional(),
  }),
  z.object({
    type: z.literal("passive_grantAdvantage"),
    on: z.enum(["abilityCheck", "skillCheck", "savingThrow"]),
    ability: AbilityScoreEnum.optional(),
    skill: SkillEnum.optional(),
    condition: z.string().optional(),
  }),
  z.object({
    type: z.literal("passive_providesLight"),
    properties: z.object({
      bright: z.number().int(),
      dim: z.number().int(),
      duration: DurationSchema.optional(), // <-- MUDOU AQUI
    }),
  }),

  z.object({
    type: z.literal("passive_property"),
    property: ItemPropertyEnum,
    value: z.union([z.string(), z.number(), z.boolean()]),
  }),
  z.object({
    type: z.literal("activatableAction"),
    actionId: ActionIdEnum,
    parameters: ActionParametersSchema.optional(),
  }),

  z.object({
    type: z.literal("passive_grantBonus"),
    on: z.enum(["attackRoll", "damageRoll", "ac", "savingThrow"]),
    value: z.number().int(),
    condition: z.string().optional(),
  }),
]);
