import { draw } from "./canvas";
import { drawLabel } from "./labels";

const colors = {
  margin: "#f6b26ba8",
  border: "#ffe599a8",
  padding: "#93c47d8c",
  content: "#6fa8dca8",
};

function pxToNumber(px) {
  return parseInt(px.replace("px", ""));
}

function measureElement(element) {
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
  } = style;

  top = top + window.scrollY;
  left = left + window.scrollX;
  bottom = bottom + window.scrollY;
  right = right + window.scrollX;

  const margin = {
    top: pxToNumber(marginTop),
    bottom: pxToNumber(marginBottom),
    left: pxToNumber(marginLeft),
    right: pxToNumber(marginRight),
  };

  const padding = {
    top: pxToNumber(paddingTop),
    bottom: pxToNumber(paddingBottom),
    left: pxToNumber(paddingLeft),
    right: pxToNumber(paddingRight),
  };

  const border = {
    top: pxToNumber(borderTopWidth),
    bottom: pxToNumber(borderBottomWidth),
    left: pxToNumber(borderLeftWidth),
    right: pxToNumber(borderRightWidth),
  };

  return {
    margin,
    padding,
    border,
    top,
    left,
    bottom,
    right,
    width,
    height,
  };
}

function drawMargin(
  context,
  { margin, width, height, top, left, bottom, right }
) {
  // Draw Margin
  const marginHeight = height + margin.bottom + margin.top;

  context.fillStyle = colors.margin;
  // Top margin rect
  context.fillRect(left, top - margin.top, width, margin.top);
  // Right margin rect
  context.fillRect(right, top - margin.top, margin.right, marginHeight);
  // Bottom margin rect
  context.fillRect(left, bottom, width, margin.bottom);
  // Left margin rect
  context.fillRect(
    left - margin.left,
    top - margin.top,
    margin.left,
    marginHeight
  );

  // Labels
  return () => {
    // Top
    drawLabel(context, {
      type: "margin",
      text: margin.top,
      x: left + width / 2,
      y: top - margin.top / 2,
    });
    // Right margin rect
    drawLabel(context, {
      type: "margin",
      text: margin.right,
      x: right + margin.right / 2,
      y: top + height / 2,
    });
    // Bottom margin rect
    drawLabel(context, {
      type: "margin",
      text: margin.bottom,
      x: left + width / 2,
      y: bottom + margin.bottom / 2,
    });
    // Left margin rect
    drawLabel(context, {
      type: "margin",
      text: margin.left,
      x: left - margin.left / 2,
      y: top + height / 2,
    });
  };
}

function drawPadding(
  context,
  { padding, border, width, height, top, left, bottom, right }
) {
  const paddingWidth = width - border.left - border.right;
  const paddingHeight =
    height - padding.top - padding.bottom - border.top - border.bottom;

  context.fillStyle = colors.padding;
  // Top padding rect
  context.fillRect(
    left + border.left,
    top + border.top,
    paddingWidth,
    padding.top
  );
  // Bottom padding rect
  context.fillRect(
    left + border.left,
    bottom - padding.bottom - border.bottom,
    paddingWidth,
    padding.bottom
  );
  // Left padding rect
  context.fillRect(
    left + border.left,
    top + padding.top + border.top,
    padding.left,
    paddingHeight
  );
  // Right padding rect
  context.fillRect(
    right - padding.right - border.right,
    top + padding.top + border.top,
    padding.right,
    paddingHeight
  );
}

function drawBorder(
  context,
  { border, width, height, top, left, bottom, right }
) {
  const borderHeight = height - border.top - border.bottom;

  context.fillStyle = colors.border;
  // Top border rect
  context.fillRect(left, top, width, border.top);
  // Bottom border rect
  context.fillRect(left, bottom - border.bottom, width, border.bottom);
  // Left border rect
  context.fillRect(left, top + border.top, border.left, borderHeight);
  // Right border rect
  context.fillRect(
    right - border.right,
    top + border.top,
    border.right,
    borderHeight
  );
}

function drawContent(context, { padding, border, width, height, top, left }) {
  const contentWidth =
    width - border.left - border.right - padding.left - padding.right;
  const contentHeight =
    height - padding.top - padding.bottom - border.top - border.bottom;
  const x = left + border.left + padding.left;
  const y = top + border.top + padding.top;

  context.fillStyle = colors.content;
  // content rect
  context.fillRect(
    left + border.left + padding.left,
    top + border.top + padding.top,
    contentWidth,
    contentHeight
  );
  // Dimension label
  return () => {
    drawLabel(context, {
      type: "content",
      text: `${contentWidth} x ${contentHeight}`,
      x: x + contentWidth / 2,
      y: y + contentHeight / 2,
    });
  };
}

function drawBoxModel(element) {
  return (context) => {
    const dimensions = measureElement(element);

    const drawMarginLabels = drawMargin(context, dimensions);
    const drawPaddingLabels = drawPadding(context, dimensions);
    const drawBorderLabels = drawBorder(context, dimensions);
    const drawContentLabels = drawContent(context, dimensions);

    drawMarginLabels();
    // drawPaddingLabels;
    // drawBorderLabels;
    drawContentLabels();
  };
}

export function drawSelectedElement(element) {
  draw(drawBoxModel(element));
}
