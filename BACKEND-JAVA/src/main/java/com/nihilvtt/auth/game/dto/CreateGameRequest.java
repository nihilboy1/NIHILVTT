package com.nihilvtt.auth.game.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateGameRequest(
    @NotBlank @Size(min = 3, max = 120) String title,
    @Size(max = 1000) String description
) {}
