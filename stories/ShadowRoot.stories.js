import React from "react";

import { ShadowRoot } from "./ShadowRoot";

export default {
  title: "Visualizations/ShadowRoot",
  component: ShadowRoot,
};

const Template = (args) => (
  <div
    style={{
      display: "inline-block",
      padding: 64,
    }}
  >
    <ShadowRoot {...args} />
  </div>
);

export const Root = Template.bind({});

export const Nested = Template.bind({});
Nested.args = {
  drawMode: "NESTED",
};
