package com.nihilvtt.auth.game.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class UnarmedAttackProfileTest {

  @Test
  void resolveDamageTypeForSpecie_returnsSlashingForLizardfolk() {
    assertEquals(
        CombatDamageType.SLASHING,
        UnarmedAttackProfile.resolveDamageTypeForSpecie("specie-lizardfolk")
    );
  }

  @Test
  void resolveDamageTypeForSpecie_returnsDefaultForUnknownOrMissingSpecie() {
    assertEquals(
        CombatDamageType.BLUDGEONING,
        UnarmedAttackProfile.resolveDamageTypeForSpecie(null)
    );
    assertEquals(
        CombatDamageType.BLUDGEONING,
        UnarmedAttackProfile.resolveDamageTypeForSpecie("")
    );
    assertEquals(
        CombatDamageType.BLUDGEONING,
        UnarmedAttackProfile.resolveDamageTypeForSpecie("specie-human")
    );
  }
}
