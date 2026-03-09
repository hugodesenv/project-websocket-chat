import useChatStore from "@/store/useChatStore";
import { TChatMessageDetail } from "../types";

export type TChatBalloon = {} & TChatMessageDetail;

export const ChatBalloon = (prop: TChatBalloon) => {
  const { userId } = useChatStore();
  const hour = prop.created_at?.getHours().toLocaleString("pt-BR").padStart(2, "0");
  const min = prop.created_at?.getMinutes().toLocaleString("pt-BR").padStart(2, "0");
  const hourMin = `${hour}:${min}`;

  return (
    <ul className={prop.owner_id === userId ? "chat-det-balloon-me" : "chat-det-balloon-other"}>
      <li>{prop.owner_name}</li>
      <li>{prop.text}</li>
      <li>{hourMin}</li>
    </ul>
  );
};
