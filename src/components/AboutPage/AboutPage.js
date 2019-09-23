import React, { Component } from 'react';
import './AboutPage.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class AboutPage extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>About KidProQuo</h2>
         <ul>
            <li>KidProQuo taps into your most trusted but underutilized resource: Your friends who also have children.</li>  <br></br>
            <li>Building off of the time tested concept of the babysitting co-op, KidProQuo provides a platform that allows for parents 
            in closed, private networks to equitably swap time and kid-watching duties with one another to allow parents the much needed
            time to go out and see that concert or movie they've been postponing.</li>
          </ul>
        </div>
        <div>
         
        
          <h2>Why?</h2>
          <ul>
            <li>Having a night out can get expensive when the cost of a babysitter is included, so parents tend to postpone going out to save money.</li>
            <br></br>
            <li>During our market research, most parents said that when asked by a friend to watch their children, the answer was typically "Yes". 
              But when asked if they would ask a friend to watch their child, the answer was frequently "No" with the reason being that they "didn't want to 
              inconvenience a friend".
            </li>
          </ul>
         
        </div>
      </div>
    )
  }
}

export default AboutPage;
