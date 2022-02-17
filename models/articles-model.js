const db = require("../db/connection");

const { isThereAPsqlError } = require("./utils-model");

exports.retrieveArticles = () => {
  return db
    .query(
      "SELECT article_id, title, author, topic, created_at, votes FROM articles ORDER BY created_at DESC;"
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.retrieveArticleId = (articleId) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [articleId])
    .then(({ rows }) => {
      return isThereAPsqlError(rows);
    })
    .then((rows) => {
      return rows[0];
    });
};

exports.alterArticle = (incVotes, articleId) => {
  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;",
      [incVotes, articleId]
    )
    .then(({ rows }) => {
      return isThereAPsqlError(rows);
    })
    .then((rows) => {
      return rows[0];
    });
};
