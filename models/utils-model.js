exports.testFor400Error = (input) => {
  return typeof input !== "number"
    ? Promise.reject({
        status: 400,
        msg: `${input} is not accepted`,
      })
    : input;
};

exports.testFor404Error = async (rows) => {
  return rows.length === 0
    ? Promise.reject({
        status: 404,
        msg: `Article cannot be found`,
      })
    : rows;
};
