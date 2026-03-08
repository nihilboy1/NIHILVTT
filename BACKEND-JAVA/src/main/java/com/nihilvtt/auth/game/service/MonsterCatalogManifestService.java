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
public class MonsterCatalogManifestService {
  private static final int EXPECTED_MANIFEST_VERSION = 1;
  private final Map<String, MonsterCatalogEntry> monstersById;

  public MonsterCatalogManifestService(ObjectMapper objectMapper) {
    MonsterCatalogManifest manifest = loadManifest(objectMapper);
    this.monstersById = manifest.monsters().stream()
        .collect(Collectors.toUnmodifiableMap(MonsterCatalogEntry::id, Function.identity()));
  }

  public MonsterCatalogEntry requireKnownMonster(String monsterId) {
    MonsterCatalogEntry entry = monstersById.get(monsterId);
    if (entry == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Monstro não existe no catálogo canônico.");
    }
    return entry;
  }

  public MonsterCatalogAttackAction requireKnownMonsterAttackAction(String monsterId, String actionIdRaw) {
    MonsterCatalogEntry monsterEntry = requireKnownMonster(monsterId);
    String actionId = actionIdRaw == null ? "" : actionIdRaw.trim();
    if (actionId.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ação de monstro é obrigatória.");
    }

    MonsterCatalogAttackAction action = monsterEntry.actions().stream()
        .filter(entry -> actionId.equals(entry.actionId()))
        .findFirst()
        .orElse(null);
    if (action == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ação de monstro não existe no catálogo canônico.");
    }

    return action;
  }

  private MonsterCatalogManifest loadManifest(ObjectMapper objectMapper) {
    ClassPathResource resource = new ClassPathResource("catalog/monster-catalog-manifest.json");
    try (InputStream inputStream = resource.getInputStream()) {
      JsonNode rootNode = objectMapper.readTree(inputStream);
      validateManifestRoot(rootNode);
      MonsterCatalogManifest manifest = objectMapper.treeToValue(rootNode, MonsterCatalogManifest.class);
      validateManifestData(manifest);
      return manifest;
    } catch (IOException exception) {
      throw new IllegalStateException("Não foi possível carregar o manifest canônico de monstros.", exception);
    }
  }

  static void validateManifestRoot(JsonNode rootNode) {
    if (rootNode == null || !rootNode.isObject()) {
      throw new IllegalStateException("Manifest canônico de monstros inválido: raiz não é objeto.");
    }

    JsonNode manifestVersionNode = rootNode.get("manifestVersion");
    if (manifestVersionNode == null || !manifestVersionNode.isInt()) {
      throw new IllegalStateException("Manifest canônico de monstros sem manifestVersion.");
    }

    int manifestVersion = manifestVersionNode.intValue();
    if (manifestVersion != EXPECTED_MANIFEST_VERSION) {
      throw new IllegalStateException(
          "Manifest canônico de monstros incompatível. Esperado="
              + EXPECTED_MANIFEST_VERSION
              + ", recebido="
              + manifestVersion
              + "."
      );
    }
  }

  private void validateManifestData(MonsterCatalogManifest manifest) {
    if (manifest == null) {
      throw new IllegalStateException("Manifest canônico de monstros ausente.");
    }

    if (manifest.monsters() == null) {
      throw new IllegalStateException("Manifest canônico de monstros sem lista de monsters.");
    }
  }

  @JsonIgnoreProperties(ignoreUnknown = true)
  private record MonsterCatalogManifest(Integer manifestVersion, List<MonsterCatalogEntry> monsters) {}

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
      MonsterCatalogDefenses defenses,
      String challengeRating,
      List<MonsterCatalogAttackAction> actions,
      List<MonsterCatalogPassiveEffect> automatedPassives
  ) {
    public MonsterCatalogEntry {
      names = names == null ? List.of() : List.copyOf(names);
      actions = actions == null ? List.of() : List.copyOf(actions);
      automatedPassives = automatedPassives == null ? List.of() : List.copyOf(automatedPassives);
    }

    public MonsterCatalogEntry(
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
    ) {
      this(
          id,
          primaryName,
          names,
          tokenUrl,
          splashArtUrl,
          size,
          creatureType,
          alignment,
          abilityScores,
          armorClass,
          hitPointMaximum,
          speed,
          new MonsterCatalogDefenses(List.of(), List.of(), List.of()),
          challengeRating,
          List.of(),
          List.of()
      );
    }

    public MonsterCatalogEntry(
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
        MonsterCatalogDefenses defenses,
        String challengeRating,
        List<MonsterCatalogAttackAction> actions
    ) {
      this(
          id,
          primaryName,
          names,
          tokenUrl,
          splashArtUrl,
          size,
          creatureType,
          alignment,
          abilityScores,
          armorClass,
          hitPointMaximum,
          speed,
          defenses,
          challengeRating,
          actions,
          List.of()
      );
    }
  }

  @JsonIgnoreProperties(ignoreUnknown = true)
  public record MonsterCatalogDefenses(
      List<String> resistances,
      List<String> vulnerabilities,
      List<String> damageImmunities
  ) {
    public MonsterCatalogDefenses {
      resistances = resistances == null ? List.of() : List.copyOf(resistances);
      vulnerabilities = vulnerabilities == null ? List.of() : List.copyOf(vulnerabilities);
      damageImmunities = damageImmunities == null ? List.of() : List.copyOf(damageImmunities);
    }
  }

  @JsonIgnoreProperties(ignoreUnknown = true)
  public record MonsterCatalogAttackAction(
      String actionId,
      String name,
      Integer attackBonus,
      String damageFormula,
      String damageType,
      Double rangeMeters,
      List<MonsterCatalogConditionalDamage> conditionalDamageBonuses,
      List<MonsterCatalogConditionalCondition> conditionalAppliedConditions
  ) {
    public MonsterCatalogAttackAction {
      conditionalDamageBonuses = conditionalDamageBonuses == null ? List.of() : List.copyOf(conditionalDamageBonuses);
      conditionalAppliedConditions = conditionalAppliedConditions == null ? List.of() : List.copyOf(conditionalAppliedConditions);
    }

    public MonsterCatalogAttackAction(
        String actionId,
        String name,
        Integer attackBonus,
        String damageFormula,
        String damageType,
        Double rangeMeters
    ) {
      this(
          actionId,
          name,
          attackBonus,
          damageFormula,
          damageType,
          rangeMeters,
          List.of(),
          List.of()
      );
    }
  }

  @JsonIgnoreProperties(ignoreUnknown = true)
  public record MonsterCatalogPassiveEffect(
      String type,
      String on,
      String name,
      List<String> appliesToActionIds,
      MonsterCatalogTriggerHasAllyNearby triggerHasAllyNearby
  ) {
    public MonsterCatalogPassiveEffect {
      appliesToActionIds = appliesToActionIds == null ? List.of() : List.copyOf(appliesToActionIds);
    }
  }

  @JsonIgnoreProperties(ignoreUnknown = true)
  public record MonsterCatalogTriggerHasAllyNearby(
      Double rangeMeters,
      Boolean allyIsNotIncapacitated
  ) {}

  @JsonIgnoreProperties(ignoreUnknown = true)
  public record MonsterCatalogConditionalDamage(
      String damageFormula,
      String damageType,
      Double requiresUserMovementAtLeastMeters
  ) {}

  @JsonIgnoreProperties(ignoreUnknown = true)
  public record MonsterCatalogConditionalCondition(
      String condition,
      Double requiresUserMovementAtLeastMeters
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
