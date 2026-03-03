package com.nihilvtt.auth.game.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record StartCombatRequest(
    @NotEmpty(message = "Selecione ao menos um token para iniciar combate.")
    List<String> tokenIds
) {
}
