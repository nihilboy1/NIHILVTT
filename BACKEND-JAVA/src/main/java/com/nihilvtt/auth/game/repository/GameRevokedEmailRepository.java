package com.nihilvtt.auth.game.repository;

import com.nihilvtt.auth.game.entity.GameRevokedEmailEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface GameRevokedEmailRepository extends JpaRepository<GameRevokedEmailEntity, Long> {
  boolean existsByGameIdAndEmailIgnoreCase(Long gameId, String email);

  void deleteByGameId(Long gameId);

  @Query("select gre.game.id from GameRevokedEmailEntity gre where lower(gre.email) = lower(:email)")
  List<Long> findRevokedGameIdsByEmail(String email);
}
