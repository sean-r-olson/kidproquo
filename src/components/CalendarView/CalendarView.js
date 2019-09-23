import React, { Component } from 'react';
import Calendar from 'react-calendar'
import 'semantic-ui-css/semantic.min.css'
import {connect} from 'react-redux';
import EventView from '../EventView/EventView';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Day } from 'material-ui-pickers';
import { withStyles } from '@material-ui/core/styles';
import './CalendarView.css';


const styles = theme => ({
  grid: {
    width: '60%',
  },
  calendar: {
    width: '375px',
    border: 'solid black 2px'
  },
});

class CalendarView extends Component {

    state = {
        date: new Date(),
        event_date:{event_date: new Date().getFullYear() + "-" +  0+Number(new Date().getMonth()+1) + "-" + new Date().getDate()},
        dateToSend: '',
        dateToDisplay: '',
      }

      // when page loads: 
      // declare day variable as current date 
      // declare day to display on DOM to be reformatted date 
      // set date to display in state 
      // declare formatted date object to send in dispatch 
      componentDidMount() {
        let day = new Date();
        let newDayToDisplay = ( day.getFullYear() + "-" +  0+Number(day.getMonth()+1) + "-" + day.getDate())
        this.setState({
          dateToDisplay: newDayToDisplay
        })
        let newObjectToSend = {event_date: newDayToDisplay}
        console.log('IN HANDLE CHANGE WITH NEW DATE:', newObjectToSend);
        this.setState({
          dateToSend: newObjectToSend
        })
        this.props.dispatch({type: 'FETCH_EVENTS', payload: this.state.event_date})
      }

      // on click of of a day in the calendar: 
      // capture values of clicked day 
      // reformat clicked date
      // set state to reformatted date 
      handleChange = (value) => {
        this.setState({
          event: !this.state.event
        })
        let newDate = ( value.getFullYear() + "-" +  0+Number(value.getMonth()+1) + "-" + value.getDate())
        let newObjectToSend = {event_date: newDate}
        console.log('IN HANDLE CHANGE WITH NEW DATE:', newObjectToSend);
        this.setState({
          dateToSend: newObjectToSend
        })
      }

      // Format value which is date to read as YY-MM-DD
      // Set value to a variable and run a dispatch to fetch
      // that value from the DB.
      formatDate =(value)=>{
        console.log('in format date', value)
        let newDate = ( value.getFullYear() + "-" +  0+Number(value.getMonth()+1) + "-" + value.getDate())
  
        let newObjectToSend = {event_date: newDate}
        this.props.dispatch({type: 'FETCH_EVENTS', payload: newObjectToSend})
      }
     
      render() {
        const { classes } = this.props;
        if (this.state.dateToDisplay === this.state.dateToSend) {
        return (
          <>
          <div className='calendarView'>
        
            <Calendar 
              className="calendar"
              onChange={(event) => this.formatDate(event)}
              value={this.state.date}
              onClickDay={this.handleChange}
            />
          </div>
          <div>
            <EventView date={this.state.dateToSend.event_date}
            />
          </div>
          </>
        )} else {
          return (
          <>
          <div className='calendarView'>
            <Calendar
              className='calendar'
              onChange={(event) => this.formatDate(event)}
              value={this.state.date}
              onClickDay={this.handleChange}
            />
            </div>
            <div>
            <EventView date={this.state.dateToSend.event_date} history={this.props.history}/>
          </div>
          </>
          )}
      }
}

export default withStyles(styles)(connect()(CalendarView));