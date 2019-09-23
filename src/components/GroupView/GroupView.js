import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image, Icon, Button, Feed, Modal, Form, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Swal from 'sweetalert2';
import './GroupView.css';


class GroupView extends Component {

    // Run two dispatches
    // First, runs a disptach to Fetch all members that are part of the group by using the 
    // userGroups Reducer.
    componentDidMount() {
        // this.props.dispatch({ type: 'FETCH_FAMILY', payload: this.props.reduxStore.user.id })
        this.props.dispatch({ type: 'FETCH_GROUP', payload: this.props.reduxStore.userGroups[0] });
        this.props.dispatch({ type: 'FETCH_FAM_GROUP', payload: this.props.reduxStore.userGroups[0] });
    }

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
        groud_id: '',
        openModal: false,
    };


    viewFam = (item) => {
        console.log('view fam item', item)
        this.props.history.push(`/view/${item.user_id}`);

    }

    handleCancel = (item) => {
        console.log('IN GROUP VIEW / HANDLE CANCEL WITH ITEM:', item)
        let objectToSend = {
            event_date: item.event_date,
            event_time_start: item.event_time_start,
            event_time_end: item.event_time_end,
            requester_name: item.requester_name,
            id: item.id,
            group_id: this.props.reduxStore.userGroups[0],
        }
        this.props.dispatch({ type: 'CANCEL_REQUEST', payload: objectToSend })
    }



    handleClaim = (item) => {
        console.log('in handle Claim', item)
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
                    last_name1: this.props.reduxStore.family.last_name1,
                    claimer_notes: this.state.claimer_notes,
                    group_id: this.props.reduxStore.userGroups[0],
                    requester_name: item.requester_name
                }

                let textMessage = {
                    requester_phone: item.requester_number,
                    claimer_name: this.props.reduxStore.family.last_name1,
                    event_date: item.event_date,
                    event_time_start: item.event_time_start,
                    event_time_end: item.event_time_end,
                }
                console.log('this is the text message object', textMessage)

                this.props.dispatch({ type: 'CLAIM_EVENT', payload: newObject })
                //Trying Twilio
                this.props.dispatch({ type: 'SEND_TEXT', payload: textMessage });

            } else if (response.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled Claim'
                )
            }
        })
    }

    notesModal = (item) => {
        console.log('IN NOTES MODAL WITH THIS ITEM:', item);
        this.setState({
            notes: item.notes,
            requester_name: item.requester_name,
            openModal: !this.state.openModal,
        })
    }

    close = () => {
        this.setState({
            openModal: false
        })
    }

    seeCalendar = () => { this.props.history.push('/calendar') }

    render() {

        return (
            <div align='center' >

                <h1 style={{ marginBottom: '0px' }}>
                    Welcome to the {this.props.reduxStore.userGroups && this.props.reduxStore.userGroups.length > 0 ?
                        this.props.reduxStore.userGroups[0].group_name : <p></p>} group!
                </h1>

                {/* the group reducer actually holds requests relevant to group */}
                <hr style={{ backgroundColor: '#8298ca', width: '80%', borderRadius: '5px', height: '5px', border: 'none', marginTop: '0px', marginBottom: '20px' }} />
                <h3 style={{ textAlign: 'center' }}> Requests </h3>
                {this.props.reduxStore.group && this.props.reduxStore.group.length > 0 ?
                    this.props.reduxStore.group.map((item) => {
                        // if the group page name matches the user's family group page name
                        // AND the event requester id matches the user's family id
                        // AND the event isn't claimed yet 
                        // AND care is needed
                        if (item.group_id === this.props.reduxStore.family.group_id
                            && item.requester_id === this.props.reduxStore.family.id
                            && item.event_claimed === false
                            && item.offer_needed === false
                        ) {
                            return (
                                <>
                                    <Card >
                                        <Feed style={{ borderRight: 'solid #FE9A76 3px', borderBottom: 'solid #FE9A76 3px', borderRadius: '5px' }}>
                                            <Feed.Content>
                                                <div class="ui orange circular empty label" style={{ float: 'left', margin: '10px' }}></div>
                                                <Feed.Label style={{ paddingTop: '10px' }}>
                                                    <a style={{ fontWeight: 'bold', color: 'black' }}>{item.requester_name}</a> | <a style={{ fontWeight: 'bold', color: 'black' }}>{item.event_date}</a>
                                                    <Icon onClick={() => this.notesModal(item)} style={{ float: 'right', marginLeft: '0px', marginRight: '10px', height: '30x', width: '25px' }} size="large" name="black file alternate outline"></Icon>
                                                </Feed.Label></Feed.Content>
                                            <Feed.Event style={{ display: 'inline-flex', margin: '10px 0px', textAlign: 'center' }}>
                                                <Feed.Content style={{ marginLeft: '20px', marginRight: '-5px', width: '65px', textAlign: 'center', color: '#FE9A76', fontWeight: 'bold' }}>Needed</Feed.Content>
                                                <Feed.Content style={{ float: 'right' }}>
                                                    from {item.event_time_start} - {item.event_time_end}
                                                </Feed.Content>
                                                <br />
                                            </Feed.Event>
                                            {<Button style={{ padding: '10px', marginBottom: '10px' }} color='red' onClick={() => this.handleCancel(item)}>Cancel</Button>}

                                        </Feed>
                                    </Card>
                                </>
                            )
                            // if the group page name matches the user's family group page name
                            // AND the event requester id matches the user's family id
                            // AND the event isn't claimed yet 
                            // AND care is offered
                        } else if (item.group_id === this.props.reduxStore.family.group_id
                            && item.requester_id === this.props.reduxStore.family.id
                            && item.event_claimed === false
                            && item.offer_needed === true) {
                            return (
                                <>
                                    <Card >
                                        <Feed
                                            style={{ borderRight: 'solid #008080 3px', borderBottom: 'solid #008080 3px', borderRadius: '5px' }}
                                        >
                                            <Feed.Content>
                                                <div
                                                    class="ui teal circular empty label"
                                                    style={{ float: 'left', margin: '10px' }}
                                                >

                                                </div>
                                                <Feed.Label
                                                    style={{ paddingTop: '10px' }}
                                                >
                                                    <a
                                                        style={{ fontWeight: 'bold', color: 'black' }}
                                                    >
                                                        {item.requester_name}
                                                    </a>
                                                    |
                                                    <a
                                                        style={{ fontWeight: 'bold', color: 'black' }}
                                                    >
                                                        {item.event_date}
                                                    </a>
                                                    <Icon
                                                        onClick={() => this.notesModal(item)}
                                                        style={{ float: 'right', marginLeft: '0px', marginRight: '10px', height: '30x', width: '25px' }}
                                                        size="large" name="black file alternate outline"
                                                    >

                                                    </Icon>
                                                </Feed.Label></Feed.Content>
                                            <Feed.Event style={{ display: 'inline-flex', margin: '10px 0px', textAlign: 'center' }}>
                                                <Feed.Content
                                                    style={{ marginLeft: '20px', marginRight: '-5px', width: '65px', textAlign: 'center', color: '#008080', fontWeight: 'bold' }}
                                                >
                                                    Offering
                                                    </Feed.Content>
                                                <Feed.Content 
                                                style={{ float: 'right' }}
                                                >
                                                    from {item.event_time_start} - {item.event_time_end}
                                                </Feed.Content>
                                                <br />
                                            </Feed.Event>
                                            {<Button style={{ padding: '10px', marginBottom: '10px' }} color='red' onClick={() => this.handleCancel(item)}>Cancel</Button>}
                                        </Feed>
                                    </Card>
                                </>
                            )
                        }
                        else if (item.group_id === this.props.reduxStore.family.group_id
                            && item.requester_id != this.props.reduxStore.family.id
                            && item.event_claimed === false
                            && item.offer_needed === false
                        ) {
                            //this is the return for when you are claiming someones event who needs help
                            return (
                                <>
                                    <Card >
                                        <Feed
                                            style={{ borderRight: 'solid #FE9A76 3px', borderBottom: 'solid #FE9A76 3px', borderRadius: '5px' }}>
                                            <Feed.Content>
                                                <div class="ui orange circular empty label" style={{ float: 'left', margin: '10px' }}></div>
                                                <Feed.Label
                                                    style={{ paddingTop: '10px' }}>
                                                    <a style={{ fontWeight: 'bold', color: 'black' }}>{item.requester_name}</a> | <a style={{ fontWeight: 'bold', color: 'black' }}>{item.event_date}</a>
                                                    <Icon onClick={() => this.notesModal(item)} style={{ float: 'right', marginLeft: '0px', marginRight: '10px', height: '30x', width: '25px' }} size="large" name="black file alternate outline"></Icon>
                                                </Feed.Label></Feed.Content>
                                            <Feed.Event
                                                style={{ display: 'inline-flex', margin: '10px 0px', textAlign: 'center' }}
                                            >
                                                <Feed.Content
                                                    style={{ marginLeft: '20px', marginRight: '-5px', width: '65px', textAlign: 'center', color: '#FE9A76', fontWeight: 'bold' }}
                                                >
                                                    Needed
                                                </Feed.Content>
                                                <Feed.Content
                                                    style={{ float: 'right' }}
                                                >
                                                    from {item.event_time_start} - {item.event_time_end}
                                                </Feed.Content>
                                                <br />
                                            </Feed.Event>
                                            {
                                                <Button
                                                    style={{ padding: '10px', marginBottom: '10px' }}
                                                    color='green'
                                                    onClick={() => this.handleClaim(item)}
                                                >
                                                    CLAIM
                                            </Button>
                                            }

                                        </Feed>
                                    </Card>
                                </>
                            )

                        }
                        else if (item.group_id === this.props.reduxStore.family.group_id
                            && item.requester_id != this.props.reduxStore.family.id
                            && item.event_claimed === false
                            && item.offer_needed === true
                        ) {
                            return (
                                <>
                                    <Card >
                                        <Feed
                                            style={{ borderRight: 'solid #008080 3px', borderBottom: 'solid #008080 3px', borderRadius: '5px' }}
                                        >
                                            <Feed.Content>
                                                <div class="ui teal circular empty label"
                                                    style={{ float: 'left', margin: '10px' }}
                                                >
                                                </div>
                                                <Feed.Label
                                                    style={{ paddingTop: '10px' }}
                                                >
                                                    <a
                                                        style={{ fontWeight: 'bold', color: 'black' }}
                                                    >
                                                        {item.requester_name}
                                                    </a>
                                                    |
                                                     <a
                                                        style={{ fontWeight: 'bold', color: 'black' }}
                                                    >
                                                        {item.event_date}
                                                    </a>
                                                    <Icon onClick={() => this.notesModal(item)} style={{ float: 'right', marginLeft: '0px', marginRight: '10px', height: '30x', width: '25px' }} size="large" name="black file alternate outline"></Icon>
                                                </Feed.Label></Feed.Content>
                                            <Feed.Event
                                                style={{ display: 'inline-flex', margin: '10px 0px', textAlign: 'center' }}
                                            >
                                                <Feed.Content
                                                    style={{ marginLeft: '20px', marginRight: '-5px', width: '65px', textAlign: 'center', color: '#008080', fontWeight: 'bold' }}
                                                >
                                                    Offering
                                                </Feed.Content>
                                                <Feed.Content
                                                    style={{ float: 'right' }}
                                                >
                                                    from {item.event_time_start} - {item.event_time_end}
                                                </Feed.Content>
                                                <br />
                                            </Feed.Event>
                                            {
                                                <Button
                                                    style={{ padding: '10px', marginBottom: '10px' }}
                                                    color='green'
                                                    onClick={() => this.handleClaim(item)}
                                                >
                                                    CLAIM
                                            </Button>}
                                        </Feed>
                                    </Card>
                                </>
                            )
                        }
                    })
                    :
                    <p></p>
                }

                <Modal
                    open={this.state.openModal}
                    onClose={this.close}
                >
                    <Modal.Header style={{ textAlign: 'center' }}>Notes from the {this.state.requester_name} Family</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <p style={{ fontSize: '17px', textAlign: 'center' }}>
                                {this.state.notes}
                            </p>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
                <hr style={{ backgroundColor: '#8298ca', width: '80%', borderRadius: '5px', height: '5px', border: 'none', marginTop: '30px', marginBottom: '20px' }} />
                <div>
                    <Button color='blue' onClick={(event) => this.seeCalendar()} icon labelPosition='right'>
                        View Calendar
      <Icon name='calendar' />
                    </Button>
                </div>
                <hr style={{ backgroundColor: '#8298ca', width: '80%', borderRadius: '5px', height: '5px', border: 'none', marginTop: '20px', marginBottom: '20px' }} />
                <h3>Members</h3>
                {this.props.reduxStore.groupFam && this.props.reduxStore.groupFam.length > 0 ?



                    this.props.reduxStore.groupFam.map((item) => {
                        if (item.user_id !== this.props.reduxStore.user.id) {
                            return (
                                <>
                                    <Card className="car" key={item.id} onClick={() => this.viewFam(item)}>
                                        <Image wrapped size='medium' src={item.image} />
                                        <Card.Content>
                                            <Card.Header>{item.last_name1} Family</Card.Header>
                                        </Card.Content>
                                    </Card>
                                </>

                            )
                        }
                    })

                    : <p></p>}


            </div>
        )
    }
};

const mapReduxStoreToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapReduxStoreToProps)(GroupView);