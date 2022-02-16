const express = require("express");
const app = express();

const {
  handlePathNotFound,
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./utils/error-handling");

const { getTopics } = require("./controllers/topics-controller");
const { getArticleById } = require("./controllers/articles-controller");
const { getUsers } = require("./controllers/users-controller");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/users", getUsers);

app.all("/*", handlePathNotFound);

app.use(handleCustomErrors);

app.use(handlePsqlErrors);

app.use(handleServerErrors);

module.exports = app;
