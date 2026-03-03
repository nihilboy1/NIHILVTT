package com.nihilvtt.auth.game.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UpdateCharacterHpRequest(
    @NotBlank(message = "Personagem é obrigatório.")
    @Size(max = 120, message = "Personagem inválido.")
    String characterId,
    @NotBlank(message = "Modo de alteração de HP é obrigatório.")
    @Size(max = 20, message = "Modo de alteração de HP inválido.")
    String mode,
    @NotNull(message = "Quantidade é obrigatória.")
    @Min(value = 1, message = "Quantidade inválida.")
    Integer amount
) {}
