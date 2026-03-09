import { LuInbox } from "react-icons/lu";
import "./css/style.css";

export const DataNotFound = () => {
  return (
    <div className="data-not-found">
      <LuInbox size={52} color="#64748B" />
      <span>Opss... Nenhum registro encontrado!</span>
    </div>
  );
};
