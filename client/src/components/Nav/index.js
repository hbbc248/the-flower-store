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
        <div className="navbar-nav text-center" >
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
  <header>
    <div className='text-center'>
      <Link className="navbar-brand" to="/">
        <img alt='flower shop logo' src='../../images/flowerShopLogo.png'/>
      </Link>
    </div>
    <nav className="navbar navbar-expand-lg justify-content-center">
      <button className="navbar-toggler navbar-light" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
        {showNavigation()}
      </div>
    </nav>
  </header>
  );
}

export default Nav;


