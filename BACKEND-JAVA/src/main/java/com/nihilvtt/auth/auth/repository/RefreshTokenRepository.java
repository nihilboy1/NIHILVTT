package com.nihilvtt.auth.auth.repository;

import com.nihilvtt.auth.auth.entity.RefreshTokenEntity;
import com.nihilvtt.auth.user.entity.UserEntity;
import java.time.Instant;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshTokenEntity, Long> {
  Optional<RefreshTokenEntity> findByTokenHash(String tokenHash);
  void deleteByUser(UserEntity user);
  void deleteByExpiresAtBefore(Instant instant);
}
