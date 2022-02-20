exports.handlePathNotFound = (req, res) => {
  res.status(404).send({ msg: "Endpoint not found" });
};

// 406 - NOT ACCEPTABLE - 'Invalid input', ie article = "NOT-AN-ID"
exports.handlePsqlErrors406 = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(406).send({ msg: "Invalid input" });
  } else {
    next(err);
  }
};

// 411 - INPUT REQUIRED - Length required!
exports.handlePsqlError411 = (err, req, res, next) => {
  if (err.code === "23502") {
    res.status(411).send({ msg: `Input is required` });
  }
};

// 400 - ERROR IN INPUT OBJECT
exports.handlePsqlError400 = (err, req, res, next) => {
  if (err.code === "23503" && err.constraint === "comments_author_fkey") {
    const regex = /\/?=\(([^)]+)\)/;
    let badInput = err.detail.match(regex)[1];

    res.status(400).send({ msg: `${badInput} is not accepted` });
  } else {
    next(err);
  }
};

// 416 - INPUT REQUIRED - Request Range Not Satisfiable
exports.handlePsqlError416 = (err, req, res, next) => {
  if (
    err.code === "23503" &&
    err.detail === 'Key (author)=() is not present in table "users".'
  ) {
    const regex = /\/?=\(()\)/;
    let noInput = err.detail.match(regex)[4];
    res.status(416).send({ msg: `Input is ${noInput}` });
  } else {
    next(err);
  }
};

// 404 - ARTICLE DOESN'T EXIST
exports.handlePsqlError404 = (err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "Article cannot be found" });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error" });
};
