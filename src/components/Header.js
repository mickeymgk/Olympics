import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../util/firebase';

function Header() {
  return (
    <header className="p-2 fixed-top navbar-expand-sm bg-dark text-white">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
        </a>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" className="nav-link px-2 text-secondary">Games</a></li>
          <li><a href="#" className="nav-link px-2 text-secondary">Countries</a></li>
          <li><a href="#" className="nav-link px-2 text-white">Medals</a></li>
          <li><a href="#" className="nav-link px-2 text-white">Sports</a></li>
        </ul>

        <div className="text-end">
          {auth().currentUser ? <div>
               <button className="btn btn-outline-light" onClick={() => auth().signOut()}>Log out</button>
             </div>
            : <div>
               <Link className="btn btn-outline-light" to="/login">Sign in</Link>
               <Link className="btn btn-outline-light" to="/signup">Sign up</Link>
             </div>}
        </div>
      </div>
    </div>
   </header>
  );
}

export default Header;