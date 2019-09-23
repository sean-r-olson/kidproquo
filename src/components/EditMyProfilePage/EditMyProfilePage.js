import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css'
import { Button, Icon, Card, Image, Modal, Responsive, Form, Input } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import './EditMyProfilePage.css';




class EditMyProfilePage extends Component {

    // run a disptach to fetch family information by sending the user.id as the payload.
    // This runs to the saga where it will then run to the server to retrieve the Data. 
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_FAMILY', payload: this.props.reduxStore.user.id })
    }


    state = {
        open: false,
        open2: false,
        family_last_name1: this.props.reduxStore.family.last_name1,
        family_first_name1: this.props.reduxStore.family.first_name1,
        family_first_name2: this.props.reduxStore.family.first_name2,
        family_last_name2: this.props.reduxStore.family.last_name2,
        first_name: '',
        last_name: '',
        email: this.props.reduxStore.family.email,
        street_address: this.props.reduxStore.family.street_address,
        city: this.props.reduxStore.family.city,
        state: this.props.reduxStore.family.state,
        zip_code: this.props.reduxStore.family.zip_code,
        phone_number: this.props.reduxStore.family.phone_number,
        birthdate: '',
        allergies: '',
        medication: '',
        notes: '',
        image: '',
        family_id: this.props.reduxStore.family.id,
        family_image: this.props.reduxStore.family.image,
        user_id: this.props.reduxStore.user.id

    }

    // If the user clicks the pencil alternate icon, it will activate this function.
    // setState to empty values and switch the open property to the opposite of value which
    // activates the addKidModal. 
    addKidModal = () => {
        this.setState({
            open: !this.state.open,
            first_name: '',
            last_name: '',
            birthdate: '',
            image: '',
            medication: '',
            allergies: '',
            notes: ''
        })
    }

    // If the user clicks the cancel button, this function will activate.
    // A 'Sweet Alert' will appear will appear.
    // A condition is setup to where if they click yes, then function will send the
    // DOM to family-profile page with this.props.history.push.
    // If they click cancel, then the Sweet alert closes and nothing happens. 
    cancelProfileUpdate = () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "Any Changes Will Not Be Saved!",
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No!',
            reverseButtons: false
        }).then((result) => {
            if (result.value) {
                this.props.history.push('/family-profile')
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
           
            }
        })

    }

    // This function captures the input values and setState based 
    // on the property(propsName) and its value (event.target.value).
    handleChangeFor = (event, propsName) => {
        this.setState({ [propsName]: event.target.value })
    }


    // Once the user fills the input values for their new kid.
    // they click the 'submit' button which activates this function.
    // A sweet alert appears which asks if the user still wants to proceed.
    // If they confirm, then a dispatch will run to 'ADD_NEW_KID' with the 
    // payload of this.state. 
    // then 'setState' to empty values and 'open' property to false.
    submitNewKid = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: `${this.state.first_name} will be added to your family!`,
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, ADD!',
            cancelButtonText: 'No, CANCEL!',
            reverseButtons: false
        }).then((result) => {

            if (result.value) {
                return (
                    
                    this.props.dispatch({ type: 'ADD_NEW_KID', payload: this.state }),
                    this.setState({
                        open: false,
                        first_name: '',
                        last_name: '',
                        image: '',
                        birthdate: '',
                        allergies: '',
                        medication: '',
                        notes: ''
                    })
                )

            } else if (
                
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire(
                    'Cancelled',
                    '',
                    'error'
                )
            }
        })
      


    }


    // When the user clicks the pencil icon, setState will set the values
    // to so it will appear in the Modal for the user to alter.
    // The 'open2' property will alter the current boolean value which activates the 
    // Modal to appear on the screen.
    editFamilyProfile = () => {
        this.setState({
            open2: !this.state.open2,
            family_id: this.props.reduxStore.family.id,
            family_image: this.state.family_image
        })
    }

    // The user can change profile picture of the family.
    // This function will 'setState' to the image they place in the inputs.
    // Then switch 'open2' property to false which will close the modal.
    setLocalImage = () => {
        this.setState({
            family_image: this.state.family_image,
            open2: false
        })
    }


    // When the user clicks the save changes button, sweet alert will appear.
    // once the user clicks confirm button it will run a dispatch to 'Update_Family'
    // with state as the payload.
    // Then switch to the family-profile page by using history.push.
    updateFamily = () => {

        console.log('this is STATE', this.state)

        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Submit Changes to Profile!",
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No!',
            reverseButtons: false
        }).then((result) => {
            if (result.value) {
                this.props.dispatch({ type: 'UPDATE_FAMILY', payload: this.state })
                this.props.history.push('/family-profile')
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire(
                    'Cancelled',
                    'Your Changes have not been updated',
                    'error'
                )
            }
        })
    }

    // This function is Dummy Data when the user wants to add a kid.
    // They click the 'Add Kid' title which will setState to the values
    // and populate the inputs
    dummyData = () => {
        this.setState({
            first_name: 'Michelle',
            last_name: 'Olson',
            birthdate: '9-15-2019',
            image: 'https://www.sharp.com/health-news/images/My-Child-Swallowed-a-Coin-HN884-Babies-IStock-515683938-Sized.jpg',
            medication: 'None',
            allergies: 'No Allergies',
            notes: ''
        })
    }

    render() {
        console.log('THIS IS STATE', this.state)
        return (

            <div className="ui container center aligned" className='familyFormBackground'>
                <div className='editProfileHeader'>
                    <div className='editProfileHeader'>
                        <h2>Edit Your Profile</h2>
                    </div>
                    <div className='iconsOnEditFamForm'>
                        <div className='editIcon'>
                            <Icon
                                name='pencil alternate'
                                size='small'
                                onClick={this.editFamilyProfile}

                            />
                        </div>
                        <div className='addKidIcon'>
                            <Icon
                                name='add user'
                                size='small'
                                onClick={this.addKidModal}
                            />
                        </div>

                    </div>
                </div>
                <div>

                </div>
                <div className="ui container center aligned" className="card">
                    <Card className="ui container center aligned" >
                        <Card.Content>
                            <Card.Header></Card.Header>
                            <Image
                                size='huge'
                                className="ui fluid image"
                                src={this.state.family_image ? this.state.family_image : ''}
                                alt="img 1"
                            />
                        </Card.Content>
                    </Card>
                    <div //className='addKidBtn'
                    >
                    </div>
                </div>
                <div className='familyFormInputsBtns'>
                    <Form.Input
                        className='editInputs'
                        fluid label='First name 1'
                        value={this.state.family_first_name1}
                        onChange={(event) => this.handleChangeFor(event, 'family_first_name1')}


                    />
                    <Form.Input
                        className='editInputs'
                        fluid label='Last Name 1'
                        value={this.state.family_last_name1}
                        onChange={(event) => this.handleChangeFor(event, 'family_last_name1')}

                    />
                    <Form.Input
                        className='editInputs'
                        fluid label='First Name 2'
                        value={this.state.family_first_name2}
                        onChange={(event) => this.handleChangeFor(event, 'family_first_name2')}

                    />
                    <Form.Input
                        className='editInputs'
                        fluid label='Last Name 2'
                        value={this.state.family_last_name2}
                        onChange={(event) => this.handleChangeFor(event, 'family_last_name2')}

                    />
                    <Form.Input
                        className='editInputs'
                        fluid label='Email'
                        value={this.state.email}
                        onChange={(event) => this.handleChangeFor(event, 'email')}

                    />
                    <Form.Input
                        className='editInputs'
                        fluid label='Street Address'
                        value={this.state.street_address}
                        onChange={(event) => this.handleChangeFor(event, 'street_address')}

                    />
                    <Form.Input
                        className='editInputs'
                        fluid label='City'
                        value={this.state.city}
                        onChange={(event) => this.handleChangeFor(event, 'city')}

                    />
                    <Form.Input
                        className='editInputs'
                        fluid label='State'
                        value={this.state.state}
                        onChange={(event) => this.handleChangeFor(event, 'state')}

                    />
                    <Form.Input
                        className='editInputs'
                        fluid label='Zip Code'
                        value={this.state.zip_code}
                        onChange={(event) => this.handleChangeFor(event, 'zip_code')}

                    />

                    <Form.Input
                        className='editInputs'
                        fluid label='Phone Number'
                        value={this.state.phone_number}
                        onChange={(event) => this.handleChangeFor(event, 'phone_number')}

                    />
                    <div className='editProfileBtns'>


                        <div className='saveChangesBtn'>
                            <Button
                                color='green'
                                onClick={this.updateFamily}
                                size='mini'>
                                Submit
                            </Button>
                        </div>

                        <div className='saveChangesBtn'>
                            <Button
                                color='red'
                                onClick={this.cancelProfileUpdate}
                                size='mini'>
                                Cancel
                            </Button>
                        </div>

                    </div>
                </div>



                <div>
                    {/************************************** Edit Profile Pic Modal ************************************************/}
                    <Modal
                        open={this.state.open2}
                        onClose={this.state.open2}
                    >

                        <Image
                            className='ui fluid image'
                            src={this.state.family_image}

                        />
                        <Input
                            placeholder='Add New Image'
                            value={this.state.family_image}
                            onChange={(event) => this.handleChangeFor(event, 'family_image')}
                        />
                        <div className='modalBtns'>
                            <div className='modalOkBtn'>
                                <Button
                                    color='blue'
                                    size='small'
                                    onClick={this.setLocalImage}>
                                    Ok
                            </Button>
                            </div>
                            <div>
                                <Button
                                    color='red'
                                    size='small'
                                    onClick={this.editFamilyProfile}>
                                    Cancel
                            </Button>
                            </div>
                        </div>


                    </Modal>
                </div>
                <div>
                    {/*************************************** Add Kid Modal ********************************************/}
                    <div>
                        <Responsive>
                            <Modal
                                open={this.state.open}
                                onClose={this.state.open}
                                style={{ 'background-color': 'portage', 'border': '1px' }}
                            >
                                <Modal.Header
                                    className="ui container center aligned"
                                    style={{ 'background-color': 'portage' }}
                                    onClick={this.dummyData}
                                >
                                    <h1>Add Kid</h1>
                                </Modal.Header>

                                <Image
                                    className='ui fluid image'

                                    src={this.state.image}

                                />
                                <Modal.Content
                                    className="ui container center aligned"
                                    style={{ 'background-color': 'white' }}
                                >

                                    <Form.Field>
                                        <Form.Input
                                            fluid label='First Name'
                                            placeholder="(50 character max)"
                                            value={this.state.first_name}
                                            onChange={(event) => this.handleChangeFor(event, 'first_name')}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Input
                                            fluid label='Last Name'
                                            placeholder="(50 character max)"
                                            value={this.state.last_name}
                                            onChange={(event) => this.handleChangeFor(event, 'last_name')}
                                        />
                                    </Form.Field>
                                    <Form.Input
                                        fluid label='Birthday'
                                        placeholder="(MM-DD-YYYY)"
                                        value={this.state.birthdate}
                                        onChange={(event) => this.handleChangeFor(event, 'birthdate')}
                                    />

                                    <Form.Input
                                        fluid label='Image'
                                        placeholder="URL"
                                        value={this.state.image}
                                        onChange={(event) => this.handleChangeFor(event, 'image')}
                                    />

                                    <Form.Input
                                        fluid label='Medication'
                                        placeholder="(100 character max)"
                                        value={this.state.medication}
                                        onChange={(event) => this.handleChangeFor(event, 'medication')}
                                    />

                                    <Form.Input
                                        fluid label="Allergies"
                                        placeholder="Allergies (500 characters max)"
                                        value={this.state.allergies}
                                        onChange={(event) => this.handleChangeFor(event, 'allergies')}

                                    />

                                    <Form.Input
                                        fluid label="Other Information"
                                        placeholder="Other Info (300 characters max)"
                                        value={this.state.notes}
                                        onChange={(event) => this.handleChangeFor(event, 'notes')}
                                    />

                                </Modal.Content>
                                <div className='cancelSubmitKidModalBtn'>
                                    <Button
                                        color='red'
                                        floated='right'
                                        size='mini'
                                        onClick={this.addKidModal}>
                                        Cancel
                                </Button>
                                    <Button
                                        color='blue'
                                        floated='right'
                                        size='mini'
                                        onClick={this.submitNewKid}>
                                        Submit
                                </Button>
                                </div>
                            </Modal>
                        </Responsive>


                    </div>


                </div>



            </div>
        )
    }
};

const mapStateToProps = reduxStore => ({
    reduxStore
});

export default connect(mapStateToProps)(EditMyProfilePage);