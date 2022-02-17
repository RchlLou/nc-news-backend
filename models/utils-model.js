exports.isThereAPsqlError = (rows) => {
  return rows.length === 0
    ? Promise.reject({
        status: 404,
        msg: `Request not found`,
      })
    : rows;
};
