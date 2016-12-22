import {combineReducers,createStore} from 'redux';
import EmployeeReducer from './reducer_employees';
import CompanyReducer from './reducer_company';
import Count from './reducer_count';
const rootReducer = combineReducers({
    
    employees:EmployeeReducer,
    companies:CompanyReducer,
    countEmployee:Count
    
    
});

export default rootReducer;