var mysql = require('mysql');
 
 var con = mysql.createConnection({
   host: "localhost",
   port: 3306,
   user: "root",
   password: "sql123"
 });

 const sql = `select * from web where keywords like '%小说%'`
 
 con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
    });
});