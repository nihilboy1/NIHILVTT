package com.nihilvtt.auth.game.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
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

class GameSessionCommandServiceDeathConditionTest {
  private final ObjectMapper objectMapper = new ObjectMapper();

  @Test
  void updateCharacterHp_setsDeadConditionForNpcAtZeroHpAndDoesNotDuplicate() throws Exception {
    Long ownerUserId = 7L;
    Long gameId = 42L;
    String npcCharacterId = "99999999-9999-4999-8999-999999999999";

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    MonsterCatalogManifestService.MonsterCatalogEntry monsterEntry = new MonsterCatalogManifestService.MonsterCatalogEntry(
        "monster-zombie",
        "Zumbi",
        java.util.List.of("Zumbi"),
        "token.png",
        "splash.png",
        "medium",
        "undead",
        "neutral evil",
        new MonsterCatalogManifestService.MonsterCatalogAbilityScores(13, 6, 16, 3, 6, 5),
        8,
        22,
        new MonsterCatalogManifestService.MonsterCatalogSpeed(20, null, null, null, null, "ft"),
        "1/4"
    );

    GameEntity game = buildGame(ownerUserId, gameId);
    GameSessionStateEntity sessionState = new GameSessionStateEntity();
    sessionState.setId(701L);
    sessionState.setGame(game);
    sessionState.setVersion(3L);
    sessionState.setStateJson("""
        {
          "characters": [
            {
              "id": "%s",
              "type": "NPC",
              "monsterId": "monster-zombie",
              "nameOverride": null,
              "imageOverride": null,
              "notes": null,
              "hitPoints": {
                "current": 4,
                "temporary": 0
              },
              "resourcePools": { "pools": [] },
              "activeEffects": { "effects": [] }
            }
          ],
          "tokens": [
            {
              "id": "token-npc-1",
              "characterId": "%s",
              "sceneId": "default-scene",
              "position": { "x": 2, "y": 2 }
            }
          ],
          "messages": [],
          "combat": {
            "active": true,
            "round": 1,
            "turnIndex": 0,
            "participants": [
              {
                "tokenId": "token-npc-1",
                "characterId": "%s",
                "initiativeRoll": 12,
                "initiativeTotal": 12,
                "dexterityScore": 6,
                "movementBudgetCells": 6,
                "status": "active"
              }
            ],
            "turnResources": {
              "actionAvailable": true,
              "bonusActionAvailable": true,
              "remainingMovementCells": 6,
              "totalMovementCells": 6
            }
          }
        }
        """.formatted(npcCharacterId, npcCharacterId, npcCharacterId));

    when(gameAccessService.requireGameWithAccess(gameId, ownerUserId)).thenReturn(game);
    when(gameSessionStateRepository.findByGameId(gameId)).thenReturn(Optional.of(sessionState));
    when(gameSessionStateRepository.save(any(GameSessionStateEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));
    when(monsterCatalogManifestService.requireKnownMonster("monster-zombie")).thenReturn(monsterEntry);

    GameSessionCommandService service = new GameSessionCommandService(
        gameAccessService,
        gameMemberRepository,
        gameSessionStateRepository,
        objectMapper,
        messagingTemplate,
        itemCatalogManifestService,
        monsterCatalogManifestService
    );

    GameSessionEventResponse firstEvent = service.updateCharacterHp(ownerUserId, gameId, npcCharacterId, "damage", 10);
    assertEquals("CHARACTER_HP_UPDATED", firstEvent.type());
    assertEquals(0, firstEvent.payload().path("currentHp").asInt());
    assertEquals(true, firstEvent.payload().path("combatChanged").asBoolean(false));
    assertEquals(true, firstEvent.payload().path("combat").isNull());

    GameSessionEventResponse secondEvent = service.updateCharacterHp(ownerUserId, gameId, npcCharacterId, "damage", 1);
    assertEquals("CHARACTER_HP_UPDATED", secondEvent.type());
    assertEquals(0, secondEvent.payload().path("currentHp").asInt());
    assertEquals(false, secondEvent.payload().path("combatChanged").asBoolean(false));

    JsonNode persistedState = objectMapper.readTree(sessionState.getStateJson());
    JsonNode npc = persistedState.path("characters").get(0);
    JsonNode effects = npc.path("activeEffects").path("effects");
    assertEquals(true, persistedState.path("combat").isNull());

    assertEquals(1, effects.size());
    JsonNode deadEffect = effects.get(0);
    assertEquals("dead", deadEffect.path("linkedCondition").asText());
    assertEquals("action", deadEffect.path("source").path("sourceType").asText());
    assertEquals("act-apply-effect", deadEffect.path("source").path("sourceId").asText());
    assertEquals(1, deadEffect.path("stackCount").asInt());
    assertEquals(false, deadEffect.path("isSuppressed").asBoolean(true));
    assertNotNull(deadEffect.path("instanceId").asText(null));
  }

  @Test
  void startCombat_rejectsParticipantWithDeadCondition() {
    Long ownerUserId = 7L;
    Long gameId = 43L;
    String deadNpcCharacterId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
    String aliveNpcCharacterId = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    MonsterCatalogManifestService.MonsterCatalogEntry monsterEntry = new MonsterCatalogManifestService.MonsterCatalogEntry(
        "monster-zombie",
        "Zumbi",
        java.util.List.of("Zumbi"),
        "token.png",
        "splash.png",
        "medium",
        "undead",
        "neutral evil",
        new MonsterCatalogManifestService.MonsterCatalogAbilityScores(13, 6, 16, 3, 6, 5),
        8,
        22,
        new MonsterCatalogManifestService.MonsterCatalogSpeed(20, null, null, null, null, "ft"),
        "1/4"
    );

    GameEntity game = buildGame(ownerUserId, gameId);
    GameSessionStateEntity sessionState = new GameSessionStateEntity();
    sessionState.setId(702L);
    sessionState.setGame(game);
    sessionState.setVersion(1L);
    sessionState.setStateJson("""
        {
          "characters": [
            {
              "id": "%s",
              "type": "NPC",
              "monsterId": "monster-zombie",
              "nameOverride": null,
              "imageOverride": null,
              "notes": null,
              "hitPoints": {
                "current": 0,
                "temporary": 0
              },
              "resourcePools": { "pools": [] },
              "activeEffects": {
                "effects": [
                  {
                    "instanceId": "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
                    "source": { "sourceType": "action", "sourceId": "act-apply-effect" },
                    "effectIndex": 0,
                    "linkedCondition": "dead",
                    "stackCount": 1,
                    "isSuppressed": false
                  }
                ]
              }
            },
            {
              "id": "%s",
              "type": "NPC",
              "monsterId": "monster-zombie",
              "nameOverride": null,
              "imageOverride": null,
              "notes": null,
              "hitPoints": {
                "current": 10,
                "temporary": 0
              },
              "resourcePools": { "pools": [] },
              "activeEffects": { "effects": [] }
            }
          ],
          "tokens": [
            {
              "id": "token-dead",
              "characterId": "%s",
              "sceneId": "default-scene",
              "position": { "x": 1, "y": 1 }
            },
            {
              "id": "token-alive",
              "characterId": "%s",
              "sceneId": "default-scene",
              "position": { "x": 2, "y": 2 }
            }
          ],
          "messages": [],
          "combat": null
        }
        """.formatted(deadNpcCharacterId, aliveNpcCharacterId, deadNpcCharacterId, aliveNpcCharacterId));

    when(gameAccessService.requireGameWithAccess(gameId, ownerUserId)).thenReturn(game);
    when(gameSessionStateRepository.findByGameId(gameId)).thenReturn(Optional.of(sessionState));
    when(monsterCatalogManifestService.requireKnownMonster("monster-zombie")).thenReturn(monsterEntry);

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
        () -> service.startCombat(ownerUserId, gameId, java.util.List.of("token-alive", "token-dead"))
    );

    assertEquals(400, exception.getStatusCode().value());
  }

  @Test
  void updateCharacterHp_healRemovesDeadConditionForNpcAndPlayer() throws Exception {
    Long ownerUserId = 7L;
    Long gameId = 44L;
    String npcCharacterId = "dddddddd-dddd-4ddd-8ddd-dddddddddddd";
    String playerCharacterId = "eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee";

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    MonsterCatalogManifestService.MonsterCatalogEntry monsterEntry = new MonsterCatalogManifestService.MonsterCatalogEntry(
        "monster-zombie",
        "Zumbi",
        java.util.List.of("Zumbi"),
        "token.png",
        "splash.png",
        "medium",
        "undead",
        "neutral evil",
        new MonsterCatalogManifestService.MonsterCatalogAbilityScores(13, 6, 16, 3, 6, 5),
        8,
        22,
        new MonsterCatalogManifestService.MonsterCatalogSpeed(20, null, null, null, null, "ft"),
        "1/4"
    );

    GameEntity game = buildGame(ownerUserId, gameId);
    GameSessionStateEntity sessionState = new GameSessionStateEntity();
    sessionState.setId(703L);
    sessionState.setGame(game);
    sessionState.setVersion(1L);
    sessionState.setStateJson("""
        {
          "characters": [
            {
              "id": "%s",
              "type": "NPC",
              "monsterId": "monster-zombie",
              "nameOverride": null,
              "imageOverride": null,
              "notes": null,
              "hitPoints": {
                "current": 0,
                "temporary": 0
              },
              "resourcePools": { "pools": [] },
              "activeEffects": {
                "effects": [
                  {
                    "instanceId": "ffffffff-ffff-4fff-8fff-ffffffffffff",
                    "source": { "sourceType": "action", "sourceId": "act-apply-effect" },
                    "effectIndex": 0,
                    "linkedCondition": "dead",
                    "stackCount": 1,
                    "isSuppressed": false
                  }
                ]
              }
            },
            {
              "id": "%s",
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
                "current": 0,
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
              "activeEffects": {
                "effects": [
                  {
                    "instanceId": "11111111-2222-4333-8444-555555555555",
                    "source": { "sourceType": "action", "sourceId": "act-apply-effect" },
                    "effectIndex": 0,
                    "linkedCondition": "dead",
                    "stackCount": 1,
                    "isSuppressed": false
                  }
                ]
              }
            }
          ],
          "tokens": [],
          "messages": [],
          "combat": null
        }
        """.formatted(npcCharacterId, playerCharacterId));

    when(gameAccessService.requireGameWithAccess(gameId, ownerUserId)).thenReturn(game);
    when(gameSessionStateRepository.findByGameId(gameId)).thenReturn(Optional.of(sessionState));
    when(gameSessionStateRepository.save(any(GameSessionStateEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));
    when(monsterCatalogManifestService.requireKnownMonster("monster-zombie")).thenReturn(monsterEntry);

    GameSessionCommandService service = new GameSessionCommandService(
        gameAccessService,
        gameMemberRepository,
        gameSessionStateRepository,
        objectMapper,
        messagingTemplate,
        itemCatalogManifestService,
        monsterCatalogManifestService
    );

    GameSessionEventResponse npcHeal = service.updateCharacterHp(ownerUserId, gameId, npcCharacterId, "heal", 5);
    GameSessionEventResponse playerHeal = service.updateCharacterHp(ownerUserId, gameId, playerCharacterId, "heal", 5);

    assertEquals(true, npcHeal.payload().path("deadConditionRemoved").asBoolean(false));
    assertEquals(false, npcHeal.payload().path("deadConditionApplied").asBoolean(true));
    assertEquals(true, playerHeal.payload().path("deadConditionRemoved").asBoolean(false));
    assertEquals(false, playerHeal.payload().path("deadConditionApplied").asBoolean(true));

    JsonNode persistedState = objectMapper.readTree(sessionState.getStateJson());
    JsonNode npcEffects = persistedState.path("characters").get(0).path("activeEffects").path("effects");
    JsonNode playerEffects = persistedState.path("characters").get(1).path("activeEffects").path("effects");

    assertEquals(0, npcEffects.size());
    assertEquals(0, playerEffects.size());
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
