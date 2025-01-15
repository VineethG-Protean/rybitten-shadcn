import { rybHsl2rgb } from "rybitten";
import { ColorCoords, cubes } from "rybitten/cubes";
import { shuffleArray } from "./utils";

const formatCSS = (rgb: ColorCoords): string => {
  return `rgb(${Math.round(rgb[0] * 255)}, ${Math.round(
    rgb[1] * 255
  )}, ${Math.round(rgb[2] * 255)})`;
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

export const generateRandomColorObject = <T extends Record<string, any>>(
  amount: number,
  s: number,
  l: number,
  easingFn = (h: number): number => h,
  oldScool: boolean,
  type: string,
  structure: T
): T => {
  const colors: string[] = shuffleArray([
    ...generateRYBHSLtoRGB(amount, s, l, easingFn, oldScool, type),
  ]);

  const keys = Object.keys(structure);
  const colors_object: any = {};

  keys.forEach((key) => {
    const radius = [0.5, 1, 1.5, 2];

    if (typeof structure[key] === "string") {
      if (key !== "radius") {
        colors_object[key] = colors[Math.floor(Math.random() * colors.length)];
      } else {
        colors_object[key] = radius[Math.floor(Math.random() * radius.length)];
      }
    } else if (typeof structure[key] === "object") {
      colors_object[key] = {
        ...structure[key],
        DEFAULT: colors[Math.floor(Math.random() * colors.length)],
        foreground: colors[Math.floor(Math.random() * colors.length)],
      };
    }
  });

  return colors_object;
};
