const { retrieveTopics } = require("../models/topics-model");

exports.getTopics = (req, res, next) => {
  console.log("controller");
  retrieveTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};
