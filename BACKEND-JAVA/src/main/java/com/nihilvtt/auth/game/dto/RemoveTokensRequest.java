package com.nihilvtt.auth.game.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import java.util.List;

public record RemoveTokensRequest(
    @NotEmpty(message = "Tokens são obrigatórios.")
    @Size(max = 200, message = "Quantidade de tokens inválida.")
    List<
        @NotBlank(message = "Token é obrigatório.")
        @Size(max = 120, message = "Token inválido.")
        String
    > tokenIds
) {}
