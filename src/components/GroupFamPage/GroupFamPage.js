import React, { Component } from 'react';
import { connect } from 'react-redux';
import Coverflow from 'react-coverflow';
import 'semantic-ui-css/semantic.min.css'
import { Button, Icon, Card, Image, Modal, Responsive, Segment, Form, Grid } from 'semantic-ui-react';
import './GroupFamPage.css';



class GroupFamPage extends Component {


    // Two dipatches run on page load
    // both use the params.id which is the id that is specific for each family
    // this will get the right family and their kids to appear in the GroupFamPage
    componentDidMount() {
        this.props.dispatch({ type: 'CLICK_FETCH_FAMILY', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'FETCH_KIDS', payload: this.props.match.params.id })
    }

    state = {
        open: false
    }

    // setState to false when user clicks the cancel button.
    // This closes the modal.
    closeKidModal = () => {
        this.setState({
            open: false
        })
    }


    // when the back button is clicked, this function is activated
    // to send the user back to the group-view page.
    handleBack = () => {
        this.props.history.push('/group-view');
    }

    // the user clicks on a kid card which will capture the values of the card.
    // passes item into this function.
    // setState to those values which will display within the modal.
    kidModal = (item) => {

        console.log('this is item', item)
        this.setState({
            id: item.id,
            first_name: item.first_name,
            last_name: item.last_name,
            allergies: item.allergies,
            birthdate: item.birthdate,
            medication: item.medication,
            image: item.image,
            notes: item.notes,
            open: true

        })
    }

    render() {
        return (
            <>
                <div>
                    <h1 className='headerTitleFamily'>
                        {this.props.reduxStore.singleFam.last_name1} Family
                    </h1>
                </div>
                &nbsp;
            <div align="center">
                    <Card>
                        <Card.Content>
                            <Card.Header> </Card.Header>
                            {/* <Card.Meta><span>The Olson family</span></Card.Meta> */}
                            <Image
                                className='ui centered medium image'
                                src={this.props.reduxStore.singleFam.image
                                    ?
                                    this.props.reduxStore.singleFam.image
                                    :
                                    <>no</>
                                }
                                alt="img 1"
                            />
                        </Card.Content>
                    </Card>
                </div>
                &nbsp;
                <div align="center">
                    <Card>
                        <Card.Content>
                            <Card.Header>Info</Card.Header>
                            <Card.Description>
                                {this.props.reduxStore.singleFam.street_address} < br />
                                {this.props.reduxStore.singleFam.city}  <></>
                                {this.props.reduxStore.singleFam.state}, <></>
                                {this.props.reduxStore.singleFam.zip_code}< br />
                                {this.props.reduxStore.singleFam.phone_number}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </div>
                &nbsp;
                <div className='kidCard'>
                    <div className='meetKidsTitle'>
                        <h1>Kids</h1>
                    </div>

                    <Grid stackable container centered columns={2} >
                        {this.props.reduxStore.kid.map((item, i) => {

                            return (

                                <Grid.Column>
                                    <Card key={item.id} className='kidCard'>
                                        <Card.Content>

                                            <Card.Header className='kidCardTitle'>
                                                {item.first_name} {item.last_name}
                                            </Card.Header>
                                            <Image
                                                className='ui centered fluid image'
                                                src={item.image}
                                                alt="img 1"
                                                onClick={() => this.kidModal(item)}
                                            />
                                        </Card.Content>

                                    </Card>
                                </Grid.Column>
                            )
                        })}

                    </Grid>

                    <Modal
                        open={this.state.open}
                        onClose={this.state.open}
                    >
                        <Modal.Header align='center'>
                            <h2>{this.state.first_name} {this.state.last_name}</h2>
                        </Modal.Header>
                        <Modal.Content
                            image
                        >
                            <Image
                                wrapped size='medium'
                                src={this.state.image}
                            />
                            <Modal.Description>
                                <h4>Birthdate:</h4>
                                <p>{this.state.birthdate}</p>
                                <h4>Allergies:</h4>
                                <p>{this.state.allergies}</p>
                                <h4>Medicine:</h4>
                                <p>{this.state.medication}</p>
                                <h4>Notes:</h4>
                                <p>{this.state.notes}</p>
                            </Modal.Description>
                        </Modal.Content>
                        <div align='center'>
                            <Button color='red' onClick={this.closeKidModal}>Cancel</Button>
                        </div>
                    </Modal>


                </div>
                <div className='backBtn'>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleBack}>
                        Back
                    </Button>
                </div>
            </>
        )
    }
};

const mapStateToProps = reduxStore => ({
    reduxStore
});

export default connect(mapStateToProps)(GroupFamPage);
