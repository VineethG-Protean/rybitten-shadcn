import { useAtomValue } from "jotai";

import { RYBITTEN_COLORS_ATOM } from "@/lib/atom";

interface ColorPalatteProps {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

export default function ColorPalatte({
  selectedColor,
  setSelectedColor,
}: ColorPalatteProps) {
  const colors = useAtomValue(RYBITTEN_COLORS_ATOM);
  const handleDragStart = (value: string) => {
    setSelectedColor(value);
    document.body.style.userSelect = "none";
  };

  const handleDragEnd = () => {
    document.body.style.userSelect = "";
  };

  return (
    <div className="absolute bottom-2 hover:bottom-8 duration-250 transition-all left-1/2 transform -translate-x-1/2 group">
      <div className="group-hover:scale-150 duration-250 transition-all">
        {selectedColor && (
          <p className="font-bold text-xs bg-white px-2 py-1 rounded-md border w-fit">
            {selectedColor}
          </p>
        )}
        <div className="flex mt-2">
          {colors &&
            colors.map((v: string, i: number) => (
              <div
                key={i}
                className={`p-4 cursor-pointer transition-all duration-500 shadow-md ${
                  v === selectedColor ? "scale-150 z-10" : "scale-125 z-0"
                }`}
                draggable
                style={{ background: v }}
                onClick={() => setSelectedColor(v)}
                onDragStart={() => handleDragStart(v)}
                onDragEnd={handleDragEnd}
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
}
