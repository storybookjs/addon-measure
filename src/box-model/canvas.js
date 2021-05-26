function getDocumentWidthAndHeight() {
  const body = document.body;

  const height = Math.max(body.scrollHeight, body.offsetHeight);
  const width = Math.max(body.scrollWidth, body.offsetWidth);
  return { width, height };
}

function createCanvas() {
  const { width, height } = getDocumentWidthAndHeight();
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  // Set canvas width & height
  setCanvasWidthAndHeight(canvas, context, { width, height });
  // Position canvas
  canvas.style.position = "absolute";
  canvas.style.left = "0";
  canvas.style.top = "0";
  canvas.style.zIndex = "100000";
  // Disable any user interactions
  canvas.style.pointerEvents = "none";
  document.body.appendChild(canvas);

  return { canvas, context, width, height };
}

function setCanvasWidthAndHeight(canvas, context, { width, height }) {
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  // Scale
  const scale = window.devicePixelRatio;
  canvas.width = Math.floor(width * scale);
  canvas.height = Math.floor(height * scale);

  // Normalize coordinate system to use css pixels.
  context.scale(scale, scale);
}

let state = {};

export function init() {
  if (!state.canvas) {
    state = createCanvas();
  }
}

export function clear() {
  if (state.context) {
    state.context.clearRect(0, 0, state.width, state.height);
  }
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
