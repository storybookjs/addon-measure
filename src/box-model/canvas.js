const clrs = {
  margin: "#f6b26ba8",
  border: "#ffe599a8",
  padding: "#93c47d8c",
  content: "#6fa8dca8",
};

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
  var canvas = document.createElement("canvas");
  // Set canvas width & height
  setCanvasWidthAndHeight(canvas);
  // Position canvas
  canvas.style.position = "absolute";
  canvas.style.left = "0";
  canvas.style.top = "0";
  canvas.style.zIndex = "100000";
  // Disable any user interactions
  canvas.style.pointerEvents = "none";
  document.body.appendChild(canvas);
  const context = canvas.getContext("2d");

  return { canvas, context };
}

function setCanvasWidthAndHeight(canvas) {
  const { height, width } = getDocumentHeightAndWidth();
  canvas.style.width = `${width}`;
  canvas.style.height = `${height}`;
  canvas.width = width;
  canvas.height = height;
}

const { canvas, context } = createCanvas();

export function clear() {
  const { height, width } = getDocumentHeightAndWidth();
  context.clearRect(0, 0, width, height);
}

export function draw(callback) {
  clear();
  setCanvasWidthAndHeight(canvas);

  callback(context);
}
