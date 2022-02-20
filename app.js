const express = require("express");
const app = express();

const {
  handlePathNotFound,
  handlePsqlErrors406,
  handlePsqlError411,
  handlePsqlError416,
  handlePsqlError400,
  handlePsqlError404,
  handleCustomErrors,
  handleServerErrors,
} = require("./utils/error-handling");

const { getTopics } = require("./controllers/topics-controller");

const {
  getArticles,
  getArticleById,
  updateArticle,
} = require("./controllers/articles-controller");

const { getUsers } = require("./controllers/users-controller");

const {
  getCommentsByArticleId,
  postComment,
  deleteComment,
} = require("./controllers/comments-controller");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/users", getUsers);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.patch("/api/articles/:article_id", updateArticle);

app.post("/api/articles/:article_id/comments", postComment);

app.delete("/api/comments/:comment_id", deleteComment);

app.all("/*", handlePathNotFound);

app.use(handleCustomErrors);

// 416 NEEDS TO BE BEFORE 400
app.use(handlePsqlError416);

app.use(handlePsqlError400);

app.use(handlePsqlErrors406);

app.use(handlePsqlError404);

app.use(handlePsqlError411);

app.use(handleServerErrors);

module.exports = app;
