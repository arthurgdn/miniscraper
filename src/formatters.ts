export const extractText = (nodesArray: Element[]): string[] => {
  return nodesArray.map(
    (node) => (node as any).textContent || (node as any).src || ""
  );
};
