import React, { useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { Icons, IconButton } from "@storybook/components";
import { TOOL_ID } from "./constants";

export const Tool = () => {
  const [{ measureEnabled }, updateGlobals] = useGlobals();

  const toggleMyTool = useCallback(
    () =>
      updateGlobals({
        measureEnabled: !measureEnabled,
      }),
    [measureEnabled]
  );

  return (
    <IconButton
      key={TOOL_ID}
      active={measureEnabled}
      title="Enable my addon"
      onClick={toggleMyTool}
    >
      {/*
        Checkout https://next--storybookjs.netlify.app/official-storybook/?path=/story/basics-icon--labels
        for the full list of icons
      */}
      <Icons icon="lightning" />
    </IconButton>
  );
};
