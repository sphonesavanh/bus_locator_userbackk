const pool = require("../db/database");

const createUser = async ({ name, email, tel, password }) => {
  const result = await pool.query(
    `INSERT INTO users (user_name, user_email, user_tel, user_password)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, email, tel, password]
  );
  return result.rows[0];
};

const findUserByEmailOrTel = async (identifier) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE user_email = $1 OR user_tel = $1`,
    [identifier]
  );
  return result.rows[0];
};

module.exports = { createUser, findUserByEmailOrTel };
