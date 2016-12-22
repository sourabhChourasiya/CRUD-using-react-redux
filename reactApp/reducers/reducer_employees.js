import _ from 'lodash';
import axios from 'axios';
export const EMPLOYEE_URL='http://localhost:3333/employee';
// const STATE={
//   data:[],
//   message:''
// };

export default function(state = [], action){
     switch(action.type){
        
         case 'GET_EMPLOYEE':
               if(!_.isEmpty(action)){
                return action.payload.data;
                }        
         
         case 'DELETE_EMPLOYEE':     
          axios.delete(EMPLOYEE_URL+'?employeeId='+action.payload.employeeId)
          .then(function(response){
              document.getElementById("message").innerHTML=response.data;  
              $("#message").css({'visibility':'visible',"color" : "white"});           
              setTimeout(function() {
                $("#message").css('visibility','hidden');;
              }, 3000);
              })
          return state;
          
          
        case 'ADD_NEW_EMPLOYEE_RECORD':       
                axios.post(EMPLOYEE_URL,action.payload)
                .then(function(response){
                        state.push(action.payload);
                        document.getElementById("message").innerHTML=response.data;
                        if(response.data==action.payload.employeeId+ " Already Exist"){
                            $("#message").css({'visibility':'visible',"color" : "red"});
                            setTimeout(function() {
                                $("#message").css('visibility','hidden');;
                            }, 6000);
                        }else{
                            $("#message").css({'visibility':'visible',"color" : "white"});
                            setTimeout(function() {
                                $("#message").css('visibility','hidden');;
                            }, 3000);
                        }                   
                });
                return state;
                
                
         case 'UPDATE_EMPLOYEE_RECORD':       
                axios.put(EMPLOYEE_URL+'?employeeId='+action.payload.employeeId,action.payload)
                .then(function(response){
                    document.getElementById("message").innerHTML=response.data;  
                        $("#message").css('visibility','visible');           
                        setTimeout(function() {
                            $("#message").css({'visibility':'visible',"color" : "white"});;
                        }, 3000);
                });
                return state; 
                
     default: 
        return state;
}
}