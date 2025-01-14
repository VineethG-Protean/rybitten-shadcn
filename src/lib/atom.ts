import { atom } from "jotai";
import { RYBITTEN_PARAMS, SHADCN_VARIABLES } from "./types";

export const THEME_ATOM = atom<SHADCN_VARIABLES>({
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
});

export const RYBITTEN_COLORS = atom<string[]>([]);

export const RYBITTEN_PARAMS_ATOM = atom<RYBITTEN_PARAMS>({
  amount: 12,
  s: 1,
  l: 0.5,
  hFn: 1,
  oldScool: false,
  type: "apple80s",
});
