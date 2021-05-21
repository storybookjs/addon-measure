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

function collide(a, b, position) {
  return (
    Math.abs(a.x - b.x) < Math.abs(a.w + b.w) / 2 &&
    Math.abs(a.y - b.y) < Math.abs(a.h + b.h) / 2
  );
}

function overlapAdjustment(position, currentRect, prevRect, padding) {
  if (position === "top") {
    currentRect.y = prevRect.y - prevRect.h - padding / 3;
  } else if (position === "right") {
    currentRect.x =
      prevRect.x + prevRect.w / 2 + padding / 3 + currentRect.w / 2;
  } else if (position === "bottom") {
    currentRect.y = prevRect.y + prevRect.h + padding / 3;
  } else if (position === "left") {
    currentRect.x =
      prevRect.x - prevRect.w / 2 - padding / 3 - currentRect.w / 2;
  }

  return { x: currentRect.x, y: currentRect.y };
}

export function drawLabel(
  context,
  dimensions,
  { type, position = "center", text },
  prevRect
) {
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

  const w = metrics.width + padding;
  const h = actualHeight + padding;

  // Adjust for overlap
  if (prevRect && collide({ x, y, w, h }, prevRect)) {
    const adjusted = overlapAdjustment(
      position,
      { x, y, w, h },
      prevRect,
      padding
    );
    x = adjusted.x;
    y = adjusted.y;
  }

  context.fillStyle = colors[type];
  roundedRect(context, { x, y, w, h, r: 3 });
  context.fill();

  context.fillStyle = colors.text;
  context.fillText(text, x, y);

  return { x, y, w, h };
}

function drawStack(context, dimensions, stack) {
  const rects = [];
  stack.forEach((l, idx) => {
    const rect = drawLabel(context, dimensions, l, rects[idx - 1]);
    rects[idx] = rect;
  });
}

export function labelStacks(context, dimensions, labels) {
  const stacks = labels.reduce((acc, l) => {
    if (!acc.hasOwnProperty(l.position)) {
      acc[l.position] = [];
    }

    acc[l.position].push(l);

    return acc;
  }, {});

  if (stacks.top) {
    drawStack(context, dimensions, stacks.top);
  }
  if (stacks.right) {
    drawStack(context, dimensions, stacks.right);
  }
  if (stacks.bottom) {
    drawStack(context, dimensions, stacks.bottom);
  }
  if (stacks.left) {
    drawStack(context, dimensions, stacks.left);
  }
  if (stacks.center) {
    drawStack(context, dimensions, stacks.center);
  }
}
