# HG Messenger

Aplicação de chat em tempo real (messenger) construída com **Next.js**, **React**, **TypeScript** e **WebSocket**. O projeto inclui um cliente web e um servidor WebSocket próprio para troca de mensagens entre usuários.

---

## Visão geral

O **HG Messenger** é um chat que permite:

- Conectar/desconectar ao servidor WebSocket pela sidebar
- Ver conversas agrupadas por contato (remetente/destinatário)
- Buscar conversas pelo texto das mensagens
- Visualizar mensagens em formato de balões, com data e hora, divisores por data e destaque para mensagens **minhas** vs **de outros**
- Enviar mensagens para o contato selecionado (pressionando **Enter**)
- Receber mensagens em tempo real via WebSocket
- Exibir um estado vazio amigável quando nenhuma conversa está selecionada

A autenticação na conexão é feita por **ID de usuário** e **token** (enviados na URL do WebSocket). O servidor valida o token e encaminha as mensagens para o destinatário (`message_to`).

---

## Tecnologias

| Tecnologia        | Uso                                      |
|-------------------|------------------------------------------|
| **Next.js 16**    | Framework React (App Router)             |
| **React 19**      | Interface do usuário                     |
| **TypeScript**    | Tipagem estática                         |
| **Tailwind CSS 4**| Estilos (via PostCSS)                    |
| **Zustand**       | Estado global (conexão, mensagens)       |
| **WebSocket (ws)**| Servidor de tempo real na porta 3001     |
| **react-icons**   | Ícones (ex.: Wi-Fi / desconectado)       |

---

## Estrutura do projeto

```
project/
├── app/                    # Next.js App Router
│   ├── api/hello/          # API Route de exemplo (GET)
│   ├── globals.css         # Estilos globais + reset
│   ├── layout.tsx          # Layout raiz (fonte Inter, pt-BR)
│   └── page.tsx            # Página inicial → <ChatList />
├── component/
│   └── ui/
│       ├── chat/           # Módulo de chat
│       │   ├── balloon/    # Balão de mensagem (ChatBalloon)
│       │   ├── chat-divider/ # Divisor de data (ChatDivider)
│       │   ├── list/       # Lista de conversas (ChatList)
│       │   ├── message/    # Área da conversa selecionada (ChatMessage)
│       │   ├── sidebar/    # Sidebar com botão conectar/desconectar (ChatSidebar)
│       │   └── types.d.ts  # TChatMessage, TChatMessageDetail
│       ├── input/search/   # Campo de busca (InputSearch)
│       ├── list-tile/      # Item da lista de conversas (ListTile)
│       └── title/          # Título da aplicação (Title)
├── store/
│   └── useChatStore.ts     # Store Zustand: WebSocket, auth, mensagens, connect/disconnect
├── types/
│   └── chatSocketTypes.ts  # Tipos do socket (IUseChatStore, WS_BASE, WSDescription, etc.)
├── websocket/
│   ├── server.ts           # Servidor WebSocket (porta 3001)
│   ├── WebSocketRegistry.ts# Registro de conexões por usuário (rooms) + envio de mensagens
│   └── types.d.ts          # TWebSocketBody, TWebSocketParameters, etc.
├── package.json
├── next.config.ts
└── README.md
```

---

## Como funciona

### Cliente (Next.js)

1. **Estado (Zustand – `useChatStore`)**
   - Guarda: `userId`, `userName`, `token`, `socket`, `socketState`, `messages` (histórico agrupado por contato).
   - `setAuth(userId, userName, token)`: define as credenciais do usuário logado antes de conectar.
   - `connect()`: monta a URL `ws://localhost:3001/?x-id=...&x-token=...`, cria o `WebSocket` e atualiza o estado; em `onmessage` o payload `{ type, owner_id, owner_name, message }` é convertido para `TChatMessageDetail` e as mensagens são agrupadas por `owner_id`/`owner_name`.
   - `disconnect()`: fecha o socket e limpa o estado de conexão.
   - `sendMessage(message, message_to)`: envia JSON `{ message, message_to }` para o servidor via `socket.send` e já adiciona a mensagem na conversa em memória para atualizar a UI imediatamente.

2. **Tela principal (`ChatList`)**
   - **Sidebar (`ChatSidebar`)**: botão para conectar/desconectar. No exemplo atual, é feito um `setAuth("hgs-1234", "Hugo Souza", "1234")` antes de `connect()`.
   - **Lista de conversas**: itens do tipo `TChatMessage` (um contato por `owner_id`/`owner_name`). Cada item é um `ListTile` (inicial do nome + última mensagem). Ao clicar, seleciona a conversa.
   - **Busca**: filtra conversas cujo texto das mensagens contém o termo digitado.
   - **Área de mensagens (`ChatMessage`)**: exibe a conversa selecionada — balões (`ChatBalloon`), divisores de data (`ChatDivider`) e campo para digitar. Ao pressionar **Enter** no input, a mensagem é enviada para o contato selecionado via `sendMessage`.
   - **Estado vazio (`DataNotFound`)**: quando nenhuma conversa está selecionada, um estado “nenhum registro encontrado” é exibido na área de mensagens.

3. **Tipos de mensagem no cliente**
   - `TChatMessage`: `{ owner_id: string; owner_name: string; messages: TChatMessageDetail[] }`.
   - `TChatMessageDetail`: `{ text: string; created_at: Date; owner_id: string; owner_name: string; }`.

### Servidor WebSocket

1. **Conexão**
   - Escuta na porta **3001**.
   - Lê query params da URL: `x-id` (identificador do usuário) e `x-token` (token).
   - Valida: token deve ser `"1234"` e `x-id` obrigatório (em `WebSocketRegistry.checkParameters`).
   - Registra a conexão em “rooms”: `Map<x-id, Set<WebSocket>>` (um conjunto de conexões por usuário).

2. **Mensagens**
   - O cliente envia JSON: `{ message: string, message_to?: string }`.
   - O servidor monta: `{ type: "message", from: x-id, message_to, message }` e chama `webSocketRegistry.sendMessage(data)`.
   - O registro envia esse payload para todas as conexões do usuário `message_to`. Assim, as mensagens chegam em tempo real no outro cliente.

3. **Desconexão**
   - No `close` (e em caso de erro), o usuário é removido do registro.

---

## Pré-requisitos

- **Node.js** (recomendado LTS)
- **npm** (ou outro gerenciador compatível com o `package.json`)

---

## Como rodar

### 1. Instalar dependências

```bash
npm install
```

### 2. Subir o servidor WebSocket

Em um terminal:

```bash
npm run socket
```

Isso executa `tsx websocket/server.ts`. O servidor sobe na porta **3001** e exibe algo como: `Websocket server was started! 🚀`.

### 3. Subir o Next.js

Em outro terminal:

```bash
npm run dev
```

A aplicação fica em **http://localhost:3000**.

### 4. Usar o chat

1. Abra http://localhost:3000.
2. Na sidebar, clique no botão para **conectar** (ícone de Wi-Fi). A conexão de exemplo usa `userId: "hugo"` e `token: "1234"`.
3. Para testar com dois usuários, abra outra aba/janela (ou outro navegador), altere no código o `userId` em `setAuth` (ou implemente um login) e conecte. Mensagens enviadas com `message_to` igual ao `x-id` do outro usuário serão entregues em tempo real.

---

## Scripts disponíveis

| Script    | Comando              | Descrição                          |
|-----------|----------------------|------------------------------------|
| `dev`     | `next dev`           | Desenvolvimento Next.js (porta 3000) |
| `build`   | `next build`         | Build de produção                  |
| `start`   | `next start`         | Servir build de produção           |
| `lint`    | `eslint`             | Lint do projeto                    |
| `socket`  | `tsx websocket/server.ts` | Servidor WebSocket (porta 3001) |

---

## Configuração do WebSocket

- **URL base do cliente**: definida em `types/chatSocketTypes.ts` como `WS_BASE = "ws://localhost:3001/"`.
- **Token de teste**: no servidor, `WebSocketRegistry.checkParameters` exige `x-token === "1234"`. Para produção, troque por validação real (ex.: JWT ou sessão).

---

## Observações

- O **campo de digitar mensagem** em `ChatMessage` já está integrado ao store: ao pressionar **Enter**, a mensagem é enviada via WebSocket (`sendMessage`) e adicionada ao histórico local.
- O servidor mantém as conexões em memória (sem persistência de mensagens). Reiniciar o servidor limpa o registro de usuários.
- Para múltiplos dispositivos por usuário, o registro já suporta mais de uma conexão por `x-id` (Set de WebSockets por usuário).

---

## Resumo

O **HG Messenger** é um chat em tempo real com cliente Next.js/React/Zustand e servidor WebSocket em Node (ws). A estrutura está organizada em componentes de UI, store global, tipos compartilhados e servidor com registro de conexões e encaminhamento de mensagens por usuário. Este README descreve a arquitetura, o fluxo de dados e os passos para rodar e evoluir o projeto.
