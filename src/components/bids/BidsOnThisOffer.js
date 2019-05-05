import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import EditBid from "../bids/EditBid";
import CreateBid from "../bids/CreateBid";
import bid from '../../lib/bid-service';


class BidsOnThisOffer extends Component {
  state = {
    bids: [],
    showEditButton: false,//button to edit bid
    showEditBidForm: false,//bid edit form
    showBidButton: false,//button to create bid
    showBidForm: false,//form to create bid
    alreadyBidded : false,
    aBidHasBeenAccepted: false,
  }

  componentDidMount() {
    this.getBids();
  }

  getBids = () => {
    const ID = this.props.offerID;
    bid.getBids(ID)
    .then(responseData => {
      this.setState({
        bids: responseData,
        showBidForm: false,
        showEditBidForm: false,
      })
      this.checkIfUserBidded();
    })
    if (this.state.offerOwner !== this.props.user._id){
      this.setState({
        showBidButton: true,
      })
    } else if (this.state.offerOwner === this.props.user._id) {
      this.setState({
        showEditButton: true,
      })
    }
  }

  checkIfUserBidded = async () => {
      let bids = this.state.bids;
      await bids.forEach((bid)=>{
          if (this.props.user._id === bid.userID){
           this.setState({
            alreadyBidded: true,
          }) 
        }
      })
      await this.checkIfABidHasBeenAccepted(bids);
  }

  renderBidForm = e => {
    this.setState({
      showBidForm: true,
     })
  }

  renderEditBidForm = (e) => {
    this.setState({
      showEditBidForm: true,
     })
  }


  deleteBid = (bidID) => {
    bid.deleteBid(bidID)
    .then(()=>{
      this.getBids()
    })
  }

 
  acceptBid = (bidID, Status, offerID) =>{
    bid.acceptBid({ bidID, Status, offerID })
    .then( () => {
      this.getBids()
    })
    .catch( error => console.log(error) )
  }

  declineBid = (bidID, Status) =>{
    bid.declineBid({ bidID, Status })
    .then( () => {
      this.getBids()
    })
    .catch( error => console.log(error) )
  }

  checkIfABidHasBeenAccepted = async (bids) => {
    await bids.forEach((bid)=>{
      if (bid.Status === 1){
       this.setState({
        aBidHasBeenAccepted: true,
      }) 
     }
   })
  }


  render() {
    const { bids, alreadyBidded, showBidForm, showEditBidForm, aBidHasBeenAccepted  } = this.state;
    const { offerOwner, offerID } = this.props;
    const currentUser = this.props.user._id;

    return (
      <div>
        {bids.map((bid)=> {
          return (
            <div key={bid._id}>
              <p>----------------------------------------</p>
              <p>Description: {bid.description}</p>
              <p>Value: {bid.value} </p>
              { bid.userID === currentUser ? <button onClick={()=>this.deleteBid(bid._id)}>Delete</button> : <div></div> }
              { bid.userID === currentUser ? <button onClick={this.renderEditBidForm}>Edit</button>:  <div></div>  }
              { showEditBidForm ? <EditBid bidID={bid._id} description={bid.description} value={bid.value} Status={bid.Status} getBids={()=> this.getBids()} /> : <div></div>}
              
              { 
                offerOwner === this.props.user._id && aBidHasBeenAccepted === false && bid.Status === 0 ? 
                <button onClick= {()=>this.acceptBid(bid._id, 1, offerID)}> Accept</button> 
                : <div></div>  
              }

              { 
                offerOwner === this.props.user._id && aBidHasBeenAccepted === false  && bid.Status === 0 ? 
                <button onClick={()=>this.declineBid(bid._id, 2) }> Decline</button> 
                : <div></div> 
              } 
              <p>--------------------------------------------</p>
            </div>
          )
        })}
      { alreadyBidded === false && offerOwner !== currentUser ?  <button onClick={this.renderBidForm}>Bid</button> : <div></div>  }
      { showBidForm ?  < CreateBid offerID={offerID} getBids={()=> this.getBids()} checkIfUserBidded={()=>this.checkIfUserBidded()}/> : <div></div> }
      </div>
    );
  }
}

export default withAuth(BidsOnThisOffer);
