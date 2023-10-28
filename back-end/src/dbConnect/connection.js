const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'friendVault',
  password: 'rohith',
  port: 5432, // PostgreSQL default port
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}
