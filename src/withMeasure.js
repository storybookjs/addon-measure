/* eslint-env browser */
import { useEffect, useGlobals } from "@storybook/addons";
import { drawSelectedElement } from "./box-model/visualizer";
import { init, destroy, clear } from "./box-model/canvas";

let nodeAtPointerRef;

export const withMeasure = (StoryFn, context) => {
  const [{ measureEnabled }, updateGlobals] = useGlobals();

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Alt") {
        updateGlobals({ measureEnabled: true });
      }
    };

    const onKeyUp = () => {
      updateGlobals({ measureEnabled: false });
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

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
