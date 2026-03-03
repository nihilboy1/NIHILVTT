# FRONTEND Roadmap

## Melhorias de curto prazo

1. Revisar UX de mensagens de erro/comandos no chat para manter consistencia entre validacao e execucao.

## Concluido recentemente

1. Parser de comando `/roll` tolerante a espacos e formatos compactos, com suporte a expressoes aditivas/subtrativas compostas (ex.: `/roll 2d6 + 1d4 - 3`).
2. Unificacao de `defaultMonsterData` e `defaultPlayerData` em `sheetDefaults.ts`.
3. Persistencia de sessao endurecida: sem `localStorage/sessionStorage` para `user` e `access token`.
4. Refresh de autenticacao centralizado no `authApi` (`features/auth/model/authSlice.ts`), removendo duplicacao em APIs de dominio.
5. Pipeline de comandos de chat unificado (remocao do parser paralelo na store).
6. Fundacao de sincronizacao multiplayer: snapshot server-side versionado (`/games/{gameId}/session-state`) com hidratacao de estado no `GamePage`.
7. Realtime de chat e `/roll` implementado com backend autoritativo + STOMP por jogo (`CHAT_MESSAGE_CREATED` e `DICE_ROLLED`).
8. Limpeza global do chat (somente mestre) implementada de forma autoritativa e sincronizada (`CHAT_HISTORY_CLEARED`).
9. Character Builder passou a finalizar com criacao real de ficha local (nivel 1) usando dados fixos do datamodeling (species/origin/class/feat).
10. IDs de classe do builder alinhados ao datamodeling (`PHB2024CLASSES`), removendo ids locais desconectados.
11. Criacao/remocao de personagem em `/game/:gameId` migrada para comando autoritativo + realtime (`CHARACTER_CREATED`/`CHARACTER_REMOVED`) com fallback local fora da sessao.

## Projetos maiores

1. Migrar testes de Jest para Vitest.
2. Avaliar adocao de Dependabot e Husky para automacao de rotina.
3. Evoluir sincronizacao realtime para tokens/HP/rolagens mantendo servidor autoritativo e versionamento.
