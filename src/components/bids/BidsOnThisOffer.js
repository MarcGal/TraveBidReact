import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import CreateBid from "../bids/CreateBid";
import bid from '../../lib/bid-service';
import BidsOnMap from "../bids/BidsOnMap"
import BidsOnOfferCard from "../bids/BidsOnOfferCard"
import styled from 'styled-components';
import '../../stylesheets/styles.css'
import { Link } from "react-router-dom";
import {notify} from '../notifications/index'

const BidSilderWrapper = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  margin-top: 5%;
  margin-bottom: 5%;
  margin-left: 5%;
  padding-bottom: 3%;
`;

const BidCarouselItem = styled.div`
  display: inline-block;
  width: 85%;
  padding:0;
  margin-right: 10%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border: ${ ({ status }) =>  status === 1 ? '2px solid green' : status === 2 ? '2px solid red' : '' };
  border-radius: 8px;
`;

const ItemSections = styled.div`
  display: flex;
  flex-direction: row;
`;


const RoomImageContainer = styled.div`
  margin:0;
  padding:0;
  height: 130px;
`;

const UserImageContainer = styled.div`
  margin:0;
  padding:0;
  margin-left: 10%;
  width: 75px;
`;

const RoomImage = styled.img`
  width: 150px;
  height:100%;
  border: 1px solid grey;
  margin:0;
  border-radius: 8px;
`;

const UserImage = styled.img`
  height: 75px;
  width: 75px;
  border: 1px solid grey;
  border-radius: 50%;
`;

const UserBidInfo = styled.div`
  padding:2%;
`;

const UserNameValue = styled.p`
  margin-left: 4%;
  margin-top: 2%;
`;

const HandleBidButtons = styled.button`
  background-color: white;
  width:30%;
  padding: 0;
  margin:0;
  margin-left: 5%;
  border:0;
  cursor: pointer;
`;

const HandleBidIcons = styled.img`
  width: 20px;
  padding:0;
  margin:0;
`;

const BidButtonContainer = styled.div`
  text-align:center;
  width: 100%;
  margin-bottom: 3%;
`;

const BidButton = styled.button`
  padding: 3%;
  background-color: white;
  border: 1px solid #4285F4;
  border-radius: 8px;
  margin-top: 2%;
  color: #4285F4;
`;


class BidsOnThisOffer extends Component {
  state = {
    bids: [],
    showBidButton: false,
    showBidForm: false,
    alreadyBidded : false,
    aBidHasBeenAccepted: false,
  }

  componentDidMount() {
    this.getBids()
  }

  getBids = () => {
    const ID = this.props.offerID;
    bid.getBids(ID)
    .then((responseData) => {
      //Bids are populated with user owner info
    this.setState({
        bids: responseData,
        showBidForm: false,
        showEditBidForm: false,
      })
    })
    .then(()=>{
      this.checkIfUserBidded();
    })
  }

  checkIfUserBidded = async () => {
      let bids = this.state.bids;
      await bids.forEach((bid)=>{
          if (this.props.user._id === bid.userID._id){
              this.setState({
                alreadyBidded: true,
              }) 
        }
      })
      await this.checkIfABidHasBeenAccepted(bids);
  }

  renderBidForm = e => {
    const { showBidForm } = this.state
    if (showBidForm === false ){
      this.setState({
        showBidForm: true,
       })
    } else if (showBidForm === true ){
      this.setState({
        showBidForm: false,
       })
    }
  }
 
  acceptBid = (bidID, Status, offerID) =>{
    bid.acceptBid({ bidID, Status, offerID })
    .then( () => {
      notify('Bid Accepted!', 'success');
      this.getBids()
    })
    .catch( error => console.log(error) )
  }

  declineBid = (bidID, Status) =>{
    bid.declineBid({ bidID, Status })
    .then( () => {
      notify('Bid declined!', 'success');
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

  showCreatedBidMessage = () => {
    notify('Bid successfully created!', 'success');
  }

  render() {
    const { bids, alreadyBidded, showBidForm, aBidHasBeenAccepted  } = this.state;
    const { offerOwner, offerID } = this.props;
    const currentUser = this.props.user._id;
    return (
      <div>

       { bids.length === 0 ? '' :
       <>
       <BidsOnMap offerID={this.props.offerID}/>
       <BidSilderWrapper>
          {bids.map((bid)=>{
            return (
              <BidCarouselItem status={ bid.Status } key={bid._id}>
                <BidsOnOfferCard bid={bid} declineBid={this.declineBid} acceptBid={this.acceptBid} />
                <ItemSections>
                  <Link to = {`/bid/${bid._id}`} >
                  <RoomImageContainer>
                    <RoomImage src={bid.roomID.roomImage} alt="roomImage"/>
                  </RoomImageContainer>
                  </Link>
                  <UserBidInfo>
                    <UserImageContainer>
                      <UserImage src={bid.userID.userImage} alt="userImage"/>
                    </UserImageContainer>
                    <UserNameValue> <strong>{bid.userID.username} / ${bid.value}</strong> </UserNameValue>
                   
                    { 
                      offerOwner._id === currentUser && aBidHasBeenAccepted === false && bid.Status === 0 ? 
                      <HandleBidButtons onClick= {()=>this.acceptBid(bid._id, 1, offerID)} > <HandleBidIcons src="/check.svg" alt=""/> </HandleBidButtons>
                      : <div></div>  
                    }

                    { 
                      offerOwner._id === currentUser && aBidHasBeenAccepted === false  && bid.Status === 0 ? 
                      <HandleBidButtons onClick={()=>this.declineBid(bid._id, 2)} > <HandleBidIcons src="/x_mark.svg" alt=""/> </HandleBidButtons>
                      : <div></div> 
                    }
                  </UserBidInfo>
                </ItemSections> 
              </BidCarouselItem>
            )
          })}
        </BidSilderWrapper>
        </>
       }

      { alreadyBidded === false && offerOwner._id !== currentUser ? 
        <BidButtonContainer><BidButton onClick={this.renderBidForm}>Place a Bid</BidButton></BidButtonContainer>  
      : <div></div>  }

      { showBidForm ?  < CreateBid offerID={offerID} getBids={this.getBids} showCreatedBidMessage={this.showCreatedBidMessage} checkIfUserBidded={this.checkIfUserBidded}/> : <div></div> }
      </div>
    );
  }
}

export default withAuth(BidsOnThisOffer);
