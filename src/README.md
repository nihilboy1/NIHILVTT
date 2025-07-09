# Estrutura do Projeto (Feature-Sliced Design - FSD)

Este projeto segue a metodologia arquitetural Feature-Sliced Design (FSD) para organizar o código-fonte. O FSD visa tornar o projeto mais compreensível, escalável e estável diante de requisitos de negócios em constante mudança, promovendo a separação de responsabilidades e a reutilização de código.

## Camadas Principais

O projeto é dividido nas seguintes camadas, organizadas em fatias verticais (slices):

*   **`app/`**: Contém a lógica de inicialização da aplicação, provedores globais e estilos globais. É a camada mais alta e orquestra a aplicação.
    *   `App.tsx`: Componente raiz da aplicação.
    *   `index.tsx`: Ponto de entrada da aplicação.
    *   `providers/`: Provedores de contexto globais (ex: `ModalProvider`, `UIProvider`, `ChatProvider`).
    *   `styles/`: Estilos CSS globais.

*   **`pages/`**: Representa as páginas da aplicação. Cada página é uma composição de widgets e features.
    *   `GameBoardPage.tsx`: Exemplo de uma página específica.

*   **`widgets/`**: Componentes de UI complexos e reutilizáveis que combinam várias features ou entidades para formar uma parte significativa da interface.
    *   `ModalManager.tsx`: Gerenciador de modais.
    *   `RightSidebar.tsx`: Componente da barra lateral direita.
    *   `charactersPanel/`, `chatPanel/`, `gameBoard/`, `sheetModal/`, `toolBar/`: Exemplos de widgets específicos.

*   **`features/`**: Implementa funcionalidades de negócios específicas e interativas. Uma feature geralmente contém sua própria lógica (model), UI e, ocasionalmente, integrações com entidades.
    *   `boardMarqueeSelection/`: Seleção de área no tabuleiro.
    *   `boardPanningAndZoom/`: Pan e zoom do tabuleiro.
    *   `boardRuler/`: Ferramenta de régua no tabuleiro.
    *   `boardSettings/`: Configurações do tabuleiro.
    *   `characterCreation/`: Criação de personagens.
    *   `characterDropOnBoard/`: Arrastar e soltar personagens no tabuleiro.
    *   `characterEditAction/`: Edição de ações de personagem.
    *   `characterUpdateHp/`: Atualização de HP de personagem.
    *   `diceRolling/`: Rolagem de dados.

*   **`entities/`**: Representa os modelos de dados e a lógica de negócios central. Entidades são independentes de UI e de features específicas.
    *   `character/`: Entidade de personagem (model, ui).
    *   `token/`: Entidade de token (model, ui).

*   **`shared/`**: Contém código genérico e reutilizável que não pertence a nenhuma camada específica. Deve ser o mais agnóstico possível.
    *   `api/`: Definições de tipos de API.
    *   `assets/`: Ativos estáticos (imagens, ícones, sons).
    *   `config/`: Constantes de configuração.
    *   `lib/`: Funções utilitárias, hooks genéricos, helpers.
        *   `hooks/`: Hooks reutilizáveis (ex: `useCommandHistory`, `useDismissable`).
        *   `utils/`: Funções utilitárias (ex: `characterUtils`, `cn`, `hpUtils`, `nameUtils`, `sheetUtils`, `board/`, `dice/`, `id/`).
    *   `ui/`: Componentes de UI genéricos e reutilizáveis (ex: botões, modais básicos, ícones).

## Convenções de Nomenclatura e Estrutura Interna

Dentro de cada "slice" (feature, entity, widget), a estrutura interna geralmente segue:

*   **`model/`**: Contém a lógica de negócios, estados, hooks de gerenciamento de estado e contextos específicos da fatia.
    *   `contexts/`: Contextos React específicos da fatia.
    *   `hooks/`: Hooks React específicos da fatia.
*   **`ui/`**: Contém os componentes de interface do usuário específicos da fatia.
*   **`lib/`**: Funções utilitárias ou helpers específicos da fatia.

## Regra da "Fatia Vertical" (Vertical Slice Rule)

A regra fundamental do FSD é que as importações devem seguir uma hierarquia estrita:

`app` <- `pages` <- `widgets` <- `features` <- `entities` <- `shared`

*   Uma camada superior pode importar de camadas inferiores (ex: `pages` pode importar de `widgets`, `features`, `entities`, `shared`).
*   Uma camada inferior **NÃO** pode importar de camadas superiores (ex: `features` não pode importar de `widgets` ou `pages`).
*   Dentro da mesma camada, as importações devem ser feitas com cautela para evitar dependências circulares.

## Como Criar Novas Fatias (Slices)

Ao criar uma nova feature, entidade ou widget, siga a estrutura interna padrão:

```
src/
└── [camada]/
    └── [nome-da-fatia]/
        ├── model/
        │   ├── contexts/
        │   └── hooks/
        ├── ui/
        └── lib/ (opcional, para utilitários específicos da fatia)
```

## Manutenção e Evolução

*   **Evite `any` e tipagens genéricas:** Sempre que possível, utilize tipagens explícitas em TypeScript para garantir a segurança e clareza do código.
*   **Reutilize:** Antes de criar um novo código, verifique se já existe um utilitário, hook ou componente em `shared/` ou em outras fatias que possa ser reutilizado.
*   **Context API:** Utilize a Context API para gerenciar estados que precisam ser compartilhados entre vários componentes, evitando prop drilling.
*   **Componentes pequenos:** Mantenha os componentes pequenos e com responsabilidades únicas.
*   **Comentários em PT-BR:** Todos os comentários no código devem ser escritos em português do Brasil.
*   **Tecnologias:** O projeto utiliza React, TypeScript, Vite e Tailwind CSS.

Ao seguir estas diretrizes, garantimos um projeto organizado, manutenível e fácil de estender.
