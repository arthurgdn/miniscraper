import axios from 'axios';
import { JSDOM } from 'jsdom';

export const buildDocument = async (url: string): Promise<Element> => {
  try {
    const response = await axios.get(url);
    if (!response) {
      throw new Error('Unable to fetch corresponding URL');
    }
    const dom = new JSDOM(response.data);
    return dom.window.document as unknown as Element;
  } catch (e) {
    throw new Error('Error while building document');
  }
};
