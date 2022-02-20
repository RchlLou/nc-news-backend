const { retrieveComments, addComment } = require("../models/comments-model");

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
    next(err, username);
  }
};

// INSERT INTO books
// (title, price, quantity, release_date, is_fiction)

// VALUES ('The Hitchhiker''s Guide to the Galaxy', 899, 560, '1997-10-12', true),
// ('The Little Prince', 699, 1020, '1943-04-06', true),

//////////  NOTES FOR IF ADD ARTICLE RE-DIRECTION /////

// const { getArticleById } = require("../app");

// const express = require("express");
// const app = express();

// Promise.resolve({
//   status: 200,
//   msg: "This article has no comments",
// });

// console.log(articleComments);
// const { originalUrl } = req;
// const newUrl = originalUrl.slice(0, -9);
// console.log(newUrl);
// res.redirect(302, newUrl);
