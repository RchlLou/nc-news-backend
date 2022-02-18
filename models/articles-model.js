const db = require("../db/connection");
const { testFor404Error, testFor400Error } = require("./utils-model");

// GET /api/articles >>> getArticles
exports.retrieveArticles = async () => {
  const result = await db.query(
    "SELECT article_id, title, author, topic, created_at, votes FROM articles ORDER BY created_at DESC;"
  );
  return result.rows;
};

// GET /api/articles.:article_id >>> getArticleById
exports.retrieveArticleId = async (articleId) => {
  const result = await db.query(
    "SELECT * FROM articles WHERE article_id = $1;",
    [articleId]
  );
  await testFor404Error(result.rows);

  return result.rows[0];
};

// PATCH /api/articles/:article_id  >>> updateArticle
exports.alterArticle = async (incVotes, articleId) => {
  await testFor400Error(incVotes);

  const result = await db.query(
    "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;",
    [incVotes, articleId]
  );

  await testFor404Error(result.rows);

  return result.rows[0];
};
