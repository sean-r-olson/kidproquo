import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

// Importing Components
import AboutPage from '../AboutPage/AboutPage';
import CalendarView from '../CalendarView/CalendarView';
import EditMyProfilePage from '../EditMyProfilePage/EditMyProfilePage';
import FamilyProfilePage from '../FamilyProfilePage/FamilyProfilePage';
import GroupView from '../GroupView/GroupView';
import KidPage from '../KidPage/KidPage';
import MyProfilePage from '../MyProfilePage/MyProfilePage';
import NewUserForm from '../NewUserForm/NewUserForm';
import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';
import GroupFamPage from '../GroupFamPage/GroupFamPage';

import './App.css';


class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });

  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
    
          
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
         
            <Route 
              exact path="/login"
              component={LoginPage}
            />
            <Route 
              exact path="/register"
              component={RegisterPage}
            />
            <Route
              exact
              path="/new-user-form"
              component={NewUserForm}
            />
            
            <ProtectedRoute
              exact
              path="/"
              component={MyProfilePage}
            />

            <ProtectedRoute
              exact
              path="/calendar"
              component={CalendarView}
            />

            <ProtectedRoute
              exact
              path="/family-profile"
              component={FamilyProfilePage}
            />
            <ProtectedRoute 
              exact
              path="/view/:id" 
              component={GroupFamPage} />

            <ProtectedRoute
              exact
              path="/edit-my-profile"
              component={EditMyProfilePage}
            />

            <ProtectedRoute
              exact
              path="/group-view"
              component={GroupView}
            />

            <ProtectedRoute
              exact
              path="/kid-page"
              component={KidPage}
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default connect()(App);
