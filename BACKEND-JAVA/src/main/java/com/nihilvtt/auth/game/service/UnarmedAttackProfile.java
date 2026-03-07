package com.nihilvtt.auth.game.service;

import java.util.Map;

public final class UnarmedAttackProfile {
  public static final String ATTACK_ID = "builtin-unarmed-strike";
  public static final String LABEL = "Ataque desarmado";
  public static final double RANGE_METERS = 1.5;
  public static final CombatDamageType DEFAULT_DAMAGE_TYPE = CombatDamageType.BLUDGEONING;

  private static final Map<String, CombatDamageType> SPECIE_DAMAGE_TYPE_OVERRIDES = Map.of(
      "specie-lizardfolk", CombatDamageType.SLASHING
  );

  private UnarmedAttackProfile() {
  }

  public static CombatDamageType resolveDamageTypeForSpecie(String specieId) {
    if (specieId == null) {
      return DEFAULT_DAMAGE_TYPE;
    }

    String normalizedSpecieId = specieId.trim().toLowerCase();
    if (normalizedSpecieId.isBlank()) {
      return DEFAULT_DAMAGE_TYPE;
    }

    return SPECIE_DAMAGE_TYPE_OVERRIDES.getOrDefault(normalizedSpecieId, DEFAULT_DAMAGE_TYPE);
  }
}
