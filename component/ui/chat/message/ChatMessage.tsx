import useChatStore from "@/store/useChatStore";
import { KeyboardEventHandler, useEffect, useMemo, useRef, useState } from "react";
import { LuArchive } from "react-icons/lu";
import { ChatBalloon } from "../balloon/ChatBalloon";
import { ChatDivider } from "../chat-divider/ChatDivider";
import { DataNotFound } from "../data-not-found/DataNotFound";
import "./css/style.css";

export const ChatMessage = (prop: { owner_id: string; owner_name: string }) => {
  const [inputText, setInputText] = useState("");

  const { sendMessage } = useChatStore();
  const message = useChatStore((s) => s.messages.find((m) => m.owner_id === prop.owner_id));
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    /** scrolling to the end of page. */
    if (targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [message]);

  const renderedMessages = useMemo(() => {
    const messages = message?.messages ?? [];
    return message?.messages.map((det, index) => {
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
  }, [message]);

  const onInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      sendMessage(inputText, prop.owner_id);
      setInputText("");
    }
  };

  return prop.owner_id.length <= 0 ? (
    <DataNotFound />
  ) : (
    <div className="chat-det-body">
      <div className="chat-det-title">
        <ul>
          <li>{prop.owner_name}</li>
        </ul>
        <button>
          <LuArchive color="red" />
        </button>
      </div>
      <div className="chat-det-balloon">{renderedMessages?.flat?.() ?? null}</div>
      <div className="chat-det-input">
        <input
          type="text"
          placeholder="Digite uma mensagem e pressione enter"
          onKeyDown={onInputKeyDown}
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        />
      </div>
    </div>
  );
};
