# miniscraper

> Minimalist Node.js Web Scraper working with under-the-hood JSDOM

## :cloud: Installation

```sh
# Using npm
npm install --save miniscraper

# Using yarn
yarn add miniscraper
```

## :question: FAQ

Here are some frequent questions and their answers.

### 1. How to parse a web page?

`miniscraper`provides a simple function for fetching and storing DOM nodes of the document of a web page.
The `buildDocument` function from the `builder`package solves this issue. Passing as an argument the `url`of the web page,
the function returns the parsed DOM.

### 2. How to scrape specific data from a web page?

The `objectSelector`API provides an easy way to scrape data from a web page,
by providing a model object which describes a schema for the data to fetch and its identifiers.
See the example section for an implementation of this functionality.

### 3. How to crawl a website?

`miniscraper`provides a simple function to fetch all links in child nodes of a DOM element.
The function `getLinks`of the `selectors`package is used to do this.
An optional string argument can be passed to specify a text which should appear in the links.

By fetching all these links, one can then parse all the pages associated.

## :clipboard: Example

```js
import { builder, selectors, formatters } from "miniscraper";

const { buildDocument } = builder;
const { objectSelector, getLinks } = selectors;

(async () => {
  // Promise to build DOM from a specified URL
  const document = await buildDocument("example.com");

  const model = {
    title: ".title", // returns the text content of first element matching this selector
    names: { selector: [".name"], transformer: (name) => name.trim() }, // returns an array of the text content of all elements matching this selector and transforms the results with a callback function
  };

  const scrapingResults = objectSelector(document, model);
  console.log(scrapingResults);
  /*
    {
        title: 'Website title',
        names: [ 'John', 'Peter', 'James' ],
    }
    */

  // array of links which contain the 'link' string
  // easy to use feature to build a web crawler
  const links = getLinks(document, "link");
  console.log(links);
  /*
    [ 'http://example.com/link/154464', 'http://example.com/link/16516' ]
    */
})();
```

Versions 0.2.1 and above support for now the experimental version of a Google Search scraper. Use the `crawlGoogle` function from the `crawlers` package to get the top search results links from a specific search term. Here is an example :

```js
import { crawlers } from "miniscraper";

(async () => {
  const searchResults = await crawlers.crawlGoogle("npm miniscraper");
  console.log(searchResults);
  // Expected results
  //   [
  //   'https://libraries.io/npm/miniscraper',
  //   'https://www.npmjs.com/search?q=jsdom&page=7',
  //   'https://www.pelitool.com/grattoirs-eponges/483-mini-grattoir-a-vitres-4cm.html',
  //   'https://npm.io/search/keyword%3AJsDOM/12',
  //   'https://www.cdiscount.com/le-sport/sports-d-hiver-ski-snowboard/pads-burton-mini-scraper-mats-black/f-121420203-bur6400000041043.html',
  //   'https://www.darty.com/nav/achat/jeux_loisirs/jeux_de_societe/jeux_de_cartes/mammut_mini_scraper_silber_katze__MK1528090525.html',
  //   'http://kendalfloral.com/avec-lames-et/Outillage-%C3%A0-main-et-%C3%A9lectroportatif-ylywj-366461.shtm',
  //'https://french.alibaba.com/product-detail/square-white-small-scraper-plastic-bubble-removal-tool-professional-car-color-changing-filming-tool-mini-scraper-1600275665918.html',
  //   'https://www.championtimber.com/neon-plastic-mini-scraper-blade-promo'
  // ]
})();
```

## :dizzy: Current development

This package is at the very beginning of its development, new features are coming soon:

- Improve Object Selector API
- Automatic crawler
- Customizing and filtering DOM tree

## :scroll: License

[MIT][license]

[license]: /LICENSE
