function focusInInput(event) {
  return (
    /input|textarea/i.test(event.target.tagName) ||
    event.target.getAttribute("contenteditable") !== null
  );
}

export function useHotKey(updateGlobals) {
  const onKeyDown = (event) => {
    event.stopPropagation();
    if (!focusInInput(event) && event.altKey) {
      if (event.key === "Alt") {
        updateGlobals({ measureEnabled: true });
      } else {
        updateGlobals({ measureEnabled: false });
      }
    }
  };

  const onKeyUp = (event) => {
    if (event.key === "Alt") {
      event.stopPropagation();
      updateGlobals({ measureEnabled: false });
    }
  };

  const onBlur = () => {
    updateGlobals({ measureEnabled: false });
  };

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
  window.addEventListener("blur", onBlur);

  return () => {
    document.removeEventListener("keydown", onKeyDown);
    document.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("blur", onBlur);
  };
}
