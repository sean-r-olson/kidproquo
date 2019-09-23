import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkServerIdentity } from 'tls';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class NewUserForm extends Component {

    componentDidMount(){
       
    }

    state = {
        first_name1: '',
        last_name1: '', 
        first_name2: '',
        last_name2: '',
        street_address: '',
        city: '',
        state: '', 
        zip_code: '',
        email: '', 
        phone_number: '', 
        family_passcode: '',
        user_id: '', 
    };

    // checkId = () => {
    //     if(this.props.state.user.id > 0) {
    //         this.setState({
    //             user_id: this.props.state.user.id
    //         })
    //     }
    // }

    registerFamily = (event) => {
        // this.checkId();
    event.preventDefault();
    let newObjectToSend = {
        first_name1: this.state.first_name1,
        last_name1: this.state.last_name1,
        first_name2: this.state.first_name2,
        last_name2: this.state.last_name2,
        street_address: this.state.street_address,
        city: this.state.city,
        state: this.state.state,
        zip_code: this.state.zip_code,
        email: this.state.email,
        phone_number: this.state.phone_number,
        family_passcode: this.state.family_passcode,
        user_id: this.props.state.user.id
    }
    if (this.state.first_name1 && this.state.last_name1 && this.state.street_address && this.state.city
        && this.state.state && this.state.zip_code && this.state.email && this.state.phone_number) {
        this.props.dispatch({type: 'ADD_NEW_FAMILY', payload: newObjectToSend});
        this.props.history.push('/');
    } else {
        this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
    } // end registerFamily

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
        [propertyName]: event.target.value,
        });
    }

    render() {
        console.log(this.state);
        console.log(this.props.state.user);
        return (
        <div>
            {this.props.errors.registrationMessage && (
            <h2 className="alert" role="alert">
                {this.props.errors.registrationMessage}
            </h2>
            )}
             <form onSubmit={this.registerFamily}>
             <h1>Register Form</h1>
            <div>
            <input
              type="text"
              name="first_name1"
              placeholder="Parent #1: First Name (Required)"
              value={this.state.first_name1}
              onChange={this.handleInputChangeFor('first_name1')}
              />
              </div>
              <div>
            <input
              type="text"
              name="last_name1"
              placeholder="Parent #1: Last Name (Required)"
              value={this.state.last_name1}
              onChange={this.handleInputChangeFor('last_name1')}
              />
              </div>
              <div>
            <input
              type="text"
              name="first_name2"
              placeholder="Parent #2: First Name"
              value={this.state.first_name2}
              onChange={this.handleInputChangeFor('first_name2')}
              />
              </div>
              <div>
            <input
              type="text"
              name="last_name2"
              placeholder="Parent #2: Last Name"
              value={this.state.last_name2}
              onChange={this.handleInputChangeFor('last_name2')}
              />
              </div>
              <div>
            <input
              type="text"
              name="street_address"
              placeholder="Street Address (Required)"
              value={this.state.street_address}
              onChange={this.handleInputChangeFor('street_address')}
              />
              </div>
              <div>
            <input
              type="text"
              name="city"
              placeholder="City (Required)"
              value={this.state.city}
              onChange={this.handleInputChangeFor('city')}
              />
              </div>
              <div>
            <input
              type="text"
              name="state"
              placeholder="State (Required)"
              value={this.state.state}
              onChange={this.handleInputChangeFor('state')}
              />
              </div> 
              <div>
            <input
              type="text"
              name="zip_code"
              placeholder="Zip Code (Required)"
              value={this.state.zip_code}
              onChange={this.handleInputChangeFor('zip_code')}
              />
              </div>

            <div>
            <input
              type="text"
              name="email"
              placeholder="Email (Required)"
              value={this.state.email}
              onChange={this.handleInputChangeFor('email')}
              />
              </div>
              <div>
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number(Required)"
              value={this.state.phone_number}
              onChange={this.handleInputChangeFor('phone_number')}
              />
              </div>
              <div>
            <input
              type="text"
              name="family_passcode"
              placeholder="Pass Code"
              value={this.state.family_passcode}
              onChange={this.handleInputChangeFor('family_passcode')}
              />
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>    
          <center>
          <Link to="/login"
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
          </Link>
        </center>
              </form>
        </div>
        )
    }
};

const mapStateToProps = state => ({
    errors: state.errors,
    state
  });
  
export default connect(mapStateToProps)(NewUserForm);