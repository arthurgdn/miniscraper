export const selectMultiple = (parentNode: Element, ...selectors: string[]): Element[] => {
  return [...parentNode.querySelectorAll(selectors.reduce((prev, current) => prev + ', ' + current))];
};

export const selectSingle = (parentNode: Element, ...selectors: string[]): Element | null => {
  return parentNode.querySelector(selectors.reduce((prev, current) => prev + ', ' + current));
};

export const getLinks = (parentNode: Element, text = ''): string[] => {
  return selectMultiple(parentNode, 'a')
    .filter(
      (link: any): boolean => {
        // renvoie false si l'attribut href n'est pas présent
        if (typeof link.href === 'undefined') { return false; }
        return link.href.includes(text);
      })
    .map((link: any): string => {
      return link.href;
    });
};