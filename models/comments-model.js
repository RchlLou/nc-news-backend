const db = require("../db/connection");
const { testFor404Error } = require("./utils-model");
const { getArticleById } = require("../controllers/articles-controller");

exports.retrieveComments = async (articleId) => {
  const existenceQuery = await db.query(
    "SELECT title FROM articles WHERE article_id = $1;",
    [articleId]
  );
  await testFor404Error(existenceQuery.rows);

  const commentQuery = await db.query(
    "SELECT comment_id, votes, created_at, author, body FROM comments WHERE article_id = $1;",
    [articleId]
  );

  return commentQuery.rows;
};

exports.addComment = async (body, username, articleId) => {
  const date = new Date();
  const result = await db.query(
    `INSERT INTO comments (body, article_id, author, votes, created_at) VALUES ($1, $2, $3,
      0, $4) RETURNING *;`,
    [body, articleId, username, date]
  );

  return result.rows[0];
};
