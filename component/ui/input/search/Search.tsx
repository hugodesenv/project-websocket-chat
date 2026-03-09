import { CSSProperties } from "react";

export type TInputSearch = {} & React.ComponentProps<"input">;

const style: CSSProperties = {
  backgroundColor: "#FFFFFF1A",
  borderColor: "transparent",
  borderRadius: "20px",
  color: "gray",
  padding: "10px",
};

export const InputSearch = (prop: TInputSearch) => {
  return (
    <>
      <input style={style} type="search" {...prop} />
    </>
  );
};
