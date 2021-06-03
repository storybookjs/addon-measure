function focusInInput(event) {
  return (
    /input|textarea/i.test(event.target.tagName) ||
    event.target.getAttribute("contenteditable") !== null
  );
}

export function useHotKey(updateGlobals) {
  const onKeyDown = (event) => {
    if (!focusInInput(event) && event.key === "Alt") {
      updateGlobals({ measureEnabled: true });
    }
  };

  const onKeyUp = (event) => {
    if (event.key === "Alt") {
      updateGlobals({ measureEnabled: false });
    }
  };

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  return () => {
    document.removeEventListener("keydown", onKeyDown);
    document.removeEventListener("keyup", onKeyUp);
  };
}
