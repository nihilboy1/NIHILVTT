package com.nihilvtt.auth.game.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SubmitJoinRequestRequest(
    @NotBlank @Size(min = 4, max = 12) String joinCode
) {}
