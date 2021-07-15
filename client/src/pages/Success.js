import React, { useEffect } from "react";
import { useMutation } from '@apollo/client';
import Jumbotron from "../components/Jumbotron";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const products = cart.map(item => item._id);
      console.log(cart);
      console.log(products);

      const checkoutdetails = await idbPromise('checkout', 'get');
      console.log(checkoutdetails);

      const orderData = checkoutdetails[0];
      console.log (orderData); 

      orderData["products"] = products;

      console.log(orderData);

      
      if (orderData.products.length) {
        const { data } = await addOrder({ variables: {
          shipTo: orderData.shipTo,
          shipToAddress: orderData.shipToAddress,
          message: orderData.message,
          products: orderData.products,
        },
      });

        
        console.log(data);
        
      //  const productData = data.addOrder.products;
    
       // productData.forEach((item) => {
       //   idbPromise('cart', 'delete', item);
       // });
      }
      
      
      
      //setTimeout(() => {
      //  window.location.assign('/');
      //}, 3000);
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
