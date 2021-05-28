import React from "react";
import { drawSelectedElement } from "../src/box-model/visualizer";
import { init, destroy } from "../src/box-model/canvas";

export const ShadowRoot = ({
  label = "Hello from shadow DOM",
  drawMode = "ROOT",
}) => {
  const ref = React.useRef();

  React.useEffect(() => {
    if (!ref.current.attachShadow) return;

    ref.current.attachShadow({ mode: "open" });

    ref.current.shadowRoot.innerHTML = `
      <style>
        button {
          font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 700;
          border: 0;
          border-radius: 3em;
          cursor: pointer;
          display: inline-block;
          line-height: 1;
          color: white;
          background-color: tomato;
          font-size: 14px;
          padding: 11px 20px;
        }
        button:hover {
          text-decoration: underline;
        }
        button:focus {
          box-shadow: inset 0 0 0 2px maroon;
          outline: 0;
        }
        button:active {
          background-color: firebrick;
        }
      </style>
      <button>${label}</button>
    `;

    init();
    drawSelectedElement(
      drawMode === "ROOT" ? ref.current : ref.current.shadowRoot.children[1]
    );

    return () => {
      destroy();
    };
  }, []);

  return <div ref={ref} />;
};
