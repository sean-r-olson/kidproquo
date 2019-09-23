import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import 'date-fns';

// Date/Time Picker Imports
import DateFnsUtils from '@date-io/date-fns';

// Stylesheets
import '../App/App.css';
import './EventView.css'

// Material UI Imports
import { withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';

// Semantic UI Imports
import 'semantic-ui-css/semantic.min.css'
import { Icon, Button, Card } from 'semantic-ui-react';

// Sweetalert Imports
import Swal from 'sweetalert2';

// Styles for component
const styles = theme => ({
  grid: {
    width: '60%',
  },
  paper: {
    position: 'absolute',
    width: theme.spacing * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    paddingLeft: '90px',
    outline: 'none',
    margin: '140px 14px',

  },
  textField: {
    margin: '0px 0px 10px 0px',
    maxWidth: '400px'
  },
  radio: {
    color: '#033076',
    fontWeight: '900',
    display: 'inline-block',
    padding: '0px',
    width: '250px',
    height: '50px',
    backgroundColor: 'white'
  },
  date: {
    marginLeft: '14.5vh',
    paddingBottom: '2vh'
  },
  openRequests: {
    textAlign: 'center'
  },
  button: {
    textAlign: 'center',
    margin: '20px 113px 0px 113px'
  },
  eventsRows: {
    maxWidth: '186px',
  },
  eventsBody: {
    maxWidth: '186px',
    display: 'inline-block'
  },
  card: {
    color: 'blue'
  },
  hr: {
    backgroundColor: '#8298ca',
    borderRadius: '5px',
    height: '5px',
    border: 'none',
  },
  claimButton: {
    borderRadius: '3px',
    width: '10px'
  },
  fab: {
    borderRadius: '5px'
  },
  add: {
    backgroundColor: '#89E894',
    borderRadius: '3px',
    paddingTop: '-30px'
  },
  addButton: {
    fontWeight: 'bold'
  },
  offering_needed: {
    textAlign: 'center',
    marginLeft: '20px'
  },
  cards: {
    width: '375px'
  }
});

class EventView extends Component {

  state = {
    event_date: new Date(),
    event_time_start: new Date(),
    event_time_end: new Date(),
    open: false,
    request_id: '',
    notes: '',
    offer_needed: true,
    claimer_notes: '',
    claimer_id: '',
  };

  // on page load: 
  // fetch family using user id 
  // fetch group information (events) with user's group id
  // set event date in state to new Date
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_FAMILY', payload: this.props.reduxStore.user.id })
    this.props.dispatch({ type: 'FETCH_GROUP', payload: this.props.reduxStore.userGroups[0] });
    this.setState({
      event_date: new Date()
    })
  }

  // upon changing date in date picker: 
  // set date to new day
  handleDateChange = (event, propsName) => {
    console.log('this is event', event)
    this.setState({
      [propsName]: event
    });
  };

  // upon editing notes: 
  // set notes in state to new typed notes
  handleChange = (event, propertyToChange) => {
    this.setState({
      ...this.state,
      [propertyToChange]: event.target.value
    })
  }

  // upon choosing offer/need radio buttons: 
  // set offer/needed in state to designated value
  handleRequestStatus = (event) => {
    this.setState({
      offer_needed: event.target.value
    })
  }

  // upon hitting claim button: 
  // send sweet alert (are you sure?)
  // send all claimer/event info to saga
  handleClaim = (event, item) => {
    Swal.fire({
      title: 'Are you sure you want to claim this request?',
      type: 'question',
      html:
        '<input style="width: 300px; outline: none; border: solid #c9dae1 2px; border-radius: 3px; padding: 5px;" placeholder="Add Notes (optional)" id="swal-input1">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, claim it!'
    }).then((response) => {
      if (response.value) {
        this.setState({
          claimer_notes: document.getElementById('swal-input1').value
        })
        let newObject = {
          id: item.id,
          claimer_id: this.props.reduxStore.family.id,
          event_claimed: true,
          event_date: item.event_date,
          event_time_start: item.event_time_start,
          event_time_end: item.event_time_end,
          last_name1: item.last_name1,
          claimer_notes: this.state.claimer_notes,
        }
        this.props.dispatch({ type: 'CLAIM_EVENT', payload: newObject })

    //creating text to send
        let textMessage = {
          requester_phone: item.requester_number,
          claimer_name: this.props.reduxStore.family.last_name1,
          event_date: item.event_date,
          event_time_start: item.event_time_start,
          event_time_end: item.event_time_end,
        }

    //Twilio
        this.props.dispatch({ type: 'SEND_TEXT', payload: textMessage });
      } else if (response.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled Claim'
        )
      }
    })
  }

  // function to reformat minutes to hours 
  timeStringToFloat = (time) => {
    let hoursMinutes = time.split(/[.:]/);
    let hours = parseInt(hoursMinutes[0], 10);
    let minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    let newTime = (hours + minutes / 60);
    return newTime;
  }

  // upon hitting submit request: 
  // reformat time to send in dispatch 
  // send sweet alert (are you sure?)
  handleCreateRequest = () => {
    console.log(this.state)
    let timeStart = this.state.event_time_start.toTimeString();
    let newTimeStart = timeStart.substring(0, 5);
    let timeEnd = this.state.event_time_end.toTimeString();

    let newTimeEnd = timeEnd.substring(0, 5);
    let newDate = (this.state.event_date.getFullYear() + "-" + 0 + Number(this.state.event_date.getMonth() + 1) + "-" + this.state.event_date.getDate())

    let notes = this.state.notes;
    let offer_needed = this.state.offer_needed;
    let startHours = this.timeStringToFloat(newTimeStart);
    let endHours = this.timeStringToFloat(newTimeEnd);
    let newStartHours = startHours.toFixed(1);
    let newEndHours = endHours.toFixed(1);
    let old_total_hours = (newEndHours - newStartHours);
    let calculated_total_hours = old_total_hours.toFixed(1);
    let total_hours = Number(calculated_total_hours * 60).toFixed(0);
    let newEventToSend = {
      event_date: newDate,
      event_time_start: newTimeStart,
      event_time_end: newTimeEnd,
      requester_id: this.props.reduxStore.family.id,
      group_id: this.props.reduxStore.userGroups[0].id,
      notes: notes,
      offer_needed: offer_needed,
      total_hours: total_hours
    }
    Swal.fire({
      title: 'Are you sure you want to create this request?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create it!'
    }).then((result) => {
      if (result.value) {
        this.props.dispatch({ type: 'ADD_REQUEST', payload: newEventToSend })
        this.setState({
          event_date: new Date(),
          event_time_start: new Date(),
          event_time_end: new Date(),
          notes: '',
        })
      }
    })
    this.openModal();
    this.confirmRequest();
  }

  // send user back to calendar view when submitting request
  confirmRequest = () => {
    this.props.history.push('/calendar');
    console.log('IN CONFIRM REQUEST WITH')
  }

  // upon hitting cancel: 
  // send item user clicked in dispatch to delete event
  deleteHandleClaim = (event, item) => {
    this.props.dispatch({ type: 'REMOVE_EVENT', payload: item })
  }

  // open modal when clicking create request
  openModal = () => {
    this.setState({
      open: !this.state.open
    })
  }

  // upon hitting 'ok' in date/time pickers:
  handleSubmit = (event) => {
    this.setState({
      event_date: this.state.event_date
    })
  }

  // upon hitting 'cancel' in date/time pickers:
  handleCancel = () => {
    this.setState({
      event_date: new Date(),
      event_time_start: new Date(),
      event_time_end: new Date(),
      notes: ''
    })
    this.openModal();
  }

  render() {
    const { classes } = this.props;

    // if there are events/requests on clicked day
    if (this.props.reduxStore.calendar.length !== 0) {
      return (
        <>
          <div className='createRequestBtn'>
            <Button
              variant="contained" color="primary" onClick={this.openModal}
            >
              CREATE REQUEST
            </Button>
          </div>
          <h2 className={classes.date}> {this.props.date}</h2>
          <hr style={{ backgroundColor: '#8298ca', width: '80%', borderRadius: '5px', height: '5px', border: 'none', marginTop: '20px', marginBottom: '20px' }} />
          <h3 className={classes.openRequests}> Open Requests </h3>
          <Modal
            aria-labelledby="simple-modal-title"
            arai-describedby="simple-modal-description"
            open={this.state.open}
          >
            <div className="timeAndDatePicker">
              <Typography style={{ marginLeft: '5px', marginTop: '30px' }} variant="h6" id="modal-title">
                Select Time/Date
            </Typography>
              <Grid container className={classes.grid} justify="space-around">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    margin="normal"
                    label="Date picker"
                    value={this.state.event_date}
                    onChange={(event) => this.handleDateChange(event, 'event_date')}
                  />
                  <TimePicker
                    margin="normal"
                    label="Time Start"
                    value={this.state.event_time_start}
                    onChange={(event) => this.handleDateChange(event, 'event_time_start')}
                  />
                  <TimePicker
                    margin="normal"
                    label="Time end"
                    value={this.state.event_time_end}
                    onChange={(event) => this.handleDateChange(event, 'event_time_end')}
                    onSubmit={(event) => this.handleSubmit}
                  />
                  <TextField multiline
                    rowsMax="6"
                    onChange={event => this.handleChange(event, 'notes')} label="Notes"
                    value={this.state.notes}
                  ></TextField>
                  <form className={classes.radio}>
                    Offer
                      <Radio
                      label="Offer"
                      labelPlacement="top"
                      checked={this.state.offer_needed === 'true'}
                      onChange={this.handleRequestStatus}
                      value='true'
                      color="primary"
                      name="radio-button-demo"
                      aria-label='offer'
                    />
                    Need
                      <Radio
                      label="Need"
                      labelPlacement="top"
                      checked={this.state.offer_needed === 'false'}
                      onChange={this.handleRequestStatus}
                      value='false'
                      color="primary"
                      name="radio-button-demo"
                      aria-label='needed'
                    />
                  </form>
                </MuiPickersUtilsProvider>
                <Link to='/calendar'>
                  <Button variant="contained" color="primary" onClick={(event) => this.handleCreateRequest()}
                    style={{ width: '140px', margin: '5px 0px 0px 0px' }}
                  >SUBMIT</Button>
                </Link>
                <Button variant="contained" color="red" onClick={this.handleCancel} style={{ width: '140px', margin: '5px 0px 30px 0px' }}> CANCEL </Button>
              </Grid>
            </div>
          </Modal>
          <div className="ui two column grid">
            <Card.Group
              itemsPerRow={2}
              style={{ marginLeft: '25px', marginTop: '20px', width: '100%' }}
            >
              {this.props.reduxStore.calendar.map(item => (
                <Card
                  style={{height: '154px', width: '154px'}} 
                  className="ui centered cards"
                  raised key={item.id}>

                  <Card.Content
                  className={item.offer_needed ? 'teal card' : 'orange card'}>
                    
                    <Card.Header style={{display: 'inline-block', float: 'left', 
                    }}
                    >{item.last_name1} <Icon style={{float: 'right', marginLeft: '30px', marginRight: '-5px', height: '25px', width: '20px'}} name="black file alternate outline"></Icon></Card.Header>
                    <Card.Meta 
                    >{item.event_time_start} - {item.event_time_end}</Card.Meta>
                    <h4 style={{fontSize: '20px', textAlign: 'center'}} className={item.offer_needed ? 'teal' : 'orange'}>
                        {item.offer_needed ? 'Offering' : 'Needed'}

                    </h4>
                    <br />
                    {item.requester_id === this.props.reduxStore.family.id
                      ?
                      <Button
                        color='red'
                        onClick={(event) => this.deleteHandleClaim(event, item)}>
                        Cancel
                      </Button>
                      :
                      <Button onClick={(event) => this.handleClaim(event, item)}
                        style={{ fontWeight: 'bold', margin: '5px 0px', width: '110px', height: '37px', border: 'solid green 2px', borderRadius: '3px', backgroundColor: '#89E894'}}
                      >
                        CLAIM +
                      </Button>
                    }

                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
          </div>
        </>

      )
    // if there are NOT events/requests on clicked day
    } else {
      return (
        <>
          <div>
            <div className='createRequestBtn'>
              <Button className={classes.button} variant="contained" color="primary" onClick={this.openModal}
              >
                CREATE REQUEST
            </Button>
            </div>
            <h2 className={classes.date}> {this.props.date}</h2>
            <hr className={classes.hr} />
            <h3 className={classes.openRequests}> No Requests </h3>
            <Modal
              aria-labelledby="simple-modal-title"
              arai-describedby="simple-modal-description"
              open={this.state.open}
            >
              <div className="timeAndDatePicker">
                <Typography
                  style={{ marginLeft: '5px', marginTop: '30px' }}
                  variant="h6"
                  id="modal-title"
                >
                  Select Time/Date
              </Typography>
                <Typography variant="subtitle1" id="simple-modal-description">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container className={classes.grid} justify="space-around">
                      <DatePicker
                        margin="normal"
                        label="Date picker"
                        value={this.state.event_date}
                        onChange={(event) => this.handleDateChange(event, 'event_date')}
                      />
                      <TimePicker
                        margin="normal"
                        label="Time Start"
                        value={this.state.event_time_start}
                        onChange={(event) => this.handleDateChange(event, 'event_time_start')}
                      />
                      <TimePicker
                        margin="normal"
                        label="Time end"
                        value={this.state.event_time_end}
                        onChange={(event) => this.handleDateChange(event, 'event_time_end')}
                      />
                      <TextField
                        className={classes.textField}
                        multiline
                        rowsMax="6"
                        onChange={event => this.handleChange(event, 'notes')} label="Notes"
                        value={this.state.notes}
                      ></TextField>
                      <form className={classes.radio}>
                        Offer
                      <Radio
                          label="Offer"
                          labelPlacement="top"
                          checked={this.state.offer_needed === 'true'}
                          onChange={this.handleRequestStatus}
                          value='true'
                          color="primary"
                          name="radio-button-demo"
                          aria-label='true'
                        />
                        Need
                      <Radio
                          label="Need"
                          labelPlacement="top"
                          checked={this.state.offer_needed === 'false'}
                          onChange={this.handleRequestStatus}
                          value='false'
                          color="primary"
                          name="radio-button-demo"
                          aria-label=''
                        />
                      </form>
                      <Link to='/calendar'>
                        <Button variant="contained" color="primary" onClick={(event) => this.handleCreateRequest()}
                          style={{ width: '140px', margin: '5px 0px 0px 0px' }}
                        >SUBMIT</Button>
                      </Link>
                      <Button variant="contained" color="red" onClick={this.handleCancel} style={{ width: '140px', margin: '5px 0px 30px 0px' }}> CANCEL </Button>
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Typography>
              </div>
            </Modal>
          </div>
        </>
      )
    }

  } // end render


} // end EventView

const mapsToStateProps = (reduxStore) => ({
  reduxStore
})

export default withStyles(styles)(connect(mapsToStateProps)(EventView));