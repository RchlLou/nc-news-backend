const {
  retrieveArticleId,
  retrieveArticles,
  alterArticle,
} = require("../models/articles-model");

exports.getArticles = (req, res, next) => {
  // Function to accept uppercase characters
  const lowerCaseReqQuery = (reqQuery) => {
    const queryEntries = Object.entries(req.query);
    const lowerCaseQueryArr = queryEntries.map((entryPair) => {
      return entryPair.map((element) => {
        return element.toLowerCase();
      });
    });
    return Object.fromEntries(lowerCaseQueryArr);
  };

  let { sort_by: sortBy } = lowerCaseReqQuery(req.query);
  let { order } = lowerCaseReqQuery(req.query);
  let { topic } = lowerCaseReqQuery(req.query);

  if (sortBy === undefined) {
    sortBy = "created_at";
  }

  if (order === undefined) {
    order = "desc";
  }

  retrieveArticles(sortBy, order, topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id: articleId } = req.params;

  retrieveArticleId(articleId)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.updateArticle = (req, res, next) => {
  const { inc_votes: incVotes } = req.body;
  const { article_id: articleId } = req.params;

  alterArticle(incVotes, articleId)
    .then((updatedArticle) => {
      res.status(200).send({ updatedArticle });
    })
    .catch(next);
};
