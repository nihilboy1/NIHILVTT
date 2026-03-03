package com.nihilvtt.auth.auth.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.Map;
import java.util.UUID;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TokenService {
  private static final String REAUTH_TOKEN_TYPE = "reauth";

  private final SecretKey accessSecretKey;
  private final SecretKey reauthSecretKey;
  private final long accessExpirationSeconds;
  private final long reauthExpirationSeconds;

  public TokenService(
      @Value("${app.security.jwt.access-secret}") String accessSecret,
      @Value("${app.security.jwt.reauth-secret:${app.security.jwt.access-secret}}") String reauthSecret,
      @Value("${app.security.jwt.access-expiration-seconds}") long accessExpirationSeconds,
      @Value("${app.security.jwt.reauth-expiration-seconds:300}") long reauthExpirationSeconds
  ) {
    this.accessSecretKey = Keys.hmacShaKeyFor(accessSecret.getBytes(StandardCharsets.UTF_8));
    this.reauthSecretKey = Keys.hmacShaKeyFor(reauthSecret.getBytes(StandardCharsets.UTF_8));
    this.accessExpirationSeconds = accessExpirationSeconds;
    this.reauthExpirationSeconds = reauthExpirationSeconds;
  }

  public String generateAccessToken(Long userId, String email, String role) {
    Instant now = Instant.now();
    Instant expiresAt = now.plusSeconds(accessExpirationSeconds);
    return Jwts.builder()
        .subject(String.valueOf(userId))
        .claims(Map.of("email", email, "role", role))
        .issuedAt(Date.from(now))
        .expiration(Date.from(expiresAt))
        .signWith(accessSecretKey)
        .compact();
  }

  public Claims parseAccessToken(String token) {
    return Jwts.parser()
        .verifyWith(accessSecretKey)
        .build()
        .parseSignedClaims(token)
        .getPayload();
  }

  public String generateReauthToken(Long userId, String email) {
    Instant now = Instant.now();
    Instant expiresAt = now.plusSeconds(reauthExpirationSeconds);
    return Jwts.builder()
        .subject(String.valueOf(userId))
        .claims(Map.of("email", email, "type", REAUTH_TOKEN_TYPE))
        .issuedAt(Date.from(now))
        .expiration(Date.from(expiresAt))
        .signWith(reauthSecretKey)
        .compact();
  }

  public Claims parseReauthToken(String token) {
    Claims claims = Jwts.parser()
        .verifyWith(reauthSecretKey)
        .build()
        .parseSignedClaims(token)
        .getPayload();

    String tokenType = String.valueOf(claims.get("type"));
    if (!REAUTH_TOKEN_TYPE.equals(tokenType)) {
      throw new IllegalArgumentException("Invalid reauth token type");
    }

    return claims;
  }

  public String newRefreshTokenRaw() {
    String random = UUID.randomUUID() + "." + UUID.randomUUID();
    return Base64.getUrlEncoder().withoutPadding().encodeToString(random.getBytes(StandardCharsets.UTF_8));
  }

  public String hashRefreshToken(String rawToken) {
    try {
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      byte[] hash = digest.digest(rawToken.getBytes(StandardCharsets.UTF_8));
      return Base64.getUrlEncoder().withoutPadding().encodeToString(hash);
    } catch (NoSuchAlgorithmException e) {
      throw new IllegalStateException("SHA-256 unavailable", e);
    }
  }
}
