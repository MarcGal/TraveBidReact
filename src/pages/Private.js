import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";
import Offers from "../components/offers/Offers";
import Bids from "../components/bids/Bids";
import OfferSearchResults from "../components/offers/OfferSearchResults";
import offer from '../lib/offer-service';

class Private extends Component {
  state = {
    offers: [],
    showSearchResults: false,
    response:'',
  }

  handleShowSearchResults = async (e) => {
    await this.search()
    const { showSearchResults } = this.state
    if (showSearchResults === false) {
      this.setState({
        showSearchResults: true
      })
    } else if  (showSearchResults === true) {
      this.setState({
        showSearchResults: false
      })
    }
  }

  search = () => {
    const city = this.props.user.city
    offer.searchOffers(city)
      .then(responseData => {
        this.setState({
          offers: responseData
        })
      })
      .catch( error => console.log(error) )
  }

  orderOffersLowToHighPrice = async () => {
    const { offers } = this.state;
    const compare = (a , b ) => {
      const priceA = a.budget;
      const priceB = b.budget;
      let comparison = 0;
      if (priceA > priceB) {
        comparison = 1;
      } else if (priceA < priceB) {
        comparison = -1;
      }
      return comparison;
    }
    const orderedOffers = [...offers].sort(compare);
    this.setState({
      offers: orderedOffers
    })
  }

  orderOffersHighToLowPrice = async () => {
    const { offers } = this.state;
    const compare = (a , b ) => {
      const priceA = a.budget;
      const priceB = b.budget;
      let comparison = 0;
      if (priceA < priceB) {
        comparison = 1;
      } else if (priceA > priceB) {
        comparison = -1;
      }
      return comparison;
    }
    const orderedOffers = [...offers].sort(compare);
    this.setState({
      offers: orderedOffers
    })
  }

  filterOffersBydate = async (from, until) => {
    const { offers } = this.state;
    const fromTrans = new Date(from)
    const untilTrans = new Date(until)
    const filteredOffers = [];
    await offers.map(async (offer) => {
      const from1 = new Date (offer.from)
      const until1 = new Date (offer.until)
      if (from1 >= fromTrans && until1 <= untilTrans){
        await filteredOffers.push(offer)
      }
      return this.setState({
        offers: [...filteredOffers],
      })
    })
  }

  render() {
    const { showSearchResults, offers } = this.state;
    return (
    <div>
      <Navbar 
        handleShowSearchResults={this.handleShowSearchResults} 
        location={this.props.location.pathname} 
        />
      { showSearchResults ? 
        <OfferSearchResults offers={offers} 
          orderOffersLowToHighPrice = {this.orderOffersLowToHighPrice}
          orderOffersHighToLowPrice = {this.orderOffersHighToLowPrice}
          filterOffersBydate = {this.filterOffersBydate}
          /> : <div></div> }
      <Offers />
      <Bids/>
    </div>
    );
  }
}

export default withAuth(Private);
