// ============================================================================
// PRIMITIVOS DE COMBATE E AÇÃO
// Proposta: Mover para 'combat.primitives.ts'
// ============================================================================

import z from "zod";
export const RollModeEnum = z.enum(["normal", "advantage", "disadvantage"]);

export const EventTriggerEnum = z.enum([
  // --- Combate direto ---
  "onAttackRoll",
  "onHit", "onMiss",
  "onBeingAttacked",
  "onDealingDamage",
  "onTakingDamage",
  "onAllyDamagesTarget",
  "onAllyIsHit",

  // --- Ciclos de turno ---
  "onTurnStart",
  "onTurnEnd",
  "onStartTurnInArea",
  "onEndTurnInArea",

  // --- Movimento e alcance ---
  "onEnterArea",
  "onLeaveArea",
  "onMovesInArea",
  "onTargetEntersReach",
  "onBeingFarFromCaster",
  "onTargetLeavesReach",
  "onUserFarFromTarget", // param: distance

  // --- Status e condições ---
  "onConditionGained", // param: condition
  "onConditionLost", // param: condition
  "onTempHpDepleted",
  "onHitByStrongWind",
  "onHealed", // param: amount
  "onHpBelowThreshold", // param: threshold
  "onSavingThrow", // param opcional: type (STR, DEX, etc.)

  // --- Interações do usuário ---
  "onDropItem",
  "onUserCastSpellAgain",
  "onUserCastsOnNonTargetEnemy",
  "onUserAttacksOther",
  "onUserActsHostile",
  "onUserOrAlliesActsHostile",
  "onUserLoseConcentration",

  // --- Eventos críticos ---
  "onCharacterDeath",
  "onTargetIsWounded", // param: hpThreshold
  "onDiceRollResult",
]);


// Para validar arrays de endConditions:

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
