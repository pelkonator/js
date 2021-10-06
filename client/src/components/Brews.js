import React, { Component } from 'react';
import Strapi from 'strapi-sdk-javascript/build/main'
import {Box, Heading, Card, Image, Text, Button, Mask, IconButton} from 'gestalt'
import {Link} from 'react-router-dom'
import {calculatePrice, setCart, getCart} from '../utils'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl);
 
 class Brews extends Component {
     state = {
         brews:[], 
         brandName:'',
         cartItems: []
     }
    async componentDidMount() {        
        try {
            const response = await strapi.request('POST', '/graphql', {data: {query: `query { brand(id: "${this.props.match.params.brandId}") { _id name brews {_id name description image {url} price} } }`}})
            console.log(response);
            this.setState({brews: response.data.brand.brews, brandName: response.data.brand.name, cartItems: getCart()})
        } catch (error) {
            console.log(error);
        }
    }

    addToCart = brew => {
        const alreadyInCart = this.state.cartItems.findIndex(item=> item._id === brew._id);
        if (alreadyInCart === -1) {
            const updatedItems = this.state.cartItems.concat({
                ...brew,
                quantity:1
            });
            this.setState({cartItems:updatedItems}, ()=>setCart(updatedItems));
        } else {
            const updatedItems = [...this.state.cartItems];
            updatedItems[alreadyInCart].quantity +=1;
            this.setState({cartItems:updatedItems}, ()=>setCart(updatedItems));
        }
    }

    deleteFromCart = id => {
        const filteredItems = this.state.cartItems.filter(item=>item._id!==id);
        this.setState( {cartItems:filteredItems}, ()=>setCart(filteredItems));
    }

     render() {
         return (
             <Box marginTop={4} display="flex" justifyContent="center" alignItems="start"  dangerouslySetInlineStyle={{__style: {flexWrap:'wrap-reverse'}}}>
                 <Box display="flex" direction="column" alignItems="center">
                    <Box margin={2}>       
                        <Heading color="orchid">{this.state.brandName}</Heading>
                    </Box>
                    <Box dangerouslySetInlineStyle={{__style: {backgroundColor:'#bdcdd9'}}} wrap shape="rounded" display="flex" justifyContent="center" padding={4}>
                        {this.state.brews.map(brew=>(
                            <Box paddingY={4} margin={2} width={210} key={brew._id}>
                            <Card image={<Box height={250} width={200}><Image alt="Brew" fit="cover" naturalHeight={1} naturalWidth={1} src={`${apiUrl}${brew.image?brew.image.url:'/uploads/noimage.jpg'}`} /></Box>}>
                              <Box display="flex" alignItems="center" justifyContent="center" direction="column">
                                <Box marginBottom={2}>
                                    <Text bold size="xl">{brew.name}</Text>
                                </Box>
                                <Text>{brew.description}</Text>
                                <Text color="orchid">${brew.price}</Text>
                                <Box marginTop={2}>
                                    <Button onClick={()=>{this.addToCart(brew)}} color="blue" text="Open account"/>
                                </Box>                          
                              </Box>
                            </Card>
                          </Box>
                        ))}
                    </Box>
                 </Box>

                {/*User cart*/}
                <Box alignSelf="end" marginTop={2} marginLeft={2}>
                    <Mask shape="rounded" wash>
                        <Box display="flex" direction="column" alignItems="center" padding={2}>
                            <Heading align="center" size="sm">Your Cart??</Heading>
                            <Text color="gray" italic>
                                {this.state.cartItems.length} items selected
                            </Text>

                            {/* Cart Items */}
                            {
                                this.state.cartItems.map(item=>(
                                    <Box key={item._id} display="flex" alignItems="center" >
                                        <Text>
                                            {item.name} x {item.quantity} - {(item.quantity*item.price).toFixed(2)}
                                        </Text>
                                        <IconButton accessibilityLabel="Delete Item" icon="cancel"  size="sm" iconColor="red" onClick={()=> this.deleteFromCart(item._id)} />
                                    </Box>
                                ))

                            }

                            <Box display="flex" direction="column" alignItems="center" justifyContent="center">
                                <Box margin={2}>
                                    {this.state.cartItems.length === 0 && <Text color="red">Please select some items</Text>}
                                </Box>
                                <Text size="lg">Total: ${calculatePrice(this.state.cartItems)}</Text>
                                <Text>
                                    <Link to="/checkout">Checkout</Link>
                                </Text>
                            </Box>
                        </Box>
                    </Mask>
                </Box>

             </Box>
         );
     }
 }
 
 export default Brews;