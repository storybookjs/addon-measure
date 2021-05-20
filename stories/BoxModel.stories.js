import React, { useEffect, useRef } from "react";
import { drawSelectedElement } from "../src/box-model/visualizer";
import { init, destroy } from "../src/box-model/canvas";

export default {
  title: "Visualizations/BoxModel",
};

const Template = ({ render }) => {
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

export const MarginUniform = Template.bind({});
MarginUniform.args = {
  render: (ref) => (
    <div ref={ref} style={{ width: 256, height: 256, margin: 16 }}></div>
  ),
};
MarginUniform.storyName = "Margin uniform";

export const MarginNonUniform = Template.bind({});
MarginNonUniform.args = {
  render: (ref) => (
    <div
      ref={ref}
      style={{
        width: 256,
        height: 256,
        margin: "16px 32px 64px 8px",
      }}
    ></div>
  ),
};
MarginNonUniform.storyName = "Margin non-uniform";

export const PaddingUniform = Template.bind({});
PaddingUniform.args = {
  render: (ref) => (
    <div ref={ref} style={{ width: 256, height: 256, padding: 16 }}></div>
  ),
};
PaddingUniform.storyName = "Padding uniform";

export const PaddingNonUniform = Template.bind({});
PaddingNonUniform.args = {
  render: (ref) => (
    <div
      ref={ref}
      style={{
        width: 256,
        height: 256,
        padding: "16px 32px 64px 8px",
      }}
    ></div>
  ),
};
PaddingNonUniform.storyName = "Padding non-uniform";

export const BorderUniform = Template.bind({});
BorderUniform.args = {
  render: (ref) => (
    <div
      ref={ref}
      style={{ width: 256, height: 256, border: "8px solid #ccc" }}
    ></div>
  ),
};
BorderUniform.storyName = "Border uniform";

export const BorderNonUniform = Template.bind({});
BorderNonUniform.args = {
  render: (ref) => (
    <div
      ref={ref}
      style={{
        width: 256,
        height: 256,
        borderTop: "8px solid #ccc",
        borderRight: "16px solid #ccc",
        borderBottom: "32px solid #ccc",
        borderLeft: "12px solid #ccc",
      }}
    ></div>
  ),
};
BorderNonUniform.storyName = "Border non-uniform";

export const EverythingUniform = Template.bind({});
EverythingUniform.args = {
  render: (ref) => (
    <div
      ref={ref}
      style={{
        width: 256,
        height: 256,
        border: "8px solid #ccc",
        padding: 16,
        margin: 32,
      }}
    ></div>
  ),
};
EverythingUniform.storyName = "Everything uniform";

export const EverythingNonUniform = Template.bind({});
EverythingNonUniform.args = {
  render: (ref) => (
    <div
      ref={ref}
      style={{
        width: 256,
        height: 256,
        margin: "8px 16px 32px 64px",
        padding: "64px 32px 16px 8px",
        borderTop: "8px solid #ccc",
        borderRight: "16px solid #ccc",
        borderBottom: "32px solid #ccc",
        borderLeft: "12px solid #ccc",
      }}
    ></div>
  ),
};
EverythingNonUniform.storyName = "Everything non-uniform";
