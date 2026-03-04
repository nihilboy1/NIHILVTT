package com.nihilvtt.auth.game.controller;

import com.nihilvtt.auth.game.dto.AddCharacterInventoryItemRequest;
import com.nihilvtt.auth.game.dto.CreateChatMessageRequest;
import com.nihilvtt.auth.game.dto.CreateCharacterRequest;
import com.nihilvtt.auth.game.dto.CreateDiceRollRequest;
import com.nihilvtt.auth.game.dto.CreateGameRequest;
import com.nihilvtt.auth.game.dto.DuplicateCharacterRequest;
import com.nihilvtt.auth.game.dto.DuplicateCharacterTokenRequest;
import com.nihilvtt.auth.game.dto.GameJoinRequestResponse;
import com.nihilvtt.auth.game.dto.GameResponse;
import com.nihilvtt.auth.game.dto.GameSessionEventResponse;
import com.nihilvtt.auth.game.dto.GameSessionSnapshotResponse;
import com.nihilvtt.auth.game.dto.MoveTokenRequest;
import com.nihilvtt.auth.game.dto.CreateTokenRequest;
import com.nihilvtt.auth.game.dto.RemoveCharacterRequest;
import com.nihilvtt.auth.game.dto.RemoveTokenRequest;
import com.nihilvtt.auth.game.dto.RemoveTokensRequest;
import com.nihilvtt.auth.game.dto.ResolveAttackRequest;
import com.nihilvtt.auth.game.dto.SpawnMonsterRequest;
import com.nihilvtt.auth.game.dto.StartCombatRequest;
import com.nihilvtt.auth.game.dto.SubmitJoinRequestRequest;
import com.nihilvtt.auth.game.dto.UpdateCharacterEquipmentRequest;
import com.nihilvtt.auth.game.dto.UpdateCharacterControllerRequest;
import com.nihilvtt.auth.game.dto.UpdateCharacterHpRequest;
import com.nihilvtt.auth.game.dto.UpdateCharacterTempHpRequest;
import com.nihilvtt.auth.game.dto.UpdateGameNicknameRequest;
import com.nihilvtt.auth.game.service.GameService;
import com.nihilvtt.auth.game.service.GameSessionCommandService;
import com.nihilvtt.auth.game.service.GameSessionStateService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/games")
public class GameController {
  private final GameService gameService;
  private final GameSessionStateService gameSessionStateService;
  private final GameSessionCommandService gameSessionCommandService;

  public GameController(
      GameService gameService,
      GameSessionStateService gameSessionStateService,
      GameSessionCommandService gameSessionCommandService
  ) {
    this.gameService = gameService;
    this.gameSessionStateService = gameSessionStateService;
    this.gameSessionCommandService = gameSessionCommandService;
  }

  @GetMapping("/active")
  public ResponseEntity<List<GameResponse>> listActiveGames(Authentication authentication) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.ok(gameService.listActiveGames(userId));
  }

  @PostMapping
  public ResponseEntity<GameResponse> createGame(
      Authentication authentication,
      @Valid @RequestBody CreateGameRequest request,
      HttpServletRequest httpRequest
  ) {
    Long ownerId = (Long) authentication.getPrincipal();
    GameResponse created = gameService.createGame(ownerId, request, extractClientIp(httpRequest));
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }

  @GetMapping("/{gameId}")
  public ResponseEntity<GameResponse> getGameById(
      Authentication authentication,
      @PathVariable Long gameId
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.ok(gameService.getGameById(userId, gameId));
  }

  @PostMapping(path = "/{gameId}/cover", consumes = "multipart/form-data")
  public ResponseEntity<GameResponse> updateGameCover(
      Authentication authentication,
      @PathVariable Long gameId,
      @RequestParam("file") MultipartFile file,
      HttpServletRequest httpRequest
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.ok(gameService.updateGameCover(userId, gameId, file, extractClientIp(httpRequest)));
  }

  @DeleteMapping("/{gameId}")
  public ResponseEntity<Void> deleteGame(
      Authentication authentication,
      @PathVariable Long gameId,
      HttpServletRequest httpRequest
  ) {
    Long userId = (Long) authentication.getPrincipal();
    gameService.deleteGame(userId, gameId, extractClientIp(httpRequest));
    return ResponseEntity.noContent().build();
  }

  @PostMapping("/join-requests")
  public ResponseEntity<GameJoinRequestResponse> submitJoinRequest(
      Authentication authentication,
      @Valid @RequestBody SubmitJoinRequestRequest request,
      HttpServletRequest httpRequest
  ) {
    Long userId = (Long) authentication.getPrincipal();
    GameJoinRequestResponse created = gameService.submitJoinRequestByCode(
        userId,
        request.joinCode(),
        extractClientIp(httpRequest)
    );
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }

  @GetMapping("/join-requests/me")
  public ResponseEntity<List<GameJoinRequestResponse>> listMyJoinRequests(Authentication authentication) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.ok(gameService.listMyJoinRequests(userId));
  }

  @GetMapping("/join-requests/pending-owned")
  public ResponseEntity<List<GameJoinRequestResponse>> listPendingOwnedJoinRequests(Authentication authentication) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.ok(gameService.listPendingJoinRequestsForOwner(userId));
  }

  @PostMapping("/{gameId}/join")
  public ResponseEntity<GameResponse> joinApproved(
      Authentication authentication,
      @PathVariable Long gameId,
      HttpServletRequest httpRequest
  ) {
    Long userId = (Long) authentication.getPrincipal();
    GameResponse joined = gameService.joinGameById(userId, gameId, extractClientIp(httpRequest));
    return ResponseEntity.ok(joined);
  }

  @GetMapping("/{gameId}/session-state")
  public ResponseEntity<GameSessionSnapshotResponse> getSessionState(
      Authentication authentication,
      @PathVariable Long gameId
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.ok(gameSessionStateService.getSnapshot(userId, gameId));
  }

  @PostMapping("/{gameId}/session/chat-messages")
  public ResponseEntity<GameSessionEventResponse> sendChatMessage(
      Authentication authentication,
      @PathVariable Long gameId,
      @Valid @RequestBody CreateChatMessageRequest request
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(gameSessionCommandService.appendChatMessage(userId, gameId, request.text()));
  }

  @PostMapping("/{gameId}/session/dice-rolls")
  public ResponseEntity<GameSessionEventResponse> sendDiceRoll(
      Authentication authentication,
      @PathVariable Long gameId,
      @Valid @RequestBody CreateDiceRollRequest request
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(gameSessionCommandService.appendDiceRoll(
            userId,
            gameId,
            request.formula(),
            request.rollName(),
            request.category()
        ));
  }

  @PostMapping("/{gameId}/session/chat/clear")
  public ResponseEntity<GameSessionEventResponse> clearChatHistory(
      Authentication authentication,
      @PathVariable Long gameId
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(gameSessionCommandService.clearChatHistory(userId, gameId));
  }

  @PostMapping("/{gameId}/session/tokens/move")
  public ResponseEntity<GameSessionEventResponse> moveToken(
      Authentication authentication,
      @PathVariable Long gameId,
      @Valid @RequestBody MoveTokenRequest request
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(gameSessionCommandService.moveToken(
            userId,
            gameId,
            request.tokenId(),
            request.x(),
            request.y()
        ));
  }

  @PostMapping("/{gameId}/session/tokens")
  public ResponseEntity<GameSessionEventResponse> createToken(
      Authentication authentication,
      @PathVariable Long gameId,
      @Valid @RequestBody CreateTokenRequest request
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(gameSessionCommandService.createToken(
            userId,
            gameId,
            request.characterId(),
            request.sceneId(),
            request.x(),
            request.y()
        ));
  }

  @PostMapping("/{gameId}/session/tokens/remove")
  public ResponseEntity<GameSessionEventResponse> removeToken(
      Authentication authentication,
      @PathVariable Long gameId,
      @Valid @RequestBody RemoveTokenRequest request
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(gameSessionCommandService.removeToken(userId, gameId, request.tokenId()));
  }

  @PostMapping("/{gameId}/session/tokens/remove-batch")
  public ResponseEntity<GameSessionEventResponse> removeTokens(
      Authentication authentication,
      @PathVariable Long gameId,
      @Valid @RequestBody RemoveTokensRequest request
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(gameSessionCommandService.removeTokens(userId, gameId, request.tokenIds()));
  }

  @PostMapping("/{gameId}/session/combat/attacks")
  public ResponseEntity<GameSessionEventResponse> resolveAttack(
      Authentication authentication,
      @PathVariable Long gameId,
      @Valid @RequestBody ResolveAttackRequest request
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(gameSessionCommandService.resolveAttack(
            userId,
            gameId,
            request.attackerTokenId(),
            request.targetTokenId(),
            request.attackId(),
            request.attackName(),
            request.attackBonus(),
            request.damageFormula()
        ));
  }

  @PostMapping("/{gameId}/session/combat/start")
  public ResponseEntity<GameSessionEventResponse> startCombat(
      Authentication authentication,
      @PathVariable Long gameId,
      @Valid @RequestBody StartCombatRequest request
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(gameSessionCommandService.startCombat(userId, gameId, request.tokenIds()));
  }

  @PostMapping("/{gameId}/session/combat/next-turn")
  public ResponseEntity<GameSessionEventResponse> advanceCombatTurn(
      Authentication authentication,
      @PathVariable Long gameId
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(gameSessionCommandService.advanceCombatTurn(userId, gameId));
  }

  @PostMapping("/{gameId}/session/combat/end")
  public ResponseEntity<GameSessionEventResponse> endCombat(
      Authentication authentication,
      @PathVariable Long gameId
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(gameSessionCommandService.endCombat(userId, gameId));
  }

  @PostMapping("/{gameId}/session/characters/hp")
  public ResponseEntity<GameSessionEventResponse> updateCharacterHp(
      Authentication authentication,
      @PathVariable Long gameId,
      @Valid @RequestBody UpdateCharacterHpRequest request
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(gameSessionCommandService.updateCharacterHp(
            userId,
            gameId,
            request.characterId(),
            request.mode(),
            request.amount()
        ));
  }

  @PostMapping("/{gameId}/session/characters/temp-hp")
  public ResponseEntity<GameSessionEventResponse> updateCharacterTempHp(
      Authentication authentication,
      @PathVariable Long gameId,
      @Valid @RequestBody UpdateCharacterTempHpRequest request
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(gameSessionCommandService.updateCharacterTempHp(
            userId,
            gameId,
            request.characterId(),
            request.amount()
        ));
  }

  @PostMapping("/{gameId}/session/characters/equipment")
  public ResponseEntity<GameSessionEventResponse> updateCharacterEquipment(
      Authentication authentication,
      @PathVariable Long gameId,
      @Valid @RequestBody UpdateCharacterEquipmentRequest request
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(gameSessionCommandService.updateCharacterEquipment(
            userId,
            gameId,
            request.characterId(),
            request.slot(),
            request.itemId()
        ));
  }

  @PostMapping("/{gameId}/session/characters/controller")
  public ResponseEntity<GameSessionEventResponse> updateCharacterController(
      Authentication authentication,
      @PathVariable Long gameId,
      @Valid @RequestBody UpdateCharacterControllerRequest request
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(gameSessionCommandService.updateCharacterController(
            userId,
            gameId,
            request.characterId(),
            request.controlledByUserId()
        ));
  }

  @PostMapping("/{gameId}/session/characters/inventory/add")
  public ResponseEntity<GameSessionEventResponse> addItemToCharacterInventory(
      Authentication authentication,
      @PathVariable Long gameId,
      @Valid @RequestBody AddCharacterInventoryItemRequest request
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(gameSessionCommandService.addItemToCharacterInventory(
            userId,
            gameId,
            request.characterId(),
            request.itemId(),
            request.quantity()
        ));
  }

  @PostMapping("/{gameId}/session/characters")
  public ResponseEntity<GameSessionEventResponse> createCharacter(
      Authentication authentication,
      @PathVariable Long gameId,
      @Valid @RequestBody CreateCharacterRequest request
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(gameSessionCommandService.createCharacter(userId, gameId, request.character()));
  }

  @PostMapping("/{gameId}/session/monsters")
  public ResponseEntity<GameSessionEventResponse> spawnMonster(
      Authentication authentication,
      @PathVariable Long gameId,
      @Valid @RequestBody SpawnMonsterRequest request
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(gameSessionCommandService.spawnMonsterCharacter(
            userId,
            gameId,
            request.monsterId(),
            request.nameOverride(),
            request.sceneId(),
            request.x(),
            request.y()
        ));
  }

  @PostMapping("/{gameId}/session/characters/duplicate")
  public ResponseEntity<GameSessionEventResponse> duplicateCharacter(
      Authentication authentication,
      @PathVariable Long gameId,
      @Valid @RequestBody DuplicateCharacterRequest request
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(gameSessionCommandService.duplicateCharacter(userId, gameId, request.characterId()));
  }

  @PostMapping("/{gameId}/session/characters/duplicate-with-token")
  public ResponseEntity<GameSessionEventResponse> duplicateCharacterWithToken(
      Authentication authentication,
      @PathVariable Long gameId,
      @Valid @RequestBody DuplicateCharacterTokenRequest request
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(gameSessionCommandService.duplicateCharacterWithToken(
            userId,
            gameId,
            request.characterId(),
            request.sceneId(),
            request.x(),
            request.y()
        ));
  }

  @PostMapping("/{gameId}/session/characters/remove")
  public ResponseEntity<GameSessionEventResponse> removeCharacter(
      Authentication authentication,
      @PathVariable Long gameId,
      @Valid @RequestBody RemoveCharacterRequest request
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(gameSessionCommandService.removeCharacter(userId, gameId, request.characterId()));
  }

  @PostMapping("/{gameId}/join-requests/{requestId}/approve")
  public ResponseEntity<GameJoinRequestResponse> approveJoinRequest(
      Authentication authentication,
      @PathVariable Long gameId,
      @PathVariable Long requestId,
      HttpServletRequest httpRequest
  ) {
    Long ownerId = (Long) authentication.getPrincipal();
    return ResponseEntity.ok(gameService.reviewJoinRequest(ownerId, gameId, requestId, true, extractClientIp(httpRequest)));
  }

  @PostMapping("/{gameId}/join-requests/{requestId}/reject")
  public ResponseEntity<GameJoinRequestResponse> rejectJoinRequest(
      Authentication authentication,
      @PathVariable Long gameId,
      @PathVariable Long requestId,
      HttpServletRequest httpRequest
  ) {
    Long ownerId = (Long) authentication.getPrincipal();
    return ResponseEntity.ok(gameService.reviewJoinRequest(ownerId, gameId, requestId, false, extractClientIp(httpRequest)));
  }

  @PostMapping("/{gameId}/leave")
  public ResponseEntity<GameResponse> leaveById(
      Authentication authentication,
      @PathVariable Long gameId,
      HttpServletRequest httpRequest
  ) {
    Long userId = (Long) authentication.getPrincipal();
    GameResponse left = gameService.leaveGameById(userId, gameId, extractClientIp(httpRequest));
    return ResponseEntity.ok(left);
  }

  @PostMapping("/{gameId}/members/{memberUserId}/revoke")
  public ResponseEntity<GameResponse> revokeMemberAccess(
      Authentication authentication,
      @PathVariable Long gameId,
      @PathVariable Long memberUserId,
      HttpServletRequest httpRequest
  ) {
    Long ownerId = (Long) authentication.getPrincipal();
    GameResponse updated = gameService.revokeMemberAccess(ownerId, gameId, memberUserId, extractClientIp(httpRequest));
    return ResponseEntity.ok(updated);
  }

  @PatchMapping("/{gameId}/nickname")
  public ResponseEntity<GameResponse> updateNickname(
      Authentication authentication,
      @PathVariable Long gameId,
      @Valid @RequestBody UpdateGameNicknameRequest request,
      HttpServletRequest httpRequest
  ) {
    Long userId = (Long) authentication.getPrincipal();
    GameResponse updated = gameService.updateNickname(userId, gameId, request.nickname(), extractClientIp(httpRequest));
    return ResponseEntity.ok(updated);
  }

  private String extractClientIp(HttpServletRequest request) {
    String forwardedFor = request.getHeader("X-Forwarded-For");
    if (forwardedFor != null && !forwardedFor.isBlank()) {
      return forwardedFor.split(",")[0].trim();
    }
    return request.getRemoteAddr();
  }
}
