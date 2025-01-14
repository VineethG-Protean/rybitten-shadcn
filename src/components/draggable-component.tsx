import React, { useState } from "react";
import Draggable from "react-draggable";

interface DraggableComponentProps {
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  onDrag?: (e: any, data: any) => void;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  children,
  defaultPosition = { x: 0, y: 0 },
  onDrag,
}) => {
  const [position, setPosition] = useState(defaultPosition);

  const handleDrag = (e: any, data: any) => {
    setPosition({ x: data.x, y: data.y });
    if (onDrag) {
      onDrag(e, data);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <Draggable position={position} onDrag={handleDrag}>
        <div style={{ cursor: "move" }}>{children}</div>
      </Draggable>
    </div>
  );
};

export default DraggableComponent;
