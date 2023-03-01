// get the client
const mysql = require('mysql2');

// create the connection to database
module.exports = (queryo, cb) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'sql123',
      database: 'webs'
    });

    var rows = queryo.rows || 20;
    var page = queryo.page || 1;
    delete queryo.rows;
    delete queryo.page;
    var sql1_done, sql2_done;
    var results_o = [];
    
    // simple query
    var sqlstr = ``;
    for (var k in queryo) {
        sqlstr += ` ${k} like '%${queryo[k]}%'`;
    }
    var sqlQuery = `SELECT SQL_CALC_FOUND_ROWS * FROM web WHERE ${sqlstr} limit ${(page - 1) * rows},${rows}`;
    connection.query(
      sqlQuery,
      function(err, results, fields) {
        sql1_done = true
        if (results) {
            // console.log('results', results); // results contains rows returned by server
            // console.log(fields); // fields contains extra meta data about results, if available
            results_o.data = results;
        } else if (err) {
            throw err;
        }
        rightTimeExecCb();
      }
    );

    var sqlQuery2 = `select FOUND_ROWS() as total`;
    connection.query(
        sqlQuery2,
        function(err, results, fields) {
            sql2_done = true
            if (results) {
                // console.log('results', results); // results contains rows returned by server
                // console.log(fields); // fields contains extra meta data about results, if available
                results_o.total = results[0] && results[0].total;
            } else if (err) {
                throw err;
            }
            rightTimeExecCb();
        }
    );

    function rightTimeExecCb() {
        if (sql1_done && sql2_done) {
            var response = {code:200, data: results_o.data, total: results_o.total}
            cb(response);
            connection.end();
        }
    }
}

// // with placeholder
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],
//   function(err, results) {
//     console.log(results);
//   }
// );