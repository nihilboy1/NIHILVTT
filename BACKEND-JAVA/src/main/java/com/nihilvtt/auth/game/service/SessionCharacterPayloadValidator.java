package com.nihilvtt.auth.game.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.util.Set;
import java.util.UUID;
import java.util.regex.Pattern;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

final class SessionCharacterPayloadValidator {
  private static final Set<String> SUPPORTED_CHARACTER_TYPES = Set.of("Player");
  private static final Set<String> ACTIVE_EFFECT_SOURCE_TYPES = Set.of("class", "feat", "item", "spell", "action");
  private static final Pattern CLASS_ID_PATTERN = Pattern.compile("^class-[a-z0-9-]+$");
  private static final Pattern ORIGIN_ID_PATTERN = Pattern.compile("^origin-[a-z0-9-]+$");
  private static final Pattern SPECIE_ID_PATTERN = Pattern.compile("^specie-[a-z0-9-]+$");
  private static final Pattern SUBCLASS_ID_PATTERN = Pattern.compile("^subclass-[a-z0-9-]+$");
  private static final Pattern CANONICAL_ID_PATTERN = Pattern.compile("^[a-z0-9]+(?:-[a-z0-9]+)+$");

  private SessionCharacterPayloadValidator() {
  }

  static void validateForCreate(ObjectNode characterNode) {
    validateRuntimeCharacterNode(characterNode);
  }

  static void validatePersistedCharacter(ObjectNode characterNode) {
    validateRuntimeCharacterNode(characterNode);
  }

  private static void validateRuntimeCharacterNode(ObjectNode characterNode) {
    requireUuid(characterNode.path("id"), "Id do personagem é inválido.");
    requireNonBlankText(characterNode.path("name"), "Nome do personagem é obrigatório.");

    String type = requireSupportedType(characterNode.path("type"));
    if (!"Player".equals(type) || !characterNode.path("build").isObject()) {
      throw invalid("A sessao aceita apenas PlayerCharacterState em runtime.");
    }

    validateRuntimePlayerCharacter(characterNode);
  }

  private static void validateRuntimePlayerCharacter(ObjectNode characterNode) {
    ObjectNode buildNode = requireObject(characterNode.path("build"), "Build do personagem é obrigatoria.");
    requirePattern(buildNode.path("classId"), CLASS_ID_PATTERN, "classId inválido.");
    requirePattern(buildNode.path("originId"), ORIGIN_ID_PATTERN, "originId inválido.");
    requirePattern(buildNode.path("specieId"), SPECIE_ID_PATTERN, "specieId inválido.");
    requireExplicitOptionalNullablePattern(buildNode, "subclassId", SUBCLASS_ID_PATTERN, "subclassId inválido.");
    JsonNode selectedFeatIdsNode = requireArray(buildNode.path("selectedFeatIds"), "selectedFeatIds inválido.");
    for (JsonNode featIdNode : selectedFeatIdsNode) {
      requirePattern(featIdNode, CANONICAL_ID_PATTERN, "selectedFeatIds contém id inválido.");
    }

    ObjectNode progressionNode = requireObject(
        characterNode.path("progression"),
        "Progressão do personagem é obrigatoria."
    );
    requireIntMin(progressionNode.path("currentLevel"), 1, "Nível atual inválido.");
    requireIntMin(progressionNode.path("pendingLevelUps"), 0, "pendingLevelUps inválido.");

    ObjectNode attributesNode = requireObject(
        characterNode.path("attributes"),
        "Atributos do personagem são obrigatorios."
    );
    ObjectNode baseAttributesNode = requireObject(
        attributesNode.path("base"),
        "Atributos base do personagem são obrigatorios."
    );
    validateAbilityScores(baseAttributesNode);

    ObjectNode hitPointsNode = requireObject(
        characterNode.path("hitPoints"),
        "hitPoints do personagem é obrigatorio."
    );
    requireIntMin(hitPointsNode.path("current"), 0, "HP atual inválido.");
    requireIntMin(hitPointsNode.path("max"), 1, "HP máximo inválido.");
    if (hitPointsNode.path("current").asInt() > hitPointsNode.path("max").asInt()) {
      throw invalid("HP atual não pode ser maior que HP máximo.");
    }
    if (!hitPointsNode.path("temporary").isMissingNode() && !hitPointsNode.path("temporary").isNull()) {
      requireIntMin(hitPointsNode.path("temporary"), 0, "HP temporário inválido.");
    }

    validateInventoryState(requireObject(characterNode.path("inventory"), "Inventário do personagem é obrigatorio."));
    validateEquipmentState(requireObject(characterNode.path("equipment"), "Equipment do personagem é obrigatorio."));
    validateResourcePoolsState(requireObject(characterNode.path("resourcePools"), "resourcePools do personagem é obrigatorio."));
    validateActiveEffectsState(requireObject(characterNode.path("activeEffects"), "activeEffects do personagem é obrigatorio."));

    if (!characterNode.path("inspiration").isMissingNode() && !characterNode.path("inspiration").isBoolean()) {
      throw invalid("Inspiration inválido.");
    }
  }

  private static void validateInventoryState(ObjectNode inventoryNode) {
    JsonNode itemsNode = requireArray(inventoryNode.path("items"), "Itens do inventário são obrigatórios.");
    for (JsonNode entryNode : itemsNode) {
      if (!(entryNode instanceof ObjectNode itemEntry)) {
        throw invalid("Entrada de inventário inválida.");
      }
      requirePattern(itemEntry.path("itemId"), CANONICAL_ID_PATTERN, "itemId de inventário inválido.");
      requireIntMin(itemEntry.path("quantity"), 1, "Quantidade de item inválida.");
    }
  }

  private static void validateEquipmentState(ObjectNode equipmentNode) {
    requireExplicitOptionalNullablePattern(equipmentNode, "bodyArmorItemId", CANONICAL_ID_PATTERN, "bodyArmorItemId inválido.");
    requireExplicitOptionalNullablePattern(equipmentNode, "shieldItemId", CANONICAL_ID_PATTERN, "shieldItemId inválido.");
    requireExplicitOptionalNullablePattern(equipmentNode, "mainHandWeaponId", CANONICAL_ID_PATTERN, "mainHandWeaponId inválido.");
    requireExplicitOptionalNullablePattern(equipmentNode, "offHandWeaponId", CANONICAL_ID_PATTERN, "offHandWeaponId inválido.");
  }

  private static void validateResourcePoolsState(ObjectNode resourcePoolsNode) {
    JsonNode poolsNode = requireArray(resourcePoolsNode.path("pools"), "Pontos de recurso são obrigatórios.");
    for (JsonNode entryNode : poolsNode) {
      if (!(entryNode instanceof ObjectNode poolEntry)) {
        throw invalid("Entrada de resource pool inválida.");
      }
      requirePattern(poolEntry.path("resourceId"), CANONICAL_ID_PATTERN, "resourceId inválido.");
      requireIntMin(poolEntry.path("current"), 0, "Valor atual de resource pool inválido.");
    }
  }

  private static void validateActiveEffectsState(ObjectNode activeEffectsNode) {
    JsonNode effectsNode = requireArray(activeEffectsNode.path("effects"), "Effects ativos são obrigatórios.");
    for (JsonNode entryNode : effectsNode) {
      if (!(entryNode instanceof ObjectNode effectEntry)) {
        throw invalid("Entrada de efeito ativo inválida.");
      }

      requireUuid(effectEntry.path("instanceId"), "instanceId de efeito ativo inválido.");
      ObjectNode sourceNode = requireObject(effectEntry.path("source"), "Source de efeito ativo é obrigatória.");
      String sourceType = requireNonBlankText(sourceNode.path("sourceType"), "sourceType inválido.");
      if (!ACTIVE_EFFECT_SOURCE_TYPES.contains(sourceType)) {
        throw invalid("sourceType inválido.");
      }
      requirePattern(sourceNode.path("sourceId"), CANONICAL_ID_PATTERN, "sourceId inválido.");
      requireIntMin(effectEntry.path("effectIndex"), 0, "effectIndex inválido.");
      requireOptionalNonBlankText(effectEntry.path("appliedByCharacterId"), "appliedByCharacterId inválido.");
      requireOptionalNonBlankText(effectEntry.path("linkedCondition"), "linkedCondition inválido.");
      requireIntMin(effectEntry.path("stackCount"), 1, "stackCount inválido.");
      if (!effectEntry.path("isSuppressed").isMissingNode() && !effectEntry.path("isSuppressed").isBoolean()) {
        throw invalid("isSuppressed inválido.");
      }

      JsonNode durationNode = effectEntry.path("remainingDuration");
      if (!durationNode.isMissingNode() && !durationNode.isNull()) {
        ObjectNode durationObject = requireObject(durationNode, "remainingDuration inválido.");
        requireOptionalNonBlankText(durationObject.path("unit"), "Unidade de duração inválida.");
        if (!durationObject.path("remaining").isMissingNode() && !durationObject.path("remaining").isNull()) {
          requireIntMin(durationObject.path("remaining"), 0, "remainingDuration.remaining inválido.");
        }
      }
    }
  }

  private static void validateAbilityScores(ObjectNode attributesNode) {
    requireAbility(attributesNode.path("strength"), "Força inválida.");
    requireAbility(attributesNode.path("dexterity"), "Destreza inválida.");
    requireAbility(attributesNode.path("constitution"), "Constituição inválida.");
    requireAbility(attributesNode.path("intelligence"), "Inteligência inválida.");
    requireAbility(attributesNode.path("wisdom"), "Sabedoria inválida.");
    requireAbility(attributesNode.path("charisma"), "Carisma inválido.");
  }

  private static void requireAbility(JsonNode node, String message) {
    requireIntRange(node, 1, 30, message);
  }

  private static String requireSupportedType(JsonNode node) {
    if (!node.isTextual()) {
      throw invalid("Tipo de personagem é obrigatório.");
    }
    String type = node.asText().trim();
    if (!SUPPORTED_CHARACTER_TYPES.contains(type)) {
      throw invalid("Tipo de personagem inválido.");
    }
    return type;
  }

  private static void requirePattern(JsonNode node, Pattern pattern, String message) {
    String value = requireNonBlankText(node, message);
    if (!pattern.matcher(value).matches()) {
      throw invalid(message);
    }
  }

  private static void requireOptionalNullablePattern(JsonNode node, Pattern pattern, String message) {
    if (node.isMissingNode() || node.isNull()) {
      return;
    }
    requirePattern(node, pattern, message);
  }

  private static void requireExplicitOptionalNullablePattern(
      ObjectNode parentNode,
      String fieldName,
      Pattern pattern,
      String message
  ) {
    if (!parentNode.has(fieldName)) {
      throw invalid(message);
    }
    requireOptionalNullablePattern(parentNode.get(fieldName), pattern, message);
  }

  private static void requireOptionalNonBlankText(JsonNode node, String message) {
    if (node.isMissingNode() || node.isNull()) {
      return;
    }
    requireNonBlankText(node, message);
  }

  private static String requireNonBlankText(JsonNode node, String message) {
    if (!node.isTextual()) {
      throw invalid(message);
    }
    String value = node.asText().trim();
    if (value.isBlank()) {
      throw invalid(message);
    }
    return value;
  }

  private static void requireUuid(JsonNode node, String message) {
    String value = requireNonBlankText(node, message);
    try {
      UUID.fromString(value);
    } catch (IllegalArgumentException exception) {
      throw invalid(message);
    }
  }

  private static ObjectNode requireObject(JsonNode node, String message) {
    if (node instanceof ObjectNode objectNode) {
      return objectNode;
    }
    throw invalid(message);
  }

  private static JsonNode requireArray(JsonNode node, String message) {
    if (node.isArray()) {
      return node;
    }
    throw invalid(message);
  }

  private static void requireIntMin(JsonNode node, int minValue, String message) {
    if (!node.isInt()) {
      throw invalid(message);
    }
    if (node.asInt() < minValue) {
      throw invalid(message);
    }
  }

  private static void requireIntRange(JsonNode node, int minValue, int maxValue, String message) {
    if (!node.isInt()) {
      throw invalid(message);
    }
    int value = node.asInt();
    if (value < minValue || value > maxValue) {
      throw invalid(message);
    }
  }

  private static ResponseStatusException invalid(String message) {
    return new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
  }
}
