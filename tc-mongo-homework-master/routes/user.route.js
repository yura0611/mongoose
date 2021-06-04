const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");
const user = require("../models/user");

router.post("/", userController.createUser);

router
    .get("/", userController.getUsers)
    .get("/:userId", userController.getUser)
    .get("/:userId/articles", userController.getArticlesByUserId)

router.put("/:userId", userController.updateUser);

router.delete("/:userId", userController.removeUser);

module.exports = router;
