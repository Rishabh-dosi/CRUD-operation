var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "user-login"
})
con.connect(function (error) {
    if (error) throw error;

})
module.exports = con;