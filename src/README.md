## 🧠 Resumo Técnico — NIHILVTT

**NIHILVTT** é uma aplicação VTT (Virtual Tabletop) construída com **React**, **TypeScript**, **Zustand** e **Feature-Sliced Design (FSD)**. Este documento serve como referência estruturada para agentes de IA que consumam ou modifiquem este projeto.

### 🗂️ Organização Geral (Feature-Sliced Design)

```
src/
├─ app/         # Bootstrap da aplicação (entrypoints, estilos, roteamento)
├─ pages/       # Composição de rotas da aplicação
├─ widgets/     # Componentes grandes e reutilizáveis (UI significativa)
├─ features/    # Funcionalidades interativas e de negócio
├─ entities/    # Modelos de domínio (state, lógica e UI atômica)
├─ shared/      # Utilitários genéricos, UI base, tipos e config
```

#### 🧩 Regra de Importação FSD

Importações válidas (de cima para baixo):

```
app
 └─ pages
      └─ widgets
           └─ features
                └─ entities
                     └─ shared
```

Camadas **não podem importar para cima**.

---

### ⚙️ Tecnologias Principais

| Área               | Tecnologias                           |
| ------------------ | ------------------------------------- |
| UI                 | React 18, Tailwind CSS, Framer Motion |
| Estado             | Zustand (sem Context API)             |
| Formulários        | React Hook Form + Zod                 |
| Validação de Tipos | Zod                                   |
| Roteamento         | React Router DOM v7                   |
| Notificações       | Sonner                                |
| Testes             | Jest + React Testing Library          |
| Build              | Vite                                  |
| Tipagem            | TypeScript                            |
| Análise            | Dependency Cruiser                    |

---

### 🧱 Estrutura de Diretórios (Expandido)

#### `app/`

- Entrypoints (`index.tsx`, `App.tsx`)
- Estilos globais (`styles/`)
- Roteamento central (`router.tsx`)

#### `pages/`

- Define rotas (ex: `HomePage`, `DashboardPage`, `SessionPage`).
- Composição de `widgets` + `features`.

#### `widgets/`

Componentes de alto nível que integram múltiplas features. Exemplos:

- `gameBoard/`
- `charactersPanel/`
- `rightSidebar/`
- `toolBar/`
- `characterSheet/`

#### `features/`

Unidades funcionais independentes e interativas. Exemplos:

- `diceRolling/` → lib + store + UI
- `boardRuler/` → régua do tabuleiro
- `characterCreation/` → criação de personagens
- `auth/` → autenticação + proteção de rota
- `chat/` → estado e parsing de comandos

Cada feature pode conter:

```
model/ → Zustand store, hooks, schemas
ui/    → Componentes específicos
lib/   → Helpers e lógica auxiliar
```

#### `entities/`

Modelos centrais como `character/`, `token/`, `board/`. Padrão:

```
model/
  ├─ schemas/ → zod
  ├─ store.ts → zustand
  └─ hooks/
lib/
ui/          → componentes reutilizáveis
```

#### `shared/`

Código genérico, sem acoplamento de domínio.

- `api/` → tipagens globais
- `config/` → constantes (`sheetDefaults`, etc.)
- `lib/` → `hooks/`, `utils/` (ex: `boardUtils`, `hpUtils`, `idUtils`)
- `ui/` → componentes genéricos (ex: `Modal`, `Button`, `Popover`)
- `assets/` → imagens e sons

---

### 🧢 Estado Global

- Todas as stores são baseadas em **Zustand**.
- Stores vivem em `model/store.ts` dentro de `features/` ou `entities/`.
- Exemplo de slice: `features/chat/model/store.ts`

---

### 📊 Conformidade e Análise Estática

- **ESLint** com suporte para React + TypeScript.
- **Dependency Cruiser** usado com regras que impõem a hierarquia FSD:

  - Validação: `npm run dep-cruise:validate`
  - Ciclos: `npm run dep-cruise:circular`
  - HTML: `npm run dep-cruise:report-html`

---

### ✅ Conformidade para IAs

- Tipagem consistente com `Zod` + `TypeScript`.
- Sem uso de Context API.
- Componentes com responsabilidade única.
- Comentários em português.
- Componentes de UI agrupados em `ui/`, sem lógica de negócio.
- Utilitários genéricos centralizados em `shared/lib/utils/`.
