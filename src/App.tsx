import { useState } from "react";

import { PanelRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import Demo from "@/components/demo";
import Panel from "@/components/panel";
import ColorPalatte from "./components/color-palatte";

function App() {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <div className="relative w-full h-full p-4">
      <Demo />

      <ColorPalatte
        selectedColor={selectedColor}
        setSelectedColor={(color) => setSelectedColor(color)}
      />

      <Button
        size="icon"
        className="absolute top-4 right-4"
        onClick={() => setExpand(!expand)}
      >
        <PanelRight className="h-4 w-4" />
      </Button>

      <Panel
        expand={expand}
        setExpand={() => setExpand(!expand)}
        selectedColor={selectedColor!}
      />
    </div>
  );
}

export default App;
