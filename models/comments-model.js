const db = require("../db/connection");
const { testFor404Error } = require("../utils/error-handling");

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
    `INSERT INTO comments (body, article_id, author, votes, created_at) VALUES ($1, $2, $3, 0, $4) RETURNING *;`,
    [body, articleId, username, date]
  );

  return result.rows[0];
};

exports.eradicateComment = async (commentId) => {
  const existence = await db.query(
    "SELECT comment_id FROM comments WHERE comment_id = $1;",
    [commentId]
  );

  await testFor404Error(existence.rows);

  await db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [
    commentId,
  ]);
  return;
};
