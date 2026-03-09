import { TChatMessage, TChatMessageDetail } from "@/component/ui/chat/types";
import { IUseChatStoreAuth, WS_BASE } from "@/types/chatSocketTypes";
import { ReadyState } from "react-use-websocket";
import { create } from "zustand";

function buildWsUrl(userId: string, token: string): string {
  const params = new URLSearchParams();
  params.set("x-id", userId);
  params.set("x-token", token);
  return `${WS_BASE}?${params.toString()}`;
}

const useChatStore = create((set, get) => ({
  socket: null,
  messages: [] as TChatMessage[],
  socketState: ReadyState.CLOSED,
  userId: "",
  token: "",

  setAuth: (userId: string, token: string) => {
    set({ userId, token });
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
        // monta a estrutura do json esperado pelo componente
        const payloadMessage: TChatMessageDetail = {
          created_at: new Date(),
          owner_id: json.from,
          owner_name: json.from,
          text: json.message,
        };

        const existingIndex = state.messages.findIndex((m: TChatMessage) => m.title === json.from);

        if (existingIndex >= 0) {
          // já existe: atualizar só o array messages desse item
          const updated = [...state.messages];

          updated[existingIndex] = {
            ...updated[existingIndex],
            messages: [...updated[existingIndex].messages, payloadMessage],
          };

          return { messages: updated };
        }

        // não existe: adicionar novo TChatMessage
        const payload: TChatMessage = {
          title: json.from,
          messages: [payloadMessage],
        };

        return {
          messages: [...state.messages, payload],
        };
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
}));

export default useChatStore;
