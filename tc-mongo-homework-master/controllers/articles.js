const articles = require("../models/articles");
const article_services = require("../services/article.service");

async function createArticle(req, res, next) {
  try {
    const data = req.body;
    const result = await article_services.createArticle(data);

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function updateArticle(req, res, next) {
  try {
    const articleId = req.params.articleId;
    const data = req.body;
    const result = await article_services.updateArticle(articleId, data);

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function removeArticle(req, res, next) {
  try {
    const articleId = req.params.articleId;
    const result = await article_services.removeArticle(articleId);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function getArticles(req, res, next) {
  try {
    const category = req.query.filter;
    const result = await article_services.getArticles(category);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function getArticlesByFilter(req, res, next) {
  try {
    const category = req.params.filter;

    const result = await article_services.getArticlesByFilter(category);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createArticle,
  updateArticle,
  removeArticle,
  getArticles,
  getArticlesByFilter,
};
