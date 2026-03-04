# FRONTEND Environment

Variaveis de ambiente do frontend (Vite).

Este documento cobre apenas configuracao de ambiente do cliente.
Regras de arquitetura e comportamento ficam em `ARCHITECTURE.md` e `README.md`.

## Arquivo

Use `FRONTEND/.env`.
Referencia versionada: `FRONTEND/.env.example`.

## Variaveis

- `VITE_AUTH_API_BASE_URL`
  - URL base da API de autenticacao/jogo.
  - Exemplo local: `http://localhost:8080`

## Exemplo

```env
VITE_AUTH_API_BASE_URL=http://localhost:8080
```

## Observacao

Apos alterar `.env`, reinicie o servidor (`pnpm dev`).
