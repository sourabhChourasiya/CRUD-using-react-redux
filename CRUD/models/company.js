var mongoose=require('mongoose');

// company Schema

var CompanySchema = mongoose.Schema({
    companyId:{
        type:Number,
        required:true,
        unique:true,
        dropDups: true
    },
    companyName:{
        type:String,
        required:true  
    },
    companyAddress:{
        type:String,
        required:true
    }
},{collection:'Company'});

var Company=module.exports = mongoose.model('Company',CompanySchema);

// get company
module.exports.getCompany = function(callback){
    Company.find(callback).sort({companyName:1});
};


//POST - Add Company
module.exports.addCompany = function(company, callback){
    Company.create(company, callback);
};

//update company
module.exports.updateCompany = function(companyId, companyInfo, options, callback){
    var query = {companyId : companyId};
    var update = {
        companyName: companyInfo.companyName,
        companyAddress: companyInfo.companyAddress,
    }
    Company.findOneAndUpdate(query, update, options, callback);
};

// Delete Company
module.exports.deleteCompany = function(companyId, callback){
    var query = {companyId :companyId};
    Company.remove(query,callback);
    
};