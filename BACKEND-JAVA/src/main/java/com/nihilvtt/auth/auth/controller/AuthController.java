package com.nihilvtt.auth.auth.controller;

import com.nihilvtt.auth.auth.dto.AuthResponse;
import com.nihilvtt.auth.auth.dto.DeleteAccountRequest;
import com.nihilvtt.auth.auth.dto.LoginRequest;
import com.nihilvtt.auth.auth.dto.ReauthRequest;
import com.nihilvtt.auth.auth.dto.ReauthResponse;
import com.nihilvtt.auth.auth.dto.RegisterRequest;
import com.nihilvtt.auth.auth.dto.UpdateProfileRequest;
import com.nihilvtt.auth.auth.dto.UserMeResponse;
import com.nihilvtt.auth.auth.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.time.Duration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/auth")
public class AuthController {
  private static final String REFRESH_COOKIE = "refresh_token";
  private static final String REAUTH_HEADER = "X-Reauth-Token";

  private final AuthService authService;
  private final boolean secureCookie;
  private final long refreshExpirationSeconds;

  public AuthController(
      AuthService authService,
      @Value("${app.security.cookies.secure}") boolean secureCookie,
      @Value("${app.security.jwt.refresh-expiration-seconds}") long refreshExpirationSeconds
  ) {
    this.authService = authService;
    this.secureCookie = secureCookie;
    this.refreshExpirationSeconds = refreshExpirationSeconds;
  }

  @PostMapping("/register")
  public ResponseEntity<AuthResponse> register(
      @Valid @RequestBody RegisterRequest request,
      HttpServletRequest httpRequest
  ) {
    AuthService.LoginResult result = authService.register(request, extractClientIp(httpRequest));
    return withRefreshCookie(result);
  }

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(
      @Valid @RequestBody LoginRequest request,
      HttpServletRequest httpRequest
  ) {
    AuthService.LoginResult result = authService.login(request, extractClientIp(httpRequest));
    return withRefreshCookie(result);
  }

  @PostMapping("/reauth")
  public ResponseEntity<ReauthResponse> reauthenticate(
      Authentication authentication,
      @Valid @RequestBody ReauthRequest request,
      HttpServletRequest httpRequest
  ) {
    Long userId = (Long) authentication.getPrincipal();
    String token = authService.reauthenticate(userId, request.currentPassword(), extractClientIp(httpRequest));
    return ResponseEntity.ok(new ReauthResponse(token));
  }

  @PostMapping("/refresh")
  public ResponseEntity<AuthResponse> refresh(HttpServletRequest request) {
    String refreshTokenRaw = readRefreshCookie(request);
    AuthService.LoginResult result = authService.refresh(refreshTokenRaw, extractClientIp(request));
    return withRefreshCookie(result);
  }

  @GetMapping("/me")
  public ResponseEntity<UserMeResponse> me(Authentication authentication) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.ok(authService.me(userId));
  }

  @PatchMapping("/profile")
  public ResponseEntity<UserMeResponse> updateProfile(
      Authentication authentication,
      @Valid @RequestBody UpdateProfileRequest request,
      @RequestHeader(name = REAUTH_HEADER, required = false) String reauthToken,
      HttpServletRequest httpRequest
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.ok(authService.updateProfile(userId, request, reauthToken, extractClientIp(httpRequest)));
  }

  @PostMapping(path = "/profile/avatar", consumes = "multipart/form-data")
  public ResponseEntity<UserMeResponse> uploadAvatar(
      Authentication authentication,
      @RequestParam("file") MultipartFile file,
      @RequestParam("currentPassword") String currentPassword,
      HttpServletRequest httpRequest
  ) {
    Long userId = (Long) authentication.getPrincipal();
    return ResponseEntity.ok(authService.updateAvatar(userId, currentPassword, file, extractClientIp(httpRequest)));
  }

  @PostMapping("/logout")
  public ResponseEntity<Void> logout(HttpServletRequest request) {
    authService.logout(readRefreshCookie(request), extractClientIp(request));
    return clearRefreshCookieResponse();
  }

  @PostMapping("/account/delete")
  public ResponseEntity<Void> deleteAccount(
      Authentication authentication,
      HttpServletRequest request,
      @RequestHeader(name = REAUTH_HEADER, required = false) String reauthToken,
      @Valid @RequestBody DeleteAccountRequest deleteRequest
  ) {
    Long userId = (Long) authentication.getPrincipal();
    authService.deleteAccount(
        userId,
        deleteRequest.currentPassword(),
        readRefreshCookie(request),
        reauthToken,
        extractClientIp(request)
    );
    return clearRefreshCookieResponse();
  }

  private ResponseEntity<Void> clearRefreshCookieResponse() {
    ResponseCookie clearCookie = ResponseCookie.from(REFRESH_COOKIE, "")
        .httpOnly(true)
        .secure(secureCookie)
        .sameSite("Lax")
        .path("/")
        .maxAge(Duration.ZERO)
        .build();
    return ResponseEntity.noContent()
        .header(HttpHeaders.SET_COOKIE, clearCookie.toString())
        .build();
  }

  private ResponseEntity<AuthResponse> withRefreshCookie(AuthService.LoginResult result) {
    ResponseCookie cookie = ResponseCookie.from(REFRESH_COOKIE, result.refreshTokenRaw())
        .httpOnly(true)
        .secure(secureCookie)
        .sameSite("Lax")
        .path("/")
        .maxAge(Duration.ofSeconds(refreshExpirationSeconds))
        .build();

    return ResponseEntity.ok()
        .header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(result.response());
  }

  private String readRefreshCookie(HttpServletRequest request) {
    if (request.getCookies() == null) return null;
    for (var c : request.getCookies()) {
      if (REFRESH_COOKIE.equals(c.getName())) return c.getValue();
    }
    return null;
  }

  private String extractClientIp(HttpServletRequest request) {
    String forwardedFor = request.getHeader("X-Forwarded-For");
    if (forwardedFor != null && !forwardedFor.isBlank()) {
      return forwardedFor.split(",")[0].trim();
    }
    return request.getRemoteAddr();
  }
}
