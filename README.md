# Virtual Tabletop Nihil 🎲

Um aplicativo de mesa virtual (VTT) para facilitar suas sessões de RPG de mesa online. Gerencie tokens, controle pontos de vida, role dados e interaja com seus jogadores em um ambiente intuitivo e dinâmico.

---

## ✨ Funcionalidades

- **Gerenciamento de Tokens**: Criação, movimentação e edição de tokens de personagens e monstros.
- **Controle de HP**: Interface dedicada para acompanhar e modificar pontos de vida.
- **Rolagem de Dados**: Sistema integrado com suporte a d4, d6, d8, d10, d12, d20, d100.
- **Chat Integrado**: Comunicação entre jogadores e mestre, com suporte a comandos e rolagens.
- **Fichas de Personagem**: Visualização e edição de informações completas dos personagens.
- **Configurações de Tabuleiro**: Personalização de grid, zoom, e outros elementos visuais.

---

## 🚀 Tecnologias Utilizadas

- **React 18**
- **TypeScript** + **Zod** para tipagem segura
- **Zustand** para gerenciamento de estado global
- **React Hook Form** + **@hookform/resolvers** para formulários
- **Vite** como bundler e servidor de desenvolvimento
- **Tailwind CSS** para estilização rápida e responsiva
- **Framer Motion** para animações
- **Sonner** para notificações toast
- **Jest** + **React Testing Library** para testes
- **Dependency Cruiser** para análise de dependências

---

## 🧠 Arquitetura (Feature-Sliced Design)

A aplicação adota a arquitetura **Feature-Sliced Design (FSD)**, organizada nas seguintes camadas:

```
src/
├─ app/         # Inicialização, entrypoint e roteamento
├─ pages/       # Páginas roteadas
├─ widgets/     # Componentes grandes e reutilizáveis
├─ features/    # Funcionalidades interativas e de negócio
├─ entities/    # Modelos de domínio e lógica central
├─ shared/      # Hooks, utils, config, assets e UI base
```

Regras de importação respeitam a hierarquia descendente: `app` → `pages` → `widgets` → `features` → `entities` → `shared`.

O estado é gerenciado exclusivamente com **Zustand**, sem uso de Context API.

---

## 🛠️ Instalação

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/vttnihil.git
   cd vttnihil
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:

   ```bash
   npm run dev
   ```

   Acesse: [http://localhost:5173](http://localhost:5173)

4. **Execute os testes**:

   ```bash
   npm test
   ```

---

## 🎮 Uso

- Adicione tokens ao tabuleiro com drag-and-drop
- Clique nos tokens para abrir fichas e controlar atributos
- Utilize o chat para mensagens e comandos de rolagem
- Personalize o tabuleiro e a experiência de jogo

---

## 🤝 Contribuição

1. Faça um fork do repositório
2. Crie uma branch: `git checkout -b feature/sua-feature`
3. Commit: `git commit -m 'feat: adiciona nova funcionalidade'`
4. Push: `git push origin feature/sua-feature`
5. Abra um Pull Request

---

## 📄 Licença

MIT — Consulte o arquivo [LICENSE](LICENSE)
