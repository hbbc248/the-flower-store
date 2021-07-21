import React from "react";
import Auth from "../../utils/auth";

function Footer () {
  
return (

    <footer className="text-center text-lg-start bg-light text-muted footer">

      <section>
        <div className="container text-center text-md-start mt-5">
       
          <div className="row mt-1 align-items-center">
         
            <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-4">
              <div>
                <a href='/'>
                <img className='card-img-top' alt='flowershop logo' src="../../images/flowerShopTransparentBg.png"/>
                </a>
              </div>
            </div>

            <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-md-0 mb-4">
      
              <h6 className="text-uppercase fw-bold mb-4">
                Useful links
              </h6>
              <p>
                <a href="/" className="text-reset">Shop</a>
              </p>
              <p>
                <a href="/login" className="text-reset">Login</a>
              </p>
              <p>
                <a href="/cart" className="text-reset">Cart</a>
              </p>
              <p>
                <a href="/aboutus" className="text-reset">About Us</a>
              </p>
              {
                Auth.loggedIn() ?
                    <p>
                      <a href="/profile" className="text-reset">Your Profile</a>
                    </p>
                    :
                    <p></p>
                }
            </div>
      
            <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-md-0 mb-4">
      
              <h6 className="text-uppercase fw-bold mb-4">
                Contact
              </h6>
              <p>1111 N Street <br/> Austin, Tx</p>
              <p>
              <a href="mailto:flower-shop-project-3@outlook.com">flower-shop-project-3@outlook.com</a>
              </p>
              <p> 1 (234)-567-8900</p>
              {/* <br/> */}
              <p>
              <i className="fab fa-facebook-square" alt='facebook logo'></i>{' '}
              <i className="fab fa-instagram" alt='instagram logo'></i>{' '}
              <i className="fab fa-twitter" alt='twitter logo'></i>{' '}
              <i className="fab fa-google" alt='google logo'></i>{' '}
                <br/>
              <i className="fab fa-stripe" alt='stripe logo'></i>
              </p>
            </div>

          </div>
       
        </div>
      </section>

      <div className="text-center p-4">
        © 2021 Created by:<br/>
        <a className="text-reset fw-bold" href="https://github.com/pilarbuchen">Pilar Buchen</a>{' '}|{' '}
        <a className="text-reset fw-bold" href="https://github.com/balloonicorn92">Fernanda Frers</a>{' '}|{' '}
        <a className="text-reset fw-bold" href="https://github.com/lacey-griffith">Lacey Griffith</a>{' '}|{' '}
        <a className="text-reset fw-bold" href="https://github.com/hbbc248">Ibrahim Zerlin</a>
      </div>
  
    </footer>

);

}

export default Footer;
