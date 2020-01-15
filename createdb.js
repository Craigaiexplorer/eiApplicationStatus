// Node.js + Express server backend for petsapp
// v2 - use SQLite (https://www.sqlite.org/index.html) as a database
//
// COGS121 by Philip Guo
// https://github.com/pgbovine/COGS121

// run this once to create the initial database as the pets.db file
//   node create_database.js

// to clear the database, simply delete the .db file:
//   rm eiStatusApp.db



const sqlite3 = require('sqlite3');

//will create file in directory node is running in
const db = new sqlite3.Database('eiStatusApp.db');

// run each database statement *serially* one after another
// (if you don't do this, then all statements will run in parallel,
//  which we don't want)
db.serialize(() => {
  // create a new database table:
  db.run("CREATE TABLE roe (sin text(9), emp_name_first TEXT, emp_name_last text, emp_address_region text, bus_address_region text, tot_hours numeric, tot_earnings numeric)");

  console.log('successfully created the roe table in eiStatusApp.db');

  db.run("CREATE TABLE applicationStatus (app_date text, sin text(9), ei_app_status text(1), emp_name_first TEXT, emp_name_last text, emp_address_region text,  comm_method text(1), unconf_benefit_paid numeric, unconf_benefit_start_date text, unconf_notification_date text, unconf_tot_hours numeric, unconf_tot_earnings numeric)");

  console.log('successfully created the applicationStatus table in eiStatusApp.db');

});

db.close();