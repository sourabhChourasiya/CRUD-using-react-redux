var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var dbref = require("mongoose-dbref");
var routes = require('./routes/index');
var users = require('./routes/users');
var cors = require('cors');//--------- This is for allow to cross domain access (sending request to different locahost port)
var http = require('http');
var Employee=require('./models/employee');
var Company=require('./models/company');
var app = express();


app.use(cors());//-------------------- This is for allow to cross domain access (sending request to different locahost port)
app.use(bodyParser.json());

//connect to Mongoose
mongoose.connect('mongodb://localhost/CRUD');
var db=mongoose.connection;

app.use('/', routes);



//get Employee list
//app.get('/employee',users.getEmployee);

// //get Employee by id
// app.get('/employeeById',users.getEmployeeById);

// //Add employee
// app.post('/employee',users.addEmployee);

// //Update employee
// app.put('/employee',users.updateEmployee);

// //Delete employee
// app.delete('/employee',users.deleteEmployee);


// //get Company list
// app.get('/company',users.getCompany);

// //Add Company
// app.post('/company',users.addCompany);

// //Update Company
// app.put('/company',users.updateCompany);

// //Delete Company
// app.delete('/company',users.deleteCompany);


// app.set('port', process.env.PORT || 3000);
// http.createServer(app).listen(app.get('port'), function () {
//     console.log('Express server listening on port ' + app.get('port'));
// });
 app.listen(3333);//--------------------Defining on which port number all the services will be going to listen.
console.log("Running on port 3333");

module.exports = app;