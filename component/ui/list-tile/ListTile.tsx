import { TChatMessage } from "../chat/types";
import "./css/style.css";

export const ListTile = (prop: { onClick: () => void } & TChatMessage) => {
  const lastMessage = prop.messages?.length ? prop.messages[prop.messages.length - 1].text : "";
  const firstLetter = prop.owner_name.at(0)?.toUpperCase();

  return (
    <>
      <div className="listtile" onClick={() => prop.onClick()}>
        <div>{firstLetter}</div>
        <div>
          <div>{prop.owner_name}</div>
          <div>{lastMessage}</div>
        </div>
      </div>
    </>
  );
};
