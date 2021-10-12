import { buildDocument } from "./builder";
import { getLinks, objectSelector, selectMultiple } from "./selectors";

export const crawlGoogle = async (
  searchTerm: string,
  limit = 10
): Promise<Array<string>> => {
  try {
    const doc = await buildDocument(
      encodeURI(`https://www.google.com/search?q=${searchTerm}`)
    );
    const parentResults = selectMultiple(doc, ".yuRUbf");
    const results = parentResults.map((result) => {
      return getLinks(result)[0];
    });
    return results;
  } catch (err) {
    console.log(err);
    return [];
  }
};
