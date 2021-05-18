import React, { useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { Icons, IconButton } from "@storybook/components";
import { TOOL_ID } from "./constants";

export const Tool = () => {
  const [{ redlinesEnabled }, updateGlobals] = useGlobals();

  const toggleMyTool = useCallback(
    () =>
      updateGlobals({
        redlinesEnabled: !redlinesEnabled,
      }),
    [redlinesEnabled]
  );

  return (
    <IconButton
      key={TOOL_ID}
      active={redlinesEnabled}
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
