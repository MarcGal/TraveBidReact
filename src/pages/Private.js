import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";
import Offers from "../components/Offers";
import SearchOffers from "../components/SearchOffers";
import offer from '../lib/offer-service';
import Maps3 from "../components/Maps3";


class Private extends Component {
  constructor(props){
    super(props);
    this.state = {
        bids: [],
    }
  }

  getAllOffers = () => {
    offer.showOfferList(this.props.user._id)
    .then(responseData => {
        this.setState({
          offers: responseData
        })
    })
    .catch( error => console.log(error) )
  }

  componentDidMount() {
    this.getAllOffers();
  }
  

  render() {
    return (
      <div>
        <Navbar />
        <h1>Welcome {this.props.user.username}</h1>
        <SearchOffers/>
        <Offers />
        <Maps3 />
      </div>
    );
  }
}

export default withAuth(Private);
