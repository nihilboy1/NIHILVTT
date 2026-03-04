# BACKEND-JAVA

API de autenticacao e jogos do NIHILVTT com Spring Boot.

Este README e um guia operacional do modulo: stack, endpoints, setup local e diretrizes de persistencia da sessao.

Regra editorial do modulo:

- o backend do NIHILVTT esta em pre-versao; documentacao e implementacao devem assumir apenas contratos atuais, sem qualquer suporte legado

## Stack

- Java 21
- Spring Boot 3
- Spring Security
- JWT (access token)
- Refresh token rotativo em cookie HttpOnly
- H2 (desenvolvimento)

## Endpoints

Auth:
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/reauth`
- `POST /auth/refresh`
- `GET /auth/me` (Bearer token)
- `PATCH /auth/profile`
- `POST /auth/profile/avatar` (multipart/form-data)
- `POST /auth/logout`
- `POST /auth/account/delete`

Jogos:
- `GET /games/active`
- `POST /games`
  - capacidade fixa: `1 mestre + 5 jogadores` (`6` participantes no total)
- `GET /games/{gameId}`
- `DELETE /games/{gameId}` (exclusao total do jogo pelo mestre)
- `POST /games/{gameId}/cover` (upload de capa da mesa pelo mestre; multipart/form-data)
- `GET /games/{gameId}/session-state` (snapshot de estado da mesa, versionado)
- `POST /games/{gameId}/session/chat-messages` (comando autoritativo de chat)
- `POST /games/{gameId}/session/dice-rolls` (comando autoritativo de rolagem)
- `POST /games/{gameId}/session/chat/clear` (limpeza autoritativa do chat, apenas mestre)
- `POST /games/{gameId}/session/tokens` (comando autoritativo de criação de token)
- `POST /games/{gameId}/session/tokens/move` (comando autoritativo de movimento de token)
- `POST /games/{gameId}/session/tokens/remove` (comando autoritativo de remoção de token)
- `POST /games/{gameId}/session/tokens/remove-batch` (comando autoritativo de remoção em lote de tokens)
- `POST /games/{gameId}/session/combat/start` (inicia combate formal com tokens selecionados; apenas mestre)
- `POST /games/{gameId}/session/combat/next-turn` (avança a ordem de iniciativa; apenas mestre)
- `POST /games/{gameId}/session/combat/end` (encerra o combate ativo; apenas mestre)
- `POST /games/{gameId}/session/combat/attacks` (resolução autoritativa de ataque entre tokens)
- `POST /games/{gameId}/session/characters` (comando autoritativo de criação de personagem em runtime; atualmente restrito a `PlayerCharacterState`)
- `POST /games/{gameId}/session/monsters` (comando autoritativo de spawn de `MonsterCharacterState` por `monsterId`; apenas mestre; pode criar token no mesmo commit quando `sceneId` + `x` + `y` forem enviados)
- `POST /games/{gameId}/session/characters/duplicate` (comando autoritativo de clonagem persistente de personagem)
- `POST /games/{gameId}/session/characters/duplicate-with-token` (clonagem persistente + criação atômica de token)
- `POST /games/{gameId}/session/characters/remove` (comando autoritativo de remoção de personagem)
- `POST /games/{gameId}/session/characters/hp` (comando autoritativo de HP em jogo)
- `POST /games/{gameId}/session/characters/temp-hp` (comando autoritativo de HP temporário em jogo)
- `POST /games/{gameId}/session/characters/equipment` (comando autoritativo de equipar/desequipar slots suportados)
- `POST /games/{gameId}/session/characters/inventory/add` (comando autoritativo do mestre para conceder item ao inventário do personagem)
- `POST /games/{gameId}/members/{memberUserId}/revoke` (expulsao de membro pelo mestre)
- `POST /games/join-requests`
- `GET /games/join-requests/me`
- `GET /games/join-requests/pending-owned`
- `POST /games/{gameId}/join`
- `POST /games/{gameId}/join-requests/{requestId}/approve`
- `POST /games/{gameId}/join-requests/{requestId}/reject`
- `POST /games/{gameId}/leave`
- `POST /games/{gameId}/members/{memberUserId}/revoke`
- `PATCH /games/{gameId}/nickname`
- O mestre pode excluir um jogo pelo dashboard; a exclusao remove a mesa e todos os registros vinculados (estado de sessao, membros, solicitacoes e bloqueios) no backend.
- A mesa agora pode ter `coverImageUrl` persistido; apenas o mestre pode atualizar a capa via upload, o backend aceita ate `10MB` e serve os arquivos publicamente em `/media/game-covers/{fileName}`.
- Na exclusao de conta, os jogos criados pelo usuario tambem passam pela mesma rotina de exclusao completa; isso garante limpeza do avatar do usuario e das capas de mesa gerenciadas pelo backend.

## Setup rapido

1. `cd BACKEND-JAVA`
2. `mvn spring-boot:run`
3. API disponivel em `http://localhost:8080`

## Reset local do H2

- Para limpar e recriar schema local com Flyway:
  - `mvn "-Dflyway.cleanDisabled=false" "-Dflyway.url=jdbc:h2:file:./data/nihilvtt;MODE=PostgreSQL;AUTO_SERVER=TRUE" "-Dflyway.user=sa" "-Dflyway.password=sa" flyway:clean flyway:migrate`
- Baseline versionada em `V1__initial_schema.sql` (encadeando com `V2+`).

## Seguranca implementada

- Senha com BCrypt
- JWT assinado
- Refresh token armazenado em hash (SHA-256)
- Cookie de refresh com `HttpOnly` + `SameSite=Lax`
- Rotacao de refresh token no endpoint de refresh
- Protecao de login com bloqueio temporario por tentativas falhas (email/IP)

## Persistencia de sessao de mesa

- Estado base da mesa persistido em banco na tabela `game_session_state`.
- Snapshot inclui `version` (serverVersion) e payload JSON (`characters`, `tokens`, `messages`).
- O payload de snapshot deve expor `characters`, `tokens`, `messages` e `recentEvents` explicitamente; o backend nao deve omitir arrays vazios esperando que o cliente preencha defaults.
- Antes de devolver o snapshot, o backend exige que o `stateJson` persisted continue parseável e com raiz-objeto válida; se o JSON estiver corrompido, o snapshot falha explicitamente (sem fallback para estado vazio).
- O mesmo padrão vale para comandos de mutação: o backend não reconstrói estado vazio quando o `stateJson` estiver corrompido; ele falha explicitamente e interrompe a mutação.
- Antes de devolver o snapshot, o backend também revalida `state.characters` contra o contrato runtime; se houver personagem persistido inválido, o snapshot falha explicitamente em vez de propagar estado corrompido.
- Chat e rolagem realtime operam em pipeline autoritativo:
  - cliente envia comando HTTP (`POST /games/{gameId}/session/chat-messages` ou `POST /games/{gameId}/session/dice-rolls`)
  - backend persiste no snapshot, incrementa `version` e publica evento em `/topic/games.{gameId}.events`
- Payloads realtime tambem seguem contrato explicito:
  - o backend nao deve omitir campos opcionais por conveniencia
  - quando um campo existir no schema do evento, ele deve ser enviado sempre (`character: null`, `removedCharacterIds: []`, `combatChanged: false`, `combat: null`, etc.)
  - ausencia de campo nao deve ser usada como semantica de "nao mudou"
- Movimento de token segue o mesmo padrao autoritativo:
  - cliente envia `POST /games/{gameId}/session/tokens`
  - backend persiste token em `state.tokens[]`, incrementa `version` e publica `TOKEN_CREATED`
  - `createToken` valida explicitamente que o `characterId` existe em `state.characters[]` antes de persistir o token
  - `createToken` agora aplica regra explicita por tipo: `NPC` e sempre exclusivo do mestre; para `Player`, se `controlledByUserId` estiver `null`, só o mestre pode instanciar token, e se estiver definido, apenas aquele usuário pode instanciar novos tokens da ficha
  - cliente envia `POST /games/{gameId}/session/tokens/move`
  - backend atualiza `state.tokens[].position`, incrementa `version` e publica `TOKEN_MOVED`
  - cliente envia `POST /games/{gameId}/session/tokens/remove`
  - apenas o mestre pode executar a remocao de token
  - backend remove token de `state.tokens[]`, incrementa `version` e publica `TOKEN_REMOVED`
  - cliente envia `POST /games/{gameId}/session/tokens/remove-batch`
  - o backend remove todos os tokens solicitados em um unico commit de snapshot, incrementa `version` uma unica vez e publica `TOKENS_REMOVED`, evitando race condition de \"ultima gravação vence\" em delecao em massa
  - se o token removido for o ultimo token de um personagem clonado em sessao (`isSessionClone`), o backend remove automaticamente a ficha clone de `state.characters[]` e inclui `removedCharacterId` no evento `TOKEN_REMOVED`
- HP de personagem em jogo segue padrao autoritativo:
  - cliente envia `POST /games/{gameId}/session/characters`
  - backend valida o payload antes de persistir; o contrato canonico da sessao e o runtime de personagem (`PlayerCharacterState`), sem fallback para payloads antigos
  - a validacao de criacao agora e estruturalmente profunda: `build`, `inventory.items[]`, slots de `equipment`, `resourcePools.pools[]` e `activeEffects.effects[]` precisam respeitar o shape esperado ja na borda de entrada
  - backend persiste em `state.characters[]`, incrementa `version` e publica `CHARACTER_CREATED`
  - cliente envia `POST /games/{gameId}/session/characters/duplicate`
  - backend clona o personagem runtime com novo `id`, gera um novo nome derivado no formato `Nome [N]`, incrementa `version` e publica `CHARACTER_CREATED`
  - quando a origem da duplicacao e um `NPC`, o backend nao clona o runtime mutavel; ele instancia um novo `MonsterCharacterState` fresco a partir do mesmo `monsterId` (preservando apenas overrides visuais/textuais), mantendo HP/recursos/efeitos resetados como no spawn da Biblioteca
  - cliente envia `POST /games/{gameId}/session/characters/duplicate-with-token`
  - backend executa a clonagem e a criação do token no mesmo commit, incrementa `version` uma única vez e publica `TOKEN_CREATED` com `character` + `token` no payload, evitando clones órfãos no fluxo de `Ctrl+V`
  - quando a origem da duplicacao com token e um `NPC`, a regra acima tambem vale e apenas o mestre pode executar esse fluxo
  - cliente envia `POST /games/{gameId}/session/characters/remove`
  - backend remove de `state.characters[]`, remove tokens vinculados em `state.tokens[]`, incrementa `version` e publica `CHARACTER_REMOVED`
  - cliente envia `POST /games/{gameId}/session/characters/hp`
  - o comando recebe `mode` (`damage`/`heal`) e `amount`, e o backend calcula o HP final autoritativamente
  - o runtime de personagem exige `hitPoints.max`; ele e a fonte canonica de clamp para HP atual e de exibicao de HP maximo na ficha
  - sessao de jogo nao faz mais compatibilidade nem backfill para personagens sem `hitPoints.max`; runtime sem esse campo deve falhar cedo como violacao de contrato
  - o backend nao deve tentar reparar estados em runtime: contratos invalidos ou incompletos devem falhar cedo, em vez de serem corrigidos automaticamente
  - dano em runtime passa a consumir `hitPoints.temporary` antes de reduzir `hitPoints.current`
  - cliente envia `POST /games/{gameId}/session/characters/temp-hp`
  - o comando recebe `amount` e concede HP temporario de forma autoritativa, mantendo o maior valor entre o HP temporario atual e o novo valor concedido
  - apenas o mestre pode executar esse comando
  - backend atualiza `state.characters[].hitPoints.current`/`temporary`, incrementa `version` e publica `CHARACTER_HP_UPDATED`
  - cliente envia `POST /games/{gameId}/session/characters/equipment`
  - backend valida slot, compatibilidade e disponibilidade do item em `inventory.items[]`, atualiza `state.characters[].equipment`, incrementa `version` e publica `CHARACTER_EQUIPMENT_UPDATED`
  - mestre envia `POST /games/{gameId}/session/characters/inventory/add`
  - backend valida ownership do mestre, exige personagem runtime compatível, adiciona/empilha o item em `state.characters[].inventory.items[]`, incrementa `version` e publica `CHARACTER_INVENTORY_UPDATED`
  - o estado da mesa agora pode carregar `combat`, com `active`, `round`, `turnIndex` e `participants[]` (ordem formal de iniciativa)
  - mestre pode iniciar combate explicitamente com `POST /games/{gameId}/session/combat/start`; o backend rola iniciativa (`1d20 + DEX mod`), ordena por total/DEX/tokenId e publica `COMBAT_STARTED`
  - mestre pode avançar turno com `POST /games/{gameId}/session/combat/next-turn`; o backend atualiza `turnIndex`/`round` e publica `COMBAT_TURN_ADVANCED`
  - mestre pode encerrar combate com `POST /games/{gameId}/session/combat/end`; o backend limpa `combat` e publica `COMBAT_ENDED`
  - membro com acesso ao jogo pode enviar `POST /games/{gameId}/session/combat/attacks`
  - se nao houver combate ativo, o backend inicia combate automaticamente com atacante + alvo antes de resolver o primeiro ataque e publica `COMBAT_STARTED`
  - no MVP atual, o frontend envia `attackBonus` e `damageFormula`, e o backend deriva a CA do alvo a partir do runtime + catálogo (via `catalog/item-catalog-manifest.json`), rederiva `Ataque desarmado` internamente, valida que ataques `builtin-*` de arma só usem itens realmente equipados pelo atacante, resolve a rolagem de ataque (`1d20`), aplica hit/miss, rola dano, consome `hitPoints.temporary` antes de `hitPoints.current` e publica `ATTACK_RESOLVED`
  - quando tokens/personagens saem da mesa, o backend sincroniza `combat.participants[]`; se nao restar participante, o estado de combate e limpo
- o fluxo de concessão de item e a compatibilidade de slots passam a usar o manifest canônico `catalog/item-catalog-manifest.json`, gerado pelo `DATAMODELING`, sem heurística de prefixo no backend
- a trilha autoritativa de monstros segue o mesmo padrao: o backend consome `catalog/monster-catalog-manifest.json`, gerado pelo `DATAMODELING`, e a instanciacao de `MonsterCharacterState` deve nascer por `monsterId`, sem confiar em payload estrutural de monstro vindo do frontend
- `MonsterCharacterState` nao aceita `controlledByUserId`; no estado atual do produto, `NPC` e sempre de uso exclusivo do mestre
- a criacao de novos `MonsterCharacterState` continua estrita e nao aceita `controlledByUserId`; como o projeto ainda nao teve release, o backend nao deve tolerar residuos de contratos antigos em snapshot
- o contrato de `MonsterCharacterState` e estrito: campos nullable e arrays mutaveis (`nameOverride`, `imageOverride`, `notes`, `resourcePools.pools`, `activeEffects.effects`, `hitPoints.temporary`) precisam existir explicitamente no payload, sem `default()` implícito no schema compartilhado
- `PlayerCharacterState` segue a mesma regra de runtime explícito: `controlledByUserId`, `inspiration`, `hitPoints.temporary`, `progression`, `inventory`, `equipment`, `resourcePools` e `activeEffects` não devem ser inferidos por ausência; se o payload vier sem esses campos, o backend deve falhar cedo como violação de contrato
- a borda de validacao do backend agora trata `SessionCharacterState` por um envelope tipado unico (`id` + `type`) antes de aplicar as regras especificas de `PlayerCharacterState` ou `MonsterCharacterState`; isso reduz branching estrutural paralelo e mantem a validacao autoritativa alinhada ao contrato compartilhado
- no validador Java, campos obrigatorios de runtime tambem devem ser lidos por presenca explicita (sem depender de `path()` + `MissingNode` para seguir adiante); ausencia estrutural precisa falhar cedo na borda
- esse manifest agora expõe tambem `primaryName` e `abilityScores`, preparando resolucao autoritativa de iniciativa, rotulos e outros calculos de combate de `NPC` sem depender do frontend
- `POST /games/{gameId}/session/monsters` ja segue esse contrato: o cliente envia apenas `monsterId` + overrides mutaveis opcionais, e o backend instancia o runtime a partir do catalogo canônico
- o backend tambem deve manter testes de contrato nessas bordas: `SessionCharacterPayloadValidator` cobre `Player`/`NPC` validos e falhas estruturais explicitas, e regras criticas como duplicacao de `NPC` devem ter teste proprio para evitar regressao silenciosa
- quando `sceneId`, `x` e `y` sao enviados juntos nesse comando, o backend cria a ficha e o token de forma atomica e publica `TOKEN_CREATED` com `character` + `token`, evitando monstros órfãos por falha intermediária
- esse é o fluxo usado pela `Biblioteca` no frontend: o cliente arrasta um monstro do catálogo para o grid e envia apenas `monsterId` + posição ao backend
- HP em runtime de monstro continua sem `hitPoints.max`; comandos de dano/cura resolvem o HP máximo pelo `monster-catalog-manifest.json`, preservando o contrato enxuto de `MonsterCharacterState`
- iniciativa, CA e rótulo base de monstros em combate agora também devem ser resolvidos pelo `monster-catalog-manifest.json`; o backend não deve depender de `attributes` ou `equipment` no runtime de `NPC`
- comandos de inventario, equipamento e combate operam apenas sobre runtime tipado, sem suporte a estruturas anteriores
- Expulsao de membro tambem publica evento realtime:
  - mestre chama `POST /games/{gameId}/members/{memberUserId}/revoke`
  - backend remove membership/requests, registra bloqueio em `game_session_revocations` e `game_session_revoked_emails`, incrementa `version` e publica `MEMBER_REVOKED`
  - usuarios bloqueados nao aparecem em `GET /games/active` e nao podem solicitar/reentrar no jogo
  - bloqueio por email impede reaparecimento ao recriar conta com o mesmo email
- Eventos sao autenticados/autorizados por jogo via STOMP/WebSocket.

## Cores persistentes de membros

- Tabela `game_session_members` possui `color_hex` (persistente e obrigatorio).
- Ao criar/garantir membership, o backend atribui cor via paleta fixa de 10 cores (`GameColorPalette`).
- Regra de atribuicao: prioriza cores ainda nao usadas na mesa; quando esgotadas, reutiliza por sorteio na paleta.
- Chat e rolagens publicam `senderColor` no payload realtime para renderizacao consistente no frontend.

## Proximos passos

1. Migrar H2 para PostgreSQL.
2. Externalizar secrets em variaveis de ambiente.
3. Adicionar testes de integracao para auth e jogos.
