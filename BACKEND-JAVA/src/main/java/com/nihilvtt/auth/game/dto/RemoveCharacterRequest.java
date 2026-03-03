package com.nihilvtt.auth.game.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RemoveCharacterRequest(
    @NotBlank(message = "Personagem é obrigatório.")
    @Size(max = 120, message = "Personagem inválido.")
    String characterId
) {}
