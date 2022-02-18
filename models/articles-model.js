const db = require("../db/connection");
const { testFor404Error, testFor400Error } = require("./utils-model");

// GET /api/articles >>> getArticles
exports.retrieveArticles = async () => {
  const result = await db.query(

    "SELECT articles.article_id, articles.title, articles.author, articles.topic, articles.created_at, articles.votes, COUNT (comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY created_at DESC;"

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

// WORKS BUT INCLUDES BODY
// const result = await db.query(
//   "SELECT articles.*, COUNT (comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id;"
// );
