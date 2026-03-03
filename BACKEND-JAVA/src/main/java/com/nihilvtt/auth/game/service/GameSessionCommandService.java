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
import java.util.List;
import java.util.Locale;
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
  private static final int MAX_DICE_COUNT = 100;
  private static final int MAX_DICE_SIDES = 100;
  private static final int MAX_TOTAL_DICE_ROLLS = 500;
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

  public GameSessionCommandService(
      GameAccessService gameAccessService,
      GameMemberRepository gameMemberRepository,
      GameSessionStateRepository gameSessionStateRepository,
      ObjectMapper objectMapper,
      SimpMessagingTemplate messagingTemplate,
      ItemCatalogManifestService itemCatalogManifestService
  ) {
    this.gameAccessService = gameAccessService;
    this.gameMemberRepository = gameMemberRepository;
    this.gameSessionStateRepository = gameSessionStateRepository;
    this.objectMapper = objectMapper;
    this.messagingTemplate = messagingTemplate;
    this.itemCatalogManifestService = itemCatalogManifestService;
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

    ObjectNode movedToken = findTokenById(tokensNode, tokenId);
    if (movedToken == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Token não encontrado na sessão.");
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

    if (findCharacterById(charactersNode, characterId) == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Personagem não encontrado na sessão.");
    }

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
    if (removedCloneCharacterId != null) {
      payloadNode.put("removedCharacterId", removedCloneCharacterId);
    }
    if (combatSync.touched()) {
      payloadNode.set("combat", combatSync.combatNode());
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
      String damageFormulaRaw
  ) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, userId);

    String attackerTokenId = attackerTokenIdRaw == null ? "" : attackerTokenIdRaw.trim();
    String targetTokenId = targetTokenIdRaw == null ? "" : targetTokenIdRaw.trim();
    String attackId = attackIdRaw == null ? "" : attackIdRaw.trim();
    String attackName = attackNameRaw == null ? "" : attackNameRaw.trim();
    String damageFormula = normalizeFormula(damageFormulaRaw);
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

    ensureCombatForAttack(
        userId,
        gameId,
        sessionState,
        rootNode,
        tokensNode,
        charactersNode,
        attackerTokenId,
        targetTokenId
    );

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
    int damageTotal = 0;
    int damageApplied = 0;
    int remainingCurrentHp;
    int remainingTempHp;

    ObjectNode hitPointContainer = resolveHitPointContainer(targetCharacterNode);
    String currentHpField = "current";
    String tempHpField = "temporary";
    String maxHpField = "max";

    int currentHp = hitPointContainer.path(currentHpField).asInt(0);
    int tempHp = Math.max(0, hitPointContainer.path(tempHpField).asInt(0));
    int maxHp = Math.max(1, hitPointContainer.path(maxHpField).asInt(1));

    if (hit) {
      DiceRollResult damageRoll = rollDiceFormula(
          resolvedAttackData.damageFormula(),
          resolvedAttackData.attackName(),
          "Damage"
      );
      damageTotal = Math.max(0, damageRoll.detailsNode().path("finalResult").asInt(0));

      int remainingDamage = damageTotal;
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
    payloadNode.put("attackRoll", naturalRoll);
    payloadNode.put("attackTotal", attackTotal);
    payloadNode.put("targetArmorClass", targetArmorClass);
    payloadNode.put("hit", hit);
    payloadNode.put("damageTotal", damageTotal);
    payloadNode.put("damageApplied", damageApplied);
    payloadNode.put("remainingCurrentHp", remainingCurrentHp);
    payloadNode.put("remainingTempHp", remainingTempHp);

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
    String maxHpField = "max";

    JsonNode currentHpNode = hitPointContainer.get(currentHpField);
    int currentHp = currentHpNode != null && currentHpNode.isNumber() ? currentHpNode.asInt() : 0;
    JsonNode tempHpNode = hitPointContainer.get(tempHpField);
    int tempHp = tempHpNode != null && tempHpNode.isNumber() ? Math.max(0, tempHpNode.asInt()) : 0;
    JsonNode maxHpNode = hitPointContainer.get(maxHpField);
    int maxHp = maxHpNode != null && maxHpNode.isNumber() ? maxHpNode.asInt() : 1;
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

    return persistAndPublishCharacterHpUpdated(
        userId,
        gameId,
        sessionState,
        rootNode,
        characterId,
        normalizedHp,
        normalizedTempHp
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
    int normalizedTempHp = Math.max(currentTempHp, amount);
    hitPointContainer.put(tempHpField, normalizedTempHp);

    return persistAndPublishCharacterHpUpdated(
        userId,
        gameId,
        sessionState,
        rootNode,
        characterId,
        currentHp,
        normalizedTempHp
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
    if (combatSync.touched()) {
      payloadNode.set("combat", combatSync.combatNode());
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

  private void ensureCombatForAttack(
      Long userId,
      Long gameId,
      GameSessionStateEntity sessionState,
      ObjectNode rootNode,
      ArrayNode tokensNode,
      ArrayNode charactersNode,
      String attackerTokenId,
      String targetTokenId
  ) {
    ObjectNode activeCombatState = getActiveCombatState(rootNode);
    if (activeCombatState != null) {
      ensureTokensParticipateInCombat(activeCombatState, attackerTokenId, targetTokenId);
      return;
    }

    ObjectNode combatState = buildCombatState(tokensNode, charactersNode, List.of(attackerTokenId, targetTokenId));
    rootNode.set("combat", combatState);

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
        "COMBAT_STARTED",
        userId,
        payloadNode,
        createdAt
    );

    messagingTemplate.convertAndSend(gameTopic(gameId), event);
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

      int dexterityScore = resolveBaseAbilityScore(characterNode, "dexterity");
      int initiativeRoll = ThreadLocalRandom.current().nextInt(1, 21);
      int initiativeTotal = initiativeRoll + getAbilityModifier(dexterityScore);

      ObjectNode participantNode = objectMapper.createObjectNode();
      participantNode.put("tokenId", tokenId);
      participantNode.put("characterId", characterId);
      participantNode.put("initiativeRoll", initiativeRoll);
      participantNode.put("initiativeTotal", initiativeTotal);
      participantNode.put("dexterityScore", dexterityScore);
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

    for (int i = participants.size() - 1; i >= 0; i--) {
      JsonNode participantNode = participants.get(i);
      String tokenId = participantNode.path("tokenId").asText("").trim();
      if (!removedTokenIdSet.contains(tokenId)) {
        continue;
      }
      if (i < previousTurnIndex) {
        removedBeforeTurn += 1;
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
    ObjectNode duplicatedCharacterNode = sourceCharacterNode.deepCopy();
    duplicatedCharacterNode.put("id", UUID.randomUUID().toString());
    duplicatedCharacterNode.put("isSessionClone", true);
    duplicatedCharacterNode.put("cloneSourceCharacterId", sourceCharacterId);

    String sourceName = duplicatedCharacterNode.path("name").asText("").trim();
    if (sourceName.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nome do personagem é obrigatório.");
    }
    duplicatedCharacterNode.put("name", buildDuplicatedCharacterName(charactersNode, sourceName));

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
    if ("builtin-unarmed-strike".equals(attackId)) {
      int strengthScore = resolveBaseAbilityScore(attackerCharacterNode, "strength");
      int level = Math.max(1, attackerCharacterNode.path("progression").path("currentLevel").asInt(1));
      int strengthModifier = getAbilityModifier(strengthScore);
      int proficiencyBonus = 2 + Math.max(0, (level - 1) / 4);
      int attackBonus = proficiencyBonus + strengthModifier;
      int flatDamage = Math.max(1, 1 + strengthModifier);

      return new ResolvedAttackData("Ataque desarmado", attackBonus, String.valueOf(flatDamage));
    }

    if (attackId.startsWith("builtin-")) {
      String builtinItemId = attackId.substring("builtin-".length()).trim();
      if (builtinItemId.isBlank()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ataque builtin inválido.");
      }
      validateEquippedBuiltinWeapon(attackerCharacterNode, builtinItemId);
    }

    return new ResolvedAttackData(fallbackAttackName, fallbackAttackBonus, fallbackDamageFormula);
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

  private int resolveCharacterArmorClass(ObjectNode characterNode) {
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

  private ObjectNode resolveHitPointContainer(ObjectNode characterNode) {
    JsonNode hitPointsNode = characterNode.get("hitPoints");
    if (hitPointsNode instanceof ObjectNode hitPointsObject) {
      JsonNode currentNode = hitPointsObject.get("current");
      JsonNode maxNode = hitPointsObject.get("max");
      JsonNode temporaryNode = hitPointsObject.get("temporary");
      if (currentNode != null && currentNode.isNumber()
          && maxNode != null && maxNode.isNumber()
          && temporaryNode != null && temporaryNode.isNumber()) {
        return hitPointsObject;
      }
    }

    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Personagem sem estado de HP em runtime válido.");
  }

  private GameSessionEventResponse persistAndPublishCharacterHpUpdated(
      Long userId,
      Long gameId,
      GameSessionStateEntity sessionState,
      ObjectNode rootNode,
      String characterId,
      int currentHp,
      int tempHp
  ) {
    Instant createdAt = Instant.now();
    sessionState.setVersion(sessionState.getVersion() + 1);
    sessionState.setStateJson(toJson(rootNode));
    gameSessionStateRepository.save(sessionState);

    ObjectNode payloadNode = objectMapper.createObjectNode();
    payloadNode.put("characterId", characterId);
    payloadNode.put("currentHp", currentHp);
    payloadNode.put("tempHp", tempHp);

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

  private record ResolvedAttackData(String attackName, int attackBonus, String damageFormula) {
  }

  private record CombatSyncResult(boolean touched, JsonNode combatNode) {
  }
}
