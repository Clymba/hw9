const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: '1847',
    host: "localhost",
    port: 5432,
    database: "hw9"
})

module.exports = pool