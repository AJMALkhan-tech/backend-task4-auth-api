const pool = require("../config/db");

const insertUser = async ({ name, email, hashedPassword, role }) => {
  const query = `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role, created_at
  `;
  const result = await pool.query(query, [name, email, hashedPassword, role || "User"]);
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const query = `SELECT id, name, email, password, role FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);
  return result.rows[0] || null;
};

const findUserById = async (id) => {
  const query = `SELECT id, name, email, role, created_at FROM users WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
};

module.exports = { insertUser, findUserByEmail, findUserById };