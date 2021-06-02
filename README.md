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
import { builder, selectors, formatters } from 'miniscraper';

const { buildDocument } = builder;
const { objectSelector, getLinks } = selectors;

(async () => {
    // Promise to build DOM from a specified URL
    const document = await buildDocument('example.com');

    const model = {
        title: '.title',    // returns the text content of first element matching this selector
        names: ['.name'],   // returns an array of the text content of all elements matching this selector
        metadata: {         // nested model object to format the returned results
            date: '.date',
            languages: ['.language']
        }
    }

    const scrapingResults = objectSelector(document, model);
    console.log(scrapingResults);
    /*
    {
        title: 'Website title',
        names: [ 'John', 'Peter', 'James' ],
        metadate: {
            date: '4/17/2021',
            languages: [ 'French', 'English', 'Spanish' ]
        }
    }
    */

    // array of links which contain the 'link' string
    // easy to use feature to build a web crawler
    const links = getLinks(document, 'link')
    console.log(links);
    /*
    [ 'http://example.com/link/154464', 'http://example.com/link/16516' ]
    */
})();
```

## :dizzy: Current development

This package is at the very beginning of its development, new features are coming soon:
* Improve Object Selector API
* Automatic crawler
* Customizing and filtering DOM tree

## :scroll: License

[MIT][license]

[license]: /LICENSE