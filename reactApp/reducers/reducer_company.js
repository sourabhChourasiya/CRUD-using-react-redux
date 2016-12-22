//import {GET_EMPLOYEE} from '../actions/index';
import _ from 'lodash';
import axios from 'axios';
export const COMPANY_URL='http://localhost:3333/company';
export default function(state = [], action){

     switch(action.type){
         case 'GET_COMPANY':       
               if(!_.isEmpty(action)){
                   return action.payload.data;
                }
                
//          case 'DELETE_EMPLOYEE':     
//          console.log("In reducer_employee, DELETE_EMPLOYEE ");
//          const request=axios.get(EMPLOYEE_URL).then(function(response) {
//          console.log("response.data ",response.data);
//          return request.data;
//         // console.log("response.status ",response.status);
//         // console.log("response.statusText ",response.statusText);
//         // console.log("response.headers",response.headers);
//         // console.log("response.config",response.config);
//   });
//             //    console.log("action.message ",action);
//             //    console.log("request ",request.data);
//               // return action.payload.data;
 
                
     default: 
         return state;
}
}   
    
    
