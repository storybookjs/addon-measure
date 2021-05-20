const colors = {
  margin: "#f6b26b", // #333333
  border: "#ffe599",
  padding: "#93c47d",
  content: "#6fa8dc",
  text: "#232020",
};

function roundedRect(context, { x, y, w, h, r }) {
  x = x - w / 2;
  y = y - h / 2;

  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;

  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + w, y, x + w, y + h, r);
  context.arcTo(x + w, y + h, x, y + h, r);
  context.arcTo(x, y + h, x, y, r);
  context.arcTo(x, y, x + w, y, r);
  context.closePath();
}

function positionCoordinate(
  position,
  { padding, border, width, height, top, left }
) {
  const contentWidth =
    width - border.left - border.right - padding.left - padding.right;
  const contentHeight =
    height - padding.top - padding.bottom - border.top - border.bottom;

  let x = left + border.left + padding.left;
  let y = top + border.top + padding.top;

  if (position === "top") {
    x += contentWidth / 2;
  } else if (position === "right") {
    x += contentWidth;
    y += contentHeight / 2;
  } else if (position === "bottom") {
    x += contentWidth / 2;
    y += contentHeight;
  } else if (position === "left") {
    y += contentHeight / 2;
  } else if (position === "center") {
    x += contentWidth / 2;
    y += contentHeight / 2;
  }

  return { x, y };
}

function offset(type, position, { margin, border, padding }) {
  let shift = (v) => v;
  let offsetX = 0;
  let offsetY = 0;

  if (type === "padding") {
    shift = (dir) => padding[dir] / 2;
  } else if (type === "border") {
    shift = (dir) => padding[dir] + border[dir] / 2;
  } else if (type === "margin") {
    shift = (dir) => padding[dir] + border[dir] + margin[dir] / 2;
  }

  if (position === "top") {
    offsetY = -shift("top");
  } else if (position === "right") {
    offsetX = shift("right");
  } else if (position === "bottom") {
    offsetY = shift("bottom");
  } else if (position === "left") {
    offsetX = -shift("left");
  }

  return { offsetX, offsetY };
}

export function label(context, dimensions) {
  return ({ type, position = "center", text }) => {
    let { x, y } = positionCoordinate(position, dimensions);
    const { offsetX, offsetY } = offset(type, position, dimensions);

    // Shift coordinate to center within
    // the band of measurement
    x += offsetX;
    y += offsetY;

    context.font = "600 14px monospace";
    context.textBaseline = "middle";
    context.textAlign = "center";
    const padding = 12;

    const metrics = context.measureText(text);
    let actualHeight =
      metrics.fontBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    context.fillStyle = colors[type];
    roundedRect(context, {
      x,
      y,
      w: metrics.width + padding,
      h: actualHeight + padding,
      r: 3,
    });
    context.fill();

    context.fillStyle = colors.text;
    context.fillText(text, x, y);
  };
}
