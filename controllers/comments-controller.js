const { retrieveComments } = require("../models/comments-model");

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id: articleId } = req.params;
  retrieveComments(articleId)
    .then((articleComments) => {
      res.status(200).send({ articleComments });
    })
    .catch(next);
};
