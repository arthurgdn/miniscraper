export const extractText = (nodesArray: Element[]): string[] => {
  return nodesArray.map(node => node.textContent || '');
};
