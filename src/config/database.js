const { createPool } = require('mysql');

const pool = createPool({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'bc64f62de970d8',
    password: 'e92eda4e',
    database: 'heroku_5ec5c13a06479b3',
    connectionLimit: 10,
});

module.exports = pool;