import React, { useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { Icons, IconButton } from "@storybook/components";
import { TOOL_ID } from "./constants";

export const Tool = () => {
  const [{ measureEnabled }, updateGlobals] = useGlobals();

  const toggleMeasure = useCallback(
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
      title="Enable measure"
      onClick={toggleMeasure}
    >
      <Icons icon="component" />
    </IconButton>
  );
};
