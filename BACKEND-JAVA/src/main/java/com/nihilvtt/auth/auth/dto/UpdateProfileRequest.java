package com.nihilvtt.auth.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateProfileRequest(
    @Size(min = 3, max = 120) String name,
    @Size(min = 8, max = 120) String newPassword,
    @Size(max = 2048) String avatarUrl,
    @NotBlank String currentPassword
) {}
