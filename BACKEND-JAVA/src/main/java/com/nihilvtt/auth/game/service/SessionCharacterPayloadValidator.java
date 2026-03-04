package com.nihilvtt.auth.game.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.util.Set;
import java.util.UUID;
import java.util.regex.Pattern;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

final class SessionCharacterPayloadValidator {
  private static final Set<String> SUPPORTED_CHARACTER_TYPES = Set.of("Player", "NPC");
  private static final Set<String> ACTIVE_EFFECT_SOURCE_TYPES = Set.of("class", "feat", "item", "spell", "action");
  private static final Pattern CLASS_ID_PATTERN = Pattern.compile("^class-[a-z0-9-]+$");
  private static final Pattern MONSTER_ID_PATTERN = Pattern.compile("^monster-[a-z0-9-]+$");
  private static final Pattern ORIGIN_ID_PATTERN = Pattern.compile("^origin-[a-z0-9-]+$");
  private static final Pattern SPECIE_ID_PATTERN = Pattern.compile("^specie-[a-z0-9-]+$");
  private static final Pattern SUBCLASS_ID_PATTERN = Pattern.compile("^subclass-[a-z0-9-]+$");
  private static final Pattern CANONICAL_ID_PATTERN = Pattern.compile("^[a-z0-9]+(?:-[a-z0-9]+)+$");

  private SessionCharacterPayloadValidator() {
  }

  static void validateForCreate(ObjectNode characterNode) {
    String type = requireSessionCharacterEnvelope(characterNode);
    if (!"Player".equals(type)) {
      throw invalid("A criação genérica aceita apenas PlayerCharacterState em runtime.");
    }

    validateRuntimeCharacterByType(type, characterNode, "A criação genérica aceita apenas PlayerCharacterState em runtime.");
  }

  static void validateMonsterForCreate(ObjectNode characterNode) {
    validateRuntimeMonsterCharacter(characterNode);
    if (characterNode.has("controlledByUserId")) {
      throw invalid("MonsterCharacterState não aceita controlledByUserId.");
    }
  }

  static void validatePersistedCharacter(ObjectNode characterNode) {
    String type = requireSessionCharacterEnvelope(characterNode);
    validateRuntimeCharacterByType(type, characterNode, "A sessão aceita apenas PlayerCharacterState em runtime.");
  }

  private static void validateRuntimeMonsterCharacter(ObjectNode characterNode) {
    requirePattern(requireField(characterNode, "monsterId", "monsterId inválido."), MONSTER_ID_PATTERN, "monsterId inválido.");
    requireExplicitOptionalNullableText(characterNode, "nameOverride", "nameOverride inválido.");
    requireExplicitOptionalNullableText(characterNode, "imageOverride", "imageOverride inválido.");
    requireExplicitOptionalNullableText(characterNode, "notes", "notes inválido.");

    ObjectNode hitPointsNode = requireExplicitObject(characterNode, "hitPoints", "hitPoints do monstro é obrigatório.");
    requireExplicitIntMin(hitPointsNode, "current", 0, "HP atual inválido.");
    requireExplicitIntMin(hitPointsNode, "temporary", 0, "HP temporário inválido.");

    validateResourcePoolsState(requireExplicitObject(characterNode, "resourcePools", "resourcePools do monstro é obrigatório."));
    validateActiveEffectsState(requireExplicitObject(characterNode, "activeEffects", "activeEffects do monstro é obrigatório."));
  }

  private static void validateRuntimePlayerCharacter(ObjectNode characterNode) {
    ObjectNode buildNode = requireExplicitObject(characterNode, "build", "Build do personagem é obrigatoria.");
    requirePattern(requireField(buildNode, "classId", "classId inválido."), CLASS_ID_PATTERN, "classId inválido.");
    requirePattern(requireField(buildNode, "originId", "originId inválido."), ORIGIN_ID_PATTERN, "originId inválido.");
    requirePattern(requireField(buildNode, "specieId", "specieId inválido."), SPECIE_ID_PATTERN, "specieId inválido.");
    requireExplicitOptionalNullablePattern(buildNode, "subclassId", SUBCLASS_ID_PATTERN, "subclassId inválido.");
    JsonNode selectedFeatIdsNode = requireExplicitArray(buildNode, "selectedFeatIds", "selectedFeatIds inválido.");
    for (JsonNode featIdNode : selectedFeatIdsNode) {
      requirePattern(featIdNode, CANONICAL_ID_PATTERN, "selectedFeatIds contém id inválido.");
    }

    ObjectNode progressionNode = requireExplicitObject(
        characterNode,
        "progression",
        "Progressão do personagem é obrigatoria."
    );
    requireExplicitIntMin(progressionNode, "currentLevel", 1, "Nível atual inválido.");
    requireExplicitIntMin(progressionNode, "pendingLevelUps", 0, "pendingLevelUps inválido.");

    ObjectNode attributesNode = requireExplicitObject(
        characterNode,
        "attributes",
        "Atributos do personagem são obrigatorios."
    );
    ObjectNode baseAttributesNode = requireExplicitObject(
        attributesNode,
        "base",
        "Atributos base do personagem são obrigatorios."
    );
    validateAbilityScores(baseAttributesNode);

    ObjectNode hitPointsNode = requireExplicitObject(
        characterNode,
        "hitPoints",
        "hitPoints do personagem é obrigatorio."
    );
    requireExplicitIntMin(hitPointsNode, "current", 0, "HP atual inválido.");
    requireExplicitIntMin(hitPointsNode, "max", 1, "HP máximo inválido.");
    if (hitPointsNode.path("current").asInt() > hitPointsNode.path("max").asInt()) {
      throw invalid("HP atual não pode ser maior que HP máximo.");
    }
    requireExplicitIntMin(hitPointsNode, "temporary", 0, "HP temporário inválido.");

    JsonNode controlledByUserIdNode = requireField(characterNode, "controlledByUserId", "controlledByUserId inválido.");
    if (controlledByUserIdNode != null && !controlledByUserIdNode.isNull()) {
      requireLongMin(controlledByUserIdNode, 1L, "controlledByUserId inválido.");
    }

    validateInventoryState(requireExplicitObject(characterNode, "inventory", "Inventário do personagem é obrigatorio."));
    validateEquipmentState(requireExplicitObject(characterNode, "equipment", "Equipment do personagem é obrigatorio."));
    validateResourcePoolsState(requireExplicitObject(characterNode, "resourcePools", "resourcePools do personagem é obrigatorio."));
    validateActiveEffectsState(requireExplicitObject(characterNode, "activeEffects", "activeEffects do personagem é obrigatorio."));

    requireExplicitBoolean(characterNode, "inspiration", "Inspiration inválido.");
  }

  private static String requireSessionCharacterEnvelope(ObjectNode characterNode) {
    requireUuid(characterNode.path("id"), "Id do personagem é inválido.");
    return requireSupportedType(characterNode.path("type"));
  }

  private static void validateRuntimeCharacterByType(
      String type,
      ObjectNode characterNode,
      String playerRuntimeContractMessage
  ) {
    if ("Player".equals(type)) {
      requireNonBlankText(characterNode.path("name"), "Nome do personagem é obrigatório.");
      if (!characterNode.has("build")) {
        throw invalid(playerRuntimeContractMessage);
      }

      validateRuntimePlayerCharacter(characterNode);
      return;
    }

    validateRuntimeMonsterCharacter(characterNode);
  }

  private static void validateInventoryState(ObjectNode inventoryNode) {
    JsonNode itemsNode = requireExplicitArray(inventoryNode, "items", "Itens do inventário são obrigatórios.");
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
    JsonNode poolsNode = requireExplicitArray(resourcePoolsNode, "pools", "Pontos de recurso são obrigatórios.");
    for (JsonNode entryNode : poolsNode) {
      if (!(entryNode instanceof ObjectNode poolEntry)) {
        throw invalid("Entrada de resource pool inválida.");
      }
      requirePattern(poolEntry.path("resourceId"), CANONICAL_ID_PATTERN, "resourceId inválido.");
      requireIntMin(poolEntry.path("current"), 0, "Valor atual de resource pool inválido.");
    }
  }

  private static void validateActiveEffectsState(ObjectNode activeEffectsNode) {
    JsonNode effectsNode = requireExplicitArray(activeEffectsNode, "effects", "Effects ativos são obrigatórios.");
    for (JsonNode entryNode : effectsNode) {
      if (!(entryNode instanceof ObjectNode effectEntry)) {
        throw invalid("Entrada de efeito ativo inválida.");
      }

      requireUuid(requireField(effectEntry, "instanceId", "instanceId de efeito ativo inválido."), "instanceId de efeito ativo inválido.");
      ObjectNode sourceNode = requireExplicitObject(effectEntry, "source", "Source de efeito ativo é obrigatória.");
      String sourceType = requireNonBlankText(requireField(sourceNode, "sourceType", "sourceType inválido."), "sourceType inválido.");
      if (!ACTIVE_EFFECT_SOURCE_TYPES.contains(sourceType)) {
        throw invalid("sourceType inválido.");
      }
      requirePattern(requireField(sourceNode, "sourceId", "sourceId inválido."), CANONICAL_ID_PATTERN, "sourceId inválido.");
      requireExplicitIntMin(effectEntry, "effectIndex", 0, "effectIndex inválido.");
      requireOptionalNonBlankText(effectEntry.path("appliedByCharacterId"), "appliedByCharacterId inválido.");
      requireOptionalNonBlankText(effectEntry.path("linkedCondition"), "linkedCondition inválido.");
      requireExplicitIntMin(effectEntry, "stackCount", 1, "stackCount inválido.");
      requireExplicitBoolean(effectEntry, "isSuppressed", "isSuppressed inválido.");

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

  private static void requireExplicitOptionalNullableText(
      ObjectNode parentNode,
      String fieldName,
      String message
  ) {
    if (!parentNode.has(fieldName)) {
      throw invalid(message);
    }

    JsonNode valueNode = parentNode.get(fieldName);
    if (valueNode == null || valueNode.isNull()) {
      return;
    }

    requireNonBlankText(valueNode, message);
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

  private static void requireLongMin(JsonNode node, long minValue, String message) {
    if (!node.canConvertToLong()) {
      throw invalid(message);
    }
    if (node.asLong() < minValue) {
      throw invalid(message);
    }
  }

  private static ResponseStatusException invalid(String message) {
    return new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
  }

  private static JsonNode requireField(ObjectNode parentNode, String fieldName, String message) {
    if (!parentNode.has(fieldName)) {
      throw invalid(message);
    }
    return parentNode.get(fieldName);
  }

  private static ObjectNode requireExplicitObject(ObjectNode parentNode, String fieldName, String message) {
    return requireObject(requireField(parentNode, fieldName, message), message);
  }

  private static JsonNode requireExplicitArray(ObjectNode parentNode, String fieldName, String message) {
    return requireArray(requireField(parentNode, fieldName, message), message);
  }

  private static void requireExplicitIntMin(ObjectNode parentNode, String fieldName, int minValue, String message) {
    requireIntMin(requireField(parentNode, fieldName, message), minValue, message);
  }

  private static void requireExplicitBoolean(ObjectNode parentNode, String fieldName, String message) {
    JsonNode node = requireField(parentNode, fieldName, message);
    if (!node.isBoolean()) {
      throw invalid(message);
    }
  }
}
