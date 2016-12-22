var mongoose=require('mongoose');
mongoose.Promise = Promise; 

// Employee Schema

var EmployeeSchema = mongoose.Schema({
    employeeId:{
        type:Number,
        required:true,
        unique:true,
        dropDups: true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    companyId:{             //Reference relationship of employee schema with the company schema.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
        /*company:{         //This is the embedded document of company which is embedded in the employee document.
            companyName:{
                type:String,
                required:true
            },
            companyAddress:{
                type:String,
                required:true
            }            
        }*/
    
   /* company:{    // A field of employee schema
        type:String,
        required:true
    }*/

},{collection:'Employee'});

var Employee=module.exports = mongoose.model('Employee',EmployeeSchema);

// get employee
module.exports.getEmployees = function(limit,skip,callback){
        Employee.find({}).limit(limit).skip(skip).populate('companyId').sort({ employeeId: 1 }).exec(callback);
};

// get employee by Id
module.exports.getEmployeeById = function(employeeId,callback){
    Employee.findById(employeeId,callback);
};

//method which insert record in embedded document.
var insertDocument = function(employeeInfo,callback) { 
    var a={        
      "employeeId" : employeeInfo.employeeId,
      "name" : employeeInfo.name,
      "address": employeeInfo.address,
      "company" : {
         "companyName" : employeeInfo.company,
         "companyAddress" : "Gurgaon",
      }       
    };
 Employee.create(a, callback);
};


// POST-add employee
module.exports.addEmployee = function(employeeInfo,callback){
        Employee.create(employeeInfo,callback);
};

//PUT-update employee
module.exports.updateEmployee = function(employeeId, employeeInfo, options, callback){
    var query = {employeeId: employeeId};
    var update = {
        name: employeeInfo.name,
        address: employeeInfo.address,
        companyId:employeeInfo.companyId
    }
    Employee.findOneAndUpdate(query, update, options, callback);
};

// Delete Employee
module.exports.deleteEmployee = function(employeeId, callback){
    var query = {employeeId :employeeId};
    Employee.findOneAndRemove(query,callback);
};