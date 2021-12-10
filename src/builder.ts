import { JSDOM } from "jsdom";
import fetch from "node-fetch";
import puppeteer from "puppeteer";

export const buildDocument = async (url: string): Promise<Element> => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    const html = await page.content(); // serialized HTML of page DOM.
    await browser.close();
    const dom = new JSDOM(html);
    return dom.window.document as unknown as Element;
  } catch (e) {
    throw new Error("Error while building document");
  }
};
