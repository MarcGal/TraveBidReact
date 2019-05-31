import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LandingBack = styled.div`
 background-image: url("/landing_sunset.jpg");
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  object-fit: cover;
  background-size: cover; 
`;

const Title = styled.h1`
 font: "Lucida Grande", Helvetica, Arial, sans-serif; 
 margin-left: 27%;
 margin-right: 27%;
 margin-top: 30%;
 color: white;
`;

const HeaderTextContainer = styled.div`
  text-align: center;
  color: white;
`;


const Button = styled.button`
  color: white;
  background-color: Transparent;
  border: 1px solid white;
  border-radius: 8px;
  display: block;
  margin-left: 25%;
  margin-right: 24%;
  margin-top: 24%;
  padding: 5%;
  width: 50%
`;

const Signup = styled.p`
  margin-left: 25%;
  color: white;
  margin-top: 20%;
`;



class Landing extends Component {

  render() {
    return (
     <LandingBack>
       <HeaderTextContainer>
        <Title>TravelBID</Title>
        <p>Traveling on your own terms has never been easier</p>
       </HeaderTextContainer>
       <Button><Link style={{color: "white"}} to={"/login"}> Login </Link></Button>
       <Signup>Not a member yet?<Link to={"/signup"}> Signup</Link></Signup>
     </LandingBack>
    );
  }
}

export default withAuth(Landing);
