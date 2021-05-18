import { draw } from "./canvas";

const clrs = {
  margin: "#f6b26ba8",
  border: "#ffe599a8",
  padding: "#93c47d8c",
  content: "#6fa8dca8",
};

function pxToNumber(px) {
  return parseInt(px.replace("px", ""));
}

function drawMarginBorderPadding(element) {
  return (context) => {
    const style = getComputedStyle(element);
    let { top, left, right, bottom, width, height } =
      element.getBoundingClientRect();

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
    context.fillStyle = clrs.margin;
    // Top margin rect
    context.fillRect(left, top - numMarginTop, width, numMarginTop);
    // Bottom margin rect
    context.fillRect(left, bottom, width, numMarginBottom);
    // Left margin rect
    context.fillRect(
      left - numMarginLeft,
      top - numMarginTop,
      numMarginLeft,
      marginHeight
    );
    // Right margin rect
    context.fillRect(right, top - numMarginTop, numMarginRight, marginHeight);

    const paddingWidth = width - numBorderLeft - numBorderRight;
    const paddingHeight =
      height -
      numPaddingBottom -
      numPaddingBottom -
      numBorderTop -
      numBorderBottom;

    // DRAW PADDING
    context.fillStyle = clrs.padding;
    // Top padding rect
    context.fillRect(
      left + numBorderLeft,
      top + numBorderTop,
      paddingWidth,
      numPaddingTop
    );
    // Bottom padding rect
    context.fillRect(
      left + numBorderLeft,
      bottom - numPaddingBottom - numBorderBottom,
      paddingWidth,
      numPaddingBottom
    );
    // Left padding rect
    context.fillRect(
      left + numBorderLeft,
      top + numPaddingTop + numBorderTop,
      numPaddingLeft,
      paddingHeight
    );
    // Right padding rect
    context.fillRect(
      right - numPaddingRight - numBorderRight,
      top + numPaddingTop + numBorderTop,
      numPaddingRight,
      paddingHeight
    );

    const borderHeight = height - numBorderTop - numBorderBottom;

    // DRAW BORDER
    context.fillStyle = clrs.border;
    // Top border rect
    context.fillRect(left, top, width, numBorderTop);
    // Bottom border rect
    context.fillRect(left, bottom - numBorderBottom, width, numBorderBottom);
    // Left border rect
    context.fillRect(left, top + numBorderTop, numBorderLeft, borderHeight);
    // Right border rect
    context.fillRect(
      right - numBorderRight,
      top + numBorderTop,
      numBorderRight,
      borderHeight
    );

    // DRAW CONTENT
    const contentWidth =
      width - numBorderLeft - numBorderRight - numPaddingLeft - numPaddingRight;
    const contentHeight =
      height -
      numPaddingTop -
      numPaddingBottom -
      numBorderTop -
      numBorderBottom;
    context.fillStyle = clrs.content;
    context.fillRect(
      left + numBorderLeft + numPaddingLeft,
      top + numBorderTop + numPaddingTop,
      contentWidth,
      contentHeight
    );
  };
}

export function drawSelectedElement(element) {
  draw(drawMarginBorderPadding(element));
}
