package com.nihilvtt.auth.game.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.nihilvtt.auth.game.dto.GameSessionSnapshotResponse;
import com.nihilvtt.auth.game.entity.GameEntity;
import com.nihilvtt.auth.game.entity.GameSessionStateEntity;
import com.nihilvtt.auth.game.repository.GameSessionStateRepository;
import java.time.Instant;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class GameSessionStateService {
  private static final Logger logger = LoggerFactory.getLogger(GameSessionStateService.class);

  private final GameAccessService gameAccessService;
  private final GameSessionStateRepository gameSessionStateRepository;
  private final ObjectMapper objectMapper;

  public GameSessionStateService(
      GameAccessService gameAccessService,
      GameSessionStateRepository gameSessionStateRepository,
      ObjectMapper objectMapper
  ) {
    this.gameAccessService = gameAccessService;
    this.gameSessionStateRepository = gameSessionStateRepository;
    this.objectMapper = objectMapper;
  }

  @Transactional
  public GameSessionSnapshotResponse getSnapshot(Long userId, Long gameId) {
    GameEntity game = gameAccessService.requireGameWithAccess(gameId, userId);

    GameSessionStateEntity sessionState = gameSessionStateRepository.findByGameId(gameId)
        .orElseGet(() -> initializeSessionState(game));

    ObjectNode stateNode = parseStateJson(sessionState, gameId);
    requireExplicitSnapshotArray(stateNode, "characters");
    requireExplicitSnapshotArray(stateNode, "tokens");
    requireExplicitSnapshotArray(stateNode, "messages");
    requireExplicitSnapshotCombat(stateNode);
    validatePersistedCharacters(stateNode, gameId, sessionState.getId());

    return new GameSessionSnapshotResponse(
        gameId,
        sessionState.getVersion(),
        stateNode,
        List.of(),
        Instant.now()
    );
  }

  private GameSessionStateEntity initializeSessionState(GameEntity game) {
    GameSessionStateEntity entity = new GameSessionStateEntity();
    entity.setGame(game);
    entity.setVersion(0L);
    entity.setStateJson(buildEmptyStateJson());
    return gameSessionStateRepository.save(entity);
  }

  private String buildEmptyStateJson() {
    try {
      var emptyState = objectMapper.createObjectNode();
      emptyState.putArray("characters");
      emptyState.putArray("tokens");
      emptyState.putArray("messages");
      emptyState.putNull("combat");
      return objectMapper.writeValueAsString(emptyState);
    } catch (JsonProcessingException e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Falha ao inicializar sessão do jogo.");
    }
  }

  private void validatePersistedCharacters(ObjectNode stateNode, Long gameId, Long stateId) {
    JsonNode charactersNode = stateNode.get("characters");
    if (!(charactersNode instanceof ArrayNode charactersArray)) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Estado da sessão sem characters válido.");
    }

    for (JsonNode characterNode : charactersArray) {
      if (!(characterNode instanceof ObjectNode characterObject)) {
        logger.error("event=game_session_invalid_character_entry gameId={} stateId={}", gameId, stateId);
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Estado da sessão contém personagem inválido.");
      }

      try {
        SessionCharacterPayloadValidator.validatePersistedCharacter(characterObject);
      } catch (ResponseStatusException exception) {
        logger.error(
            "event=game_session_invalid_character_state gameId={} stateId={} reason={}",
            gameId,
            stateId,
            exception.getReason()
        );
        throw new ResponseStatusException(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Estado da sessão contém personagem inválido."
        );
      }
    }
  }

  private ObjectNode parseStateJson(GameSessionStateEntity sessionState, Long gameId) {
    try {
      JsonNode parsedState = objectMapper.readTree(sessionState.getStateJson());
      if (!(parsedState instanceof ObjectNode stateObject)) {
        logger.error(
            "event=game_session_state_invalid_root gameId={} stateId={}",
            gameId,
            sessionState.getId()
        );
        throw new ResponseStatusException(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Estado da sessão persistido está corrompido."
        );
      }
      return stateObject;
    } catch (JsonProcessingException e) {
      logger.error("event=game_session_state_corrupted gameId={} stateId={}", gameId, sessionState.getId(), e);
      throw new ResponseStatusException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Estado da sessão persistido está corrompido."
      );
    }
  }

  private void requireExplicitSnapshotArray(ObjectNode stateNode, String fieldName) {
    JsonNode value = stateNode.get(fieldName);
    if (!(value instanceof ArrayNode)) {
      throw new ResponseStatusException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Estado da sessão sem " + fieldName + " válido."
      );
    }
  }

  private void requireExplicitSnapshotCombat(ObjectNode stateNode) {
    JsonNode value = stateNode.get("combat");
    if (value == null || !(value.isNull() || value.isObject())) {
      throw new ResponseStatusException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Estado da sessão sem combat válido."
      );
    }
  }
}
