import React from "react";
import { Visualization } from "./Visualization";

export default {
  title: "Visualizations/StackingLabels",
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => <Visualization {...args} />;

export const EverythingUniform = Template.bind({});
EverythingUniform.args = {
  render: (ref) => (
    <div
      ref={ref}
      style={{
        outline: "1px solid black",
        width: 256,
        height: 256,
        border: "8px solid transparent",
        padding: 16,
        margin: 32,
      }}
    ></div>
  ),
};

export const Asymmetric = Template.bind({});
Asymmetric.args = {
  render: (ref) => (
    <div
      ref={ref}
      style={{
        outline: "1px solid black",
        width: 256,
        height: 256,
        margin: "8px 16px 32px 64px",
        padding: "64px 32px 16px 8px",
        borderTop: "8px solid transparent",
        borderRight: "16px solid transparent",
        borderBottom: "32px solid transparent",
        borderLeft: "12px solid transparent",
      }}
    ></div>
  ),
};

export const MoreAsymmetric = Template.bind({});
MoreAsymmetric.args = {
  render: (ref) => (
    <div
      ref={ref}
      style={{
        outline: "1px solid black",
        width: 256,
        height: 256,
        margin: "0 0 32px 64px",
        padding: "64px 32px 16px 0",
        borderTop: "8px solid transparent",
        borderRight: "16px solid transparent",
        borderLeft: "12px solid transparent",
      }}
    ></div>
  ),
};
