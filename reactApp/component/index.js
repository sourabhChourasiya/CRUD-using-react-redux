// Index component is the main component, execcution of the page is done from here
// This component contains a Header component and a Body Component in it.
import React from 'react';
import ReactDom from 'react-dom';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import { Modal, Button,Popover,OverlayTrigger } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import RootReducer from '../reducers/index';
import ReduxPromise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

export default class App extends React.Component{
     
 render(){

      return(
        <Provider store={createStoreWithMiddleware(RootReducer)}>
          <div>
            <Header id='header'/>
            <Body id='body' />
            <Footer id='footer' />
          </div> 
       </Provider>        
      );           
  }            
}

ReactDom.render(<App />, document.getElementById('container'));