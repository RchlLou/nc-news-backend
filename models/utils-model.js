exports.isThereAPsqlError = (rows) => {
  if (rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: `Request not found`,
    });
  }
  return rows;
};
