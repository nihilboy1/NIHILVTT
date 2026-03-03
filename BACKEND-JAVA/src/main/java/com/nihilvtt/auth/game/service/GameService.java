package com.nihilvtt.auth.game.service;

import com.nihilvtt.auth.game.dto.CreateGameRequest;
import com.nihilvtt.auth.game.dto.GameJoinRequestResponse;
import com.nihilvtt.auth.game.dto.GameOwnerResponse;
import com.nihilvtt.auth.game.dto.GamePlayerResponse;
import com.nihilvtt.auth.game.dto.GameResponse;
import com.nihilvtt.auth.game.entity.GameEntity;
import com.nihilvtt.auth.game.entity.GameJoinRequestEntity;
import com.nihilvtt.auth.game.entity.GameJoinRequestStatus;
import com.nihilvtt.auth.game.entity.GameMemberEntity;
import com.nihilvtt.auth.game.entity.GameRevocationEntity;
import com.nihilvtt.auth.game.entity.GameRevokedEmailEntity;
import com.nihilvtt.auth.game.entity.GameStatus;
import com.nihilvtt.auth.game.repository.GameJoinRequestRepository;
import com.nihilvtt.auth.game.repository.GameMemberRepository;
import com.nihilvtt.auth.game.repository.GameRevokedEmailRepository;
import com.nihilvtt.auth.game.repository.GameRevocationRepository;
import com.nihilvtt.auth.game.repository.GameRepository;
import com.nihilvtt.auth.game.repository.GameSessionStateRepository;
import com.nihilvtt.auth.media.service.GameCoverStorageService;
import com.nihilvtt.auth.user.entity.UserEntity;
import com.nihilvtt.auth.user.repository.UserRepository;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
public class GameService {
  private static final Logger logger = LoggerFactory.getLogger(GameService.class);
  private static final String JOIN_CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  private static final int JOIN_CODE_LENGTH = 6;
  private static final int JOIN_CODE_MAX_ATTEMPTS = 10;
  private static final int FIXED_MAX_PLAYERS = 6;

  private final UserRepository userRepository;
  private final GameRepository gameRepository;
  private final GameMemberRepository gameMemberRepository;
  private final GameJoinRequestRepository gameJoinRequestRepository;
  private final GameRevocationRepository gameRevocationRepository;
  private final GameRevokedEmailRepository gameRevokedEmailRepository;
  private final GameSessionStateRepository gameSessionStateRepository;
  private final GameSessionCommandService gameSessionCommandService;
  private final GameCoverStorageService gameCoverStorageService;
  private final SecureRandom secureRandom = new SecureRandom();

  public GameService(
      UserRepository userRepository,
      GameRepository gameRepository,
      GameMemberRepository gameMemberRepository,
      GameJoinRequestRepository gameJoinRequestRepository,
      GameRevocationRepository gameRevocationRepository,
      GameRevokedEmailRepository gameRevokedEmailRepository,
      GameSessionStateRepository gameSessionStateRepository,
      GameSessionCommandService gameSessionCommandService,
      GameCoverStorageService gameCoverStorageService
  ) {
    this.userRepository = userRepository;
    this.gameRepository = gameRepository;
    this.gameMemberRepository = gameMemberRepository;
    this.gameJoinRequestRepository = gameJoinRequestRepository;
    this.gameRevocationRepository = gameRevocationRepository;
    this.gameRevokedEmailRepository = gameRevokedEmailRepository;
    this.gameSessionStateRepository = gameSessionStateRepository;
    this.gameSessionCommandService = gameSessionCommandService;
    this.gameCoverStorageService = gameCoverStorageService;
  }

  @Transactional(readOnly = true)
  public List<GameResponse> listActiveGames(Long userId) {
    UserEntity user = userRepository.findById(userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não autenticado."));
    Set<Long> revokedGameIds = new HashSet<>(gameRevocationRepository.findRevokedGameIdsByUserId(userId));
    revokedGameIds.addAll(gameRevokedEmailRepository.findRevokedGameIdsByEmail(normalizeEmail(user.getEmail())));
    return gameRepository.findByStatusOrderByCreatedAtDesc(GameStatus.ACTIVE)
        .stream()
        .filter(game -> game.getOwner().getId().equals(userId) || !revokedGameIds.contains(game.getId()))
        .map(this::mapResponse)
        .toList();
  }

  @Transactional
  public GameResponse createGame(Long ownerId, CreateGameRequest request, String clientIp) {
    UserEntity owner = userRepository.findById(ownerId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não autenticado."));

    GameEntity game = new GameEntity();
    game.setTitle(request.title().trim());
    game.setDescription(normalizeDescription(request.description()));
    game.setJoinCode(generateUniqueJoinCode());
    game.setMaxPlayers(FIXED_MAX_PLAYERS);
    game.setCurrentPlayers(1);
    game.setStatus(GameStatus.ACTIVE);
    game.setOwner(owner);

    GameEntity saved = gameRepository.save(game);
    ensureMembership(saved, owner);

    logger.info(
        "event=game_create_success gameId={} ownerId={} ownerEmail={} ip={}",
        saved.getId(),
        owner.getId(),
        owner.getEmail(),
        clientIp
    );

    return mapResponse(saved);
  }

  @Transactional(readOnly = true)
  public GameResponse getGameById(Long userId, Long gameId) {
    GameEntity game = gameRepository.findById(gameId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Jogo não encontrado."));
    ensureGameAccess(game, userId);
    return mapResponse(game);
  }

  @Transactional
  public GameResponse joinGameByCode(Long userId, String joinCodeRaw, String clientIp) {
    String joinCode = joinCodeRaw.trim().toUpperCase();
    UserEntity user = userRepository.findById(userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não autenticado."));
    GameEntity game = gameRepository.findByJoinCode(joinCode)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Jogo não encontrado."));
    ensureNotRevoked(game.getId(), userId, user.getEmail());
    return joinGame(userId, game, clientIp);
  }

  @Transactional
  public GameResponse joinGameById(Long userId, Long gameId, String clientIp) {
    UserEntity user = userRepository.findById(userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não autenticado."));
    GameEntity game = gameRepository.findById(gameId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Jogo não encontrado."));
    ensureNotRevoked(gameId, userId, user.getEmail());
    if (!canUserJoinByIdWithoutRequest(userId, game)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Você precisa de aprovação do mestre.");
    }
    return joinGame(userId, game, clientIp);
  }

  @Transactional
  public GameJoinRequestResponse submitJoinRequestByCode(Long userId, String joinCodeRaw, String clientIp) {
    String joinCode = joinCodeRaw.trim().toUpperCase();
    UserEntity requester = userRepository.findById(userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não autenticado."));
    GameEntity game = gameRepository.findByJoinCode(joinCode)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Jogo não encontrado."));
    ensureNotRevoked(game.getId(), userId, requester.getEmail());

    if (game.getStatus() != GameStatus.ACTIVE) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Este jogo não está ativo.");
    }

    if (game.getOwner().getId().equals(userId)
        || gameMemberRepository.existsByGameIdAndUserId(game.getId(), userId)) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Você já participa deste jogo.");
    }

    boolean pendingExists = gameJoinRequestRepository.existsByGameIdAndRequesterIdAndStatus(
        game.getId(),
        userId,
        GameJoinRequestStatus.PENDING
    );
    if (pendingExists) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe uma solicitação pendente para este jogo.");
    }

    GameJoinRequestEntity request = new GameJoinRequestEntity();
    request.setGame(game);
    request.setRequester(requester);
    request.setStatus(GameJoinRequestStatus.PENDING);
    GameJoinRequestEntity saved = gameJoinRequestRepository.save(request);

    logger.info(
        "event=game_join_request_submitted requestId={} gameId={} joinCode={} requesterId={} requesterEmail={} ip={}",
        saved.getId(),
        game.getId(),
        game.getJoinCode(),
        requester.getId(),
        requester.getEmail(),
        clientIp
    );

    return mapJoinRequestResponse(saved);
  }

  @Transactional(readOnly = true)
  public List<GameJoinRequestResponse> listPendingJoinRequestsForOwner(Long ownerId) {
    return gameJoinRequestRepository
        .findByGameOwnerIdAndStatusOrderByRequestedAtAsc(ownerId, GameJoinRequestStatus.PENDING)
        .stream()
        .map(this::mapJoinRequestResponse)
        .toList();
  }

  @Transactional(readOnly = true)
  public List<GameJoinRequestResponse> listMyJoinRequests(Long requesterId) {
    return gameJoinRequestRepository.findByRequesterIdOrderByRequestedAtDesc(requesterId)
        .stream()
        .map(this::mapJoinRequestResponse)
        .toList();
  }

  @Transactional
  public GameJoinRequestResponse reviewJoinRequest(
      Long ownerId,
      Long gameId,
      Long requestId,
      boolean approve,
      String clientIp
  ) {
    GameJoinRequestEntity request = gameJoinRequestRepository.findByIdAndGameId(requestId, gameId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Solicitação não encontrada."));

    GameEntity game = request.getGame();
    if (!game.getOwner().getId().equals(ownerId)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Apenas o mestre pode revisar solicitações.");
    }

    if (request.getStatus() != GameJoinRequestStatus.PENDING) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Esta solicitação já foi revisada.");
    }

    if (approve) {
      if (game.getCurrentPlayers() >= game.getMaxPlayers()) {
        throw new ResponseStatusException(HttpStatus.CONFLICT, "Jogo lotado.");
      }
      ensureMembership(game, request.getRequester());
      game.setCurrentPlayers(game.getCurrentPlayers() + 1);
      gameRepository.save(game);
      request.setStatus(GameJoinRequestStatus.APPROVED);
    } else {
      request.setStatus(GameJoinRequestStatus.REJECTED);
    }

    request.setReviewedAt(Instant.now());
    request.setReviewedByUserId(ownerId);
    GameJoinRequestEntity saved = gameJoinRequestRepository.save(request);

    logger.info(
        "event=game_join_request_reviewed requestId={} gameId={} approved={} ownerId={} requesterId={} requesterEmail={} ip={}",
        saved.getId(),
        game.getId(),
        approve,
        ownerId,
        saved.getRequester().getId(),
        saved.getRequester().getEmail(),
        clientIp
    );

    return mapJoinRequestResponse(saved);
  }

  @Transactional(readOnly = true)
  public GameResponse leaveGameById(Long userId, Long gameId, String clientIp) {
    UserEntity user = userRepository.findById(userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não autenticado."));

    GameEntity game = gameRepository.findById(gameId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Jogo não encontrado."));

    boolean isMember = gameMemberRepository.existsByGameIdAndUserId(gameId, userId)
        || game.getOwner().getId().equals(userId);

    if (!isMember) {
      logger.info(
          "event=game_leave_noop reason=not_member gameId={} userId={} userEmail={} ip={}",
          game.getId(),
          user.getId(),
          user.getEmail(),
          clientIp
      );
      return mapResponse(game);
    }

    logger.info(
        "event=game_leave_success gameId={} gameJoinCode={} userId={} userEmail={} ip={}",
        game.getId(),
        game.getJoinCode(),
        user.getId(),
        user.getEmail(),
        clientIp
    );

    return mapResponse(game);
  }

  @Transactional
  public GameResponse revokeMemberAccess(Long ownerId, Long gameId, Long memberUserId, String clientIp) {
    UserEntity owner = userRepository.findById(ownerId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não autenticado."));

    GameEntity game = gameRepository.findById(gameId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Jogo não encontrado."));

    if (!game.getOwner().getId().equals(ownerId)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Apenas o mestre pode retirar permissões.");
    }

    if (ownerId.equals(memberUserId)) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "O mestre não pode remover a própria permissão.");
    }

    boolean memberExists = gameMemberRepository.existsByGameIdAndUserId(gameId, memberUserId);
    if (!memberExists) {
      logger.info(
          "event=game_revoke_access_noop reason=target_not_member gameId={} ownerId={} targetUserId={} ip={}",
          gameId,
          ownerId,
          memberUserId,
          clientIp
      );
      return mapResponse(game);
    }

    gameMemberRepository.deleteByGameIdAndUserId(gameId, memberUserId);
    gameJoinRequestRepository.deleteByGameIdAndRequesterId(gameId, memberUserId);
    UserEntity revokedUser = userRepository.findById(memberUserId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado."));
    if (!gameRevocationRepository.existsByGameIdAndUserId(gameId, memberUserId)) {
      GameRevocationEntity revocation = new GameRevocationEntity();
      revocation.setGame(game);
      revocation.setUser(revokedUser);
      gameRevocationRepository.save(revocation);
    }
    String revokedEmail = normalizeEmail(revokedUser.getEmail());
    if (!gameRevokedEmailRepository.existsByGameIdAndEmailIgnoreCase(gameId, revokedEmail)) {
      GameRevokedEmailEntity revokedEmailEntity = new GameRevokedEmailEntity();
      revokedEmailEntity.setGame(game);
      revokedEmailEntity.setEmail(revokedEmail);
      gameRevokedEmailRepository.save(revokedEmailEntity);
    }

    long memberCount = gameMemberRepository.countByGameId(gameId);
    game.setCurrentPlayers((int) memberCount);
    GameEntity saved = gameRepository.save(game);

    logger.info(
        "event=game_revoke_access_success gameId={} ownerId={} ownerEmail={} targetUserId={} ip={}",
        saved.getId(),
        owner.getId(),
        owner.getEmail(),
        memberUserId,
        clientIp
    );
    gameSessionCommandService.publishMemberRevoked(ownerId, gameId, memberUserId);

    return mapResponse(saved);
  }

  @Transactional
  public GameResponse updateGameCover(Long ownerId, Long gameId, MultipartFile file, String clientIp) {
    GameEntity game = gameRepository.findById(gameId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Jogo nao encontrado."));

    if (!game.getOwner().getId().equals(ownerId)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Apenas o mestre pode atualizar a capa do jogo.");
    }

    String previousCoverUrl = game.getCoverImageUrl();
    String newCoverUrl = gameCoverStorageService.storeCover(file);
    game.setCoverImageUrl(newCoverUrl);
    GameEntity saved = gameRepository.save(game);

    if (previousCoverUrl != null && !previousCoverUrl.equals(newCoverUrl)) {
      gameCoverStorageService.deleteIfManaged(previousCoverUrl);
    }

    logger.info(
        "event=game_cover_update_success gameId={} ownerId={} ip={}",
        saved.getId(),
        ownerId,
        clientIp
    );

    return mapResponse(saved);
  }

  @Transactional
  public void deleteGame(Long ownerId, Long gameId, String clientIp) {
    UserEntity owner = userRepository.findById(ownerId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não autenticado."));

    GameEntity game = gameRepository.findById(gameId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Jogo não encontrado."));

    if (!game.getOwner().getId().equals(ownerId)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Apenas o mestre pode excluir o jogo.");
    }

    gameCoverStorageService.deleteIfManaged(game.getCoverImageUrl());
    gameSessionStateRepository.deleteByGameId(gameId);
    gameJoinRequestRepository.deleteByGameId(gameId);
    gameMemberRepository.deleteByGame(game);
    gameRevocationRepository.deleteByGameId(gameId);
    gameRevokedEmailRepository.deleteByGameId(gameId);
    gameRepository.delete(game);

    logger.info(
        "event=game_delete_success gameId={} ownerId={} ownerEmail={} ip={}",
        gameId,
        owner.getId(),
        owner.getEmail(),
        clientIp
    );
  }

  @Transactional
  public GameResponse updateNickname(Long userId, Long gameId, String nicknameRaw, String clientIp) {
    UserEntity user = userRepository.findById(userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não autenticado."));

    GameEntity game = gameRepository.findById(gameId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Jogo não encontrado."));

    String nickname = nicknameRaw == null ? "" : nicknameRaw.trim();
    if (nickname.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nickname inválido.");
    }

    GameMemberEntity membership = gameMemberRepository.findByGameIdAndUserId(gameId, userId)
        .orElseGet(() -> {
          GameMemberEntity created = new GameMemberEntity();
          created.setGame(game);
          created.setUser(user);
          created.setNickname(user.getName());
          created.setColorHex(pickColorForNewMember(gameId));
          return gameMemberRepository.save(created);
        });

    if (membership.getColorHex() == null || membership.getColorHex().isBlank()) {
      membership.setColorHex(pickColorForNewMember(gameId));
    }

    membership.setNickname(nickname);
    gameMemberRepository.save(membership);

    logger.info(
        "event=game_nickname_update_success gameId={} userId={} userEmail={} nickname={} ip={}",
        game.getId(),
        user.getId(),
        user.getEmail(),
        nickname,
        clientIp
    );

    return mapResponse(game);
  }

  private GameResponse joinGame(Long userId, GameEntity game, String clientIp) {
    UserEntity user = userRepository.findById(userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não autenticado."));

    if (game.getStatus() != GameStatus.ACTIVE) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Este jogo não está ativo.");
    }

    boolean alreadyMember = gameMemberRepository.existsByGameIdAndUserId(game.getId(), user.getId());
    if (!alreadyMember) {
      if (game.getCurrentPlayers() >= game.getMaxPlayers()) {
        throw new ResponseStatusException(HttpStatus.CONFLICT, "Jogo lotado.");
      }
      ensureMembership(game, user);
      game.setCurrentPlayers(game.getCurrentPlayers() + 1);
      game = gameRepository.save(game);
    }

    logger.info(
        "event=game_join_success gameId={} gameJoinCode={} userId={} userEmail={} ip={}",
        game.getId(),
        game.getJoinCode(),
        user.getId(),
        user.getEmail(),
        clientIp
    );

    return mapResponse(game);
  }

  private boolean canUserJoinByIdWithoutRequest(Long userId, GameEntity game) {
    if (game.getOwner().getId().equals(userId)) {
      return true;
    }
    if (gameMemberRepository.existsByGameIdAndUserId(game.getId(), userId)) {
      return true;
    }
    return gameJoinRequestRepository.existsByGameIdAndRequesterIdAndStatus(
        game.getId(),
        userId,
        GameJoinRequestStatus.APPROVED
    );
  }

  private void ensureGameAccess(GameEntity game, Long userId) {
    if (game.getOwner().getId().equals(userId)) {
      return;
    }
    boolean member = gameMemberRepository.existsByGameIdAndUserId(game.getId(), userId);
    if (!member) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Você não tem acesso a este jogo.");
    }
  }

  private void ensureMembership(GameEntity game, UserEntity user) {
    if (gameMemberRepository.existsByGameIdAndUserId(game.getId(), user.getId())) {
      return;
    }
    GameMemberEntity member = new GameMemberEntity();
    member.setGame(game);
    member.setUser(user);
    member.setNickname(user.getName());
    member.setColorHex(pickColorForNewMember(game.getId()));
    gameMemberRepository.save(member);
  }

  private void ensureNotRevoked(Long gameId, Long userId, String userEmail) {
    if (gameRevocationRepository.existsByGameIdAndUserId(gameId, userId)
        || gameRevokedEmailRepository.existsByGameIdAndEmailIgnoreCase(gameId, normalizeEmail(userEmail))) {
      throw new ResponseStatusException(
          HttpStatus.FORBIDDEN,
          "Seu acesso a este jogo foi revogado pelo mestre."
      );
    }
  }

  private String normalizeEmail(String email) {
    if (email == null) {
      return "";
    }
    return email.trim().toLowerCase(Locale.ROOT);
  }

  private String pickColorForNewMember(Long gameId) {
    List<String> usedColors = gameMemberRepository.findDistinctColorHexByGameId(gameId);
    Set<String> usedColorSet = new HashSet<>();
    for (String color : usedColors) {
      if (color != null) {
        usedColorSet.add(color.toUpperCase());
      }
    }

    List<String> palette = GameColorPalette.COLORS;
    List<String> available = palette.stream()
        .filter(color -> !usedColorSet.contains(color.toUpperCase()))
        .toList();

    if (!available.isEmpty()) {
      return available.get(secureRandom.nextInt(available.size()));
    }

    return palette.get(secureRandom.nextInt(palette.size()));
  }

  private String normalizeDescription(String description) {
    if (description == null) {
      return null;
    }
    String trimmed = description.trim();
    return trimmed.isBlank() ? null : trimmed;
  }

  private String generateUniqueJoinCode() {
    for (int attempt = 0; attempt < JOIN_CODE_MAX_ATTEMPTS; attempt++) {
      String candidate = randomJoinCode();
      if (!gameRepository.existsByJoinCode(candidate)) {
        return candidate;
      }
    }
    throw new ResponseStatusException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Não foi possível gerar código do jogo. Tente novamente."
    );
  }

  private String randomJoinCode() {
    StringBuilder code = new StringBuilder(JOIN_CODE_LENGTH);
    for (int i = 0; i < JOIN_CODE_LENGTH; i++) {
      int index = secureRandom.nextInt(JOIN_CODE_CHARS.length());
      code.append(JOIN_CODE_CHARS.charAt(index));
    }
    return code.toString();
  }

  private GameResponse mapResponse(GameEntity game) {
    List<GamePlayerResponse> players = mapPlayers(game);
    return new GameResponse(
        game.getId(),
        game.getTitle(),
        game.getDescription(),
        game.getJoinCode(),
        game.getCoverImageUrl(),
        game.getMaxPlayers(),
        players.size(),
        game.getStatus().name(),
        game.getCreatedAt(),
        new GameOwnerResponse(game.getOwner().getId(), game.getOwner().getName()),
        players
    );
  }

  private List<GamePlayerResponse> mapPlayers(GameEntity game) {
    List<GamePlayerResponse> players = gameMemberRepository.findByGameIdOrderByCreatedAtAsc(game.getId())
        .stream()
        .map(member -> new GamePlayerResponse(
            member.getUser().getId(),
            normalizeNickname(member.getNickname(), member.getUser().getName()),
            normalizeColor(member.getColorHex()),
            member.getUser().getId().equals(game.getOwner().getId())
        ))
        .toList();

    boolean ownerAlreadyInList = players.stream().anyMatch(player -> player.id().equals(game.getOwner().getId()));
    if (ownerAlreadyInList) {
      return players;
    }

    GamePlayerResponse owner = new GamePlayerResponse(
        game.getOwner().getId(),
        game.getOwner().getName(),
        GameColorPalette.DEFAULT_COLOR,
        true
    );

    return java.util.stream.Stream.concat(java.util.stream.Stream.of(owner), players.stream()).toList();
  }

  private String normalizeColor(String colorHex) {
    if (colorHex == null || colorHex.isBlank()) {
      return GameColorPalette.DEFAULT_COLOR;
    }
    String normalized = colorHex.trim().toUpperCase();
    if (!GameColorPalette.COLORS.contains(normalized)) {
      return GameColorPalette.DEFAULT_COLOR;
    }
    return normalized;
  }

  private String normalizeNickname(String nickname, String fallback) {
    if (nickname == null) {
      return fallback;
    }
    String trimmed = nickname.trim();
    return trimmed.isBlank() ? fallback : trimmed;
  }

  private GameJoinRequestResponse mapJoinRequestResponse(GameJoinRequestEntity request) {
    return new GameJoinRequestResponse(
        request.getId(),
        request.getStatus().name(),
        request.getRequestedAt(),
        request.getReviewedAt(),
        request.getReviewedByUserId(),
        mapResponse(request.getGame()),
        new GameOwnerResponse(request.getRequester().getId(), request.getRequester().getName())
    );
  }
}
