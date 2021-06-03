/* eslint-env browser */
import { useEffect, useGlobals } from "@storybook/addons";
import { drawSelectedElement } from "./box-model/visualizer";
import { init, rescale, destroy } from "./box-model/canvas";
import { useHotKey } from "./useHotKey";
import { deepElementFromPoint } from "./util";

let nodeAtPointerRef;

export const withMeasure = (StoryFn, context) => {
  const [{ measureEnabled }, updateGlobals] = useGlobals();

  useEffect(() => {
    return useHotKey(updateGlobals);
  }, []);

  useEffect(() => {
    const onMouseOver = (event) => {
      window.requestAnimationFrame(() => {
        event.stopPropagation();
        nodeAtPointerRef = deepElementFromPoint(event.clientX, event.clientY);
        drawSelectedElement(nodeAtPointerRef);
      });
    };

    const onResize = () => {
      window.requestAnimationFrame(() => {
        rescale();
      });
    };

    if (measureEnabled) {
      init();
      document.addEventListener("mouseover", onMouseOver);
      window.addEventListener("resize", onResize);
    }

    return () => {
      document.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("resize", onResize);
      destroy();
    };
  }, [measureEnabled]);

  return StoryFn();
};
