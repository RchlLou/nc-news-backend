const db = require("../db/connection");

exports.retrieveArticleId = (articleId) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [articleId])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Request not found`,
        });
      } else {
        return rows[0];
      }
    });
};
