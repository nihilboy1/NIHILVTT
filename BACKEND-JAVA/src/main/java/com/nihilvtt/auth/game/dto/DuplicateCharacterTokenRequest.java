package com.nihilvtt.auth.game.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record DuplicateCharacterTokenRequest(
    @NotBlank(message = "Personagem é obrigatório.")
    @Size(max = 120, message = "Personagem inválido.")
    String characterId,
    @NotBlank(message = "Scene é obrigatória.")
    @Size(max = 120, message = "Scene inválida.")
    String sceneId,
    @NotNull(message = "Posição X é obrigatória.")
    @Min(value = 0, message = "Posição X inválida.")
    Integer x,
    @NotNull(message = "Posição Y é obrigatória.")
    @Min(value = 0, message = "Posição Y inválida.")
    Integer y
) {}
