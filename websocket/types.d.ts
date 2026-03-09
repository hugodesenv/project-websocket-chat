export type TWebSocketParameters = {
  "x-token": string;
  "x-id": string;
  "x-owner-name": string;
};

export type TWebSocketFromDetail = {
  id: string;
};

export type TWebSocketEventType = "message" | "connected" | "disconnected";

export type TWebSocketBody = {
  message?: string;
  message_to?: string;
  owner_id?: string;
  owner_name?: string;
  type: TWebSocketEventType;
};
