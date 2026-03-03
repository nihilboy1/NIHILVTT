package com.nihilvtt.auth.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record ReauthRequest(
    @NotBlank String currentPassword
) {}
