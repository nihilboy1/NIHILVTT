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
public class MonsterCatalogManifestService {
  private final Map<String, MonsterCatalogEntry> monstersById;

  public MonsterCatalogManifestService(ObjectMapper objectMapper) {
    this.monstersById = loadManifest(objectMapper).monsters().stream()
        .collect(Collectors.toUnmodifiableMap(MonsterCatalogEntry::id, Function.identity()));
  }

  public MonsterCatalogEntry requireKnownMonster(String monsterId) {
    MonsterCatalogEntry entry = monstersById.get(monsterId);
    if (entry == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Monstro não existe no catálogo canônico.");
    }
    return entry;
  }

  private MonsterCatalogManifest loadManifest(ObjectMapper objectMapper) {
    ClassPathResource resource = new ClassPathResource("catalog/monster-catalog-manifest.json");
    try (InputStream inputStream = resource.getInputStream()) {
      return objectMapper.readValue(inputStream, MonsterCatalogManifest.class);
    } catch (IOException exception) {
      throw new IllegalStateException("Não foi possível carregar o manifest canônico de monstros.", exception);
    }
  }

  @JsonIgnoreProperties(ignoreUnknown = true)
  private record MonsterCatalogManifest(List<MonsterCatalogEntry> monsters) {}

  @JsonIgnoreProperties(ignoreUnknown = true)
  public record MonsterCatalogEntry(
      String id,
      String primaryName,
      List<String> names,
      String tokenUrl,
      String splashArtUrl,
      String size,
      String creatureType,
      String alignment,
      MonsterCatalogAbilityScores abilityScores,
      Integer armorClass,
      Integer hitPointMaximum,
      MonsterCatalogSpeed speed,
      String challengeRating
  ) {}

  @JsonIgnoreProperties(ignoreUnknown = true)
  public record MonsterCatalogAbilityScores(
      Integer strength,
      Integer dexterity,
      Integer constitution,
      Integer intelligence,
      Integer wisdom,
      Integer charisma
  ) {}

  @JsonIgnoreProperties(ignoreUnknown = true)
  public record MonsterCatalogSpeed(
      Integer walk,
      Integer burrow,
      Integer climb,
      Integer fly,
      Integer swim,
      String unit
  ) {}
}
