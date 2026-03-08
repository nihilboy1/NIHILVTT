package com.nihilvtt.auth.game.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

public record StartCombatRequest(
    @NotEmpty(message = "Selecione ao menos um token para iniciar combate.")
    List<String> tokenIds,
    @NotBlank(message = "Modo de combate é obrigatório.")
    String mode,
    @Valid
    List<@Valid TeamAssignmentRequest> teams
) {

  public record TeamAssignmentRequest(
      @NotBlank(message = "teamId é obrigatório.")
      String teamId,
      @NotEmpty(message = "Cada time precisa ter ao menos um token.")
      List<String> tokenIds
  ) {
  }
}
