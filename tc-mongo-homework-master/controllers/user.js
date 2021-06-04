module.exports = { createUser, getUsers, updateUser, getUser, removeUser, getArticlesByUserId };

const user = require("../models/user");
const user_services = require("../services/user.service");
const article_services = require("../services/article.service");

async function createUser(req, res, next) {
  try {
    const data = req.body;
    const result = await user_services.createUser(data);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function getUsers(req, res, next) {
  try {
    const result = await user_services.getUsers();
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}


async function getUser(req, res, next) {
  try {
    const userId =  req.params.userId;
    const result = await user_services.getUser(userId);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}


async function getArticlesByUserId(req, res, next) {
  try {
    const userId =  req.params.userId;
    const result = await article_services.getArticlesByUserId(userId);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}






async function removeUser(req, res, next) {
  try {
    const userId =  req.params.userId;
    const result = await user_services.removeUser(userId);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}





async function updateUser(req,res,next) {
  try{
    const userId = req.params.userId;
    const data = req.body;
    const result = await user_services.updateUser(userId,data);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}