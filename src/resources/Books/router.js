const express = require("express");

const { getSpecificBookType, sortByAuthor } = require("./controller");

const booksRouter = express.Router();

booksRouter.get("/:type", getSpecificBookType);

booksRouter.get("/:author", sortByAuthor);

module.exports = booksRouter;
