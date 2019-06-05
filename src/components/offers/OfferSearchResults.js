import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";
import transformDate from "../../functions/dates"
import styled from 'styled-components';

const OffersContainer = styled.div`
  padding-top: 20%;
  height: 100%;
  background-color: #F8F9FA;
`;

const Offer = styled.div`
    margin-right:5vw;
    padding-left:12%;
    position:relative;
    margin-top:10%;
    display:flex;
    flex-direction:row;
`;

const UserInfo = styled.div`
  max-width: 200px;
  display: flex;
  flex-direction: row;
  max-width: 250px;
`;
const UserText = styled.div`
  width: 50%;
  margin-left: 5%;
`;

const UserImage = styled.img`
  border-radius: 50%;
  height: 100px;
  width: 100px;
`;

class OfferSearchResults extends Component {
  state = {
    offerOrder: '',
    showFilterDates: false,
  }


  handleChange = (event) => {
    if (event.target.value === 'lowToHigh' ){
      this.props.orderOffersLowToHighPrice()
      this.setState({
        showFilterDates: false,
      })
    } else if (event.target.value === 'highToLow' ){
      this.props.orderOffersHighToLowPrice()
      this.setState({
        showFilterDates: false,
      })
    } else if (event.target.value === 'date' ){
      this.setState({
        showFilterDates: true,
      })
    }
  }

  handleFormSubmit = () =>{
    
  }

  render() {
    const { offers } = this.props
    const {showFilterDates} = this.state;
    return (

      <div>
        {offers.length >=1 ? 
        <OffersContainer>
          <select style={{margin: '5%'}} value={this.state.offerOrder} onChange={this.handleChange}>
            <option>Sort by</option>
            <option value="lowToHigh">Price from lowest to highest</option>
            <option value="highToLow">Price from highest to lowest</option>
            <option value="date">Choose dates</option>
          </select>
          { showFilterDates === false ? '' : 
          <form onSubmit={this.handleFormSubmit}>
            <label>From</label>
            <input type="date" name="from"></input>
            <label>Until</label>
            <input type="date" name="until"></input>
            <button type="submit" value="Submit">Filter</button>
          </form>
          }
          {offers.map((offer)=>{
           const from = transformDate(offer.from)
           const until = transformDate(offer.until)
           return(
             <Offer key={offer._id}>
               <Link to={`/Offer/${offer._id}`}>
                  <UserInfo>
                    <UserImage src={offer.userID.userImage} alt="userImage"></UserImage>
                    <UserText>
                      <p style={{paddingTop: "2%"}}> <strong>{offer.userID.username}/${offer.budget}</strong> </p>
                      <p style={{width: "150px"}}>From: {from} Until:{until} </p>
                    </UserText>
                  </UserInfo> 
               </Link>
             </Offer>
           )
          })}
        </OffersContainer>
      : '' }
      </div>
    )
  }
}

export default withAuth(OfferSearchResults);
