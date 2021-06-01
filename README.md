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

### 2. How to crawl a website?

`miniscraper`provides a simple function to fetch all links in child nodes of a DOM element.
The function `getLinks`of the `selectors`package is used to do this. 
An optional string argument can be passed to specify a text which should appear in the links.

By fetching all these links, one can then parse all the pages associated.

## :clipboard: Example

```js
import { builder, selectors, formatters } from 'miniscraper';

const { buildDocument } = builder;
const { selectSingle, selectMultiple, getLinks } = selectors;
const { extractText } = formatters;

(async () => {
    // Promise to build DOM from a specified URL
    const document = await buildDocument('example.url');

    // selectSingle function to extract the first node matching the query passed
    const title = selectSingle(document, '.title').textContent;

    // selectMultiple returns and array of nodes matching the query passed
    // the extractText function maps the text content of this array of nodes
    const names = extractText(selectMultiple(document, '.name'));

    // array of links which contain the 'link' string
    const links = getLinks(document, 'link')
})();
```

## :dizzy: Current development

This package is at the very beginning of its development, new features are coming soon:
* Object modeling from DOM
* Automatic crawler
* Customizing and filtering DOM tree

## :scroll: License

[MIT][license]

[license]: /LICENSE