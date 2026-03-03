package com.nihilvtt.auth.game.repository;

import com.nihilvtt.auth.game.entity.GameJoinRequestEntity;
import com.nihilvtt.auth.game.entity.GameJoinRequestStatus;
import com.nihilvtt.auth.user.entity.UserEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameJoinRequestRepository extends JpaRepository<GameJoinRequestEntity, Long> {
  boolean existsByGameIdAndRequesterIdAndStatus(Long gameId, Long requesterId, GameJoinRequestStatus status);

  List<GameJoinRequestEntity> findByGameOwnerIdAndStatusOrderByRequestedAtAsc(Long ownerId, GameJoinRequestStatus status);

  List<GameJoinRequestEntity> findByRequesterIdOrderByRequestedAtDesc(Long requesterId);

  Optional<GameJoinRequestEntity> findByIdAndGameId(Long id, Long gameId);

  void deleteByGameId(Long gameId);

  void deleteByGameIdAndRequesterId(Long gameId, Long requesterId);

  void deleteByRequester(UserEntity requester);

  void deleteByGameOwner(UserEntity owner);
}
