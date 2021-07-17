import React from 'react';
import { Link } from 'react-router-dom';
import Cart from '../components/Cart'
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;
  let orders = [];
  if (data) {
    user = data.user;
    orders = user.orders;
  }

  // Ohh my god! This is the worst and most complicated algorithm I have done so far. I wish React can overwrite objects and arrays as simple Javascript.
  // new empty array for orders
  let newOrders = [];
  // Do this for each order on the array
  orders.forEach(order => {
    let singleOrder = order
    // get only products
    let products = [];
    if (singleOrder) {
      products = singleOrder.products;
    }
    // If there is products
    if (products) {
      // create new products array and quantities array
      const newProductsArray = [];
      const quantitiesArray = [];
      // While there is still products on initial array
      while (products.length > 0) {
        // Push first product into new array and get Id
        const firstProductId = products[0]._id;
        newProductsArray.push(products[0]);
        // filter Original array with Id to find out how many are the same. 
        const filterArray = products.filter((product => product._id === firstProductId))
        // Slice the ones that are the same from original array
        products = products.slice(filterArray.length);
        // push quantity into quantity array
        quantitiesArray.push({ "purchaseQuantity": filterArray.length });
      }
      // Blend both new arrays into one.
      const newArray = newProductsArray.map((item, i) => Object.assign({}, item, quantitiesArray[i]));
      // Get total pay for the order
      let totalPaid = 0;
      for (let i=0; i < newArray.length ; i++) {
        totalPaid = totalPaid + (newArray[i].price * newArray[i].purchaseQuantity);
      }
      const newTotalPaid =  totalPaid.toFixed(2);
      // blend old array, and push newArray and total paid into it
      const newSigleOrder = Object.assign({}, singleOrder, { productsNew: newArray, totalPaid: newTotalPaid })
      // Push final order array into newOrders array.
      newOrders.push(newSigleOrder);
    }
  });
  
  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Products</Link>

        {user ? (
          <>

            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
            {newOrders.map((order) => (
              <div>
              <button type="button" className="collapsible" data-toggle="collapse" data-target="#boogie">Order Date: {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</button>
                <div className="flex-row" key={order._id} >
                  {order.productsNew.map(({ _id, image, name, price, purchaseQuantity }, index) => (
                    <div key={index} className="card content collapse" id="boogie">
                      <Link to={`/products/${_id}`}>
                        <img className="card-img-top" alt={name} src={`/images/${image}`} />
                        <h2>{name}</h2>
                      </Link>
                      <div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">Price: ${price}</li>
                        <li className="list-group-item">Purchased Quantity:{purchaseQuantity}</li>
                        <li className="list-group-item">Total Paid: {order.totalPaid}</li>
                        <li className="list-group-item">Send to: {order.shipTo}</li>
                        <li className="list-group-item">Shipping address: {order.shipToAddress}</li>
                        <li className="list-group-item">Message: {order.message}</li>
                      </ul>
                      </div>
                      </div>
                  ))}
                </div>
              </div>
            ))}

          </>

        ) : null}
      </div>
      <Cart />
    </>
  );
}


export default OrderHistory;
