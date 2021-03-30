const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'ahmed',
  host: 'localhost',
  database: 'chatdb',
  password: 'karirinkute',
  port: 5432,
});

module.exports = pool;
