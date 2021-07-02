import React from "react";
import { Visualization } from "./Visualization";

export default {
  title: "Visualizations/DesignTokens",
  parameters: {
    layout: "fullscreen",
  },
};

const defaultRender = (ref) => (
  <div
    ref={ref}
    style={{
      outline: "1px solid black",
      width: 256,
      height: 255,
      border: "8px solid transparent",
      borderBottomWidth: 7,
      padding: "16px 16px 15px 16px",
      margin: "32px 32px 31px 32px",
    }}
  ></div>
);

const Template = ({ render = defaultRender, ...args }, { parameters }) => (
  <Visualization
    {...args}
    render={render}
    measure={parameters.measure}
    tokens={parameters.tokens}
  />
);

export const ThemeUIArrayScale = Template.bind({});
ThemeUIArrayScale.parameters = {
  tokens: {
    borderWidths: [1, 3, 8],
    sizes: [16, 32, 64, 128, 256],
    space: [8, 16, 32, 64],
  },
};

export const ThemeUIObjectScale = Template.bind({});
ThemeUIObjectScale.parameters = {
  tokens: {
    borderWidths: { sm: 1, md: 3, lg: 8 },
    sizes: { sm: 16, md: 32, lg: 64, xl: 128, xxl: 256 },
    space: { sm: 8, md: 16, lg: 32, xl: 64 },
  },
};

export const DisabledWithFalse = Template.bind({});
DisabledWithFalse.storyName = "Disabled (with false)";
DisabledWithFalse.parameters = {
  measure: { tokens: false },
  tokens: {
    borderWidths: { sm: 1, md: 3, lg: 8 },
    sizes: { sm: 16, md: 32, lg: 64, xl: 128, xxl: 256 },
    space: { sm: 8, md: 16, lg: 32, xl: 64 },
  },
};

export const DisabledWithDisableTrue = Template.bind({});
DisabledWithDisableTrue.storyName = "Disabled (with { disable: true })";
DisabledWithDisableTrue.parameters = {
  measure: { tokens: { disable: true } },
  tokens: {
    borderWidths: { sm: 1, md: 3, lg: 8 },
    sizes: { sm: 16, md: 32, lg: 64, xl: 128, xxl: 256 },
    space: { sm: 8, md: 16, lg: 32, xl: 64 },
  },
};
