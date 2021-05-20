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

export function drawLabel(context, { type, text, x, y }) {
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
}
