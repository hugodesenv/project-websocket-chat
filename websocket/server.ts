import { WebSocketServer } from "ws";
import { TWebSocketBody, TWebSocketParameters } from "./types";
import { webSocketRegistry } from "./WebSocketRegistry";

const wss = new WebSocketServer(
  {
    port: 3001,
  },
  () => {
    console.log(`Websocket server was started! 🚀`);
  },
);

wss.on("connection", function connection(ws, request) {
  const params = webSocketRegistry.extractURLParams(request.headers.host, request.url) as TWebSocketParameters;

  webSocketRegistry.addToRoom(params["x-id"], ws);
  console.info(`User ${params["x-id"]} add to room. 👨🏻‍💼`);

  ws.on("message", function incoming(input) {
    const exception = webSocketRegistry.checkParameters(params);

    if (exception !== "") {
      console.warn(`ATENÇÃO: ${exception}`);
      return;
    }

    const { message, message_to }: TWebSocketBody = JSON.parse(input.toString());

    const data: TWebSocketBody = {
      type: "message",
      owner_id: params["x-id"],
      owner_name: params["x-owner-name"],
      message_to,
      message,
    };

    webSocketRegistry.sendMessage(data);
  });

  ws.on("close", () => {
    const success = webSocketRegistry.removeFromRoom(params["x-id"]);
    console.log(`excluiu? ${success}... ${params["x-id"]}`);

    if (success) {
      console.log("Usuário desconectado");
      ws.send(`User disconnected: ${params["x-id"]}`);
    }
  });

  ws.on("error", () => {
    console.warn("erro...");
  });
});
