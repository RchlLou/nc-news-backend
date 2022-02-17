const db = require("../db/connection");
const { test404Error } = require("./utils-model");

exports.retrieveComments = (articleId) => {
  return db
    .query(
      "SELECT comment_id, votes, created_at, author, body FROM comments WHERE article_id = $1;",
      [articleId]
    )
    .then(({ rows }) => {
      return test404Error(rows);
    })
    .then((rows) => {
      return rows;
    });
};
