const { retrieveComments } = require("../models/comments-model");

// const { getArticleById } = require("../app");

// const express = require("express");
// const app = express();

exports.getCommentsByArticleId = async (req, res, next) => {
  const { article_id: articleId } = req.params;

  try {
    const articleComments = await retrieveComments(articleId);

    if (articleComments.length === 0) {
      res
        .status(200)
        .send({ articleComments: { msg: "This article has no comments" } });
      // Promise.resolve({
      //   status: 200,
      //   msg: "This article has no comments",
      // });

      // console.log(articleComments);
      // const { originalUrl } = req;
      // const newUrl = originalUrl.slice(0, -9);
      // console.log(newUrl);
      // res.redirect(302, newUrl);
    } else {
      res.status(200).send({ articleComments });
    }
  } catch (err) {
    next(err);
  }
};
