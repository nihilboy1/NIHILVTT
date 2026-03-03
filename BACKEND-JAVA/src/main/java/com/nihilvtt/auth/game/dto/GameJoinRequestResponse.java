package com.nihilvtt.auth.game.dto;

import java.time.Instant;

public record GameJoinRequestResponse(
    Long id,
    String status,
    Instant requestedAt,
    Instant reviewedAt,
    Long reviewedByUserId,
    GameResponse game,
    GameOwnerResponse requester
) {}
