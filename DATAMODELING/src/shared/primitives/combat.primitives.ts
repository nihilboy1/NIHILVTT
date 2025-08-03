
// ============================================================================
// PRIMITIVOS DE COMBATE E AÇÃO
// Proposta: Mover para 'combat.primitives.ts'
// ============================================================================

import z from "zod";

export const EventTriggerEnum = z.enum([
  "onBeingAttacked",
  "onAttackRoll",
  "onDealingDamage",
  "onTakingDamage",
  "onTempHpDepleted",
  "onSavingThrow",
  "onTurnStart",
  "onTurnEnd",
  "onCharacterDeath",
  "onEnterArea",
  "onLeaveArea",
  "onStartTurnInArea",
  "onEndTurnInArea",
  "onTargetEntersReach",
  "onTargetLeavesReach",
  "onAllyIsHit",
  "onUserCastSpellAgain",
  "onUserActsHostile",
  "onDropItem",
  "onUserLoseConcentration",
]);

export const CoverEnum = z.enum(["half", "threeQuarters", "total"]);

export const ActionTypeEnum = z.enum([
  "action",
  "bonusAction",
  "reaction",
  "free",
  "special",
]);

export const AttackTypeEnum = z.enum([
  "meleeWeaponAttack",
  "rangedWeaponAttack",
  "meleeSpellAttack",
  "rangedSpellAttack",
  "rangedItemAttack",
  "meleeItemAttack",
]);

export const DamageTypeEnum = z.enum([
  "slashing",
  "piercing",
  "bludgeoning",
  "poison",
  "acid",
  "fire",
  "cold",
  "radiant",
  "necrotic",
  "lightning",
  "thunder",
  "force",
  "psychic",
  "weaponDefault",
]);

export const EffectOutcomeEnum = z.enum([
  "fail",
  "success",
  "hit",
  "miss",
  "custom",
  "spellEnd",
  "any",
]);

export const ResourceCostIdEnum = z.enum([
  "action",
  "bonusAction",
  "reaction",
  "itemCharge",
  "spellSlot",
]);

export const RechargeEventEnum = z.enum([
  "dawn",
  "dusk",
  "shortRest",
  "longRest",
]);
