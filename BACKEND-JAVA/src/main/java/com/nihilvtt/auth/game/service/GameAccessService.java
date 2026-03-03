package com.nihilvtt.auth.game.service;

import com.nihilvtt.auth.game.entity.GameEntity;
import com.nihilvtt.auth.game.repository.GameMemberRepository;
import com.nihilvtt.auth.game.repository.GameRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class GameAccessService {
  private final GameRepository gameRepository;
  private final GameMemberRepository gameMemberRepository;

  public GameAccessService(
      GameRepository gameRepository,
      GameMemberRepository gameMemberRepository
  ) {
    this.gameRepository = gameRepository;
    this.gameMemberRepository = gameMemberRepository;
  }

  @Transactional(readOnly = true)
  public GameEntity requireGameWithAccess(Long gameId, Long userId) {
    GameEntity game = gameRepository.findById(gameId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Jogo não encontrado."));

    if (hasAccess(gameId, userId, game)) {
      return game;
    }

    throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Você não possui acesso a este jogo.");
  }

  @Transactional(readOnly = true)
  public boolean hasAccess(Long gameId, Long userId) {
    return gameRepository.findById(gameId)
        .map(game -> hasAccess(gameId, userId, game))
        .orElse(false);
  }

  private boolean hasAccess(Long gameId, Long userId, GameEntity game) {
    if (game.getOwner().getId().equals(userId)) {
      return true;
    }
    return gameMemberRepository.existsByGameIdAndUserId(gameId, userId);
  }
}
