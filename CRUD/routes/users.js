var mongoose=require('mongoose');
var express = require('express');
var router = express.Router();

var employee = require('../models/employee');
var company = require('../models/company');



// Services for Employee

// get Employees 
module.exports.getEmployee = function(req,res){
  var limit=parseInt(req.query.records);
  var skip=parseInt(req.query.skip);
  employee.getEmployees(limit,skip,function(err,employees){
    if(err){
      return res.json(err) ;      
    }
    else{
      return res.json(employees);
    }
  });  
};


// get Employee By id
module.exports.getEmployeeById = function(req,res){
  var employeeId=req.query.employeeId;
  employee.getEmployeeById(employeeId,function(err,employee){
    if(err){
      return res.json(err) ;      
    }
    else{
      return res.json(employee);
    }
  });  
};


// post-add employee
module.exports.addEmployee = function(req,res){
  var employeeInfo=req.body;
  employee.addEmployee(employeeInfo,function(err,employeeResult){
    if(err){
      return res.json(employeeInfo.employeeId+ " Already Exist");
    }
    else{
      return res.json(employeeInfo.employeeId+ " Added Successfully");
      }
  });
};


// put-update employee
module.exports.updateEmployee = function (req,res) { 
  var employeeId = req.query.employeeId;
  var employeeInfo=req.body;
  employee.updateEmployee(employeeId,employeeInfo, {new:true}, function(err,employeeInfo){
    if(employeeInfo==null){
        return res.json(employeeId+ " does not exist");
    }
    else{
        return res.json(employeeId+ " Updated Successfully");
    }  
});
};


// delete employee
module.exports.deleteEmployee = function(req,res){
  var employeeId = req.query.employeeId;
  employee.deleteEmployee(employeeId, function(err,employeeInfo){
    if(employeeInfo==null){
      return res.json(employeeId + " Not Found");
    }
    else{
      return res.json(employeeId +" Deleted Successfully");
    }  
});
};




// Services for company

//get Company list
module.exports.getCompany = function(req,res){
  company.getCompany(function(err,companyInfo){
    if(err){
      return res.json(err) ;      
    }
    else{
      return res.json(companyInfo);
    }
  });  
};

// post-add Company
module.exports.addCompany = function(req,res){
  var companyInfo=req.body;
  company.addCompany(companyInfo,function(err,result){
    if(err){
      return res.json(companyInfo.companyId+ " Already Exist");
    }
    else{
      return res.json(companyInfo.companyId+ " Added Successfully");
      }
  });
};

// put-update company
module.exports.updateCompany = function (req,res) {
  var companyId = req.query.companyId;
  var companyInfo=req.body;
  company.updateCompany(companyId,companyInfo, {new:true}, function(err,companyInfo){
    if(companyInfo==null){
        return res.json(companyId+ " Does Not Exist");
    }
    else{
        return res.json(companyId+ " Updated Successfully");
    }  
});
};


// delete company
module.exports.deleteCompany = function(req,res){
  var companyId = req.query.companyId;
  company.deleteCompany(companyId, function(err,companyInfo){
    if(companyInfo==null){
      return res.json(companyId + " Not Found");
    }
    else{
      return res.json("Record for "+ companyId +" Deleted Successfully");
    }  
});
};