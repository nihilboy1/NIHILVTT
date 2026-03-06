package com.nihilvtt.auth.game.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
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
import java.util.concurrent.atomic.AtomicReference;
import org.junit.jupiter.api.Test;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.server.ResponseStatusException;

class GameSessionCommandServiceMovementValidationTest {
  private final ObjectMapper objectMapper = new ObjectMapper();

  @Test
  void moveToken_inCombatUsesPathCostAroundOccupiedCells() throws Exception {
    Long ownerUserId = 7L;
    Long gameId = 21L;

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    GameSessionStateEntity sessionState = new GameSessionStateEntity();
    sessionState.setId(601L);
    sessionState.setGame(game);
    sessionState.setVersion(10L);
    sessionState.setStateJson(combatStateJsonWithDetour(4));

    when(gameAccessService.requireGameWithAccess(gameId, ownerUserId)).thenReturn(game);
    when(gameSessionStateRepository.findByGameId(gameId)).thenReturn(Optional.of(sessionState));
    AtomicReference<GameSessionStateEntity> lastSavedSessionState = new AtomicReference<>();
    when(gameSessionStateRepository.save(any(GameSessionStateEntity.class))).thenAnswer(invocation -> {
      GameSessionStateEntity savedState = invocation.getArgument(0);
      lastSavedSessionState.set(savedState);
      return savedState;
    });

    GameSessionCommandService service = new GameSessionCommandService(
        gameAccessService,
        gameMemberRepository,
        gameSessionStateRepository,
        objectMapper,
        messagingTemplate,
        itemCatalogManifestService,
        monsterCatalogManifestService
    );

    GameSessionEventResponse event = service.moveToken(ownerUserId, gameId, "token-hero", 3, 1);

    assertEquals("TOKEN_MOVED", event.type());
    assertEquals(11L, event.serverVersion());
    assertEquals(3, event.payload().path("position").path("x").asInt());
    assertEquals(1, event.payload().path("position").path("y").asInt());

    JsonNode persistedState = objectMapper.readTree(sessionState.getStateJson());
    assertEquals(0, persistedState.path("combat").path("turnResources").path("remainingMovementCells").asInt());
  }

  @Test
  void moveToken_inCombatRejectsDestinationWhenMovementIsInsufficient() {
    Long ownerUserId = 7L;
    Long gameId = 21L;

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    GameSessionStateEntity sessionState = new GameSessionStateEntity();
    sessionState.setId(602L);
    sessionState.setGame(game);
    sessionState.setVersion(12L);
    sessionState.setStateJson(combatStateJsonWithDetour(3));

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
        () -> service.moveToken(ownerUserId, gameId, "token-hero", 3, 1)
    );

    assertEquals(400, exception.getStatusCode().value());
    assertEquals("O participante do turno atual não possui deslocamento suficiente.", exception.getReason());
    assertEquals(12L, sessionState.getVersion());
  }

  @Test
  void moveToken_inCombatRejectsOccupiedDestinationAsInvalid() {
    Long ownerUserId = 7L;
    Long gameId = 21L;

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    GameSessionStateEntity sessionState = new GameSessionStateEntity();
    sessionState.setId(603L);
    sessionState.setGame(game);
    sessionState.setVersion(20L);
    sessionState.setStateJson(combatStateJsonWithDetour(6));

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
        () -> service.moveToken(ownerUserId, gameId, "token-hero", 2, 1)
    );

    assertEquals(400, exception.getStatusCode().value());
    assertEquals("Local inválido para movimento.", exception.getReason());
    assertTrue(sessionState.getStateJson().contains("\"token-hero\""));
    assertEquals(20L, sessionState.getVersion());
  }

  @Test
  void moveToken_inCombatCountsInterruptedDiagonalAsExtraCost() throws Exception {
    Long ownerUserId = 7L;
    Long gameId = 21L;

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    GameSessionStateEntity sessionState = new GameSessionStateEntity();
    sessionState.setId(604L);
    sessionState.setGame(game);
    sessionState.setVersion(22L);
    sessionState.setStateJson(combatStateJsonWithInterruptedDiagonal(6));

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

    GameSessionEventResponse event = service.moveToken(ownerUserId, gameId, "token-hero", 6, 6);

    assertEquals("TOKEN_MOVED", event.type());

    JsonNode persistedState = objectMapper.readTree(sessionState.getStateJson());
    assertEquals(0, persistedState.path("combat").path("turnResources").path("remainingMovementCells").asInt());
  }

  @Test
  void moveToken_inCombatTreatsLargeBlockerAsOccupiedFootprint() throws Exception {
    Long ownerUserId = 7L;
    Long gameId = 21L;

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    GameSessionStateEntity sessionStateInsufficient = new GameSessionStateEntity();
    sessionStateInsufficient.setId(605L);
    sessionStateInsufficient.setGame(game);
    sessionStateInsufficient.setVersion(24L);
    sessionStateInsufficient.setStateJson(combatStateJsonWithLargeBlocker(5));

    when(gameAccessService.requireGameWithAccess(gameId, ownerUserId)).thenReturn(game);
    when(gameSessionStateRepository.findByGameId(gameId))
      .thenReturn(Optional.of(sessionStateInsufficient))
      .thenReturn(Optional.of(sessionStateWithExactBudget(game, 606L, 25L)));
    AtomicReference<GameSessionStateEntity> lastSavedSessionState = new AtomicReference<>();
    when(gameSessionStateRepository.save(any(GameSessionStateEntity.class))).thenAnswer(invocation -> {
      GameSessionStateEntity savedState = invocation.getArgument(0);
      lastSavedSessionState.set(savedState);
      return savedState;
    });
    when(monsterCatalogManifestService.requireKnownMonster("monster-ogre"))
        .thenReturn(new MonsterCatalogManifestService.MonsterCatalogEntry(
            "monster-ogre",
            "Ogro",
            java.util.List.of("Ogro"),
            null,
            null,
            "large",
            "giant",
            "neutral evil",
            null,
            11,
            59,
            null,
            "2"
        ));

    GameSessionCommandService service = new GameSessionCommandService(
        gameAccessService,
        gameMemberRepository,
        gameSessionStateRepository,
        objectMapper,
        messagingTemplate,
        itemCatalogManifestService,
        monsterCatalogManifestService
    );

    ResponseStatusException insufficientMovementException =
      assertThrows(
        ResponseStatusException.class,
        () -> service.moveToken(ownerUserId, gameId, "token-hero", 5, 5)
      );

    assertEquals(400, insufficientMovementException.getStatusCode().value());
    assertTrue(insufficientMovementException.getReason().contains("não possui deslocamento suficiente"));

    GameSessionEventResponse event = service.moveToken(ownerUserId, gameId, "token-hero", 5, 5);

    assertEquals("TOKEN_MOVED", event.type());

    GameSessionStateEntity sessionStateAfterSuccessfulMove = lastSavedSessionState.get();
    assertNotNull(sessionStateAfterSuccessfulMove);
    JsonNode persistedState = objectMapper.readTree(sessionStateAfterSuccessfulMove.getStateJson());
    assertEquals(0, persistedState.path("combat").path("turnResources").path("remainingMovementCells").asInt());
  }

  private GameSessionStateEntity sessionStateWithExactBudget(GameEntity game, Long id, Long version) {
    GameSessionStateEntity sessionState = new GameSessionStateEntity();
    sessionState.setId(id);
    sessionState.setGame(game);
    sessionState.setVersion(version);
    sessionState.setStateJson(combatStateJsonWithLargeBlocker(6));
    return sessionState;
  }

  private String combatStateJsonWithDetour(int remainingMovementCells) {
    return """
        {
          "characters": [
            {
              "id": "char-hero",
              "type": "Player",
              "name": "Heroi",
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
              "id": "token-hero",
              "characterId": "char-hero",
              "sceneId": "default-scene",
              "position": {
                "x": 1,
                "y": 1
              }
            },
            {
              "id": "token-blocker",
              "characterId": "char-hero",
              "sceneId": "default-scene",
              "position": {
                "x": 2,
                "y": 1
              }
            }
          ],
          "messages": [],
          "combat": {
            "active": true,
            "round": 1,
            "turnIndex": 0,
            "participants": [
              {
                "tokenId": "token-hero",
                "characterId": "char-hero",
                "initiativeRoll": 12,
                "initiativeTotal": 14,
                "dexterityScore": 14,
                "movementBudgetCells": 6,
                "status": "active"
              }
            ],
            "turnResources": {
              "actionAvailable": true,
              "bonusActionAvailable": true,
              "remainingMovementCells": %d,
              "totalMovementCells": 6
            }
          }
        }
        """.formatted(remainingMovementCells);
  }

  private String combatStateJsonWithInterruptedDiagonal(int remainingMovementCells) {
    return """
        {
          "characters": [
            {
              "id": "char-hero",
              "type": "Player",
              "name": "Heroi",
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
              "id": "token-hero",
              "characterId": "char-hero",
              "sceneId": "default-scene",
              "position": {
                "x": 1,
                "y": 1
              }
            },
            {
              "id": "token-blocker",
              "characterId": "char-hero",
              "sceneId": "default-scene",
              "position": {
                "x": 2,
                "y": 1
              }
            }
          ],
          "messages": [],
          "combat": {
            "active": true,
            "round": 1,
            "turnIndex": 0,
            "participants": [
              {
                "tokenId": "token-hero",
                "characterId": "char-hero",
                "initiativeRoll": 12,
                "initiativeTotal": 14,
                "dexterityScore": 14,
                "movementBudgetCells": 6,
                "status": "active"
              }
            ],
            "turnResources": {
              "actionAvailable": true,
              "bonusActionAvailable": true,
              "remainingMovementCells": %d,
              "totalMovementCells": 6
            }
          }
        }
        """.formatted(remainingMovementCells);
  }

  private String combatStateJsonWithLargeBlocker(int remainingMovementCells) {
    return """
        {
          "characters": [
            {
              "id": "char-hero",
              "type": "Player",
              "name": "Heroi",
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
            },
            {
              "id": "char-ogre",
              "type": "NPC",
              "monsterId": "monster-ogre",
              "nameOverride": null,
              "imageOverride": null,
              "notes": null,
              "hitPoints": { "current": 59, "temporary": 0 },
              "resourcePools": { "pools": [] },
              "activeEffects": { "effects": [] }
            }
          ],
          "tokens": [
            {
              "id": "token-hero",
              "characterId": "char-hero",
              "sceneId": "default-scene",
              "position": {
                "x": 1,
                "y": 1
              }
            },
            {
              "id": "token-ogre",
              "characterId": "char-ogre",
              "sceneId": "default-scene",
              "position": {
                "x": 2,
                "y": 1
              }
            }
          ],
          "messages": [],
          "combat": {
            "active": true,
            "round": 1,
            "turnIndex": 0,
            "participants": [
              {
                "tokenId": "token-hero",
                "characterId": "char-hero",
                "initiativeRoll": 12,
                "initiativeTotal": 14,
                "dexterityScore": 14,
                "movementBudgetCells": 6,
                "status": "active"
              }
            ],
            "turnResources": {
              "actionAvailable": true,
              "bonusActionAvailable": true,
              "remainingMovementCells": %d,
              "totalMovementCells": 6
            }
          }
        }
        """.formatted(remainingMovementCells);
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
