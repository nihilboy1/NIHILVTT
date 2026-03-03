package com.nihilvtt.auth.game.repository;

import com.nihilvtt.auth.game.entity.GameSessionStateEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameSessionStateRepository extends JpaRepository<GameSessionStateEntity, Long> {
  Optional<GameSessionStateEntity> findByGameId(Long gameId);

  void deleteByGameId(Long gameId);
}
