//This is the header component

import React from 'react';
export default class Header extends React.Component {
  render() {
    return (
      <div>
        <div id='header'>
          <h1 id="h1">Employee Information <span id="message"></span> </h1>
        </div>
      </div>
    );
  }
}
