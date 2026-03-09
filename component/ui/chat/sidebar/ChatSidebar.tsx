import useChatStore from "@/store/useChatStore";
import { IUseChatStore } from "@/types/chatSocketTypes";
import { LuWifi, LuWifiOff } from "react-icons/lu";
import { ReadyState } from "react-use-websocket";
import "./css/style.css";

export const ChatSidebar = () => {
  const { connect, socketState, setAuth, disconnect } = useChatStore() as IUseChatStore;
  const isRunning = socketState === ReadyState.CLOSING || socketState === ReadyState.CONNECTING;

  function handleConnect(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (socketState === ReadyState.CLOSED || socketState === ReadyState.UNINSTANTIATED) {
      setAuth("hugo", "1234");
      connect();
      return;
    } else if (socketState === ReadyState.OPEN) {
      disconnect();
    }
  }

  return (
    <>
      <div className="chatlist-menu">
        <button disabled={isRunning} onClick={handleConnect}>
          {socketState === ReadyState.OPEN ? <LuWifi size={20} /> : <LuWifiOff size={20} />}
        </button>
      </div>
    </>
  );
};
