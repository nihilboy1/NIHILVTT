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
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.server.ResponseStatusException;

class GameSessionCommandServiceAttackContractTest {
  private final ObjectMapper objectMapper = new ObjectMapper();

  @Test
  void resolveAttack_rejectsDivergentDamageTypeForBuiltinUnarmedStrike() {
    Long ownerUserId = 7L;
    Long gameId = 42L;

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    GameSessionStateEntity sessionState = new GameSessionStateEntity();
    sessionState.setId(700L);
    sessionState.setGame(game);
    sessionState.setVersion(3L);
    sessionState.setStateJson("""
        {
          "characters": [
            {
              "id": "attacker-char",
              "type": "Player",
              "attributes": { "base": { "strength": 14 } },
              "progression": { "currentLevel": 1 },
              "hitPoints": { "current": 10, "max": 10, "temporary": 0 }
            }
          ],
          "tokens": [
            {
              "id": "token-attacker",
              "characterId": "attacker-char",
              "sceneId": "default-scene",
              "position": { "x": 1, "y": 1 }
            }
          ],
          "messages": [],
          "combat": {
            "active": true,
            "round": 1,
            "turnIndex": 0,
            "participants": [
              { "tokenId": "token-attacker" },
              { "tokenId": "token-target" }
            ],
            "turnResources": {
              "actionAvailable": true,
              "bonusActionAvailable": true,
              "remainingMovementCells": 6,
              "totalMovementCells": 6
            }
          }
        }
        """);

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
        () -> service.resolveAttack(
            ownerUserId,
            gameId,
            "token-attacker",
            "token-target",
            "builtin-unarmed-strike",
            "Ataque desarmado",
            99,
            "999",
            "piercing"
        )
    );

    assertEquals(400, exception.getStatusCode().value());
    assertEquals("Tipo de dano divergente do ataque autoritativo.", exception.getReason());
  }

  @Test
  void resolveAttack_acceptsLizardfolkUnarmedWhenDamageTypeMatchesOverride() {
    Long ownerUserId = 7L;
    Long gameId = 43L;

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    GameSessionStateEntity sessionState = new GameSessionStateEntity();
    sessionState.setId(701L);
    sessionState.setGame(game);
    sessionState.setVersion(3L);
    sessionState.setStateJson("""
        {
          "characters": [
            {
              "id": "attacker-char",
              "type": "Player",
              "build": { "specieId": "specie-lizardfolk" },
              "attributes": { "base": { "strength": 14, "dexterity": 10 } },
              "progression": { "currentLevel": 1 },
              "equipment": {
                "bodyArmorItemId": null,
                "shieldItemId": null,
                "mainHandWeaponId": null,
                "offHandWeaponId": null
              },
              "hitPoints": { "current": 10, "max": 10, "temporary": 0 }
            },
            {
              "id": "target-char",
              "type": "Player",
              "attributes": { "base": { "strength": 10, "dexterity": 10 } },
              "progression": { "currentLevel": 1 },
              "equipment": {
                "bodyArmorItemId": null,
                "shieldItemId": null,
                "mainHandWeaponId": null,
                "offHandWeaponId": null
              },
              "hitPoints": { "current": 10, "max": 10, "temporary": 0 }
            }
          ],
          "tokens": [
            {
              "id": "token-attacker",
              "characterId": "attacker-char",
              "sceneId": "default-scene",
              "position": { "x": 1, "y": 1 }
            },
            {
              "id": "token-target",
              "characterId": "target-char",
              "sceneId": "default-scene",
              "position": { "x": 2, "y": 1 }
            }
          ],
          "messages": [],
          "combat": {
            "active": true,
            "round": 1,
            "turnIndex": 0,
            "participants": [
              { "tokenId": "token-attacker" },
              { "tokenId": "token-target" }
            ],
            "turnResources": {
              "actionAvailable": true,
              "bonusActionAvailable": true,
              "remainingMovementCells": 6,
              "totalMovementCells": 6
            }
          }
        }
        """);

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

    GameSessionEventResponse event = service.resolveAttack(
        ownerUserId,
        gameId,
        "token-attacker",
        "token-target",
        "builtin-unarmed-strike",
        "Ataque desarmado",
        99,
        "999",
        "slashing"
    );

    assertEquals("ATTACK_RESOLVED", event.type());
  }

  @Test
  void resolveAttack_rejectsLizardfolkUnarmedWhenDamageTypeDoesNotMatchOverride() {
    Long ownerUserId = 7L;
    Long gameId = 44L;

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    GameSessionStateEntity sessionState = new GameSessionStateEntity();
    sessionState.setId(702L);
    sessionState.setGame(game);
    sessionState.setVersion(3L);
    sessionState.setStateJson("""
        {
          "characters": [
            {
              "id": "attacker-char",
              "type": "Player",
              "build": { "specieId": "specie-lizardfolk" },
              "attributes": { "base": { "strength": 14 } },
              "progression": { "currentLevel": 1 },
              "hitPoints": { "current": 10, "max": 10, "temporary": 0 }
            }
          ],
          "tokens": [
            {
              "id": "token-attacker",
              "characterId": "attacker-char",
              "sceneId": "default-scene",
              "position": { "x": 1, "y": 1 }
            }
          ],
          "messages": [],
          "combat": {
            "active": true,
            "round": 1,
            "turnIndex": 0,
            "participants": [
              { "tokenId": "token-attacker" },
              { "tokenId": "token-target" }
            ],
            "turnResources": {
              "actionAvailable": true,
              "bonusActionAvailable": true,
              "remainingMovementCells": 6,
              "totalMovementCells": 6
            }
          }
        }
        """);

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
        () -> service.resolveAttack(
            ownerUserId,
            gameId,
            "token-attacker",
            "token-target",
            "builtin-unarmed-strike",
            "Ataque desarmado",
            99,
            "999",
            "bludgeoning"
        )
    );

    assertEquals(400, exception.getStatusCode().value());
    assertEquals("Tipo de dano divergente do ataque autoritativo.", exception.getReason());
  }

  @Test
  void resolveAttack_usesCanonicalMonsterActionDataFromActionId() {
    Long ownerUserId = 7L;
    Long gameId = 45L;

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    GameSessionStateEntity sessionState = new GameSessionStateEntity();
    sessionState.setId(703L);
    sessionState.setGame(game);
    sessionState.setVersion(3L);
    sessionState.setStateJson("""
        {
          "characters": [
            {
              "id": "attacker-char",
              "type": "NPC",
              "monsterId": "monster-giant-goat",
              "hitPoints": { "current": 19, "temporary": 0 },
              "activeEffects": { "effects": [] }
            },
            {
              "id": "target-char",
              "type": "Player",
              "attributes": { "base": { "strength": 10, "dexterity": 10 } },
              "progression": { "currentLevel": 1 },
              "equipment": {
                "bodyArmorItemId": null,
                "shieldItemId": null,
                "mainHandWeaponId": null,
                "offHandWeaponId": null
              },
              "hitPoints": { "current": 10, "max": 10, "temporary": 0 }
            }
          ],
          "tokens": [
            {
              "id": "token-attacker",
              "characterId": "attacker-char",
              "sceneId": "default-scene",
              "position": { "x": 1, "y": 1 }
            },
            {
              "id": "token-target",
              "characterId": "target-char",
              "sceneId": "default-scene",
              "position": { "x": 2, "y": 1 }
            }
          ],
          "messages": [],
          "combat": {
            "active": true,
            "round": 1,
            "turnIndex": 0,
            "participants": [
              { "tokenId": "token-attacker" },
              { "tokenId": "token-target" }
            ],
            "turnResources": {
              "actionAvailable": true,
              "bonusActionAvailable": true,
              "remainingMovementCells": 6,
              "totalMovementCells": 6
            }
          }
        }
        """);

    MonsterCatalogManifestService.MonsterCatalogEntry monsterEntry =
        new MonsterCatalogManifestService.MonsterCatalogEntry(
            "monster-giant-goat",
            "Cabra Gigante",
            List.of("Cabra Gigante", "Giant Goat"),
            "token.png",
            "splash.png",
            "large",
            "beast",
            "unaligned",
            new MonsterCatalogManifestService.MonsterCatalogAbilityScores(17, 13, 12, 3, 12, 6),
            11,
            19,
            new MonsterCatalogManifestService.MonsterCatalogSpeed(40, null, 30, null, null, "ft"),
            new MonsterCatalogManifestService.MonsterCatalogDefenses(List.of(), List.of(), List.of()),
            "1/2",
            List.of(
                new MonsterCatalogManifestService.MonsterCatalogAttackAction(
                    "act-attack",
                    "Investida",
                    5,
                    "1d6+3",
                    "bludgeoning",
                    1.5
                )
            )
        );

    when(gameAccessService.requireGameWithAccess(gameId, ownerUserId)).thenReturn(game);
    when(gameSessionStateRepository.findByGameId(gameId)).thenReturn(Optional.of(sessionState));
    when(gameSessionStateRepository.save(any(GameSessionStateEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));
    when(monsterCatalogManifestService.requireKnownMonster("monster-giant-goat")).thenReturn(monsterEntry);
    when(monsterCatalogManifestService.requireKnownMonsterAttackAction("monster-giant-goat", "act-attack"))
        .thenReturn(monsterEntry.actions().get(0));

    GameSessionCommandService service = new GameSessionCommandService(
        gameAccessService,
        gameMemberRepository,
        gameSessionStateRepository,
        objectMapper,
        messagingTemplate,
        itemCatalogManifestService,
        monsterCatalogManifestService
    );

    GameSessionEventResponse event = service.resolveAttack(
        ownerUserId,
        gameId,
        "token-attacker",
        "token-target",
        "act-attack",
        "IGNORAR NOME",
        99,
        "999",
        "bludgeoning"
    );

    assertEquals("ATTACK_RESOLVED", event.type());
    assertEquals("Investida", event.payload().path("attackName").asText());
    assertEquals("bludgeoning", event.payload().path("attackDamageType").asText());
  }

  @Test
  void resolveAttack_appliesConditionalDamageAndConditionWhenMovementRequirementIsMet() throws Exception {
    Long ownerUserId = 7L;
    Long gameId = 46L;

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);

    MonsterCatalogManifestService.MonsterCatalogEntry monsterEntry =
        new MonsterCatalogManifestService.MonsterCatalogEntry(
            "monster-giant-goat",
            "Cabra Gigante",
            List.of("Cabra Gigante", "Giant Goat"),
            "token.png",
            "splash.png",
            "large",
            "beast",
            "unaligned",
            new MonsterCatalogManifestService.MonsterCatalogAbilityScores(17, 13, 12, 3, 12, 6),
            11,
            19,
            new MonsterCatalogManifestService.MonsterCatalogSpeed(40, null, 30, null, null, "ft"),
            new MonsterCatalogManifestService.MonsterCatalogDefenses(List.of(), List.of(), List.of()),
            "1/2",
            List.of(
                new MonsterCatalogManifestService.MonsterCatalogAttackAction(
                    "act-attack",
                    "Investida",
                    5,
                    "1",
                    "bludgeoning",
                    1.5,
                    List.of(
                        new MonsterCatalogManifestService.MonsterCatalogConditionalDamage(
                            "2",
                            "bludgeoning",
                            6.0
                        )
                    ),
                    List.of(
                        new MonsterCatalogManifestService.MonsterCatalogConditionalCondition(
                            "prone",
                            6.0
                        )
                    )
                )
            )
        );

    when(gameAccessService.requireGameWithAccess(gameId, ownerUserId)).thenReturn(game);
    when(gameSessionStateRepository.save(any(GameSessionStateEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));
    when(monsterCatalogManifestService.requireKnownMonster("monster-giant-goat")).thenReturn(monsterEntry);
    when(monsterCatalogManifestService.requireKnownMonsterAttackAction("monster-giant-goat", "act-attack"))
        .thenReturn(monsterEntry.actions().get(0));

    GameSessionEventResponse successfulHitEvent = null;
    GameSessionStateEntity successfulState = null;

    for (int attempt = 0; attempt < 10; attempt += 1) {
      GameSessionStateEntity sessionState = new GameSessionStateEntity();
      sessionState.setId(800L + attempt);
      sessionState.setGame(game);
      sessionState.setVersion(3L);
      sessionState.setStateJson("""
          {
            "characters": [
              {
                "id": "attacker-char",
                "type": "NPC",
                "monsterId": "monster-giant-goat",
                "hitPoints": { "current": 19, "temporary": 0 },
                "activeEffects": { "effects": [] }
              },
              {
                "id": "target-char",
                "type": "Player",
                "attributes": { "base": { "strength": 10, "dexterity": 10 } },
                "progression": { "currentLevel": 1 },
                "equipment": {
                  "bodyArmorItemId": null,
                  "shieldItemId": null,
                  "mainHandWeaponId": null,
                  "offHandWeaponId": null
                },
                "hitPoints": { "current": 10, "max": 10, "temporary": 0 },
                "activeEffects": { "effects": [] }
              }
            ],
            "tokens": [
              {
                "id": "token-attacker",
                "characterId": "attacker-char",
                "sceneId": "default-scene",
                "position": { "x": 1, "y": 1 }
              },
              {
                "id": "token-target",
                "characterId": "target-char",
                "sceneId": "default-scene",
                "position": { "x": 2, "y": 1 }
              }
            ],
            "messages": [],
            "combat": {
              "active": true,
              "round": 1,
              "turnIndex": 0,
              "participants": [
                { "tokenId": "token-attacker" },
                { "tokenId": "token-target" }
              ],
              "turnResources": {
                "actionAvailable": true,
                "bonusActionAvailable": true,
                "remainingMovementCells": 2,
                "totalMovementCells": 6
              }
            }
          }
          """);

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

      GameSessionEventResponse event = service.resolveAttack(
          ownerUserId,
          gameId,
          "token-attacker",
          "token-target",
          "act-attack",
          "IGNORAR NOME",
          99,
          "999",
          "bludgeoning"
      );

      if (event.payload().path("hit").asBoolean(false)) {
        successfulHitEvent = event;
        successfulState = sessionState;
        break;
      }
    }

    assertTrue(successfulHitEvent != null, "Não foi possível obter um ataque com acerto após várias tentativas.");
    assertEquals(3, successfulHitEvent.payload().path("damageTotal").asInt());
    assertEquals(3, successfulHitEvent.payload().path("damageAfterDefenses").asInt());
    assertEquals(2, successfulHitEvent.payload().path("conditionalDamageTotal").asInt());
    assertEquals(1, successfulHitEvent.payload().path("conditionalDamageBreakdown").size());
    assertEquals(
      "bludgeoning",
      successfulHitEvent.payload().path("conditionalDamageBreakdown").get(0).path("damageType").asText()
    );
    assertEquals(2, successfulHitEvent.payload().path("conditionalDamageBreakdown").get(0).path("damage").asInt());
    assertEquals(6.0, successfulHitEvent.payload().path("attackerMovedMeters").asDouble(), 0.001);
    assertEquals("prone", successfulHitEvent.payload().path("appliedConditions").get(0).asText());

    JsonNode persistedState = objectMapper.readTree(successfulState.getStateJson());
    JsonNode targetCharacterEffects = persistedState.path("characters").get(1).path("activeEffects").path("effects");
    assertEquals(1, targetCharacterEffects.size());
    assertEquals("prone", targetCharacterEffects.get(0).path("linkedCondition").asText());
  }

  @Test
  void resolveAttack_appliesMonsterDamageResistanceFromCanonicalDefenses() {
    Long ownerUserId = 7L;
    Long gameId = 47L;

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    when(gameAccessService.requireGameWithAccess(gameId, ownerUserId)).thenReturn(game);
    when(gameSessionStateRepository.save(any(GameSessionStateEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

    MonsterCatalogManifestService.MonsterCatalogEntry targetMonsterEntry =
        new MonsterCatalogManifestService.MonsterCatalogEntry(
            "monster-awakened-shrub",
            "Arbusto Desperto",
            List.of("Arbusto Desperto", "Awakened Shrub"),
            "token.png",
            "splash.png",
            "small",
            "plant",
            "trueNeutral",
            new MonsterCatalogManifestService.MonsterCatalogAbilityScores(3, 8, 11, 10, 10, 6),
            9,
            10,
            new MonsterCatalogManifestService.MonsterCatalogSpeed(20, null, null, null, null, "ft"),
            new MonsterCatalogManifestService.MonsterCatalogDefenses(
                List.of("piercing"),
                List.of("fire"),
                List.of()
            ),
            "0",
            List.of()
        );

    when(monsterCatalogManifestService.requireKnownMonster("monster-awakened-shrub")).thenReturn(targetMonsterEntry);

    GameSessionEventResponse successfulHitEvent = null;
    for (int attempt = 0; attempt < 20; attempt += 1) {
      GameSessionStateEntity sessionState = new GameSessionStateEntity();
      sessionState.setId(900L + attempt);
      sessionState.setGame(game);
      sessionState.setVersion(3L);
      sessionState.setStateJson("""
          {
            "characters": [
              {
                "id": "attacker-char",
                "type": "Player",
                "attributes": { "base": { "strength": 10, "dexterity": 10 } },
                "progression": { "currentLevel": 1 },
                "equipment": {
                  "bodyArmorItemId": null,
                  "shieldItemId": null,
                  "mainHandWeaponId": null,
                  "offHandWeaponId": null
                },
                "hitPoints": { "current": 10, "max": 10, "temporary": 0 }
              },
              {
                "id": "target-char",
                "type": "NPC",
                "monsterId": "monster-awakened-shrub",
                "hitPoints": { "current": 10, "temporary": 0 },
                "activeEffects": { "effects": [] }
              }
            ],
            "tokens": [
              {
                "id": "token-attacker",
                "characterId": "attacker-char",
                "sceneId": "default-scene",
                "position": { "x": 1, "y": 1 }
              },
              {
                "id": "token-target",
                "characterId": "target-char",
                "sceneId": "default-scene",
                "position": { "x": 2, "y": 1 }
              }
            ],
            "messages": [],
            "combat": {
              "active": true,
              "round": 1,
              "turnIndex": 0,
              "participants": [
                { "tokenId": "token-attacker" },
                { "tokenId": "token-target" }
              ],
              "turnResources": {
                "actionAvailable": true,
                "bonusActionAvailable": true,
                "remainingMovementCells": 6,
                "totalMovementCells": 6
              }
            }
          }
          """);

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

      GameSessionEventResponse event = service.resolveAttack(
          ownerUserId,
          gameId,
          "token-attacker",
          "token-target",
          "manual-attack",
          "Ataque de Teste",
          99,
          "8",
          "piercing"
      );

      if (event.payload().path("hit").asBoolean(false)) {
        successfulHitEvent = event;
        break;
      }
    }

    assertTrue(successfulHitEvent != null, "Não foi possível obter um ataque com acerto após várias tentativas.");
    assertEquals(8, successfulHitEvent.payload().path("damageTotal").asInt());
    assertEquals(4, successfulHitEvent.payload().path("damageAfterDefenses").asInt());
    assertEquals(4, successfulHitEvent.payload().path("damageApplied").asInt());
    assertEquals(6, successfulHitEvent.payload().path("remainingCurrentHp").asInt());
  }

  @Test
  void resolveAttack_appliesMonsterDamageVulnerabilityFromCanonicalDefenses() {
    Long ownerUserId = 7L;
    Long gameId = 48L;

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    when(gameAccessService.requireGameWithAccess(gameId, ownerUserId)).thenReturn(game);
    when(gameSessionStateRepository.save(any(GameSessionStateEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

    MonsterCatalogManifestService.MonsterCatalogEntry targetMonsterEntry =
        new MonsterCatalogManifestService.MonsterCatalogEntry(
            "monster-awakened-shrub",
            "Arbusto Desperto",
            List.of("Arbusto Desperto", "Awakened Shrub"),
            "token.png",
            "splash.png",
            "small",
            "plant",
            "trueNeutral",
            new MonsterCatalogManifestService.MonsterCatalogAbilityScores(3, 8, 11, 10, 10, 6),
            9,
            10,
            new MonsterCatalogManifestService.MonsterCatalogSpeed(20, null, null, null, null, "ft"),
            new MonsterCatalogManifestService.MonsterCatalogDefenses(
                List.of("piercing"),
                List.of("fire"),
                List.of()
            ),
            "0",
            List.of()
        );

    when(monsterCatalogManifestService.requireKnownMonster("monster-awakened-shrub")).thenReturn(targetMonsterEntry);

    GameSessionEventResponse successfulHitEvent = null;
    for (int attempt = 0; attempt < 20; attempt += 1) {
      GameSessionStateEntity sessionState = new GameSessionStateEntity();
      sessionState.setId(950L + attempt);
      sessionState.setGame(game);
      sessionState.setVersion(3L);
      sessionState.setStateJson("""
          {
            "characters": [
              {
                "id": "attacker-char",
                "type": "Player",
                "attributes": { "base": { "strength": 10, "dexterity": 10 } },
                "progression": { "currentLevel": 1 },
                "equipment": {
                  "bodyArmorItemId": null,
                  "shieldItemId": null,
                  "mainHandWeaponId": null,
                  "offHandWeaponId": null
                },
                "hitPoints": { "current": 10, "max": 10, "temporary": 0 }
              },
              {
                "id": "target-char",
                "type": "NPC",
                "monsterId": "monster-awakened-shrub",
                "hitPoints": { "current": 10, "temporary": 0 },
                "activeEffects": { "effects": [] }
              }
            ],
            "tokens": [
              {
                "id": "token-attacker",
                "characterId": "attacker-char",
                "sceneId": "default-scene",
                "position": { "x": 1, "y": 1 }
              },
              {
                "id": "token-target",
                "characterId": "target-char",
                "sceneId": "default-scene",
                "position": { "x": 2, "y": 1 }
              }
            ],
            "messages": [],
            "combat": {
              "active": true,
              "round": 1,
              "turnIndex": 0,
              "participants": [
                { "tokenId": "token-attacker" },
                { "tokenId": "token-target" }
              ],
              "turnResources": {
                "actionAvailable": true,
                "bonusActionAvailable": true,
                "remainingMovementCells": 6,
                "totalMovementCells": 6
              }
            }
          }
          """);

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

      GameSessionEventResponse event = service.resolveAttack(
          ownerUserId,
          gameId,
          "token-attacker",
          "token-target",
          "manual-attack",
          "Ataque de Teste",
          99,
          "8",
          "fire"
      );

      if (event.payload().path("hit").asBoolean(false)) {
        successfulHitEvent = event;
        break;
      }
    }

    assertTrue(successfulHitEvent != null, "Não foi possível obter um ataque com acerto após várias tentativas.");
    assertEquals(8, successfulHitEvent.payload().path("damageTotal").asInt());
    assertEquals(16, successfulHitEvent.payload().path("damageAfterDefenses").asInt());
    assertEquals(10, successfulHitEvent.payload().path("damageApplied").asInt());
    assertEquals(0, successfulHitEvent.payload().path("remainingCurrentHp").asInt());
  }

  @Test
  void resolveAttack_appliesMonsterDamageImmunityFromCanonicalDefenses() {
    Long ownerUserId = 7L;
    Long gameId = 49L;

    GameAccessService gameAccessService = mock(GameAccessService.class);
    GameMemberRepository gameMemberRepository = mock(GameMemberRepository.class);
    GameSessionStateRepository gameSessionStateRepository = mock(GameSessionStateRepository.class);
    SimpMessagingTemplate messagingTemplate = mock(SimpMessagingTemplate.class);
    ItemCatalogManifestService itemCatalogManifestService = mock(ItemCatalogManifestService.class);
    MonsterCatalogManifestService monsterCatalogManifestService = mock(MonsterCatalogManifestService.class);

    GameEntity game = buildGame(ownerUserId, gameId);
    when(gameAccessService.requireGameWithAccess(gameId, ownerUserId)).thenReturn(game);
    when(gameSessionStateRepository.save(any(GameSessionStateEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

    MonsterCatalogManifestService.MonsterCatalogEntry targetMonsterEntry =
        new MonsterCatalogManifestService.MonsterCatalogEntry(
            "monster-awakened-shrub",
            "Arbusto Desperto",
            List.of("Arbusto Desperto", "Awakened Shrub"),
            "token.png",
            "splash.png",
            "small",
            "plant",
            "trueNeutral",
            new MonsterCatalogManifestService.MonsterCatalogAbilityScores(3, 8, 11, 10, 10, 6),
            9,
            10,
            new MonsterCatalogManifestService.MonsterCatalogSpeed(20, null, null, null, null, "ft"),
            new MonsterCatalogManifestService.MonsterCatalogDefenses(
                List.of(),
                List.of(),
                List.of("poison")
            ),
            "0",
            List.of()
        );

    when(monsterCatalogManifestService.requireKnownMonster("monster-awakened-shrub")).thenReturn(targetMonsterEntry);

    GameSessionEventResponse successfulHitEvent = null;
    for (int attempt = 0; attempt < 20; attempt += 1) {
      GameSessionStateEntity sessionState = new GameSessionStateEntity();
      sessionState.setId(980L + attempt);
      sessionState.setGame(game);
      sessionState.setVersion(3L);
      sessionState.setStateJson("""
          {
            "characters": [
              {
                "id": "attacker-char",
                "type": "Player",
                "attributes": { "base": { "strength": 10, "dexterity": 10 } },
                "progression": { "currentLevel": 1 },
                "equipment": {
                  "bodyArmorItemId": null,
                  "shieldItemId": null,
                  "mainHandWeaponId": null,
                  "offHandWeaponId": null
                },
                "hitPoints": { "current": 10, "max": 10, "temporary": 0 }
              },
              {
                "id": "target-char",
                "type": "NPC",
                "monsterId": "monster-awakened-shrub",
                "hitPoints": { "current": 10, "temporary": 0 },
                "activeEffects": { "effects": [] }
              }
            ],
            "tokens": [
              {
                "id": "token-attacker",
                "characterId": "attacker-char",
                "sceneId": "default-scene",
                "position": { "x": 1, "y": 1 }
              },
              {
                "id": "token-target",
                "characterId": "target-char",
                "sceneId": "default-scene",
                "position": { "x": 2, "y": 1 }
              }
            ],
            "messages": [],
            "combat": {
              "active": true,
              "round": 1,
              "turnIndex": 0,
              "participants": [
                { "tokenId": "token-attacker" },
                { "tokenId": "token-target" }
              ],
              "turnResources": {
                "actionAvailable": true,
                "bonusActionAvailable": true,
                "remainingMovementCells": 6,
                "totalMovementCells": 6
              }
            }
          }
          """);

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

      GameSessionEventResponse event = service.resolveAttack(
          ownerUserId,
          gameId,
          "token-attacker",
          "token-target",
          "manual-attack",
          "Ataque de Teste",
          99,
          "8",
          "poison"
      );

      if (event.payload().path("hit").asBoolean(false)) {
        successfulHitEvent = event;
        break;
      }
    }

    assertTrue(successfulHitEvent != null, "Não foi possível obter um ataque com acerto após várias tentativas.");
    assertEquals(8, successfulHitEvent.payload().path("damageTotal").asInt());
    assertEquals(0, successfulHitEvent.payload().path("damageAfterDefenses").asInt());
    assertEquals(0, successfulHitEvent.payload().path("damageApplied").asInt());
    assertEquals(10, successfulHitEvent.payload().path("remainingCurrentHp").asInt());
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
