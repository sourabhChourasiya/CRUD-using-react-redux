import React from 'react';
import axios from 'axios';
export const EMPLOYEE_URL='http://localhost:3333/employee';
export const COMPANY_URL='http://localhost:3333/company';



export function countEmployee(){
    const request=axios.get(EMPLOYEE_URL); 
  return{
      type:'COUNT_EMPLOYEE',
      payload:request
    }
    
}

export function getEmployee(record,skip) {
    const request=axios.get(EMPLOYEE_URL+"?records="+record+"&skip="+skip);
  return{
      type:'GET_EMPLOYEE',
      payload:request
    }
}


export function deleteEmployee (employee) {
   return {
             type:'DELETE_EMPLOYEE',
             payload:employee
         }
  }
  

export function getCompany()
{
   const request=axios.get(COMPANY_URL); 
  return{
      type:'GET_COMPANY',
      payload:request
    }
}

export function addNewEmployeeRecord(employeeDataToAdd)
{
    return{
        type:'ADD_NEW_EMPLOYEE_RECORD',
        payload:employeeDataToAdd
    }
    
}


export function updateEmployeeRecord(employeeDataToUpdate){
    return{
      type:'UPDATE_EMPLOYEE_RECORD',
      payload:employeeDataToUpdate  
    };
}