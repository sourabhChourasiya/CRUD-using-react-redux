//This is the ShowInfo component, all the operations to add, update, delete , display is define in thus component.

import React from 'react';
import { Modal, Button,Popover,OverlayTrigger,NavDropdown,MenuItem,Dropdown } from 'react-bootstrap';
import Pagination from "react-js-pagination";
import _ from "lodash";
import $ from 'jquery';

var employeeURL='http://localhost:3333/employee';  //This is the employeeURL to access the node services like GET,POST,PUT,DELETE.
var companyURL='http://localhost:3333/company';    //This is the companyURL to access the node services like GET,POST,PUT,DELETE.

var employeeDataToDelete = null;      // This variable will hold a single record which is to be Delete.
var employeeDataToUpdate = null;      // This variable will hold a single record which is to be update.
var dataToDisplay=[];                 // This variable holds array of object which is to be display on the screen.
var pageSize=10;                      // This is number of records on per page.

export default class ShowInfo extends React.Component{

    constructor(props)   //constructor to set state.
    {
        super(props);
        this.state={
            companyInfo:[],         // state which have all records of company collection.
            employeeInfo:[],        // state which have all records of employee collection.
            showModal:false,        // state to show modal window for update and add record.
            isUpdate:false,         // state to identify that update mode is open or not.
            deleteModal:false,      // state to open model window for delete confirmation.
            activePage: 1,          // state which show avtive page number on pagination grid.ByDefault it is on page 1.
           },   
         this.getEmployee();        //calling getEmployee() method to get all the documents from the employee collection.
         this.getCompany();         //calling getCompany() method to get all the documents from the company collection.        
    };
       
       
   display(recordToDisplay){         // Method to display 10 record per page.
     dataToDisplay=[];
     var fromRecordNumber=(recordToDisplay-pageSize+1);
     var uptoRecordNumber=recordToDisplay;
     if(this.state.employeeInfo.length<uptoRecordNumber){
       uptoRecordNumber=this.state.employeeInfo.length;
      }
          var index=0;
          for(var i=fromRecordNumber-1;i<uptoRecordNumber;i++)
          {
            dataToDisplay[index]=this.state.employeeInfo[i];
            index++;
          }           
     }//method display() end
   
   
  handlePageChange(pageNumber){               //method to change page form pagination tag.
        this.setState({activePage: pageNumber});                                    
        this.display((pageNumber*10));
      }
   
  openModalWithUpdate(recordToUpdate){         //method to open modal window to update record.
        employeeDataToUpdate = recordToUpdate;
        this.setState({ isUpdate: true}); 
        this.open();
      }
  
  open(){                                      //method to set showModal as true which allow to open modal window.
        this.setState({ showModal: true });
      }
  
 close(){                                      //method to set showModal as false which disable the modal window.
      this.setState({ showModal: false});
      }
      
      
 getEmployee(){ 
       var self=this;                          // method to fetch data form employee collection from mongoDB database.       
    	 $.get(employeeURL,function(jsonObject){
       var data=jsonObject;
       this.setState({
       employeeInfo:data
       },function(){
            if(this.state.employeeInfo.length>0){
                 this.handlePageChange(1);
            }
          });
       }.bind(this));
   } //getEmployee() end
   
   
   getCompany(){ 
       var self=this;                          // method to fetch data form company collection from mongoDB database.       
    	 $.get(companyURL,function(jsonObject){
       var data=jsonObject;
       this.setState({
       companyInfo:data
       },function(){
            if(this.state.companyInfo.length>0){
                  //console.log(this.state.companyInfo);
            }
          });
       }.bind(this));
   } //getCompany() end
   
   
    //function for validate data for add and update
   validation(){                             
     if(this.state.isUpdate==false && document.getElementById('employeeId').value=="")
      {   
        document.getElementById('employeeId').focus();       
        $("#showEmployeeIdError").css('visibility', 'visible');
        return false;
      }else if(this.state.isUpdate==false && document.getElementById('employeeId').value<1)
      {   
        document.getElementById('employeeId').focus();       
        document.getElementById('showEmployeeIdError').innerHTML="Enter Positive Value";
        $("#showEmployeeIdError").css('visibility', 'visible');
        return false;
      }else if(this.state.isUpdate==false && isNaN(document.getElementById('employeeId').value))
      {
        document.getElementById('employeeId').focus();
        document.getElementById('showEmployeeIdError').innerHTML="Only Numbers Allow";
        $("#showEmployeeIdError").css('visibility', 'visible');
        return false;
      }else if(document.getElementById('name').value=="")
      {
        document.getElementById('name').focus();
        document.getElementById('showNameError').innerHTML="Name Require";
        $("#showNameError").css('visibility', 'visible');
        return false;
      }else if(document.getElementById('address').value=="")
      {
        document.getElementById('address').focus();
        document.getElementById('showAddressError').innerHTML="Address Require";
        $("#showAddressError").css('visibility', 'visible');
      
        return false;
      }else if(document.getElementById('company').value=="-1")
      {
        document.getElementById('company').focus();
        document.getElementById('showCompanyNameError').innerHTML="Please Select Company";
        $("#showCompanyNameError").css('visibility', 'visible');
        return false;
      }
     return true;
   }  // validation() end  
   
               
  // method to add new employee record
  addNew(info)
  {
    var self=this;
    
/*  info.map(function(info){
    if(info.employeeId==document.getElementById("employeeId").value){
      document.getElementById("existanceMessage").innerHTML= info.employeeId+ " Already Exists.";
      return;    
    }
  });
*/    
   
  for(var i=0;i<info.length;i++){           //loop to check existance of employeeId.
      if(document.getElementById('employeeId').value == info[i].employeeId)
        {
          document.getElementById("existanceMessage").innerHTML= info[i].employeeId+ " Already Exists.";
          return;
        }
      }
    
    if(!this.validation())
    {
      return false;
    }
    else{  
    var employeeData={
      "employeeId":document.getElementById('employeeId').value,
      "name":document.getElementById('name').value,
      "address":document.getElementById('address').value,
      "companyId":document.getElementById('company').value
      };
    var self = this;
    fetch(employeeURL, {                                //calling Post service by using react's fetch library
      method: 'post',  
      headers: {  
        "Content-type": "application/JSON"  
        },  
      body: JSON.stringify(employeeData)  
      })
      .then(JSON)  
      .then(function (data) {
          self.setState({ showModal: false });
          self.state.employeeInfo.push(employeeData);   // addnig new record to this.state.employeeInfo[] array.
          dataToDisplay.push(employeeData);             // adding new record to dataToDisplay[] array.
          dataToDisplay.sort(function(a,b){             // sorting record of dataToDisplay[] array after adding new record to it.
            return (a.employeeId-b.employeeId);
          });
          self.handlePageChange(self.state.activePage); // calling method handlePageChange() with the current activePage to maintain user to be at the same page.
          document.getElementById("message").innerHTML=employeeData.employeeId +" Added Successfully";  
           $("#message").css('visibility','visible');           
          setTimeout(function() {
             $("#message").css('visibility','hidden');;
          }, 3000);
          //console.log('Request succeeded with JSON response', data);
          })  
          .catch(function (error) {  
          alert("Failed to Add,Please try again.");
          console.log('Request failed', error);  
          });
    }//else end
}// addNew() end

// method to update record
  update(){
    if(!this.validation())
    {
      return false;
    }//if end
    else{
    var recordToUpdate={
        "employeeId":employeeDataToUpdate.employeeId,
        "name":document.getElementById('name').value,
        "address":document.getElementById('address').value,
        "companyId":document.getElementById('company').value
      };
      var self=this;
      fetch(employeeURL+'?employeeId='+employeeDataToUpdate.employeeId, {  
            method: 'put',                              //calling PUT service by using react's fetch library
            headers: {  
              "Content-type": "application/JSON"  
              },  
            body: JSON.stringify(recordToUpdate)
      })
      .then(JSON)  
      .then(function (data) {
              self.setState({ showModal: false });
                  //code to delete.
                  dataToDisplay.map(function(dataToDisplay){
                    if(dataToDisplay.employeeId==recordToUpdate.employeeId){
                        dataToDisplay.name=recordToUpdate.name;
                        dataToDisplay.address=recordToUpdate.address;
                        dataToDisplay.companyId=recordToUpdate.companyId;                        
                        return;
                        }
                     });
                 self.handlePageChange(self.state.activePage);
             // self.getEmployee();
              document.getElementById("message").innerHTML= recordToUpdate.employeeId+ " Updated Successfully";   
              $("#message").css('visibility','visible');           
              setTimeout(function() {
                  $("#message").css('visibility','hidden');;
                  }, 3000);
              //console.log('Request succeeded with JSON response', data);
           })  
          .catch(function (error) {  
              alert("Failed to update,Please try again."); 
              console.log('Request failed', error);  
          });
    }//else end
}//update() end
       
    //deleteRecord() start
     deleteRecord(employeeId){        
          var self = this;
          fetch(employeeURL+'?employeeId='+employeeId, {   //calling Delete service by using react's fetch library
              method: 'delete',        
          })
          .then(JSON)  
          .then(function (data) {
                 _.remove(dataToDisplay, function(dataToRemove) { // using lodash remove to remove record from dataToDisplay[] array.
                      return dataToRemove.employeeId==employeeId;
                    });
                     _.remove(self.state.employeeInfo, function(dataToRemove) { // using lodash remove to remove record from this.state.employeeInfo[] array.
                      return dataToRemove.employeeId==employeeId;
                    });
                 self.handlePageChange(self.state.activePage); // calling method handlePageChange() with the current activePage to maintain user to be at the same page.
                //self.getEmployee();
                document.getElementById("message").innerHTML= employeeId+ " Deleted Successfully";   
                $("#message").css('visibility','visible');           
                setTimeout(function() {
                      $("#message").css('visibility','hidden');;
                }, 3000);
                //console.log('Request succeeded with JSON response', data);  
            })  
            .catch(function (error) {  
                console.log('Request failed', error);  
            });
      }//deleteRecord() end
      
     
     render(){      //this is the render() method of ShowInfo Component,what ever this method will return will go to its parant compponent and displayed on the HTML.
      
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
      

          //map() method to generate array of rows.
         if(dataToDisplay.length>0)     // when this "if" condition will become true, it will generate an array (named "info") of rows to display record.
            {                           // each row contains update and delete button.
                var info = dataToDisplay.map(function(employeeInfo){ //map() method starts form here.
                var self= this;                
                return (<div id="row" className="col-md-12" key={employeeInfo.employeeId}>
                          <div className="col-md-1">
                              <OverlayTrigger trigger={['hover']} placement="right" overlay={popoverHoverFocusEdit}>
                                  <button id="button" className="button" onClick={()=>{this.openModalWithUpdate(employeeInfo)}}>
                                      <span className="glyphicon glyphicon-edit">
                                      </span>
                                   </button>
                              </OverlayTrigger>
                          </div>
                          <div className="col-md-1">{employeeInfo.employeeId}</div>
                          <div className="col-md-3">{employeeInfo.name}</div>
                          <div className="col-md-3">{employeeInfo.address}</div>
                          <div className="col-md-3">{employeeInfo.companyId.companyName==null
                            ?
                            name=self.state.companyInfo.map(function(data){
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
                                 <button onClick={()=>{this.setState({deleteModal:true}); employeeDataToDelete=employeeInfo}}>
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
          if(this.state.companyInfo.length>0)
            {            
                var dropDownList = this.state.companyInfo.map(function(list){ 
                var self= this;                
                return (
                    <option key={list._id} value={list._id}>{list.companyName}</option>                  
                );
                },this);
            }
            else{
                console.log("Loading...");
            }
                  
        // This if return of render method, all the content will be returned to Body component.
        // It will only return a single HTML component, that component can further have multiple component.
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
               {"Delete record of Emp Id "+ employeeDataToDelete.employeeId+" ?"}
            </Modal.Body>
            <Modal.Footer id="deleteModalFooter">
               <Button 
                 onClick={()=>{this.deleteRecord(employeeDataToDelete.employeeId);
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
                                  <div>{employeeDataToUpdate.employeeId}</div>
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
                                defaultValue={this.state.isUpdate ? employeeDataToUpdate.name : null} 
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
                                <input maxLength="100" 
                                  defaultValue={this.state.isUpdate ? employeeDataToUpdate.address : null} 
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
                                  <select id="company"  defaultValue={this.state.isUpdate ? typeof(employeeDataToUpdate.companyId)=="string"?this.state.companyInfo.map(function(data){
                                                                                                  if(data._id==employeeDataToUpdate.companyId)
                                                                                                      {
                                                                                                        return data._id;
                                                                                                      }
                                                                                                      }) :employeeDataToUpdate.companyId._id :null}
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
                                            onClick={()=>{this.state.isUpdate ? this.update() : this.addNew(this.state.employeeInfo)}} >
                                            {this.state.isUpdate ? "Update" : "Add"}
                                        </button>
                                    </div>
                                    
                                    <div  className="col-sm-6">
                                        <Button id="modalCancelButton" onClick={()=>this.close()}>
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
                    <Pagination
                      activePage={this.state.activePage}  
                      totalItemsCount={this.state.employeeInfo.length} 
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
                            <button id='addButton' onClick={()=>{this.setState({isUpdate:false});this.open()}}>
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
      </div>              // <div> component to return ends here.
    );                    // return end here.
  }                       // render() method ends here.
}                         // class ShowInfo ends here.