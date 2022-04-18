const _ = require('lodash');
const network = require('./network');
const extractor = require('./extractor');

/**
 *
 * @param {string} url - Url of Article to Parse
 * @return {promise}  - Parsed article
 */
const Article = async function (url) {
  const downloadStartTime = Date.now();
  const $ = network.getParsedHtml(url);
  const htmlEndTime = Date.now();
  const parseStartTime = Date.now();
  const Article = {};
  _.set(Article, 'url', url);
  _.set(Article, 'title', extractor.getTitle(await $));
  _.set(Article, 'description', extractor.getDescription(await $));
  _.set(Article, 'image', extractor.getTopImage(await $));
  _.set(Article, 'keywords', extractor.getKeywords(await $));
  _.set(Article, 'links', [url]);
  _.set(Article, 'content', extractor.getText(await $));
  _.set(Article, 'published', extractor.getDate(await $));
  _.set(Article, 'author', extractor.getAuthor(await $));
  _.set(Article, 'source', extractor.getSource(await $));
  _.set(Article, 'download_time', htmlEndTime - downloadStartTime);
  _.set(Article, 'parse_time', Date.now() - parseStartTime);
  return Article;
};

module.exports = Article;
