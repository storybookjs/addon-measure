import React, { useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { Icons, IconButton } from "@storybook/components";
import { TOOL_ID } from "./constants";
import { useHotKey } from "./useHotKey";

export const Tool = () => {
  const [{ measureEnabled }, updateGlobals] = useGlobals();

  const toggleMeasure = useCallback(
    () =>
      updateGlobals({
        measureEnabled: !measureEnabled,
      }),
    [measureEnabled]
  );

  useHotKey(updateGlobals);

  return (
    <IconButton
      key={TOOL_ID}
      active={measureEnabled}
      title="Enable measure"
      onClick={toggleMeasure}
    >
      <Icons icon="ruler" />
    </IconButton>
  );
};
