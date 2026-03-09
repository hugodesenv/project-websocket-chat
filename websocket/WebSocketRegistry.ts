import WebSocket from "ws";
import { TWebSocketBody, TWebSocketParameters } from "./types";

export class WebSocketRegistry {
  rooms = new Map<string, Set<WebSocket>>();

  addToRoom(key: string, connection: WebSocket) {
    if (!key) console.warn("ID not found in query params.");
    let set = this.rooms.get(key);
    if (!set) this.rooms.set(key, (set = new Set()));
    set.add(connection);
    console.info(`${key} connected 🟢`);
  }

  removeFromRoom(key: string): boolean {
    const set = this.rooms.get(key);
    if (set) {
      console.info(`${key} disconnected ❌`);
      return this.rooms.delete(key);
    }
    return false;
  }

  extractURLParams(host?: string, url?: string) {
    const baseUrl = `http://${host || "localhost"}`;
    const parsedUrl = new URL(url || "/", baseUrl);
    const params = Object.fromEntries(parsedUrl.searchParams);
    return params;
  }

  checkParameters(params: TWebSocketParameters): string {
    if (params["x-token"] !== "1234") {
      return "Invalid token";
    }

    if (!params["x-id"]) {
      return "ID is required";
    }

    return "";
  }

  sendMessage(data: TWebSocketBody) {
    const messageTo = data.message_to ?? "";

    const set = this.rooms.get(messageTo);
    if (set) {
      const payload = JSON.stringify(data);
      for (const ws of set) {
        ws.send(payload);
      }
    }
  }
}

export const webSocketRegistry = new WebSocketRegistry();
