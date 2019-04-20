import React, { Component } from "react";
import { Switch } from "react-router-dom";

import Private from "./pages/Private";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Landing from "./pages/Landing";

import PrivateRoute from "./components/PrivateRoute";
import AnonRoute from "./components/AnonRoute";
import AuthProvider from "./lib/AuthProvider";
import OfferDetail from "./pages/OfferDetail";

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Switch>
            <AnonRoute exact path="/" component={Landing} />
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute path="/private" component={Private} />
            <PrivateRoute exact path="/offer/:id" component={OfferDetail} />
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
