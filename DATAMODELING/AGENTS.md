# AGENTS

## Objetivo do Pacote

`DATAMODELING` e o pacote autoritativo de schemas, enums, dados de regras e validacao do dominio de `NihilVTT`.

Ele deve permanecer como a fonte de verdade para:

- catalogos de classes, itens, feats, especies, origens, magias e monstros
- blocos compartilhados de combate, requisitos e efeitos
- validacao estrutural dos dados publicados pelo pacote

## Regras Locais

- Preserve o desenho orientado a efeitos. Se um comportamento de item, classe, origem ou feat puder ser descrito como efeito, prefira estender `effect.schema.ts` em vez de espalhar regras ad hoc em dados.
- Nao misture catalogo de regras com estado runtime de instancia sem deixar a separacao explicita.
- Preserve a diretriz data-driven: o runtime deve guardar estado mutavel minimo; regra estatica e comportamento devem continuar no catalogo sempre que possivel.
- Nao manter suporte legado dentro do runtime tipado: quando um campo novo se tornar obrigatorio, exija-o por schema e remova fallbacks/backfills automaticos em vez de tentar corrigir personagens antigos.
- Quando um novo padrao estrutural for adotado aqui, atualize `README.md` deste pacote no mesmo ciclo.
- Sempre que alterar dados ou schemas com impacto no catalogo, rode `pnpm validate:data`.

## Distincao Estrutural

Ao trabalhar neste pacote, diferencie claramente:

- `catalogo`: define o que existe e como a regra e descrita
- `runtime`: define o estado vivo de uma instancia em jogo

Para ids de classe:

- prefira `ClassIdEnum` para referencias persistidas e runtime (`class-fighter`)
- trate `ClassesIdEnum` como chave logica/legada (`fighter`) enquanto houver compatibilidade necessaria

Hoje o pacote cobre muito bem o catalogo. Se for introduzido estado runtime (por exemplo, personagem jogavel persistido, inventario equipado, progressao pendente), mantenha isso em um bloco proprio e documentado.

## Mudancas Recomendadas

Ao adicionar um novo sistema, siga esta ordem:

1. Primitivos e enums compartilhados
2. Schemas compartilhados
3. Schema de dominio
4. Dados em `src/data/`
5. Validacao e documentacao

## Convencoes de Runtime

- `EquipmentStateSchema`: separar slots minimos (`bodyArmorItemId`, `shieldItemId`, `mainHandWeaponId`, `offHandWeaponId`) e manter ids fixos do catalogo.
- `ResourcePoolStateSchema`: guardar apenas estado mutavel (`current`) e referenciar o catalogo por `resourceId`.
- `ActiveEffectStateSchema`: guardar apenas referencia de origem + `effectIndex` + estado mutavel (duracao restante, stacks, supressao); nunca copiar o payload completo de `EffectSchema` para o runtime.
