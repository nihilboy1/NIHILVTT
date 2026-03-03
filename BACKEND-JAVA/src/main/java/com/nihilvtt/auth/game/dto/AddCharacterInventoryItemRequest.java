package com.nihilvtt.auth.game.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AddCharacterInventoryItemRequest(
    @NotBlank(message = "Personagem é obrigatório.")
    @Size(max = 120, message = "Personagem inválido.")
    String characterId,
    @NotBlank(message = "Item é obrigatório.")
    @Size(max = 120, message = "Item inválido.")
    String itemId,
    @NotNull(message = "Quantidade é obrigatória.")
    @Min(value = 1, message = "Quantidade deve ser no mínimo 1.")
    @Max(value = 999, message = "Quantidade deve ser no máximo 999.")
    Integer quantity
) {}
