import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Form, FormGroup, Label, Input } from 'reactstrap';

class UserLogin extends Component {
  state = {
    username: "",
    password: ""
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.login({ username, password });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;
    return (
      // <form onSubmit={this.handleFormSubmit}>
      //   <label>Username:</label>
      //   <input
      //     type="text"
      //     name="username"
      //     value={username}
      //     onChange={this.handleChange}
      //   />
      //   <label>Password:</label>
      //   <input
      //     type="password"
      //     name="password"
      //     value={password}
      //     onChange={this.handleChange}
      //   />
      //   <input type="submit" value="Login" />
      // </form>
      <Form onSubmit={this.handleFormSubmit}>
        <FormGroup>
        <Label>Username:</Label>
        <Input
          type="text"
          name="username"
          value={username}
          onChange={this.handleChange}
        />
        </FormGroup>
        <FormGroup>
        <Label>Password:</Label>
        <Input
          type="password"
          name="password"
          value={password}
          onChange={this.handleChange}
        />
        </FormGroup>
        <Input type="submit" value="Login" />
     </Form>
    );
  }
}

export default withAuth(UserLogin);
