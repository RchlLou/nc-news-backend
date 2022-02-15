const { retrieveArticleId } = require("../models/articles-model");

exports.getArticleById = (req, res, next) => {
  const { article_id: articleId } = req.params;
  retrieveArticleId(articleId)
    .then((articleInfo) => {
      res.status(200).send({ articleInfo });
    })
    .catch(next);
};
