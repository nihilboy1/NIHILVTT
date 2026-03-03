package com.nihilvtt.auth.game.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateGameNicknameRequest(
    @NotBlank @Size(min = 1, max = 30) String nickname
) {}
