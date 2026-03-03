package com.nihilvtt.auth.game.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.Instant;

@Entity
@Table(
    name = "game_session_revoked_emails",
    uniqueConstraints = {
      @UniqueConstraint(name = "uk_game_session_revoked_email", columnNames = {"game_session_id", "email"})
    },
    indexes = {
      @Index(name = "idx_game_session_revoked_emails_game", columnList = "game_session_id"),
      @Index(name = "idx_game_session_revoked_emails_email", columnList = "email")
    }
)
public class GameRevokedEmailEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "game_session_id", nullable = false)
  private GameEntity game;

  @Column(nullable = false, length = 180)
  private String email;

  @Column(nullable = false, updatable = false)
  private Instant revokedAt;

  @PrePersist
  void onCreate() {
    revokedAt = Instant.now();
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

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Instant getRevokedAt() {
    return revokedAt;
  }

  public void setRevokedAt(Instant revokedAt) {
    this.revokedAt = revokedAt;
  }
}
