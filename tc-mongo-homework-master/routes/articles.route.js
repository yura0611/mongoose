const express = require("express");
const { get } = require("mongoose");

const router = express.Router();

const articlesController = require("../controllers/articles");
const articles = require("../models/articles");

router
  .post("/", articlesController.createArticle)
  .put("/:articleId", articlesController.updateArticle)
  .delete("/:articleId", articlesController.removeArticle)
  .get("/", articlesController.getArticles);

module.exports = router;
