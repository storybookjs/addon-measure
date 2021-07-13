import { pxToNumber, round } from "../util";

const defaultScaleMap = {
  border: "borderWidths",
  content: "sizes",
  margin: "space",
  padding: "space",
};

function remToNumber(value) {
  return round(parseFloat(value.replace("rem", "")));
}

function emToNumber(value) {
  return round(parseFloat(value.replace("em", "")));
}

function tokenizeText(scaleLookup, text, type) {
  if (type === "content") {
    const [width, , height] = text.split(" ");

    const widthText = tokenizeText(scaleLookup, width);
    const heightText = tokenizeText(scaleLookup, height);

    return `${widthText} x ${heightText}`;
  } else {
    const token = scaleLookup[text.toString()];
    return token ? `${text} (${token})` : text;
  }
}

function normalizeValue(value, elementFontSize) {
  let newValue = value;
  if (typeof value === "string") {
    if (value.endsWith("px")) {
      newValue = pxToNumber(value);
    } else if (value.endsWith("rem")) {
      const rootFontSize = getComputedStyle(document.documentElement).fontSize;
      newValue = remToNumber(value) * pxToNumber(rootFontSize);
    } else if (value.endsWith("em")) {
      newValue = emToNumber(value) * elementFontSize;
    }
  }

  return newValue.toString();
}

export function tokenizeLabels(
  { fontSize: elementFontSize },
  labels,
  { scaleMap = defaultScaleMap, ...tokens }
) {
  return labels.map((label) => {
    const { text, type } = label;
    const scaleKey = scaleMap[type];
    const scale = scaleKey && tokens[scaleKey];

    if (!scale) {
      return label;
    }

    const scaleLookup = Object.entries(scale).reduce(
      (acc, [tokenKey, value]) => {
        const lookupKey = normalizeValue(value, elementFontSize);
        if (!acc.hasOwnProperty(lookupKey)) {
          acc[lookupKey] = Array.isArray(scale)
            ? `${scaleKey}[${tokenKey}]`
            : `${scaleKey}.${tokenKey}`;
        }
        return acc;
      },
      {}
    );

    return {
      ...label,
      text: tokenizeText(scaleLookup, text, type),
    };
  });
}
