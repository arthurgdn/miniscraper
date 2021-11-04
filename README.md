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

Versions 0.2.1 and above support for now the experimental version of a Google Search scraper. Use the `crawlGoogle` function from the `crawlers` package to get the top search results from a specific search term. Here is an example :

```js
import { crawlers } from "miniscraper";

(async () => {
  const searchResults = await crawlers.crawlGoogle("npm miniscraper");
  console.log(searchResults);
  //Expected results
  // [
  //   {
  //     url: 'https://libraries.io/npm/miniscraper',
  //     title: 'miniscraper 0.2.1 on npm - Libraries.io',
  //     description: '1 juin 2021 — miniscraper provides a simple function to fetch all links in child nodes of a DOM element. The function getLinks of the selectors package is ...'  },
  //   {
  //     url: 'https://www.workersandco.com/fr/accueil/9667-.html',
  //     title: 'AUTO R MINI SCRAPER',
  //     description: "Désignation unique AUTO R MINI SCRAPER 10590; Nom modèle AUTO R MINI SCRAPER; Référence modèle 10590; Marque SLICE; Pays d'origine CHINE ..."
  //   },
  //   {
  //     url: 'https://www.npmjs.com/search?q=jsdom&page=7',
  //     title: 'jsdom - npm search',
  //     description: 'AngularJS provided as a CommonJS module. Compiled with jsdom when running in Node. Useful for client-side apps built with Browserify and for testing AngularJS ...'
  //   },
  //   {
  //     url: 'https://www.darty.com/nav/achat/jeux_loisirs/jeux_de_societe/jeux_de_cartes/mammut_mini_scraper_silber_katze__MK1528090525.html',
  //     title: 'Jeux de cartes Mammut Mini - scraper silber - katze | Darty',
  //     description: 'COLIS LIVRE SOUS 5 JOURS OUVRES EN MOYENNE EN ENVOI SUIVI; Livraison en France Metropolitaine uniquement HORS Corse et DOM-TOM; Produit NEUF sous garantie ...'  },
  //   ...
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
