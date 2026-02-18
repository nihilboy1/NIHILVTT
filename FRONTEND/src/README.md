## Resumo Técnico - NIHILVTT

NIHILVTT é uma aplicação VTT (Virtual Tabletop) construída com React, TypeScript, Zustand e Feature-Sliced Design (FSD).
Este documento serve como referência estruturada para onboarding, manutenção e suporte por agentes de IA.

### Organização Geral (Feature-Sliced Design)

```text
src/
|- app/         # Bootstrap da aplicação (entrypoints, estilos, roteamento)
|- pages/       # Composição de rotas da aplicação
|- widgets/     # Componentes grandes e reutilizáveis (UI significativa)
|- features/    # Funcionalidades interativas e de negócio
|- entities/    # Modelos de domínio (state, lógica e UI atômica)
|- shared/      # Utilitários genéricos, UI base, tipos e config
```

#### Regra de Importação FSD

Importações válidas (de cima para baixo):

```text
app
  -> pages
      -> widgets
          -> features
              -> entities
                  -> shared
```

Camadas não podem importar para cima.

---

### Tecnologias Principais

| Área               | Tecnologias |
| ------------------ | ----------- |
| UI                 | React 18, Tailwind CSS, Framer Motion |
| Estado             | Zustand (sem Context API) |
| Formulários        | React Hook Form + Zod |
| Validação de tipos | Zod |
| Roteamento         | React Router DOM |
| Notificações       | Sonner |
| Testes             | Jest + React Testing Library |
| Build              | Vite |
| Tipagem            | TypeScript |
| Análise            | Dependency Cruiser |

---

### Estrutura de Diretórios (Expandido)

#### `app/`

- Entrypoints (`index.tsx`, `App.tsx`)
- Estilos globais (`styles/`)
- Roteamento central (`router.tsx`)

#### `pages/`

- Define rotas (ex: `HomePage`, `DashboardPage`, `SessionPage`)
- Composição de `widgets` + `features`

#### `widgets/`

Componentes de alto nível que integram múltiplas features. Exemplos:

- `gameBoard/`
- `charactersPanel/`
- `rightSidebar/`
- `toolBar/`
- `characterSheet/`

#### `features/`

Unidades funcionais independentes e interativas. Exemplos:

- `auth/`
- `chat/`
- `diceRolling/`
- `boardRuler/`
- `characterCreation/`
- `characterBuilder/`

Cada feature pode conter:

```text
model/ # Zustand store, hooks, schemas
ui/    # Componentes específicos
lib/   # Helpers e lógica auxiliar
```

#### `entities/`

Modelos centrais como `character/`, `token/`, `board/`.
Padrão comum:

```text
model/
  |- schemas/  # zod
  |- store.ts  # zustand
  |- hooks/
lib/
ui/
```

#### `shared/`

Código genérico, sem acoplamento de domínio.

- `api/`
- `config/`
- `constants/`
- `hooks/`
- `lib/`
- `styles/`
- `ui/`
- `assets/`

---

### Estado Global

- Todas as stores são baseadas em Zustand.
- Stores vivem em `model/store.ts` dentro de `features/` ou `entities/`.

---

### Conformidade e Análise Estática

- ESLint com suporte para React + TypeScript.
- Dependency Cruiser para validar hierarquia de dependências.

Comandos úteis:

- `npm run dep-cruise:validate`
- `npm run dep-cruise:circular`
- `npm run dep-cruise:report-html`

---

### Conformidade para IAs

- Tipagem consistente com Zod + TypeScript.
- Sem uso de Context API.
- Componentes com responsabilidade única.
- Comentários em português.
- Componentes de UI agrupados em `ui/`, sem lógica de negócio.
- Utilitários genéricos centralizados em `shared/lib/utils/`.

---

### Atualização de Arquitetura (Mapeamento Atual)

#### Entrypoint e Bootstrap

- O entrypoint atual da aplicação é `src/app/index.tsx` (não `main.tsx`).
- `src/app/index.tsx` renderiza `App` em `#root` com `StrictMode`.
- `src/app/App.tsx` apenas delega para `AppRouter`.

#### Router e Rotas

- Router central: `src/app/router.tsx`.
- Rotas públicas:
  - `/` -> `HomePage`
  - `/login` -> `LoginPage`
  - `/register` -> `RegisterPage`
- Rotas protegidas (via `ProtectedRoute`):
  - `/dashboard` -> `DashboardPage`
  - `/campaigns` -> `CampaignsPage`
  - `/session` -> `SessionPage`
- Fallback: qualquer rota desconhecida redireciona para `/`.

#### Autenticação (Fluxo Base)

- Estado de auth em `src/features/auth/model/authStore.ts` (Zustand).
- Inicialização de sessão via `initializeAuth()`, com persistência em localStorage.
- `ProtectedRoute` bloqueia acesso sem usuário autenticado e redireciona para `/login`.

#### Alias e Resolução de Módulos

- Alias `@` -> `src` configurado em:
  - `vite.config.ts`
  - `tsconfig.app.json`
- Em monorepo/workspace, evitar imports com prefixo `node_modules/...`.
- Padrão recomendado: importar por exports do pacote (`@nihilvtt/datamodeling/...`).

#### Estrutura Real de Camadas (FSD)

- `app`: bootstrap, router, estilos globais.
- `pages`: composição das rotas.
- `widgets`: blocos de UI de alto nível.
- `features`: casos de uso/interações.
- `entities`: modelos centrais de domínio.
- `shared`: utilitários, UI base, tipos e constantes.

#### Composição da Sessão (Núcleo do App)

- `src/pages/SessionPage.tsx` é o shell da sessão.
- Widgets principais montados na sessão:
  - `Toolbar`
  - `GameBoard`
  - `RightSidebar`
  - `SessionModalManager`
- `GameBoard` integra:
  - stores (board, zoom, token, character, UI)
  - features (régua, seleção marquee, drop de personagem, eventos de board)
  - renderização de modais de HP ancorados em token

#### Gerenciamento de Modais na Sessão

- `src/widgets/sessionModalManager/ui/SessionModalManager.tsx` centraliza a pilha de modais (`modalStack`).
- Modais atualmente orquestrados:
  - `simpleName`
  - `sheet`
  - `actionEdit`
  - `characterbuilderModal`
  - `hpControl`
  - `confirmationModal`

#### Estilos Globais e Tema

- Estilos globais em `src/app/styles/index.css`.
- Tokens de tema definidos com `@theme` (`surface`, `text`, `accent`, `feedback`).
- Fonte de destaque carregada no CSS global (`Iceberg`), com base tipográfica em `Work Sans`.
