package com.nihilvtt.auth.game.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
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

class GameSessionCommandServiceMonsterDuplicationTest {
  private final ObjectMapper objectMapper = new ObjectMapper();

  @Test
  void duplicateCharacter_resetsNpcMutableRuntimeStateAndPreservesVisualOverrides() throws Exception {
    Long ownerUserId = 7L;
    Long gameId = 15L;
    String sourceCharacterId = "33333333-3333-4333-8333-333333333333";

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    GameSessionStateEntity sessionState = new GameSessionStateEntity();
    sessionState.setId(99L);
    sessionState.setGame(game);
    sessionState.setVersion(3L);
    sessionState.setStateJson("""
        {
          "characters": [
            {
              "id": "%s",
              "type": "NPC",
              "monsterId": "monster-commoner",
              "nameOverride": "Plebeu Ferido",
              "imageOverride": "token-custom.png",
              "notes": "anotacao",
              "hitPoints": { "current": 1, "temporary": 7 },
              "resourcePools": {
                "pools": [
                  { "resourceId": "resource-test", "current": 0 }
                ]
              },
              "activeEffects": {
                "effects": [
                  {
                    "instanceId": "44444444-4444-4444-8444-444444444444",
                    "source": {
                      "sourceType": "action",
                      "sourceId": "monster-commoner"
                    },
                    "effectIndex": 0,
                    "appliedByCharacterId": null,
                    "linkedCondition": null,
                    "stackCount": 1,
                    "isSuppressed": false,
                    "remainingDuration": null
                  }
                ]
              }
            }
          ],
          "tokens": [],
          "messages": []
        }
        """.formatted(sourceCharacterId));

    when(gameAccessService.requireGameWithAccess(gameId, ownerUserId)).thenReturn(game);
    when(gameSessionStateRepository.findByGameId(gameId)).thenReturn(Optional.of(sessionState));
    when(gameSessionStateRepository.save(any(GameSessionStateEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));
    when(monsterCatalogManifestService.requireKnownMonster("monster-commoner")).thenReturn(
        new MonsterCatalogManifestService.MonsterCatalogEntry(
            "monster-commoner",
            "Plebeu",
            List.of("Plebeu", "Commoner"),
            null,
            null,
            "Medium",
            "humanoid",
            "neutral",
            new MonsterCatalogManifestService.MonsterCatalogAbilityScores(10, 10, 10, 10, 10, 10),
            10,
            4,
            new MonsterCatalogManifestService.MonsterCatalogSpeed(30, null, null, null, null, "ft"),
            "0"
        )
    );

    GameSessionCommandService service = new GameSessionCommandService(
        gameAccessService,
        gameMemberRepository,
        gameSessionStateRepository,
        objectMapper,
        messagingTemplate,
        itemCatalogManifestService,
        monsterCatalogManifestService
    );

    GameSessionEventResponse event = service.duplicateCharacter(ownerUserId, gameId, sourceCharacterId);

    JsonNode duplicatedCharacter = event.payload().path("character");
    assertEquals("NPC", duplicatedCharacter.path("type").asText());
    assertEquals("monster-commoner", duplicatedCharacter.path("monsterId").asText());
    assertEquals("Plebeu Ferido", duplicatedCharacter.path("nameOverride").asText());
    assertEquals("token-custom.png", duplicatedCharacter.path("imageOverride").asText());
    assertEquals("anotacao", duplicatedCharacter.path("notes").asText());
    assertEquals(4, duplicatedCharacter.path("hitPoints").path("current").asInt());
    assertEquals(0, duplicatedCharacter.path("hitPoints").path("temporary").asInt());
    assertEquals(0, duplicatedCharacter.path("resourcePools").path("pools").size());
    assertEquals(0, duplicatedCharacter.path("activeEffects").path("effects").size());
    assertNotNull(duplicatedCharacter.path("id").asText());
    assertNotEquals(sourceCharacterId, duplicatedCharacter.path("id").asText());
    assertFalse(duplicatedCharacter.has("controlledByUserId"));
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
