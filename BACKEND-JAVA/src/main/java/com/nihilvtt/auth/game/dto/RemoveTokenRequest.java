package com.nihilvtt.auth.game.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RemoveTokenRequest(
    @NotBlank(message = "Token é obrigatório.")
    @Size(max = 120, message = "Token inválido.")
    String tokenId
) {}
