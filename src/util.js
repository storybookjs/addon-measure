export const deepElementFromPoint = (x, y) => {
  const element = document.elementFromPoint(x, y);

  const crawlShadows = (node) => {
    if (node && node.shadowRoot) {
      const nestedElement = node.shadowRoot.elementFromPoint(x, y);

      // Nested node is same as the root one
      if (node.isEqualNode(nestedElement)) {
        return node;
      }
      // The nested node has shadow DOM too so continue crawling
      else if (nestedElement.shadowRoot) {
        return crawlShadows(nestedElement);
      }
      // No more shadow DOM
      else {
        return nestedElement;
      }
    }

    return node;
  };

  const shadowElement = crawlShadows(element);

  return shadowElement || element;
};
