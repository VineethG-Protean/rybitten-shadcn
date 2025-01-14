import { useAtom, useAtomValue } from "jotai";

import { THEME_ATOM, RYBITTEN_COLORS } from "@/lib/atom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

interface ColorMapperProps {
  selectedColor: string;
}

export default function ColorMapper({ selectedColor }: ColorMapperProps) {
  const [theme, setTheme] = useAtom(THEME_ATOM);
  const colors = useAtomValue(RYBITTEN_COLORS);

  const handleDrop = (
    e: React.DragEvent,
    category: string,
    nestedCategory?: string
  ) => {
    e.preventDefault();
    if (selectedColor) {
      const updatedTheme = { ...theme };
      if (nestedCategory) {
        if (nestedCategory === "DEFAULT")
          updatedTheme[category] = {
            ...updatedTheme[category],
            DEFAULT: selectedColor,
          };
        else
          updatedTheme[category] = {
            ...updatedTheme[category],
            foreground: selectedColor,
          };
      } else {
        updatedTheme[category] = selectedColor;
      }

      setTheme(updatedTheme);
    }
  };

  const handleSelectColor = (
    color: string,
    category: string,
    nestedCategory?: string
  ) => {
    console.log(color, category);
    if (color) {
      const updatedTheme = { ...theme };
      if (nestedCategory) {
        if (nestedCategory === "DEFAULT")
          updatedTheme[category] = {
            ...updatedTheme[category],
            DEFAULT: color,
          };
        else
          updatedTheme[category] = {
            ...updatedTheme[category],
            foreground: color,
          };
      } else {
        updatedTheme[category] = color;
      }

      setTheme(updatedTheme);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-2">
      {Object.keys(theme).map((v, i) => (
        <div key={i}>
          {typeof theme[v] === "string" && (
            <div
              className="flex justify-between items-center border px-2 py-1 rounded-md"
              onDrop={(e) => handleDrop(e, v)}
              onDragOver={handleDragOver}
            >
              <p className="text-xs font-bold">{v}</p>
              <div>
                <Select onValueChange={(color) => handleSelectColor(color, v)}>
                  <SelectTrigger className="border-none">
                    <div className="">
                      <p
                        className="h-8 w-8 border rounded-md"
                        style={{ backgroundColor: theme[v] || "transparent" }}
                      ></p>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map((color, index) => (
                      <SelectItem key={index} value={color}>
                        <div className="w-full flex gap-2 items-center">
                          <p
                            className="h-8 w-8 border rounded-md"
                            style={{
                              backgroundColor: color || "transparent",
                            }}
                          ></p>
                          <p className="text-xs">{color}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          {typeof theme[v] === "object" && (
            <div className="px-2 py-1 rounded-md border">
              <p className="text-xs font-bold">{v}</p>
              <div className="mt-2 flex gap-2">
                {Object.keys(theme[v]).map((nestedKey, j) => (
                  <div
                    key={j}
                    className="flex justify-between items-center border px-2 py-1 rounded-md w-full"
                    onDrop={(e) => handleDrop(e, v, nestedKey)}
                    onDragOver={handleDragOver}
                  >
                    <p className="text-xs font-bold w-full">{nestedKey}</p>
                    <Select
                      onValueChange={(color) =>
                        handleSelectColor(color, v, nestedKey)
                      }
                    >
                      <SelectTrigger className="border-none">
                        <p
                          className="h-8 w-8 border rounded-md"
                          style={{
                            backgroundColor:
                              theme[v][nestedKey] || "transparent",
                          }}
                        ></p>
                      </SelectTrigger>
                      <SelectContent>
                        {colors.map((color, index) => (
                          <SelectItem key={index} value={color}>
                            <div className="flex items-center gap-2">
                              <p
                                className="h-8 w-8 border rounded-md"
                                style={{
                                  backgroundColor: color || "transparent",
                                }}
                              ></p>
                              <p className="text-xs">{color}</p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
