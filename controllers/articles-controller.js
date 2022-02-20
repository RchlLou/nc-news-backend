const {
  retrieveArticleId,
  retrieveArticles,
  alterArticle,
} = require("../models/articles-model");

exports.getArticles = (req, res, next) => {
  retrieveArticles()
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
