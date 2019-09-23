import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './HamNav.css';
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';



class HamNav extends Component {

// Set the width of the side navigation to 250px and the left margin of the page content to 250px
openNav = () => {
    document.getElementById("sidenav").style.width = "150px";
    //document.getElementById("main").style.marginLeft = "250px";
}

// Set the width of the side navigation to 0 and the left margin of the page conent to 0
closeNav = () => {
    document.getElementById("sidenav").style.width = "0";
    //document.getElementById("main").style.marginLeft = "0";
}


  render() {
    return (
      <>
        <Icon name='bars' 
        style={{paddingTop: '15px', paddingLeft: '17px'}}
        className='bars icon' size='huge' onClick={(event) => this.openNav(event)} />
      
      <div id="sidenav" className="sidenav">
          <Icon name='x' className='x icon' size='large' onClick={(event) => this.closeNav(event)} />
      <div id="sidenav" className="sidenav closebtn"></div>
      
        <div>
         
        
         
                <ul>
                  <li><Link className="sidenav-a" to="/" onClick={this.closeNav}>Profile</Link></li>
              <li><Link className="sidenav-a" to="/group-view" onClick={this.closeNav}>Groups</Link></li>
              <li><Link className="sidenav-a" to="/family-profile" onClick={this.closeNav}>Family</Link></li>
              <li><Link className="sidenav-a" to="/about" onClick={this.closeNav}>About</Link></li> 
              <li><LogOutButton className="sidenav-a" onClick={this.closeNav}/></li>
                </ul>
                  
            
            

         
        </div>
      </div>
      </>
    )
  }
}

export default HamNav;