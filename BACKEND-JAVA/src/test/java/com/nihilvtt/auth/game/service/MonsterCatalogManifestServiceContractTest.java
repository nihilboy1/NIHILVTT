package com.nihilvtt.auth.game.service;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

class MonsterCatalogManifestServiceContractTest {
  private final ObjectMapper objectMapper = new ObjectMapper();

  @Test
  void validateManifestRoot_acceptsExpectedVersion() throws Exception {
    JsonNode root = objectMapper.readTree("""
        {
          "manifestVersion": 1,
          "combatContractVersion": 1,
          "monsters": []
        }
        """);

    assertDoesNotThrow(() -> MonsterCatalogManifestService.validateManifestRoot(root));
  }

  @Test
  void validateManifestRoot_rejectsMissingVersion() throws Exception {
    JsonNode root = objectMapper.readTree("""
        {
          "combatContractVersion": 1,
          "monsters": []
        }
        """);

    IllegalStateException exception = assertThrows(
        IllegalStateException.class,
        () -> MonsterCatalogManifestService.validateManifestRoot(root)
    );

    assertEquals("Manifest canônico de monstros sem manifestVersion.", exception.getMessage());
  }

  @Test
  void validateManifestRoot_rejectsIncompatibleVersion() throws Exception {
    JsonNode root = objectMapper.readTree("""
        {
          "manifestVersion": 999,
          "combatContractVersion": 1,
          "monsters": []
        }
        """);

    IllegalStateException exception = assertThrows(
        IllegalStateException.class,
        () -> MonsterCatalogManifestService.validateManifestRoot(root)
    );

    assertEquals(
        "Manifest canônico de monstros incompatível. Esperado=1, recebido=999.",
        exception.getMessage()
    );
  }

  @Test
  void validateManifestRoot_rejectsMissingCombatContractVersion() throws Exception {
    JsonNode root = objectMapper.readTree("""
        {
          "manifestVersion": 1,
          "monsters": []
        }
        """);

    IllegalStateException exception = assertThrows(
        IllegalStateException.class,
        () -> MonsterCatalogManifestService.validateManifestRoot(root)
    );

    assertEquals("Manifest canônico de monstros sem combatContractVersion.", exception.getMessage());
  }

  @Test
  void validateManifestRoot_rejectsIncompatibleCombatContractVersion() throws Exception {
    JsonNode root = objectMapper.readTree("""
        {
          "manifestVersion": 1,
          "combatContractVersion": 999,
          "monsters": []
        }
        """);

    IllegalStateException exception = assertThrows(
        IllegalStateException.class,
        () -> MonsterCatalogManifestService.validateManifestRoot(root)
    );

    assertEquals(
        "Contrato de combate de monstros incompatível. Esperado=1, recebido=999.",
        exception.getMessage()
    );
  }
}
