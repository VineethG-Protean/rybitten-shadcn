import { hslToRgb, ryb2rgb, rybHsl2rgb } from "rybitten";
import { ColorCoords, cubes } from "rybitten/cubes";

const formatCSS = (rgb: ColorCoords): string => {
  return `rgb(${Math.round(rgb[0] * 255)}, ${Math.round(
    rgb[1] * 255
  )}, ${Math.round(rgb[2] * 255)})`;
};

/**
 * Converts RYB color coordinates to RGB color space
 * @param amount
 * @param coords
 * @param cube
 * @param easingFn
 */
export const generateRYBtoRGB = (
  amount: number,
  coords: ColorCoords,
  cube: string,
  easingFn = (h: number): number => h
) => {
  new Array(amount).fill(0).map(() => {
    return formatCSS(
      ryb2rgb(coords, {
        cube: cubes.get(cube)?.cube,
        easingFn,
      })
    );
  });
};

/**
 * Converts HSL (Hue, Saturation, Lightness) color values to RGB color space.
 * @param amount
 * @param coords
 */
export const generateHSLtoRGB = (amount: number, coords: ColorCoords) => {
  new Array(amount).fill(0).map(() => {
    return formatCSS(hslToRgb(coords));
  });
};

export const generateRYBHSLtoRGB = (
  amount: number,
  s: number,
  l: number,
  easingFn = (h: number): number => h,
  oldScool: boolean = false,
  type: string
) =>
  new Array(amount).fill(0).map((_, i) => {
    const h = oldScool
      ? easingFn(1 - i / amount) * 360 + 120
      : easingFn((i + 1) / amount) * 360;
    return formatCSS(
      rybHsl2rgb([h, s, l], {
        cube: cubes.get(type)?.cube,
      })
    );
  });

export const generateRandomColorObject = (
  amount: number,
  s: number,
  l: number,
  hFn = (h: number): number => h,
  oldScool: boolean,
  type: string
) => {
  const colors: string[] = [
    ...generateRYBHSLtoRGB(amount, s, l, hFn, oldScool, type),
  ];

  return {
    border: colors[0],
    input: colors[1],
    ring: colors[2],
    background: colors[3],
    foreground: colors[4],
    primary: {
      DEFAULT: colors[1],
      foreground: "hsl(var(--primary-foreground))",
    },
    secondary: {
      DEFAULT: colors[2],
      foreground: "hsl(var(--secondary-foreground))",
    },
    destructive: {
      DEFAULT: colors[3],
      foreground: "hsl(var(--destructive-foreground))",
    },
    muted: {
      DEFAULT: colors[8],
      foreground: "hsl(var(--muted-foreground))",
    },
    accent: {
      DEFAULT: colors[9],
      foreground: "hsl(var(--accent-foreground))",
    },
    popover: {
      DEFAULT: colors[1],
      foreground: "hsl(var(--popover-foreground))",
    },
    card: {
      DEFAULT: colors[2],
      foreground: "hsl(var(--card-foreground))",
    },
  };
};
