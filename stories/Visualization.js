import React, { useEffect, useRef } from "react";
import { drawSelectedElement } from "../src/box-model/visualizer";
import { init, destroy } from "../src/box-model/canvas";

export const Visualization = ({ render }) => {
  const element = useRef(null);

  useEffect(() => {
    if (element.current) {
      init();
      drawSelectedElement(element.current);
    }

    return () => {
      destroy();
    };
  }, [element]);

  return (
    <div
      style={{
        display: "inline-block",
        padding: 64,
      }}
    >
      {render(element)}
    </div>
  );
};
