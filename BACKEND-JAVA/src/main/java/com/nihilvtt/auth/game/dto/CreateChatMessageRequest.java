package com.nihilvtt.auth.game.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateChatMessageRequest(
    @NotBlank(message = "Mensagem é obrigatória.")
    @Size(max = 2000, message = "Mensagem deve ter no máximo 2000 caracteres.")
    String text
) {}
