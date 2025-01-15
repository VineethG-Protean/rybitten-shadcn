import React, { createContext, useEffect, useState } from "react";
import { generateRandomColorObject, generateRYBHSLtoRGB } from "@/lib/rybitten";
import { useAtomValue, useSetAtom } from "jotai";
import {
  RYBITTEN_COLORS_ATOM,
  RYBITTEN_PARAMS_ATOM,
  THEME_ATOM,
} from "@/lib/atom";
import { SHADCN_VARIABLES } from "@/lib/types";

type StyleContextType = {
  setColorsObject: (colors: SHADCN_VARIABLES) => void;
  generateRandomColors: () => void;
};

const EMPTY_SHADCN_OBJECT: SHADCN_VARIABLES = {
  border: "",
  input: "",
  ring: "",
  background: "",
  foreground: "",
  primary: {
    DEFAULT: "",
    foreground: "",
  },
  secondary: {
    DEFAULT: "",
    foreground: "",
  },
  destructive: {
    DEFAULT: "",
    foreground: "",
  },
  muted: {
    DEFAULT: "",
    foreground: "",
  },
  accent: {
    DEFAULT: "",
    foreground: "",
  },
  popover: {
    DEFAULT: "",
    foreground: "",
  },
  card: {
    DEFAULT: "",
    foreground: "",
  },
  chart_1: "",
  chart_2: "",
  chart_3: "",
  chart_4: "",
  chart_5: "",
  radius: "",
};

export const StyleContext = createContext<StyleContextType | undefined>(
  undefined
);

export const StyleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const rybittenParams = useAtomValue(RYBITTEN_PARAMS_ATOM);
  const setAtomColors = useSetAtom(RYBITTEN_COLORS_ATOM);
  const [colorsObject, setColorsObject] = useState<SHADCN_VARIABLES>();
  const setTheme = useSetAtom(THEME_ATOM);

  const generateRandomColors = () => {
    const colors_object = generateRandomColorObject<SHADCN_VARIABLES>(
      rybittenParams.amount,
      rybittenParams.s,
      rybittenParams.l,
      (h) => h * rybittenParams.easingFn,
      rybittenParams.oldScool,
      rybittenParams.type,
      EMPTY_SHADCN_OBJECT
    );

    setColorsObject(colors_object);
    setTheme(colors_object);
  };

  useEffect(()=> {
    document.documentElement.style.setProperty(
      "--radius",
      `${rybittenParams.radius}rem`
    );
  },[rybittenParams.radius])

  useEffect(() => {
    const colors = generateRYBHSLtoRGB(
      rybittenParams.amount,
      rybittenParams.s,
      rybittenParams.l,
      (h) => h * rybittenParams.easingFn,
      rybittenParams.oldScool,
      rybittenParams.type
    );
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

      document.documentElement.style.setProperty(
        "--radius",
        `${colorsObject.radius}rem`
      );
    }
  }, [rybittenParams, colorsObject]);

  return (
    <StyleContext.Provider
      value={{
        setColorsObject,
        generateRandomColors,
      }}
    >
      {children}
    </StyleContext.Provider>
  );
};
