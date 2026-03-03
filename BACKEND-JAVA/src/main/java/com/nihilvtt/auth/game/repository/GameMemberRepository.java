package com.nihilvtt.auth.game.repository;

import com.nihilvtt.auth.game.entity.GameEntity;
import com.nihilvtt.auth.game.entity.GameMemberEntity;
import com.nihilvtt.auth.user.entity.UserEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameMemberRepository extends JpaRepository<GameMemberEntity, Long> {
  boolean existsByGameIdAndUserId(Long gameId, Long userId);

  Optional<GameMemberEntity> findByGameIdAndUserId(Long gameId, Long userId);

  List<GameMemberEntity> findByGameIdOrderByCreatedAtAsc(Long gameId);

  @Query("select distinct gm.colorHex from GameMemberEntity gm where gm.game.id = :gameId")
  List<String> findDistinctColorHexByGameId(Long gameId);

  long countByGameId(Long gameId);

  void deleteByGameIdAndUserId(Long gameId, Long userId);

  void deleteByUser(UserEntity user);

  void deleteByGameOwner(UserEntity owner);

  void deleteByGame(GameEntity game);
}
