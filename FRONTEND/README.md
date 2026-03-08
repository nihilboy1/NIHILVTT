# FRONTEND

Aplicacao web do NIHILVTT.

Este README e um guia operacional do modulo: setup, integracao e diretrizes tecnicas de implementacao do cliente.

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

## Direcao tecnica atual

Regra editorial do modulo:

- o frontend do NIHILVTT esta em pre-versao; a documentacao e o codigo devem assumir apenas contratos atuais, sem qualquer nocao de suporte legado

### SSOT de cores (tema)

- `src/app/styles/index.css` e a **SSOT (Single Source of Truth)** de cores do frontend.
- Qualquer cor de UI/board/Pixi deve nascer de token CSS declarado nesse arquivo.
- Componentes, stores e utilitarios nao devem introduzir hex/rgb hardcoded para tema fora de `index.css`.
- Trilhas criticas de renderizacao devem ler tokens com validacao fail-fast: token ausente/invalido e violacao de contrato.

### Renderer do board (migracao SVG -> Pixi)

- O board usa renderer unico em runtime: `Pixi` (sem branch por querystring).
- O path SVG foi descontinuado para reduzir superficie de manutencao e eliminar regressao cruzada entre dois renderers.
- Stores e interacoes do board nao mantem mais fallback de referencia SVG (`svgRef`); `viewportRef` e a unica referencia valida para camera/zoom/input.
- O contrato de matematica do board permanece em `src/widgets/gameBoard/model/renderer` para camera, grade, geometria e picking.
- `BoardRendererAdapter` define o contrato minimo de transformacao de mundo/tela; o estado canonico de sessao, combate e interacao permanece fora do renderer.
- A matematica de camera para Pixi fica centralizada em `pixiCamera.ts` (`createPixiWorldTransform`, `worldToScreenPoint`, `screenToWorldPoint`), evitando duplicacao em componentes de UI.
- Conversoes de camera usadas por stores (`client -> viewport -> world`, zoom focado no cursor e pan delta) ficam centralizadas em `cameraMath.ts`, reduzindo logica duplicada entre `board store` e `board zoom store`.
- Nomenclatura de coordenadas/interacao no board deve ser neutra de renderer (`worldPoint`, `visualWorldPoint`, `getWorldPoint`), sem termos herdados de SVG.
- Regras de grade (conversao `world -> cell`, clamp por limites da pagina e tamanho de token, validacao de ponto dentro do board) ficam centralizadas em `gridMath.ts`, usadas por drag/snap e drop de token.
- Geometria de token (bounds em grid/mundo, intersecao de retangulos e distancia de alcance por Chebyshev) fica centralizada em `tokenGeometry.ts`, reutilizada em marquee e validacao de alcance de ataque.
- Conversao de tamanho de criatura para celulas de grid fica centralizada em `shared/lib/geometry/creatureSize.ts`; parsers de personagem/token nao devem manter tabelas duplicadas.
- Escala visual atual de tamanhos no board: `tiny = 0.25x` (1/4 da celula), `small = 0.85x`, `medium = 1x`, mantendo ocupacao logica minima de 1 celula para regras de grid/picking.
- Picking de token por coordenada de mundo/celula fica centralizado em `tokenPicking.ts`; o board deve preferir essa trilha para selecao/alvo em vez de depender de hit-test de elementos SVG.
- Novos fluxos de board devem ser implementados diretamente no pipeline Pixi, sem introduzir fallback SVG.
- Animacoes de ataque em mesa devem ser disparadas por eventos autoritativos (`ATTACK_RESOLVED`) e renderizadas no Pixi; metadados canonicos (`attackDamageType`, `attackerTokenId`) devem ser propagados pela trilha de feedback para habilitar presets data-driven (ex.: `bludgeoning` para concussao), sem heuristica por nome de ataque.
- `attackDamageType` deve obedecer estritamente ao enum canonico de dano do `DATAMODELING` em toda a borda (`TokenActionBar` -> comando HTTP -> backend -> evento realtime -> animação), com falha explicita para valores fora do conjunto permitido.
- Tipagem e validacao de `attackDamageType` no frontend devem derivar do enum canonico compartilhado (`@nihilvtt/datamodeling/primitives`) via `shared/api/damageTypes.ts`, evitando listas literais duplicadas.

### Runtime Boundary

O frontend projeta dados de sessao a partir do runtime compartilhado e usa view models apenas como camada de renderizacao. A entrada canonica de personagens vindos da sessao e o schema compartilhado `SessionCharacterStateSchema` de `@nihilvtt/datamodeling/runtime`.

Regra atual:

- bordas de sessao (`hydrate` e `event handlers`) devem aceitar e processar exclusivamente o runtime compartilhado
- a borda canônica de personagem de sessao passa a ser `SessionCharacterStateSchema` de `@nihilvtt/datamodeling/runtime`; o frontend faz parse da uniao compartilhada e so depois discrimina por `type` para projetar UI
- runtime compartilhado e a unica fonte de verdade para sessao; view model nao substitui nem flexibiliza o contrato da borda
- o `Character Builder` passa a enviar `PlayerCharacterState` para o backend no fluxo autoritativo de criacao
- a `charactersStore` deixa de nascer com seed local e nao deve criar, duplicar, editar ou remover fichas fora de eventos/comandos autoritativos de sessao
- a `tokenStore` tambem passa a ser estritamente orientada a sessao: tokens de mesa entram por snapshot/eventos autoritativos e nao devem existir mutacoes locais paralelas para criar/remover/editar token fora dessa trilha
- `gameSessionHydrator` nao deve mais aceitar snapshot parcialmente invalido: token, mensagem ou `combatState` invalidos precisam falhar antes de qualquer mutacao de store, sem filtrar entradas ruins e seguir com estado parcial
- a store de personagens passa a normalizar entradas de sessao pelo adapter compartilhado e preserva o `PlayerCharacterState` original quando ele vier da sessao
- o adapter de sessao de personagens nao deve aceitar `characterSchema` como fallback; na borda de sessao, payload invalido deve falhar e nao ser reinterpretado como modelo de UI
- a `TokenActionBar` nao usa mais `AttackEntry` de compatibilidade; ataques de ficha agora saem de derivacao canonica (`unarmed`/`weapon`) ou de acoes explicitas com `sourceType: action`
- o snapshot de sessao vindo da API deve trazer `characters`, `tokens`, `messages` e `recentEvents` explicitamente; a borda do cliente nao preenche arrays ausentes com default
- o snapshot de sessao vindo da API tambem deve trazer `combat` explicitamente (`null` ou objeto); ausencia de `combat` e violacao de contrato, nao fallback aceitavel
- ownership de controle da ficha em mesa (`controlledByUserId`) passa a vir no proprio runtime compartilhado e nao em estado paralelo de UI
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
- a sessao agora preserva no cliente tanto `PlayerCharacterState` quanto `MonsterCharacterState` em `runtimeCharactersById`; componentes e view models especificos de jogador devem discriminar por `type` antes de consumir campos exclusivos de `Player`
- o modelo interno transitório da UI continua existindo apenas para renderizacao, mas ele nao substitui mais o runtime compartilhado de `NPC`
- cores de UI e renderer de board (`Pixi`) devem vir de tokens de tema em `src/app/styles/index.css` (SSOT); componentes nao devem manter hex/rgb hardcoded para tema
- leitura de cor por CSS var em trilhas de renderizacao critica (ex.: `PixiBoardPrototype`, `SquaresBackground`) deve operar em fail-fast: var ausente/invalida e violacao de contrato de tema

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
  - o `Character Builder` exige pipeline autoritativo e envia comando `POST /games/{gameId}/session/characters`.
  - sem `gameId` valido ou sem pipeline de persistencia autoritativa, a finalizacao deve falhar explicitamente; o builder nao deve criar ficha local como fallback.
  - como o projeto ainda nao teve release, nenhum fluxo de sessao deve manter compatibilidade com contratos antigos ou estados "legados"; payload invalido precisa falhar cedo.
- O mapeamento inicial resolve, para nivel 1:
  - `charClass`, `species`, `background` (origin), `attributes`
  - `combatStats` basico (HP inicial por hit die + CON, AC base por DEX, speed da especie)
  - `hitDiceEntries` e `featuresAndTraits` (species/origin/feats selecionados)
  - proficiencias aplicaveis vindas de efeitos de classe/origem/feat
- Remocao de personagem no painel segue o mesmo padrao autoritativo em sessao (`POST /games/{gameId}/session/characters/remove`).
- O painel de fichas nao deve executar `duplicate`/`delete` localmente fora de sessao; sem `gameId` valido, a UI deve falhar explicitamente.

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
  - comandos HTTP de sessao nao devem mutar store diretamente no retorno da resposta; a mutacao canonica do cliente deve entrar pelo evento realtime correspondente, mantendo trilha unica de aplicacao de estado
- Ao receber `MEMBER_REVOKED` para o usuario autenticado, o frontend sai imediatamente da mesa e redireciona para `/dashboard`.
- Nesse caso, o jogo tambem e removido da lista local do dashboard imediatamente, e o backend nao retorna mais esse jogo em `GET /games/active` para o usuario expulso.
- O dashboard renderiza cards apenas para jogos com relacao ao usuario: dono, solicitacao pendente ou acesso aprovado.
- Identificacao visual de mensagem propria prioriza `senderUserId` (fallback para nome), reduzindo inconsistencias entre navegadores.
- Snapshot inicial (`/games/{gameId}/session-state`) continua como base para hidratacao e recuperacao.
- As bordas de sessao no cliente (`gameSessionHydrator` e `gameSessionEventHandlers`) agora devem manter testes de contrato dedicados: snapshots validos precisam hidratar sem erro, e payloads realtime invalidos devem falhar cedo de forma explicita.
- A suite Playwright de sessao (`FRONTEND/e2e/session.spec.ts`) deve cobrir ao menos os fluxos criticos de persistencia apos `F5`: mesa recem-criada com `combat: null` explicito e persistencia de chat apos recarregar.
- Nos eventos realtime, o cliente deve assumir payload explicito:
  - `TOKEN_CREATED` sempre traz `character` (objeto ou `null`)
  - eventos de remocao e movimento sempre trazem `combatChanged` + `combat`, em vez de usar ausencia de campo como sinal de "sem alteracao"
  - listas derivadas do payload (`removedCharacterIds`, `removedTokenIds`) devem vir como arrays explicitos, inclusive vazios

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
- Em sessao, a aba `Configuracoes` da ficha passa a expor a atribuicao autoritativa de controlador do personagem; somente o mestre pode alterar esse vinculo.
- O `hpControl` deixa de editar HP absoluto por input livre; ele passa a exibir HP atual/maximo e aplicar comandos contextuais de `Dano` ou `Cura` por quantidade.
- `PlayerCharacterState` passa a carregar `hitPoints.max` como parte obrigatoria do runtime; a ficha usa esse valor como fonte primaria para HP maximo.
- Sessao de jogo nao faz mais compatibilidade para personagens sem `hitPoints.max`; payload runtime sem esse campo deve falhar cedo como violacao de contrato.
- O mesmo vale para os demais campos mutaveis de runtime de `Player`: `controlledByUserId`, `inspiration`, `hitPoints.temporary`, `progression`, `inventory`, `equipment`, `resourcePools` e `activeEffects` precisam existir explicitamente; o frontend nao deve depender de `default()` do schema compartilhado para completar payload ausente.
- O `Character Builder` deve montar esse runtime completo antes do POST de criacao; campos nullable como `controlledByUserId` tambem precisam ser enviados explicitamente (por exemplo, `null` quando ainda nao houver controlador atribuido).
- O frontend nao deve tentar "corrigir" runtime em memoria: sem fallback, sem backfill e sem reparo automatico para estados de personagem incompletos.
- A ficha de monstro em sessao segue a mesma disciplina: a UI projeta `MonsterCharacterState` + catalogo canonico do `DATAMODELING`, sem montar regra localmente nem reinterpretar dados fora do contrato compartilhado.
- Snapshot e eventos realtime da mesa agora podem carregar `NPC`; o frontend hidrata esses runtimes lendo o catalogo canônico e renderiza a ficha de monstro sem depender de payload estrutural montado no cliente.
- A `TokenActionBar` de monstros usa as acoes projetadas do catalogo canônico, incluindo alcance quando ele existir no efeito autoritativo do monstro.
- O fluxo oficial de monstros agora nasce na `Biblioteca` (`CompendiumPanel`): o mestre pesquisa no catálogo canônico, arrasta o monstro para o grid e o frontend envia apenas `monsterId` + posição para o backend instanciar ficha + token de forma autoritativa.
- Na `Biblioteca`, cada card de monstro também expõe `Detalhes`; esse botão abre a própria ficha de monstro em modo catálogo, alimentada diretamente por `MonsterType` cru do `DATAMODELING`, sem instanciar token nem criar estado de sessão.
- A projeção de monstro no frontend deve usar IDs determinísticos derivados do catálogo para ficha, ações e traços, evitando instabilidade visual e rerenders desnecessários no modo catálogo e no modo de instância.
- View models derivados de runtime/catálogo (como a projeção de inventário na ficha e os blocos de monstro) devem preferir IDs determinísticos; `generateUniqueId()` fica restrito a entidades realmente novas/criadas no cliente.
- O `CharactersPanel` volta a ser focado em fichas já existentes de jogador; ele não é mais o ponto de entrada para spawn de monstro, e monstros instanciados no grid não devem aparecer na lista de fichas do painel.
- O drag de ficha do `CharactersPanel` para o grid deve respeitar a mesma regra de ownership autoritativa usada pelo backend: se `controlledByUserId` estiver `null`, apenas o mestre pode instanciar token; se houver controlador definido, apenas aquele usuário pode arrastar a ficha para criar novos tokens.
- A alteracao de HP agora e enviada como intencao (`mode: damage|heal` + `amount`), e o backend calcula o HP final autoritativamente.
- O `hpControl` tambem oferece um comando proprio de `Temp HP`; o backend calcula o novo HP temporario autoritativamente e o dano passa a consumir HP temporario antes de reduzir HP atual.
- O `hpControl` nao remove tokens da mesa; remocao de token fica restrita a tecla `Delete` no board e apenas para o mestre.
- Os atalhos de board `Ctrl+C`/`Cmd+C`, `Ctrl+V`/`Cmd+V` e `Delete` sao exclusivos do mestre; jogadores nao podem copiar, colar nem remover tokens e a UI deve deixar esse bloqueio explicito.
- O `Delete` em massa no board deve usar o comando autoritativo em lote (`POST /games/{gameId}/session/tokens/remove-batch`), para que todas as remocoes sejam persistidas em um unico commit de snapshot.
- Quando um token removido por `Delete` for o ultimo token de uma ficha clone de sessao, a ficha clone correspondente tambem sai automaticamente do `CharactersPanel`.
- O `hpControl` agora fica fixo no canto inferior direito da viewport, respeitando a area ocupada pela sidebar direita, exibe o nome do personagem selecionado e nao usa mais ancoragem por token (`anchorPoint`).
- O `hpControl` e demais modais contextuais de token devem abrir apenas para o mestre; outros jogadores podem selecionar token visualmente, mas nao recebem modal contextual de HP.
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
- A store de personagens nao descarta mais payloads invalidos de sessao silenciosamente: snapshot e eventos de personagem agora geram erro explicito quando o contrato de runtime compartilhado e violado.
- Handlers realtime tambem nao devem ignorar payloads invalidos de token/chat/HP silenciosamente: qualquer violacao de contrato deve ser logada com contexto e propagada para o `gameSessionRealtimeClient`, que centraliza o tratamento sem derrubar a conexao.
- Mutacoes locais (`updateCharacter`, `deleteCharacter` e `duplicateCharacter`) ficam bloqueadas para personagens runtime-backed; em sessao, personagens autoritativos so devem mudar por comandos de backend.
- No `CharactersPanel`, o menu de opcoes deve ser ancorado no proprio botao de tres pontos que o abre; o posicionamento e calculado pelo `getBoundingClientRect()` do gatilho para evitar abrir no canto da tela quando a referencia ainda nao foi montada.
- `Duplicar Personagem` no `CharactersPanel` agora cria um clone persistente autoritativo em sessao: o frontend envia um comando de duplicacao, o backend gera uma nova ficha com novo `id`, renomeia o clone no formato `Nome [N]`, publica `CHARACTER_CREATED` e a copia passa a divergir da origem a partir dali.
- `Duplicar Personagem` no `CharactersPanel` e exclusivo do mestre; jogadores nao devem receber essa acao no menu.
- Toda duplicacao de ficha `Player` passa a nascer sem dono (`controlledByUserId: null`), mantendo o controle inicial da copia com o mestre ate nova atribuicao explicita na aba de configuracao da ficha.
- No board, apenas o mestre pode usar `Ctrl+C`/`Cmd+C` para copiar o token atualmente selecionado (ou o token do `hpControl` ativo) como fonte de clonagem; `Ctrl+V`/`Cmd+V` tambem permanece exclusivo do mestre e executa um comando autoritativo atômico no backend que duplica a ficha e já cria o novo token na célula atualmente visada pelo cursor no grid (com destaque visual da célula), sem janela intermediária de clone órfão. Se não houver alvo visado, o fallback continua sendo a célula adjacente.
- Quando a fonte copiada for um `NPC`, o backend deve tratar `Ctrl+V`/`Cmd+V` como novo spawn da mesma criatura: cria uma nova instancia runtime a partir do mesmo `monsterId`, sem reaproveitar HP/efeitos do token original, e já publica o token novo no mesmo comando.
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
- O contrato de `Ataque desarmado` (id, label, alcance e `damageType` base/overrides) deve vir do `DATAMODELING` (`UNARMED_ATTACK_PROFILE` + `resolveUnarmedAttackDamageType`), evitando hardcode local duplicado; overrides por `specieId` (ex.: `specie-lizardfolk`) devem alterar o `attackDamageType` enviado ao backend.
- Quando houver runtime de equipamento, a seção `Acoes` também deriva ataques das armas equipadas (`mainHand` e `offHand`) a partir do catálogo de itens.
- Para personagens runtime-backed, a seção `Acoes` nao deve misturar fallback local de `character.actions`; o runtime e os derivados passam a ser a fonte primária.
- O bônus de ataque dessas armas só soma bônus de proficiência quando o runtime conseguir provar, pelo catálogo da classe, proficiência automática no `weaponType` da arma (`simple`/`martial`).
- O fluxo de combate entre tokens usa uma barra de `Ações do Token` fixa no canto inferior direito; cada ação é projetada como `AttackEntry` (incluindo `rangeMeters`), clicar em uma ação arma um `pendingAttack`, o alcance da ação é exibido no board ao redor do atacante e o clique no token alvo só avança se ele estiver dentro desse alcance.
- O controle de token/personagem na mesa segue ownership runtime para fichas `Player`, com autoridade absoluta do mestre: o owner da mesa sempre pode mover e agir com qualquer token; para jogadores, se `controlledByUserId` estiver definido, apenas aquele jogador pode mover e agir com a ficha, e se estiver `null`, o controle fica com o mestre.
- O board nao deve usar overlay bloqueante para lock de ownership/turno; quando uma acao for bloqueada por permissao ou turno, o feedback deve ser toast e a restricao continua aplicada no comando/drag.
- `NPC` e sempre de uso exclusivo do mestre. `MonsterCharacterState` nao carrega `controlledByUserId`, e o board deve aplicar essa regra de forma explicita em drag, acoes e modais contextuais.
- A mesa agora pode entrar em combate formal: o frontend hidrata `combatState` a partir do snapshot/eventos e projeta uma `InitiativeTrack` como painel arrastável.
- Painéis flutuantes arrastáveis da mesa (como `InitiativeTrack`) seguem o mesmo padrão de drag manual da ficha: arraste direto por uma área de header/handle ampliada, com `mousemove` document-level, `safeArea` da viewport e `reclamp` em resize/mudança de layout.
- O handle de drag desses painéis flutuantes (`InitiativeTrack`, `hpControl` e `Ações do Token`) agora deve aparecer como um header fino integrado à borda superior do bloco, usando um tom de `surface` próximo ao próprio painel e com o ícone de `six dots` preto no canto direito.
- O combate so pode ser iniciado por comando explicito do mestre com os tokens previamente selecionados (`Iniciar combate`); o frontend nao deve introduzir gatilho automatico, trigger por proximidade nem qualquer outro atalho alternativo.
- Ao iniciar combate, o frontend deve filtrar tokens selecionados com condicao runtime `dead`: se restarem menos de dois vivos, o painel de iniciar combate nao deve aparecer; se houver mortos e ao menos dois vivos, o comando deve iniciar combate apenas com os vivos.
- O fluxo de inicio de combate passa por modal em duas etapas: (1) escolher o modo (`freeForAll` ou `teams`) e (2) quando `teams`, organizar distribuicao dos tokens em `teamId` antes de confirmar.
- Em `teams`, o botao de confirmar deve ficar desabilitado enquanto houver token sem time; a validacao local deve seguir o contrato autoritativo (todo token selecionado em exatamente um time).
- A organizacao de times deve oferecer `auto-balance` inicial opcional apenas como ajuda visual; o mestre continua podendo ajustar manualmente a distribuicao antes do envio.
- O cliente envia `POST /session/combat/start` com `tokenIds` + `mode`; quando `mode=teams`, envia tambem `teams[]` com `teamId` e `tokenIds`.
- Ao iniciar combate, a `InitiativeTrack` abre a partir do `combatState` autoritativo e lista exclusivamente os participantes enviados pelo backend; a UI nunca recalcula ordem localmente, apenas projeta `round`, `turnIndex` e `participants[]`.
- O `combatState` autoritativo agora inclui `mode` e `participants[].teamId`; `gameSessionHydrator` e `gameSessionEventHandlers` devem validar esses campos explicitamente e falhar cedo quando ausentes/invalidos.
- O alcance de deslocamento em combate deve ser calculado por caminho valido (nao por raio), considerando orcamento de movimento e mapa de colisao; a base do frontend fica em `src/features/combat/model/movement/movementPathfinding.ts`.
- O contrato de colisao para deslocamento ja considera dois tipos de bloqueio: celula bloqueada (`blockedCells`) e parede por aresta (`blockedEdges`); novos objetos de cenario devem alimentar esse contrato.
- O overlay de range no board (Pixi) deve refletir apenas celulas alcancaveis pelo algoritmo de caminho; cliques futuros de movimento devem reutilizar o mesmo resultado para evitar divergencia entre UX e validacao.
- Enquanto houver combate ativo, deslocamento de token participante segue fluxo de `click-to-move`: selecionar token do turno e clicar em uma celula valida do range; drag-and-drop de deslocamento fica desabilitado nesse contexto.
- O deslocamento em combate deve ser um modo de acao explicito na barra do token (`Mover`); o board so aceita clique de destino quando esse modo estiver armado, e `Esc` deve cancelar o modo.
- O movimento por clique no combate deve animar passo a passo (celula por celula) antes da confirmacao autoritativa, e cliques fora do alcance devem exibir feedback explicito de deslocamento insuficiente/local invalido.
- Durante o hover em combate, o board deve exibir pre-visualizacao da rota (trilha de celulas e linha) ate o destino valido selecionado, reaproveitando o mesmo resultado de pathfinding usado na confirmacao do clique.
- O `combatState` passa a carregar tambem os recursos do turno atual (`turnResources`), para que a UI apenas projete a economia autoritativa de combate.
- A rolagem de iniciativa acontece no backend no momento da entrada em combate e cada resultado deve aparecer no chat como log de sistema para auditoria.
- Enquanto houver combate ativo, tokens participantes ficam sob lock de turno: so o participante do turno atual pode mover e iniciar acoes; participantes fora do turno devem permanecer bloqueados no board.
- No estado atual, um turno possui `1` acao, `1` acao bonus (reservada para o fluxo futuro) e deslocamento em grade; ataques consomem a acao, movimento consome deslocamento restante e, quando acao e deslocamento acabam, o backend avanca automaticamente para o proximo turno.
- Os recursos do turno atual devem ser projetados na `Ações do Token` do personagem ativo; essa barra agora aparece apenas para o usuario que controla aquela ficha, nasce no canto inferior direito e continua arrastavel como painel flutuante.
- O `hpControl` do mestre fica ancorado no canto inferior esquerdo da viewport e nao possui variante readonly para jogador.
- O nome exibido nos tokens do board deve ficar visivel apenas em hover.
- O `hpControl` deve abrir com largura ajustada ao próprio conteúdo (sem largura fixa desnecessária) e respeitar a `safe area` da toolbar esquerda na posição inicial, no mesmo padrão dos demais painéis flutuantes.
- Enquanto houver combate ativo, a `InitiativeTrack` permite ao mestre avançar o turno (`Proximo turno`) ou encerrar o combate.
- No MVP atual, o frontend envia `attackBonus` e `damageFormula`, enquanto o backend deriva a CA do alvo a partir do runtime + catálogo (via manifest canônico de itens), resolve a aleatoriedade (`d20`, hit/miss e dano), aplica HP/THP e publica `ATTACK_RESOLVED`, que atualiza HP e registra um log de sistema no chat.
- O payload de `ATTACK_RESOLVED` pode incluir `damageAfterDefenses`; quando presente, o chat deve projetar explicitamente o valor pós-defesas sem inferência local de resistência/vulnerabilidade.
- Para ataques canonicos de monstro com bonus condicionais, o handler de `ATTACK_RESOLVED` deve consumir `conditionalDamageTotal` e `conditionalDamageBreakdown[]` (`damageType` + `damage`) como contrato explicito; o chat nao deve inferir tipo de dano por nome de ataque.
- Assim que o turno ativo for de um monstro com gatilho `hasAllyNearby` (taticas de matilha), o board deve marcar os alvos elegiveis com um pequeno icone de vantagem (`d20`) sobreposto no canto superior esquerdo do token, mesmo sem clique em ataque; ao passar o mouse sobre o icone, a UI deve explicar o motivo da vantagem (ex.: `Taticas de Matilha`). Quando houver `pendingAttack` armado, o alcance da acao armada prevalece para a marcacao. Essa pre-visualizacao deve respeitar `combat.mode = teams` e `teamId` autoritativo dos participantes.
- Quando um alvo `NPC` sofre dano e chega a `0` HP via `ATTACK_RESOLVED`, ele é considerado morto imediatamente no backend: sai da lista de participantes do combate (ordem de turnos), mas o token permanece no grid até remoção explícita do mestre.
- Ataques fora de combate formal devem falhar; o frontend nao tenta abrir combate implicitamente a partir de ataque.
- A ficha de monstro no frontend deve projetar metadados canonicos do catalogo (tipo, alinhamento, source, ambientes, idiomas, senses e defenses) como informacao de leitura, sem inferencia local de regra e sem alterar a autoridade de combate do backend.
- Termos canonicos de monstro em ingles (como ambientes, movement modes, senses, damage types e conditions) devem passar pelo glossario PT-BR canonico do `DATAMODELING` (`@nihilvtt/datamodeling/shared`, com adaptador em `shared/lib/utils/monsterGlossary.ts`) antes da renderizacao na UI.
- A UI nao deve aplicar fallback de traducao por heuristica (`Title Case`/normalizacao livre): termos ausentes no glossario canonico devem falhar cedo para manter disciplina data-driven.
- Distancias canonicas data-driven continuam em `feet` no contrato; toda exibicao de distancia na UI deve converter para metros (`m`) antes de renderizar.

## Documentacao do frontend

- `FRONTEND/ARCHITECTURE.md`
- `FRONTEND/ENVIRONMENT.md`
- `FRONTEND/ROADMAP.md`
