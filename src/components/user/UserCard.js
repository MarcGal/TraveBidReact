import React, { Component } from 'react'
import styled from 'styled-components';
import { Spinner } from 'reactstrap';

const UserCardStyle = styled.div`
  width:100%;
  display:;
  color: black;
  border-style: none;
  border-color: black;
  border-width: 1px;
  padding: 5%, 0%;
  box-shadow: 5px  10px 10px grey;
  margin-top:15%;
`;
const ImageStyle = styled.img`
  max-width: 100%;
  max-height: 100%;
`
const DescriptionArea = styled.div`
  padding: 1.5em;
`

export default class UserCard extends Component {
  render() {
    const {userImage,username,age, description, city} = this.props
    return (
      <UserCardStyle>
        <div>
          {userImage !== undefined? <ImageStyle src={userImage} alt={username}/>:<Spinner/> }
        </div>
        <DescriptionArea>
        {username !== undefined? <h2>{username}, {age}</h2>:<Spinner/> }
        {description !== undefined? <p>{description}</p>:<Spinner/> }
          <h3>{city}</h3>
        </DescriptionArea>
      </UserCardStyle>
    )
  }
}
