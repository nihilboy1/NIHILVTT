# FRONTEND

## Runtime Boundary

O frontend continua com uma camada de UI transitória para ficha e stores, mas a entrada de personagens vindos da sessao agora aceita apenas o schema compartilhado `PlayerCharacterStateSchema` de `@nihilvtt/datamodeling/runtime`.

Regra atual:

- bordas de sessao (`hydrate` e `event handlers`) devem aceitar e processar exclusivamente o runtime compartilhado
- o `Character Builder` passa a enviar `PlayerCharacterState` para o backend no fluxo autoritativo de criacao
- a store de personagens passa a normalizar entradas de sessao pelo adapter compartilhado e preserva o `PlayerCharacterState` original quando ele vier da sessao
- a ficha passa a depender de um `PlayerCharacterViewModel` nos componentes de topo, preferindo o runtime compartilhado quando ele existir
- `PrincipalHeader`, `Detalhes` e `Configuracoes` agora leem apenas view models/estado da store, sem depender do `react-hook-form` para edicao desses campos
- a navegacao da ficha foi reorganizada para um layout mais compacto, com uma aba propria de `Equipamento` preparada para o fluxo futuro de equipar itens
- a sidebar direita passa a expor uma aba `Biblioteca` (implementada pelo `CompendiumPanel`) visivel apenas para o mestre, como entrada autoritativa de concessao de itens
- os blocos de HP e combate da aba principal passam a consumir um view model dedicado que prefere runtime para nivel/atributos/HP; enquanto o runtime ainda nao carrega deslocamento resolvido, a velocidade base e derivada da especie via catalogo compartilhado, e a CA passa a ser derivada de equipamento + catalogo quando o runtime existir
- `HealthSection`, `CombatStats`, `HealthAndCombatDetails` e `AttributesAndSkillsList` agora leem estado da store e view models diretamente, sem depender de `react-hook-form` para sincronizacao desses dados; a aba principal inteira passa a ser orientada por store/view models
- `SheetModal` deixa de usar `FormProvider` e `useCharacterSheetForm`; a ficha passa a operar como shell readonly orientado por runtime/store, sem autosave local por formulario
- `useCharacterCalculations` passa a consumir um view model de calculo dedicado, em vez de ler o personagem bruto diretamente
- `AttributesAndSkillsList` e `SkillProficiencyItem` passam a consumir um view model dedicado de atributos/pericias, reduzindo regra espalhada na UI
- regras derivadas de personagem (modificador, bonus de proficiencia, multiplicador de proficiencia) passam a viver em `entities/character/model/rules`, enquanto `characterUtils` fica restrito a utilitarios de UI/infra
- quando o payload estiver no formato runtime, ele e adaptado para o modelo transitorio de UI da ficha
- a sessao opera exclusivamente com `PlayerCharacterState`; o modelo interno transitório da UI existe apenas para renderizacao enquanto a ficha nao foi migrada por completo

Aplicacao web do NIHILVTT.

## Escopo

Responsavel pela interface do usuario: autenticacao, dashboard e sessao de jogo (board, tokens, chat, ficha e modais).

## Setup rapido

1. `cd FRONTEND`
2. `pnpm install`
3. `pnpm dev`
4. Abra `http://localhost:5173`

## Scripts principais

- `pnpm dev`
- `pnpm build`
- `pnpm preview`
- `pnpm test`
- `pnpm test:coverage`
- `pnpm e2e`
- `pnpm lint`

## Integracao com backend

Defina `VITE_AUTH_API_BASE_URL` apontando para a API (ex.: `http://localhost:8080`).
Detalhes em `FRONTEND/ENVIRONMENT.md`.

## Regras de mesa

- A criacao de jogo nao expõe mais configuracao de limite de participantes.
- Toda mesa nasce com capacidade fixa de `1 mestre + 5 jogadores` (`6` participantes no total).
- A aba de configuracoes do jogo nao oferece mais edicao de quantidade de jogadores.
- No dashboard, o mestre pode excluir um jogo; a acao aparece como ícone de lixeira no card do jogo e usa confirmação forte com frase obrigatória antes de remover a mesa inteira e todo o estado vinculado a ela no backend.
- O card do jogo no dashboard foi reorganizado em duas áreas: conteúdo principal à esquerda e área de capa à direita.
- Apenas o mestre pode clicar na área de capa para enviar ou trocar a imagem da mesa.
- O upload de capa usa o mesmo fluxo base do perfil (selecao de arquivo, preview temporario local e crop antes do envio), agora com enquadramento mais horizontal (`16:10`) para combinar com a exibicao do card; a exportacao final preserva esse aspect ratio e nao força canvas quadrado.
- A selecao de capa valida imagem e limite de tamanho (`10MB`) antes de abrir o crop; quando a selecao for rejeitada, o dashboard exibe feedback visual explicito no proprio bloco de jogos.

## Padroes de sessao e persistencia

- Nao persistir `user` nem `access token` em `localStorage`/`sessionStorage`.
- Sessao no cliente:
  - `access token` apenas em memoria (runtime).
  - renovacao de sessao via `/auth/refresh` com cookie HttpOnly.
- Cliente HTTP autenticado centralizado em `features/auth/model/authSlice.ts` (`authApi`).
- APIs de dominio (ex.: `features/game/model/gameApi.ts`) reutilizam o cliente central e nao implementam refresh proprio.
- Dados de dominio (perfil, jogo, participacao) devem ser fonte de verdade no backend e sincronizados por API.
- Sessao de mesa (`/game/:gameId`) inicia com hidratação de snapshot server-side via `GET /games/{gameId}/session-state`.
- Snapshot de sessao possui `serverVersion` para suportar evolucao de sincronizacao realtime sem quebrar compatibilidade.

## Comandos de chat (`/roll`)

- Suporte atual: `XdY`, `XdY+/-Z` e expressoes compostas com soma/subtracao (ex.: `2d6+1d4-3`).
- Espacos internos e `D` maiusculo sao aceitos (ex.: `/roll 2D6 + 1d4 - 3`).
- Limites de seguranca no parser central: `X` e `Y` entre `1` e `100`, com no maximo `500` rolagens totais por expressao.
- Fora de escopo atual: multiplicacao/divisao (`*`, `/`) e parenteses.

## Character Builder (estado atual)

- O builder usa fontes fixas do datamodeling para opcoes de criacao:
  - especies (`PHB2024SPECIES`)
  - origens (`PHB2024ORIGINS`)
  - classes (`PHB2024CLASSES`, com `id` oficial da classe)
  - talentos derivados dos efeitos da origem
- Ao finalizar o modal:
  - dentro de `/game/:gameId`, o frontend envia comando autoritativo `POST /games/{gameId}/session/characters`.
  - fora de sessao de jogo, mantem fallback local no `charactersStore`.
- O mapeamento inicial resolve, para nivel 1:
  - `charClass`, `species`, `background` (origin), `attributes`
  - `combatStats` basico (HP inicial por hit die + CON, AC base por DEX, speed da especie)
  - `hitDiceEntries` e `featuresAndTraits` (species/origin/feats selecionados)
  - proficiencias aplicaveis vindas de efeitos de classe/origem/feat
- Remocao de personagem no painel segue o mesmo padrao autoritativo em sessao (`POST /games/{gameId}/session/characters/remove`).

## Realtime e sincronizacao

- Cliente STOMP ativo em `features/game/model/realtime/gameSessionRealtimeClient.ts`.
- Biblioteca: `@stomp/stompjs`.
- Fluxo atual em producao (realtime de chat e `/roll`):
  - chat textual via comando autoritativo (`sendGameChatMessage`)
  - rolagem via comando autoritativo (`sendGameDiceRoll`)
  - criacao/movimento/remocao de token via comandos autoritativos (`sendGameCreateToken`, `sendGameMoveToken`, `sendGameRemoveToken`)
  - atualizacao de HP via comando autoritativo (`sendGameCharacterHpUpdate`)
  - atualizacao de HP temporario via comando autoritativo (`sendGameCharacterTempHpUpdate`)
  - atualizacao de equipamento via comando autoritativo (`sendGameUpdateCharacterEquipment`)
  - adicao de item ao inventario via comando autoritativo do mestre (`sendGameAddCharacterInventoryItem`)
  - resolucao autoritativa de ataque entre tokens (`sendGameResolveAttack`)
  - criacao/remocao de personagem via comandos autoritativos (`sendGameCreateCharacter`, `sendGameRemoveCharacter`)
  - limpeza de histórico via comando autoritativo (`clearGameChatHistory`, somente mestre)
  - expulsao de membro via configuracoes do mestre gera evento realtime `MEMBER_REVOKED`
  - backend publica `CHAT_MESSAGE_CREATED`/`DICE_ROLLED`/`CHAT_HISTORY_CLEARED`/`TOKEN_CREATED`/`TOKEN_MOVED`/`TOKEN_REMOVED`/`CHARACTER_CREATED`/`CHARACTER_REMOVED`/`CHARACTER_HP_UPDATED`/`CHARACTER_EQUIPMENT_UPDATED`/`CHARACTER_INVENTORY_UPDATED`/`ATTACK_RESOLVED`/`MEMBER_REVOKED` em `/topic/games.{gameId}.events`
  - quando `TOKEN_REMOVED` vier com `removedCharacterId`, o frontend remove junto a ficha clone correspondente do `CharactersPanel`
  - frontend aplica evento com deduplicacao por `message.id`
- Ao receber `MEMBER_REVOKED` para o usuario autenticado, o frontend sai imediatamente da mesa e redireciona para `/dashboard`.
- Nesse caso, o jogo tambem e removido da lista local do dashboard imediatamente, e o backend nao retorna mais esse jogo em `GET /games/active` para o usuario expulso.
- O dashboard renderiza cards apenas para jogos com relacao ao usuario: dono, solicitacao pendente ou acesso aprovado.
- Identificacao visual de mensagem propria prioriza `senderUserId` (fallback para nome), reduzindo inconsistencias entre navegadores.
- Snapshot inicial (`/games/{gameId}/session-state`) continua como base para hidratacao e recuperacao.

## Cores persistentes por jogador

- Cada membro de jogo (incluindo mestre) possui `colorHex` persistido no backend (`game_session_members.color_hex`).
- Atribuicao de cor ao entrar no jogo:
  - backend sorteia entre 10 cores fixas e prioriza cores ainda nao usadas na mesa.
  - quando todas as 10 cores ja estao em uso, o backend sorteia novamente dentro da mesma paleta.
- A cor do membro e estavel no tempo (nao muda em reload/login/nova sessao do navegador).
- Mensagens de chat/rolagem carregam `senderColor`, e o frontend pinta o nome do remetente com essa cor.

## Ficha de personagem (direcao atual)

- A ficha esta sendo consolidada como painel de estado, nao como editor livre.
- O modal da ficha agora abre mais compacto, deslocado para a esquerda e com header arrastavel, para coexistir melhor com a sidebar direita (incluindo o `Compendium`).
- O modal arrastavel faz `reclamp` da posicao atual em `window.resize`, preservando a posicao escolhida pelo usuario e evitando que a ficha fique fora da viewport apos resize/zoom.
- A ficha tambem aplica uma `safe area` a direita quando a sidebar esta visivel, para se manter fora da area coberta pelo painel lateral sem recentralizar a janela.
- Alteracoes na `safe area` (como abrir/fechar a sidebar) fazem apenas `reclamp` da posicao atual; a ficha nao deve perder a posicao manual escolhida pelo usuario.
- A ficha deixa de usar overlay bloqueante: clicar fora dela nao a fecha, e a mesa/sidebar continuam interativas enquanto a ficha estiver aberta.
- O `hpControl` deixa de editar HP absoluto por input livre; ele passa a exibir HP atual/maximo e aplicar comandos contextuais de `Dano` ou `Cura` por quantidade.
- `PlayerCharacterState` passa a carregar `hitPoints.max` como parte obrigatoria do runtime; a ficha usa esse valor como fonte primaria para HP maximo.
- Sessao de jogo nao faz mais compatibilidade para personagens sem `hitPoints.max`; payload runtime sem esse campo deve falhar cedo como violacao de contrato.
- O frontend nao deve tentar "corrigir" runtime antigo em memoria: sem fallback, sem backfill e sem reparo automatico para estados de personagem incompletos.
- A alteracao de HP agora e enviada como intencao (`mode: damage|heal` + `amount`), e o backend calcula o HP final autoritativamente.
- O `hpControl` tambem oferece um comando proprio de `Temp HP`; o backend calcula o novo HP temporario autoritativamente e o dano passa a consumir HP temporario antes de reduzir HP atual.
- O `hpControl` nao remove tokens da mesa; remocao de token fica restrita a tecla `Delete` no board e apenas para o mestre.
- Quando um token removido por `Delete` for o ultimo token de uma ficha clone de sessao, a ficha clone correspondente tambem sai automaticamente do `CharactersPanel`.
- O `hpControl` agora fica fixo no canto inferior direito da viewport, respeitando a area ocupada pela sidebar direita, exibe o nome do personagem selecionado e nao usa mais ancoragem por token (`anchorPoint`).
- A remocao por `Delete` agora respeita contexto de foco de forma mais rigida: dialogs e popovers que nao sejam o proprio `hpControl` nao devem disparar remocao de token.
- Apenas o mestre pode alterar HP em jogo; o backend bloqueia esse comando e a UI desabilita a interacao para nao-mestres.
- Apenas o mestre pode acessar configuracoes de pagina e grade; jogadores continuam com acesso aos controles de zoom, mas nao veem o botao nem o modal de configuracao.
- A troca de ferramenta da toolbar nao fecha a ficha; apenas modais contextuais de token (como `hpControl`) devem responder automaticamente a essa troca.
- Modais contextuais de token devem ser fechados por nome (`closeModalByName`) e nao por fechamento generico do topo da pilha, para nao depender da ordem entre `sheet` e `hpControl`.
- Nao sao mais editaveis manualmente na UI da ficha:
  - atributos
  - proficiencias
  - classe, subclasse, origem, especie e nivel
  - HP atual, HP temporario e HP maximo
  - CA, deslocamento e estado de escudo
  - criacao e edicao manual de acoes
  - criacao e edicao manual de dados de vida
- Esses valores devem vir de runtime, catalogo e comandos autoritativos do jogo.
- A aba `Equipamento` ja suporta, em sessao de jogo, equipar/desequipar os slots runtime suportados (`bodyArmor`, `shield`, `mainHand`, `offHand`) via comando autoritativo.
- Os botoes de equipar nessa aba devem ser derivados do metadado real do item no catalogo (`type` e `onEquip_setAC`), e nao por prefixo textual de `itemId`.
- Inventario e equipamento em sessao operam apenas sobre `PlayerCharacterState` runtime; a UI nao deve mais simular esses dados a partir de modelos fora do runtime.
- A store de personagens nao descarta mais payloads invalidos de sessao silenciosamente: snapshot e eventos de personagem agora geram erro explicito quando o contrato `PlayerCharacterState` e violado.
- Handlers realtime tambem nao devem ignorar payloads invalidos de token/chat/HP silenciosamente: qualquer violacao de contrato deve ser logada com contexto e propagada para o `gameSessionRealtimeClient`, que centraliza o tratamento sem derrubar a conexao.
- Mutacoes locais (`updateCharacter`, `deleteCharacter` e `duplicateCharacter`) ficam bloqueadas para personagens runtime-backed; em sessao, personagens autoritativos so devem mudar por comandos de backend.
- No `CharactersPanel`, o menu de opcoes deve ser ancorado no proprio botao de tres pontos que o abre; o posicionamento e calculado pelo `getBoundingClientRect()` do gatilho para evitar abrir no canto da tela quando a referencia ainda nao foi montada.
- `Duplicar Personagem` no `CharactersPanel` agora cria um clone persistente autoritativo em sessao: o frontend envia um comando de duplicacao, o backend gera uma nova ficha com novo `id`, renomeia o clone no formato `Nome [N]`, publica `CHARACTER_CREATED` e a copia passa a divergir da origem a partir dali.
- No board, `Ctrl+C`/`Cmd+C` copia o token atualmente selecionado (ou o token do `hpControl` ativo) como fonte de clonagem; `Ctrl+V`/`Cmd+V` executa um comando autoritativo atômico no backend que duplica a ficha e já cria o novo token na célula atualmente visada pelo cursor no grid (com destaque visual da célula), sem janela intermediária de clone órfão. Se não houver alvo visado, o fallback continua sendo a célula adjacente.
- O token atualmente copiado para `Ctrl+C`/`Cmd+C` deve exibir um marcador visual proprio no board, deixando explicito qual token esta na area de transferencia; o modo de copia e temporario e deve ser cancelado automaticamente por qualquer clique esquerdo ou interacao de teclado que nao seja `Ctrl+V`/`Cmd+V`.
- A sidebar direita agora expõe uma aba `Biblioteca` visível apenas para o mestre; o mestre pode buscar itens diretamente do catálogo canônico `PHB2024ITEMS`, clicar em `Adicionar` e escolher, em um popup pesquisável, para qual personagem runtime o item será enviado.
- Esse popup usa `runtimeCharactersById` como fonte canônica de alvos e inventário atual, evitando depender do modelo adaptado de UI para distribuir itens.
- O `playerCharacterEquipmentViewModel` deve resolver nomes exibidos de itens pelo catálogo canônico (`PHB2024ITEMS`), priorizando a entrada PT-BR do dataset e mantendo `itemId` apenas como referência interna para comandos autoritativos.
- A UI da `Biblioteca` deve exibir tipos de item em PT-BR (`Armadura`, `Arma`, `Equipamento`, `Ferramenta`), mas a busca continua aceitando tanto os termos em ingles do catálogo quanto os rótulos traduzidos.
- Feedbacks transitórios de sucesso/erro no frontend devem usar `sonner` (`Toaster` global em `App.tsx`), em vez de toasts locais improvisados por página.
- O `playerCharacterViewModel` deve resolver labels de classe, origem e espécie pelo catálogo canônico, evitando exibir `classId`, `originId` e `specieId` crus no topo da ficha.
- Esse popup permanece aberto após cada envio bem-sucedido, marcando quantas vezes o item já foi concedido para cada personagem durante a sessão atual do popup, para facilitar distribuicao em lote.
- O popup também mostra, para cada alvo, quantas unidades daquele item ele já possui no inventário runtime atual, para evitar distribuicao cega.
- Falhas ao adicionar item permanecem visíveis dentro do próprio popup, para nao ficarem escondidas atras do modal durante a distribuicao.
- O popup oferece controle simples de quantidade (`+1`, `+5` e input curto), e cada envio usa essa quantidade atual sem fechar o fluxo de distribuicao.
- A seção `Acoes` sempre inclui `Ataque desarmado` como ação base derivada na UI, mesmo sem armas equipadas.
- Quando houver runtime de equipamento, a seção `Acoes` também deriva ataques das armas equipadas (`mainHand` e `offHand`) a partir do catálogo de itens.
- Para personagens runtime-backed, a seção `Acoes` nao deve misturar fallback local de `character.actions`; o runtime e os derivados passam a ser a fonte primária.
- O bônus de ataque dessas armas só soma bônus de proficiência quando o runtime conseguir provar, pelo catálogo da classe, proficiência automática no `weaponType` da arma (`simple`/`martial`).
- O fluxo de combate entre tokens usa uma barra de `Ações do Token` projetada como painel arrastável; cada ação é projetada como `AttackEntry` (incluindo `rangeMeters`), clicar em uma ação arma um `pendingAttack`, o alcance da ação é exibido no board ao redor do atacante e o clique no token alvo só avança se ele estiver dentro desse alcance.
- A mesa agora pode entrar em combate formal: o frontend hidrata `combatState` a partir do snapshot/eventos e projeta uma `InitiativeTrack` como painel arrastável.
- Painéis flutuantes arrastáveis da mesa (como `Ações do Token` e `InitiativeTrack`) seguem o mesmo padrão de drag manual da ficha: arraste direto por uma área de header/handle ampliada, com `mousemove` document-level, `safeArea` da viewport e `reclamp` em resize/mudança de layout.
- O mestre pode iniciar combate explicitamente com os tokens atualmente selecionados (`Iniciar combate`), e a trilha passa a refletir `round`, `turnIndex` e a ordem de `participants[]` vinda do backend.
- Enquanto houver combate ativo, a `InitiativeTrack` permite ao mestre avançar o turno (`Proximo turno`) ou encerrar o combate; o frontend nunca calcula a ordem localmente, apenas projeta o estado `combat` da sessão.
- No MVP atual, o frontend envia `attackBonus` e `damageFormula`, enquanto o backend deriva a CA do alvo a partir do runtime + catálogo (via manifest canônico de itens), resolve a aleatoriedade (`d20`, hit/miss e dano), aplica HP/THP e publica `ATTACK_RESOLVED`, que atualiza HP e registra um log de sistema no chat.
- Quando o primeiro ataque acontece fora de combate formal, o backend inicia combate automaticamente com atacante + alvo; o frontend consome `COMBAT_STARTED` e passa a mostrar a `InitiativeTrack` sem criar estado local paralelo.

## Documentacao do frontend

- `FRONTEND/ARCHITECTURE.md`
- `FRONTEND/ENVIRONMENT.md`
- `FRONTEND/ROADMAP.md`
