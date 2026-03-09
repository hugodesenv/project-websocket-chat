import useChatStore from "@/store/useChatStore";
import { useEffect, useMemo, useRef } from "react";
import { LuArchive } from "react-icons/lu";
import { ChatBalloon } from "../balloon/ChatBalloon";
import { ChatDivider } from "../chat-divider/ChatDivider";
import { TChatMessage, TChatMessageDetail } from "../types";
import "./css/style.css";

export const ChatMessage = (prop: { from: string }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const chat = useChatStore((state) => state.messages.find((m: TChatMessage) => m.title === prop.from));
  const title = chat?.title ?? "";
  const messages: TChatMessageDetail[] = useMemo(() => chat?.messages ?? [], [chat]);

  const renderedMessages = useMemo(() => {
    return messages.map((det, index) => {
      const currentDate = det.created_at?.toLocaleDateString("pt-BR") ?? "99:99";
      const previousDate = index > 0 ? (messages[index - 1].created_at?.toLocaleDateString("pt-BR") ?? "99:99") : "";

      const showDivider = currentDate !== previousDate;

      const components = [
        ...(showDivider
          ? [
              <div key={`divid-${index}-det`} style={{ display: "flex", justifyContent: "center" }}>
                <ChatDivider date={currentDate} />
              </div>,
            ]
          : []),
        <div ref={targetRef} key={`${det.owner_name}-${index}`}>
          <ChatBalloon key={index.toString()} {...det} />
        </div>,
      ];

      return components;
    });
  }, [messages]);

  useEffect(() => {
    // scrolling to end page.
    if (targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  if (title.trim() == "") {
    return <span>Nenhum registro foi encontrado</span>;
  }

  return (
    <div className="chat-det-body">
      <div className="chat-det-title">
        <ul>
          <li>{title}</li>
        </ul>
        <button>
          <LuArchive color="red" />
        </button>
      </div>
      <div className="chat-det-balloon">{renderedMessages.flat()}</div>
      <div className="chat-det-input">
        <input type="text" placeholder="Digite uma mensagem" />
      </div>
    </div>
  );
};
