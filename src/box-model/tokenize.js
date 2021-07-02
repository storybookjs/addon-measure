const scaleMap = {
  border: "borderWidths",
  content: "sizes",
  margin: "space",
  padding: "space",
};

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

export function tokenizeLabels(labels, tokens) {
  return labels.map((label) => {
    const { text, type } = label;
    const scaleKey = scaleMap[type];
    const scale = scaleKey && tokens[scaleKey];

    if (!scale) {
      // TODO: Warn about bad schema?
      return label;
    }

    // TODO: memoize?
    const scaleLookup = Object.entries(scale).reduce(
      (acc, [tokenKey, value]) => {
        acc[value.toString()] = Array.isArray(scale)
          ? `${scaleKey}[${tokenKey}]`
          : `${scaleKey}.${tokenKey}`;
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
