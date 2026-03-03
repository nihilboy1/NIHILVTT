package com.nihilvtt.auth.game.entity;

import com.nihilvtt.auth.user.entity.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.Instant;

@Entity
@Table(
    name = "game_join_requests",
    indexes = {
      @Index(name = "idx_game_join_requests_session_status", columnList = "game_session_id,status,requestedAt"),
      @Index(name = "idx_game_join_requests_requester", columnList = "requester_id")
    }
)
public class GameJoinRequestEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "game_session_id", nullable = false)
  private GameEntity game;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "requester_id", nullable = false)
  private UserEntity requester;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  private GameJoinRequestStatus status = GameJoinRequestStatus.PENDING;

  @Column(nullable = false, updatable = false)
  private Instant requestedAt;

  @Column(nullable = true)
  private Instant reviewedAt;

  @Column(nullable = true)
  private Long reviewedByUserId;

  @PrePersist
  void onCreate() {
    requestedAt = Instant.now();
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public GameEntity getGame() {
    return game;
  }

  public void setGame(GameEntity game) {
    this.game = game;
  }

  public UserEntity getRequester() {
    return requester;
  }

  public void setRequester(UserEntity requester) {
    this.requester = requester;
  }

  public GameJoinRequestStatus getStatus() {
    return status;
  }

  public void setStatus(GameJoinRequestStatus status) {
    this.status = status;
  }

  public Instant getRequestedAt() {
    return requestedAt;
  }

  public void setRequestedAt(Instant requestedAt) {
    this.requestedAt = requestedAt;
  }

  public Instant getReviewedAt() {
    return reviewedAt;
  }

  public void setReviewedAt(Instant reviewedAt) {
    this.reviewedAt = reviewedAt;
  }

  public Long getReviewedByUserId() {
    return reviewedByUserId;
  }

  public void setReviewedByUserId(Long reviewedByUserId) {
    this.reviewedByUserId = reviewedByUserId;
  }
}
