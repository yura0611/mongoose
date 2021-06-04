const ArticleSchema = require("../models/articles");
const { badRequest } = require("../config/errorHelper");
const UserSchema = require("../models/user");

async function getArticlesByUserId(userId) {
  const existingArticle = await ArticleSchema.find({ owner: userId });
  if (!existingArticle) {
    throw badRequest("There are not articles by this user");
  }
  return await existingArticle;
}

async function createArticle(data) {
  const existingArticle = await ArticleSchema.findOne({ title: data.title });
  if (existingArticle) {
    throw badRequest("Such article already exists");
  }
  const owner_id = data.owner;
  const existingUser = await UserSchema.findById(owner_id);
  if (!existingUser) {
    throw badRequest("This user does not exist");
  }
  const numberOfArticles = await existingUser.update({
    $inc: { numberOfArticles: 1 },
  });
  return await ArticleSchema.create(data);
}

async function updateArticle(articleId, data) {
  const existingArticle = await ArticleSchema.findById(articleId);
  if (!existingArticle) {
    throw badRequest("Article cannot be found");
  }
  const existingUser = await UserSchema.findById(data.owner);
  console.log(existingArticle);
  if (!existingUser) {
    throw badRequest("This user does not exist");
  }

  Object.entries(data || {}).forEach(([key, value]) => {
    if (["title", "subtitle", "description", "owner", "category"].includes(key))
      existingArticle[key] = value || undefined;
  });

  await existingArticle.save();
  return existingArticle;
}

async function removeArticle(articleId) {
  const existingArticle = await ArticleSchema.findById(articleId);
  if (!existingArticle) {
    throw badRequest("Article cannot be found");
  }

  const owner_id = existingArticle.owner;
  if (!owner_id) {
    throw badRequest("Article does not have user");
  }
  const existingUser = await UserSchema.findById(owner_id);
  const numberOfArticles = await existingUser.update({
    $inc: { numberOfArticles: -1 },
  });
  return await existingArticle.remove();
}

async function getArticles(category) {
  if (!category) {
    return await ArticleSchema.find().populate("owner");
  }

  const categories = [
    "title",
    "subtitle",
    "description",
    "owner",
    "category",
    "createdAt",
    "updatedAt",
  ];

  if (!categories.includes(category)) {
    throw badRequest("There are not such category");
  }

  if (category === "owner") {
    const result = ArticleSchema.find({})
      .select(`${category} -_id`)
      .populate("owner");
    return result;
  }

  const result = ArticleSchema.find({}).select(`${category} -_id`);
  return await result;
}

async function getArticlesByFilter(category) {
  console.log(category);
  return ArticleSchema.find();
}

module.exports = {
  getArticlesByUserId,
  createArticle,
  updateArticle,
  removeArticle,
  getArticles,
  getArticlesByFilter,
};
