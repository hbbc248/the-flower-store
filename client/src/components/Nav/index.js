import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <div  className="navbar-nav" >
          <div >
            <Link className="nav-item nav-link" to="/">
              Products
            </Link>
          </div>
          <div >
            <Link className="nav-item nav-link" to="/orderHistory">
              Order History
            </Link>
          </div>
          <div className="nav-item nav-link">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div className="navbar-nav" >
          <div>
            <Link className="nav-item nav-link" to="/">
              Products
            </Link>
          </div>
          <div >
            <Link className="nav-item nav-link" to="/signup">
              Signup
            </Link>
          </div>
          <div>
            <Link className="nav-item nav-link" to="/login">
              Login
            </Link>
          </div>
        </div>
      );
    }
  }

  return (
    <header >
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand"to="/">
          <span role="img" aria-label="shopping bag">💐</span>
          The Flower Shop
        </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        {showNavigation()}
        </div>
      </nav>
    </header>
  );
}

export default Nav;

