const path = require("path");
const http = require('http')
const express = require('express');
const app = new express();
const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database('eiStatusApp.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the EI DB SQlite database.');
});

let sql = `SELECT rowid as id, emp_name_first as name
           FROM roe
           WHERE sin  = ?`;

let sqlapp = `SELECT rowid as id, unconf_tot_hours as selapphours
           FROM applicationStatus
           WHERE sin  = ?`;



var insertSql = db.prepare("INSERT INTO applicationStatus(sin, unconf_tot_hours, unconf_tot_earnings, emp_address_region) VALUES(?,?,?,?)");



app.get('/', function(request, response){
    response.sendFile('C:/web/bootstrap.html');
});
app.use(express.urlencoded());

app.post('/sin-check', (req, res) =>
{
        const sinVar = req.body.sinroe;
        console.log('caught sin:' + sinVar);
        db.serialize(() => {
            db.get(sql, [sinVar], (err, row) => {
                   if (err) {
                            console.error(err.message);
                    }
            return row
            ? console.log(row.id + "\t" + row.name)
               : console.log(`no data found`);
            });
        });
        res.write('<html>'+'<p>sin:' + sinVar +'</html>');
});

        app.post('/sub-sin', (req, res) =>
        {
        const sinVar = req.body.sin
        console.log('caught sin:' + sinVar)
        db.serialize(() => {
            insertSql.run(sinVar,req.body.hours, req.body.earnings,req.body.HomeRegion);
            insertSql.finalize();

             db.get(sqlapp, [sinVar], (err, row) => {
                   if (err) {
                            console.error(err.message);
                    }
            return row
            ? console.log(row.id + "\t" + row.selapphours)
               : console.log(`no data found`);
            res.write('<html>'+'<p>sin:' + sinVar + ':' + row.selapphours +'</html>');
            });
        });



        // close the database connection
        db.close((err) => {
            if (err) {
            return console.error(err.message);
            }
            console.log('Close the database connection.');
            });
        });
app.listen(5000)
