package com.nihilvtt.auth.game.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nihilvtt.auth.game.dto.GameSessionSnapshotResponse;
import com.nihilvtt.auth.game.entity.GameEntity;
import com.nihilvtt.auth.game.entity.GameSessionStateEntity;
import com.nihilvtt.auth.game.repository.GameSessionStateRepository;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

class GameSessionStateServiceTest {
  private final GameAccessService gameAccessService = mock(GameAccessService.class);
  private final GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
  private final ObjectMapper objectMapper = new ObjectMapper();

  private final GameSessionStateService service = new GameSessionStateService(
      gameAccessService,
      gameSessionStateRepository,
      objectMapper
  );

  @Test
  void getSnapshot_returnsExplicitArraysWhenStateIsValid() {
    Long userId = 10L;
    Long gameId = 20L;
    GameEntity game = buildGame(gameId);
    GameSessionStateEntity sessionState = buildState(
        game,
        "{\"characters\":[],\"tokens\":[],\"messages\":[]}"
    );

    when(gameAccessService.requireGameWithAccess(gameId, userId)).thenReturn(game);
    when(gameSessionStateRepository.findByGameId(gameId)).thenReturn(Optional.of(sessionState));

    GameSessionSnapshotResponse response = service.getSnapshot(userId, gameId);

    assertEquals(gameId, response.gameId());
    assertEquals(0L, response.serverVersion());
    assertEquals(0, response.state().get("characters").size());
    assertEquals(0, response.state().get("tokens").size());
    assertEquals(0, response.state().get("messages").size());
    assertEquals(0, response.recentEvents().size());
  }

  @Test
  void getSnapshot_failsWhenTokensArrayIsMissing() {
    Long userId = 10L;
    Long gameId = 20L;
    GameEntity game = buildGame(gameId);
    GameSessionStateEntity sessionState = buildState(
        game,
        "{\"characters\":[],\"messages\":[]}"
    );

    when(gameAccessService.requireGameWithAccess(gameId, userId)).thenReturn(game);
    when(gameSessionStateRepository.findByGameId(gameId)).thenReturn(Optional.of(sessionState));

    ResponseStatusException exception = assertThrows(
        ResponseStatusException.class,
        () -> service.getSnapshot(userId, gameId)
    );

    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, exception.getStatusCode());
    assertEquals("Estado da sessão sem tokens válido.", exception.getReason());
  }

  private GameEntity buildGame(Long gameId) {
    GameEntity game = new GameEntity();
    game.setId(gameId);
    return game;
  }

  private GameSessionStateEntity buildState(GameEntity game, String stateJson) {
    GameSessionStateEntity state = new GameSessionStateEntity();
    state.setId(1L);
    state.setGame(game);
    state.setVersion(0L);
    state.setStateJson(stateJson);
    return state;
  }
}
