package com.nihilvtt.auth.game.repository;

import com.nihilvtt.auth.game.entity.GameRevocationEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface GameRevocationRepository extends JpaRepository<GameRevocationEntity, Long> {
  boolean existsByGameIdAndUserId(Long gameId, Long userId);

  void deleteByGameId(Long gameId);

  @Query("select gr.game.id from GameRevocationEntity gr where gr.user.id = :userId")
  List<Long> findRevokedGameIdsByUserId(Long userId);
}
