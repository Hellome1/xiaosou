const sql = require('mssql');

const sqlConfig = {
    user: 'root',
    password: 'sql123',
    database: 'webs',
    server: 'localhost',
    port: 3306,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: false, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

console.log(1)

const a = async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(sqlConfig)
        const result = await sql.query`select * from mytable where id = 1`
        console.dir(result)
    } catch (err) {
        // ... error checks
        console.error(err)
    }
}

a()

module.exports = a