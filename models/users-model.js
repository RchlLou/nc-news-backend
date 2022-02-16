const db = require("../db/connection");

exports.retrieveUsers = () => {
  return db.query("SELECT username FROM users;").then(({ rows }) => {
    return rows;
  });
};
