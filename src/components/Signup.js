import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup, signInWithGoogle } from "../helpers/auth";

export default class SignUp extends Component {

  constructor() {
    super();
    this.state = {
      error: null,
      email: '',
      password: '',
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
    this.setState({ error: '' });
    try {
      await signup(this.state.email, this.state.password);
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
                    <div className="text-center">
                      <div className="form-signin">
                        <form onSubmit={this.handleSubmit}>
                          <h1 className="h3 mb-3 fw-normal">Create a new account</h1>
                          {/* <p className="lead">Fill in the form below to create an account.</p> */}
                          <div className="form-floating">
                            <input className="form-control" placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email}></input>
                            <label>Email address</label>
                          </div>
                          <div className="form-floating">
                            <input className="form-control" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} type="password"></input>
                            <label>Password</label>
                          </div>
                          <div className="form-floating">
                            {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
                            <button className="btn w-100 btn-lg btn-primary" type="submit">Sign up</button>
                          </div>
                          {/* <p>You can also sign up with any of these services</p> */}
                          <button className="btn w-100 btn-lg btn-danger" type="button" onClick={this.googleSignIn}>Sign up with Google</button>
                          <hr></hr>
                          <p>Already have an account? <Link to="/login">Log in</Link></p>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
