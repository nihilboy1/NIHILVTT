package com.nihilvtt.auth.game.dto;

import com.fasterxml.jackson.databind.JsonNode;
import java.time.Instant;

public record GameSessionEventResponse(
    String eventId,
    Long gameId,
    Long serverVersion,
    String type,
    Long actorUserId,
    JsonNode payload,
    Instant createdAt
) {}
