const db = require("../db/connection");

exports.retrieveTopics = () => {
  console.log("model");
  return db.query(`SELECT * FROM topics;`).then((result) => {
    return result.rows;
  });
};
