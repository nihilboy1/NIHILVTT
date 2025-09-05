# Estilos da Aplicação

## Estrutura de CSS

Este diretório contém os arquivos CSS principais da aplicação:

- `index.css`: Arquivo CSS principal da aplicação. É a fonte única da verdade para estilos globais, variáveis CSS e definições de tema.
- `globals.css`: Arquivo com definições adicionais que deveriam ser migradas para o index.css quando apropriado.

## Convenções de CSS

### Variáveis CSS

A aplicação usa o padrão de variáveis CSS com prefixo 'color-':

- `--color-surface-0`, `--color-text-primary`, `--color-accent-primary`, etc.

Este é o padrão oficial do projeto e deve ser seguido por todos os componentes.

### Tipografia

- Classes `.iceberg-regular` e `.work-sans-base` definem os estilos para as fontes principais.

### Utilidades

O arquivo inclui várias classes utilitárias para:

- Ocultar barras de rolagem (`hide-scrollbar`)
- Ocultar setas em inputs numéricos (`hide-arrows`)
- Classes de redimensionamento (`resize-handle`, `resize-s`, etc.)

### Tema da Aplicação

As cores e outras variáveis de design seguem um esquema de cores escuro com acentos em tons de roxo:

- Superfícies: tons de cinza escuro a preto
- Texto: tons de branco e cinza claro
- Acentos: tons de roxo
- Feedback: verde para positivo, vermelho para negativo

## Manutenção

Ao fazer alterações de estilo:

1. Use sempre o `index.css` para novas definições ou alterações
2. Siga o padrão de variáveis com prefixo `--color-`
3. Mantenha a compatibilidade com os componentes existentes
4. Atualize este README quando necessário
