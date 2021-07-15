import React, { useEffect } from "react";
import { useMutation } from '@apollo/client';
import Jumbotron from "../components/Jumbotron";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";

function Success() {
  const [addOrder, { error }] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const products = cart.map(item => item._id);
      const checkoutdetails = await idbPromise('checkout', 'get');
      const orderData = checkoutdetails[0];
      orderData["products"] = products;
      const data = {};
      if (orderData.products.length) {

        try {
          const data = await addOrder({
            variables: {
              shipTo: orderData.shipTo,
              shipToAddress: orderData.shipToAddress,
              message: orderData.message,
              products: orderData.products,
            },
          });         
          
          idbPromise('cart', 'clear');
         
        } catch (e) {
          console.log(e);
        }
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>
          Thank you for your purchase!
        </h2>
        <h2>
          You will now be redirected to the home page
        </h2>
      </Jumbotron>
    </div>
  );
};

export default Success;
