package com.nihilvtt.auth.game.service;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
      return objectMapper.readValue(inputStream, ItemCatalogManifest.class);
    } catch (IOException exception) {
      throw new IllegalStateException("Não foi possível carregar o manifest canônico de itens.", exception);
    }
  }

  @JsonIgnoreProperties(ignoreUnknown = true)
  private record ItemCatalogManifest(List<ItemCatalogEntry> items) {}

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
