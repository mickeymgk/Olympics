import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGoogle } from "../helpers/auth";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: "" });
    try {
      await signin(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async googleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <div className="container-scroller">
        <div className="container-fluid page-boady-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                  <div className="text-center">
                    <div className="form-signin">
                      <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <h1 className="h3 mb-3 fw-normal">Log in to your account</h1>
                        <div className="form-floating">
                          <input type="email" className="form-control"
                            id="floatingInput" placeholder="name@gmail.com"
                            name="email"
                            onChange={this.handleChange}
                            value={this.state.email}
                          />
                          <label>Email address</label>
                        </div>
                        <div className="form-floating">
                          <input type="password" className="form-control"
                            id="floatingInput" placeholder="name@gmail.com"
                            name="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                          />
                          <label>Password</label>
                        </div>
                        <div className="form-group">
                          {this.state.error ? (
                            <p className="text-danger">{this.state.error}</p>
                          ) : null}
                          <button className="btn w-100 btn-lg btn-primary" type="submit">Log in</button>
                        </div>
                        {/* <p>You can also log in with any of these services</p> */}
                        <button className="btn w-100 btn-lg btn-danger" type="button" onClick={this.googleSignIn}>
                          Log in with Google</button>
                        <hr />
                        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
