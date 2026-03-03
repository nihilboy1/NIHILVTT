package com.nihilvtt.auth.game.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateDiceRollRequest(
    @NotBlank(message = "Formula é obrigatória.")
    @Size(max = 80, message = "Formula deve ter no máximo 80 caracteres.")
    String formula,
    @Size(max = 120, message = "Nome da rolagem deve ter no máximo 120 caracteres.")
    String rollName,
    @Size(max = 40, message = "Categoria inválida.")
    String category
) {}
