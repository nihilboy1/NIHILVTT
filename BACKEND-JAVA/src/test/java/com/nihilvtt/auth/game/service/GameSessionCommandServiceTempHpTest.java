package com.nihilvtt.auth.game.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
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

class GameSessionCommandServiceTempHpTest {
  private final ObjectMapper objectMapper = new ObjectMapper();

  @Test
  void updateCharacterTempHp_stacksAmountOnRepeatedCalls() throws Exception {
    Long ownerUserId = 13L;
    Long gameId = 73L;
    String characterId = "c6f6d1c0-e0ec-4ee8-8fe6-610f93189f83";

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    GameSessionStateEntity sessionState = new GameSessionStateEntity();
    sessionState.setId(903L);
    sessionState.setGame(game);
    sessionState.setVersion(1L);
    sessionState.setStateJson("""
        {
          "characters": [
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
                "current": 10,
                "max": 10,
                "temporary": 1
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
        """.formatted(characterId));

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

    GameSessionEventResponse firstEvent = service.updateCharacterTempHp(ownerUserId, gameId, characterId, 4);
    assertEquals("CHARACTER_HP_UPDATED", firstEvent.type());
    assertEquals(5, firstEvent.payload().path("tempHp").asInt());

    GameSessionEventResponse secondEvent = service.updateCharacterTempHp(ownerUserId, gameId, characterId, 4);
    assertEquals("CHARACTER_HP_UPDATED", secondEvent.type());
    assertEquals(9, secondEvent.payload().path("tempHp").asInt());

    JsonNode persistedState = objectMapper.readTree(sessionState.getStateJson());
    JsonNode persistedCharacter = persistedState.path("characters").get(0);
    assertEquals(10, persistedCharacter.path("hitPoints").path("current").asInt());
    assertEquals(9, persistedCharacter.path("hitPoints").path("temporary").asInt());
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
