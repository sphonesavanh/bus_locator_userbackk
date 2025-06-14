const pool = require("../db/database");

const getUserByName = async (user_name) => {
  const query = "SELECT * FROM users WHERE user_name = $1";
  const values = [user_name];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error("Error retrieving user by name:", err);
    throw err
  }
};

module.exports = { getUserByName };