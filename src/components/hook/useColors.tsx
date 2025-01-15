import { useContext } from "react";
import { StyleContext } from "../providers/style-provider";

export const useColors = () => {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error("useColors must be used within a ColorProvider");
  }
  return context;
};
