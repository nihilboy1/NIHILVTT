package com.nihilvtt.auth.game.service;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ItemCatalogManifestService {
  private static final int EXPECTED_MANIFEST_VERSION = 1;
  private final Map<String, ItemCatalogEntry> itemsById;

  public ItemCatalogManifestService(ObjectMapper objectMapper) {
    this.itemsById = loadManifest(objectMapper).items().stream()
        .collect(Collectors.toUnmodifiableMap(ItemCatalogEntry::id, Function.identity()));
  }

  public ItemCatalogEntry requireKnownItem(String itemId) {
    ItemCatalogEntry entry = itemsById.get(itemId);
    if (entry == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Item não existe no catálogo canônico.");
    }
    return entry;
  }

  private ItemCatalogManifest loadManifest(ObjectMapper objectMapper) {
    ClassPathResource resource = new ClassPathResource("catalog/item-catalog-manifest.json");
    try (InputStream inputStream = resource.getInputStream()) {
      JsonNode rootNode = objectMapper.readTree(inputStream);
      validateManifestRoot(rootNode);
      ItemCatalogManifest manifest = objectMapper.treeToValue(rootNode, ItemCatalogManifest.class);
      validateManifestData(manifest);
      return manifest;
    } catch (IOException exception) {
      throw new IllegalStateException("Não foi possível carregar o manifest canônico de itens.", exception);
    }
  }

  static void validateManifestRoot(JsonNode rootNode) {
    if (rootNode == null || !rootNode.isObject()) {
      throw new IllegalStateException("Manifest canônico de itens inválido: raiz não é objeto.");
    }

    JsonNode manifestVersionNode = rootNode.get("manifestVersion");
    if (manifestVersionNode == null || !manifestVersionNode.isInt()) {
      throw new IllegalStateException("Manifest canônico de itens sem manifestVersion.");
    }

    int manifestVersion = manifestVersionNode.intValue();
    if (manifestVersion != EXPECTED_MANIFEST_VERSION) {
      throw new IllegalStateException(
          "Manifest canônico de itens incompatível. Esperado="
              + EXPECTED_MANIFEST_VERSION
              + ", recebido="
              + manifestVersion
              + "."
      );
    }
  }

  private void validateManifestData(ItemCatalogManifest manifest) {
    if (manifest == null) {
      throw new IllegalStateException("Manifest canônico de itens ausente.");
    }

    if (manifest.items() == null) {
      throw new IllegalStateException("Manifest canônico de itens sem lista de items.");
    }
  }

  @JsonIgnoreProperties(ignoreUnknown = true)
  private record ItemCatalogManifest(Integer manifestVersion, List<ItemCatalogEntry> items) {}

  @JsonIgnoreProperties(ignoreUnknown = true)
  public record ItemCatalogEntry(
      String id,
      String type,
      String armorType,
      String acCalculationType,
      Integer acValue,
      Integer acBase,
      String acAttribute,
      Integer acMaxBonus
  ) {}
}
