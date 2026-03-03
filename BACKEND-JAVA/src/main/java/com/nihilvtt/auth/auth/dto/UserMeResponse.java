package com.nihilvtt.auth.auth.dto;

public record UserMeResponse(
    Long id,
    String name,
    String email,
    String role,
    String avatarUrl
) {}
