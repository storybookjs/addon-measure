/* eslint-env browser */
import { useEffect, useGlobals } from "@storybook/addons";
import { drawSelectedElement } from "./box-model/visualizer";
import { init, destroy, clear } from "./box-model/canvas";

let nodeAtPointerRef;
let activeNode;

export const withGlobals = (StoryFn, context) => {
  const [{ measureEnabled }] = useGlobals();

  const isInDocs = context.viewMode === "docs";

  useEffect(() => {
    const selectorId = isInDocs ? `#anchor--${context.id} .docs-story` : `root`;
    const wrapper = document.getElementById(selectorId);

    const onKeyDown = (e) => {
      if (e.key === "Alt") {
        activeNode = nodeAtPointerRef;
        drawSelectedElement(activeNode);
      }
    };

    const onMouseOver = (e) => {
      e.stopPropagation();
      nodeAtPointerRef = document.elementFromPoint(e.clientX, e.clientY);
    };

    const onResize = () => {
      drawSelectedElement(activeNode, true);
    };

    if (measureEnabled) {
      init();
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("mouseover", onMouseOver);
      window.addEventListener("resize", onResize);
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("resize", onResize);
      destroy();
    };
  }, [measureEnabled]);

  return StoryFn();
};
