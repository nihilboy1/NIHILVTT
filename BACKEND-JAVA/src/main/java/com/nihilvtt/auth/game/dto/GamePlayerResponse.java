package com.nihilvtt.auth.game.dto;

public record GamePlayerResponse(
    Long id,
    String name,
    String colorHex,
    boolean isOwner
) {}
