package com.nihilvtt.auth.game.service;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

class ItemCatalogManifestServiceContractTest {
  private final ObjectMapper objectMapper = new ObjectMapper();

  @Test
  void validateManifestRoot_acceptsExpectedVersion() throws Exception {
    JsonNode root = objectMapper.readTree("""
        {
          "manifestVersion": 1,
          "items": []
        }
        """);

    assertDoesNotThrow(() -> ItemCatalogManifestService.validateManifestRoot(root));
  }

  @Test
  void validateManifestRoot_rejectsMissingVersion() throws Exception {
    JsonNode root = objectMapper.readTree("""
        {
          "items": []
        }
        """);

    IllegalStateException exception = assertThrows(
        IllegalStateException.class,
        () -> ItemCatalogManifestService.validateManifestRoot(root)
    );

    assertEquals("Manifest canônico de itens sem manifestVersion.", exception.getMessage());
  }

  @Test
  void validateManifestRoot_rejectsIncompatibleVersion() throws Exception {
    JsonNode root = objectMapper.readTree("""
        {
          "manifestVersion": 2,
          "items": []
        }
        """);

    IllegalStateException exception = assertThrows(
        IllegalStateException.class,
        () -> ItemCatalogManifestService.validateManifestRoot(root)
    );

    assertEquals(
        "Manifest canônico de itens incompatível. Esperado=1, recebido=2.",
        exception.getMessage()
    );
  }
}
