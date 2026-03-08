# Combat Automation Contract v1

Este documento define o recorte de automacao de combate suportado oficialmente pelo NIHILVTT no estado atual do produto.

Objetivos do contrato:

- preservar SSOT no DATAMODELING
- evitar logica por `monsterId`
- escalar por capacidade (`effect + trigger + outcome`)
- falhar cedo em contratos invalidos (sem fallback legado)

## Fonte canonica

1. DATAMODELING define os `effects` e regras.
2. Tooling de export converte um subconjunto automatizavel para manifest backend.
3. Backend executa o manifest de forma autoritativa.
4. Frontend apenas envia comando e projeta eventos; nao arbitra regra.

## Capacidades suportadas no v1

1. `activatableAction` com `modifyTargetHP` em `on: "hit"`.
2. `activatableAction` com `applyCondition` condicional por `movesAtLeast`.
3. `passive_grantAdvantage` com:
   - `on: "attackRoll"`
   - trigger `hasAllyNearby`
   - `appliesToActions` opcional

## Capacidades fora de escopo no v1

1. Triggers passivos fora de `hasAllyNearby` para `attackRoll`.
2. Qualquer efeito que dependa de arbitragem narrativa do mestre.
3. Automacao generica de todos os tipos de `GameEventSchema`.

Esses casos devem permanecer manuais ate entrarem formalmente em uma versao futura do contrato.

## Regras de implementacao

1. Nao implementar regra via `if (monsterId === "...")`.
2. Implementar por semantica de capacidade do effect.
3. Campos obrigatorios no contrato devem ser validados no export e no backend.
4. Manifest deve ser deterministico para permitir `check:backend-monster-manifest-sync`.

## Manifest backend

O manifest de monstros passa a carregar duas secoes de automacao:

1. `actions`: ataques canonicos ativos.
2. `automatedPassives`: passivos automatizaveis do v1.

`automatedPassives` no v1 contem entradas normalizadas de `passive_grantAdvantage` com trigger `hasAllyNearby`.

## Evolucao de versao

Ao introduzir nova capacidade:

1. atualizar este contrato com uma nova versao ou adendo explicito
2. atualizar export/check do DATAMODELING
3. atualizar parser/executor autoritativo do backend
4. adicionar teste de contrato cobrindo caso positivo e negativo
5. atualizar READMEs impactados no mesmo ciclo
