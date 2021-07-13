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
    space: [4, 8, 16, 32, 64],
  },
};

export const ThemeUIObjectScale = Template.bind({});
ThemeUIObjectScale.parameters = {
  tokens: {
    borderWidths: { sm: 1, md: 3, lg: 8 },
    sizes: { sm: 16, md: 32, lg: 64, xl: 128, xxl: 256 },
    space: { xxs: 4, xs: 8, sm: 16, md: 32, lg: 64 },
  },
};

export const PxUnits = Template.bind({});
PxUnits.parameters = {
  tokens: {
    borderWidths: { sm: "1px", md: "3px", lg: "8px" },
    sizes: { sm: "16px", md: "32px", lg: "64px", xl: "128px", xxl: "256px" },
    space: { xxs: "4px", xs: "8px", sm: "16px", md: "32px", lg: "64px" },
  },
};

export const RemUnits = Template.bind({});
RemUnits.parameters = {
  tokens: {
    borderWidths: { sm: 1, md: 3, lg: 8 },
    sizes: { sm: "1rem", md: "2rem", lg: "4rem", xl: "8rem", xxl: "16rem" },
    space: { xxs: "0.25rem", xs: "0.5rem", sm: "1rem", md: "2rem", lg: "4rem" },
  },
};

export const EmUnits = Template.bind({});
EmUnits.decorators = [
  (Story) => (
    // This will make the associated sizes or space token be "one step down" on
    // the scale, relative to RemUnits
    <div style={{ fontSize: "2rem" }}>
      <Story />
    </div>
  ),
];
EmUnits.parameters = {
  tokens: {
    borderWidths: { sm: 1, md: 3, lg: 8 },
    sizes: { sm: "1em", md: "2em", lg: "4em", xl: "8em", xxl: "16em" },
    space: { xxs: "0.25em", xs: "0.5em", sm: "1em", md: "2em", lg: "4em" },
  },
};

export const CustomScaleMap = Template.bind({});
CustomScaleMap.parameters = {
  tokens: {
    "border.width": [1, 3, 8],
    size: [4, 8, 16, 32, 64, 128, 256],
    scaleMap: {
      border: "border.width",
      content: "size",
      margin: "size",
      padding: "size",
    },
  },
};

export const DuplicateScaleValues = Template.bind({});
DuplicateScaleValues.parameters = {
  tokens: {
    space: { sm: 16, md1: 32, md2: 32 },
  },
};

export const DisabledWithFalse = Template.bind({});
DisabledWithFalse.storyName = "Disabled (with false)";
DisabledWithFalse.parameters = {
  measure: { tokens: false },
  tokens: {
    borderWidths: { sm: 1, md: 3, lg: 8 },
    sizes: { sm: 16, md: 32, lg: 64, xl: 128, xxl: 256 },
    space: { xxs: 4, xs: 8, sm: 16, md: 32, lg: 64 },
  },
};

export const DisabledWithDisableTrue = Template.bind({});
DisabledWithDisableTrue.storyName = "Disabled (with { disable: true })";
DisabledWithDisableTrue.parameters = {
  measure: { tokens: { disable: true } },
  tokens: {
    borderWidths: { sm: 1, md: 3, lg: 8 },
    sizes: { sm: 16, md: 32, lg: 64, xl: 128, xxl: 256 },
    space: { xxs: 4, xs: 8, sm: 16, md: 32, lg: 64 },
  },
};
