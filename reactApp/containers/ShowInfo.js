

//This is the ShowInfo container, all the operations to add, update, delete , display is define in thus component.


import $ from 'jquery';
import _ from 'lodash';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination from "react-js-pagination";
import { Modal, Button,Popover,OverlayTrigger,NavDropdown,MenuItem,Dropdown } from 'react-bootstrap';
import { getEmployee,
         deleteEmployee,
         getCompany,
         addNewEmployeeRecord,
         updateEmployeeRecord,
         countEmployee } from '../actions/index';

//Object to keed details which can be user througth out the component.
var dataToManipulate={
    employeeDataToDelete : null,        // This variable will hold a single record which is to be Delete.
    employeeDataToUpdate : null,        // This variable will hold a single record which is to be update.
    dataToDisplay : [],                 // This variable holds array of object which is to be display on the screen.
    skip : 0,                             //This is the number of record to be skip while displaying user.
    record : 10,                          // This is the number of records to be shown per page.
    activePage : 1                        //This show the active page on the pagination grid. Initially it is set to page 1.
}



class ShowInfo extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            isUpdate : false,         // state to identify that update mode is open or not.
            showModal : false,        // state to show modal window for update and add record.
            deleteModal : false,      // state to open model window for delete confirmation.
        };
    }
    
    componentWillMount(){           //This method the the very first method to execute.
     this.props.getEmployeeData(dataToManipulate.record,dataToManipulate.skip); //This is the call to fetch 10 record form database.
     this.props.totalEmployee();    //This will fetch number of record in employee document in mongoDB.
     this.props.getCompanyData();   //This will fetch all the record form company document in mongoDB.
    }
    
    handlePageChange(pageNumber){               // Method to change page form pagination tag.
            dataToManipulate.skip=(pageNumber-1)*dataToManipulate.record;
            dataToManipulate.activePage=pageNumber;
            this.props.getEmployeeData(dataToManipulate.record,dataToManipulate.skip);                               
        }


    //  display(recordToDisplay){         // Method to display 10 record per page.(Used in client side pagination.)
    //     console.log("In display function with record to display "+recordToDisplay);
    //     var fromRecordNumber=(recordToDisplay-dataToManipulate.pageSize+1);
    //     var uptoRecordNumber=recordToDisplay;
    //     if(this.props.employees.length<uptoRecordNumber){
    //         uptoRecordNumber=this.props.employees.length;
    //     }
    //     var index=0;
    //     for(var i=fromRecordNumber-1;i<uptoRecordNumber;i++)
    //     {
    //         dataToManipulate.dataToDisplay[index]=this.props.employees[i];
    //         index++;
    //     }  
    //     console.log("dataToDisplay ",dataToManipulate.dataToDisplay); 
    //  }//method display() end
    
    
    
    
    //function for validate data for add and update
    validation(){  
        if(this.state.isUpdate==false && document.getElementById('employeeId').value=="")
        {   
            document.getElementById('employeeId').focus();       
            $("#showEmployeeIdError").css('visibility', 'visible');
            return false;
            }else if(this.state.isUpdate==false && document.getElementById('employeeId').value<1){   
                    document.getElementById('employeeId').focus();       
                    document.getElementById('showEmployeeIdError').innerHTML="Enter Positive Value";
                    $("#showEmployeeIdError").css('visibility', 'visible');
                    return false;
                    }else if(this.state.isUpdate==false && isNaN(document.getElementById('employeeId').value)){
                            document.getElementById('employeeId').focus();
                            document.getElementById('showEmployeeIdError').innerHTML="Only Numbers Allow";
                            $("#showEmployeeIdError").css('visibility', 'visible');
                            return false;
                            }else if(document.getElementById('name').value==""){
                                    document.getElementById('name').focus();
                                    document.getElementById('showNameError').innerHTML="Name Require";
                                    $("#showNameError").css('visibility', 'visible');
                                    return false;
                                    }else if(document.getElementById('address').value==""){
                                            document.getElementById('address').focus();
                                            document.getElementById('showAddressError').innerHTML="Address Require";
                                            $("#showAddressError").css('visibility', 'visible');
                                            return false;
                                            }else if(document.getElementById('company').value=="-1"){
                                                    document.getElementById('company').focus();
                                                    document.getElementById('showCompanyNameError').innerHTML="Please Select Company";
                                                    $("#showCompanyNameError").css('visibility', 'visible');
                                                    return false;
                                                    }
    return true;
    }  // validation() end  
    
    
    
    addNew(){                                                  // Method to add new record to the database
        for(var i=0;i<this.props.employees.length;i++){        //loop to check existance of employeeId.
            if(document.getElementById('employeeId').value == this.props.employees[i].employeeId){
                document.getElementById("existanceMessage").innerHTML= this.props.employees[i].employeeId+ " Already Exists.";
                return false;
            }
        }
        
        if(!this.validation()){return false;}
        else{
            var employeeDataToAdd={
                "employeeId":document.getElementById('employeeId').value,
                "name":document.getElementById('name').value,
                "address":document.getElementById('address').value,
                "companyId":document.getElementById('company').value
            };
            this.setState({
                showModal:false
            });
            this.props.addNewRecord(employeeDataToAdd);
            this.props.getEmployeeData(dataToManipulate.record,dataToManipulate.skip);
            this.props.getEmployeeData(dataToManipulate.record,dataToManipulate.skip);
            this.props.getEmployeeData(dataToManipulate.record,dataToManipulate.skip);
            this.props.getEmployeeData(dataToManipulate.record,dataToManipulate.skip);
        }
    }// addNew() end
    
    
    updateEmployeeRecord(){                         // Method to update record to the database
        if(!this.validation()){return false;}
        else{
            this.setState({
                showModal:false
            });
            var dataToUpdate={
                "employeeId":dataToManipulate.employeeDataToUpdate.employeeId,
                "name":document.getElementById('name').value,
                "address":document.getElementById('address').value,
                "companyId":document.getElementById('company').value
                };
            this.props.updateRecord(dataToUpdate);
            this.props.getEmployeeData(dataToManipulate.record,dataToManipulate.skip);
            this.props.getEmployeeData(dataToManipulate.record,dataToManipulate.skip);
            this.props.getEmployeeData(dataToManipulate.record,dataToManipulate.skip);
            this.props.getEmployeeData(dataToManipulate.record,dataToManipulate.skip);
            this.props.getEmployeeData(dataToManipulate.record,dataToManipulate.skip);
        } 
    }// updateEmployeeRecord() end
    
    
    deleteRecord(recordToDelete){                   // Method to delete record to the database
        this.props.deleteEmployeeData(recordToDelete);
        this.props.getEmployeeData(dataToManipulate.record,dataToManipulate.skip);
        this.props.getEmployeeData(dataToManipulate.record,dataToManipulate.skip);
        this.props.getEmployeeData(dataToManipulate.record,dataToManipulate.skip);
        this.props.getEmployeeData(dataToManipulate.record,dataToManipulate.skip);
        } //deleteRecord() end


    render(){
        
        //defined constant for add popover
       const popoverHoverFocusAdd = (
          <Popover id="popover-trigger-hover">
          <strong>Add</strong>
          </Popover>
       );
       
       //defined constant for edit popover
       const popoverHoverFocusEdit = (
          <Popover id="popover-trigger-hover-focus">
          <strong>Edit</strong>
          </Popover>
       );
       
       //defined constant for delete popover
       const popoverHoverFocusDelete = (
          <Popover id="popover-trigger-hover-focus">
          <strong>Delete</strong>
          </Popover>
       );
       // popover end
       
          if(this.props.employees.length>0)     // when this "if" condition will become true, it will generate an array (named "info") of rows to display record.
            {                
                var info = this.props.employees.map(function(employeeInfo){ //map() method starts form here.It will generate each row of table.
                var self= this;                
                return (<div id="row" className="col-md-12" key={employeeInfo.employeeId}>
                          <div className="col-md-1">
                              <OverlayTrigger trigger={['hover']} placement="right" overlay={popoverHoverFocusEdit}>
                                  <button id="button" className="button" onClick={()=>{this.setState({isUpdate:true});this.setState({showModal:true});dataToManipulate.employeeDataToUpdate=employeeInfo}}>
                                      <span className="glyphicon glyphicon-edit">
                                      </span>
                                   </button>
                              </OverlayTrigger>
                          </div>
                          <div className="col-md-1">{employeeInfo.employeeId}</div>
                          <div className="col-md-3">{employeeInfo.name}</div>
                          <div className="col-md-3">{employeeInfo.address}</div>
                          <div className="col-md-3">{employeeInfo.companyId.companyName==''
                            ?
                            name=self.state.this.props.company.map(function(data){
                                if(data._id==employeeInfo.companyId)
                                    {
                                      return data.companyName;
                                    }
                                  })
                             :
                             employeeInfo.companyId.companyName}
                          </div>                                               
                          <div className="col-md-1">
                              <OverlayTrigger trigger={['hover']} placement="left" overlay={popoverHoverFocusDelete}>
                                 <button onClick={()=>{this.setState({deleteModal:true}); dataToManipulate.employeeDataToDelete=employeeInfo}}>
                                    <span className="glyphicon glyphicon-trash">
                                    </span>
                                 </button>
                              </OverlayTrigger>
                           </div>
                      </div>);
                 },this); // map() method ends here
            }//if end
            else{
             console.log("Loading...");
            }//else end
            
            
          //this if condition will generate an array(dropDownList) of company's documents to create drop-down list.   
          if(this.props.company.length>0){            
                var dropDownList = this.props.company.map(function(list){ 
                var self= this;                
                return (
                    <option key={list._id} value={list._id}>{list.companyName}</option>                  
                );
                },this);
            }//if end
            else{
                console.log("Loading...");
            }//else end

    return(          
      <div>            
       {/*Modal window to confirm record to delete start */}   
        {this.state.deleteModal ?  
          <div className="static-modal">
            <Modal.Dialog>
            <Modal.Header id="deleteModalHeader">
              <Modal.Title id="deleteModalTitle">{"Delete Employee "}</Modal.Title>
             </Modal.Header>
            <Modal.Body id="deleteModalBody">
               {"Delete record of Emp Id "+ dataToManipulate.employeeDataToDelete.employeeId+" ?"}
            </Modal.Body>
            <Modal.Footer id="deleteModalFooter">
               <Button 
                 onClick={()=>{this.deleteRecord(dataToManipulate.employeeDataToDelete);
                 this.setState({deleteModal:false})}}>Delete</Button>
               <Button onClick={()=>{this.setState({deleteModal:false})}} autoFocus>Cancel</Button>
           </Modal.Footer>
           </Modal.Dialog>
        </div> :null}
       {/*Modal window to confirm record to delete end */}
            
        {/*Modal window for add and update record start */}   
          <Modal id="modalWindow"  className="modal1" show={this.state.showModal} onHide={this.close}>          
              <Modal.Header  id="modalHeader"><span  id="existanceMessage"></span>
                  <Modal.Title  id="modalTitle">{this.state.isUpdate ? "Update Employee": "Add New Employee"}</Modal.Title>           
              </Modal.Header>
          <div>
          <Modal.Body id="modalBody" >          
                   <div id="modalRow" className="col-sm-12">
                            <div  id="employeeIdLabel" className="col-sm-6" >Employee Id &nbsp;<b>*</b></div>
                            <div className="col-sm-6">
                              {this.state.isUpdate?
                                <div>
                                  <div>{dataToManipulate.employeeDataToUpdate.employeeId}</div>
                                  <span className="span" id="showEmployeeIdError" >Please Enter Employee Id.</span>
                                </div>
                                :
                                <div>
                                <input  id="employeeId" maxLength="4"
                                  onKeyPress={()=>{$("#showEmployeeIdError").css('visibility', 'hidden');
                                  document.getElementById('existanceMessage').innerHTML="";
                                  document.getElementById('showEmployeeIdError').innerHTML="Employee Id Require";
                                  }} autoFocus/>
                                  <br/>
                                  <span className="span" id="showEmployeeIdError" >Please Enter Employee Id.</span>
                              </div>}
                            </div>

                        </div>
                        <div id="modalRow" className="col-sm-12">
                            <div className="col-sm-6">Name &nbsp;<b>*</b></div>
                            <div className="col-sm-6">
                              <input maxLength="25" 
                                defaultValue={this.state.isUpdate ? dataToManipulate.employeeDataToUpdate.name : null} 
                                id='name' 
                                name='name'
                                onKeyPress={()=>$("#showNameError").css('visibility', 'hidden')} />
                              <br/>
                              <span className="span" id="showNameError" >Please Enter Name.</span>
                             </div>
                        </div>
                        <div id="modalRow" className="col-sm-12">
                            <div className="col-sm-6">Address &nbsp;<b>*</b></div>
                              <div className="col-sm-6">
                                <textarea rows="2" cols="21" maxLength="100" 
                                  defaultValue={this.state.isUpdate ? dataToManipulate.employeeDataToUpdate.address : null} 
                                  id='address' 
                                  name='address' 
                                  onKeyPress={()=>$("#showAddressError").css('visibility', 'hidden')}/>
                                <br/>
                                <span className="span" id="showAddressError" >Please Enter Address.</span> 
                             </div>     
                        </div>
                        
                       <div id="modalRow" className="col-sm-12">
                            <div className="col-sm-6">Company &nbsp;<b>*</b></div>
                            <div className="col-sm-6">
                                  <select id="company"  defaultValue={this.state.isUpdate ? typeof(dataToManipulate.employeeDataToUpdate.companyId)=="string"?this.state.companyInfo.map(function(data){
                                                                                                  if(data._id==dataToManipulate.employeeDataToUpdate.companyId)
                                                                                                      {
                                                                                                        return data._id;
                                                                                                      }
                                                                                                      }) :dataToManipulate.employeeDataToUpdate.companyId._id :null}
                                      onChange={()=>$("#showCompanyNameError").css('visibility', 'hidden')}> 
                                        <option value='-1'>&lt;Select&gt;</option>                                   
                                          {dropDownList}           {/*Dropdown list of company's document created by map() method */}
                                  </select>
                            <br/><span className="span" id="showCompanyNameError" >Please Select Company.</span>     
                            </div>     
                        </div>
                        
                        <div id="modalRow" className="col-sm-12">
                              <div  className="col-sm-6">
                              </div>
                              <div className="col-sm-6">
                                    <div  className="col-sm-6">
                                        <button id={this.state.isUpdate? "modalUpdateButton" :"modalAddButton"}  
                                            className="btn btn-default" 
                                            onClick={()=>{this.state.isUpdate ? this.updateEmployeeRecord() : this.addNew()}} >
                                            {this.state.isUpdate ? "Update" : "Add"}
                                        </button>
                                    </div>
                                    
                                    <div  className="col-sm-6">
                                        <Button id="modalCancelButton" onClick={()=>this.setState({showModal:false})}>
                                            Cancel
                                        </Button>
                                    </div>
                              
                              </div>
                        </div>
                        
            </Modal.Body>
            </div>
            <Modal.Footer  id="modalFooter">
            </Modal.Footer>
            </Modal>            
            {/*Modal window for add and update record end */}    


            
            {/*Pagination gird start*/}
            <div id="paginationGridContainer">
                <div id="paginationDiv">
                    <Pagination className="pagination"
                      activePage={dataToManipulate.activePage}  
                      totalItemsCount={this.props.employeeCount}
                      onChange={this.handlePageChange.bind(this)}>
                    </Pagination>
                </div>
            </div>
            {/*Pagination gird end*/} 

            
             {/*Creation of table with header start from here,
             it will contain the table header which have add-new button and the body of table*/}
            <div id="tableViewContainer">            
                <div id="tHead" className="col-md-12">{/*Table's header starts from here*/}
                    <div className="col-md-1">
                        <OverlayTrigger trigger={['hover']} placement="right" overlay={popoverHoverFocusAdd}>
                            <button id='addButton' onClick={()=>{this.setState({isUpdate:false});this.setState({showModal:true})}}>
                              <center>
                                <span className="glyphicon glyphicon-plus">
                                </span>
                              </center>
                            </button>
                        </OverlayTrigger>
                    </div>
                    <div className="col-md-1">Emp Id</div>
                    <div className="col-md-3">Name</div>
                    <div className="col-md-3">Address</div>     
                    <div className="col-md-3">Company</div>
                    <div className="col-md-1">Delete</div>
                </div>  {/*Table's header ends here*/}
                 <div>  {/*Table's body starts*/}
                      {info}    {/*Array of records created by map functiont to display rows to table*/}
                 </div>  {/*Table's body end*/}
                  
              </div>      {/*Creation of table ends here*/} 
            </div> //OuterMOst <div> end 
        ); // return() end
    } // rendre() end
} // class ShowInfo end


function mapDispatchToProps(dispatch){ //map data 
    return{
        getEmployeeData:bindActionCreators(getEmployee, dispatch),
        addNewRecord:bindActionCreators(addNewEmployeeRecord, dispatch),
        updateRecord:bindActionCreators(updateEmployeeRecord,dispatch),
        deleteEmployeeData:bindActionCreators( deleteEmployee,dispatch),
        getCompanyData:bindActionCreators(getCompany, dispatch),
        totalEmployee:bindActionCreators(countEmployee,dispatch),
    };
}


function mapStateToProps(state){ //provide data form application state to compnent.
    return{
        employees:state.employees,
        company:state.companies,
        employeeCount:state.countEmployee
    }    
}

export default connect (mapStateToProps,mapDispatchToProps)(ShowInfo);