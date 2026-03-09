import { TChatMessage, TChatMessageDetail } from "@/component/ui/chat/types";
import { IUseChatStore, IUseChatStoreAuth, WS_BASE } from "@/types/chatSocketTypes";
import { ReadyState } from "react-use-websocket";
import { create } from "zustand";

function buildWsUrl(userId: string, token: string): string {
  const params = new URLSearchParams();
  params.set("x-id", userId);
  params.set("x-token", token);
  return `${WS_BASE}?${params.toString()}`;
}

const useChatStore = create<IUseChatStore>((set, get) => ({
  socket: null,
  messages: [] as TChatMessage[],
  socketState: ReadyState.CLOSED,
  userId: "",
  userName: "",
  token: "",

  setAuth: (userId: string, userName: string, token: string) => {
    set({ userId, token, userName });
  },

  // açao para conectar
  connect: () => {
    const { userId, token } = get() as IUseChatStoreAuth;

    if (!userId || !token) {
      console.warn("Chame setAuth(userId, token) antes de connect()");
      return;
    }

    const url = buildWsUrl(userId, token);
    const ws = new WebSocket(url);

    set({ socket: ws, socketState: ws.readyState });

    ws.onmessage = (event) => {
      const json = JSON.parse(event.data);

      set((state) => {
        const payload: TChatMessageDetail = {
          created_at: new Date(),
          owner_id: json.owner_id,
          owner_name: json.owner_name,
          text: json.message,
        };

        return updateMessageList(state.messages, payload.owner_id, payload.owner_name, payload);
      });
    };

    ws.onclose = () => set({ socket: null, socketState: ReadyState.CLOSED });
    ws.onopen = () => set({ socketState: ws.readyState });
    ws.onerror = () => set({ socket: null, socketState: ReadyState.CLOSED });
  },

  // ação para desconectar
  disconnect: () => {
    set((state) => {
      state.socket?.close();
      return {
        socket: null,
        socketState: ReadyState.CLOSED,
      };
    });
  },

  sendMessage: (message: string, message_to: string) => {
    const ws = get().socket as WebSocket;
    const payload = JSON.stringify({ message, message_to });

    ws.send(payload);

    set((state) => {
      const payloadMessage: TChatMessageDetail = {
        created_at: new Date(),
        owner_id: state.userId,
        owner_name: state.userName,
        text: message,
      };

      // adiciona nossa conversa para atualizar a UI.
      return updateMessageList(state.messages, message_to, state.userName, payloadMessage);
    });
  },
}));

export default useChatStore;

function updateMessageList(messages: TChatMessage[], owner_id: string, owner_name: string, payloadMessage: TChatMessageDetail) {
  const existingIndex = messages.findIndex((m: TChatMessage) => m.owner_id === owner_id);

  if (existingIndex >= 0) {
    // já existe: atualizar só o array messages desse item
    const updated = [...messages];

    updated[existingIndex] = {
      ...updated[existingIndex],
      messages: [...updated[existingIndex].messages, payloadMessage],
    };

    return { messages: updated };
  }

  // não existe: adicionar novo TChatMessage
  const payload: TChatMessage = { owner_id, owner_name, messages: [payloadMessage] };

  return {
    messages: [...messages, payload],
  };
}
