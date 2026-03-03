# NIHILVTT

Monorepo do NIHILVTT (Virtual Tabletop).

## Modulos

- `FRONTEND/`: aplicacao web (React + TypeScript)
  - Guia: `FRONTEND/README.md`
  - Arquitetura: `FRONTEND/ARCHITECTURE.md`
  - Ambiente: `FRONTEND/ENVIRONMENT.md`
  - Roadmap: `FRONTEND/ROADMAP.md`
- `BACKEND-JAVA/`: API de autenticacao e jogos (Spring Boot)
  - Guia: `BACKEND-JAVA/README.md`
- `DATAMODELING/`: schemas, dados e ferramentas de validacao
  - Guia: `DATAMODELING/README.md`
  - Brief de revisao: `DATAMODELING/REVIEW_BRIEF.md`
  - Direcao atual: evoluir para `catalogo + runtime tipado`, mantendo separacao explicita entre regras estaticas e estado vivo da ficha

## Sincronizacao de mesa (estado atual)

- Snapshot server-side versionado para mesa multiplayer:
  - `GET /games/{gameId}/session-state`
  - hidratacao do frontend ao entrar em `/game/:gameId`
- Primeira vertical realtime ativa (chat):
  - comando autoritativo no backend (`POST /games/{gameId}/session/chat-messages`)
  - broadcast STOMP por jogo (`/topic/games.{gameId}.events`)
- Realtime de rolagem ativo:
  - comando autoritativo (`POST /games/{gameId}/session/dice-rolls`)
  - broadcast `DICE_ROLLED` no mesmo topico da mesa
- Realtime de movimento de token ativo:
  - comando autoritativo de criacao (`POST /games/{gameId}/session/tokens`)
  - comando autoritativo (`POST /games/{gameId}/session/tokens/move`)
  - comando autoritativo de remocao (`POST /games/{gameId}/session/tokens/remove`)
  - broadcast `TOKEN_CREATED`/`TOKEN_MOVED`/`TOKEN_REMOVED` no mesmo topico da mesa
- Realtime de HP de personagem ativo:
  - comando autoritativo (`POST /games/{gameId}/session/characters/hp`)
  - broadcast `CHARACTER_HP_UPDATED` no mesmo topico da mesa
- Expulsao de membro com efeito realtime:
  - mestre executa revoke (`POST /games/{gameId}/members/{memberUserId}/revoke`)
  - backend publica `MEMBER_REVOKED`, registra bloqueio do usuario no jogo e o cliente alvo retorna ao dashboard
  - jogo revogado deixa de aparecer em `Jogos Ativos` para o usuario expulso
  - recriar conta com o mesmo email nao remove esse bloqueio
- Identidade visual persistente por membro:
  - backend persiste `colorHex` por participante (incluindo mestre)
  - chat renderiza nome com `senderColor` vindo do servidor
- Evolucao incremental em andamento para tokens/HP/rolagens.
- Diretriz atual de arquitetura: fluxos de sessao devem operar exclusivamente sobre runtime tipado compartilhado (`PlayerCharacterState` e derivados), sem caminhos de compatibilidade para payloads antigos ou estruturas legadas em inventario/equipamento.
- Diretriz atual de runtime: o projeto nao faz suporte legado nem backfill automatico para personagens/estados antigos; contratos novos devem falhar cedo quando estiverem incompletos ou invalidos.
- Diretriz atual para itens: frontend e backend devem consumir o catálogo canônico de itens (e o manifest derivado dele), sem filtrar ou validar por prefixo de `id`.
- Diretriz atual de mesas: toda criacao de jogo nasce com capacidade fixa de `1 mestre + 5 jogadores` (`6` participantes no total), sem configuracao editavel desse limite.
- O mestre pode excluir um jogo a partir do dashboard; essa exclusao remove o jogo e todos os registros vinculados a ele no backend.
- O card de jogo no dashboard agora reserva uma área dedicada para capa de mesa; o mestre pode enviar/trocar essa capa com crop antes do upload.
- A mesa agora suporta estado formal de combate (`combat`) persistido no snapshot, com `round`, `turnIndex` e `participants[]`; o mestre pode iniciar/avancar/encerrar combate, e o primeiro ataque fora de combate inicia esse estado automaticamente com atacante + alvo.

## Setup local (basico)

1. Inicie o backend:
   - `cd BACKEND-JAVA`
   - `mvn spring-boot:run`
2. Em outro terminal, inicie o frontend:
   - `cd FRONTEND`
   - `pnpm install`
   - `pnpm dev`

## Scripts na raiz

- `pnpm dev:front`
- `pnpm dev:back`
- `pnpm test:front`
- `pnpm test:e2e:front`
- `pnpm test:front:all`
- `SCRIPTS/launchers/reset-dev.bat`
  - encerra instancias antigas do backend/frontend abertas por ele e libera as portas padrao (`8080` e `5173`)
  - abre o backend e o frontend em janelas separadas
  - fecha automaticamente as janelas quando os processos terminam
  - reinicia o ambiente sem limpar o banco local
- `SCRIPTS/launchers/reset-db.bat`
  - encerra instancias antigas do backend/frontend abertas por ele e libera as portas padrao (`8080` e `5173`)
  - limpa e recria o banco local H2 com Flyway (`clean` + `migrate`)
  - nao reabre backend/frontend automaticamente; use quando voce quiser resetar os dados explicitamente
- `SCRIPTS/launchers/create-reset-dev-shortcut.ps1`
  - gera/atualiza `SCRIPTS/launchers/NIHILVTT RESET APP.lnk`
  - usa `SCRIPTS/assets/d20-purple.ico` como icone do atalho (variante roxa `#522678`)
  - esse `.lnk` pode ser usado para fixar o reset na barra de tarefas do Windows

## Contribuicao

1. Crie uma branch de feature.
2. Faça commits pequenos e descritivos.
3. Atualize os READMEs impactados quando novos padroes tecnicos forem estabelecidos.
4. Abra PR com contexto tecnico e passos de validacao.

## Licenca

MIT.
