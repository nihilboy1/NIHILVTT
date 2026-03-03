# FRONTEND Architecture

Referencia arquitetural do frontend NIHILVTT.

## Padrao de arquitetura

A aplicacao segue Feature-Sliced Design (FSD):

```text
src/
|- app
|- pages
|- widgets
|- features
|- entities
|- shared
```

Regra de dependencia (descendente):
`app -> pages -> widgets -> features -> entities -> shared`

## Bootstrap e roteamento

- Entrypoint: `src/app/index.tsx`
- Shell: `src/app/App.tsx`
- Router central: `src/app/router.tsx`
- Bootstrap de sessao: `initializeAuth()` executado no mount do router.
- Politica de expiracao de sessao: listener de `AUTH_SESSION_EXPIRED_EVENT` faz logout e redireciona para `/login`.

## Rotas

Publicas:
- `/` -> `HomePage`
- `/login` -> `LoginPage`
- `/register` -> `RegisterPage`

Protegidas (`ProtectedRoute`):
- `/dashboard` -> `DashboardPage`
- `/campaigns` -> `CampaignsPage`
- `/game/:gameId` -> `GamePage`
- `/profile` -> `ProfilePage`
- `/games/new` -> `NewGamePage`

Fallback:
- rota invalida redireciona para `/`
- Fonte de verdade para rotas: `src/app/router.tsx`.

## Estado global

- Zustand para estado de dominio.
- Convencao usada no projeto: stores por dominio em `model/`, com nomes como `authStore.ts`, `gameStore.ts`, `sessionModalStore.ts`, `authModalStore.ts` e `store.ts` quando aplicavel.

## Comandos de chat

- Fonte unica de verdade dos comandos: `src/widgets/chatPanel/lib/chatCommands.ts`.
- `ChatPanel` executa os comandos via `findCommand/getAllCommands`.
- `useChatStore.handleChatInput` trata apenas mensagens de texto (nao faz parse de comandos slash).

## Sessao de jogo

`src/pages/GamePage.tsx` compoe o fluxo principal com:

- `Toolbar`
- `GameBoard`
- `RightSidebar`
- `SessionModalManager`

Fluxo de entrada em mesa:
- carrega metadados do jogo (`loadCurrentGameById`).
- busca snapshot server-side (`GET /games/{gameId}/session-state`).
- hidrata stores locais (`characters`, `tokens`, `chat`) via `gameSessionHydrator`.
- em falha de snapshot, aplica reset seguro de estado local para evitar vazamento entre mesas.

### Character Builder na sessao

- Entrada de criacao de personagem: `widgets/charactersPanel/ui/CharactersPanel.tsx` abre `characterbuilderModal`.
- O builder consome dados do datamodeling (`species`, `origin`, `class`, `feat`) para renderizar opcoes fixas.
- Finalizacao atual:
  - `CharacterBuilderModal` chama `handleFinish` do hook `useCharacterBuilder`.
  - `handleFinish` monta `PlayerCharacter` de nivel 1 via mapper (`buildPlayerCharacterFromBuilder`).
  - Em rota de jogo (`/game/:gameId`), o modal envia comando autoritativo (`POST /games/{gameId}/session/characters`) e aplica evento `CHARACTER_CREATED`.
  - Fora de rota de jogo, `handleFinish` usa fallback local no `useCharactersStore`.
- Remocao em sessao de jogo:
  - `CharactersPanel` envia comando autoritativo (`POST /games/{gameId}/session/characters/remove`) e aplica evento `CHARACTER_REMOVED`.
  - Fora de rota de jogo, o fluxo permanece local.

## Sincronizacao de sessao (multiplayer incremental)

- Endpoint de snapshot: `GET /games/{gameId}/session-state`.
- Contrato base de sincronizacao inclui:
  - `serverVersion` (controle de versao do estado da sessao)
  - `state` (snapshot serializado: `characters`, `tokens`, `messages`)
  - `recentEvents` (reservado para pipeline realtime incremental)
- Canal realtime STOMP ativo:
  - websocket endpoint: `/ws`
  - topico por jogo: `/topic/games.{gameId}.events`
  - autenticacao no `CONNECT` via header `Authorization: Bearer <accessToken>`
  - autorizacao de `SUBSCRIBE` por membro/dono do jogo
- Verticais implementadas:
  - chat textual autoritativo (`POST /games/{gameId}/session/chat-messages` -> `CHAT_MESSAGE_CREATED`)
  - `/roll` autoritativo (`POST /games/{gameId}/session/dice-rolls` -> `DICE_ROLLED`)
  - criacao de token autoritativa (`POST /games/{gameId}/session/tokens` -> `TOKEN_CREATED`)
  - movimento de token autoritativo (`POST /games/{gameId}/session/tokens/move` -> `TOKEN_MOVED`)
  - remocao de token autoritativa (`POST /games/{gameId}/session/tokens/remove` -> `TOKEN_REMOVED`)
  - criacao de personagem autoritativa (`POST /games/{gameId}/session/characters` -> `CHARACTER_CREATED`)
  - remocao de personagem autoritativa (`POST /games/{gameId}/session/characters/remove` -> `CHARACTER_REMOVED`)
  - HP de personagem autoritativo (`POST /games/{gameId}/session/characters/hp` -> `CHARACTER_HP_UPDATED`)
  - limpeza global de chat autoritativa e restrita ao mestre (`POST /games/{gameId}/session/chat/clear` -> `CHAT_HISTORY_CLEARED`)
  - revogacao de acesso de membro (`POST /games/{gameId}/members/{memberUserId}/revoke` -> `MEMBER_REVOKED`)
- Render de mensagem propria no chat usa `senderUserId` quando disponivel (fallback por nome).
- Cliente alvo de `MEMBER_REVOKED` encerra a sessao local da mesa e redireciona para `/dashboard`.
- Jogo revogado e removido da lista local imediatamente; backend tambem deixa de listar esse jogo para o usuario expulso em `GET /games/active`.
- Payload de mensagem realtime/snapshot inclui `senderColor` (hex), usado para colorir o nome de quem enviou.

## Identidade visual de participantes

- Contrato de jogador no frontend inclui `colorHex` em `GamePlayerResponse`.
- `colorHex` e definido e persistido no backend por membro da mesa (inclusive mestre).
- O chat usa `senderColor` vindo do backend, sem gerar cor local no cliente, para manter consistencia entre navegadores/dispositivos.

## Sessao e autenticacao no cliente

- Nao persistir dados de sessao/autenticacao em `localStorage`/`sessionStorage`.
- `access token` mantido apenas em memoria.
- Recuperacao de sessao no bootstrap por `/auth/refresh` (cookie HttpOnly).
- Interceptores de autenticacao e refresh centralizados em `src/features/auth/model/authSlice.ts` (`authApi`).
- Modulos de dominio (como `src/features/game/model/gameApi.ts`) consomem o cliente autenticado central, sem duplicar logica de refresh.

## Modais

`src/widgets/sessionModalManager/ui/SessionModalManager.tsx` orquestra `modalStack`.

Modais mapeados:
- `simpleName`
- `sheet`
- `actionEdit`
- `characterbuilderModal`
- `hpControl`
- `confirmationModal`

Modais de autenticacao (fluxo de cadastro/login) sao orquestrados separadamente em:
- `src/widgets/authModalManager/ui/AuthModalManager.tsx`

Store de modais:
- Sessao de jogo: `src/features/modalManager/model/sessionModalStore.ts`
- Autenticacao: `src/features/modalManager/model/authModalStore.ts`

## Alias e estilos

- Alias `@` -> `src` em `vite.config.ts` e `tsconfig.app.json`.
- Estilos globais em `src/app/styles/index.css`.
