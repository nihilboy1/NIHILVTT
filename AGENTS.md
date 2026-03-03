# AGENTS

## Regras de Leitura e Edição
- Sempre priorize MCP `filesystem` para leitura e edição de arquivos.
- Use shell para leitura de arquivos apenas se o usuário autorizar explicitamente ou se houver bloqueio técnico no `filesystem`.
- Use shell normalmente para executar comandos de validação/build/testes (`pnpm`, `mvn`, `git`, etc.).

## Persistência de Dados
- Não use `localStorage` para persistir dados de domínio da aplicação quando houver backend com banco (`H2`) disponível.
- Prefira persistência server-side e sincronização via API para estados como perfil, jogo e participação.

## Sem Suporte Legado
- O projeto está em estágio inicial e não deve gastar processamento nem complexidade tentando corrigir payloads, runtimes ou estados persistidos antigos.
- Quando um contrato técnico novo for estabelecido (por exemplo, campos obrigatórios em runtime), remova fallbacks e backfills automáticos em vez de manter compatibilidade silenciosa.
- Estados inválidos ou incompletos devem falhar cedo de forma explícita; não mascarar erro com "conserto" automático.

## Documentação Viva
- Sempre que um novo padrão técnico for estabelecido (arquitetura, persistência, autenticação, fluxo de estado, convenções), atualize os READMEs relevantes no mesmo ciclo de trabalho.
- Não deixar padrão novo apenas no código: refletir o padrão em documentação (`README.md` da raiz e/ou READMEs do módulo impactado).
