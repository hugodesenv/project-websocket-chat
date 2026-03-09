"use client";

import useChatStore from "@/store/useChatStore";
import { useMemo, useState } from "react";
import { InputSearch } from "../../input/search/Search";
import { ListTile } from "../../list-tile/ListTile";
import { Title } from "../../title/Title";
import { ChatMessage } from "../message/ChatMessage";
import { ChatSidebar } from "../sidebar/ChatSidebar";
import { TChatMessage } from "../types";
import "./css/style.css";
import { IUseChatStore } from "@/types/chatSocketTypes";

export const ChatList = () => {
  const [search, setSearch] = useState("");
  const { messages } = useChatStore() as IUseChatStore;
  const [selectedMessage, setSelectedMessage] = useState<TChatMessage>({ messages: [], owner_id: "", owner_name: "" });

  const filteredList = useMemo(() => {
    if (!search.trim()) {
      return messages;
    }
    const term = search.trim().toLowerCase();
    return messages.filter(({ messages }) => messages.filter(({ text }) => text.toLowerCase().includes(term)).length > 0);
  }, [messages, search]);

  const messageList = () => {
    return filteredList.map((prop, index) => {
      return (
        <ListTile
          {...prop}
          onClick={() => {
            setSelectedMessage(prop);
          }}
          key={`${index.toString()}-listtile-chat`}
        />
      );
    });
  };

  return (
    <div className="chatlist-body">
      <ChatSidebar />
      <div className="chatlist-message">
        <Title description="HugoApp" />
        <InputSearch placeholder="Encontrar conversa..." onChange={(e) => setSearch(e.target.value)} />
        <div className="chatlist-history">{messageList()}</div>
      </div>
      <div>
        <ChatMessage {...selectedMessage} />
      </div>
    </div>
  );
};
