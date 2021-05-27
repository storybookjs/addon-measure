/* eslint-env browser */
import { useEffect, useGlobals } from "@storybook/addons";
import { drawSelectedElement } from "./box-model/visualizer";
import { init, destroy } from "./box-model/canvas";
import { useHotKey } from "./useHotKey";

let nodeAtPointerRef;

export const withMeasure = (StoryFn) => {
  const [{ measureEnabled }, updateGlobals] = useGlobals();

  useHotKey(updateGlobals);

  useEffect(() => {
    const onMouseOver = (e) => {
      window.requestAnimationFrame(() => {
        e.stopPropagation();
        nodeAtPointerRef = document.elementFromPoint(e.clientX, e.clientY);
        drawSelectedElement(nodeAtPointerRef);
      });
    };

    const onResize = () => {
      window.requestAnimationFrame(() => {
        drawSelectedElement(nodeAtPointerRef, true);
      });
    };

    if (measureEnabled) {
      init();
      document.addEventListener("mouseover", onMouseOver);
      document.addEventListener("resize", onResize);
    }

    return () => {
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("resize", onResize);
      destroy();
    };
  }, [measureEnabled]);

  return StoryFn();
};
