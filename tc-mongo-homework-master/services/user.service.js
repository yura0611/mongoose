const ProductSchema = require("../models/user");
const { badRequest } = require("../config/errorHelper");
const ArticleSchema = require("../models/articles");

async function createUser(data) {
  const existingUser = await ProductSchema.findOne({ lastName: data.lastName });
  if (existingUser) {
    throw badRequest("This user already exists");
  }

  return await ProductSchema.create(data);
}

async function getUsers() {
  return await ProductSchema.find();
}

async function getUser(userId) {
  const existingUser = await ProductSchema.findById(userId);
  if (!existingUser) {
    throw badRequest("There are not such a user");
  }
  return await existingUser;
}

async function removeUser(userId) {
  const existingUser = await ProductSchema.findById(userId);
  if (!existingUser) {
    throw badRequest("There are not such a user");
  }
  const child = await ArticleSchema.find({ owner: `${userId}` });
  if (child) {
    child.map((x) => x.remove({}));
  }
  return await existingUser.remove();
}

async function updateUser(userId, data) {
  const existingUser = await ProductSchema.findById(userId);
  if (!existingUser) {
    throw badRequest("User cannot be found");
  }

  Object.entries(data || {}).forEach(([key, value]) => {
    if (
      [
        "firstName",
        "lastName",
        "role",
        "numberOfArticles",
        "nickname",
      ].includes(key)
    )
      existingUser[key] = value || undefined;
  });

  await existingUser.save();
  return existingUser;
}

module.exports = { createUser, getUsers, updateUser, getUser, removeUser };
