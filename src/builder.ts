import { JSDOM } from "jsdom";
import fetch from "node-fetch";

export const buildDocument = async (url: string): Promise<Element> => {
  try {
    const response = await (
      await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0",
        },
      })
    ).text();
    if (!response) {
      throw new Error("Unable to fetch corresponding URL");
    }
    const dom = new JSDOM(response);
    return dom.window.document as unknown as Element;
  } catch (e) {
    throw new Error("Error while building document");
  }
};
