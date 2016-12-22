var express=require('express');
var router=express.Router();
var users=require('./users');


// service call the employee collection.
router.get('/employee',users.getEmployee);
router.get('/employeeById',users.getEmployeeById);
router.post('/employee',users.addEmployee);
router.put('/employee',users.updateEmployee);
router.delete('/employee',users.deleteEmployee);

// service call the company collection.
router.get('/company',users.getCompany);
router.post('/company',users.addCompany);
router.put('/company',users.updateCompany);
router.delete('/company',users.deleteCompany);







// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.get('/crudapp',function(req, res){
//   var responseObject = {message:"OK"};
//   res.send(responseObjct);  
// });





module.exports = router;
