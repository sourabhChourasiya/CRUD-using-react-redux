import _ from 'lodash';
import axios from 'axios';
export const EMPLOYEE_URL='http://localhost:3333/employee';

export default function(state=[], action){
     switch(action.type){
        
         case 'COUNT_EMPLOYEE':
               if(!_.isEmpty(action)){
                return action.payload.data.length;
                }
                
          default:
            return state; 
    }
}