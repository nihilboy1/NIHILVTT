package com.nihilvtt.auth.game.dto;

import com.fasterxml.jackson.databind.JsonNode;
import java.time.Instant;
import java.util.List;

public record GameSessionSnapshotResponse(
    Long gameId,
    Long serverVersion,
    JsonNode state,
    List<GameSessionEventResponse> recentEvents,
    Instant generatedAt
) {}
