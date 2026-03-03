package com.nihilvtt.auth.auth.service;

import com.nihilvtt.auth.auth.dto.AuthResponse;
import com.nihilvtt.auth.auth.dto.LoginRequest;
import com.nihilvtt.auth.auth.dto.RegisterRequest;
import com.nihilvtt.auth.auth.dto.UpdateProfileRequest;
import com.nihilvtt.auth.auth.dto.UserMeResponse;
import com.nihilvtt.auth.auth.entity.RefreshTokenEntity;
import com.nihilvtt.auth.auth.repository.RefreshTokenRepository;
import com.nihilvtt.auth.common.exception.FieldValidationException;
import com.nihilvtt.auth.common.exception.RateLimitException;
import com.nihilvtt.auth.game.repository.GameJoinRequestRepository;
import com.nihilvtt.auth.game.repository.GameMemberRepository;
import com.nihilvtt.auth.game.repository.GameRepository;
import com.nihilvtt.auth.game.service.GameService;
import com.nihilvtt.auth.media.service.AvatarStorageService;
import com.nihilvtt.auth.user.entity.UserEntity;
import com.nihilvtt.auth.user.entity.UserRole;
import com.nihilvtt.auth.user.repository.UserRepository;
import io.jsonwebtoken.Claims;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
  public record LoginResult(AuthResponse response, String refreshTokenRaw) {}

  private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

  private final UserRepository userRepository;
  private final RefreshTokenRepository refreshTokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final TokenService tokenService;
  private final AvatarStorageService avatarStorageService;
  private final LoginProtectionService loginProtectionService;
  private final GameJoinRequestRepository gameJoinRequestRepository;
  private final GameMemberRepository gameMemberRepository;
  private final GameRepository gameRepository;
  private final GameService gameService;
  private final long refreshExpirationSeconds;

  public AuthService(
      UserRepository userRepository,
      RefreshTokenRepository refreshTokenRepository,
      PasswordEncoder passwordEncoder,
      TokenService tokenService,
      AvatarStorageService avatarStorageService,
      LoginProtectionService loginProtectionService,
      GameJoinRequestRepository gameJoinRequestRepository,
      GameMemberRepository gameMemberRepository,
      GameRepository gameRepository,
      GameService gameService,
      @Value("${app.security.jwt.refresh-expiration-seconds}") long refreshExpirationSeconds
  ) {
    this.userRepository = userRepository;
    this.refreshTokenRepository = refreshTokenRepository;
    this.passwordEncoder = passwordEncoder;
    this.tokenService = tokenService;
    this.avatarStorageService = avatarStorageService;
    this.loginProtectionService = loginProtectionService;
    this.gameJoinRequestRepository = gameJoinRequestRepository;
    this.gameMemberRepository = gameMemberRepository;
    this.gameRepository = gameRepository;
    this.gameService = gameService;
    this.refreshExpirationSeconds = refreshExpirationSeconds;
  }

  @Transactional
  public LoginResult register(RegisterRequest request, String clientIp) {
    String email = request.email().trim().toLowerCase();
    if (userRepository.existsByEmail(email)) {
      logger.warn("event=auth_register_failed reason=email_conflict email={} ip={}", email, clientIp);
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já registrado.");
    }

    UserEntity user = new UserEntity();
    user.setName(request.name().trim());
    user.setEmail(email);
    user.setPasswordHash(passwordEncoder.encode(request.password()));
    user.setRole(UserRole.USER);
    UserEntity saved = userRepository.save(user);

    logger.info("event=auth_register_success userId={} email={} ip={}", saved.getId(), saved.getEmail(), clientIp);
    return issueLoginTokens(saved);
  }

  @Transactional
  public LoginResult login(LoginRequest request, String clientIp) {
    String email = request.email().trim().toLowerCase();

    try {
      loginProtectionService.validateLoginAllowed(email, clientIp);
    } catch (RateLimitException ex) {
      logger.warn("event=auth_login_blocked reason=lockout email={} ip={} retryAfterSeconds={}",
          email,
          clientIp,
          ex.getRetryAfterSeconds());
      throw ex;
    }

    UserEntity user = userRepository.findByEmail(email)
        .orElse(null);

    if (user == null) {
      loginProtectionService.registerFailedAttempt(email, clientIp);
      logger.warn("event=auth_login_failed reason=invalid_credentials email={} ip={}", email, clientIp);
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciais inválidas.");
    }

    if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
      loginProtectionService.registerFailedAttempt(email, clientIp);
      logger.warn("event=auth_login_failed reason=invalid_credentials userId={} email={} ip={}", user.getId(), email, clientIp);
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciais inválidas.");
    }

    loginProtectionService.registerSuccessfulLogin(email, clientIp);
    logger.info("event=auth_login_success userId={} email={} ip={}", user.getId(), user.getEmail(), clientIp);
    return issueLoginTokens(user);
  }

  @Transactional
  public String reauthenticate(Long userId, String currentPassword, String clientIp) {
    UserEntity user = userRepository.findById(userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não autenticado."));

    if (currentPassword == null || currentPassword.isBlank() || !passwordEncoder.matches(currentPassword, user.getPasswordHash())) {
      logger.warn("event=auth_reauth_failed reason=invalid_current_password userId={} email={} ip={}",
          user.getId(),
          user.getEmail(),
          clientIp);
      throw new FieldValidationException(
          "Dados de entrada inválidos.",
          Map.of("currentPassword", "Senha atual inválida.")
      );
    }

    String reauthToken = tokenService.generateReauthToken(user.getId(), user.getEmail());
    logger.info("event=auth_reauth_success userId={} email={} ip={}", user.getId(), user.getEmail(), clientIp);
    return reauthToken;
  }

  @Transactional
  public LoginResult refresh(String refreshTokenRaw, String clientIp) {
    if (refreshTokenRaw == null || refreshTokenRaw.isBlank()) {
      logger.warn("event=auth_refresh_failed reason=missing_refresh_cookie ip={}", clientIp);
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token ausente.");
    }

    String hash = tokenService.hashRefreshToken(refreshTokenRaw);
    RefreshTokenEntity token = refreshTokenRepository.findByTokenHash(hash)
        .orElseThrow(() -> {
          logger.warn("event=auth_refresh_failed reason=invalid_refresh_token ip={}", clientIp);
          return new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token inválido.");
        });

    if (token.isRevoked() || token.getExpiresAt().isBefore(Instant.now())) {
      logger.warn("event=auth_refresh_failed reason=expired_or_revoked userId={} email={} ip={}",
          token.getUser().getId(),
          token.getUser().getEmail(),
          clientIp);
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token expirado.");
    }

    token.setRevoked(true);
    refreshTokenRepository.save(token);

    logger.info("event=auth_refresh_success userId={} email={} ip={}",
        token.getUser().getId(),
        token.getUser().getEmail(),
        clientIp);
    return issueLoginTokens(token.getUser());
  }

  @Transactional(readOnly = true)
  public UserMeResponse me(Long userId) {
    UserEntity user = userRepository.findById(userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não autenticado."));
    return mapUser(user);
  }

  @Transactional
  public void logout(String refreshTokenRaw, String clientIp) {
    if (refreshTokenRaw == null || refreshTokenRaw.isBlank()) {
      logger.info("event=auth_logout_noop reason=missing_refresh_cookie ip={}", clientIp);
      return;
    }
    String hash = tokenService.hashRefreshToken(refreshTokenRaw);
    refreshTokenRepository.findByTokenHash(hash).ifPresent(token -> {
      token.setRevoked(true);
      refreshTokenRepository.save(token);
      logger.info("event=auth_logout_success userId={} email={} ip={}",
          token.getUser().getId(),
          token.getUser().getEmail(),
          clientIp);
    });
  }

  @Transactional
  public void deleteAccount(Long userId, String currentPassword, String refreshTokenRaw, String reauthToken, String clientIp) {
    UserEntity user = userRepository.findById(userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não autenticado."));

    assertReauthenticated(user, reauthToken, clientIp, "auth_delete_account_failed");

    if (!passwordEncoder.matches(currentPassword, user.getPasswordHash())) {
      logger.warn("event=auth_delete_account_failed reason=invalid_current_password userId={} email={} ip={}",
          user.getId(),
          user.getEmail(),
          clientIp);
      throw new FieldValidationException(
          "Dados de entrada inválidos.",
          Map.of("currentPassword", "Senha atual inválida.")
      );
    }

    if (refreshTokenRaw != null && !refreshTokenRaw.isBlank()) {
      logout(refreshTokenRaw, clientIp);
    }

    avatarStorageService.deleteIfManaged(user.getAvatarUrl());

    gameRepository.findByOwner(user)
        .stream()
        .map(game -> game.getId())
        .toList()
        .forEach(gameId -> gameService.deleteGame(userId, gameId, clientIp));

    gameJoinRequestRepository.deleteByRequester(user);
    gameJoinRequestRepository.deleteByGameOwner(user);
    gameMemberRepository.deleteByUser(user);
    gameMemberRepository.deleteByGameOwner(user);
    refreshTokenRepository.deleteByUser(user);
    userRepository.delete(user);

    logger.info("event=auth_delete_account_success userId={} email={} ip={}", userId, user.getEmail(), clientIp);
  }

  @Transactional
  public UserMeResponse updateProfile(Long userId, UpdateProfileRequest request, String reauthToken, String clientIp) {
    UserEntity user = userRepository.findById(userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não autenticado."));

    if (!passwordEncoder.matches(request.currentPassword(), user.getPasswordHash())) {
      logger.warn("event=auth_update_profile_failed reason=invalid_current_password userId={} email={} ip={}",
          user.getId(),
          user.getEmail(),
          clientIp);
      throw new FieldValidationException(
          "Dados de entrada inválidos.",
          Map.of("currentPassword", "Senha atual inválida.")
      );
    }

    String nextName = request.name() != null ? request.name().trim() : "";
    String nextPassword = request.newPassword() != null ? request.newPassword().trim() : "";
    String nextAvatarUrl = request.avatarUrl();

    if (nextName.isBlank() && nextPassword.isBlank() && nextAvatarUrl == null) {
      Map<String, String> fieldErrors = new LinkedHashMap<>();
      fieldErrors.put("name", "Informe ao menos uma alteração no perfil.");
      fieldErrors.put("newPassword", "Informe ao menos uma alteração no perfil.");
      fieldErrors.put("avatarUrl", "Informe ao menos uma alteração no perfil.");
      throw new FieldValidationException("Dados de entrada inválidos.", fieldErrors);
    }

    if (!nextPassword.isBlank()) {
      assertReauthenticated(user, reauthToken, clientIp, "auth_update_profile_failed");
    }

    String previousAvatarUrl = user.getAvatarUrl();

    if (!nextName.isBlank()) {
      user.setName(nextName);
    }
    if (!nextPassword.isBlank()) {
      user.setPasswordHash(passwordEncoder.encode(nextPassword));
    }
    if (nextAvatarUrl != null) {
      String normalized = nextAvatarUrl.isBlank() ? null : nextAvatarUrl;
      user.setAvatarUrl(normalized);
    }

    UserEntity saved = userRepository.save(user);

    if (nextAvatarUrl != null && previousAvatarUrl != null && !previousAvatarUrl.equals(saved.getAvatarUrl())) {
      avatarStorageService.deleteIfManaged(previousAvatarUrl);
    }

    logger.info("event=auth_update_profile_success userId={} email={} ip={}",
        saved.getId(),
        saved.getEmail(),
        clientIp);
    return mapUser(saved);
  }

  @Transactional
  public UserMeResponse updateAvatar(Long userId, String currentPassword, MultipartFile avatarFile, String clientIp) {
    UserEntity user = userRepository.findById(userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não autenticado."));

    if (currentPassword == null || currentPassword.isBlank()) {
      throw new FieldValidationException(
          "Dados de entrada inválidos.",
          Map.of("currentPassword", "Informe sua senha atual.")
      );
    }

    if (!passwordEncoder.matches(currentPassword, user.getPasswordHash())) {
      logger.warn("event=auth_update_avatar_failed reason=invalid_current_password userId={} email={} ip={}",
          user.getId(),
          user.getEmail(),
          clientIp);
      throw new FieldValidationException(
          "Dados de entrada inválidos.",
          Map.of("currentPassword", "Senha atual inválida.")
      );
    }

    String previousAvatarUrl = user.getAvatarUrl();
    String newAvatarUrl = avatarStorageService.storeAvatar(avatarFile);

    user.setAvatarUrl(newAvatarUrl);
    UserEntity saved = userRepository.save(user);

    if (previousAvatarUrl != null && !previousAvatarUrl.equals(newAvatarUrl)) {
      avatarStorageService.deleteIfManaged(previousAvatarUrl);
    }

    logger.info("event=auth_update_avatar_success userId={} email={} ip={}",
        saved.getId(),
        saved.getEmail(),
        clientIp);
    return mapUser(saved);
  }

  private LoginResult issueLoginTokens(UserEntity user) {
    refreshTokenRepository.deleteByUser(user);

    String accessToken = tokenService.generateAccessToken(
        user.getId(),
        user.getEmail(),
        user.getRole().name()
    );

    String refreshRaw = tokenService.newRefreshTokenRaw();
    String refreshHash = tokenService.hashRefreshToken(refreshRaw);

    RefreshTokenEntity refresh = new RefreshTokenEntity();
    refresh.setUser(user);
    refresh.setTokenHash(refreshHash);
    refresh.setCreatedAt(Instant.now());
    refresh.setExpiresAt(Instant.now().plusSeconds(refreshExpirationSeconds));
    refresh.setRevoked(false);
    refreshTokenRepository.save(refresh);

    return new LoginResult(new AuthResponse(accessToken, mapUser(user)), refreshRaw);
  }

  private void assertReauthenticated(UserEntity user, String reauthToken, String clientIp, String failureEvent) {
    if (reauthToken == null || reauthToken.isBlank()) {
      logger.warn("event={} reason=missing_reauth_token userId={} email={} ip={}",
          failureEvent,
          user.getId(),
          user.getEmail(),
          clientIp);
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Reautenticação necessária.");
    }

    try {
      Claims claims = tokenService.parseReauthToken(reauthToken);
      Long tokenUserId = Long.parseLong(claims.getSubject());
      if (!user.getId().equals(tokenUserId)) {
        throw new IllegalArgumentException("Token subject mismatch");
      }
    } catch (Exception ex) {
      logger.warn("event={} reason=invalid_reauth_token userId={} email={} ip={}",
          failureEvent,
          user.getId(),
          user.getEmail(),
          clientIp);
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Reautenticação necessária.");
    }
  }

  private UserMeResponse mapUser(UserEntity user) {
    return new UserMeResponse(
        user.getId(),
        user.getName(),
        user.getEmail(),
        user.getRole().name(),
        user.getAvatarUrl()
    );
  }
}
