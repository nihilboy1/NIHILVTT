package com.nihilvtt.auth.game.service;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

class SessionCharacterPayloadValidatorTest {
  private final ObjectMapper objectMapper = new ObjectMapper();

  @Test
  void validatePersistedCharacter_acceptsValidPlayerRuntime() {
    assertDoesNotThrow(() -> SessionCharacterPayloadValidator.validatePersistedCharacter(buildValidPlayerCharacter()));
  }

  @Test
  void validatePersistedCharacter_acceptsValidNpcRuntime() {
    assertDoesNotThrow(() -> SessionCharacterPayloadValidator.validatePersistedCharacter(buildValidNpcCharacter()));
  }

  @Test
  void validateMonsterForCreate_rejectsControlledByUserId() {
    ObjectNode npcCharacter = buildValidNpcCharacter();
    npcCharacter.put("controlledByUserId", 42);

    assertThrows(
        ResponseStatusException.class,
        () -> SessionCharacterPayloadValidator.validateMonsterForCreate(npcCharacter)
    );
  }

  @Test
  void validatePersistedCharacter_rejectsPlayerRuntimeWithoutExplicitControlledByUserId() {
    ObjectNode playerCharacter = buildValidPlayerCharacter();
    playerCharacter.remove("controlledByUserId");

    assertThrows(
        ResponseStatusException.class,
        () -> SessionCharacterPayloadValidator.validatePersistedCharacter(playerCharacter)
    );
  }

  @Test
  void validatePersistedCharacter_rejectsPlayerRuntimeWithoutExplicitTemporaryHp() {
    ObjectNode playerCharacter = buildValidPlayerCharacter();
    playerCharacter.with("hitPoints").remove("temporary");

    assertThrows(
        ResponseStatusException.class,
        () -> SessionCharacterPayloadValidator.validatePersistedCharacter(playerCharacter)
    );
  }

  @Test
  void validatePersistedCharacter_rejectsNpcRuntimeWithoutExplicitActiveEffects() {
    ObjectNode npcCharacter = buildValidNpcCharacter();
    npcCharacter.remove("activeEffects");

    assertThrows(
        ResponseStatusException.class,
        () -> SessionCharacterPayloadValidator.validatePersistedCharacter(npcCharacter)
    );
  }

  private ObjectNode buildValidPlayerCharacter() {
    ObjectNode characterNode = objectMapper.createObjectNode();
    characterNode.put("id", "11111111-1111-4111-8111-111111111111");
    characterNode.put("type", "Player");
    characterNode.put("name", "Contrato Player");
    characterNode.putNull("image");
    characterNode.putNull("notes");
    characterNode.putNull("controlledByUserId");

    ObjectNode buildNode = characterNode.putObject("build");
    buildNode.put("classId", "class-fighter");
    buildNode.put("originId", "origin-acolyte");
    buildNode.put("specieId", "specie-aasimar");
    buildNode.putNull("subclassId");
    buildNode.putArray("selectedFeatIds");

    ObjectNode progressionNode = characterNode.putObject("progression");
    progressionNode.put("currentLevel", 1);
    progressionNode.put("pendingLevelUps", 0);

    ObjectNode attributesNode = characterNode.putObject("attributes").putObject("base");
    attributesNode.put("strength", 15);
    attributesNode.put("dexterity", 14);
    attributesNode.put("constitution", 13);
    attributesNode.put("intelligence", 12);
    attributesNode.put("wisdom", 10);
    attributesNode.put("charisma", 8);

    ObjectNode hitPointsNode = characterNode.putObject("hitPoints");
    hitPointsNode.put("current", 12);
    hitPointsNode.put("max", 12);
    hitPointsNode.put("temporary", 0);

    characterNode.put("inspiration", false);
    characterNode.putObject("inventory").putArray("items");

    ObjectNode equipmentNode = characterNode.putObject("equipment");
    equipmentNode.putNull("bodyArmorItemId");
    equipmentNode.putNull("shieldItemId");
    equipmentNode.putNull("mainHandWeaponId");
    equipmentNode.putNull("offHandWeaponId");

    characterNode.putObject("resourcePools").putArray("pools");
    characterNode.putObject("activeEffects").putArray("effects");
    return characterNode;
  }

  private ObjectNode buildValidNpcCharacter() {
    ObjectNode characterNode = objectMapper.createObjectNode();
    characterNode.put("id", "22222222-2222-4222-8222-222222222222");
    characterNode.put("type", "NPC");
    characterNode.put("monsterId", "monster-commoner");
    characterNode.putNull("nameOverride");
    characterNode.putNull("imageOverride");
    characterNode.putNull("notes");

    ObjectNode hitPointsNode = characterNode.putObject("hitPoints");
    hitPointsNode.put("current", 4);
    hitPointsNode.put("temporary", 0);

    characterNode.putObject("resourcePools").putArray("pools");
    characterNode.putObject("activeEffects").putArray("effects");
    return characterNode;
  }
}
