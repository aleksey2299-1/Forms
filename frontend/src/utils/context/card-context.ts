import { createContext } from "react";

const CardContext = createContext<{
  index: number;
  elementId: string;
}>({
  index: 0,
  elementId: "",
});

export default CardContext;
