package com.nihilvtt.auth.auth.dto;

public record AuthResponse(
    String accessToken,
    UserMeResponse user
) {}
