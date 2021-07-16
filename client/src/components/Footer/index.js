import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_CATEGORY } from "../../utils/actions";


function Footer () {
  const [state, dispatch] = useStoreContext();
  console.log(state.categories)
  const { categories } = state

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
             
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>The Flower shop
              </h6>
              <p>
                
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
     
              <h6 className="text-uppercase fw-bold mb-4">
                Categories
              </h6>
              {state.categories.map(category => (
              <p>
                  <a className="text-reset" onClick={() => handleClick(category._id)}>{category.name}</a>
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
            </div>
      
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
      
              <h6 className="text-uppercase fw-bold mb-4">
                Contact
              </h6>
              <p><i className="fas fa-home me-3"></i> New York, NY 10012, US</p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                theflowershop@example.com
              </p>
              <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
              <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
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