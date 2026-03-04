package com.nihilvtt.auth.game.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nihilvtt.auth.game.dto.GameSessionEventResponse;
import com.nihilvtt.auth.game.entity.GameEntity;
import com.nihilvtt.auth.game.entity.GameSessionStateEntity;
import com.nihilvtt.auth.game.repository.GameMemberRepository;
import com.nihilvtt.auth.game.repository.GameSessionStateRepository;
import com.nihilvtt.auth.user.entity.UserEntity;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.server.ResponseStatusException;

class GameSessionCommandServiceRemoveTokensTest {
  private final ObjectMapper objectMapper = new ObjectMapper();

  @Test
  void removeTokens_removesUniqueIdsInSingleCommitAndRemovesOrphanCloneCharacter() throws Exception {
    Long ownerUserId = 7L;
    Long gameId = 19L;
    String cloneCharacterId = "55555555-5555-4555-8555-555555555555";

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    GameSessionStateEntity sessionState = new GameSessionStateEntity();
    sessionState.setId(101L);
    sessionState.setGame(game);
    sessionState.setVersion(12L);
    sessionState.setStateJson("""
        {
          "characters": [
            {
              "id": "%s",
              "type": "Player",
              "name": "Clone",
              "isSessionClone": true,
              "image": null,
              "notes": null,
              "controlledByUserId": null,
              "build": {
                "classId": "class-fighter",
                "originId": "origin-acolyte",
                "specieId": "specie-aasimar",
                "subclassId": null,
                "selectedFeatIds": []
              },
              "progression": {
                "currentLevel": 1,
                "pendingLevelUps": 0
              },
              "attributes": {
                "base": {
                  "strength": 10,
                  "dexterity": 10,
                  "constitution": 10,
                  "intelligence": 10,
                  "wisdom": 10,
                  "charisma": 10
                }
              },
              "hitPoints": {
                "current": 10,
                "max": 10,
                "temporary": 0
              },
              "inspiration": false,
              "inventory": { "items": [] },
              "equipment": {
                "bodyArmorItemId": null,
                "shieldItemId": null,
                "mainHandWeaponId": null,
                "offHandWeaponId": null
              },
              "resourcePools": { "pools": [] },
              "activeEffects": { "effects": [] }
            }
          ],
          "tokens": [
            {
              "id": "token-1",
              "characterId": "%s",
              "sceneId": "default-scene",
              "position": { "x": 1, "y": 1 }
            },
            {
              "id": "token-2",
              "characterId": "%s",
              "sceneId": "default-scene",
              "position": { "x": 2, "y": 1 }
            }
          ],
          "messages": [],
          "combat": null
        }
        """.formatted(cloneCharacterId, cloneCharacterId, cloneCharacterId));

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

    GameSessionEventResponse event = service.removeTokens(ownerUserId, gameId, List.of("token-1", "token-1", "token-2"));

    JsonNode payload = event.payload();
    assertEquals("TOKENS_REMOVED", event.type());
    assertEquals(2, payload.path("tokenIds").size());
    assertEquals("token-1", payload.path("tokenIds").get(0).asText());
    assertEquals("token-2", payload.path("tokenIds").get(1).asText());
    assertEquals(1, payload.path("removedCharacterIds").size());
    assertEquals(cloneCharacterId, payload.path("removedCharacterIds").get(0).asText());
    assertFalse(payload.path("combatChanged").asBoolean(true));
    assertTrue(payload.path("combat").isNull());
    assertEquals(13L, event.serverVersion());

    JsonNode persistedState = objectMapper.readTree(sessionState.getStateJson());
    assertEquals(0, persistedState.path("tokens").size());
    assertEquals(0, persistedState.path("characters").size());
    assertFalse(persistedState.toString().contains("token-1"));
    assertFalse(persistedState.toString().contains("token-2"));
    assertFalse(persistedState.toString().contains(cloneCharacterId));
  }

  @Test
  void removeTokens_rejectsEmptyRequest() {
    Long ownerUserId = 7L;
    Long gameId = 19L;

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    when(gameAccessService.requireGameWithAccess(gameId, ownerUserId)).thenReturn(game);

    GameSessionCommandService service = new GameSessionCommandService(
        gameAccessService,
        gameMemberRepository,
        gameSessionStateRepository,
        objectMapper,
        messagingTemplate,
        itemCatalogManifestService,
        monsterCatalogManifestService
    );

    assertThrows(
        ResponseStatusException.class,
        () -> service.removeTokens(ownerUserId, gameId, List.of())
    );
  }

  @Test
  void removeTokens_failsWithNotFoundWhenAnyTokenDoesNotExist() {
    Long ownerUserId = 7L;
    Long gameId = 19L;
    String cloneCharacterId = "55555555-5555-4555-8555-555555555555";

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    GameSessionStateEntity sessionState = new GameSessionStateEntity();
    sessionState.setId(101L);
    sessionState.setGame(game);
    sessionState.setVersion(12L);
    sessionState.setStateJson("""
        {
          "characters": [
            {
              "id": "%s",
              "type": "Player",
              "name": "Clone",
              "isSessionClone": true,
              "image": null,
              "notes": null,
              "controlledByUserId": null,
              "build": {
                "classId": "class-fighter",
                "originId": "origin-acolyte",
                "specieId": "specie-aasimar",
                "subclassId": null,
                "selectedFeatIds": []
              },
              "progression": {
                "currentLevel": 1,
                "pendingLevelUps": 0
              },
              "attributes": {
                "base": {
                  "strength": 10,
                  "dexterity": 10,
                  "constitution": 10,
                  "intelligence": 10,
                  "wisdom": 10,
                  "charisma": 10
                }
              },
              "hitPoints": {
                "current": 10,
                "max": 10,
                "temporary": 0
              },
              "inspiration": false,
              "inventory": { "items": [] },
              "equipment": {
                "bodyArmorItemId": null,
                "shieldItemId": null,
                "mainHandWeaponId": null,
                "offHandWeaponId": null
              },
              "resourcePools": { "pools": [] },
              "activeEffects": { "effects": [] }
            }
          ],
          "tokens": [
            {
              "id": "token-1",
              "characterId": "%s",
              "sceneId": "default-scene",
              "position": { "x": 1, "y": 1 }
            }
          ],
          "messages": [],
          "combat": null
        }
        """.formatted(cloneCharacterId, cloneCharacterId));

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
        () -> service.removeTokens(ownerUserId, gameId, List.of("token-1", "token-missing"))
    );

    assertEquals(404, exception.getStatusCode().value());
    assertEquals(12L, sessionState.getVersion());
    assertTrue(sessionState.getStateJson().contains("token-1"));
    assertTrue(sessionState.getStateJson().contains(cloneCharacterId));
  }

  private GameEntity buildGame(Long ownerUserId, Long gameId) {
    UserEntity owner = new UserEntity();
    owner.setId(ownerUserId);
    owner.setName("Mestre");
    owner.setEmail("mestre@example.com");
    owner.setPasswordHash("hash");

    GameEntity game = new GameEntity();
    game.setId(gameId);
    game.setTitle("Mesa de Teste");
    game.setDescription("Contrato");
    game.setJoinCode("ABC123");
    game.setMaxPlayers(5);
    game.setCurrentPlayers(1);
    game.setOwner(owner);
    return game;
  }
}
