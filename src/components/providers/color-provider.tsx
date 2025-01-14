import React, { createContext, useEffect, useState } from "react";
import { generateRYBHSLtoRGB } from "@/lib/rybitten";
import { useAtomValue, useSetAtom } from "jotai";
import { RYBITTEN_COLORS, RYBITTEN_PARAMS_ATOM } from "@/lib/atom";
import { SHADCN_VARIABLES } from "@/lib/types";

type ColorContextType = {
  setColorsObject: (colors: SHADCN_VARIABLES) => void;
};

export const ColorContext = createContext<ColorContextType | undefined>(
  undefined
);

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const rybittenParams = useAtomValue(RYBITTEN_PARAMS_ATOM);
  const setAtomColors = useSetAtom(RYBITTEN_COLORS);
  const [colorsObject, setColorsObject] = useState<SHADCN_VARIABLES>();

  useEffect(() => {
    const colors = generateRYBHSLtoRGB(
      rybittenParams.amount,
      rybittenParams.s,
      rybittenParams.l,
      (h) => h * rybittenParams.hFn,
      rybittenParams.oldScool,
      rybittenParams.type
    );

    //UPDATE STATE
    setAtomColors(colors);

    if (colorsObject) {
      document.documentElement.style.setProperty(
        "--border",
        colorsObject.border
      );
      document.documentElement.style.setProperty("--input", colorsObject.input);
      document.documentElement.style.setProperty("--ring", colorsObject.ring);
      document.documentElement.style.setProperty(
        "--background",
        colorsObject.background
      );
      document.documentElement.style.setProperty(
        "--foreground",
        colorsObject.foreground
      );
      document.documentElement.style.setProperty(
        "--primary",
        colorsObject.primary.DEFAULT
      );
      document.documentElement.style.setProperty(
        "--secondary",
        colorsObject.secondary.DEFAULT
      );
      document.documentElement.style.setProperty(
        "--destructive",
        colorsObject.destructive.DEFAULT
      );
      document.documentElement.style.setProperty(
        "--muted",
        colorsObject.muted.DEFAULT
      );
      document.documentElement.style.setProperty(
        "--accent",
        colorsObject.accent.DEFAULT
      );
      document.documentElement.style.setProperty(
        "--popover",
        colorsObject.popover.DEFAULT
      );
      document.documentElement.style.setProperty(
        "--card",
        colorsObject.card.DEFAULT
      );

      document.documentElement.style.setProperty(
        "--chart-1",
        colorsObject.chart_1
      );

      document.documentElement.style.setProperty(
        "--chart-2",
        colorsObject.chart_2
      );

      document.documentElement.style.setProperty(
        "--chart-3",
        colorsObject.chart_3
      );

      document.documentElement.style.setProperty(
        "--chart-4",
        colorsObject.chart_4
      );

      document.documentElement.style.setProperty(
        "--chart-5",
        colorsObject.chart_5
      );
    }
  }, [rybittenParams, colorsObject]);

  return (
    <ColorContext.Provider
      value={{
        setColorsObject,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};
