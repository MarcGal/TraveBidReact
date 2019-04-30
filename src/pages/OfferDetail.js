import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";
import CreateBid from "../components/CreateBid";
import EditBid from "../components/EditBid";
import offer from '../lib/offer-service';
import bid from '../lib/bid-service';
// import Map from "../components/Map";



class OfferDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
        bids: [],
        showEditButton: false,
        showBidButton: false,
        showBidForm: false,
        showEditBidForm: false,
        budget: "",
        from: "",
        until:"",
        offerOwner:"" 
    }
  }


  renderBidForm = (e) => {
    this.setState({
      showBidForm: true,
     })
  }

  renderEditBidForm = (e) => {
    this.setState({
      showEditBidForm: true,
     })
  }

  getOffer = () => {
    const offerID = this.props.match.params.id;
    offer.getOffer(offerID)
    .then(responseData => {
        this.setState({
          budget: responseData.budget,
          from: responseData.from,
          until: responseData.until,
          offerOwner: responseData.userID,
        })
        if (this.state.userID !== this.props.user._id){
          this.setState({
            showBidButton: true,
          })
        } else if (this.state.userID === this.props.user._id) {
          this.setState({
            showEditButton: true,
          })
        }
    })
    .catch( error => console.log(error) )
  }

  getBids = () => {
    const offerID = this.props.match.params.id;
    bid.getBids(offerID)
    .then(responseData => {
      this.setState({
        bids: responseData,
        showBidForm: false,
      })
    })
  }

  componentDidMount() {
    this.getOffer();
    this.getBids();
  }

  deleteBid = (bidID) => {
    bid.deleteBid(bidID)
    .then(()=>{
      this.getBids()
    })
  }

  // acceptBid = (bidID) => {
  //   bid.acceptBid(bidID)
  //   .then(responseData => {
  //     this.setState({
  //       bids: responseData,
  //       showBidForm: false,
  //     })
  //   })
  // }
  // rejectBid = (bidID) => {
  //   bid.rejectBid(bidID)
  //   .then(responseData => {
  //     this.setState({
  //       bids: responseData,
  //       showBidForm: false,
  //     })
  //   })
  // }

  render() {
    const { showBidForm, from, until } = this.state;
    const fromISO = new Date(from);
    const fromGood = fromISO.getFullYear()+'-' + (fromISO.getMonth()+1) + '-'+fromISO.getDate();
    const untilISO = new Date(until);
    const untilGood = untilISO.getFullYear()+'-' + (untilISO.getMonth()+1) + '-'+untilISO.getDate();
    const offerID = this.props.match.params.id;
    const currentUser = this.props.user._id;
    const {bids, offerOwner} = this.state;
    return (
      <div>
        <Navbar />
        <h1>We are in offer detail</h1>
        <h5>{this.state.budget}</h5>
        <h5>{fromGood}</h5>
        <h5>{untilGood}</h5>
        {bids.map((bid)=> {
          const { showEditBidForm } = this.state
          console.log(bid.userID, offerOwner)
          return (
            <div key={bid._id}>
              <p>Description: {bid.description}</p>
              <p>Value: {bid.value} </p>
              {bid.userID !== offerOwner ? <div></div> : <button onClick={()=>this.deleteBid(bid._id)}>Delete</button> }
              {bid.userID !== offerOwner ? <div></div> : <button onClick={this.renderEditBidForm}>Edit</button>  }
              { showEditBidForm ? <EditBid bidID={bid._id} description={bid.description} value={bid.value} getBids={()=> this.getBids()} /> : <div></div>}
              {/* {bid.userID !== this.props.user._id ? <button onClick={this.acceptBid(bid._id)}>Accept</button> : <div></div> }
              {bid.userID !== this.props.user._id ? <button onClick={this.rejectBid(bid._id)}>Reject</button> : <div></div> } */}
            </div>
          )
        })}
        {/* <Map/> */}
        { currentUser !== offerOwner? <button onClick={this.renderBidForm}>Bid</button> : <div></div> }
        {showBidForm ?  < CreateBid offerID={offerID} getBids={()=> this.getBids()}/> : <div></div>}
      </div>
    );
  }
}

export default withAuth(OfferDetail);
