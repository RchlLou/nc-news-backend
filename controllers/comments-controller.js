const { retrieveComments } = require("../models/comments-model");

exports.getCommentsByArticleId = (req, res, next) => {
  retrieveComments().then((comments) => {
    console.log("controller");
  });
};
