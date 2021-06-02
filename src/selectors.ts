import { extractText } from './formatters';

interface StringObject {
  [key: string]: any;
}

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
        // return false if href attribute is undefined
        if (typeof link.href === 'undefined') { return false; }
        return link.href.includes(text);
      })
    .map((link: any): string => {
      return link.href;
    });
};

export const objectSelector = <Type extends StringObject>(parentNode: Element, selectorModel: Type): Type => {
  const selectedObject = {} as any;
  for (const key of Object.keys(selectorModel)) {
    if (typeof selectorModel[key] === 'string') {
      const content = selectSingle(parentNode, selectorModel[key])?.textContent;
      if (content) {
        selectedObject[key] = content;
      }
    } else if (Array.isArray(selectorModel[key]) && selectorModel[key].length === 1) {
      const content = extractText(selectMultiple(parentNode, selectorModel[key][0]));
      if (content) {
        selectedObject[key] = content;
      }
    } else if (({}).toString.apply(selectorModel[key]) === '[object Object]') {
      const content = objectSelector(parentNode, selectorModel[key]);
      if (content) {
        selectedObject[key] = content;
      }
    }
  }
  return selectedObject;
};
