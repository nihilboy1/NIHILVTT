package com.nihilvtt.auth.game.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ResolveAttackRequest(
    @NotBlank(message = "Token atacante é obrigatório.")
    @Size(max = 120, message = "Token atacante inválido.")
    String attackerTokenId,
    @NotBlank(message = "Token alvo é obrigatório.")
    @Size(max = 120, message = "Token alvo inválido.")
    String targetTokenId,
    @NotBlank(message = "Ataque é obrigatório.")
    @Size(max = 120, message = "Ataque inválido.")
    String attackId,
    @NotBlank(message = "Nome do ataque é obrigatório.")
    @Size(max = 200, message = "Nome do ataque inválido.")
    String attackName,
    @NotNull(message = "Bônus de ataque é obrigatório.")
    Integer attackBonus,
    @NotBlank(message = "Fórmula de dano é obrigatória.")
    @Size(max = 80, message = "Fórmula de dano inválida.")
    String damageFormula,
    @NotBlank(message = "Tipo de dano é obrigatório.")
    @Size(max = 40, message = "Tipo de dano inválido.")
    String attackDamageType
) {}
