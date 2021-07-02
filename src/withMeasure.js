/* eslint-env browser */
import { useEffect } from "@storybook/addons";
import { drawSelectedElement } from "./box-model/visualizer";
import { init, rescale, destroy } from "./box-model/canvas";
import { deepElementFromPoint } from "./util";

let nodeAtPointerRef;
const pointer = { x: 0, y: 0 };

function findAndDrawElement(x, y, tokens) {
  nodeAtPointerRef = deepElementFromPoint(x, y);
  drawSelectedElement(nodeAtPointerRef, tokens);
}

export const withMeasure = (StoryFn, context) => {
  const { measureEnabled } = context.globals;
  const {
    measure: measureParam = {},
    tokens: tokensParam,
  } = context.parameters;

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
    const onMouseMove = (event) => {
      window.requestAnimationFrame(() => {
        event.stopPropagation();
        pointer.x = event.clientX;
        pointer.y = event.clientY;
      });
    };

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  useEffect(() => {
    const onMouseOver = (event) => {
      window.requestAnimationFrame(() => {
        event.stopPropagation();
        findAndDrawElement(event.clientX, event.clientY, tokens);
      });
    };

    const onResize = () => {
      window.requestAnimationFrame(() => {
        rescale();
      });
    };

    if (measureEnabled) {
      document.addEventListener("mouseover", onMouseOver);
      init();
      window.addEventListener("resize", onResize);
      // Draw the element below the pointer when first enabled
      findAndDrawElement(pointer.x, pointer.y, tokens);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      destroy();
    };
  }, [measureEnabled, tokens]);

  return StoryFn();
};
