/* eslint-env browser */
import { useEffect, useChannel, useCallback } from "@storybook/addons";
import { UPDATE_GLOBALS } from "@storybook/core-events";
import { drawSelectedElement } from "./box-model/visualizer";
import { init, rescale, destroy } from "./box-model/canvas";
import { useHotKey } from "./useHotKey";
import { deepElementFromPoint } from "./util";

let nodeAtPointerRef;

export const withMeasure = (StoryFn, context) => {
  const { measureEnabled } = context.globals;

  const emit = useChannel({});
  const updateGlobals = useCallback(
    (newGlobals) => emit(UPDATE_GLOBALS, { globals: newGlobals }),
    [emit]
  );

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
