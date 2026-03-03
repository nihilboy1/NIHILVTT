package com.nihilvtt.auth.game.dto;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.validation.constraints.NotNull;

public record CreateCharacterRequest(
    @NotNull(message = "Personagem é obrigatório.")
    JsonNode character
) {}
