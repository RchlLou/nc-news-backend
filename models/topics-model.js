const db = require("../db/connection");

exports.retrieveTopics = async () => {
  const result = await db.query(`SELECT * FROM topics;`);
  return result.rows;
};
