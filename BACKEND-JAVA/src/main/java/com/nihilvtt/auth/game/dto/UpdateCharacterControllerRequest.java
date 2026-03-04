package com.nihilvtt.auth.game.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record UpdateCharacterControllerRequest(
    @NotBlank(message = "Personagem é obrigatório.")
    @Size(max = 120, message = "Personagem inválido.")
    String characterId,
    @Positive(message = "Controlador inválido.")
    Long controlledByUserId
) {}
