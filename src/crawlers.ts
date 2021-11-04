import { buildDocument } from "./builder";
import {
  getLinks,
  objectSelector,
  selectMultiple,
  selectSingle,
} from "./selectors";

interface SearchResult {
  url?: string | null;
  title?: string | null;
  description?: string | null;
}

export const crawlGoogle = async (
  searchTerm: string,
  limit = 10
): Promise<Array<SearchResult>> => {
  try {
    const doc = await buildDocument(
      encodeURI(`https://www.google.com/search?q=${searchTerm}`)
    );
    const parentResults = selectMultiple(doc, ".tF2Cxc");
    const results = parentResults.map((result) => {
      const descriptionContainer = selectSingle(
        result,
        ".VwiC3b",
        ".yXK7lf",
        ".MUxGbd",
        ".yDYNvb",
        ".lyLwlc",
        ".lEBKkf"
      );

      return {
        url: getLinks(result)[0],
        title: selectSingle(result, ".LC20lb", ".DKV0Md")?.textContent,
        description: descriptionContainer?.textContent,
      };
    });
    return results.slice(0, limit);
  } catch (err) {
    console.log(err);
    return [];
  }
};
