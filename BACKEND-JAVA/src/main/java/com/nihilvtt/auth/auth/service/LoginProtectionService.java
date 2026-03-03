package com.nihilvtt.auth.auth.service;

import com.nihilvtt.auth.common.exception.RateLimitException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class LoginProtectionService {
  private record AttemptState(int failedAttempts, Instant firstFailureAt, Instant lockedUntil) {}

  private record RateKey(String key, int threshold) {}

  private final ConcurrentHashMap<String, AttemptState> attemptsByKey = new ConcurrentHashMap<>();

  private final boolean enabled;
  private final int defaultMaxFailedAttempts;
  private final int maxFailedAttemptsEmail;
  private final int maxFailedAttemptsIp;
  private final int maxFailedAttemptsEmailIp;
  private final long windowSeconds;
  private final long lockoutSeconds;

  public LoginProtectionService(
      @Value("${app.security.login-protection.enabled:true}") boolean enabled,
      @Value("${app.security.login-protection.max-failed-attempts:5}") int defaultMaxFailedAttempts,
      @Value("${app.security.login-protection.max-failed-attempts-email:0}") int maxFailedAttemptsEmail,
      @Value("${app.security.login-protection.max-failed-attempts-ip:0}") int maxFailedAttemptsIp,
      @Value("${app.security.login-protection.max-failed-attempts-email-ip:0}") int maxFailedAttemptsEmailIp,
      @Value("${app.security.login-protection.window-seconds:900}") long windowSeconds,
      @Value("${app.security.login-protection.lockout-seconds:900}") long lockoutSeconds
  ) {
    this.enabled = enabled;
    this.defaultMaxFailedAttempts = Math.max(1, defaultMaxFailedAttempts);
    this.maxFailedAttemptsEmail = maxFailedAttemptsEmail;
    this.maxFailedAttemptsIp = maxFailedAttemptsIp;
    this.maxFailedAttemptsEmailIp = maxFailedAttemptsEmailIp;
    this.windowSeconds = Math.max(60, windowSeconds);
    this.lockoutSeconds = Math.max(60, lockoutSeconds);
  }

  public void validateLoginAllowed(String normalizedEmail, String clientIp) {
    if (!enabled) {
      return;
    }

    String safeIp = normalizeIp(clientIp);
    long maxRetryAfterSeconds = 0;

    for (RateKey rateKey : buildKeys(normalizedEmail, safeIp)) {
      long retryAfterSeconds = assertNotLocked(rateKey.key());
      if (retryAfterSeconds > maxRetryAfterSeconds) {
        maxRetryAfterSeconds = retryAfterSeconds;
      }
    }

    if (maxRetryAfterSeconds > 0) {
      throw new RateLimitException(
          "Muitas tentativas de login. Tente novamente em alguns minutos.",
          maxRetryAfterSeconds
      );
    }
  }

  public void registerFailedAttempt(String normalizedEmail, String clientIp) {
    if (!enabled) {
      return;
    }

    String safeIp = normalizeIp(clientIp);
    for (RateKey rateKey : buildKeys(normalizedEmail, safeIp)) {
      registerFailure(rateKey.key(), rateKey.threshold());
    }
  }

  public void registerSuccessfulLogin(String normalizedEmail, String clientIp) {
    if (!enabled) {
      return;
    }

    String safeIp = normalizeIp(clientIp);
    for (RateKey rateKey : buildKeys(normalizedEmail, safeIp)) {
      attemptsByKey.remove(rateKey.key());
    }
  }

  private long assertNotLocked(String key) {
    AttemptState state = attemptsByKey.get(key);
    if (state == null) {
      return 0;
    }

    Instant now = Instant.now();

    if (isOutsideWindow(state, now)) {
      attemptsByKey.remove(key);
      return 0;
    }

    if (state.lockedUntil() != null && state.lockedUntil().isAfter(now)) {
      return Math.max(1, state.lockedUntil().getEpochSecond() - now.getEpochSecond());
    }

    return 0;
  }

  private void registerFailure(String key, int threshold) {
    attemptsByKey.compute(key, (currentKey, current) -> {
      Instant now = Instant.now();

      if (current == null || isOutsideWindow(current, now)) {
        Instant lockedUntil = threshold <= 1 ? now.plusSeconds(lockoutSeconds) : null;
        return new AttemptState(1, now, lockedUntil);
      }

      int failures = current.failedAttempts() + 1;
      Instant lockedUntil = failures >= threshold ? now.plusSeconds(lockoutSeconds) : current.lockedUntil();
      return new AttemptState(failures, current.firstFailureAt(), lockedUntil);
    });
  }

  private boolean isOutsideWindow(AttemptState state, Instant now) {
    return state.firstFailureAt().plusSeconds(windowSeconds).isBefore(now);
  }

  private String emailKey(String normalizedEmail) {
    return "email:" + normalizedEmail;
  }

  private String ipKey(String clientIp) {
    return "ip:" + clientIp;
  }

  private String emailIpKey(String normalizedEmail, String clientIp) {
    return "email-ip:" + normalizedEmail + ":" + clientIp;
  }

  private String normalizeIp(String clientIp) {
    if (clientIp == null || clientIp.isBlank()) {
      return "unknown";
    }
    return clientIp.trim();
  }

  private List<RateKey> buildKeys(String normalizedEmail, String normalizedIp) {
    List<RateKey> keys = new ArrayList<>();
    keys.add(new RateKey(emailKey(normalizedEmail), resolveThreshold(maxFailedAttemptsEmail)));
    keys.add(new RateKey(ipKey(normalizedIp), resolveThreshold(maxFailedAttemptsIp)));
    keys.add(new RateKey(emailIpKey(normalizedEmail, normalizedIp), resolveThreshold(maxFailedAttemptsEmailIp)));
    return keys;
  }

  private int resolveThreshold(int specificThreshold) {
    return specificThreshold > 0 ? specificThreshold : defaultMaxFailedAttempts;
  }
}
