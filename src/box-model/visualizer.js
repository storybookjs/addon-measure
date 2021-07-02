/**
 * Based on https://gist.github.com/awestbro/e668c12662ad354f02a413205b65fce7
 */
import { pxToNumber, round } from "../util";
import { draw } from "./canvas";
import { labelStacks } from "./labels";

const colors = {
  margin: "#f6b26ba8",
  border: "#ffe599a8",
  padding: "#93c47d8c",
  content: "#6fa8dca8",
};

const SMALL_NODE_SIZE = 30;

function floatingAlignment(extremities) {
  const windowExtremities = {
    top: window.scrollY,
    bottom: window.scrollY + window.innerHeight,
    left: window.scrollX,
    right: window.scrollX + window.innerWidth,
  };

  const distances = {
    top: Math.abs(windowExtremities.top - extremities.top),
    bottom: Math.abs(windowExtremities.bottom - extremities.bottom),
    left: Math.abs(windowExtremities.left - extremities.left),
    right: Math.abs(windowExtremities.right - extremities.right),
  };

  return {
    x: distances.left > distances.right ? "left" : "right",
    y: distances.top > distances.bottom ? "top" : "bottom",
  };
}

function measureElement(element) {
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
    fontSize,
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

  const extremities = {
    top: top - margin.top,
    bottom: bottom + margin.bottom,
    left: left - margin.left,
    right: right + margin.right,
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
    fontSize: pxToNumber(fontSize),
    extremities,
    floatingAlignment: floatingAlignment(extremities),
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

  // Margin Labels
  return [
    {
      type: "margin",
      text: round(margin.top),
      position: "top",
    },
    {
      type: "margin",
      text: round(margin.right),
      position: "right",
    },
    {
      type: "margin",
      text: round(margin.bottom),
      position: "bottom",
    },
    {
      type: "margin",
      text: round(margin.left),
      position: "left",
    },
  ].filter((l) => l.text !== 0);
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
  // Right padding rect
  context.fillRect(
    right - padding.right - border.right,
    top + padding.top + border.top,
    padding.right,
    paddingHeight
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

  // Padding Labels
  return [
    {
      type: "padding",
      text: padding.top,
      position: "top",
    },
    {
      type: "padding",
      text: padding.right,
      position: "right",
    },
    {
      type: "padding",
      text: padding.bottom,
      position: "bottom",
    },
    {
      type: "padding",
      text: padding.left,
      position: "left",
    },
  ].filter((l) => l.text !== 0);
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

  // Border Labels
  return [
    {
      type: "border",
      text: border.top,
      position: "top",
    },
    {
      type: "border",
      text: border.right,
      position: "right",
    },
    {
      type: "border",
      text: border.bottom,
      position: "bottom",
    },
    {
      type: "border",
      text: border.left,
      position: "left",
    },
  ].filter((l) => l.text !== 0);
}

function drawContent(context, { padding, border, width, height, top, left }) {
  const contentWidth =
    width - border.left - border.right - padding.left - padding.right;
  const contentHeight =
    height - padding.top - padding.bottom - border.top - border.bottom;

  context.fillStyle = colors.content;
  // content rect
  context.fillRect(
    left + border.left + padding.left,
    top + border.top + padding.top,
    contentWidth,
    contentHeight
  );

  // Dimension label
  return [
    {
      type: "content",
      position: "center",
      text: `${round(contentWidth)} x ${round(contentHeight)}`,
    },
  ];
}

function drawBoxModel(element, tokens) {
  return (context) => {
    if (element && context) {
      const dimensions = measureElement(element);

      const marginLabels = drawMargin(context, dimensions);
      const paddingLabels = drawPadding(context, dimensions);
      const borderLabels = drawBorder(context, dimensions);
      const contentLabels = drawContent(context, dimensions);

      const externalLabels =
        dimensions.width <= SMALL_NODE_SIZE * 3 ||
        dimensions.height <= SMALL_NODE_SIZE;

      labelStacks(
        context,
        dimensions,
        [...contentLabels, ...paddingLabels, ...borderLabels, ...marginLabels],
        externalLabels,
        tokens
      );
    }
  };
}

export function drawSelectedElement(element, tokens) {
  draw(drawBoxModel(element, tokens));
}
