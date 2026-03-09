export type TWebSocketParameters = {
  "x-token": string;
  "x-id": string;
};

export type TWebSocketFromDetail = {
  id: string;
};

export type TWebSocketEventType = "message" | "connected" | "disconnected";

export type TWebSocketBody = {
  message?: string;
  message_to?: string;
  from?: string;
  type: TWebSocketEventType;
};
