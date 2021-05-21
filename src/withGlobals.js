/* eslint-env browser */
import { useEffect, useGlobals } from "@storybook/addons";
import { drawSelectedElement } from "./box-model/visualizer";
import { init, destroy, clear } from "./box-model/canvas";

let nodeAtPointerRef;

export const withGlobals = (StoryFn, context) => {
  const [{ measureEnabled }] = useGlobals();

  useEffect(() => {
    const onMouseOver = (e) => {
      e.stopPropagation();
      nodeAtPointerRef = document.elementFromPoint(e.clientX, e.clientY);
      drawSelectedElement(nodeAtPointerRef);
    };

    const onResize = () => {
      drawSelectedElement(nodeAtPointerRef, true);
    };

    if (measureEnabled) {
      init();
      window.addEventListener("mouseover", onMouseOver);
      window.addEventListener("resize", onResize);
    }

    return () => {
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("resize", onResize);
      destroy();
    };
  }, [measureEnabled]);

  return StoryFn();
};
