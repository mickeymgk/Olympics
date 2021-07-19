import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Games from "./components/Games";
import Countries from "./components/Countries";
import Sports from "./components/Sports";
import ZooKeeper from "./components/ZooKeeper";
import { auth } from "./util/firebase";
import './styles.css';
import AdminService from './services/Admin';

//privare route requires auth. Also cannot be hacked by editing the react app state thanks to session based auth of fb.
function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
      }
    />
  );
}

//public routes does not require auth
function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === false ? (
          <Component {...props} />
        ) : (<Redirect to="/games" />)
      }
    />
  );
}

class App extends Component {

  emptyAdmin = {
    name: '',
    email: ''
  }

  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
      admin: this.emptyAdmin
    };
    this.add = this.add.bind(this);
  }

  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        let admin = {
          name: user.displayName,
          email: user.email
        };
        this.setState({
          authenticated: true,
          loading: false,
          admin: admin
        });
        this.add(user.uid, admin);
      } else {
        this.setState({
          authenticated: false,
          loading: false
        });
      }
    });
  }

  async add(uid, admin) {
    AdminService.addAdmin(uid, admin);
  }

  render() {
    // if the comps are loading display a spinner
    return this.state.loading === true ? (
      <div className="spinner spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    ) : (
        <Router>
          <Switch>
            <Route exact path="/" authenticated={this.state.authenticated} component={Home} />
            <PrivateRoute
              path="/games"
              authenticated={this.state.authenticated}
              component={Games}
            />
            <PrivateRoute
              path="/countries"
              authenticated={this.state.authenticated}
              component={Countries}
            />
            <PrivateRoute
              path="/sports"
              authenticated={this.state.authenticated}
              component={Sports}
            />
            <PublicRoute
              path="/signup"
              authenticated={this.state.authenticated}
              component={Signup}
            />
            <PublicRoute
              path="/login"
              authenticated={this.state.authenticated}
              component={Login}
            />
            <PrivateRoute
              path="/zookeeper"
              authenticated={this.state.authenticated}
              component={ZooKeeper}
            />
          </Switch>
        </Router>
      );
  }
}

export default App;
