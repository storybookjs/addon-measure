import React, { useCallback, useEffect } from "react";
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

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Alt") {
        updateGlobals({ measureEnabled: true });
      }
    };

    const onKeyUp = () => {
      updateGlobals({ measureEnabled: false });
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

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
