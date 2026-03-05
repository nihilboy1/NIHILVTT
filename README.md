# NIHILVTT

NihilVTT e um Virtual Tabletop em desenvolvimento com foco em mesa online autoritativa, sincronizacao multiplayer e automacao orientada a dados.

Hoje o projeto ja cobre autenticacao, dashboard, criacao e gerenciamento de mesas, snapshot server-side de sessao, sincronizacao realtime e os primeiros fluxos de combate.

## O que o projeto busca

- mesa multiplayer com backend autoritativo
- ficha e combate orientados por runtime tipado compartilhado
- automacao incremental inspirada em CRPGs, sem duplicar regra entre frontend e backend
- base de dados de regras centralizada e reutilizavel

## Estado atual

- autenticacao com refresh token em cookie HttpOnly
- dashboard com criacao, entrada, exclusao e capa de mesa
- sincronizacao de sessao via snapshot + eventos realtime
- chat, rolagens, tokens, HP, inventario, equipamento e combate formal controlado pelo mestre
- contrato compartilhado de runtime para sessao (`SessionCharacterState`), cobrindo `PlayerCharacterState` e `MonsterCharacterState`
- o projeto ainda esta em pre-versao (antes da versao 0) e nao deve carregar compatibilidade retroativa: nao existe conceito de legado aceito no produto

## Estrutura do monorepo

- `FRONTEND/`: aplicacao web em React + TypeScript
  - guia operacional: `FRONTEND/README.md`
  - arquitetura: `FRONTEND/ARCHITECTURE.md`
  - ambiente: `FRONTEND/ENVIRONMENT.md`
  - roadmap: `FRONTEND/ROADMAP.md`
- `BACKEND-JAVA/`: API Spring Boot de autenticacao e jogos
  - guia operacional: `BACKEND-JAVA/README.md`
- `DATAMODELING/`: schemas, catalogos, enums e tooling de validacao
  - guia operacional: `DATAMODELING/README.md`
  - brief tecnico: `DATAMODELING/REVIEW_BRIEF.md`
  - blueprint de monstros: `DATAMODELING/MONSTER_RUNTIME_BLUEPRINT.md`

## Setup rapido

1. Inicie o backend:
   - `cd BACKEND-JAVA`
   - `mvn spring-boot:run`
2. Em outro terminal, inicie o frontend:
   - `cd FRONTEND`
   - `pnpm install`
   - `pnpm dev`

## Scripts da raiz

- `pnpm dev:front`
- `pnpm dev:back`
- `pnpm test:front`
- `pnpm test:e2e:front`
- `pnpm test:front:all`
- `SCRIPTS/launchers/reset-dev.bat`: reinicia backend e frontend sem rodar testes; e o launcher mais simples e confiavel para o ciclo diario
- `SCRIPTS/launchers/reset-safe.bat`: executa um subconjunto critico de smoke tests e so entao sobe backend e frontend
- `SCRIPTS/launchers/run-full-tests.bat`: executa a suite completa (backend + frontend unitario + frontend e2e) fora do ciclo de boot
- `SCRIPTS/launchers/run-playwright-e2e.bat`: executa apenas a suite e2e do frontend (Playwright)
- `SCRIPTS/launchers/reset-db.bat`: limpa e recria o banco local H2
- `SCRIPTS/launchers/create-reset-dev-shortcut.ps1`: gera um atalho do reset no Windows

## Launchers do Windows

No momento, os launchers de `SCRIPTS/launchers` tem papeis diferentes e nao sao redundantes:

- `reset-dev.bat`
  - uso diario
  - encerra backend/frontend antigos, limpa as portas `8080` e `5173` e sobe backend + frontend
  - registra stdout/stderr do backend em `backend.log` e poda o arquivo no inicio do reset (limite de linhas configurado no proprio `.bat`)
  - nao roda testes

- `reset-safe.bat`
  - reset com gate rapido
  - faz o mesmo reset do ambiente, mas antes roda um subconjunto critico de smoke tests
  - se qualquer smoke test falhar, nao sobe backend/frontend

- `run-full-tests.bat`
  - validacao pesada
  - roda a suite completa: backend + frontend unitario + frontend e2e
  - nao sobe servidor; serve para verificacao completa fora do ciclo de boot

- `run-playwright-e2e.bat`
  - validacao e2e dedicada
  - roda apenas a suite Playwright do frontend
  - nao sobe servidor; serve para validar fluxos de navegador sem passar pela suite completa

- `reset-db.bat`
  - manutencao local
  - limpa e recria o banco H2 de desenvolvimento
  - use quando quiser descartar estado local deliberadamente

- `run-backend-dev.bat`
  - utilitario interno
  - sobe apenas o backend
  - hoje e usado como helper pelos launchers de reset; nao e o ponto de entrada principal

- `run-frontend-dev.bat`
  - utilitario interno
  - sobe apenas o frontend
  - hoje e usado como helper pelos launchers de reset; nao e o ponto de entrada principal

- `create-reset-dev-shortcut.ps1`
  - utilitario de conveniencia
  - recria os atalhos `NIHILVTT RESET APP.lnk` e `NIHILVTT PLAYWRIGHT E2E.lnk`

- `NIHILVTT RESET APP.lnk`
  - atalho de conveniencia
  - abre diretamente o `reset-dev.bat`

- `NIHILVTT PLAYWRIGHT E2E.lnk`
  - atalho de conveniencia
  - abre diretamente o `run-playwright-e2e.bat`

Em termos de uso pratico, os unicos launchers que importam como entrada principal sao:

1. `reset-dev.bat`
2. `reset-safe.bat`
3. `run-full-tests.bat`

Os demais existem para suporte operacional e validacao especializada e nao devem ser tratados como fluxo principal duplicado.

## Como ler a documentacao

- este `README.md` e a apresentacao geral do projeto
- os READMEs de modulo concentram instrucoes operacionais e diretrizes tecnicas
- novos padroes tecnicos devem ser documentados no modulo impactado e, quando fizer sentido, refletidos aqui de forma resumida
- como o produto ainda nao teve release, a documentacao deve assumir contratos atuais apenas: sem fallback, sem backfill e sem qualquer suporte a payload/estado "legado"
- snapshots e eventos realtime da mesa devem usar payload explicito; ausencia de campo nao deve carregar semantica de "valor padrao" ou "nao mudou"
- no cliente, comandos HTTP de sessao apenas confirmam aceite do backend; a aplicacao canonica de estado deve ocorrer pela trilha realtime para evitar duplo apply e drift
- no fluxo atual de combate, o estado global so nasce por acao explicita do mestre; nao existe auto-combate por ataque ou proximidade
- o combate atual tambem ja usa economia de turno autoritativa basica (acao + deslocamento), com consumo e avanco automatico do turno no backend
- ownership de personagem em mesa tambem e autoritativo: o mestre vincula cada ficha a um jogador, e esse ownership define quem pode controlar aquele personagem
- as stores centrais do cliente nao devem operar em modo local para fichas de sessao; criacao, duplicacao e remocao de personagens dependem de pipeline autoritativo
- a mesma regra vale para tokens de mesa: criacao, remocao e reposicao de tokens devem nascer de snapshot, eventos realtime e comandos autoritativos, nunca de mutacao local paralela
- operacoes estruturais de token no board (`copy`, `paste` e `delete`) permanecem centralizadas no mestre
- a trilha de monstro segue o mesmo padrao data-driven: catalogo canonico em `DATAMODELING`, `MonsterCharacterState` autoritativo no backend e frontend apenas como projecao do catalogo + runtime; o fluxo operacional de spawn parte da `Biblioteca`, com drag do monstro para o grid

## Contribuicao

1. Crie uma branch de feature.
2. Faça commits pequenos e descritivos.
3. Atualize os READMEs impactados quando novos padroes tecnicos forem estabelecidos.
4. Abra PR com contexto tecnico e passos de validacao.

## Licenca

MIT.
