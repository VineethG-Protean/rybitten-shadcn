import { useContext } from "react";
import { ColorContext } from "../providers/color-provider";

export const useColors = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColors must be used within a ColorProvider");
  }
  return context;
};
