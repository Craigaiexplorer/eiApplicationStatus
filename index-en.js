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

var varschedulebutton = fs.readFileSync('schedbutton.html','utf8');


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
    var tempPayment = EstWeeklyPayment
    if(tempPayment>573.00)
    {
        tempPayment = 573.00
    }
    res.write('<p>')
    res.write('<p>')
    res.write('<p>')
    res.write('<p>Estimated weekly payment: ' + tempPayment)
    res.write('<p>')

    res.write('<p>Estimated start date(mm/dd/yyyy): ' + EstStartDate.toLocaleDateString("en-US"))
    res.write('<p>')
    res.write('<p>Application Number: ' + ApplicationNum);
    res.write('<p> </p>')
    res.write('<p> </p>')
    res.write(varFooter);
    res.write('</main>');
    res.write('</html>');
    res.end(); //end the response
}
//function called when either application doesn't meet hours requirement or roe reason is voluntary
function pushMoreInfo(res, message,message2, followupDt, appNum){
var varHeader = fs.readFileSync('header.html','utf8');

var varFooter = fs.readFileSync('footer.html','utf8');
  res.write('<html>'); //write a response to the client
  res.write(varHeader);
 // res.write(varTitle);



  res.write('<h4 style="text-align:center"> '+ message +' </h4>')

  res.write(percirclehtml);

   res.write('<p>')
   res.write('<p>')
   res.write('<h5 style="text-align:center"> '+ message2 +' </h>')
  res.write('<p>')
  res.write('<p>Estimated follow-up date (MM/DD/YYYY): ' + followupDt.toLocaleDateString("en-US"))
  res.write('<p>')
  res.write('<p>Application Number: '+ appNum );
  res.write('<p>')
  res.write(varschedulebutton)
  res.write('<p>')
  res.write('<p>')
  res.write(varFooter);
  res.write('</main>');
  res.write('</html>');
  res.end(); //end the response
}
function pagePushLogic(req,res) {
    if(req.body.reason == 'Voluntary')
        {
            varMessage = 'Please provide more information'
            var varMessage2 = 'Voluntary reasons require additional medical or other reports'
             pushMoreInfo(res, varMessage, varMessage2, commStartDate,(Math.random()*10000000).toFixed(0))

        }
        else
        {
        if(varAppStatus == 'approved'){
            pushApproved(res,totBenPd.toFixed(2),benStartDate,(Math.random()*10000000).toFixed(0));
          }
          else
          {
            varMessage = 'Sorry you do not have enough hours  (required hours outstanding for region calculation)'
            var varMessage2 = 'Only one employer has filed a ROE , are there additional insurable hours to be reported?'
            pushMoreInfo(res, varMessage, varMessage2,commStartDate, (Math.random()*10000000).toFixed(0))
          }
         }

};

function pushSchedule(req,res){
var varHeader = fs.readFileSync('header.html','utf8');

var varFooter = fs.readFileSync('footer.html','utf8');
  res.write('<html>'); //write a response to the client
  res.write(varHeader);
 // res.write(varTitle);



  res.write('<h4 style="text-align:center"> NEXT STEPS:Leverage ESDC scheduling system developed for bio metric scanning </h4>')
  res.write('<p>')
  var contructhtml = fs.readFileSync('constructimg.html','utf8');
  res.write(contructhtml)
  res.write('<p>')
  res.write('<p>')
  res.write(varFooter);
  res.write('</main>');
  res.write('</html>');
  res.end(); //end the response
}
function pushConfirmPage(req,res,confSIN,confFirstNm,confLastNm,confRegion,confHours,confEarnings,confReason)
{
    var varHeader = fs.readFileSync('header.html','utf8');

    var varFooter = fs.readFileSync('footer.html','utf8');
    res.write('<html>'); //write a response to the client
    res.write(varHeader);


    res.write('<main property="mainContentOfPage" typeof="WebPageElement" class="container"><div class="mwstitle section">')


    res.write('<form method="post" action="/sub-sin" class="form-horizontal"> ')
    res.write('<div class="form-group"><label for="sin" class="col-sm-3 control-label">SIN<code></code></label>')
    res.write('<div class="col-sm-9">')
    res.write('<input type="text" id="sin" name="sin" class="form-control" value="' + confSIN + '">')
    res.write('</div> </div>')
    res.write('<div class="form-group"> <label for="firstnm" class="col-sm-3 control-label">First Name<code></code></label><div class="col-sm-9">')
    res.write('<input type="text" id="firstnm" name="firstnm" class="form-control" value="' + confFirstNm + '">')
    res.write('</div></div>')
    res.write('<div class="form-group"> <label for="lastnm" class="col-sm-3 control-label">Last Name<code></code></label><div class="col-sm-9">')
    res.write('<input type="text" id="lastnm" name="lastnm" class="form-control" value="' + confLastNm + '">')
    res.write('</div></div>')
    res.write('<div class="form-group"> <label for="hours" class="col-sm-3 control-label">Insured Hours<code></code></label><div class="col-sm-9">')
    res.write('<input type="text" id="hours" name="hours" class="form-control" value="' + confHours + '">')
    res.write('</div></div>')
   //earnings
    res.write('<div class="form-group"> <label for="earnings" class="col-sm-3 control-label">Insured Earnings<code></code></label><div class="col-sm-9">')
    res.write('<input type="text" id="earnings" name="earnings" class="form-control" value="' + confEarnings + '">')
    res.write('</div></div>')

    res.write('<div class="form-group"> <label for="HomeRegion" class="col-sm-3 control-label">Home Region code<code></code></label><div class="col-sm-9">')
    res.write('<input type="text" id="HomeRegion" name="HomeRegion" class="form-control" value="' + confRegion + '">')
    res.write('</div></div>')

    res.write('<div class="form-group"> <label for="reason" class="col-sm-3 control-label">Home Region code<code></code></label><div class="col-sm-9">')
    res.write('<input type="text" id="reason" name="reason" class="form-control" value="' + confReason + '">')
    res.write('</div></div>')

    res.write('<div class="form-group"> <label for="reason" class="col-sm-3 control-label">Home Region code<code></code></label><div class="col-sm-9">')
    res.write('<input type="date" id="appDate" name="appDate"  value="2020-01-22"  min="2020-01-01" max="2020-12-31">')
    res.write('</div></div>')

    var varconfButton = fs.readFileSync('confbutton.html','utf8');
    res.write(varconfButton)


    res.write('</form>')








    res.write(varFooter);
   // res.write('</main>');
    res.write('</html>');
    res.end(); //end the response
}
// open database
let db = new sqlite3.Database('eiStatusApp.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the EI DB SQlite database.');

  });



let sql = `SELECT sin as Sin, emp_name_first,emp_name_last,emp_address_region, tot_hours, tot_earnings, reason
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
    response.sendFile('C:/web/sinonly.html');
});
app.use(express.urlencoded());
var totBenPd = '';
app.post('/sin-check', (req, res) =>
{
        console.log('start sin check')
        const sinVar = req.body.sinroe;
        console.log('caught sin:' + sinVar);
        db.serialize(() => {
            db.get(sql, [sinVar], (err, row) => {
                   if (err) {
                       res.sendFile('C:/web/bootstrap.html');
                    }
                    return row
            ? pushConfirmPage(req,res,row.Sin,row.emp_name_first,row.emp_name_last,row.emp_address_region,row.tot_hours,row.tot_earnings,row.reason)
                : res.sendFile('C:/web/bootstrap.html');
            //? console.log(row.id + "\t" + row.name)
            //   : console.log(`no data found`);
            });
        });
       // res.write('<html>'+'<p>sin:' + sinVar +'</html>');
});

        app.post('/sub-sin', (req, res) =>
        {
        var sinVar = req.body.sin
        appStartDate = req.body.appDate
        console.log('caught sin:' + sinVar)
        db.serialize(() => {
            var varEarnings = req.body.earnings;
            totBenPd = benefit_paid(varEarnings);
           varHours = req.body.hours;
            benStartDate = DateCalc(appStartDate, 7);
            commStartDate = DateCalc(appStartDate,28);
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
    app.post('/schedule', (req, res) =>
    {
          pushSchedule(req,res);
    });

//}
app.listen(5001);
//app.listen(5001, '192.168.1.23'||'localhost');
