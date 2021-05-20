function getDocumentHeightAndWidth() {
  const body = document.body;
  const html = document.documentElement;

  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  const width = document.body.offsetWidth;
  return { height, width };
}

function createCanvas() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  // Set canvas width & height
  setCanvasWidthAndHeight(canvas, context);
  // Position canvas
  canvas.style.position = "absolute";
  canvas.style.left = "0";
  canvas.style.top = "0";
  canvas.style.zIndex = "100000";
  // Disable any user interactions
  canvas.style.pointerEvents = "none";
  document.body.appendChild(canvas);

  return { canvas, context };
}

function setCanvasWidthAndHeight(canvas, context) {
  const { height, width } = getDocumentHeightAndWidth();
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  // Scale
  const scale = window.devicePixelRatio;
  canvas.width = Math.floor(width * scale);
  canvas.height = Math.floor(height * scale);

  // Normalize coordinate system to use css pixels.
  context.scale(scale, scale);
}

let state = createCanvas();

export function init() {
  if (!state.canvas) {
    state = createCanvas();
  }
}

export function clear() {
  const { height, width } = getDocumentHeightAndWidth();
  state.context.clearRect(0, 0, width, height);
}

export function draw(callback, scale = false) {
  clear();
  if (scale) {
    setCanvasWidthAndHeight(state.canvas, state.context);
  }

  callback(state.context);
}

export function destroy() {
  if (state.canvas) {
    clear();
    state.canvas.parentNode.removeChild(state.canvas);
    state = {};
  }
}
