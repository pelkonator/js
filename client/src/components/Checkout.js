import React, { Component, Fragment } from 'react'
import {Container, Box, Button, Heading, Text, TextField, Modal, Spinner} from 'gestalt'
import ToastMessage from './ToastMessage'
import Strapi from 'strapi-sdk-javascript/build/main'
import {getCart, calculatePrice, clearCart, calculateAmount} from './../utils'
import {withRouter} from 'react-router-dom'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

class Checkout extends Component {

    state = {
        toast: false,
        toastMessage: '',
        cartItems:[],
        address: '',
        postalCode: '',
        city: '',
        confirmationEmailAddress: '',
        orderProcessing: false,
        modal: false
    }

    componentDidMount() {
        this.setState({cartItems: getCart()});
    }

    handleSubmitOrder = async () => {
        const {cartItems, city, postalCode, address} = this.state;
        this.setState({orderProcessing: true});
        try {
            await strapi.createEntry('orders',{
                amount: calculateAmount(cartItems),
                brews:cartItems,
                city,
                postalCode,
                address
            });
            this.setState({orderProcessing: false, modal:false});
            clearCart();
            this.showToast('Your order has been successfully submitted!', true);
        } catch (error) {
            this.setState({orderProcessing: false, modal:false});
            this.showToast(error.message);
        }
    }
    //handleSubmitOrder = () => this.setState({modal: false});

    closeModal = () => this.setState({modal: false});

    handleConfirmOrder = async event => { 
        event.preventDefault();

        if (this.isFormEmpty(this.state)) {
            this.showToast('Fill all fields');
            return;
        }
        this.setState({modal: true});
        // try {
        //     //set loading-true
        //     this.setState({loading: true});
        //     //send strapi request
        //     const response = await strapi.signin();
        //     //set loading-false
        //     this.setState({loading: false});
        //     //put token to local storage
        //     //setToken(response.jwt);
        //     //redirect user to home page
        //     this.redirectUser('/');
        // } catch (error) {
        //     // set loading - false
        //     this.setState({loading: false});
        //     //show error msg
        //     this.showToast(error.message);
        // }        
    }

    isFormEmpty = ({address, postalCode, city, confirmationEmailAddress}) => {
        return !address || !postalCode || !city || !confirmationEmailAddress
    }

    showToast = (toastMessage, redirect = false) => {
        this.setState({toast:true, toastMessage});
        setTimeout(
            ()=>this.setState({toast:false, toastMessage: ''},
            ()=> redirect && this.props.history.push('/')        
        ), 5000);
    }
    
    handleChange = ({event, value}) => {
        event.persist();
        this.setState({[event.target.name]: value});
    }

    render() {
        const {cartItems, modal, orderProcessing} = this.state;
        return (
            <Container>
                <Box color="darkWash" wrap shape="rounded" display="flex" justifyContent="center" alignItems="center" direction="column" margin={4} padding={4}>
                   <Heading color="midnight">Checkout</Heading>
                   {cartItems.length>0? <Fragment>
                    <Box display="flex" justifyContent="center" alignItems="center" direction="column" marginTop={2} marginBottom={4}>
                        <Text italic color="darkGray">{cartItems.length} items for Checkout</Text>
                        <Box padding={2}>
                            {cartItems.map(item=>(
                                <Box key={item._id} padding={1}>
                                    <Text color="midnight">{item.name} x {item.quantity} - ${item.quantity*item.price}</Text>
                                </Box>
                            ))}
                        </Box>
                        <Text bold>Total amount: {calculatePrice(cartItems)} </Text>
                    </Box>
                    <form onSubmit={this.handleConfirmOrder} style={{display: 'inlineBlock', textAlign: 'center', maxWidth:450}}>                         

                        <TextField id="address" type="text" name="address" placeholder="Shipping address" onChange={this.handleChange} />                        
                        <TextField id="postalCode" type="text" name="postalCode" placeholder="Postal Code" onChange={this.handleChange} />
                        <TextField id="city" type="text" name="city" placeholder="City of residence" onChange={this.handleChange} /> 
                        <TextField id="confirmationEmailAddress" type="email" name="confirmationEmailAddress" placeholder="Confirmation email address" onChange={this.handleChange} />

                        <button id="stripe_button" type="submit">Submit</button>
                   </form>
                   </Fragment>: (
                       <Box color="darkWash" shape="rounded" padding={4}>
                           <Heading color="watermelon" size="xs">Your cart is empty</Heading>
                           <Text align="center" italic color="green">Add some accounts!</Text>
                       </Box>
                   )}
                </Box>
                {/*Confirmation modal */}
                {modal && (
                    <ConfirmationModal orderProcessing={orderProcessing} cartItems={cartItems} closeModal={this.closeModal} handleSubmitOrder={this.handleSubmitOrder} />
                )}
                <ToastMessage show={this.state.toast} message={this.state.toastMessage}/>
            </Container>
        );
    }
}

const ConfirmationModal = ({orderProcessing,cartItems,closeModal,handleSubmitOrder}) => (
    <Modal accessibilityCloseLabel="close" accessibilityModalLabel="Confirm Your Order" heading="Confirm Your Order" onDismiss={closeModal} footer={
        <Box display="flex" marginRight={-1} marginLeft={-1} justifyContent="center">
            <Box padding={1}><Button size="lg" color="red" text="Submit" disabled={orderProcessing} onClick={handleSubmitOrder} /></Box>
            <Box padding={1}><Button size="lg" text="Cancel" disabled={orderProcessing} onClick={closeModal} /></Box>
        </Box>
        
    } role="alertdialog" size="sm">
        {/*order summary*/}
        {!orderProcessing ? (
            <Box display="flex" marginRight={-1} marginLeft={-1} justifyContent="center" alignItems="center" direction="column" padding={2} color="lightWash">
                {cartItems.map(item=>(
                    <Box key={item._id} padding={1}>
                        <Text size="lg" color="red">
                          {item.name} x {item.quantity} - ${item.quantity*item.price}  
                        </Text>
                    </Box>
                ))}
                <Box paddingY={2}>
                    <Text size="lg" bold>Total: {calculatePrice(cartItems)}</Text>
                </Box>
            </Box>
        ): <Fragment>
            <Spinner show={orderProcessing} accessibilityLabel="Order is processing" />
            <Text align="center" italic>Submitting order...</Text>
        </Fragment>}


    </Modal>
)

export default withRouter(Checkout);