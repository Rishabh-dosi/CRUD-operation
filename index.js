var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var con = require('./connection');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', "ejs")
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/registration.html')
})



app.post("/", function (req, res) {
    var name = req.body.fname;
    var email = req.body.email;
    var pasword = req.body.password;


    
        con.query("insert into practice(name , email , pasword) values (? , ? , ?)", [name, email, pasword], function (error, result) {
            
            res.send("registered successfully");
        })
    })

app.get("/practice", function (req, res) {

    
        var sql = "select * from practice";

        con.query(sql, function (error, result) {
            if (error) throw (error);

            res.render(__dirname + '/practice', { data: result });
        })
    })

app.get("/delete", function (req, res) {
    
        var sql = "delete from practice where idn = ?";

        con.query(sql, [req.query.idn], function (error, result) {
            if (error) throw (error);
            res.redirect("/practice");
        })
    })


app.get("/edit", function (req, res) {
    
    var sql = "select * from practice where idn = ?";
    var idn = req.query.idn;
    con.connect(function (req, res) {
        
    })
        con.query(sql, [idn] , function (error, result) {
            if (error) throw (error);

            res.render(__dirname+'/edit', { data : result });
        })
    })
app.post('/edit', function (req, res) {
    var sql = "update practice set name = ?, email = ?, pasword = ? where idn = ? ";
    var idn = req.body.idn;
    var name = req.body.name;
    var email = req.body.email;
    var pasword = req.body.pasword;
    con.query(sql, [name, email, pasword , idn], function (error, result) {
        if (error) throw error;
        res.redirect('/practice');
    })
})
app.listen(3000)