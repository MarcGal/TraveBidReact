import React, { Component } from 'react';
import Geocode from "react-geocode";



class Map2 extends Component {
  state = {
    address:"",
  }
  
 
geocoder = () =>{
  Geocode.setApiKey("AIzaSyC5DCNwVuCJ3Da5V2oy-PB2J_7S42YXzCM");
  const  {address} = this.state;
  Geocode.fromAddress(address)
    .then(
    response => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(response, this.state);
    },
    error => {
      console.error(error);
    }
  );
}

  // handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   const { location, budget, from, until } = this.state;
  //   offer.create({ location, budget, from, until })
  //   .then( () => {
  //       this.setState({
  //         location:"",
  //         budget: "",
  //         from: "",
  //         until:"", 
  //       })
  //   })
  //   .catch( error => console.log(error) )
  // }

  handleChange = (event) => {
      const { name, value } = event.target;
      this.setState({[name]: value})
  }



  // handleChange = (event) => {
  //   const { name, value } = event.target;
  //   this.setState({[name]: value}).then( () => {
  //     this.geocoder(this.state.address)
  //     })

  // }

  render() {
    return(
      <div>
       <form onSubmit={this.geocoder}>
         <label>Address:</label>
         <input type="text" name="address" value={this.state.address} onChange={e => this.handleChange(e)}/>
         <input type="submit" value="Submit" />
       </form>
      </div>
    )
  }
}

export default Map2;