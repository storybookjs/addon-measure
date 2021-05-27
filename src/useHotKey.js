import { useEffect } from "react";

export function useHotKey(updateGlobals, where) {
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
}
