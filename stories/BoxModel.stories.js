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

export const MarginAsymmetric = Template.bind({});
MarginAsymmetric.args = {
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
MarginAsymmetric.storyName = "Margin asymmetric";

export const PaddingUniform = Template.bind({});
PaddingUniform.args = {
  render: (ref) => (
    <div ref={ref} style={{ width: 256, height: 256, padding: 16 }}></div>
  ),
};
PaddingUniform.storyName = "Padding uniform";

export const PaddingAsymmetric = Template.bind({});
PaddingAsymmetric.args = {
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
PaddingAsymmetric.storyName = "Padding asymmetric";

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

export const BorderAsymmetric = Template.bind({});
BorderAsymmetric.args = {
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
BorderAsymmetric.storyName = "Border asymmetric";

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

export const EverythingAsymmetric = Template.bind({});
EverythingAsymmetric.args = {
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
EverythingAsymmetric.storyName = "Everything asymmetric";

export const EverythingAsymmetric2 = Template.bind({});
EverythingAsymmetric2.args = {
  render: (ref) => (
    <div
      ref={ref}
      style={{
        width: 256,
        height: 256,
        margin: "0 0 32px 64px",
        padding: "64px 32px 16px 0",
        borderTop: "8px solid #ccc",
        borderRight: "16px solid #ccc",
        borderLeft: "12px solid #ccc",
      }}
    ></div>
  ),
};
EverythingAsymmetric2.storyName = "Everything asymmetric 2";

export const DecimalSizing = Template.bind({});
DecimalSizing.args = {
  render: (ref) => (
    <div
      ref={ref}
      style={{
        width: 250.100006103515625,
        height: 250.100006103515625,
      }}
    ></div>
  ),
};
