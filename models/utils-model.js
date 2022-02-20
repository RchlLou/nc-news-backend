exports.testFor404Error = async (rows) => {
  return rows.length === 0
    ? Promise.reject({
        status: 404,
        msg: `Article cannot be found`,
      })
    : rows;
};
