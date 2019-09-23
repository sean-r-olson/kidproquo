import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import './RegisterPage.css';


class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
      this.props.history.push('/new-user-form');
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div className="loginFormBackground">
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form className="registerForm" onSubmit={this.registerUser}>
          <h3 className="directions">Choose a Username and Password</h3>
          <div className="registerPageInputs">
              <input
                type="text"
                name="username"
                placeholder="Username (Required)"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
          </div>
          <div className="registerPageInputs">
              <input
                type="password"
                name="password"
                placeholder="Password (Required)"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
          </div>
            <button
              className="register"
              type="submit"
              name="submit">
                Next
            </button>    
        </form>
        <center>
          <Link to="/login"
            type="button"
            className="registerLink-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
          </Link>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

