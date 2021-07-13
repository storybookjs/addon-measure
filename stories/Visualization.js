import React, { useEffect, useRef } from "react";
import { drawSelectedElement } from "../src/box-model/visualizer";
import { init, destroy } from "../src/box-model/canvas";

export const Visualization = ({
  render,
  measure: measureParam = {},
  tokens: tokensParam,
}) => {
  const element = useRef(null);

  const measureTokensParam = measureParam.tokens;
  let tokens;
  if (measureTokensParam === false) {
    tokens = false;
  } else if (measureTokensParam && measureTokensParam.disable) {
    tokens = false;
  } else {
    tokens = tokensParam;
  }

  useEffect(() => {
    if (element.current) {
      init();
      drawSelectedElement(element.current, tokens);
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
