package com.nihilvtt.auth.game.dto;

import java.time.Instant;
import java.util.List;

public record GameResponse(
    Long id,
    String title,
    String description,
    String joinCode,
    String coverImageUrl,
    Integer maxPlayers,
    Integer currentPlayers,
    String status,
    Instant createdAt,
    GameOwnerResponse owner,
    List<GamePlayerResponse> players
) {}
