# Monster Runtime Blueprint

Blueprint tecnico para a futura ficha autoritativa de monstros do NIHILVTT.

Este documento define a direcao arquitetural antes da implementacao, mantendo o principio data-driven ja adotado no projeto.

## Objetivo

Construir uma ficha de monstro robusta, escalavel e autoritativa, separando com clareza:

- catalogo canonico de monstros
- runtime persistido da instancia em mesa
- projecao visual no frontend

O frontend nao deve inventar regra nem reconstruir dados fora do que ja existe no `DATAMODELING` e no runtime persistido pelo backend.

## Separacao Canonica

### Catalogo (`MonsterType`)

O catalogo de monstros ja existe em:

- `DATAMODELING/src/domain/monster/monster.schema.ts`
- `DATAMODELING/src/data/monsters/`

Ele continua sendo a fonte canonica de dados estaticos:

- nome
- descricoes
- imagem/token
- tamanho
- tipo
- alinhamento
- CR
- AC base
- HP base/fórmula
- deslocamentos base
- atributos base
- senses
- defenses
- traits
- efeitos/acoes

Esses dados nao devem ser copiados como fonte primaria para o runtime.

### Runtime (`MonsterCharacterState`)

O runtime futuro de monstro deve representar apenas a instancia viva em sessao.

Ele deve guardar somente estado mutavel e referencias para o catalogo:

- `id`
- `type` (inicialmente `NPC`)
- `monsterId` (id canonico do catalogo)
- `nameOverride` opcional
- `imageOverride` opcional
- `hitPoints.current`
- `hitPoints.temporary`
- `resourcePools`
- `activeEffects`
- `notes` opcional

O runtime nao deve guardar como fonte primaria:

- `armorClass`
- `speed`
- `abilityScores`
- `traits`
- `actions`
- `challengeRating`

Esses valores devem ser resolvidos do catalogo em uma camada posterior de projecao/leitura.

## Schema Recomendado

Primeiro corte recomendado para `MonsterCharacterStateSchema`:

1. `id`
2. `type`
3. `monsterId`
4. `nameOverride`
5. `imageOverride`
6. `hitPoints`
7. `resourcePools`
8. `activeEffects`
9. `notes`
Status atual:

- o primeiro corte desse schema ja foi criado em `DATAMODELING/src/runtime/entities/monster-character.state.ts`
- ele mantem o runtime enxuto: referencia canonica ao monstro (`monsterId`), overrides opcionais e apenas estado mutavel de HP/recursos/efeitos

### Regras de campo

- `type` deve ser discriminado explicitamente e compor a uniao de entidades persistidas da sessao.
- no estado atual do produto, `NPC` e sempre de uso exclusivo do mestre; o runtime de monstro nao carrega ownership por usuario
- `monsterId` deve referenciar ids canonicos do catalogo (`monster-*`).
- `hitPoints.max` nao precisa existir no runtime se o maximo vier do catalogo; o backend resolve o clamp usando o valor canonico do monstro.
- `resourcePools` e `activeEffects` seguem a mesma filosofia do runtime de jogador: guardar apenas estado mutavel da instancia.
- o runtime de monstro nao deve usar `default()` para preencher campos ausentes em parse; o payload persistido precisa trazer explicitamente os campos nullable e os arrays mutaveis, para manter SSOT com o backend

## Backend Autoritativo

O backend nao deve receber o monstro inteiro do frontend.

Fluxo recomendado:

1. O mestre seleciona um `monsterId`.
2. O frontend envia apenas um comando autoritativo de spawn por referencia.
3. O backend consulta o catalogo canonico de monstros.
4. O backend instancia `MonsterCharacterState`.
5. O backend persiste a sessao e publica evento realtime.

### Comando recomendado

Em vez de reusar o fluxo generico de `CreateCharacterRequest`, criar um comando especifico, por exemplo:

- `POST /games/{gameId}/session/monsters`

Payload minimo:

- `monsterId`
- overrides opcionais estritamente mutaveis (ex.: `nameOverride`)

Extensao operacional ja adotada:

- o mesmo comando pode receber `sceneId`, `x` e `y` para criar o token do monstro no mesmo commit autoritativo, evitando runtime órfão na sessao

Isso evita:

- payloads arbitrarios vindos do cliente
- drift entre frontend e backend
- duplicacao de regra
- montagem de ficha no frontend

Status atual:

- o backend ja expõe `POST /games/{gameId}/session/monsters`, instanciando `MonsterCharacterState` a partir do catalogo canônico
- o frontend ja hidrata `NPC` em snapshot/eventos projetando catalogo + runtime, sem depender de payload estrutural montado no cliente

## Manifest Canonico Para o Backend

Seguir o mesmo padrao ja adotado para itens.

Hoje o projeto ja exporta:

- `DATAMODELING/src/tooling/export-backend-item-manifest.ts`

Direcao recomendada para monstros:

- criar `export-backend-monster-manifest.ts`
- gerar `BACKEND-JAVA/src/main/resources/catalog/monster-catalog-manifest.json`

Esse manifest deve conter os campos necessarios para:

- instanciar `MonsterCharacterState`
- resolver HP maximo canonico
- resolver AC e speed canonicos
- expor traits e acoes canonicamente

## Frontend

O frontend deve apenas projetar:

- runtime autoritativo de monstro
- catalogo canonico de monstro

Ele nao deve:

- recalcular regra de monstro fora do contrato definido
- inventar ataques por heuristica
- inferir AC, HP maximo ou speed por fallback local
- corrigir payloads incompletos

### Ficha de monstro

A ficha de monstro deve ser propria e separada da ficha de jogador.

Ela nao deve ser um `PlayerSheet` simplificado.

Estrutura recomendada:

- `MonsterSheetContent`
- `MonsterSheetViewModel`

Leitura projetada:

- identidade: catalogo + overrides
- combate: HP atual do runtime + HP maximo/AC/speed do catalogo
- atributos: catalogo
- traits: catalogo
- acoes: catalogo (`effects`)
- recursos/efeitos ativos: runtime

## Caso Inicial

O primeiro fixture recomendado e o `Commoner`, ja presente no catalogo.

Uso esperado:

- validar a pipeline completa da nova arquitetura
- testar ficha de monstro
- testar turno, deslocamento e acao
- testar projecao fiel de dados canonicos

O `Commoner` e o primeiro caso de uso, nao um atalho de implementacao.

## Ordem de Implementacao

1. Criar `MonsterCharacterStateSchema` em `DATAMODELING/src/runtime/entities/`
2. Exportar o novo runtime em `@nihilvtt/datamodeling/runtime`
3. Criar `export-backend-monster-manifest.ts`
4. Fazer o backend consumir o manifest de monstros
5. Criar comando autoritativo de spawn por `monsterId`
6. Expandir snapshot/eventos para aceitar runtime de monstro
7. Criar `MonsterSheetViewModel`
8. Criar `MonsterSheetContent`
9. Fazer o `SheetModal` discriminar jogador vs monstro sem fallback textual

## Regra de Ouro

Catalogo define regra.

Runtime guarda estado mutavel.

Backend instancia e valida.

Frontend apenas projeta.
