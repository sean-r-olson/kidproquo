import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.css';
import HamNav from './HamNav';

const Nav = (props) => (

  <div className="nav">
    
    {props.user.id ? <HamNav /> : ''}
  
    <Link to="/">
      <h2 className={props.user.id ? "nav-title" : "nav-title-two"} style={{display: 'inline-flex'}}>KidProQuo</h2>
    </Link>
    {/* <div className="nav-right">
      <Link className="nav-link" to="/my-profile-page"> */}
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {/* {props.user.id ? 'Home' : 'Login / Register'}
      </Link> */}
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {/* {props.user.id && (
        <>
          <Link className="nav-link" to="/calendar">Calendar</Link>
          <Link className="nav-link" to="/create-request">Request</Link>
          <Link className="nav-link" to="/edit-my-profile">Edit Profile</Link>
          <Link className="nav-link" to="/family-profile">Family Profile</Link>
          <Link className="nav-link" to="/group-view">Group View</Link>
          <Link className="nav-link" to="/kid-page">Kid Page</Link>
          <Link className="nav-link" to="/about">About</Link>
          <LogOutButton className="nav-link"/>
        </> */}
      {/* )} */}
      {/* Always show this link since the about page is not protected */}
    
    {/* </div> */}
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
