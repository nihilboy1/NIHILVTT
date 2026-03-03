package com.nihilvtt.auth.game.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateCharacterEquipmentRequest(
    @NotBlank(message = "Personagem é obrigatório.")
    @Size(max = 120, message = "Personagem inválido.")
    String characterId,
    @NotBlank(message = "Slot é obrigatório.")
    @Size(max = 60, message = "Slot inválido.")
    String slot,
    @Size(max = 120, message = "Item inválido.")
    String itemId
) {}
