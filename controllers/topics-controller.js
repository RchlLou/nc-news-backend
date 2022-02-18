const { retrieveTopics } = require("../models/topics-model");

exports.getTopics = (req, res, next) => {
  const { article_id: articleId } = req.params;

  retrieveTopics(articleId, req)
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};
