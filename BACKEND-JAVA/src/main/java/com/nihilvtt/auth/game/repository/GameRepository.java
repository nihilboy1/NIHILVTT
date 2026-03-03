package com.nihilvtt.auth.game.repository;

import com.nihilvtt.auth.game.entity.GameEntity;
import com.nihilvtt.auth.game.entity.GameStatus;
import com.nihilvtt.auth.user.entity.UserEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<GameEntity, Long> {
  boolean existsByJoinCode(String joinCode);

  Optional<GameEntity> findByJoinCode(String joinCode);

  List<GameEntity> findByStatusOrderByCreatedAtDesc(GameStatus status);

  List<GameEntity> findByOwner(UserEntity owner);
}
