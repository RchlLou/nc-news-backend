const {
  retrieveComments,
  addComment,
  eradicateComment,
} = require("../models/comments-model");

exports.getCommentsByArticleId = async (req, res, next) => {
  const { article_id: articleId } = req.params;

  try {
    const articleComments = await retrieveComments(articleId);

    if (articleComments.length === 0) {
      res
        .status(200)
        .send({ articleComments: { msg: "This article has no comments" } });
    } else {
      res.status(200).send({ articleComments });
    }
  } catch (err) {
    next(err);
  }
};

exports.postComment = async (req, res, next) => {
  const { body, username } = req.body;
  const { article_id: articleId } = req.params;

  try {
    const postedComment = await addComment(body, username, articleId);
    res.status(200).send({ postedComment });
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  const { comment_id: commentId } = req.params;

  try {
    await eradicateComment(commentId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
