package com.nihilvtt.auth.game.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.nihilvtt.auth.game.dto.GameSessionEventResponse;
import com.nihilvtt.auth.game.dto.StartCombatRequest;
import com.nihilvtt.auth.game.entity.GameEntity;
import com.nihilvtt.auth.game.entity.GameSessionStateEntity;
import com.nihilvtt.auth.game.repository.GameMemberRepository;
import com.nihilvtt.auth.game.repository.GameSessionStateRepository;
import com.nihilvtt.auth.user.entity.UserEntity;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.server.ResponseStatusException;

class GameSessionCommandServiceStartCombatContractTest {
  private final ObjectMapper objectMapper = new ObjectMapper();

  @Test
  void startCombat_persistsModeAndTeamAssignmentsInParticipants() {
    Long ownerUserId = 7L;
    Long gameId = 900L;

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    GameSessionStateEntity sessionState = new GameSessionStateEntity();
    sessionState.setId(900L);
    sessionState.setGame(game);
    sessionState.setVersion(2L);
    sessionState.setStateJson(buildStartCombatStateJson());

    when(gameAccessService.requireGameWithAccess(gameId, ownerUserId)).thenReturn(game);
    when(gameSessionStateRepository.findByGameId(gameId)).thenReturn(Optional.of(sessionState));
    when(gameSessionStateRepository.save(any(GameSessionStateEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

    GameSessionCommandService service = new GameSessionCommandService(
        gameAccessService,
        gameMemberRepository,
        gameSessionStateRepository,
        objectMapper,
        messagingTemplate,
        itemCatalogManifestService,
        monsterCatalogManifestService
    );

    GameSessionEventResponse event = service.startCombat(
        ownerUserId,
        gameId,
        List.of("token-1", "token-2", "token-3"),
        "teams",
        List.of(
            new StartCombatRequest.TeamAssignmentRequest("team-alpha", List.of("token-1", "token-2")),
            new StartCombatRequest.TeamAssignmentRequest("team-beta", List.of("token-3"))
        )
    );

    assertEquals("COMBAT_STARTED", event.type());
    assertEquals("teams", event.payload().path("combat").path("mode").asText());

    JsonNode participants = event.payload().path("combat").path("participants");
    assertEquals(3, participants.size());

    String token1Team = "";
    String token2Team = "";
    String token3Team = "";
    for (int i = 0; i < participants.size(); i += 1) {
      JsonNode participant = participants.get(i);
      String tokenId = participant.path("tokenId").asText();
      String teamId = participant.path("teamId").asText();
      if ("token-1".equals(tokenId)) {
        token1Team = teamId;
      }
      if ("token-2".equals(tokenId)) {
        token2Team = teamId;
      }
      if ("token-3".equals(tokenId)) {
        token3Team = teamId;
      }
    }

    assertEquals("team-alpha", token1Team);
    assertEquals("team-alpha", token2Team);
    assertEquals("team-beta", token3Team);
  }

  @Test
  void startCombat_rejectsTeamsModeWhenAnySelectedTokenIsMissingFromTeams() {
    Long ownerUserId = 7L;
    Long gameId = 901L;

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    GameSessionStateEntity sessionState = new GameSessionStateEntity();
    sessionState.setId(901L);
    sessionState.setGame(game);
    sessionState.setVersion(2L);
    sessionState.setStateJson(buildStartCombatStateJson());

    when(gameAccessService.requireGameWithAccess(gameId, ownerUserId)).thenReturn(game);
    when(gameSessionStateRepository.findByGameId(gameId)).thenReturn(Optional.of(sessionState));

    GameSessionCommandService service = new GameSessionCommandService(
        gameAccessService,
        gameMemberRepository,
        gameSessionStateRepository,
        objectMapper,
        messagingTemplate,
        itemCatalogManifestService,
        monsterCatalogManifestService
    );

    ResponseStatusException exception = assertThrows(
        ResponseStatusException.class,
        () -> service.startCombat(
            ownerUserId,
            gameId,
            List.of("token-1", "token-2", "token-3"),
            "teams",
            List.of(
                new StartCombatRequest.TeamAssignmentRequest("team-alpha", List.of("token-1")),
                new StartCombatRequest.TeamAssignmentRequest("team-beta", List.of("token-2"))
            )
        )
    );

    assertEquals(400, exception.getStatusCode().value());
    assertEquals(
        "No modo teams, todos os tokens selecionados devem estar em exatamente um time.",
        exception.getReason()
    );
  }

  @Test
  void startCombat_rejectsFreeForAllWhenTeamsFieldIsProvided() {
    Long ownerUserId = 7L;
    Long gameId = 902L;

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    GameSessionStateEntity sessionState = new GameSessionStateEntity();
    sessionState.setId(902L);
    sessionState.setGame(game);
    sessionState.setVersion(2L);
    sessionState.setStateJson(buildStartCombatStateJson());

    when(gameAccessService.requireGameWithAccess(gameId, ownerUserId)).thenReturn(game);
    when(gameSessionStateRepository.findByGameId(gameId)).thenReturn(Optional.of(sessionState));

    GameSessionCommandService service = new GameSessionCommandService(
        gameAccessService,
        gameMemberRepository,
        gameSessionStateRepository,
        objectMapper,
        messagingTemplate,
        itemCatalogManifestService,
        monsterCatalogManifestService
    );

    ResponseStatusException exception = assertThrows(
        ResponseStatusException.class,
        () -> service.startCombat(
            ownerUserId,
            gameId,
            List.of("token-1", "token-2", "token-3"),
            "freeForAll",
            List.of(new StartCombatRequest.TeamAssignmentRequest("team-alpha", List.of("token-1")))
        )
    );

    assertEquals(400, exception.getStatusCode().value());
    assertEquals("No modo freeForAll, o campo teams não deve ser enviado.", exception.getReason());
  }

  private String buildStartCombatStateJson() {
    return """
        {
          "characters": [
            {
              "id": "char-1",
              "type": "Player",
              "controlledByUserId": null,
              "inspiration": false,
              "attributes": { "base": { "strength": 10, "dexterity": 12, "constitution": 10, "intelligence": 10, "wisdom": 10, "charisma": 10 } },
              "progression": { "currentLevel": 1 },
              "hitPoints": { "current": 10, "max": 10, "temporary": 0 },
              "resourcePools": { "pools": [] },
              "activeEffects": { "effects": [] },
              "inventory": { "items": [] },
              "equipment": {
                "bodyArmorItemId": null,
                "shieldItemId": null,
                "mainHandWeaponId": null,
                "offHandWeaponId": null
              }
            },
            {
              "id": "char-2",
              "type": "Player",
              "controlledByUserId": null,
              "inspiration": false,
              "attributes": { "base": { "strength": 10, "dexterity": 14, "constitution": 10, "intelligence": 10, "wisdom": 10, "charisma": 10 } },
              "progression": { "currentLevel": 1 },
              "hitPoints": { "current": 10, "max": 10, "temporary": 0 },
              "resourcePools": { "pools": [] },
              "activeEffects": { "effects": [] },
              "inventory": { "items": [] },
              "equipment": {
                "bodyArmorItemId": null,
                "shieldItemId": null,
                "mainHandWeaponId": null,
                "offHandWeaponId": null
              }
            },
            {
              "id": "char-3",
              "type": "Player",
              "controlledByUserId": null,
              "inspiration": false,
              "attributes": { "base": { "strength": 10, "dexterity": 16, "constitution": 10, "intelligence": 10, "wisdom": 10, "charisma": 10 } },
              "progression": { "currentLevel": 1 },
              "hitPoints": { "current": 10, "max": 10, "temporary": 0 },
              "resourcePools": { "pools": [] },
              "activeEffects": { "effects": [] },
              "inventory": { "items": [] },
              "equipment": {
                "bodyArmorItemId": null,
                "shieldItemId": null,
                "mainHandWeaponId": null,
                "offHandWeaponId": null
              }
            }
          ],
          "tokens": [
            {
              "id": "token-1",
              "characterId": "char-1",
              "sceneId": "default-scene",
              "position": { "x": 1, "y": 1 }
            },
            {
              "id": "token-2",
              "characterId": "char-2",
              "sceneId": "default-scene",
              "position": { "x": 2, "y": 1 }
            },
            {
              "id": "token-3",
              "characterId": "char-3",
              "sceneId": "default-scene",
              "position": { "x": 3, "y": 1 }
            }
          ],
          "messages": [],
          "combat": null
        }
        """;
  }

  private GameEntity buildGame(Long ownerUserId, Long gameId) {
    UserEntity owner = new UserEntity();
    owner.setId(ownerUserId);

    GameEntity game = new GameEntity();
    game.setId(gameId);
    game.setOwner(owner);
    return game;
  }
}
