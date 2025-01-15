import { Shuffle, X } from "lucide-react";

import ColorMapper from "./color-mapper";
import RybittenControls from "./rybitten-controls";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "./ui/button";
import { useColors } from "./hook/useColors";
import { RYBITTEN_PARAMS_ATOM, THEME_ATOM } from "@/lib/atom";
import { useAtom, useAtomValue } from "jotai";
import { Slider } from "./ui/slider";

interface PanelProps {
  expand: boolean;
  setExpand: () => void;
  selectedColor: string;
}

export default function Panel({
  expand,
  setExpand,
  selectedColor,
}: PanelProps) {
  const { setColorsObject, generateRandomColors } = useColors();
  const theme = useAtomValue(THEME_ATOM);
  const [params, setParams] = useAtom(RYBITTEN_PARAMS_ATOM);

  const applyTheme = () => {
    setColorsObject(theme);
  };

  const handleUpdateParams = (
    value: number[] | string | boolean,
    type: string
  ) => {
    setParams((prev) => ({
      ...prev,
      [type]: Array.isArray(value) ? value[0] : undefined,
    }));
  };

  return (
    <div
      className={`${
        expand ? "w-1/4 opacity-100" : "w-0 opacity-0"
      } absolute top-0 right-0 transition-all duration-500 overflow-y-scroll h-full border-l border-l-neutral-500 backdrop-blur-lg`}
    >
      {expand && (
        <div className="flex flex-col gap-4">
          <div className="sticky top-0 bg-neutral-300 flex justify-between items-center border-b border-b-neutral-500 p-2">
            <p className="font-bold">panel</p>

            <div className="flex items-center gap-2">
              <Button size="icon" onClick={generateRandomColors}>
                <Shuffle className="h-5 w-5" />
              </Button>
              <Button variant="outline" onClick={applyTheme}>
                apply
              </Button>
              <Button variant="outline">clear</Button>
              <Button variant="outline" size="icon" onClick={setExpand}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="px-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="color_mapper">
                <AccordionTrigger>Color Mapper</AccordionTrigger>
                <AccordionContent>
                  <ColorMapper selectedColor={selectedColor} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="rybitten_controls">
                <AccordionTrigger>Rybitten Controls</AccordionTrigger>
                <AccordionContent>
                  <RybittenControls />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold">Radius - {params.radius}</p>
              <Slider
                onValueChange={(e) => handleUpdateParams(e, "radius")}
                defaultValue={[params.radius]}
                max={2}
                step={0.5}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
