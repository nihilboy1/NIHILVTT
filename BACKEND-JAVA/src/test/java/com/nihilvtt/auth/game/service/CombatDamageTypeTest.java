package com.nihilvtt.auth.game.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class CombatDamageTypeTest {

  @Test
  void fromWireValue_acceptsCanonicalValues() {
    assertEquals(
        CombatDamageType.BLUDGEONING,
        CombatDamageType.fromWireValue("bludgeoning").orElseThrow()
    );
    assertEquals(
        CombatDamageType.PSYCHIC,
        CombatDamageType.fromWireValue("psychic").orElseThrow()
    );
  }

  @Test
  void fromWireValue_rejectsNonCanonicalValues() {
    assertTrue(CombatDamageType.fromWireValue("Bludgeoning").isEmpty());
    assertTrue(CombatDamageType.fromWireValue("holy").isEmpty());
    assertTrue(CombatDamageType.fromWireValue("").isEmpty());
  }
}
