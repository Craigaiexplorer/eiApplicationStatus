const path = require("path");
const http = require('http')
const express = require('express');
const app = new express();
const sqlite3 = require('sqlite3').verbose();
const util = require('util');
var fs = require('fs');

var varHeader = fs.readFileSync('header.html','utf8');

var varTitle = fs.readFileSync('mainStatusTitle.html','utf8');
var imghtml = fs.readFileSync('img.html','utf8');

var percirclehtml = fs.readFileSync('percircle.html','utf8');



var varFooter = fs.readFileSync('footer.html','utf8');

function benefit_paid(varEarnings){
    return (varEarnings * 0.55/22);
    }

function DateCalc(StartDate, addDays){
    var functDate = new Date(StartDate);
    console.log('date:' + functDate);
    functDate.setDate(functDate.getDate() + addDays);
    console.log('date:' + functDate);
    return functDate;
    }

function getHmtFile(fileloc){}

function disHtml(doc){}

function DetApplicationStatus(roeHours, regReqHours){

   console.log('roeHours:'+ roeHours +' required hours:' + regReqHours)
    if (roeHours >= regReqHours) {
        console.log('approved');
        varAppStatus = 'approved';
    }
     else {
        console.log('denied')
        varAppStatus = 'denied';
     }
}

function pushApproved(res, EstWeeklyPayment, EstStartDate,ApplicationNum ){



    res.write('<html>'); //write a response to the client
    res.write(varHeader);
    res.write(varTitle);
    res.write('<h4 style="text-align:center;"> Approved </h4>')

    res.write(imghtml);

    res.write('<h5 style="text-align:center;"> You have been provisionally approved for EI benefits </h5>')
    res.write('<p>')
    res.write('<p>Estimated weekly payment: ' + EstWeeklyPayment)
    res.write('<p>')
    res.write('<p>Estimated start date: ' + EstStartDate)
    res.write('<p>')
    res.write('<p>Application Number: ' + ApplicationNum);
    res.write(varFooter);
    res.write('</main>');
    res.write('</html>');
    res.end(); //end the response
}
//function called when either application doesn't meet hours requirement or roe reason is voluntary
function pushMoreInfo(res, message, appNum){
var varHeader = fs.readFileSync('header.html','utf8');

//var varTitle = fs.readFileSync('mainStatusTitle.html','utf8');
//var imghtml = fs.readFileSync('img.html','utf8');


var varFooter = fs.readFileSync('footer.html','utf8');
  res.write('<html>'); //write a response to the client
  res.write(varHeader);
 // res.write(varTitle);



  res.write('<h4 style="text-align:center"> '+ message +' </h4>')

  res.write(percirclehtml);


  res.write('<p>Estimated follow-up date: ' )
  res.write('<p>')
  res.write('<p>Application Number: '+ appNum );
  res.write(varFooter);
  res.write('</main>');
  res.write('</html>');
  res.end(); //end the response
}
function pagePushLogic(req,res) {
    if(req.body.reason == 'Voluntary')
        {
            varMessage = 'Please provide more information'
             pushMoreInfo(res, varMessage, (Math.random()*10000000).toFixed(0))

        }
        else
        {
        if(varAppStatus == 'approved'){
            pushApproved(res,totBenPd.toFixed(2),'1900-01-01',(Math.random()*10000000).toFixed(0));
          }
          else
          {
            varMessage = 'Sorry you do not have enough hours  (required hours outstanding for region calculation)'
            pushMoreInfo(res, varMessage, (Math.random()*10000000).toFixed(0))
          }
         }

};


// open database in memory
let db = new sqlite3.Database('eiStatusApp.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the EI DB SQlite database.');
});

let sql = `SELECT rowid as id, emp_name_first as name, tot_hours, tot_earnings
           FROM roe
           WHERE sin  = ?`;

let sqlapp = `SELECT rowid as id, unconf_tot_hours as selapphours
           FROM applicationStatus
           WHERE sin  = ?`;

let sqlgetregionchar = `SELECT EI_Eco_region_code as regName, num_insured_hours_req as reqHours, min_weeks_payable_reg_ben as minPybl, max_num_wk_pay_reg_ben as maxPybl
           FROM curr_region_ei_characteristics
           WHERE EI_Eco_region_cd  = ?`;




var insertSql = db.prepare("INSERT INTO applicationStatus(sin, ei_app_status, unconf_tot_hours, unconf_tot_earnings, emp_address_region) VALUES(?,?,?,?,?)");
var appStartDate = '';

var benStartDate = '';
var commStartDate = '';
var varReqHours = '';
var varMinPybl = "";
var varMaxPybl = "";
var varEIrgncd = "";
var varAppStatus=""; //approved or denied
var varMessage="";
var varEICharRow =[];


app.get('/', function(request, response){
    response.sendFile('C:/web/bootstrap.html');
});
app.use(express.urlencoded());
var totBenPd = '';
app.post('/sin-check', (req, res) =>
{
        const sinVar = req.body.sinroe;
        console.log('caught sin:' + sinVar);
        db.serialize(() => {
            db.get(sql, [sinVar], (err, row) => {
                   if (err) {
                            console.error(err.message);
                    }
            varEICharRow(row)
            //? console.log(row.id + "\t" + row.name)
            //   : console.log(`no data found`);
            });
        });
        res.write('<html>'+'<p>sin:' + sinVar +'</html>');
});

        app.post('/sub-sin', (req, res) =>
        {
        var sinVar = req.body.sin
        appStartDate = req.body.hours
        console.log('caught sin:' + sinVar)
        db.serialize(() => {
            var varEarnings = req.body.earnings;
            //insertSql.run(sinVar,req.body.hours, req.body.earnings,req.body.HomeRegion);
            //insertSql.finalize();
            totBenPd = benefit_paid(varEarnings);
           varHours = req.body.hours;
           // benStartDate = DateCalc(appStartDate, 7);
           // commStartDate = DateCalc(appStartDate,28);
          // var varHomeRegion = document.getElementById('HomeRegion')
           varEIrgncd = req.body.HomeRegion;
           console.log('Region Code:', varEIrgncd);

                db.get(sqlgetregionchar, [varEIrgncd], (err, row) => {

                   if (err) {
                            console.error(err.message);
                    };
                    DetApplicationStatus(varHours, row.reqHours) ;
                   //varEICharRow = [row.reqName, row.reqHours]
                   console.log('done funct')
                   pagePushLogic(req,res)
                   console.log('done push')
                   totBenPd = benefit_paid(varEarnings);
                   insertSql.run(sinVar,varAppStatus,req.body.hours, req.body.earnings,req.body.HomeRegion);
                   insertSql.finalize();
                   console.log('back from insert');
                //   ? console.log(row.regName + ':' +row.reqHours)
                //   : console.log(`no data found`+ totBenPd + ':'+ benStartDate );
               // ? console.log( row.regName +" " +row.reqHours)

             //? console.log(row.id + "\t" + row.selapphours +'earn:' + totBenPd.toFixed(2))
            //   : console.log(`no data found`+ totBenPd + ':'+ benStartDate );
             //res.write('<html>'+'<p>sin:' + sinVar + ':' + row.selapphours + '<p>Total Benefit:'+ totBenPd +'</html>');

            });




           // console.log('max no weeks:'+ varEICharRow[1]);
           // varReqHours = varEICharRow[1];





        });

        //res.write('<html>' + '<p>Total Benefit:'+ totBenPd.toFixed(2) + 'Ben Start:' + benStartDate +'</html>');


        // close the database connection
        db.close((err) => {
            if (err) {
            return console.error(err.message);
            }
            console.log('Close the database connection.');
            });
        });
//app.listen(5001);
app.listen(5001, '192.168.1.23'||'localhost');
