import React, { Component } from 'react';
import {Link} from "react-router";

const Nav = () => (
  <div>
      Navbar

  </div>
)
//<Link to='/page1'>Page1</Link>
class Layout extends Component {
  render(){
    console.log(this.props);
    return(
      <div>
        <div>
          <h1>Header</h1>
        </div>
        <div>
          <Nav />
        </div>
        <div>
          <h1>Body</h1>
        </div>
        <div>
          {this.props.children}
        </div>
        <div>
          <h1>Footer</h1>
        </div>
      </div>
    );
  }
}

export default Layout;
