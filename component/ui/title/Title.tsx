import { CSSProperties } from "react";

const style: CSSProperties = {
  color: "#FAFAFA",
  fontWeight: 700,
  fontSize: "20px",
};

export const Title = (props: { description: string }) => {
  return (
    <>
      <span style={style}>{props.description}</span>
    </>
  );
};
