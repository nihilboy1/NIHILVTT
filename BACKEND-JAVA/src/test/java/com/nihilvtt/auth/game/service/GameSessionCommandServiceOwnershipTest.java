package com.nihilvtt.auth.game.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.server.ResponseStatusException;

class GameSessionCommandServiceOwnershipTest {
  private final ObjectMapper objectMapper = new ObjectMapper();

  @Test
  void createToken_allowsAssignedPlayerControllerToInstantiateOwnCharacterToken() throws Exception {
    Long ownerUserId = 7L;
    Long controllerUserId = 33L;
    Long gameId = 21L;
    String characterId = "11111111-1111-4111-8111-111111111111";

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    GameSessionStateEntity sessionState = new GameSessionStateEntity();
    sessionState.setId(301L);
    sessionState.setGame(game);
    sessionState.setVersion(4L);
    sessionState.setStateJson(playerStateJson(characterId, controllerUserId));

    when(gameAccessService.requireGameWithAccess(gameId, controllerUserId)).thenReturn(game);
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

    GameSessionEventResponse event = service.createToken(controllerUserId, gameId, characterId, "default-scene", 4, 5);

    assertEquals("TOKEN_CREATED", event.type());
    assertEquals(5L, event.serverVersion());
    assertEquals(characterId, event.payload().path("token").path("characterId").asText());
    assertEquals("default-scene", event.payload().path("token").path("sceneId").asText());
    assertEquals(4, event.payload().path("token").path("position").path("x").asInt());
    assertEquals(5, event.payload().path("token").path("position").path("y").asInt());
    assertTrue(event.payload().path("character").isNull());

    JsonNode persistedState = objectMapper.readTree(sessionState.getStateJson());
    assertEquals(1, persistedState.path("tokens").size());
    assertEquals(characterId, persistedState.path("tokens").get(0).path("characterId").asText());
  }

  @Test
  void createToken_rejectsNonMasterWhenPlayerHasNoAssignedController() {
    Long ownerUserId = 7L;
    Long playerUserId = 33L;
    Long gameId = 21L;
    String characterId = "11111111-1111-4111-8111-111111111111";

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    GameSessionStateEntity sessionState = new GameSessionStateEntity();
    sessionState.setId(302L);
    sessionState.setGame(game);
    sessionState.setVersion(8L);
    sessionState.setStateJson(playerStateJson(characterId, null));

    when(gameAccessService.requireGameWithAccess(gameId, playerUserId)).thenReturn(game);
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
        () -> service.createToken(playerUserId, gameId, characterId, "default-scene", 4, 5)
    );

    assertEquals(403, exception.getStatusCode().value());
    assertEquals(8L, sessionState.getVersion());
    assertTrue(sessionState.getStateJson().contains("\"tokens\": []"));
  }

  @Test
  void createToken_rejectsNpcInstantiationForNonMaster() {
    Long ownerUserId = 7L;
    Long playerUserId = 33L;
    Long gameId = 21L;
    String characterId = "22222222-2222-4222-8222-222222222222";

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    GameSessionStateEntity sessionState = new GameSessionStateEntity();
    sessionState.setId(303L);
    sessionState.setGame(game);
    sessionState.setVersion(9L);
    sessionState.setStateJson(npcStateJson(characterId));

    when(gameAccessService.requireGameWithAccess(gameId, playerUserId)).thenReturn(game);
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
        () -> service.createToken(playerUserId, gameId, characterId, "default-scene", 4, 5)
    );

    assertEquals(403, exception.getStatusCode().value());
    assertEquals(9L, sessionState.getVersion());
    assertTrue(sessionState.getStateJson().contains("\"type\": \"NPC\""));
  }

  @Test
  void updateCharacterController_rejectsNpcAssignment() {
    Long ownerUserId = 7L;
    Long gameId = 21L;
    String characterId = "22222222-2222-4222-8222-222222222222";

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    GameSessionStateEntity sessionState = new GameSessionStateEntity();
    sessionState.setId(304L);
    sessionState.setGame(game);
    sessionState.setVersion(11L);
    sessionState.setStateJson(npcStateJson(characterId));

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
        () -> service.updateCharacterController(ownerUserId, gameId, characterId, null)
    );

    assertEquals(400, exception.getStatusCode().value());
    assertEquals(11L, sessionState.getVersion());
    assertTrue(sessionState.getStateJson().contains("\"type\": \"NPC\""));
  }

  private String playerStateJson(String characterId, Long controlledByUserId) {
    String controlledByUserIdJson = controlledByUserId == null ? "null" : controlledByUserId.toString();

    return """
        {
          "characters": [
            {
              "id": "%s",
              "type": "Player",
              "name": "Heroi",
              "image": null,
              "notes": null,
              "controlledByUserId": %s,
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
          "tokens": [],
          "messages": []
        }
        """.formatted(characterId, controlledByUserIdJson);
  }

  private String npcStateJson(String characterId) {
    return """
        {
          "characters": [
            {
              "id": "%s",
              "type": "NPC",
              "monsterId": "monster-commoner",
              "nameOverride": null,
              "imageOverride": null,
              "notes": null,
              "hitPoints": { "current": 4, "temporary": 0 },
              "resourcePools": { "pools": [] },
              "activeEffects": { "effects": [] }
            }
          ],
          "tokens": [],
          "messages": []
        }
        """.formatted(characterId);
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
    game.setCurrentPlayers(2);
    game.setOwner(owner);
    return game;
  }
}
