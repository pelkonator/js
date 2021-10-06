import React, { Fragment, Component } from 'react';
import './App.css';
import Strapi from 'strapi-sdk-javascript/build/main'
import {NavLink } from 'react-router-dom'
import {getToken} from './../utils'
import Books from './Books'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl);

class App extends Component {
  // state = {
  //   brands:[],
  //   loadingBrands: true,
  //   searchTerm:''
  // }

  async componentDidMount() {    
    // try {
    //   const response = await strapi.request('POST', '/graphql', {data: {query: `query { brands { _id name description image {url name } } }`}})
    //   //console.log(response);
    //   this.setState({brands: response.data.brands, loadingBrands:false});

    // } catch (error) {
    //   console.log(error);
    // }
  }

  // handleChange = ({value}) => {
  //   this.setState({searchTerm: value}, ()=>this.searchBrands())
  // }

  // searchBrands = async () => {
  //   const response = await strapi.request('POST', '/graphql', {data: {query: `query { brands (where: { name_contains: "${this.state.searchTerm}" }) { _id name description image {url name } }}`}})
  //   this.setState({brands: response.data.brands, loadingBrands:false});
  // }

  render() {
    return (
      getToken() !== null ? 
      <Books/>
      :
      <Fragment>
        <div>Please <NavLink activeClassName="active" to='/signin'>Sign in</NavLink> or <NavLink activeClassName="active" to='/signup'>Sign up</NavLink> <a href=""></a></div>
      </Fragment>
      
    );
  }
}

export default App;