// Include to use .env file
require('dotenv').config();
const mysql2 = require('mysql2/promise');
const pool = mysql2.createPool(process.env.DATABASE_URL);
console.log("DB Connected", pool);

// Monkey patch .query(...) method to console log all queries before executing it
// For DEBUGGING purposes
const oldQuery = pool.query;
pool.query = function (...args) {
    const [sql, params] = args;
    console.log(`EXECUTING QUERY`, sql, params);
    return oldQuery.apply(pool, args);
};

module.exports = pool;