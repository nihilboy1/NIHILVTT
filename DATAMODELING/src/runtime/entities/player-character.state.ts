import { z } from "zod";
import { FeatIdEnum } from "../../shared/data-based-enums.js";
import { CharacterTypeEnum } from "../../shared/primitives/character.primitives.js";
import { ClassIdEnum } from "../../shared/primitives/class.primitives.js";
import { ActiveEffectStateSchema } from "../value-objects/active-effect.state.js";
import { AttributesStateSchema } from "../value-objects/attributes.state.js";
import { EquipmentStateSchema } from "../value-objects/equipment.state.js";
import { InventoryStateSchema } from "../value-objects/inventory.state.js";
import { ProgressionStateSchema } from "../value-objects/progression.state.js";
import { ResourcePoolStateSchema } from "../value-objects/resource-pool.state.js";

const OriginIdSchema = z.string().regex(/^origin-[a-z0-9-]+$/, {
  message: "Origin id must use the canonical namespaced format (origin-...).",
});

const SpecieIdSchema = z.string().regex(/^specie-[a-z0-9-]+$/, {
  message: "Specie id must use the canonical namespaced format (specie-...).",
});

const SubclassIdSchema = z.string().regex(/^subclass-[a-z0-9-]+$/, {
  message: "Subclass id must use the canonical namespaced format (subclass-...).",
});

export const PlayerCharacterIdentityStateSchema = z.object({
  id: z.uuid(),
  type: z.literal(CharacterTypeEnum.enum.Player),
  name: z.string().min(1).max(100),
  image: z.string().min(1).optional(),
  notes: z.string().max(5000).optional(),
});

export const PlayerCharacterBuildStateSchema = z.object({
  classId: ClassIdEnum,
  originId: OriginIdSchema,
  specieId: SpecieIdSchema,
  subclassId: SubclassIdSchema.nullable().default(null),
  selectedFeatIds: z.array(FeatIdEnum).default([]),
});

export const PlayerCharacterHitPointStateSchema = z.object({
  current: z.number().int().min(0),
  max: z.number().int().positive(),
  temporary: z.number().int().min(0).default(0),
});

export const PlayerCharacterStateSchema = z.object({
  ...PlayerCharacterIdentityStateSchema.shape,
  build: PlayerCharacterBuildStateSchema,
  progression: ProgressionStateSchema,
  attributes: AttributesStateSchema,
  hitPoints: PlayerCharacterHitPointStateSchema,
  inspiration: z.boolean().default(false),
  inventory: InventoryStateSchema,
  equipment: EquipmentStateSchema,
  resourcePools: ResourcePoolStateSchema,
  activeEffects: ActiveEffectStateSchema,
});

export type PlayerCharacterIdentityStateType = z.infer<typeof PlayerCharacterIdentityStateSchema>;
export type PlayerCharacterBuildStateType = z.infer<typeof PlayerCharacterBuildStateSchema>;
export type PlayerCharacterHitPointStateType = z.infer<typeof PlayerCharacterHitPointStateSchema>;
export type PlayerCharacterStateType = z.infer<typeof PlayerCharacterStateSchema>;
