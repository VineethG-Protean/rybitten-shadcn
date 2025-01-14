import { X } from "lucide-react";

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
import { THEME_ATOM } from "@/lib/atom";
import { useAtomValue } from "jotai";

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
  const { setColorsObject } = useColors();
  const theme = useAtomValue(THEME_ATOM);

  const applyTheme = () => {
    setColorsObject(theme);
  };
  return (
    <div
      className={`${
        expand ? "w-1/4 opacity-100" : "w-0 opacity-0"
      } absolute top-0 right-0 transition-all duration-500 overflow-y-scroll h-full border bg-white`}
    >
      {expand && (
        <div className="flex flex-col gap-4">
          <div className="sticky top-0 backdrop-blur-lg flex justify-between items-center border-b p-2">
            <p className="font-bold">panel</p>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={applyTheme}>apply</Button>
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
          </div>
        </div>
      )}
    </div>
  );
}
