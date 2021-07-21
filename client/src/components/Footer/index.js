import React, { useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_CATEGORY, UPDATE_CATEGORIES } from "../../utils/actions";
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useQuery } from '@apollo/client';

import Auth from "../../utils/auth";

function Footer () {
  const [state, dispatch] = useStoreContext();

  const { categories } = state

  const { loading, data } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: data.categories
      })
    }
  }, [data, loading, dispatch])

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };

return (

    <footer className="text-center text-lg-start bg-light text-muted footer">

      <section className="">
        <div className="container text-center text-md-start mt-5">
       
          <div className="row mt-3">
         
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <div>
                <a href='/'>
                <img className='card-img-top' alt='flowershop logo' src="../../images/flowerShopTransparentBg.png"/>
                </a>
              </div>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
     
              <h6 className="text-uppercase fw-bold mb-4">
                Categories
              </h6>
              {categories.map(category => (
              <p key={category.name}>
                <button className ='text-reset bg-light' key={category.id} onClick={() => handleClick(category._id)}>{category.name}</button>
              </p>
              ))}
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
      
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
      
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
      
              <h6 className="text-uppercase fw-bold mb-4">
                Contact
              </h6>
              <p>Austin, Tx</p>
              <p>
                flowershop@example.com
              </p>
              <p> 1 (234)-567-8900</p>
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
