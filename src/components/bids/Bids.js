import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import bid from '../../lib/bid-service';
import EditBid from "../bids/EditBid";
import styled from 'styled-components';
import '../../stylesheets/styles.css'
import Loader from 'react-loader-spinner'
import BidCarousel from "../bids/BidCarousel";
import {notify} from '../notifications/index'

const NoBidMessage = styled.h6`
  padding-top: 8%;
  padding-bottom:10%;
  margin-left: 5%;
`;
const BidTitle = styled.h5`
  margin-left: 2em;
`;

const BidTitle = styled.h5`
  margin-left: 3%;
`;

class Bids extends Component {
    state = {
        bids: [],
        showEditButton: false,//button to edit bid
        showEditBidForm: false,//bid edit form
        bidtoEdit:{},
        loaded: false,
    }

  componentDidMount() {
    this.getUserBids();
  }

  componentWillUnmount(){
    this.setState({
      loaded: false,
    })
  }

  getUserBids = () => {
    bid.getUserBids(this.props.user._id)
    .then(responseData => {
      if (responseData !== undefined){
        this.setState({
          bids: [...responseData.bids],
          showEditBidForm: false,
          loaded: true,
        })
      }
    })
    .catch( error => console.log(error) )
  }

  renderEditBidForm = (bid) => {
    const { showEditBidForm } = this.state
    if (showEditBidForm === false){
       this.setState({
       showEditBidForm: true,
       bidtoEdit: bid,
      })
    } else if (showEditBidForm === true ){
      this.setState({
      showEditBidForm: false,
      bidtoEdit: bid,
     })
    }
  }

  deleteBid = (bidID) => {
    bid.deleteBid(bidID)
    .then(()=>{
      notify('Bid successfully deleted', 'success');
      this.getUserBids()
    })
  }
  

  render() {
    const { bids, showEditBidForm, bidtoEdit, loaded } = this.state;
    const currentUser = this.props.user._id;
    return (
      <div>
        <BidTitle>Your Bids</BidTitle>
        {loaded === false ? 
          <>
            <Loader 
              type="Puff"
              color="lightblue"
              height="60"	
              width="60"
            /> 
          </>  :
          <>
            {bids.length === 0 ?

              <NoBidMessage>You have no bids, create one!</NoBidMessage> 
            :
              <BidCarousel 
              currentUser={currentUser} 
              bids={bids} 
              deleteBid={this.deleteBid} 
              renderEditBidForm={this.renderEditBidForm} 
              />
            }
          </>
          }
      { showEditBidForm ? <EditBid bidID={bidtoEdit._id} description={bidtoEdit.description} value={bidtoEdit.value} Status={bidtoEdit.Status} getBids={this.getUserBids} /> : <div></div>}
      </div>
    );
  }
}

export default withAuth(Bids);
