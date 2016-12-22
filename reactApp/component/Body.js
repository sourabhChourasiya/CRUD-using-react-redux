//this is the body component which which contain an another component named ShowInfo

import React from 'react';
//import ShowInfo from './ShowInfo';
import ShowInfo from '../containers/ShowInfo';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import ReduxPromise from 'redux-promise';

//const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

export default class Body extends React.Component{
         render(){
            return(

                <div id='body' >
                      <ShowInfo  />        
                </div>

              );    
        }    
}