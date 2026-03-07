package com.nihilvtt.auth.game.service;

import java.util.Arrays;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

public enum CombatDamageType {
  SLASHING("slashing"),
  PIERCING("piercing"),
  BLUDGEONING("bludgeoning"),
  POISON("poison"),
  ACID("acid"),
  FIRE("fire"),
  COLD("cold"),
  RADIANT("radiant"),
  NECROTIC("necrotic"),
  LIGHTNING("lightning"),
  THUNDER("thunder"),
  FORCE("force"),
  PSYCHIC("psychic");

  private static final Map<String, CombatDamageType> BY_WIRE_VALUE = Arrays.stream(values())
      .collect(Collectors.toUnmodifiableMap(CombatDamageType::wireValue, Function.identity()));

  private final String wireValue;

  CombatDamageType(String wireValue) {
    this.wireValue = wireValue;
  }

  public String wireValue() {
    return wireValue;
  }

  public static Optional<CombatDamageType> fromWireValue(String wireValue) {
    return Optional.ofNullable(BY_WIRE_VALUE.get(wireValue));
  }
}
