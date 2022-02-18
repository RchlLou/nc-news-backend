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

// "SELECT articles.article_id, articles.title, articles.author, articles.topic, articles.created_at, articles.votes, COUNT (comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY created_at DESC;"

// .query(
//   "SELECT articles.*, COUNT (comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY article_id;",
//   [articleId]
// )

exports.retrieveArticleId = (articleId) => {
  return db
    .query(
      "SELECT articles.*, COUNT (comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;",
      [articleId]
    )
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
