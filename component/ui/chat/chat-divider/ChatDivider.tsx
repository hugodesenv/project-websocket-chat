import "./css/style.css";

export const ChatDivider = (prop: { date: string }) => {
  return (
    <div className="chat-divider">
      <span>{prop.date}</span>
    </div>
  );
};
