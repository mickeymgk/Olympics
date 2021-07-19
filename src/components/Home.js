import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

export default class HomePage extends Component {

  constructor(props) {
    super(props);
  }


  componentDidMount() {
    if (this.props.authenticated) {
      <Redirect to="/orders"/>
    }
  }

  render() {
    return (
      <div>
        <div className="container-scroller">
          <div className="container-fluid page-boady-wrapper full-page-wrapper">
            <div className="content-wrapper d-flex align-items-center auth px-0">
              <div className="row w-100 mx-0">
                <div className="col-lg-4 mx-auto">
                  <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                    <div className="text-center">
                      <div className="text-center">
                        <main className="form-signin">
                          {/* <img className="mb-4" alt="logo"/> */}
                          <h1 className="h3 mb-3 fw-normal">Create an account or login?</h1>
                          <Link className="btn w-100 btn-lg btn-primary" to="/signup">Create new Account</Link>
                          <hr />
                          <Link className="btn w-100 btn-lg btn-secondary" to="/login">Log in</Link>
                        </main>
                      </div>
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
