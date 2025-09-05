import z from "zod";
import { DistanceUnitEnum } from "./primitives/world.primitives";
import {
  AttackSourceEnum,
  CoverEnum,
  DamageTypeEnum,
} from "./primitives/combat.primitives";
import {
  ConditionStatusEnum,
  CreatureTypeEnum,
} from "./primitives/system.primitives";
import { AbilityScoreEnum, SkillEnum } from "./primitives/character.primitives";
import { BonusSchema, DiceRollSchema } from "./blocks.schema";
import { CostUnitEnum } from "./primitives/item.primitives";
import { AllItemsEnum } from "./data-based-enums";

export const RangeSchema = z.object({
  normal: z.number().int().optional(),
  long: z.number().int().optional(),
  unit: DistanceUnitEnum.default("ft"),
});

export const AttackTypeSchema = z.object({
  range: z.enum(["melee", "ranged"]),
  source: AttackSourceEnum,
  handsInUse: z.enum(["one", "two", "any"]).default("any"),
});

const EquipmentItemSchema = z.object({
  type: z.literal("item"),
  id: AllItemsEnum,
  displayName: z.string().optional(),
  quantity: z.number().int().positive().default(1),
});

const CurrencySchema = z.object({
  type: z.literal("currency"),
  amount: z.number().int().positive(),
  unit: CostUnitEnum,
});

// Union discriminada para o conteúdo de um pacote
const EquipmentContentSchema = z.discriminatedUnion("type", [
  EquipmentItemSchema,
  CurrencySchema,
]);

const ChoiceOptionSchema = z.object({
  id: z.string().min(1), // Ex: 'package_devotee'
  contents: z.array(EquipmentContentSchema),
});

// Schema para equipamento inicial baseado em escolhas
const ChoiceBasedEquipmentSchema = z.object({
  type: z.literal("choice"),
  count: 1,
  choices: z.array(ChoiceOptionSchema).nonempty(),
});

// Schema para equipamento inicial com itens garantidos
const GuaranteedEquipmentSchema = z.object({
  type: z.literal("guaranteed"),
  items: z.array(EquipmentContentSchema).nonempty(),
});

// Schema final com discriminated union para o equipamento inicial
export const StartingEquipmentSchema = z.array(
  z.discriminatedUnion("type", [
    ChoiceBasedEquipmentSchema,
    GuaranteedEquipmentSchema,
  ]),
);

export const AbilityScoresSchema = z.object({
  strength: z.number().int(),
  dexterity: z.number().int(),
  constitution: z.number().int(),
  intelligence: z.number().int(),
  wisdom: z.number().int(),
  charisma: z.number().int(),
});

export const HitPointsSchema = z.object({
  average: z.number().int(),
  formula: z.lazy(() => DiceRollSchema),
});

export const SpeedSchema = z.object({
  walk: z.number().int().optional(),
  climb: z.number().int().optional(),
  fly: z.number().int().optional(),
  swim: z.number().int().optional(),
  burrow: z.number().int().optional(),
  unit: DistanceUnitEnum,
});

export const ProficienciesSchema = z.object({
  skills: z
    .array(
      z.object({
        skill: SkillEnum,
        bonus: BonusSchema,
      }),
    )
    .optional(),
  savingThrows: z
    .array(
      z.object({
        ability: AbilityScoreEnum,
        bonus: BonusSchema,
      }),
    )
    .optional(),
});

export const DefensesSchema = z.object({
  resistances: z.array(DamageTypeEnum).optional(),
  vulnerabilities: z.array(DamageTypeEnum).optional(),
  immunities: z
    .object({
      damage: z.array(DamageTypeEnum).optional(),
      condition: z.array(ConditionStatusEnum).optional(),
    })
    .optional(),
});

export const SensesSchema = z.object({
  passivePerception: z.number().int().min(0),
  vision: z
    .object({
      darkvision: z.number().int().positive(),
      blindsight: z.number().int().positive(),
      tremorsense: z.number().int().positive(),
      truesight: z.number().int().positive(),
    })
    .partial()
    .optional(),
});

export const TargetSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("self") }),
  z.object({ type: z.literal("none") }),
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

export const SavingThrowSchema = z.object({
  ability: AbilityScoreEnum,
  dc: DcSchema,
  ignoreCovers: z.array(CoverEnum).optional(),
});
