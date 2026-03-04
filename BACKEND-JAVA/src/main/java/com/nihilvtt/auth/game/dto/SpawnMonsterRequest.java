package com.nihilvtt.auth.game.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record SpawnMonsterRequest(
    @NotBlank(message = "monsterId é obrigatório.")
    String monsterId,
    String nameOverride,
    String sceneId,
    @Min(value = 0, message = "Posição X inválida.")
    Integer x,
    @Min(value = 0, message = "Posição Y inválida.")
    Integer y
) {}
