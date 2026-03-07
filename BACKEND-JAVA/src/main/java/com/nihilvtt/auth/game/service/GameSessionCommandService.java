package com.nihilvtt.auth.game.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.nihilvtt.auth.game.dto.GameSessionEventResponse;
import com.nihilvtt.auth.game.entity.GameEntity;
import com.nihilvtt.auth.game.entity.GameMemberEntity;
import com.nihilvtt.auth.game.entity.GameSessionStateEntity;
import com.nihilvtt.auth.game.repository.GameMemberRepository;
import com.nihilvtt.auth.game.repository.GameSessionStateRepository;
import java.time.Instant;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class GameSessionCommandService {
  private static final Logger logger = LoggerFactory.getLogger(GameSessionCommandService.class);
  private static final int MAX_MESSAGES = 300;
  private static final int DEFAULT_MOVEMENT_CELLS = 6;
  private static final int MAX_DICE_COUNT = 100;
  private static final int MAX_DICE_SIDES = 100;
  private static final int MAX_TOTAL_DICE_ROLLS = 500;
  private static final double MOVEMENT_METERS_PER_CELL = 1.5;
  private static final Pattern TERM_PATTERN = Pattern.compile("[+-]?[^+-]+");
  private static final Pattern DICE_TERM_PATTERN = Pattern.compile("^\\d+d\\d+$");
  private static final Pattern INTEGER_PATTERN = Pattern.compile("^\\d+$");
  private static final Set<String> ALLOWED_CATEGORIES = Set.of(
      "Attack",
      "Damage",
      "Attribute",
      "Skill",
      "Saving Throw",
      "Generic"
  );

  private final GameAccessService gameAccessService;
  private final GameMemberRepository gameMemberRepository;
  private final GameSessionStateRepository gameSessionStateRepository;
  private final ObjectMapper objectMapper;
  private final SimpMessagingTemplate messagingTemplate;
  private final ItemCatalogManifestService itemCatalogManifestService;
  private final MonsterCatalogManifestService monsterCatalogManifestService;

  public GameSessionCommandService(
      GameAccessService gameAccessService,
      GameMemberRepository gameMemberRepository,
      GameSessionStateRepository gameSessionStateRepository,
      ObjectMapper objectMapper,
      SimpMessagingTemplate messagingTemplate,
      ItemCatalogManifestService itemCatalogManifestService,
      MonsterCatalogManifestService monsterCatalogManifestService
  ) {
    this.gameAccessService = gameAccessService;
    this.gameMemberRepository = gameMemberRepository;
    this.gameSessionStateRepository = gameSessionStateRepository;
    this.objectMapper = objectMapper;
    this.messagingTemplate = messagingTemplate;
    this.itemCatalogManifestService = itemCatalogManifestService;
    this.monsterCatalogManifestService = monsterCatalogManifestService;
  }

  @Transactional
  public GameSessionEventResponse appendChatMessage(Long userId, Long gameId, String text) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, userId);

    String normalizedText = text == null ? "" : text.trim();
    if (normalizedText.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Mensagem é obrigatória.");
    }

    Instant createdAt = Instant.now();
    SenderInfo sender = resolveSenderInfo(game, userId);

    ObjectNode messageNode = objectMapper.createObjectNode();
    messageNode.put("id", UUID.randomUUID().toString());
    messageNode.put("sender", sender.name());
    messageNode.put("senderUserId", userId);
    messageNode.put("senderColor", sender.colorHex());
    messageNode.put("text", normalizedText);
    messageNode.put("timestamp", createdAt.toString());
    messageNode.put("isDiceRoll", false);

    return appendMessageAndPublish(game, userId, messageNode, "CHAT_MESSAGE_CREATED", createdAt);
  }

  @Transactional
  public GameSessionEventResponse appendDiceRoll(
      Long userId,
      Long gameId,
      String formula,
      String rollName,
      String category
  ) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, userId);

    String normalizedFormula = normalizeFormula(formula);
    String normalizedCategory = normalizeCategory(category);
    String normalizedRollName = (rollName == null || rollName.trim().isBlank())
        ? normalizedFormula
        : rollName.trim();

    DiceRollResult rollResult = rollDiceFormula(normalizedFormula, normalizedRollName, normalizedCategory);

    Instant createdAt = Instant.now();
    SenderInfo sender = resolveSenderInfo(game, userId);

    ObjectNode messageNode = objectMapper.createObjectNode();
    messageNode.put("id", UUID.randomUUID().toString());
    messageNode.put("sender", sender.name());
    messageNode.put("senderUserId", userId);
    messageNode.put("senderColor", sender.colorHex());
    messageNode.put("text", "");
    messageNode.put("timestamp", createdAt.toString());
    messageNode.put("isDiceRoll", true);
    messageNode.set("diceRollDetails", rollResult.detailsNode());

    return appendMessageAndPublish(game, userId, messageNode, "DICE_ROLLED", createdAt);
  }

  @Transactional
  public GameSessionEventResponse clearChatHistory(Long userId, Long gameId) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, userId);
    if (!game.getOwner().getId().equals(userId)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Apenas o mestre pode limpar o chat.");
    }

    GameSessionStateEntity sessionState = gameSessionStateRepository.findByGameId(gameId)
        .orElseGet(() -> initializeSessionState(game));

    ObjectNode rootNode = parseStateAsObject(sessionState, gameId);
    rootNode.putArray("messages");

    Instant createdAt = Instant.now();
    sessionState.setVersion(sessionState.getVersion() + 1);
    sessionState.setStateJson(toJson(rootNode));
    gameSessionStateRepository.save(sessionState);

    ObjectNode payloadNode = objectMapper.createObjectNode();
    payloadNode.put("cleared", true);

    GameSessionEventResponse event = new GameSessionEventResponse(
        UUID.randomUUID().toString(),
        gameId,
        sessionState.getVersion(),
        "CHAT_HISTORY_CLEARED",
        userId,
        payloadNode,
        createdAt
    );

    messagingTemplate.convertAndSend(gameTopic(gameId), event);
    return event;
  }

  @Transactional
  public GameSessionEventResponse moveToken(Long userId, Long gameId, String tokenIdRaw, Integer x, Integer y) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, userId);

    String tokenId = tokenIdRaw == null ? "" : tokenIdRaw.trim();
    if (tokenId.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token é obrigatório.");
    }
    if (x == null || x < 0 || y == null || y < 0) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Posição inválida.");
    }

    GameSessionStateEntity sessionState = gameSessionStateRepository.findByGameId(gameId)
        .orElseGet(() -> initializeSessionState(game));
    ObjectNode rootNode = parseStateAsObject(sessionState, gameId);
    ArrayNode tokensNode = ensureArray(rootNode, "tokens");
    ArrayNode charactersNode = ensureArray(rootNode, "characters");

    ObjectNode movedToken = findTokenById(tokensNode, tokenId);
    if (movedToken == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Token não encontrado na sessão.");
    }

    ensureUserCanControlToken(game, userId, tokensNode, charactersNode, tokenId);

    ensureCombatMovementAllowed(rootNode, tokenId);

    ObjectNode combatState = getActiveCombatState(rootNode);
    if (combatState != null) {
      consumeMovementForActiveParticipant(combatState, rootNode, tokensNode, movedToken, x, y);
    }

    ObjectNode positionNode = objectMapper.createObjectNode();
    positionNode.put("x", x);
    positionNode.put("y", y);
    movedToken.set("position", positionNode);

    Instant createdAt = Instant.now();
    sessionState.setVersion(sessionState.getVersion() + 1);
    sessionState.setStateJson(toJson(rootNode));
    gameSessionStateRepository.save(sessionState);

    ObjectNode payloadNode = objectMapper.createObjectNode();
    payloadNode.put("tokenId", tokenId);
    payloadNode.set("position", positionNode);
    payloadNode.put("combatChanged", combatState != null);
    if (combatState == null) {
      payloadNode.putNull("combat");
    } else {
      payloadNode.set("combat", combatState.deepCopy());
    }

    GameSessionEventResponse event = new GameSessionEventResponse(
        UUID.randomUUID().toString(),
        gameId,
        sessionState.getVersion(),
        "TOKEN_MOVED",
        userId,
        payloadNode,
        createdAt
    );

    messagingTemplate.convertAndSend(gameTopic(gameId), event);
    return event;
  }

  @Transactional
  public GameSessionEventResponse createToken(
      Long userId,
      Long gameId,
      String characterIdRaw,
      String sceneIdRaw,
      Integer x,
      Integer y
  ) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, userId);

    String characterId = characterIdRaw == null ? "" : characterIdRaw.trim();
    String sceneId = sceneIdRaw == null ? "" : sceneIdRaw.trim();
    if (characterId.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Character é obrigatório.");
    }
    if (sceneId.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Scene é obrigatória.");
    }
    if (x == null || x < 0 || y == null || y < 0) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Posição inválida.");
    }

    GameSessionStateEntity sessionState = gameSessionStateRepository.findByGameId(gameId)
        .orElseGet(() -> initializeSessionState(game));
    ObjectNode rootNode = parseStateAsObject(sessionState, gameId);
    ArrayNode charactersNode = ensureArray(rootNode, "characters");
    ArrayNode tokensNode = ensureArray(rootNode, "tokens");

    ObjectNode characterNode = findCharacterById(charactersNode, characterId);
    if (characterNode == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Personagem não encontrado na sessão.");
    }
    ensureUserCanInstantiateCharacterToken(game, userId, characterNode);

    ObjectNode tokenNode = objectMapper.createObjectNode();
    tokenNode.put("id", UUID.randomUUID().toString());
    tokenNode.put("characterId", characterId);
    tokenNode.put("sceneId", sceneId);
    ObjectNode positionNode = objectMapper.createObjectNode();
    positionNode.put("x", x);
    positionNode.put("y", y);
    tokenNode.set("position", positionNode);
    tokensNode.add(tokenNode);

    Instant createdAt = Instant.now();
    sessionState.setVersion(sessionState.getVersion() + 1);
    sessionState.setStateJson(toJson(rootNode));
    gameSessionStateRepository.save(sessionState);

    ObjectNode payloadNode = objectMapper.createObjectNode();
    payloadNode.set("token", tokenNode);
    payloadNode.putNull("character");

    GameSessionEventResponse event = new GameSessionEventResponse(
        UUID.randomUUID().toString(),
        gameId,
        sessionState.getVersion(),
        "TOKEN_CREATED",
        userId,
        payloadNode,
        createdAt
    );

    messagingTemplate.convertAndSend(gameTopic(gameId), event);
    return event;
  }

  @Transactional
  public GameSessionEventResponse removeToken(Long userId, Long gameId, String tokenIdRaw) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, userId);
    if (!game.getOwner().getId().equals(userId)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Apenas o mestre pode remover tokens da mesa.");
    }

    String tokenId = tokenIdRaw == null ? "" : tokenIdRaw.trim();
    if (tokenId.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token é obrigatório.");
    }

    GameSessionStateEntity sessionState = gameSessionStateRepository.findByGameId(gameId)
        .orElseGet(() -> initializeSessionState(game));
    ObjectNode rootNode = parseStateAsObject(sessionState, gameId);
    ArrayNode tokensNode = ensureArray(rootNode, "tokens");
    ArrayNode charactersNode = ensureArray(rootNode, "characters");

    int tokenIndex = findTokenIndexById(tokensNode, tokenId);
    if (tokenIndex < 0) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Token não encontrado na sessão.");
    }
    JsonNode removedTokenNode = tokensNode.get(tokenIndex);
    String removedCharacterId = removedTokenNode == null ? "" : removedTokenNode.path("characterId").asText("").trim();
    tokensNode.remove(tokenIndex);

    String removedCloneCharacterId = null;
    if (!removedCharacterId.isBlank() && !hasAnyTokenForCharacter(tokensNode, removedCharacterId)) {
      int characterIndex = findCharacterIndexById(charactersNode, removedCharacterId);
      if (characterIndex >= 0) {
        JsonNode characterNode = charactersNode.get(characterIndex);
        if (characterNode instanceof ObjectNode characterObject
            && characterObject.path("isSessionClone").asBoolean(false)) {
          charactersNode.remove(characterIndex);
          removedCloneCharacterId = removedCharacterId;
        }
      }
    }

    CombatSyncResult combatSync = syncCombatStateAfterRemovedTokenIds(rootNode, List.of(tokenId));

    Instant createdAt = Instant.now();
    sessionState.setVersion(sessionState.getVersion() + 1);
    sessionState.setStateJson(toJson(rootNode));
    gameSessionStateRepository.save(sessionState);

    ObjectNode payloadNode = objectMapper.createObjectNode();
    payloadNode.put("tokenId", tokenId);
    if (removedCloneCharacterId == null) {
      payloadNode.putNull("removedCharacterId");
    } else {
      payloadNode.put("removedCharacterId", removedCloneCharacterId);
    }
    payloadNode.put("combatChanged", combatSync.touched());
    if (combatSync.touched()) {
      payloadNode.set("combat", combatSync.combatNode());
    } else {
      payloadNode.putNull("combat");
    }

    GameSessionEventResponse event = new GameSessionEventResponse(
        UUID.randomUUID().toString(),
        gameId,
        sessionState.getVersion(),
        "TOKEN_REMOVED",
        userId,
        payloadNode,
        createdAt
    );

    messagingTemplate.convertAndSend(gameTopic(gameId), event);
    return event;
  }

  @Transactional
  public GameSessionEventResponse removeTokens(Long userId, Long gameId, List<String> tokenIdsRaw) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, userId);
    if (!game.getOwner().getId().equals(userId)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Apenas o mestre pode remover tokens da mesa.");
    }

    List<String> tokenIds = normalizeRequiredTokenIds(tokenIdsRaw);

    GameSessionStateEntity sessionState = gameSessionStateRepository.findByGameId(gameId)
        .orElseGet(() -> initializeSessionState(game));
    ObjectNode rootNode = parseStateAsObject(sessionState, gameId);
    ArrayNode tokensNode = ensureArray(rootNode, "tokens");
    ArrayNode charactersNode = ensureArray(rootNode, "characters");

    ArrayNode removedTokenIdsNode = objectMapper.createArrayNode();
    ArrayNode removedCharacterIdsNode = objectMapper.createArrayNode();
    List<String> removedTokenIds = new ArrayList<>();

    for (String tokenId : tokenIds) {
      int tokenIndex = findTokenIndexById(tokensNode, tokenId);
      if (tokenIndex < 0) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Token não encontrado na sessão.");
      }

      JsonNode removedTokenNode = tokensNode.get(tokenIndex);
      String removedCharacterId = removedTokenNode == null ? "" : removedTokenNode.path("characterId").asText("").trim();
      tokensNode.remove(tokenIndex);
      removedTokenIds.add(tokenId);
      removedTokenIdsNode.add(tokenId);

      if (!removedCharacterId.isBlank() && !hasAnyTokenForCharacter(tokensNode, removedCharacterId)) {
        int characterIndex = findCharacterIndexById(charactersNode, removedCharacterId);
        if (characterIndex >= 0) {
          JsonNode characterNode = charactersNode.get(characterIndex);
          if (characterNode instanceof ObjectNode characterObject
              && characterObject.path("isSessionClone").asBoolean(false)) {
            charactersNode.remove(characterIndex);
            removedCharacterIdsNode.add(removedCharacterId);
          }
        }
      }
    }

    CombatSyncResult combatSync = syncCombatStateAfterRemovedTokenIds(rootNode, removedTokenIds);

    Instant createdAt = Instant.now();
    sessionState.setVersion(sessionState.getVersion() + 1);
    sessionState.setStateJson(toJson(rootNode));
    gameSessionStateRepository.save(sessionState);

    ObjectNode payloadNode = objectMapper.createObjectNode();
    payloadNode.set("tokenIds", removedTokenIdsNode);
    payloadNode.set("removedCharacterIds", removedCharacterIdsNode);
    payloadNode.put("combatChanged", combatSync.touched());
    if (combatSync.touched()) {
      payloadNode.set("combat", combatSync.combatNode());
    } else {
      payloadNode.putNull("combat");
    }

    GameSessionEventResponse event = new GameSessionEventResponse(
        UUID.randomUUID().toString(),
        gameId,
        sessionState.getVersion(),
        "TOKENS_REMOVED",
        userId,
        payloadNode,
        createdAt
    );

    messagingTemplate.convertAndSend(gameTopic(gameId), event);
    return event;
  }

  @Transactional
  public GameSessionEventResponse publishMemberRevoked(Long ownerUserId, Long gameId, Long revokedMemberUserId) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, ownerUserId);

    GameSessionStateEntity sessionState = gameSessionStateRepository.findByGameId(gameId)
        .orElseGet(() -> initializeSessionState(game));
    ObjectNode rootNode = parseStateAsObject(sessionState, gameId);

    Instant createdAt = Instant.now();
    sessionState.setVersion(sessionState.getVersion() + 1);
    sessionState.setStateJson(toJson(rootNode));
    gameSessionStateRepository.save(sessionState);

    ObjectNode payloadNode = objectMapper.createObjectNode();
    payloadNode.put("memberUserId", revokedMemberUserId);

    GameSessionEventResponse event = new GameSessionEventResponse(
        UUID.randomUUID().toString(),
        gameId,
        sessionState.getVersion(),
        "MEMBER_REVOKED",
        ownerUserId,
        payloadNode,
        createdAt
    );

    messagingTemplate.convertAndSend(gameTopic(gameId), event);
    return event;
  }

  @Transactional
  public GameSessionEventResponse resolveAttack(
      Long userId,
      Long gameId,
      String attackerTokenIdRaw,
      String targetTokenIdRaw,
      String attackIdRaw,
      String attackNameRaw,
      Integer attackBonusRaw,
      String damageFormulaRaw,
      String attackDamageTypeRaw
  ) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, userId);

    String attackerTokenId = attackerTokenIdRaw == null ? "" : attackerTokenIdRaw.trim();
    String targetTokenId = targetTokenIdRaw == null ? "" : targetTokenIdRaw.trim();
    String attackId = attackIdRaw == null ? "" : attackIdRaw.trim();
    String attackName = attackNameRaw == null ? "" : attackNameRaw.trim();
    String damageFormula = normalizeFormula(damageFormulaRaw);
    CombatDamageType attackDamageType = normalizeDamageType(attackDamageTypeRaw);
    int attackBonus = attackBonusRaw == null ? 0 : attackBonusRaw;

    if (attackerTokenId.isBlank() || targetTokenId.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tokens de combate são obrigatórios.");
    }
    if (attackerTokenId.equals(targetTokenId)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O alvo deve ser diferente do atacante.");
    }
    if (attackId.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ataque é obrigatório.");
    }
    if (attackName.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nome do ataque é obrigatório.");
    }
    GameSessionStateEntity sessionState = gameSessionStateRepository.findByGameId(gameId)
        .orElseGet(() -> initializeSessionState(game));
    ObjectNode rootNode = parseStateAsObject(sessionState, gameId);
    ArrayNode tokensNode = ensureArray(rootNode, "tokens");
    ArrayNode charactersNode = ensureArray(rootNode, "characters");

    ensureUserCanControlToken(game, userId, tokensNode, charactersNode, attackerTokenId);

    ObjectNode combatState = requireActiveCombatState(rootNode);
    ensureTokensParticipateInCombat(combatState, attackerTokenId, targetTokenId);
    ensureCombatTurnActor(combatState, attackerTokenId);
    ensureCombatActionAvailable(combatState);

    ObjectNode attackerTokenNode = findTokenById(tokensNode, attackerTokenId);
    if (attackerTokenNode == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Token atacante não encontrado na sessão.");
    }

    String attackerCharacterId = attackerTokenNode.path("characterId").asText("").trim();
    if (attackerCharacterId.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token atacante sem personagem válido.");
    }

    ObjectNode attackerCharacterNode = findCharacterById(charactersNode, attackerCharacterId);
    if (attackerCharacterNode == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Personagem atacante não encontrado na sessão.");
    }

    ResolvedAttackData resolvedAttackData = resolveAttackData(
        attackerCharacterNode,
        attackId,
        attackName,
        attackBonus,
        damageFormula
    );

    if (resolvedAttackData.expectedDamageType() != null
        && resolvedAttackData.expectedDamageType() != attackDamageType) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tipo de dano divergente do ataque autoritativo.");
    }

    ObjectNode targetTokenNode = findTokenById(tokensNode, targetTokenId);
    if (targetTokenNode == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Token alvo não encontrado na sessão.");
    }

    String targetCharacterId = targetTokenNode.path("characterId").asText("").trim();
    if (targetCharacterId.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token alvo sem personagem válido.");
    }

    ObjectNode targetCharacterNode = findCharacterById(charactersNode, targetCharacterId);
    if (targetCharacterNode == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Personagem alvo não encontrado na sessão.");
    }
    int targetArmorClass = resolveCharacterArmorClass(targetCharacterNode);

    int naturalRoll = ThreadLocalRandom.current().nextInt(1, 21);
    int attackTotal = naturalRoll + resolvedAttackData.attackBonus();
    boolean hit = naturalRoll == 20 || (naturalRoll != 1 && attackTotal >= targetArmorClass);
    CombatDamageType payloadDamageType = resolvedAttackData.expectedDamageType() == null
      ? attackDamageType
      : resolvedAttackData.expectedDamageType();
    int damageTotal = 0;
    int damageAfterDefenses = 0;
    int conditionalDamageTotal = 0;
    int damageApplied = 0;
    int remainingCurrentHp;
    int remainingTempHp;

    ObjectNode hitPointContainer = resolveHitPointContainer(targetCharacterNode);
    String currentHpField = "current";
    String tempHpField = "temporary";

    int currentHp = hitPointContainer.path(currentHpField).asInt(0);
    int tempHp = Math.max(0, hitPointContainer.path(tempHpField).asInt(0));
    int maxHp = resolveCharacterHitPointMaximum(targetCharacterNode, hitPointContainer);
    double attackerMovedMeters = resolveCurrentTurnMovedDistanceMeters(combatState);
    ArrayNode appliedConditionsNode = objectMapper.createArrayNode();
    ArrayNode conditionalDamageBreakdownNode = objectMapper.createArrayNode();
    TargetDamageDefenses targetDamageDefenses = resolveTargetDamageDefenses(targetCharacterNode);

    if (hit) {
      DiceRollResult damageRoll = rollDiceFormula(
          resolvedAttackData.damageFormula(),
          resolvedAttackData.attackName(),
          "Damage"
      );
      int baseDamageRollTotal = Math.max(0, damageRoll.detailsNode().path("finalResult").asInt(0));
      damageTotal = baseDamageRollTotal;
      damageAfterDefenses = applyDamageDefenses(baseDamageRollTotal, payloadDamageType, targetDamageDefenses);

      for (ResolvedConditionalDamage conditionalDamage : resolvedAttackData.conditionalDamageBonuses()) {
        if (attackerMovedMeters + 1e-9 < conditionalDamage.requiresUserMovementAtLeastMeters()) {
          continue;
        }

        DiceRollResult conditionalDamageRoll = rollDiceFormula(
            conditionalDamage.damageFormula(),
            resolvedAttackData.attackName(),
            "Conditional Damage"
        );
        int conditionalDamageRollTotal = Math.max(0, conditionalDamageRoll.detailsNode().path("finalResult").asInt(0));
        int conditionalDamageAfterDefenses = applyDamageDefenses(
            conditionalDamageRollTotal,
            conditionalDamage.damageType(),
            targetDamageDefenses
        );

        damageTotal += conditionalDamageRollTotal;
        conditionalDamageTotal += conditionalDamageAfterDefenses;

        ObjectNode conditionalDamageNode = objectMapper.createObjectNode();
        conditionalDamageNode.put("damageType", conditionalDamage.damageType().wireValue());
        conditionalDamageNode.put("damage", conditionalDamageAfterDefenses);
        conditionalDamageBreakdownNode.add(conditionalDamageNode);
      }

      damageAfterDefenses += conditionalDamageTotal;

      for (ResolvedConditionalCondition conditionalCondition : resolvedAttackData.conditionalAppliedConditions()) {
        if (attackerMovedMeters + 1e-9 < conditionalCondition.requiresUserMovementAtLeastMeters()) {
          continue;
        }

        boolean applied = applyConditionFromAttackIfNeeded(
            targetCharacterNode,
            conditionalCondition.condition(),
            attackId
        );
        if (applied) {
          appliedConditionsNode.add(conditionalCondition.condition());
        }
      }

      int remainingDamage = damageAfterDefenses;
      int tempAfter = tempHp;
      if (tempAfter > 0) {
        int absorbedByTemp = Math.min(tempAfter, remainingDamage);
        tempAfter -= absorbedByTemp;
        remainingDamage -= absorbedByTemp;
      }

      int nextHp = currentHp - remainingDamage;
      int normalizedHp = Math.max(0, Math.min(nextHp, maxHp));
      remainingCurrentHp = normalizedHp;
      remainingTempHp = tempAfter;
      damageApplied = (currentHp - normalizedHp) + (tempHp - tempAfter);

      hitPointContainer.put(currentHpField, remainingCurrentHp);
      hitPointContainer.put(tempHpField, remainingTempHp);
    } else {
      remainingCurrentHp = currentHp;
      remainingTempHp = tempHp;
    }

    consumeActionForActiveParticipant(combatState);

    boolean deadConditionApplied = false;
    if (hit && remainingCurrentHp == 0 && isNpcCharacter(targetCharacterNode)) {
      deadConditionApplied = applyNpcDeadConditionIfNeeded(targetCharacterNode);
      removeCombatParticipantByTokenId(rootNode, combatState, targetTokenId);
      combatState = getActiveCombatState(rootNode);
    }

    Instant createdAt = Instant.now();
    sessionState.setVersion(sessionState.getVersion() + 1);
    sessionState.setStateJson(toJson(rootNode));
    gameSessionStateRepository.save(sessionState);

    ObjectNode payloadNode = objectMapper.createObjectNode();
    payloadNode.put("attackerTokenId", attackerTokenId);
    payloadNode.put("targetTokenId", targetTokenId);
    payloadNode.put("targetCharacterId", targetCharacterId);
    payloadNode.put("attackId", attackId);
    payloadNode.put("attackName", resolvedAttackData.attackName());
    payloadNode.put("attackDamageType", payloadDamageType.wireValue());
    payloadNode.put("attackRoll", naturalRoll);
    payloadNode.put("attackTotal", attackTotal);
    payloadNode.put("targetArmorClass", targetArmorClass);
    payloadNode.put("hit", hit);
    payloadNode.put("damageTotal", damageTotal);
    payloadNode.put("damageAfterDefenses", damageAfterDefenses);
    payloadNode.put("conditionalDamageTotal", conditionalDamageTotal);
    payloadNode.put("damageApplied", damageApplied);
    payloadNode.put("remainingCurrentHp", remainingCurrentHp);
    payloadNode.put("remainingTempHp", remainingTempHp);
    payloadNode.put("attackerMovedMeters", attackerMovedMeters);
    payloadNode.set("appliedConditions", appliedConditionsNode);
    payloadNode.set("conditionalDamageBreakdown", conditionalDamageBreakdownNode);
    payloadNode.put("deadConditionApplied", deadConditionApplied);
    if (combatState == null) {
      payloadNode.putNull("combat");
    } else {
      payloadNode.set("combat", combatState.deepCopy());
    }

    GameSessionEventResponse event = new GameSessionEventResponse(
        UUID.randomUUID().toString(),
        gameId,
        sessionState.getVersion(),
        "ATTACK_RESOLVED",
        userId,
        payloadNode,
        createdAt
    );

    messagingTemplate.convertAndSend(gameTopic(gameId), event);
    return event;
  }

  @Transactional
  public GameSessionEventResponse startCombat(Long userId, Long gameId, List<String> tokenIdsRaw) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, userId);
    if (!game.getOwner().getId().equals(userId)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Apenas o mestre pode iniciar combate.");
    }

    GameSessionStateEntity sessionState = gameSessionStateRepository.findByGameId(gameId)
        .orElseGet(() -> initializeSessionState(game));
    ObjectNode rootNode = parseStateAsObject(sessionState, gameId);
    ArrayNode tokensNode = ensureArray(rootNode, "tokens");
    ArrayNode charactersNode = ensureArray(rootNode, "characters");

    List<String> tokenIds = normalizeCombatTokenIds(tokenIdsRaw);
    if (tokenIds.size() < 2) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Selecione ao menos dois tokens para iniciar combate.");
    }

    if (getActiveCombatState(rootNode) != null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Já existe um combate ativo.");
    }

    ObjectNode combatState = buildCombatState(tokensNode, charactersNode, tokenIds);
    rootNode.set("combat", combatState);
    Instant createdAt = Instant.now();
    ArrayNode messagesNode = ensureArray(rootNode, "messages");
    List<ObjectNode> initiativeMessages = buildCombatInitiativeMessages(
        resolveCombatParticipants(combatState),
        charactersNode,
        createdAt
    );
    for (ObjectNode messageNode : initiativeMessages) {
      messagesNode.add(messageNode);
    }
    trimMessages(messagesNode);

    sessionState.setVersion(sessionState.getVersion() + 1);
    sessionState.setStateJson(toJson(rootNode));
    gameSessionStateRepository.save(sessionState);

    ObjectNode payloadNode = objectMapper.createObjectNode();
    payloadNode.set("combat", combatState.deepCopy());

    GameSessionEventResponse event = new GameSessionEventResponse(
        UUID.randomUUID().toString(),
        gameId,
        sessionState.getVersion(),
        "COMBAT_STARTED",
        userId,
        payloadNode,
        createdAt
    );

    messagingTemplate.convertAndSend(gameTopic(gameId), event);
    publishMessageEvents(gameId, userId, sessionState.getVersion(), initiativeMessages, createdAt);
    return event;
  }

  @Transactional
  public GameSessionEventResponse advanceCombatTurn(Long userId, Long gameId) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, userId);
    if (!game.getOwner().getId().equals(userId)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Apenas o mestre pode avançar o combate.");
    }

    GameSessionStateEntity sessionState = gameSessionStateRepository.findByGameId(gameId)
        .orElseGet(() -> initializeSessionState(game));
    ObjectNode rootNode = parseStateAsObject(sessionState, gameId);
    ObjectNode combatState = requireActiveCombatState(rootNode);
    ArrayNode participants = resolveCombatParticipants(combatState);
    if (participants.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O combate ativo não possui participantes.");
    }

    int currentTurnIndex = Math.max(0, combatState.path("turnIndex").asInt(0));
    int nextTurnIndex = currentTurnIndex + 1;
    int currentRound = Math.max(1, combatState.path("round").asInt(1));
    if (nextTurnIndex >= participants.size()) {
      nextTurnIndex = 0;
      currentRound += 1;
    }

    combatState.put("turnIndex", nextTurnIndex);
    combatState.put("round", currentRound);
    combatState.set("turnResources", buildTurnResourcesForActiveParticipant(combatState, rootNode));

    Instant createdAt = Instant.now();
    sessionState.setVersion(sessionState.getVersion() + 1);
    sessionState.setStateJson(toJson(rootNode));
    gameSessionStateRepository.save(sessionState);

    ObjectNode payloadNode = objectMapper.createObjectNode();
    payloadNode.set("combat", combatState.deepCopy());

    GameSessionEventResponse event = new GameSessionEventResponse(
        UUID.randomUUID().toString(),
        gameId,
        sessionState.getVersion(),
        "COMBAT_TURN_ADVANCED",
        userId,
        payloadNode,
        createdAt
    );

    messagingTemplate.convertAndSend(gameTopic(gameId), event);
    return event;
  }

  @Transactional
  public GameSessionEventResponse endCombat(Long userId, Long gameId) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, userId);
    if (!game.getOwner().getId().equals(userId)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Apenas o mestre pode encerrar o combate.");
    }

    GameSessionStateEntity sessionState = gameSessionStateRepository.findByGameId(gameId)
        .orElseGet(() -> initializeSessionState(game));
    ObjectNode rootNode = parseStateAsObject(sessionState, gameId);
    if (getActiveCombatState(rootNode) == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não existe combate ativo.");
    }

    rootNode.putNull("combat");

    Instant createdAt = Instant.now();
    sessionState.setVersion(sessionState.getVersion() + 1);
    sessionState.setStateJson(toJson(rootNode));
    gameSessionStateRepository.save(sessionState);

    ObjectNode payloadNode = objectMapper.createObjectNode();
    payloadNode.putNull("combat");

    GameSessionEventResponse event = new GameSessionEventResponse(
        UUID.randomUUID().toString(),
        gameId,
        sessionState.getVersion(),
        "COMBAT_ENDED",
        userId,
        payloadNode,
        createdAt
    );

    messagingTemplate.convertAndSend(gameTopic(gameId), event);
    return event;
  }

  @Transactional
  public GameSessionEventResponse updateCharacterHp(
      Long userId,
      Long gameId,
      String characterIdRaw,
      String modeRaw,
      Integer amountRaw
  ) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, userId);
    if (!game.getOwner().getId().equals(userId)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Apenas o mestre pode alterar HP em jogo.");
    }

    String characterId = characterIdRaw == null ? "" : characterIdRaw.trim();
    String mode = modeRaw == null ? "" : modeRaw.trim().toLowerCase(Locale.ROOT);
    int amount = amountRaw == null ? 0 : amountRaw;
    if (characterId.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Personagem é obrigatório.");
    }
    if (amount < 1) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Quantidade inválida.");
    }
    if (!"damage".equals(mode) && !"heal".equals(mode)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Modo de alteração de HP inválido.");
    }

    GameSessionStateEntity sessionState = gameSessionStateRepository.findByGameId(gameId)
        .orElseGet(() -> initializeSessionState(game));
    ObjectNode rootNode = parseStateAsObject(sessionState, gameId);
    ArrayNode charactersNode = ensureArray(rootNode, "characters");

    ObjectNode characterNode = findCharacterById(charactersNode, characterId);
    if (characterNode == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Personagem não encontrado na sessão.");
    }

    ObjectNode hitPointContainer = resolveHitPointContainer(characterNode);
    String currentHpField = "current";
    String tempHpField = "temporary";

    JsonNode currentHpNode = hitPointContainer.get(currentHpField);
    int currentHp = currentHpNode != null && currentHpNode.isNumber() ? currentHpNode.asInt() : 0;
    JsonNode tempHpNode = hitPointContainer.get(tempHpField);
    int tempHp = tempHpNode != null && tempHpNode.isNumber() ? Math.max(0, tempHpNode.asInt()) : 0;
    int maxHp = resolveCharacterHitPointMaximum(characterNode, hitPointContainer);
    int normalizedTempHp = tempHp;
    int normalizedHp;

    if ("damage".equals(mode)) {
      int remainingDamage = amount;
      if (normalizedTempHp > 0) {
        int absorbedByTemp = Math.min(normalizedTempHp, remainingDamage);
        normalizedTempHp -= absorbedByTemp;
        remainingDamage -= absorbedByTemp;
      }
      int nextHp = currentHp - remainingDamage;
      normalizedHp = Math.max(0, Math.min(nextHp, Math.max(0, maxHp)));
    } else {
      int nextHp = currentHp + amount;
      normalizedHp = Math.max(0, Math.min(nextHp, Math.max(0, maxHp)));
    }

    hitPointContainer.put(currentHpField, normalizedHp);
    hitPointContainer.put(tempHpField, normalizedTempHp);

    boolean combatChanged = false;
    JsonNode combatNodeForPayload = null;
    boolean deadConditionApplied = false;
    boolean deadConditionRemoved = false;
    if ("damage".equals(mode)) {
      deadConditionApplied = applyNpcDeadConditionIfNeeded(characterNode);

      if (isNpcCharacter(characterNode) && normalizedHp == 0) {
        ArrayNode tokensNode = ensureArray(rootNode, "tokens");
        java.util.List<String> tokenIdsForCharacter = findTokenIdsByCharacterId(tokensNode, characterId);
        ObjectNode combatState = getActiveCombatState(rootNode);
        if (combatState != null && !tokenIdsForCharacter.isEmpty()) {
          for (String tokenId : tokenIdsForCharacter) {
            ObjectNode currentCombatState = getActiveCombatState(rootNode);
            if (currentCombatState == null) {
              break;
            }
            removeCombatParticipantByTokenId(rootNode, currentCombatState, tokenId);
          }
          combatChanged = true;
          ObjectNode updatedCombatState = getActiveCombatState(rootNode);
          combatNodeForPayload = updatedCombatState == null ? null : updatedCombatState.deepCopy();
        }
      }
    } else if (normalizedHp > 0) {
      deadConditionRemoved = removeConditionFromCharacterIfPresent(characterNode, "dead");
    }

    return persistAndPublishCharacterHpUpdated(
        userId,
        gameId,
        sessionState,
        rootNode,
        characterId,
        normalizedHp,
        normalizedTempHp,
        combatChanged,
        combatNodeForPayload,
        deadConditionApplied,
        deadConditionRemoved
    );
  }

  @Transactional
  public GameSessionEventResponse updateCharacterTempHp(
      Long userId,
      Long gameId,
      String characterIdRaw,
      Integer amountRaw
  ) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, userId);
    if (!game.getOwner().getId().equals(userId)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Apenas o mestre pode alterar HP temporário em jogo.");
    }

    String characterId = characterIdRaw == null ? "" : characterIdRaw.trim();
    int amount = amountRaw == null ? 0 : amountRaw;
    if (characterId.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Personagem é obrigatório.");
    }
    if (amount < 1) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Quantidade inválida.");
    }

    GameSessionStateEntity sessionState = gameSessionStateRepository.findByGameId(gameId)
        .orElseGet(() -> initializeSessionState(game));
    ObjectNode rootNode = parseStateAsObject(sessionState, gameId);
    ArrayNode charactersNode = ensureArray(rootNode, "characters");

    ObjectNode characterNode = findCharacterById(charactersNode, characterId);
    if (characterNode == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Personagem não encontrado na sessão.");
    }

    ObjectNode hitPointContainer = resolveHitPointContainer(characterNode);
    String currentHpField = hitPointContainer.has("current") ? "current" : "currentHp";
    String tempHpField = hitPointContainer.has("temporary") ? "temporary" : "tempHp";

    int currentHp = hitPointContainer.path(currentHpField).asInt(0);
    int currentTempHp = Math.max(0, hitPointContainer.path(tempHpField).asInt(0));
    int normalizedTempHp = Math.max(0, currentTempHp + amount);
    hitPointContainer.put(tempHpField, normalizedTempHp);

    return persistAndPublishCharacterHpUpdated(
        userId,
        gameId,
        sessionState,
        rootNode,
        characterId,
        currentHp,
      normalizedTempHp,
      false,
        null,
        false,
        false
    );
  }

  @Transactional
  public GameSessionEventResponse updateCharacterEquipment(
      Long userId,
      Long gameId,
      String characterIdRaw,
      String slotRaw,
      String itemIdRaw
  ) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, userId);

    String characterId = characterIdRaw == null ? "" : characterIdRaw.trim();
    if (characterId.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Personagem é obrigatório.");
    }

    String slot = normalizeEquipmentSlot(slotRaw);
    String itemId = itemIdRaw == null ? null : itemIdRaw.trim();
    if (itemId != null && itemId.isBlank()) {
      itemId = null;
    }

    GameSessionStateEntity sessionState = gameSessionStateRepository.findByGameId(gameId)
        .orElseGet(() -> initializeSessionState(game));
    ObjectNode rootNode = parseStateAsObject(sessionState, gameId);
    ArrayNode charactersNode = ensureArray(rootNode, "characters");

    ObjectNode characterNode = findCharacterById(charactersNode, characterId);
    if (characterNode == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Personagem não encontrado na sessão.");
    }

    ObjectNode equipmentNode = resolveRuntimeEquipmentContainer(characterNode);
    ArrayNode inventoryItemsNode = resolveRuntimeInventoryItems(characterNode);

    if (itemId != null) {
      validateInventoryContainsItem(inventoryItemsNode, itemId);
    }
    validateEquipmentSlotCompatibility(slot, itemId);
    applyEquipmentUpdate(equipmentNode, slot, itemId);
    validateEquippedItemQuantities(equipmentNode, inventoryItemsNode);

    Instant createdAt = Instant.now();
    sessionState.setVersion(sessionState.getVersion() + 1);
    sessionState.setStateJson(toJson(rootNode));
    gameSessionStateRepository.save(sessionState);

    ObjectNode payloadNode = objectMapper.createObjectNode();
    payloadNode.set("character", characterNode);

    GameSessionEventResponse event = new GameSessionEventResponse(
        UUID.randomUUID().toString(),
        gameId,
        sessionState.getVersion(),
        "CHARACTER_EQUIPMENT_UPDATED",
        userId,
        payloadNode,
        createdAt
    );

    messagingTemplate.convertAndSend(gameTopic(gameId), event);
    return event;
  }

  @Transactional
  public GameSessionEventResponse updateCharacterController(
      Long userId,
      Long gameId,
      String characterIdRaw,
      Long controlledByUserIdRaw
  ) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, userId);
    if (!game.getOwner().getId().equals(userId)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Apenas o mestre pode definir o controlador do personagem.");
    }

    String characterId = characterIdRaw == null ? "" : characterIdRaw.trim();
    if (characterId.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Personagem é obrigatório.");
    }

    Long controlledByUserId = normalizeControlledByUserIdForAssignment(game, controlledByUserIdRaw);

    GameSessionStateEntity sessionState = gameSessionStateRepository.findByGameId(gameId)
        .orElseGet(() -> initializeSessionState(game));
    ObjectNode rootNode = parseStateAsObject(sessionState, gameId);
    ArrayNode charactersNode = ensureArray(rootNode, "characters");

    ObjectNode characterNode = findCharacterById(charactersNode, characterId);
    if (characterNode == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Personagem não encontrado na sessão.");
    }

    if ("NPC".equals(characterNode.path("type").asText("").trim())) {
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST,
          "NPCs são de uso exclusivo do mestre e não aceitam controlador por jogador."
      );
    }

    writeControlledByUserId(characterNode, controlledByUserId);

    Instant createdAt = Instant.now();
    sessionState.setVersion(sessionState.getVersion() + 1);
    sessionState.setStateJson(toJson(rootNode));
    gameSessionStateRepository.save(sessionState);

    ObjectNode payloadNode = objectMapper.createObjectNode();
    payloadNode.set("character", characterNode.deepCopy());

    GameSessionEventResponse event = new GameSessionEventResponse(
        UUID.randomUUID().toString(),
        gameId,
        sessionState.getVersion(),
        "CHARACTER_CONTROL_UPDATED",
        userId,
        payloadNode,
        createdAt
    );

    messagingTemplate.convertAndSend(gameTopic(gameId), event);
    return event;
  }

  @Transactional
  public GameSessionEventResponse createCharacter(Long userId, Long gameId, JsonNode characterRaw) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, userId);

    if (!(characterRaw instanceof ObjectNode characterNodeRaw)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Personagem inválido.");
    }

    ObjectNode characterNode = characterNodeRaw.deepCopy();
    String characterId = characterNode.path("id").asText("").trim();
    if (characterId.isBlank()) {
      characterId = UUID.randomUUID().toString();
      characterNode.put("id", characterId);
    }

    String characterName = characterNode.path("name").asText("").trim();
    if (characterName.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nome do personagem é obrigatório.");
    }

    SessionCharacterPayloadValidator.validateForCreate(characterNode);
    normalizeControlledByUserIdField(characterNode);

    GameSessionStateEntity sessionState = gameSessionStateRepository.findByGameId(gameId)
        .orElseGet(() -> initializeSessionState(game));
    ObjectNode rootNode = parseStateAsObject(sessionState, gameId);
    ArrayNode charactersNode = ensureArray(rootNode, "characters");

    if (findCharacterById(charactersNode, characterId) != null) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe personagem com este id na sessão.");
    }

    charactersNode.add(characterNode);

    Instant createdAt = Instant.now();
    sessionState.setVersion(sessionState.getVersion() + 1);
    sessionState.setStateJson(toJson(rootNode));
    gameSessionStateRepository.save(sessionState);

    ObjectNode payloadNode = objectMapper.createObjectNode();
    payloadNode.set("character", characterNode);

    GameSessionEventResponse event = new GameSessionEventResponse(
        UUID.randomUUID().toString(),
        gameId,
        sessionState.getVersion(),
        "CHARACTER_CREATED",
        userId,
        payloadNode,
        createdAt
    );

    messagingTemplate.convertAndSend(gameTopic(gameId), event);
    return event;
  }

  @Transactional
  public GameSessionEventResponse spawnMonsterCharacter(
      Long userId,
      Long gameId,
      String monsterIdRaw,
      String nameOverrideRaw,
      String sceneIdRaw,
      Integer x,
      Integer y
  ) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, userId);
    if (!game.getOwner().getId().equals(userId)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Apenas o mestre pode instanciar monstros na sessão.");
    }

    String monsterId = normalizeMonsterId(monsterIdRaw);
    String nameOverride = normalizeOptionalOverrideText(nameOverrideRaw);
    ObjectNode characterNode = buildMonsterCharacterNode(monsterId, nameOverride);
    String characterId = characterNode.path("id").asText("");
    SpawnTokenRequest spawnTokenRequest = normalizeOptionalMonsterSpawnToken(sceneIdRaw, x, y);

    GameSessionStateEntity sessionState = gameSessionStateRepository.findByGameId(gameId)
        .orElseGet(() -> initializeSessionState(game));
    ObjectNode rootNode = parseStateAsObject(sessionState, gameId);
    ArrayNode charactersNode = ensureArray(rootNode, "characters");
    ArrayNode tokensNode = ensureArray(rootNode, "tokens");

    if (findCharacterById(charactersNode, characterId) != null) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe personagem com este id na sessão.");
    }

    charactersNode.add(characterNode);
    ObjectNode tokenNode = null;
    if (spawnTokenRequest != null) {
      tokenNode = buildTokenNode(characterId, spawnTokenRequest.sceneId(), spawnTokenRequest.x(), spawnTokenRequest.y());
      tokensNode.add(tokenNode);
    }

    Instant createdAt = Instant.now();
    sessionState.setVersion(sessionState.getVersion() + 1);
    sessionState.setStateJson(toJson(rootNode));
    gameSessionStateRepository.save(sessionState);

    ObjectNode payloadNode = objectMapper.createObjectNode();
    payloadNode.set("character", characterNode);
    if (tokenNode != null) {
      payloadNode.set("token", tokenNode);
    }

    GameSessionEventResponse event = new GameSessionEventResponse(
        UUID.randomUUID().toString(),
        gameId,
        sessionState.getVersion(),
        tokenNode == null ? "CHARACTER_CREATED" : "TOKEN_CREATED",
        userId,
        payloadNode,
        createdAt
    );

    messagingTemplate.convertAndSend(gameTopic(gameId), event);
    return event;
  }

  @Transactional
  public GameSessionEventResponse duplicateCharacter(Long userId, Long gameId, String characterIdRaw) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, userId);

    String characterId = characterIdRaw == null ? "" : characterIdRaw.trim();
    if (characterId.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Personagem é obrigatório.");
    }

    GameSessionStateEntity sessionState = gameSessionStateRepository.findByGameId(gameId)
        .orElseGet(() -> initializeSessionState(game));
    ObjectNode rootNode = parseStateAsObject(sessionState, gameId);
    ArrayNode charactersNode = ensureArray(rootNode, "characters");

    ObjectNode sourceCharacterNode = findCharacterById(charactersNode, characterId);
    if (sourceCharacterNode == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Personagem não encontrado na sessão.");
    }

    ensureUserCanDuplicateCharacter(game, userId, sourceCharacterNode);

    ObjectNode duplicatedCharacterNode = buildDuplicatedCharacterNode(
        charactersNode,
        sourceCharacterNode,
        characterId
    );
    charactersNode.add(duplicatedCharacterNode);

    Instant createdAt = Instant.now();
    sessionState.setVersion(sessionState.getVersion() + 1);
    sessionState.setStateJson(toJson(rootNode));
    gameSessionStateRepository.save(sessionState);

    ObjectNode payloadNode = objectMapper.createObjectNode();
    payloadNode.set("character", duplicatedCharacterNode);

    GameSessionEventResponse event = new GameSessionEventResponse(
        UUID.randomUUID().toString(),
        gameId,
        sessionState.getVersion(),
        "CHARACTER_CREATED",
        userId,
        payloadNode,
        createdAt
    );

    messagingTemplate.convertAndSend(gameTopic(gameId), event);
    return event;
  }

  @Transactional
  public GameSessionEventResponse duplicateCharacterWithToken(
      Long userId,
      Long gameId,
      String characterIdRaw,
      String sceneIdRaw,
      Integer x,
      Integer y
  ) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, userId);

    String characterId = characterIdRaw == null ? "" : characterIdRaw.trim();
    String sceneId = sceneIdRaw == null ? "" : sceneIdRaw.trim();
    if (characterId.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Personagem é obrigatório.");
    }
    if (sceneId.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Scene é obrigatória.");
    }
    if (x == null || x < 0 || y == null || y < 0) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Posição inválida.");
    }

    GameSessionStateEntity sessionState = gameSessionStateRepository.findByGameId(gameId)
        .orElseGet(() -> initializeSessionState(game));
    ObjectNode rootNode = parseStateAsObject(sessionState, gameId);
    ArrayNode charactersNode = ensureArray(rootNode, "characters");
    ArrayNode tokensNode = ensureArray(rootNode, "tokens");

    ObjectNode sourceCharacterNode = findCharacterById(charactersNode, characterId);
    if (sourceCharacterNode == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Personagem não encontrado na sessão.");
    }

    ensureUserCanDuplicateCharacter(game, userId, sourceCharacterNode);

    ObjectNode duplicatedCharacterNode = buildDuplicatedCharacterNode(
        charactersNode,
        sourceCharacterNode,
        characterId
    );
    charactersNode.add(duplicatedCharacterNode);

    ObjectNode tokenNode = objectMapper.createObjectNode();
    tokenNode.put("id", UUID.randomUUID().toString());
    tokenNode.put("characterId", duplicatedCharacterNode.path("id").asText());
    tokenNode.put("sceneId", sceneId);
    ObjectNode positionNode = objectMapper.createObjectNode();
    positionNode.put("x", x);
    positionNode.put("y", y);
    tokenNode.set("position", positionNode);
    tokensNode.add(tokenNode);

    Instant createdAt = Instant.now();
    sessionState.setVersion(sessionState.getVersion() + 1);
    sessionState.setStateJson(toJson(rootNode));
    gameSessionStateRepository.save(sessionState);

    ObjectNode payloadNode = objectMapper.createObjectNode();
    payloadNode.set("character", duplicatedCharacterNode);
    payloadNode.set("token", tokenNode);

    GameSessionEventResponse event = new GameSessionEventResponse(
        UUID.randomUUID().toString(),
        gameId,
        sessionState.getVersion(),
        "TOKEN_CREATED",
        userId,
        payloadNode,
        createdAt
    );

    messagingTemplate.convertAndSend(gameTopic(gameId), event);
    return event;
  }

  @Transactional
  public GameSessionEventResponse removeCharacter(Long userId, Long gameId, String characterIdRaw) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, userId);

    String characterId = characterIdRaw == null ? "" : characterIdRaw.trim();
    if (characterId.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Personagem é obrigatório.");
    }

    GameSessionStateEntity sessionState = gameSessionStateRepository.findByGameId(gameId)
        .orElseGet(() -> initializeSessionState(game));
    ObjectNode rootNode = parseStateAsObject(sessionState, gameId);
    ArrayNode charactersNode = ensureArray(rootNode, "characters");
    ArrayNode tokensNode = ensureArray(rootNode, "tokens");

    int characterIndex = findCharacterIndexById(charactersNode, characterId);
    if (characterIndex < 0) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Personagem não encontrado na sessão.");
    }
    charactersNode.remove(characterIndex);

    ArrayNode removedTokenIds = objectMapper.createArrayNode();
    for (int i = tokensNode.size() - 1; i >= 0; i--) {
      JsonNode token = tokensNode.get(i);
      if (!(token instanceof ObjectNode tokenObject)) {
        continue;
      }
      String tokenCharacterId = tokenObject.path("characterId").asText("");
      if (!characterId.equals(tokenCharacterId)) {
        continue;
      }
      String tokenId = tokenObject.path("id").asText("");
      if (!tokenId.isBlank()) {
        removedTokenIds.add(tokenId);
      }
      tokensNode.remove(i);
    }

    List<String> removedTokenIdsList = new java.util.ArrayList<>();
    for (int i = 0; i < removedTokenIds.size(); i++) {
      String tokenId = removedTokenIds.get(i).asText("").trim();
      if (!tokenId.isBlank()) {
        removedTokenIdsList.add(tokenId);
      }
    }
    CombatSyncResult combatSync = syncCombatStateAfterRemovedTokenIds(rootNode, removedTokenIdsList);

    Instant createdAt = Instant.now();
    sessionState.setVersion(sessionState.getVersion() + 1);
    sessionState.setStateJson(toJson(rootNode));
    gameSessionStateRepository.save(sessionState);

    ObjectNode payloadNode = objectMapper.createObjectNode();
    payloadNode.put("characterId", characterId);
    payloadNode.set("removedTokenIds", removedTokenIds);
    payloadNode.put("combatChanged", combatSync.touched());
    if (combatSync.touched()) {
      payloadNode.set("combat", combatSync.combatNode());
    } else {
      payloadNode.putNull("combat");
    }

    GameSessionEventResponse event = new GameSessionEventResponse(
        UUID.randomUUID().toString(),
        gameId,
        sessionState.getVersion(),
        "CHARACTER_REMOVED",
        userId,
        payloadNode,
        createdAt
    );

    messagingTemplate.convertAndSend(gameTopic(gameId), event);
    return event;
  }

  @Transactional
  public GameSessionEventResponse addItemToCharacterInventory(
      Long userId,
      Long gameId,
      String characterIdRaw,
      String itemIdRaw,
      Integer quantityRaw
  ) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, userId);
    if (!game.getOwner().getId().equals(userId)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Apenas o mestre pode adicionar itens ao inventário.");
    }

    String characterId = characterIdRaw == null ? "" : characterIdRaw.trim();
    String itemId = normalizeInventoryItemId(itemIdRaw);
    int quantity = quantityRaw == null ? 0 : quantityRaw;

    if (characterId.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Personagem é obrigatório.");
    }
    if (quantity < 1) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Quantidade inválida.");
    }

    GameSessionStateEntity sessionState = gameSessionStateRepository.findByGameId(gameId)
        .orElseGet(() -> initializeSessionState(game));
    ObjectNode rootNode = parseStateAsObject(sessionState, gameId);
    ArrayNode charactersNode = ensureArray(rootNode, "characters");

    ObjectNode characterNode = findCharacterById(charactersNode, characterId);
    if (characterNode == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Personagem não encontrado na sessão.");
    }

    addItemToCharacterStorage(characterNode, itemId, quantity);

    Instant createdAt = Instant.now();
    sessionState.setVersion(sessionState.getVersion() + 1);
    sessionState.setStateJson(toJson(rootNode));
    gameSessionStateRepository.save(sessionState);

    ObjectNode payloadNode = objectMapper.createObjectNode();
    payloadNode.set("character", characterNode.deepCopy());

    GameSessionEventResponse event = new GameSessionEventResponse(
        UUID.randomUUID().toString(),
        gameId,
        sessionState.getVersion(),
        "CHARACTER_INVENTORY_UPDATED",
        userId,
        payloadNode,
        createdAt
    );

    messagingTemplate.convertAndSend(gameTopic(gameId), event);
    return event;
  }

  private GameSessionEventResponse appendMessageAndPublish(
      GameEntity game,
      Long actorUserId,
      ObjectNode messageNode,
      String eventType,
      Instant createdAt
  ) {
    GameSessionStateEntity sessionState = gameSessionStateRepository.findByGameId(game.getId())
        .orElseGet(() -> initializeSessionState(game));

    ObjectNode rootNode = parseStateAsObject(sessionState, game.getId());
    ArrayNode messagesNode = ensureArray(rootNode, "messages");
    messagesNode.add(messageNode);
    trimMessages(messagesNode);

    sessionState.setVersion(sessionState.getVersion() + 1);
    sessionState.setStateJson(toJson(rootNode));
    gameSessionStateRepository.save(sessionState);

    ObjectNode payloadNode = objectMapper.createObjectNode();
    payloadNode.set("message", messageNode);

    GameSessionEventResponse event = new GameSessionEventResponse(
        UUID.randomUUID().toString(),
        game.getId(),
        sessionState.getVersion(),
        eventType,
        actorUserId,
        payloadNode,
        createdAt
    );

    messagingTemplate.convertAndSend(gameTopic(game.getId()), event);
    return event;
  }

  private DiceRollResult rollDiceFormula(String formula, String rollName, String category) {
    List<String> terms = extractTerms(formula);
    if (terms.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Notação de dados inválida.");
    }

    ArrayNode partsNode = objectMapper.createArrayNode();
    int modifier = 0;
    int totalDiceResult = 0;
    int totalDiceRolls = 0;
    Integer naturalRollResult = null;

    for (String term : terms) {
      int sign = term.startsWith("-") ? -1 : 1;
      String unsignedTerm = (term.startsWith("+") || term.startsWith("-")) ? term.substring(1) : term;
      if (unsignedTerm.isBlank()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Notação de dados inválida.");
      }

      if (unsignedTerm.contains("d")) {
        if (!DICE_TERM_PATTERN.matcher(unsignedTerm).matches()) {
          throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Notação de dados inválida.");
        }

        String[] split = unsignedTerm.split("d");
        int count = parsePositiveInt(split[0]);
        int sides = parsePositiveInt(split[1]);

        if (count < 1 || count > MAX_DICE_COUNT || sides < 1 || sides > MAX_DICE_SIDES) {
          throw new ResponseStatusException(
              HttpStatus.BAD_REQUEST,
              "Dados inválidos. Número de dados (X) e lados (Y) devem ser entre 1 e 100."
          );
        }

        totalDiceRolls += count;
        if (totalDiceRolls > MAX_TOTAL_DICE_ROLLS) {
          throw new ResponseStatusException(
              HttpStatus.BAD_REQUEST,
              "Expressão excede o máximo de rolagens permitidas (500)."
          );
        }

        for (int i = 0; i < count; i++) {
          int result = ThreadLocalRandom.current().nextInt(1, sides + 1);
          int signedResult = sign * result;

          ObjectNode rollPart = objectMapper.createObjectNode();
          rollPart.put("dice", "d" + sides);
          rollPart.put("result", signedResult);
          partsNode.add(rollPart);

          totalDiceResult += signedResult;
          if (sides == 20 && sign > 0 && naturalRollResult == null) {
            naturalRollResult = result;
          }
        }
      } else {
        if (!INTEGER_PATTERN.matcher(unsignedTerm).matches()) {
          throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Notação de dados inválida.");
        }
        modifier += sign * parsePositiveInt(unsignedTerm);
      }
    }

    int finalResult = totalDiceResult + modifier;
    if (modifier != 0) {
      partsNode.add(modifier);
    }

    ObjectNode detailsNode = objectMapper.createObjectNode();
    detailsNode.put("rollName", rollName);
    detailsNode.put("category", category);
    detailsNode.set("parts", partsNode);
    detailsNode.put("finalResult", finalResult);
    if (naturalRollResult != null) {
      detailsNode.put("naturalRollResult", naturalRollResult);
    }

    return new DiceRollResult(detailsNode);
  }

  private List<String> extractTerms(String formula) {
    Matcher matcher = TERM_PATTERN.matcher(formula);
    List<String> terms = new java.util.ArrayList<>();
    while (matcher.find()) {
      terms.add(matcher.group());
    }

    String joined = String.join("", terms);
    if (!joined.equals(formula)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Notação de dados inválida.");
    }

    return terms;
  }

  private String normalizeFormula(String formula) {
    String normalized = formula == null ? "" : formula.replaceAll("\\s+", "").toLowerCase(Locale.ROOT);
    if (normalized.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Formula é obrigatória.");
    }
    return normalized;
  }

  private String normalizeCategory(String category) {
    if (category == null || category.isBlank()) {
      return "Generic";
    }
    String normalized = category.trim();
    if (!ALLOWED_CATEGORIES.contains(normalized)) {
      return "Generic";
    }
    return normalized;
  }

  private CombatDamageType normalizeDamageType(String attackDamageTypeRaw) {
    String normalized = attackDamageTypeRaw == null
        ? ""
        : attackDamageTypeRaw.trim().toLowerCase(Locale.ROOT);

    if (normalized.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tipo de dano é obrigatório.");
    }

    return CombatDamageType.fromWireValue(normalized)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tipo de dano inválido."));
  }

  private CombatDamageType parseCanonicalDamageType(String rawDamageType) {
    String normalized = rawDamageType == null ? "" : rawDamageType.trim().toLowerCase(Locale.ROOT);
    if (normalized.isBlank()) {
      throw new ResponseStatusException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Catálogo canônico do monstro está sem tipo de dano válido."
      );
    }

    return CombatDamageType.fromWireValue(normalized)
        .orElseThrow(() -> new ResponseStatusException(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Catálogo canônico do monstro está com tipo de dano inválido."
        ));
  }

  private int parsePositiveInt(String raw) {
    try {
      return Integer.parseInt(raw);
    } catch (NumberFormatException ex) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Notação de dados inválida.");
    }
  }

  private SenderInfo resolveSenderInfo(GameEntity game, Long userId) {
    boolean isOwner = game.getOwner().getId().equals(userId);

    GameMemberEntity member = gameMemberRepository.findByGameIdAndUserId(game.getId(), userId)
        .orElse(null);

    if (member != null) {
      String nickname = member.getNickname();
      String baseName = (nickname != null && !nickname.trim().isBlank()) ? nickname.trim() : member.getUser().getName();
      String colorHex = normalizeColor(member.getColorHex());
      String displayName = isOwner ? withMasterTag(baseName) : baseName;
      return new SenderInfo(displayName, colorHex);
    }

    if (isOwner) {
      return new SenderInfo(withMasterTag(game.getOwner().getName()), GameColorPalette.DEFAULT_COLOR);
    }

    throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Você não possui acesso a este jogo.");
  }

  private String normalizeColor(String colorHex) {
    if (colorHex == null || colorHex.isBlank()) {
      return GameColorPalette.DEFAULT_COLOR;
    }
    String normalized = colorHex.trim().toUpperCase(Locale.ROOT);
    if (!GameColorPalette.COLORS.contains(normalized)) {
      return GameColorPalette.DEFAULT_COLOR;
    }
    return normalized;
  }

  private String withMasterTag(String baseName) {
    String normalized = baseName == null ? "" : baseName.trim();
    if (normalized.endsWith("[MESTRE]")) {
      return normalized;
    }
    return normalized + " [MESTRE]";
  }

  private String gameTopic(Long gameId) {
    return "/topic/games." + gameId + ".events";
  }

  private GameSessionStateEntity initializeSessionState(GameEntity game) {
    GameSessionStateEntity entity = new GameSessionStateEntity();
    entity.setGame(game);
    entity.setVersion(0L);
    entity.setStateJson(buildEmptyStateJson());
    return gameSessionStateRepository.save(entity);
  }

  private String buildEmptyStateJson() {
    ObjectNode rootNode = objectMapper.createObjectNode();
    rootNode.putArray("characters");
    rootNode.putArray("tokens");
    rootNode.putArray("messages");
    return toJson(rootNode);
  }

  private List<String> normalizeCombatTokenIds(List<String> tokenIdsRaw) {
    if (tokenIdsRaw == null || tokenIdsRaw.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Selecione ao menos um token para o combate.");
    }

    java.util.LinkedHashSet<String> normalizedIds = new java.util.LinkedHashSet<>();
    for (String rawTokenId : tokenIdsRaw) {
      String tokenId = rawTokenId == null ? "" : rawTokenId.trim();
      if (tokenId.isBlank()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token inválido na lista de combate.");
      }
      normalizedIds.add(tokenId);
    }

    return List.copyOf(normalizedIds);
  }

  private ObjectNode buildCombatState(
      ArrayNode tokensNode,
      ArrayNode charactersNode,
      List<String> tokenIds
  ) {
    List<String> normalizedTokenIds = normalizeCombatTokenIds(tokenIds);
    List<ObjectNode> participants = new java.util.ArrayList<>();

    for (String tokenId : normalizedTokenIds) {
      ObjectNode tokenNode = findTokenById(tokensNode, tokenId);
      if (tokenNode == null) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Token não encontrado para iniciar combate.");
      }

      String characterId = tokenNode.path("characterId").asText("").trim();
      if (characterId.isBlank()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token sem personagem válido para combate.");
      }

      ObjectNode characterNode = findCharacterById(charactersNode, characterId);
      if (characterNode == null) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Personagem não encontrado para o token em combate.");
      }

      if (characterHasCondition(characterNode, "dead")) {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST,
            "Token com personagem morto não pode participar do combate."
        );
      }

      int dexterityScore = resolveBaseAbilityScore(characterNode, "dexterity");
      int initiativeRoll = ThreadLocalRandom.current().nextInt(1, 21);
      int initiativeTotal = initiativeRoll + getAbilityModifier(dexterityScore);

      ObjectNode participantNode = objectMapper.createObjectNode();
      participantNode.put("tokenId", tokenId);
      participantNode.put("characterId", characterId);
      participantNode.put("initiativeRoll", initiativeRoll);
      participantNode.put("initiativeTotal", initiativeTotal);
      participantNode.put("dexterityScore", dexterityScore);
      participantNode.put("movementBudgetCells", resolveMovementBudgetCells(characterNode));
      participantNode.put("status", "active");
      participants.add(participantNode);
    }

    participants.sort((left, right) -> {
      int initiativeComparison = Integer.compare(
          right.path("initiativeTotal").asInt(0),
          left.path("initiativeTotal").asInt(0)
      );
      if (initiativeComparison != 0) {
        return initiativeComparison;
      }

      int dexterityComparison = Integer.compare(
          right.path("dexterityScore").asInt(0),
          left.path("dexterityScore").asInt(0)
      );
      if (dexterityComparison != 0) {
        return dexterityComparison;
      }

      return left.path("tokenId").asText("").compareTo(right.path("tokenId").asText(""));
    });

    ObjectNode combatState = objectMapper.createObjectNode();
    combatState.put("active", true);
    combatState.put("round", 1);
    combatState.put("turnIndex", 0);

    ArrayNode participantsNode = objectMapper.createArrayNode();
    for (ObjectNode participant : participants) {
      participantsNode.add(participant);
    }
    combatState.set("participants", participantsNode);
    combatState.set("turnResources", buildTurnResourcesForActiveParticipant(combatState, charactersNode));
    return combatState;
  }

  private ObjectNode getActiveCombatState(ObjectNode rootNode) {
    JsonNode combatNode = rootNode.get("combat");
    if (combatNode == null || combatNode.isNull()) {
      return null;
    }
    if (!(combatNode instanceof ObjectNode combatObject)) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Estado de combate persistido está corrompido.");
    }
    if (!combatObject.path("active").asBoolean(false)) {
      return null;
    }
    resolveCombatParticipants(combatObject);
    return combatObject;
  }

  private ObjectNode requireActiveCombatState(ObjectNode rootNode) {
    ObjectNode combatState = getActiveCombatState(rootNode);
    if (combatState == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não existe combate ativo.");
    }
    return combatState;
  }

  private ArrayNode resolveCombatParticipants(ObjectNode combatState) {
    JsonNode participantsNode = combatState.get("participants");
    if (participantsNode instanceof ArrayNode participantsArray) {
      return participantsArray;
    }
    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Participantes do combate persistidos estão corrompidos.");
  }

  private ObjectNode resolveCombatTurnResources(ObjectNode combatState) {
    JsonNode turnResourcesNode = combatState.get("turnResources");
    if (turnResourcesNode instanceof ObjectNode turnResourcesObject) {
      return turnResourcesObject;
    }
    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Recursos do turno do combate estão corrompidos.");
  }

  private void ensureTokensParticipateInCombat(ObjectNode combatState, String... tokenIds) {
    ArrayNode participants = resolveCombatParticipants(combatState);
    for (String tokenId : tokenIds) {
      boolean participantExists = false;
      for (int i = 0; i < participants.size(); i++) {
        JsonNode participantNode = participants.get(i);
        if (tokenId.equals(participantNode.path("tokenId").asText("").trim())) {
          participantExists = true;
          break;
        }
      }

      if (!participantExists) {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST,
            "Todos os tokens envolvidos precisam estar no combate ativo."
        );
      }
    }
  }

  private void ensureCombatMovementAllowed(ObjectNode rootNode, String tokenId) {
    ObjectNode combatState = getActiveCombatState(rootNode);
    if (combatState == null) {
      return;
    }

    Integer participantIndex = findCombatParticipantIndex(combatState, tokenId);
    if (participantIndex == null) {
      return;
    }

    int turnIndex = normalizeCombatTurnIndex(combatState);
    if (participantIndex != turnIndex) {
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST,
          "Participantes do combate só podem se mover no próprio turno."
      );
    }
  }

  private void ensureUserCanControlToken(
      GameEntity game,
      Long userId,
      ArrayNode tokensNode,
      ArrayNode charactersNode,
      String tokenId
  ) {
    Long ownerUserId = game.getOwner().getId();
    if (ownerUserId.equals(userId)) {
      return;
    }

    ObjectNode tokenNode = findTokenById(tokensNode, tokenId);
    if (tokenNode == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Token não encontrado na sessão.");
    }

    String characterId = tokenNode.path("characterId").asText("").trim();
    if (characterId.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token sem personagem válido.");
    }

    ObjectNode characterNode = findCharacterById(charactersNode, characterId);
    if (characterNode == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Personagem do token não encontrado na sessão.");
    }

    if ("NPC".equals(characterNode.path("type").asText("").trim())) {
      throw new ResponseStatusException(
          HttpStatus.FORBIDDEN,
          "NPCs são de uso exclusivo do mestre."
      );
    }

    Long controlledByUserId = readControlledByUserId(characterNode);

    if (controlledByUserId == null) {
      if (!ownerUserId.equals(userId)) {
        throw new ResponseStatusException(
            HttpStatus.FORBIDDEN,
            "Este personagem está sob controle exclusivo do mestre."
        );
      }
      return;
    }

    if (!controlledByUserId.equals(userId)) {
      throw new ResponseStatusException(
          HttpStatus.FORBIDDEN,
          "Este personagem pertence a outro jogador."
      );
    }
  }

  private void ensureUserCanInstantiateCharacterToken(
      GameEntity game,
      Long userId,
      ObjectNode characterNode
  ) {
    Long ownerUserId = game.getOwner().getId();
    if (ownerUserId.equals(userId)) {
      return;
    }

    if ("NPC".equals(characterNode.path("type").asText("").trim())) {
      throw new ResponseStatusException(
          HttpStatus.FORBIDDEN,
          "Somente o mestre pode instanciar tokens de NPC."
      );
    }

    Long controlledByUserId = readControlledByUserId(characterNode);

    if (controlledByUserId == null) {
      if (!ownerUserId.equals(userId)) {
        throw new ResponseStatusException(
            HttpStatus.FORBIDDEN,
            "Somente o mestre pode instanciar tokens de personagens sem controlador atribuído."
        );
      }
      return;
    }

    if (!controlledByUserId.equals(userId)) {
      throw new ResponseStatusException(
          HttpStatus.FORBIDDEN,
          "Você não pode instanciar tokens de personagens que pertencem a outro jogador."
      );
    }
  }

  private void ensureCombatTurnActor(ObjectNode combatState, String attackerTokenId) {
    Integer participantIndex = findCombatParticipantIndex(combatState, attackerTokenId);
    if (participantIndex == null) {
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST,
          "O atacante precisa estar no combate ativo."
      );
    }

    int turnIndex = normalizeCombatTurnIndex(combatState);
    if (participantIndex != turnIndex) {
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST,
          "Ações de combate só podem ser executadas pelo participante do turno atual."
      );
    }
  }

  private void ensureCombatActionAvailable(ObjectNode combatState) {
    ObjectNode turnResources = resolveCombatTurnResources(combatState);
    if (!turnResources.path("actionAvailable").asBoolean(false)) {
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST,
          "O participante do turno atual já gastou a ação deste turno."
      );
    }
  }

  private String normalizeMonsterId(String monsterIdRaw) {
    String monsterId = monsterIdRaw == null ? "" : monsterIdRaw.trim();
    if (monsterId.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "monsterId é obrigatório.");
    }

    monsterCatalogManifestService.requireKnownMonster(monsterId);
    return monsterId;
  }

  private String normalizeOptionalOverrideText(String valueRaw) {
    String value = valueRaw == null ? "" : valueRaw.trim();
    return value.isBlank() ? null : value;
  }

  private List<String> normalizeRequiredTokenIds(List<String> tokenIdsRaw) {
    if (tokenIdsRaw == null || tokenIdsRaw.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tokens são obrigatórios.");
    }

    LinkedHashSet<String> normalizedTokenIds = new LinkedHashSet<>();
    for (String tokenIdRaw : tokenIdsRaw) {
      String tokenId = tokenIdRaw == null ? "" : tokenIdRaw.trim();
      if (tokenId.isBlank()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token é obrigatório.");
      }
      normalizedTokenIds.add(tokenId);
    }

    if (normalizedTokenIds.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tokens são obrigatórios.");
    }

    return List.copyOf(normalizedTokenIds);
  }

  private SpawnTokenRequest normalizeOptionalMonsterSpawnToken(String sceneIdRaw, Integer x, Integer y) {
    String sceneId = sceneIdRaw == null ? "" : sceneIdRaw.trim();
    boolean hasSceneId = !sceneId.isBlank();
    boolean hasX = x != null;
    boolean hasY = y != null;

    if (!hasSceneId && !hasX && !hasY) {
      return null;
    }

    if (!hasSceneId || !hasX || !hasY) {
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST,
          "sceneId, x e y devem ser enviados juntos para criar token no spawn do monstro."
      );
    }

    if (x < 0 || y < 0) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Posição inválida.");
    }

    return new SpawnTokenRequest(sceneId, x, y);
  }

  private ObjectNode buildTokenNode(String characterId, String sceneId, int x, int y) {
    ObjectNode tokenNode = objectMapper.createObjectNode();
    tokenNode.put("id", UUID.randomUUID().toString());
    tokenNode.put("characterId", characterId);
    tokenNode.put("sceneId", sceneId);
    ObjectNode positionNode = objectMapper.createObjectNode();
    positionNode.put("x", x);
    positionNode.put("y", y);
    tokenNode.set("position", positionNode);
    return tokenNode;
  }

  private ObjectNode buildMonsterCharacterNode(String monsterId, String nameOverride) {
    MonsterCatalogManifestService.MonsterCatalogEntry monsterEntry = monsterCatalogManifestService.requireKnownMonster(monsterId);
    Integer hitPointMaximum = monsterEntry.hitPointMaximum();
    if (hitPointMaximum == null || hitPointMaximum < 1) {
      throw new ResponseStatusException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Catálogo canônico do monstro está sem hitPointMaximum válido."
      );
    }

    ObjectNode characterNode = objectMapper.createObjectNode();
    characterNode.put("id", UUID.randomUUID().toString());
    characterNode.put("type", "NPC");
    characterNode.put("monsterId", monsterId);
    if (nameOverride == null) {
      characterNode.putNull("nameOverride");
    } else {
      characterNode.put("nameOverride", nameOverride);
    }
    characterNode.putNull("imageOverride");

    ObjectNode hitPointsNode = objectMapper.createObjectNode();
    hitPointsNode.put("current", hitPointMaximum);
    hitPointsNode.put("temporary", 0);
    characterNode.set("hitPoints", hitPointsNode);

    ObjectNode resourcePoolsNode = objectMapper.createObjectNode();
    resourcePoolsNode.putArray("pools");
    characterNode.set("resourcePools", resourcePoolsNode);

    ObjectNode activeEffectsNode = objectMapper.createObjectNode();
    activeEffectsNode.putArray("effects");
    characterNode.set("activeEffects", activeEffectsNode);

    characterNode.putNull("notes");

    SessionCharacterPayloadValidator.validateMonsterForCreate(characterNode);
    return characterNode;
  }

  private void normalizeControlledByUserIdField(ObjectNode characterNode) {
    if ("NPC".equals(characterNode.path("type").asText("").trim())) {
      characterNode.remove("controlledByUserId");
      return;
    }

    Long controlledByUserId = readControlledByUserId(characterNode);
    writeControlledByUserId(characterNode, controlledByUserId);
  }

  private Long readControlledByUserId(ObjectNode characterNode) {
    JsonNode controlledByUserIdNode = characterNode.get("controlledByUserId");
    if (controlledByUserIdNode == null || controlledByUserIdNode.isNull()) {
      return null;
    }

    if (!controlledByUserIdNode.canConvertToLong()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "controlledByUserId inválido.");
    }

    long controlledByUserId = controlledByUserIdNode.asLong();
    if (controlledByUserId <= 0) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "controlledByUserId inválido.");
    }

    return controlledByUserId;
  }

  private void writeControlledByUserId(ObjectNode characterNode, Long controlledByUserId) {
    if (controlledByUserId == null) {
      characterNode.putNull("controlledByUserId");
      return;
    }

    characterNode.put("controlledByUserId", controlledByUserId);
  }

  private Long normalizeControlledByUserIdForAssignment(GameEntity game, Long controlledByUserId) {
    if (controlledByUserId == null) {
      return null;
    }

    if (controlledByUserId <= 0) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Controlador inválido.");
    }

    Long ownerUserId = game.getOwner().getId();
    if (ownerUserId.equals(controlledByUserId)) {
      return controlledByUserId;
    }

    if (gameMemberRepository.existsByGameIdAndUserId(game.getId(), controlledByUserId)) {
      return controlledByUserId;
    }

    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O controlador precisa ser um membro ativo da mesa.");
  }

  private Integer findCombatParticipantIndex(ObjectNode combatState, String tokenId) {
    ArrayNode participants = resolveCombatParticipants(combatState);
    for (int i = 0; i < participants.size(); i++) {
      JsonNode participantNode = participants.get(i);
      if (tokenId.equals(participantNode.path("tokenId").asText("").trim())) {
        return i;
      }
    }
    return null;
  }

  private void consumeActionForActiveParticipant(ObjectNode combatState) {
    ObjectNode turnResources = resolveCombatTurnResources(combatState);
    turnResources.put("actionAvailable", false);
    autoAdvanceCombatTurnIfExhausted(combatState);
  }

  private void consumeMovementForActiveParticipant(
      ObjectNode combatState,
      ObjectNode rootNode,
      ArrayNode tokensNode,
      ObjectNode movedToken,
      int nextX,
      int nextY
  ) {
    Integer participantIndex = findCombatParticipantIndex(
        combatState,
        movedToken.path("id").asText("").trim()
    );
    if (participantIndex == null) {
      return;
    }

    int turnIndex = normalizeCombatTurnIndex(combatState);
    if (participantIndex != turnIndex) {
      return;
    }

    JsonNode currentPositionNode = movedToken.path("position");
    int currentX = currentPositionNode.path("x").asInt(nextX);
    int currentY = currentPositionNode.path("y").asInt(nextY);
    ObjectNode turnResources = resolveCombatTurnResources(combatState);
    int remainingMovementCells = Math.max(0, turnResources.path("remainingMovementCells").asInt(0));

    MovementPathEvaluation movementPath = evaluateMovementPathCost(
        rootNode,
        tokensNode,
        movedToken.path("id").asText("").trim(),
        currentX,
        currentY,
        nextX,
        nextY,
        remainingMovementCells
    );

    if (!movementPath.reachable()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Local inválido para movimento.");
    }

    int movementCostCells = movementPath.costCells();
    if (movementCostCells <= 0) {
      return;
    }

    if (movementCostCells > remainingMovementCells) {
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST,
          "O participante do turno atual não possui deslocamento suficiente."
      );
    }

    turnResources.put("remainingMovementCells", remainingMovementCells - movementCostCells);
    autoAdvanceCombatTurnIfExhausted(combatState);
  }

  private MovementPathEvaluation evaluateMovementPathCost(
      ObjectNode rootNode,
      ArrayNode tokensNode,
      String movingTokenId,
      int startX,
      int startY,
      int targetX,
      int targetY,
      int remainingMovementCells
  ) {
    ObjectNode movingTokenNode = findTokenById(tokensNode, movingTokenId);
    if (movingTokenNode == null) {
      return new MovementPathEvaluation(false, 0);
    }

    GridSize movingTokenSize = resolveTokenGridSize(rootNode, movingTokenNode);
    GridBounds boardBounds = parseBoardBounds(rootNode);

    int searchRadius = Math.max(
        40,
        Math.max(
            Math.max(Math.abs(targetX - startX), Math.abs(targetY - startY)) + 20,
            remainingMovementCells + 20
        )
    );

    int minX = Math.min(startX, targetX) - searchRadius;
    int maxX = Math.max(startX, targetX) + searchRadius;
    int minY = Math.min(startY, targetY) - searchRadius;
    int maxY = Math.max(startY, targetY) + searchRadius;

    Set<String> blockedCellKeys = parseBlockedCellKeys(rootNode);
    Set<String> blockedEdgeKeys = parseBlockedEdgeKeys(rootNode);
    Set<String> occupiedCellKeys = parseOccupiedCellKeys(rootNode, tokensNode, movingTokenId);

    String targetKey = gridKey(targetX, targetY);
    String startKey = gridKey(startX, startY);
    if (!canOccupyAnchor(
        targetX,
        targetY,
        movingTokenSize,
        boardBounds,
        blockedCellKeys,
        occupiedCellKeys
    )) {
      return new MovementPathEvaluation(false, 0);
    }

    ArrayDeque<GridCell> queue = new ArrayDeque<>();
    Map<String, Integer> costByCell = new HashMap<>();
    queue.addLast(new GridCell(startX, startY));
    costByCell.put(startKey, 0);

    while (!queue.isEmpty()) {
      GridCell current = queue.removeFirst();
      String currentKey = gridKey(current.x(), current.y());
      Integer currentCost = costByCell.get(currentKey);
      if (currentCost == null) {
        continue;
      }

      if (current.x() == targetX && current.y() == targetY) {
        return new MovementPathEvaluation(true, currentCost);
      }

      for (int deltaX = -1; deltaX <= 1; deltaX += 1) {
        for (int deltaY = -1; deltaY <= 1; deltaY += 1) {
          if (deltaX == 0 && deltaY == 0) {
            continue;
          }

          int nextX = current.x() + deltaX;
          int nextY = current.y() + deltaY;
          if (nextX < minX || nextX > maxX || nextY < minY || nextY > maxY) {
            continue;
          }

            if (!isTraversalAllowed(
              current.x(),
              current.y(),
              nextX,
              nextY,
              movingTokenSize,
              boardBounds,
              blockedCellKeys,
              blockedEdgeKeys,
              occupiedCellKeys
          )) {
            continue;
          }

          String nextKey = gridKey(nextX, nextY);
          int nextCost = currentCost + 1;
          Integer previousCost = costByCell.get(nextKey);
          if (previousCost != null && previousCost <= nextCost) {
            continue;
          }

          costByCell.put(nextKey, nextCost);
          queue.addLast(new GridCell(nextX, nextY));
        }
      }
    }

    return new MovementPathEvaluation(false, 0);
  }

  private boolean isTraversalAllowed(
      int fromX,
      int fromY,
      int toX,
      int toY,
      GridSize movingTokenSize,
      GridBounds boardBounds,
      Set<String> blockedCellKeys,
      Set<String> blockedEdgeKeys,
      Set<String> occupiedCellKeys
  ) {
    if (!canStepToAnchor(
        fromX,
        fromY,
        toX,
        toY,
        movingTokenSize,
        boardBounds,
        blockedCellKeys,
        blockedEdgeKeys,
        occupiedCellKeys
    )) {
      return false;
    }

    int deltaX = toX - fromX;
    int deltaY = toY - fromY;
    boolean diagonal = Math.abs(deltaX) == 1 && Math.abs(deltaY) == 1;
    if (!diagonal) {
      return true;
    }

    int horizontalX = fromX + deltaX;
    int horizontalY = fromY;
    int verticalX = fromX;
    int verticalY = fromY + deltaY;

    return canStepToAnchor(
        fromX,
        fromY,
        horizontalX,
        horizontalY,
        movingTokenSize,
        boardBounds,
        blockedCellKeys,
        blockedEdgeKeys,
        occupiedCellKeys
    ) && canStepToAnchor(
        fromX,
        fromY,
        verticalX,
        verticalY,
        movingTokenSize,
        boardBounds,
        blockedCellKeys,
        blockedEdgeKeys,
        occupiedCellKeys
    );
  }

  private boolean canStepToAnchor(
      int fromX,
      int fromY,
      int toX,
      int toY,
      GridSize movingTokenSize,
      GridBounds boardBounds,
      Set<String> blockedCellKeys,
      Set<String> blockedEdgeKeys,
      Set<String> occupiedCellKeys
  ) {
    if (!canOccupyAnchor(toX, toY, movingTokenSize, boardBounds, blockedCellKeys, occupiedCellKeys)) {
      return false;
    }

    return canCrossEdges(fromX, fromY, toX, toY, movingTokenSize, blockedEdgeKeys);
  }

  private boolean canOccupyAnchor(
      int anchorX,
      int anchorY,
      GridSize size,
      GridBounds boardBounds,
      Set<String> blockedCellKeys,
      Set<String> occupiedCellKeys
  ) {
    if (boardBounds != null) {
      if (
          anchorX < 0 ||
              anchorY < 0 ||
              anchorX + size.width() > boardBounds.widthInUnits() ||
              anchorY + size.height() > boardBounds.heightInUnits()
      ) {
        return false;
      }
    }

    for (int offsetY = 0; offsetY < size.height(); offsetY += 1) {
      for (int offsetX = 0; offsetX < size.width(); offsetX += 1) {
        String key = gridKey(anchorX + offsetX, anchorY + offsetY);
        if (blockedCellKeys.contains(key) || occupiedCellKeys.contains(key)) {
          return false;
        }
      }
    }

    return true;
  }

  private boolean canCrossEdges(
      int fromX,
      int fromY,
      int toX,
      int toY,
      GridSize size,
      Set<String> blockedEdgeKeys
  ) {
    int deltaX = toX - fromX;
    int deltaY = toY - fromY;

    Set<String> fromFootprint = new HashSet<>();
    for (int offsetY = 0; offsetY < size.height(); offsetY += 1) {
      for (int offsetX = 0; offsetX < size.width(); offsetX += 1) {
        fromFootprint.add(gridKey(fromX + offsetX, fromY + offsetY));
      }
    }

    for (int offsetY = 0; offsetY < size.height(); offsetY += 1) {
      for (int offsetX = 0; offsetX < size.width(); offsetX += 1) {
        int destinationCellX = toX + offsetX;
        int destinationCellY = toY + offsetY;
        int sourceCellX = destinationCellX - deltaX;
        int sourceCellY = destinationCellY - deltaY;

        if (!fromFootprint.contains(gridKey(sourceCellX, sourceCellY))) {
          continue;
        }

        int manhattanDistance = Math.abs(sourceCellX - destinationCellX) + Math.abs(sourceCellY - destinationCellY);
        if (manhattanDistance != 1) {
          continue;
        }

        if (blockedEdgeKeys.contains(edgeKey(sourceCellX, sourceCellY, destinationCellX, destinationCellY))) {
          return false;
        }
      }
    }

    return true;
  }

  private Set<String> parseOccupiedCellKeys(ObjectNode rootNode, ArrayNode tokensNode, String movingTokenId) {
    Set<String> occupied = new HashSet<>();
    for (int index = 0; index < tokensNode.size(); index += 1) {
      JsonNode tokenNode = tokensNode.get(index);
      if (!(tokenNode instanceof ObjectNode tokenObject)) {
        continue;
      }

      String tokenId = tokenObject.path("id").asText("").trim();
      if (tokenId.isBlank() || tokenId.equals(movingTokenId)) {
        continue;
      }

      JsonNode positionNode = tokenObject.path("position");
      int tokenX = positionNode.path("x").asInt(Integer.MIN_VALUE);
      int tokenY = positionNode.path("y").asInt(Integer.MIN_VALUE);
      if (tokenX == Integer.MIN_VALUE || tokenY == Integer.MIN_VALUE) {
        continue;
      }

      GridSize tokenSize = resolveTokenGridSize(rootNode, tokenObject);
      for (int offsetY = 0; offsetY < tokenSize.height(); offsetY += 1) {
        for (int offsetX = 0; offsetX < tokenSize.width(); offsetX += 1) {
          occupied.add(gridKey(tokenX + offsetX, tokenY + offsetY));
        }
      }
    }
    return occupied;
  }

  private GridSize resolveTokenGridSize(ObjectNode rootNode, ObjectNode tokenNode) {
    String characterId = tokenNode.path("characterId").asText("").trim();
    if (characterId.isBlank()) {
      return new GridSize(1, 1);
    }

    ArrayNode charactersNode = ensureArray(rootNode, "characters");
    ObjectNode characterNode = findCharacterById(charactersNode, characterId);
    return resolveCharacterGridSize(characterNode);
  }

  private GridSize resolveCharacterGridSize(ObjectNode characterNode) {
    if (characterNode == null) {
      return new GridSize(1, 1);
    }

    String explicitSize = characterNode.path("size").asText("").trim();
    if (!explicitSize.isBlank()) {
      return toGridSize(explicitSize);
    }

    String characterType = characterNode.path("type").asText("").trim();
    if (!"NPC".equals(characterType)) {
      return new GridSize(1, 1);
    }

    MonsterCatalogManifestService.MonsterCatalogEntry monsterEntry = resolveMonsterCatalogEntry(characterNode);
    return toGridSize(monsterEntry.size());
  }

  private GridSize toGridSize(String sizeRaw) {
    if (sizeRaw == null) {
      return new GridSize(1, 1);
    }

    String normalized = sizeRaw.trim().toLowerCase(Locale.ROOT);
    return switch (normalized) {
      case "large" -> new GridSize(2, 2);
      case "huge" -> new GridSize(3, 3);
      case "gargantuan" -> new GridSize(4, 4);
      case "tiny", "small", "medium" -> new GridSize(1, 1);
      default -> new GridSize(1, 1);
    };
  }

  private GridBounds parseBoardBounds(ObjectNode rootNode) {
    JsonNode pageSettingsNode = rootNode.path("pageSettings");
    if (!(pageSettingsNode instanceof ObjectNode pageSettingsObject)) {
      return null;
    }

    int widthInUnits = pageSettingsObject.path("widthInUnits").asInt(0);
    int heightInUnits = pageSettingsObject.path("heightInUnits").asInt(0);
    if (widthInUnits <= 0 || heightInUnits <= 0) {
      return null;
    }

    return new GridBounds(widthInUnits, heightInUnits);
  }

  private Set<String> parseBlockedCellKeys(ObjectNode rootNode) {
    Set<String> blocked = new HashSet<>();
    JsonNode blockedCellsNode = rootNode.path("collision").path("blockedCells");
    if (!(blockedCellsNode instanceof ArrayNode blockedCellsArray)) {
      return blocked;
    }

    for (int index = 0; index < blockedCellsArray.size(); index += 1) {
      JsonNode cellNode = blockedCellsArray.get(index);
      int cellX = cellNode.path("x").asInt(Integer.MIN_VALUE);
      int cellY = cellNode.path("y").asInt(Integer.MIN_VALUE);
      if (cellX == Integer.MIN_VALUE || cellY == Integer.MIN_VALUE) {
        continue;
      }
      blocked.add(gridKey(cellX, cellY));
    }

    return blocked;
  }

  private Set<String> parseBlockedEdgeKeys(ObjectNode rootNode) {
    Set<String> blocked = new HashSet<>();
    JsonNode blockedEdgesNode = rootNode.path("collision").path("blockedEdges");
    if (!(blockedEdgesNode instanceof ArrayNode blockedEdgesArray)) {
      return blocked;
    }

    for (int index = 0; index < blockedEdgesArray.size(); index += 1) {
      JsonNode edgeNode = blockedEdgesArray.get(index);
      JsonNode fromNode = edgeNode.path("from");
      JsonNode toNode = edgeNode.path("to");

      int fromX = fromNode.path("x").asInt(Integer.MIN_VALUE);
      int fromY = fromNode.path("y").asInt(Integer.MIN_VALUE);
      int toX = toNode.path("x").asInt(Integer.MIN_VALUE);
      int toY = toNode.path("y").asInt(Integer.MIN_VALUE);
      if (
          fromX == Integer.MIN_VALUE ||
              fromY == Integer.MIN_VALUE ||
              toX == Integer.MIN_VALUE ||
              toY == Integer.MIN_VALUE
      ) {
        continue;
      }

      int manhattanDistance = Math.abs(toX - fromX) + Math.abs(toY - fromY);
      if (manhattanDistance != 1) {
        continue;
      }

      blocked.add(edgeKey(fromX, fromY, toX, toY));
    }

    return blocked;
  }

  private String gridKey(int x, int y) {
    return x + ":" + y;
  }

  private String edgeKey(int fromX, int fromY, int toX, int toY) {
    String first = gridKey(fromX, fromY);
    String second = gridKey(toX, toY);
    return first.compareTo(second) <= 0 ? first + "|" + second : second + "|" + first;
  }

  private void autoAdvanceCombatTurnIfExhausted(ObjectNode combatState) {
    ObjectNode turnResources = resolveCombatTurnResources(combatState);
    boolean actionAvailable = turnResources.path("actionAvailable").asBoolean(false);
    int remainingMovementCells = Math.max(0, turnResources.path("remainingMovementCells").asInt(0));
    if (actionAvailable || remainingMovementCells > 0) {
      return;
    }

    advanceCombatStateInPlace(combatState);
  }

  private boolean isNpcCharacter(ObjectNode characterNode) {
    return "NPC".equals(characterNode.path("type").asText("").trim());
  }

  private boolean characterHasCondition(ObjectNode characterNode, String conditionId) {
    if (characterNode == null || conditionId == null || conditionId.isBlank()) {
      return false;
    }

    JsonNode activeEffectsNode = characterNode.path("activeEffects").path("effects");
    if (!(activeEffectsNode instanceof ArrayNode effectsArray)) {
      return false;
    }

    for (int i = 0; i < effectsArray.size(); i += 1) {
      JsonNode effectNode = effectsArray.get(i);
      if (!(effectNode instanceof ObjectNode effectObject)) {
        continue;
      }

      String linkedCondition = effectObject.path("linkedCondition").asText("").trim();
      if (conditionId.equals(linkedCondition)) {
        return true;
      }
    }

    return false;
  }

  private boolean applyNpcDeadConditionIfNeeded(ObjectNode characterNode) {
    if (!isNpcCharacter(characterNode)) {
      return false;
    }

    ObjectNode hitPointContainer = resolveHitPointContainer(characterNode);
    int currentHp = Math.max(0, hitPointContainer.path("current").asInt(0));
    if (currentHp > 0) {
      return false;
    }

    ArrayNode effects = resolveCharacterActiveEffectsArray(characterNode);
    for (int i = 0; i < effects.size(); i += 1) {
      JsonNode effectNode = effects.get(i);
      if (!(effectNode instanceof ObjectNode effectObject)) {
        continue;
      }

      String linkedCondition = effectObject.path("linkedCondition").asText("").trim();
      if ("dead".equals(linkedCondition)) {
        return false;
      }
    }

    int nextEffectIndex = 0;
    for (int i = 0; i < effects.size(); i += 1) {
      JsonNode effectNode = effects.get(i);
      if (!(effectNode instanceof ObjectNode effectObject)) {
        continue;
      }
      nextEffectIndex = Math.max(nextEffectIndex, effectObject.path("effectIndex").asInt(-1) + 1);
    }

    ObjectNode deadEffect = objectMapper.createObjectNode();
    deadEffect.put("instanceId", UUID.randomUUID().toString());

    ObjectNode sourceNode = objectMapper.createObjectNode();
    sourceNode.put("sourceType", "action");
    sourceNode.put("sourceId", "act-apply-effect");
    deadEffect.set("source", sourceNode);

    deadEffect.put("effectIndex", nextEffectIndex);
    deadEffect.put("linkedCondition", "dead");
    deadEffect.put("stackCount", 1);
    deadEffect.put("isSuppressed", false);
    effects.add(deadEffect);
    return true;
  }

  private boolean removeConditionFromCharacterIfPresent(ObjectNode characterNode, String conditionId) {
    if (characterNode == null || conditionId == null || conditionId.isBlank()) {
      return false;
    }

    ArrayNode effects = resolveCharacterActiveEffectsArray(characterNode);
    boolean removed = false;
    for (int i = effects.size() - 1; i >= 0; i -= 1) {
      JsonNode effectNode = effects.get(i);
      if (!(effectNode instanceof ObjectNode effectObject)) {
        continue;
      }

      String linkedCondition = effectObject.path("linkedCondition").asText("").trim();
      if (!conditionId.equals(linkedCondition)) {
        continue;
      }

      effects.remove(i);
      removed = true;
    }

    return removed;
  }

  private ArrayNode resolveCharacterActiveEffectsArray(ObjectNode characterNode) {
    JsonNode activeEffectsNode = characterNode.get("activeEffects");
    if (activeEffectsNode instanceof ObjectNode activeEffectsObject) {
      JsonNode effectsNode = activeEffectsObject.get("effects");
      if (effectsNode instanceof ArrayNode effectsArray) {
        return effectsArray;
      }
      return activeEffectsObject.putArray("effects");
    }

    ObjectNode activeEffectsObject = objectMapper.createObjectNode();
    ArrayNode effectsArray = activeEffectsObject.putArray("effects");
    characterNode.set("activeEffects", activeEffectsObject);
    return effectsArray;
  }

  private void removeCombatParticipantByTokenId(ObjectNode rootNode, ObjectNode combatState, String tokenId) {
    ArrayNode participants = resolveCombatParticipants(combatState);
    int previousTurnIndex = Math.max(0, combatState.path("turnIndex").asInt(0));

    int removedIndex = -1;
    for (int i = 0; i < participants.size(); i += 1) {
      JsonNode participantNode = participants.get(i);
      if (tokenId.equals(participantNode.path("tokenId").asText("").trim())) {
        removedIndex = i;
        break;
      }
    }

    if (removedIndex < 0) {
      return;
    }

    participants.remove(removedIndex);

    if (participants.isEmpty()) {
      rootNode.putNull("combat");
      return;
    }

    int adjustedTurnIndex = previousTurnIndex;
    if (removedIndex < previousTurnIndex) {
      adjustedTurnIndex = previousTurnIndex - 1;
    }
    if (adjustedTurnIndex >= participants.size()) {
      adjustedTurnIndex = 0;
    }

    combatState.put("turnIndex", Math.max(0, adjustedTurnIndex));
    if (removedIndex == previousTurnIndex) {
      combatState.set("turnResources", buildTurnResourcesFromParticipants(combatState, participants));
    }
  }

  private void advanceCombatStateInPlace(ObjectNode combatState) {
    ArrayNode participants = resolveCombatParticipants(combatState);
    if (participants.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O combate ativo não possui participantes.");
    }

    int currentTurnIndex = Math.max(0, combatState.path("turnIndex").asInt(0));
    int nextTurnIndex = currentTurnIndex + 1;
    int currentRound = Math.max(1, combatState.path("round").asInt(1));
    if (nextTurnIndex >= participants.size()) {
      nextTurnIndex = 0;
      currentRound += 1;
    }

    combatState.put("turnIndex", nextTurnIndex);
    combatState.put("round", currentRound);
    combatState.set("turnResources", buildTurnResourcesFromParticipants(combatState, participants));
  }

  private int normalizeCombatTurnIndex(ObjectNode combatState) {
    ArrayNode participants = resolveCombatParticipants(combatState);
    if (participants.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O combate ativo não possui participantes.");
    }

    int rawTurnIndex = Math.max(0, combatState.path("turnIndex").asInt(0));
    if (rawTurnIndex >= participants.size()) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Estado de turno do combate está corrompido.");
    }
    return rawTurnIndex;
  }

  private ObjectNode buildTurnResourcesForActiveParticipant(ObjectNode combatState, ObjectNode rootNode) {
    ArrayNode charactersNode = ensureArray(rootNode, "characters");
    return buildTurnResourcesForActiveParticipant(combatState, charactersNode);
  }

  private ObjectNode buildTurnResourcesForActiveParticipant(ObjectNode combatState, ArrayNode charactersNode) {
    ArrayNode participants = resolveCombatParticipants(combatState);
    int turnIndex = normalizeCombatTurnIndex(combatState);
    JsonNode activeParticipant = participants.get(turnIndex);
    String characterId = activeParticipant.path("characterId").asText("").trim();
    ObjectNode characterNode = findCharacterById(charactersNode, characterId);
    int movementBudgetCells = resolveMovementBudgetCells(characterNode);

    ObjectNode turnResources = objectMapper.createObjectNode();
    turnResources.put("actionAvailable", true);
    turnResources.put("bonusActionAvailable", true);
    turnResources.put("remainingMovementCells", movementBudgetCells);
    turnResources.put("totalMovementCells", movementBudgetCells);
    return turnResources;
  }

  private ObjectNode buildTurnResourcesFromParticipants(ObjectNode combatState, ArrayNode participants) {
    int turnIndex = normalizeCombatTurnIndex(combatState);
    JsonNode activeParticipant = participants.get(turnIndex);
    int movementBudgetCells = Math.max(1, activeParticipant.path("movementBudgetCells").asInt(DEFAULT_MOVEMENT_CELLS));

    ObjectNode turnResources = objectMapper.createObjectNode();
    turnResources.put("actionAvailable", true);
    turnResources.put("bonusActionAvailable", true);
    turnResources.put("remainingMovementCells", movementBudgetCells);
    turnResources.put("totalMovementCells", movementBudgetCells);
    return turnResources;
  }

  private int resolveMovementBudgetCells(ObjectNode characterNode) {
    if (characterNode == null) {
      return DEFAULT_MOVEMENT_CELLS;
    }

    JsonNode speedNode = characterNode.path("combatStats").path("speed");
    if (!speedNode.isNumber()) {
      return DEFAULT_MOVEMENT_CELLS;
    }

    int speedFeet = Math.max(0, speedNode.asInt(0));
    if (speedFeet <= 0) {
      return DEFAULT_MOVEMENT_CELLS;
    }

    return Math.max(1, speedFeet / 5);
  }

  private List<ObjectNode> buildCombatInitiativeMessages(
      ArrayNode participants,
      ArrayNode charactersNode,
      Instant createdAt
  ) {
    List<ObjectNode> messages = new java.util.ArrayList<>();

    for (int i = 0; i < participants.size(); i++) {
      JsonNode participantNode = participants.get(i);
      String characterId = participantNode.path("characterId").asText("").trim();
      String tokenId = participantNode.path("tokenId").asText("").trim();
      String participantLabel = resolveCombatParticipantLabel(charactersNode, characterId, tokenId);
      int initiativeRoll = participantNode.path("initiativeRoll").asInt(0);
      int initiativeTotal = participantNode.path("initiativeTotal").asInt(0);
      int dexterityModifier = getAbilityModifier(participantNode.path("dexterityScore").asInt(10));

      ObjectNode messageNode = objectMapper.createObjectNode();
      messageNode.put("id", UUID.randomUUID().toString());
      messageNode.put("sender", "Sistema");
      messageNode.put("text", String.format(
          Locale.ROOT,
          "Iniciativa - %s: %d (d20 %d %+d DES).",
          participantLabel,
          initiativeTotal,
          initiativeRoll,
          dexterityModifier
      ));
      messageNode.put("timestamp", createdAt.toString());
      messageNode.put("isDiceRoll", false);
      messages.add(messageNode);
    }

    return messages;
  }

  private String resolveCombatParticipantLabel(ArrayNode charactersNode, String characterId, String fallbackTokenId) {
    if (!characterId.isBlank()) {
      ObjectNode characterNode = findCharacterById(charactersNode, characterId);
      if (characterNode != null) {
        String name = characterNode.path("name").asText("").trim();
        if (!name.isBlank()) {
          return name;
        }

        if ("NPC".equals(characterNode.path("type").asText("").trim())) {
          String nameOverride = characterNode.path("nameOverride").asText("").trim();
          if (!nameOverride.isBlank()) {
            return nameOverride;
          }

          return resolveMonsterCatalogEntry(characterNode).primaryName();
        }
      }
    }

    return fallbackTokenId;
  }

  private void publishMessageEvents(
      Long gameId,
      Long actorUserId,
      long serverVersion,
      List<ObjectNode> messages,
      Instant createdAt
  ) {
    for (ObjectNode messageNode : messages) {
      ObjectNode payloadNode = objectMapper.createObjectNode();
      payloadNode.set("message", messageNode.deepCopy());

      GameSessionEventResponse event = new GameSessionEventResponse(
          UUID.randomUUID().toString(),
          gameId,
          serverVersion,
          "CHAT_MESSAGE_CREATED",
          actorUserId,
          payloadNode,
          createdAt
      );

      messagingTemplate.convertAndSend(gameTopic(gameId), event);
    }
  }

  private CombatSyncResult syncCombatStateAfterRemovedTokenIds(ObjectNode rootNode, List<String> removedTokenIds) {
    if (removedTokenIds == null || removedTokenIds.isEmpty()) {
      return new CombatSyncResult(false, null);
    }

    ObjectNode combatState = getActiveCombatState(rootNode);
    if (combatState == null) {
      return new CombatSyncResult(false, null);
    }

    java.util.Set<String> removedTokenIdSet = new java.util.HashSet<>(removedTokenIds);
    ArrayNode participants = resolveCombatParticipants(combatState);
    int previousTurnIndex = Math.max(0, combatState.path("turnIndex").asInt(0));
    int removedBeforeTurn = 0;
    boolean removedCurrentTurnParticipant = false;

    for (int i = participants.size() - 1; i >= 0; i--) {
      JsonNode participantNode = participants.get(i);
      String tokenId = participantNode.path("tokenId").asText("").trim();
      if (!removedTokenIdSet.contains(tokenId)) {
        continue;
      }
      if (i < previousTurnIndex) {
        removedBeforeTurn += 1;
      }
      if (i == previousTurnIndex) {
        removedCurrentTurnParticipant = true;
      }
      participants.remove(i);
    }

    if (participants.isEmpty()) {
      rootNode.putNull("combat");
      return new CombatSyncResult(true, null);
    }

    int adjustedTurnIndex = Math.max(0, previousTurnIndex - removedBeforeTurn);
    if (adjustedTurnIndex >= participants.size()) {
      adjustedTurnIndex = 0;
    }
    combatState.put("turnIndex", adjustedTurnIndex);
    if (removedCurrentTurnParticipant) {
      combatState.set("turnResources", buildTurnResourcesFromParticipants(combatState, participants));
    }
    return new CombatSyncResult(true, combatState.deepCopy());
  }

  private ObjectNode parseStateAsObject(GameSessionStateEntity sessionState, Long gameId) {
    try {
      JsonNode parsed = objectMapper.readTree(sessionState.getStateJson());
      if (parsed.isObject()) {
        return (ObjectNode) parsed;
      }

      logger.error(
          "event=game_session_state_invalid_root gameId={} stateId={}",
          gameId,
          sessionState.getId()
      );
      throw new ResponseStatusException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Estado da sessão persistido está corrompido."
      );
    } catch (JsonProcessingException e) {
      logger.error("event=game_session_state_corrupted gameId={} stateId={}", gameId, sessionState.getId(), e);
      throw new ResponseStatusException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Estado da sessão persistido está corrompido."
      );
    }
  }

  private ArrayNode ensureArray(ObjectNode root, String fieldName) {
    JsonNode current = root.get(fieldName);
    if (current instanceof ArrayNode arrayNode) {
      return arrayNode;
    }
    return root.putArray(fieldName);
  }

  private ObjectNode findTokenById(ArrayNode tokensNode, String tokenId) {
    for (int i = 0; i < tokensNode.size(); i++) {
      JsonNode token = tokensNode.get(i);
      if (!(token instanceof ObjectNode tokenObject)) {
        continue;
      }
      JsonNode idNode = tokenObject.get("id");
      if (idNode != null && tokenId.equals(idNode.asText())) {
        return tokenObject;
      }
    }
    return null;
  }

  private java.util.List<String> findTokenIdsByCharacterId(ArrayNode tokensNode, String characterId) {
    java.util.List<String> tokenIds = new java.util.ArrayList<>();
    for (int i = 0; i < tokensNode.size(); i += 1) {
      JsonNode tokenNode = tokensNode.get(i);
      if (!(tokenNode instanceof ObjectNode tokenObject)) {
        continue;
      }

      String tokenCharacterId = tokenObject.path("characterId").asText("").trim();
      if (!characterId.equals(tokenCharacterId)) {
        continue;
      }

      String tokenId = tokenObject.path("id").asText("").trim();
      if (!tokenId.isBlank()) {
        tokenIds.add(tokenId);
      }
    }
    return tokenIds;
  }

  private int findTokenIndexById(ArrayNode tokensNode, String tokenId) {
    for (int i = 0; i < tokensNode.size(); i++) {
      JsonNode token = tokensNode.get(i);
      if (!(token instanceof ObjectNode tokenObject)) {
        continue;
      }
      JsonNode idNode = tokenObject.get("id");
      if (idNode != null && tokenId.equals(idNode.asText())) {
        return i;
      }
    }
    return -1;
  }

  private boolean hasAnyTokenForCharacter(ArrayNode tokensNode, String characterId) {
    for (int i = 0; i < tokensNode.size(); i++) {
      JsonNode token = tokensNode.get(i);
      if (!(token instanceof ObjectNode tokenObject)) {
        continue;
      }
      String tokenCharacterId = tokenObject.path("characterId").asText("").trim();
      if (characterId.equals(tokenCharacterId)) {
        return true;
      }
    }
    return false;
  }

  private ObjectNode findCharacterById(ArrayNode charactersNode, String characterId) {
    for (int i = 0; i < charactersNode.size(); i++) {
      JsonNode character = charactersNode.get(i);
      if (!(character instanceof ObjectNode characterObject)) {
        continue;
      }
      JsonNode idNode = characterObject.get("id");
      if (idNode != null && characterId.equals(idNode.asText())) {
        return characterObject;
      }
    }
    return null;
  }

  private int findCharacterIndexById(ArrayNode charactersNode, String characterId) {
    for (int i = 0; i < charactersNode.size(); i++) {
      JsonNode character = charactersNode.get(i);
      if (!(character instanceof ObjectNode characterObject)) {
        continue;
      }
      JsonNode idNode = characterObject.get("id");
      if (idNode != null && characterId.equals(idNode.asText())) {
        return i;
      }
    }
    return -1;
  }

  private void trimMessages(ArrayNode messagesNode) {
    while (messagesNode.size() > MAX_MESSAGES) {
      messagesNode.remove(0);
    }
  }

  private String buildDuplicatedCharacterName(ArrayNode charactersNode, String sourceName) {
    int suffix = 1;
    String candidate = sourceName + " [" + suffix + "]";

    while (characterNameExists(charactersNode, candidate)) {
      suffix += 1;
      candidate = sourceName + " [" + suffix + "]";
    }

    return candidate;
  }

  private boolean characterNameExists(ArrayNode charactersNode, String candidateName) {
    for (int i = 0; i < charactersNode.size(); i++) {
      JsonNode character = charactersNode.get(i);
      if (!(character instanceof ObjectNode characterObject)) {
        continue;
      }

      String currentName = characterObject.path("name").asText("").trim();
      if (candidateName.equals(currentName)) {
        return true;
      }
    }

    return false;
  }

  private ObjectNode buildDuplicatedCharacterNode(
      ArrayNode charactersNode,
      ObjectNode sourceCharacterNode,
      String sourceCharacterId
  ) {
    if ("NPC".equals(sourceCharacterNode.path("type").asText("").trim())) {
      return buildDuplicatedMonsterCharacterNode(sourceCharacterNode);
    }

    ObjectNode duplicatedCharacterNode = sourceCharacterNode.deepCopy();
    duplicatedCharacterNode.put("id", UUID.randomUUID().toString());
    duplicatedCharacterNode.put("isSessionClone", true);
    duplicatedCharacterNode.put("cloneSourceCharacterId", sourceCharacterId);

    String sourceName = duplicatedCharacterNode.path("name").asText("").trim();
    if (sourceName.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nome do personagem é obrigatório.");
    }
    duplicatedCharacterNode.put("name", buildDuplicatedCharacterName(charactersNode, sourceName));
    writeControlledByUserId(duplicatedCharacterNode, null);

    SessionCharacterPayloadValidator.validatePersistedCharacter(duplicatedCharacterNode);
    return duplicatedCharacterNode;
  }

  private void ensureUserCanDuplicateCharacter(GameEntity game, Long userId, ObjectNode sourceCharacterNode) {
    if (!game.getOwner().getId().equals(userId)) {
      throw new ResponseStatusException(
          HttpStatus.FORBIDDEN,
          "Somente o mestre pode duplicar personagens."
      );
    }
  }

  private ObjectNode buildDuplicatedMonsterCharacterNode(ObjectNode sourceCharacterNode) {
    String monsterId = normalizeMonsterId(sourceCharacterNode.path("monsterId").asText(""));
    String nameOverride = readOptionalString(sourceCharacterNode, "nameOverride");
    String imageOverride = readOptionalString(sourceCharacterNode, "imageOverride");
    String notes = readOptionalString(sourceCharacterNode, "notes");

    ObjectNode duplicatedCharacterNode = buildMonsterCharacterNode(monsterId, nameOverride);
    if (imageOverride != null) {
      duplicatedCharacterNode.put("imageOverride", imageOverride);
    }
    if (notes != null) {
      duplicatedCharacterNode.put("notes", notes);
    }

    SessionCharacterPayloadValidator.validatePersistedCharacter(duplicatedCharacterNode);
    return duplicatedCharacterNode;
  }

  private String normalizeEquipmentSlot(String slotRaw) {
    String slot = slotRaw == null ? "" : slotRaw.trim();
    if (slot.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Slot é obrigatório.");
    }

    return switch (slot) {
      case "bodyArmorItemId", "shieldItemId", "mainHandWeaponId", "offHandWeaponId" -> slot;
      default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Slot de equipamento inválido.");
    };
  }

  private ObjectNode resolveRuntimeEquipmentContainer(ObjectNode characterNode) {
    JsonNode equipmentNode = characterNode.get("equipment");
    if (equipmentNode instanceof ObjectNode equipmentObject) {
      return equipmentObject;
    }

    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Personagem sem estado de equipamento compatível.");
  }

  private ArrayNode resolveRuntimeInventoryItems(ObjectNode characterNode) {
    JsonNode inventoryNode = characterNode.get("inventory");
    if (!(inventoryNode instanceof ObjectNode inventoryObject)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Personagem sem inventário compatível.");
    }

    JsonNode itemsNode = inventoryObject.get("items");
    if (itemsNode instanceof ArrayNode itemsArray) {
      return itemsArray;
    }

    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Personagem sem itens de inventário compatíveis.");
  }

  private void addItemToCharacterStorage(ObjectNode characterNode, String itemId, int quantity) {
    ArrayNode inventoryItemsNode = resolveRuntimeInventoryItems(characterNode);
    addInventoryItem(inventoryItemsNode, itemId, quantity);
  }

  private void validateInventoryContainsItem(ArrayNode inventoryItemsNode, String itemId) {
    for (int i = 0; i < inventoryItemsNode.size(); i++) {
      JsonNode itemNode = inventoryItemsNode.get(i);
      if (!(itemNode instanceof ObjectNode itemObject)) {
        continue;
      }

      String currentItemId = itemObject.path("itemId").asText("").trim();
      int quantity = itemObject.path("quantity").asInt(0);
      if (itemId.equals(currentItemId) && quantity > 0) {
        return;
      }
    }

    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Item não está disponível no inventário.");
  }

  private String normalizeInventoryItemId(String itemIdRaw) {
    String itemId = itemIdRaw == null ? "" : itemIdRaw.trim();
    if (itemId.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Item é obrigatório.");
    }
    itemCatalogManifestService.requireKnownItem(itemId);
    return itemId;
  }

  private void addInventoryItem(ArrayNode inventoryItemsNode, String itemId, int quantity) {
    for (int i = 0; i < inventoryItemsNode.size(); i++) {
      JsonNode itemNode = inventoryItemsNode.get(i);
      if (!(itemNode instanceof ObjectNode itemObject)) {
        continue;
      }

      String currentItemId = itemObject.path("itemId").asText("").trim();
      if (!itemId.equals(currentItemId)) {
        continue;
      }

      int currentQuantity = Math.max(0, itemObject.path("quantity").asInt(0));
      itemObject.put("quantity", currentQuantity + quantity);
      return;
    }

    ObjectNode inventoryEntry = objectMapper.createObjectNode();
    inventoryEntry.put("itemId", itemId);
    inventoryEntry.put("quantity", quantity);
    inventoryItemsNode.add(inventoryEntry);
  }

  private void validateEquipmentSlotCompatibility(String slot, String itemId) {
    if (itemId == null) {
      return;
    }

    ItemCatalogManifestService.ItemCatalogEntry item = itemCatalogManifestService.requireKnownItem(itemId);
    boolean isArmor = "armor".equals(item.type());
    boolean isWeapon = "weapon".equals(item.type());
    boolean isShield = "shield".equals(item.armorType());

    switch (slot) {
      case "bodyArmorItemId" -> {
        if (!isArmor || isShield) {
          throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Item incompatível com o slot de armadura.");
        }
      }
      case "shieldItemId" -> {
        if (!isArmor || !isShield) {
          throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Apenas escudos podem ocupar esse slot.");
        }
      }
      case "mainHandWeaponId", "offHandWeaponId" -> {
        if (!isWeapon) {
          throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Apenas armas podem ocupar esse slot.");
        }
      }
      default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Slot de equipamento inválido.");
    }
  }

  private void applyEquipmentUpdate(ObjectNode equipmentNode, String slot, String itemId) {
    if (itemId == null) {
      equipmentNode.putNull(slot);
      return;
    }

    if ("shieldItemId".equals(slot)) {
      equipmentNode.putNull("offHandWeaponId");
    }
    if ("offHandWeaponId".equals(slot)) {
      equipmentNode.putNull("shieldItemId");
    }

    equipmentNode.put(slot, itemId);
  }

  private void validateEquippedItemQuantities(ObjectNode equipmentNode, ArrayNode inventoryItemsNode) {
    java.util.Map<String, Integer> equippedUsage = new java.util.HashMap<>();
    registerEquippedItemUsage(equipmentNode, "bodyArmorItemId", equippedUsage);
    registerEquippedItemUsage(equipmentNode, "shieldItemId", equippedUsage);
    registerEquippedItemUsage(equipmentNode, "mainHandWeaponId", equippedUsage);
    registerEquippedItemUsage(equipmentNode, "offHandWeaponId", equippedUsage);

    equippedUsage.forEach((itemId, usageCount) -> {
      int availableQuantity = 0;
      for (int i = 0; i < inventoryItemsNode.size(); i++) {
        JsonNode itemNode = inventoryItemsNode.get(i);
        if (!(itemNode instanceof ObjectNode itemObject)) {
          continue;
        }

        String currentItemId = itemObject.path("itemId").asText("").trim();
        if (!itemId.equals(currentItemId)) {
          continue;
        }

        availableQuantity = itemObject.path("quantity").asInt(0);
        break;
      }

      if (usageCount > availableQuantity) {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST,
            "Quantidade insuficiente do item para equipar nos slots escolhidos."
        );
      }
    });
  }

  private void registerEquippedItemUsage(
      ObjectNode equipmentNode,
      String fieldName,
      java.util.Map<String, Integer> equippedUsage
  ) {
    JsonNode itemNode = equipmentNode.get(fieldName);
    if (itemNode == null || itemNode.isNull()) {
      return;
    }

    String itemId = itemNode.asText("").trim();
    if (itemId.isBlank()) {
      return;
    }

    equippedUsage.merge(itemId, 1, Integer::sum);
  }

  private ResolvedAttackData resolveAttackData(
      ObjectNode attackerCharacterNode,
      String attackId,
      String fallbackAttackName,
      int fallbackAttackBonus,
      String fallbackDamageFormula
  ) {
    if (isNpcCharacter(attackerCharacterNode)) {
      return resolveMonsterAttackData(attackerCharacterNode, attackId);
    }

    if (UnarmedAttackProfile.ATTACK_ID.equals(attackId)) {
      int strengthScore = resolveBaseAbilityScore(attackerCharacterNode, "strength");
      int level = Math.max(1, attackerCharacterNode.path("progression").path("currentLevel").asInt(1));
      int strengthModifier = getAbilityModifier(strengthScore);
      int proficiencyBonus = 2 + Math.max(0, (level - 1) / 4);
      int attackBonus = proficiencyBonus + strengthModifier;
      int flatDamage = Math.max(1, 1 + strengthModifier);
      String specieId = resolvePlayerSpecieId(attackerCharacterNode);
      CombatDamageType expectedDamageType = UnarmedAttackProfile.resolveDamageTypeForSpecie(specieId);

      return new ResolvedAttackData(
          UnarmedAttackProfile.LABEL,
          attackBonus,
          String.valueOf(flatDamage),
          expectedDamageType,
          List.of(),
          List.of()
      );
    }

    if (attackId.startsWith("builtin-")) {
      String builtinItemId = attackId.substring("builtin-".length()).trim();
      if (builtinItemId.isBlank()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ataque builtin inválido.");
      }
      validateEquippedBuiltinWeapon(attackerCharacterNode, builtinItemId);
    }

    return new ResolvedAttackData(
      fallbackAttackName,
      fallbackAttackBonus,
      fallbackDamageFormula,
      null,
      List.of(),
      List.of()
    );
  }

  private ResolvedAttackData resolveMonsterAttackData(ObjectNode attackerCharacterNode, String attackId) {
    MonsterCatalogManifestService.MonsterCatalogEntry monsterEntry = resolveMonsterCatalogEntry(attackerCharacterNode);
    MonsterCatalogManifestService.MonsterCatalogAttackAction attackAction =
        monsterCatalogManifestService.requireKnownMonsterAttackAction(monsterEntry.id(), attackId);

    String attackName = attackAction.name() == null ? "" : attackAction.name().trim();
    if (attackName.isBlank()) {
      throw new ResponseStatusException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Catálogo canônico do monstro está sem nome de ação válido."
      );
    }

    Integer attackBonus = attackAction.attackBonus();
    if (attackBonus == null) {
      throw new ResponseStatusException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Catálogo canônico do monstro está sem bônus de ataque válido."
      );
    }

    String damageFormula = attackAction.damageFormula() == null ? "" : attackAction.damageFormula().trim();
    if (damageFormula.isBlank()) {
      throw new ResponseStatusException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Catálogo canônico do monstro está sem fórmula de dano válida."
      );
    }

    CombatDamageType damageType = parseCanonicalDamageType(attackAction.damageType());
    List<ResolvedConditionalDamage> conditionalDamageBonuses = parseConditionalDamageBonuses(attackAction);
    List<ResolvedConditionalCondition> conditionalAppliedConditions = parseConditionalAppliedConditions(attackAction);

    return new ResolvedAttackData(
        attackName,
        attackBonus,
        damageFormula,
        damageType,
        conditionalDamageBonuses,
        conditionalAppliedConditions
    );
  }

  private List<ResolvedConditionalDamage> parseConditionalDamageBonuses(
      MonsterCatalogManifestService.MonsterCatalogAttackAction attackAction
  ) {
    List<MonsterCatalogManifestService.MonsterCatalogConditionalDamage> rawBonuses =
        attackAction.conditionalDamageBonuses();
    if (rawBonuses == null || rawBonuses.isEmpty()) {
      return List.of();
    }

    List<ResolvedConditionalDamage> parsed = new ArrayList<>();
    for (MonsterCatalogManifestService.MonsterCatalogConditionalDamage rawBonus : rawBonuses) {
      if (rawBonus == null) {
        continue;
      }

      String rawFormula = rawBonus.damageFormula() == null ? "" : rawBonus.damageFormula().trim();
      if (rawFormula.isBlank()) {
        throw new ResponseStatusException(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Catálogo canônico do monstro está sem fórmula de dano condicional válida."
        );
      }

      String normalizedFormula = normalizeFormula(rawFormula);
      CombatDamageType conditionalDamageType = parseCanonicalDamageType(rawBonus.damageType());
      double requiredMovementMeters = parseRequiredMovementMeters(rawBonus.requiresUserMovementAtLeastMeters());
      parsed.add(new ResolvedConditionalDamage(normalizedFormula, conditionalDamageType, requiredMovementMeters));
    }

    return List.copyOf(parsed);
  }

  private List<ResolvedConditionalCondition> parseConditionalAppliedConditions(
      MonsterCatalogManifestService.MonsterCatalogAttackAction attackAction
  ) {
    List<MonsterCatalogManifestService.MonsterCatalogConditionalCondition> rawConditions =
        attackAction.conditionalAppliedConditions();
    if (rawConditions == null || rawConditions.isEmpty()) {
      return List.of();
    }

    List<ResolvedConditionalCondition> parsed = new ArrayList<>();
    for (MonsterCatalogManifestService.MonsterCatalogConditionalCondition rawCondition : rawConditions) {
      if (rawCondition == null) {
        continue;
      }

      String condition = rawCondition.condition() == null ? "" : rawCondition.condition().trim();
      if (condition.isBlank()) {
        throw new ResponseStatusException(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Catálogo canônico do monstro está sem condição condicional válida."
        );
      }

      double requiredMovementMeters = parseRequiredMovementMeters(rawCondition.requiresUserMovementAtLeastMeters());
      parsed.add(new ResolvedConditionalCondition(condition, requiredMovementMeters));
    }

    return List.copyOf(parsed);
  }

  private double parseRequiredMovementMeters(Double requiredMovementMetersRaw) {
    if (requiredMovementMetersRaw == null || !Double.isFinite(requiredMovementMetersRaw)) {
      throw new ResponseStatusException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Catálogo canônico do monstro está sem requisito de deslocamento válido."
      );
    }

    double requiredMovementMeters = Math.max(0, requiredMovementMetersRaw);
    if (requiredMovementMeters <= 0) {
      throw new ResponseStatusException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Catálogo canônico do monstro está com requisito de deslocamento inválido."
      );
    }

    return requiredMovementMeters;
  }

  private double resolveCurrentTurnMovedDistanceMeters(ObjectNode combatState) {
    if (combatState == null) {
      return 0;
    }

    ObjectNode turnResources = resolveCombatTurnResources(combatState);
    int totalMovementCells = Math.max(0, turnResources.path("totalMovementCells").asInt(0));
    int remainingMovementCells = Math.max(0, turnResources.path("remainingMovementCells").asInt(0));
    int movedCells = Math.max(0, totalMovementCells - remainingMovementCells);
    return movedCells * MOVEMENT_METERS_PER_CELL;
  }

  private boolean applyConditionFromAttackIfNeeded(
      ObjectNode characterNode,
      String conditionId,
      String sourceAttackId
  ) {
    if (characterNode == null || conditionId == null || conditionId.isBlank()) {
      return false;
    }

    if (characterHasCondition(characterNode, conditionId)) {
      return false;
    }

    ArrayNode effects = resolveCharacterActiveEffectsArray(characterNode);
    int nextEffectIndex = 0;
    for (int i = 0; i < effects.size(); i += 1) {
      JsonNode effectNode = effects.get(i);
      if (!(effectNode instanceof ObjectNode effectObject)) {
        continue;
      }
      nextEffectIndex = Math.max(nextEffectIndex, effectObject.path("effectIndex").asInt(-1) + 1);
    }

    ObjectNode conditionEffect = objectMapper.createObjectNode();
    conditionEffect.put("instanceId", UUID.randomUUID().toString());

    ObjectNode sourceNode = objectMapper.createObjectNode();
    sourceNode.put("sourceType", "action");
    sourceNode.put("sourceId", sourceAttackId == null ? "act-apply-effect" : sourceAttackId);
    conditionEffect.set("source", sourceNode);

    conditionEffect.put("effectIndex", nextEffectIndex);
    conditionEffect.put("linkedCondition", conditionId);
    conditionEffect.put("stackCount", 1);
    conditionEffect.put("isSuppressed", false);
    effects.add(conditionEffect);
    return true;
  }

  private void validateEquippedBuiltinWeapon(ObjectNode attackerCharacterNode, String itemId) {
    ItemCatalogManifestService.ItemCatalogEntry itemEntry = itemCatalogManifestService.requireKnownItem(itemId);
    if (!"weapon".equals(itemEntry.type())) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ataque builtin inválido para item não-arma.");
    }

    ObjectNode equipmentNode = resolveRuntimeEquipmentContainer(attackerCharacterNode);
    String mainHandWeaponId = readOptionalString(equipmentNode, "mainHandWeaponId");
    String offHandWeaponId = readOptionalString(equipmentNode, "offHandWeaponId");

    if (!itemId.equals(mainHandWeaponId) && !itemId.equals(offHandWeaponId)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A arma do ataque não está equipada pelo atacante.");
    }
  }

  private String resolvePlayerSpecieId(ObjectNode characterNode) {
    String characterType = characterNode.path("type").asText("").trim();
    if (!"Player".equals(characterType)) {
      return null;
    }

    JsonNode buildNode = characterNode.get("build");
    if (!(buildNode instanceof ObjectNode buildObject)) {
      return null;
    }

    JsonNode specieIdNode = buildObject.get("specieId");
    if (specieIdNode == null || specieIdNode.isNull()) {
      return null;
    }

    String specieId = specieIdNode.asText("").trim();
    return specieId.isBlank() ? null : specieId;
  }

  private int resolveCharacterArmorClass(ObjectNode characterNode) {
    if ("NPC".equals(characterNode.path("type").asText("").trim())) {
      Integer armorClass = resolveMonsterCatalogEntry(characterNode).armorClass();
      if (armorClass == null || armorClass < 1) {
        throw new ResponseStatusException(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Catálogo canônico do monstro está sem armorClass válido."
        );
      }

      return armorClass;
    }

    ObjectNode equipmentNode = resolveRuntimeEquipmentContainer(characterNode);
    int dexterity = resolveBaseAbilityScore(characterNode, "dexterity");

    String bodyArmorItemId = readOptionalString(equipmentNode, "bodyArmorItemId");
    String shieldItemId = readOptionalString(equipmentNode, "shieldItemId");

    int armorClass = 10 + getAbilityModifier(dexterity);
    if (bodyArmorItemId != null) {
      ItemCatalogManifestService.ItemCatalogEntry armor = itemCatalogManifestService.requireKnownItem(bodyArmorItemId);
      if ("base".equals(armor.acCalculationType()) && armor.acValue() != null) {
        armorClass = armor.acValue();
      } else if ("formula".equals(armor.acCalculationType())) {
        int attributeModifier = "dexterity".equals(armor.acAttribute()) ? getAbilityModifier(dexterity) : 0;
        int boundedModifier = armor.acMaxBonus() == null
            ? attributeModifier
            : Math.min(attributeModifier, armor.acMaxBonus());
        armorClass = (armor.acBase() == null ? 10 : armor.acBase()) + boundedModifier;
      }
    }

    if (shieldItemId != null) {
      ItemCatalogManifestService.ItemCatalogEntry shield = itemCatalogManifestService.requireKnownItem(shieldItemId);
      if ("bonus".equals(shield.acCalculationType()) && shield.acValue() != null) {
        armorClass += shield.acValue();
      }
    }

    return armorClass;
  }

  private int resolveBaseAbilityScore(ObjectNode characterNode, String abilityName) {
    if ("NPC".equals(characterNode.path("type").asText("").trim())) {
      MonsterCatalogManifestService.MonsterCatalogAbilityScores abilityScores =
          resolveMonsterCatalogEntry(characterNode).abilityScores();
      if (abilityScores == null) {
        throw new ResponseStatusException(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Catálogo canônico do monstro está sem abilityScores."
        );
      }

      Integer value = switch (abilityName) {
        case "strength" -> abilityScores.strength();
        case "dexterity" -> abilityScores.dexterity();
        case "constitution" -> abilityScores.constitution();
        case "intelligence" -> abilityScores.intelligence();
        case "wisdom" -> abilityScores.wisdom();
        case "charisma" -> abilityScores.charisma();
        default -> null;
      };

      if (value == null) {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST,
            "Atributo de monstro não suportado para resolução autoritativa."
        );
      }

      return value;
    }

    JsonNode attributesNode = characterNode.get("attributes");
    if (!(attributesNode instanceof ObjectNode attributesObject)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Personagem sem atributos em runtime.");
    }

    JsonNode baseNode = attributesObject.get("base");
    if (!(baseNode instanceof ObjectNode baseObject)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Personagem sem atributos base em runtime.");
    }

    JsonNode abilityNode = baseObject.get(abilityName);
    if (abilityNode == null || !abilityNode.isNumber()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Personagem sem atributo base válido em runtime.");
    }

    return abilityNode.asInt();
  }

  private String readOptionalString(ObjectNode container, String fieldName) {
    JsonNode fieldNode = container.get(fieldName);
    if (fieldNode == null || fieldNode.isNull()) {
      return null;
    }

    String value = fieldNode.asText("").trim();
    return value.isBlank() ? null : value;
  }

  private int getAbilityModifier(int score) {
    return Math.floorDiv(score - 10, 2);
  }

  private MonsterCatalogManifestService.MonsterCatalogEntry resolveMonsterCatalogEntry(ObjectNode characterNode) {
    String monsterId = characterNode.path("monsterId").asText("").trim();
    if (monsterId.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Monstro sem monsterId válido em runtime.");
    }

    return monsterCatalogManifestService.requireKnownMonster(monsterId);
  }

  private TargetDamageDefenses resolveTargetDamageDefenses(ObjectNode characterNode) {
    if (!isNpcCharacter(characterNode)) {
      return new TargetDamageDefenses(Set.of(), Set.of(), Set.of());
    }

    MonsterCatalogManifestService.MonsterCatalogDefenses defenses =
        resolveMonsterCatalogEntry(characterNode).defenses();
    if (defenses == null) {
      return new TargetDamageDefenses(Set.of(), Set.of(), Set.of());
    }

    return new TargetDamageDefenses(
        parseCanonicalDamageTypeSet(defenses.resistances()),
        parseCanonicalDamageTypeSet(defenses.vulnerabilities()),
        parseCanonicalDamageTypeSet(defenses.damageImmunities())
    );
  }

  private Set<CombatDamageType> parseCanonicalDamageTypeSet(List<String> rawDamageTypes) {
    if (rawDamageTypes == null || rawDamageTypes.isEmpty()) {
      return Set.of();
    }

    Set<CombatDamageType> parsed = new HashSet<>();
    for (String rawDamageType : rawDamageTypes) {
      parsed.add(parseCanonicalDamageType(rawDamageType));
    }

    return Set.copyOf(parsed);
  }

  private int applyDamageDefenses(
      int rolledDamage,
      CombatDamageType damageType,
      TargetDamageDefenses targetDamageDefenses
  ) {
    int normalizedDamage = Math.max(0, rolledDamage);
    if (normalizedDamage == 0) {
      return 0;
    }

    if (targetDamageDefenses.damageImmunities().contains(damageType)) {
      return 0;
    }

    boolean resistant = targetDamageDefenses.resistances().contains(damageType);
    boolean vulnerable = targetDamageDefenses.vulnerabilities().contains(damageType);
    if (resistant && vulnerable) {
      return normalizedDamage;
    }
    if (resistant) {
      return Math.floorDiv(normalizedDamage, 2);
    }
    if (vulnerable) {
      return normalizedDamage * 2;
    }

    return normalizedDamage;
  }

  private ObjectNode resolveHitPointContainer(ObjectNode characterNode) {
    JsonNode hitPointsNode = characterNode.get("hitPoints");
    if (hitPointsNode instanceof ObjectNode hitPointsObject) {
      JsonNode currentNode = hitPointsObject.get("current");
      JsonNode temporaryNode = hitPointsObject.get("temporary");
      if (currentNode != null && currentNode.isNumber()
          && temporaryNode != null && temporaryNode.isNumber()) {
        return hitPointsObject;
      }
    }

    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Personagem sem estado de HP em runtime válido.");
  }

  private int resolveCharacterHitPointMaximum(ObjectNode characterNode, ObjectNode hitPointContainer) {
    String characterType = characterNode.path("type").asText("").trim();
    if ("NPC".equals(characterType)) {
      String monsterId = characterNode.path("monsterId").asText("").trim();
      if (monsterId.isBlank()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Monstro sem monsterId válido em runtime.");
      }

      Integer hitPointMaximum = monsterCatalogManifestService.requireKnownMonster(monsterId).hitPointMaximum();
      if (hitPointMaximum == null || hitPointMaximum < 1) {
        throw new ResponseStatusException(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Catálogo canônico do monstro está sem hitPointMaximum válido."
        );
      }

      return hitPointMaximum;
    }

    JsonNode maxNode = hitPointContainer.get("max");
    if (maxNode != null && maxNode.isNumber()) {
      return Math.max(1, maxNode.asInt());
    }

    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Personagem sem HP máximo válido em runtime.");
  }

  private GameSessionEventResponse persistAndPublishCharacterHpUpdated(
      Long userId,
      Long gameId,
      GameSessionStateEntity sessionState,
      ObjectNode rootNode,
      String characterId,
      int currentHp,
      int tempHp,
      boolean combatChanged,
        JsonNode combatNode,
        boolean deadConditionApplied,
        boolean deadConditionRemoved
  ) {
    Instant createdAt = Instant.now();
    sessionState.setVersion(sessionState.getVersion() + 1);
    sessionState.setStateJson(toJson(rootNode));
    gameSessionStateRepository.save(sessionState);

    ObjectNode payloadNode = objectMapper.createObjectNode();
    payloadNode.put("characterId", characterId);
    payloadNode.put("currentHp", currentHp);
    payloadNode.put("tempHp", tempHp);
    payloadNode.put("combatChanged", combatChanged);
    payloadNode.put("deadConditionApplied", deadConditionApplied);
    payloadNode.put("deadConditionRemoved", deadConditionRemoved);
    if (combatChanged) {
      if (combatNode == null || combatNode.isNull()) {
        payloadNode.putNull("combat");
      } else {
        payloadNode.set("combat", combatNode);
      }
    }

    GameSessionEventResponse event = new GameSessionEventResponse(
        UUID.randomUUID().toString(),
        gameId,
        sessionState.getVersion(),
        "CHARACTER_HP_UPDATED",
        userId,
        payloadNode,
        createdAt
    );

    messagingTemplate.convertAndSend(gameTopic(gameId), event);
    return event;
  }

  private String toJson(ObjectNode rootNode) {
    try {
      return objectMapper.writeValueAsString(rootNode);
    } catch (JsonProcessingException e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Falha ao persistir estado da sessão.");
    }
  }

  private record DiceRollResult(ObjectNode detailsNode) {
  }

  private record SenderInfo(String name, String colorHex) {
  }

  private record ResolvedAttackData(
      String attackName,
      int attackBonus,
      String damageFormula,
      CombatDamageType expectedDamageType,
      List<ResolvedConditionalDamage> conditionalDamageBonuses,
      List<ResolvedConditionalCondition> conditionalAppliedConditions
    ) {
    }

    private record ResolvedConditionalDamage(
      String damageFormula,
      CombatDamageType damageType,
      double requiresUserMovementAtLeastMeters
    ) {
    }

    private record ResolvedConditionalCondition(
      String condition,
      double requiresUserMovementAtLeastMeters
  ) {
  }

      private record TargetDamageDefenses(
        Set<CombatDamageType> resistances,
        Set<CombatDamageType> vulnerabilities,
        Set<CombatDamageType> damageImmunities
      ) {
      }

  private record CombatSyncResult(boolean touched, JsonNode combatNode) {
  }

  private record SpawnTokenRequest(String sceneId, int x, int y) {
  }

  private record MovementPathEvaluation(boolean reachable, int costCells) {
  }

  private record GridCell(int x, int y) {
  }

  private record GridSize(int width, int height) {
  }

  private record GridBounds(int widthInUnits, int heightInUnits) {
  }
}
