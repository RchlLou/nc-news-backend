const db = require("../db/connection");
const { testFor404Error } = require("../utils/error-handling");

// GET /api/articles >>> getArticles
exports.retrieveArticles = async (sortBy, order, topic) => {
  const sortByGreenList = ["created_at", "votes", "article_id", "author"];
  const orderGreenList = ["asc", "desc"];
  const topicsGreenList = ["mitch", "cats", "paper"];
  let topicsQuery = undefined;

  const sortByQuery = await checkSafety(sortBy, sortByGreenList);
  const orderQuery = await checkSafety(order, orderGreenList);

  if (topic !== undefined) {
    topicsQuery = await checkSafety(topic, topicsGreenList);
  }

  let statement = `SELECT articles.article_id, articles.title, articles.author, articles.topic, articles.created_at, articles.votes, COUNT (comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id `;

  if (topicsQuery !== undefined) {
    statement += `WHERE articles.topic ILIKE '${topicsQuery}' `;
  }

  statement += `GROUP BY articles.article_id ORDER BY ${sortByQuery} ${orderQuery};`;

  const result = await db.query(statement);
  return result.rows;

  // Check for SQL Injection
  async function checkSafety(query, greenList) {
    const isGreenListed = greenList.find((element) => {
      return element === query.toLowerCase();
    });
    if (isGreenListed === undefined) {
      return Promise.reject({ status: 400, msg: `${query} is not accepted` });
    }
    return isGreenListed;
  }
};

// GET /api/articles.:article_id >>> getArticleById
exports.retrieveArticleId = async (articleId) => {
  const result = await db.query(
    "SELECT articles.*, COUNT (comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;",
    [articleId]
  );
  await testFor404Error(result.rows);

  return result.rows[0];
};

// PATCH /api/articles/:article_id  >>> updateArticle
exports.alterArticle = async (incVotes, articleId) => {
  const result = await db.query(
    "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;",
    [incVotes, articleId]
  );
  await testFor404Error(result.rows);

  return result.rows[0];
};

// const withTopicsresult = await db.query(
//   `SELECT articles.article_id, articles.title, articles.author, articles.topic, articles.created_at, articles.votes, COUNT (comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.topic ILIKE '${topicsQuery}' GROUP BY articles.article_id ORDER BY ${sortByQuery} ${orderQuery};`
// );

// console.log(withoutTopicsresult);
//   if (topicsQuery === undefined) {
//     console.log(withoutTopicsresult.rows);
//     return withoutTopicsresult.rows;
//   } else {
//     console.log(withTopicsresult.rows);
