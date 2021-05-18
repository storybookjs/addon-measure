const clrs = {
  margin: '#f6b26ba8',
  border: '#ffe599a8',
  padding: '#93c47d8c',
  content: '#6fa8dca8',
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
  var canvas = document.createElement('canvas'); //Create a canvas element
  //Set canvas width/height
  setCanvasWidthAndHeight(canvas);
  //Position canvas
  canvas.style.position = 'absolute';
  canvas.style.left = '0';
  canvas.style.top = '0';
  canvas.style.zIndex = '100000';
  canvas.style.pointerEvents = 'none'; //Make sure you can click 'through' the canvas
  document.body.appendChild(canvas); //Append canvas to body element
  const context = canvas.getContext('2d');
  context.globalAlpha = 0.5;
  return { canvas, context: context };
}

function setCanvasWidthAndHeight(canvas) {
  const { height, width } = getDocumentHeightAndWidth();
  canvas.style.width = `${width}`;
  canvas.style.height = `${height}`;
  canvas.width = width;
  canvas.height = height;
}

function pxToNumber(px) {
  return parseInt(px.replace('px', ''));
}

function drawMarginBorderPadding(ctx, element) {
  const style = getComputedStyle(element);
  let {
    top,
    left,
    right,
    bottom,
    width,
    height,
  } = element.getBoundingClientRect();

  const {
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    borderBottomWidth,
    borderTopWidth,
    borderLeftWidth,
    borderRightWidth,
    display,
  } = style;

  top = top + window.scrollY;
  left = left + window.scrollX;
  bottom = bottom + window.scrollY;
  right = right + window.scrollX;

  const numMarginTop = pxToNumber(marginTop);
  const numMarginBottom = pxToNumber(marginBottom);
  const numMarginLeft = pxToNumber(marginLeft);
  const numMarginRight = pxToNumber(marginRight);
  const numPaddingTop = pxToNumber(paddingTop);
  const numPaddingBottom = pxToNumber(paddingBottom);
  const numPaddingLeft = pxToNumber(paddingLeft);
  const numPaddingRight = pxToNumber(paddingRight);
  const numBorderTop = pxToNumber(borderTopWidth);
  const numBorderBottom = pxToNumber(borderBottomWidth);
  const numBorderLeft = pxToNumber(borderLeftWidth);
  const numBorderRight = pxToNumber(borderRightWidth);

  const marginHeight = height + numMarginBottom + numMarginTop;

  // DRAW MARGIN
  ctx.fillStyle = clrs.margin;
  // Top margin rect
  ctx.fillRect(left, top - numMarginTop, width, numMarginTop);
  // Bottom margin rect
  ctx.fillRect(left, bottom, width, numMarginBottom);
  // Left margin rect
  ctx.fillRect(
    left - numMarginLeft,
    top - numMarginTop,
    numMarginLeft,
    marginHeight
  );
  // Right margin rect
  ctx.fillRect(right, top - numMarginTop, numMarginRight, marginHeight);

  const paddingWidth = width - numBorderLeft - numBorderRight;
  const paddingHeight =
    height -
    numPaddingBottom -
    numPaddingBottom -
    numBorderTop -
    numBorderBottom;

  // DRAW PADDING
  ctx.fillStyle = clrs.padding;
  // Top padding rect
  ctx.fillRect(
    left + numBorderLeft,
    top + numBorderTop,
    paddingWidth,
    numPaddingTop
  );
  // Bottom padding rect
  ctx.fillRect(
    left + numBorderLeft,
    bottom - numPaddingBottom - numBorderBottom,
    paddingWidth,
    numPaddingBottom
  );
  // Left padding rect
  ctx.fillRect(
    left + numBorderLeft,
    top + numPaddingTop + numBorderTop,
    numPaddingLeft,
    paddingHeight
  );
  // Right padding rect
  ctx.fillRect(
    right - numPaddingRight - numBorderRight,
    top + numPaddingTop + numBorderTop,
    numPaddingRight,
    paddingHeight
  );

  const borderHeight = height - numBorderTop - numBorderBottom;

  // DRAW BORDER
  ctx.fillStyle = clrs.border;
  // Top border rect
  ctx.fillRect(left, top, width, numBorderTop);
  // Bottom border rect
  ctx.fillRect(left, bottom - numBorderBottom, width, numBorderBottom);
  // Left border rect
  ctx.fillRect(left, top + numBorderTop, numBorderLeft, borderHeight);
  // Right border rect
  ctx.fillRect(
    right - numBorderRight,
    top + numBorderTop,
    numBorderRight,
    borderHeight
  );

  // DRAW CONTENT
  const contentWidth =
    width - numBorderLeft - numBorderRight - numPaddingLeft - numPaddingRight;
  const contentHeight =
    height - numPaddingTop - numPaddingBottom - numBorderTop - numBorderBottom;
  ctx.fillStyle = clrs.content;
  ctx.fillRect(
    left + numBorderLeft + numPaddingLeft,
    top + numBorderTop + numPaddingTop,
    contentWidth,
    contentHeight
  );
}

const rowComponentSelector = '.higlightmeplease';

function findComponentsByDefinition(querySelector) {
  return document.querySelectorAll(querySelector);
}

const { canvas, context: ctx } = createCanvas();
const rows = findComponentsByDefinition(rowComponentSelector);
console.log(rows);

function drawSelectedElements(elements) {
  const { height, width } = getDocumentHeightAndWidth();
  ctx.clearRect(0, 0, width, height);
  setCanvasWidthAndHeight(canvas);
  elements.forEach((e) => {
    drawMarginBorderPadding(ctx, e);
  });
}

drawSelectedElements(rows);

window.addEventListener('resize', () => {
  drawSelectedElements(rows);
});
