import React from 'react';
import { Link } from 'react-router-dom';
import Cart from '../components/Cart'
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { Accordion } from 'react-bootstrap';

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
  console.log(newOrders)
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
      for (let i = 0; i < newArray.length; i++) {
        totalPaid = totalPaid + (newArray[i].price * newArray[i].purchaseQuantity);
      }
      const newTotalPaid = totalPaid.toFixed(2);
      // blend old array, and push newArray and total paid into it
      const newSigleOrder = Object.assign({}, singleOrder, { productsNew: newArray, totalPaid: newTotalPaid })
      // Push final order array into newOrders array.
      newOrders.push(newSigleOrder);
    }
  });

  // console.log(newOrders);

  return (

<>
      <div className="container my-1">
        <Link to="/">← Back to Products</Link>
        {user ? (
          <>
            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
            <div className="flex-row accordion" id="accordionExample" >
              {newOrders.map((order) => (
                <div key={order._id} className="card">
                  <div className="card-header" id="headingTwo">
                    <h2 className="mb-0 orderButton">
                      <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target={"#collapse" + order._id} aria-expanded="true" aria-controls="collapse">
                        Order Placed On: {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                      </button>
                    </h2>
                  </div>
                  <div id={"collapse" + order._id} className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                    <div className="card-body">
                      <h5 className="card-title text-center">
                        Order Details:
                      </h5>
                      {order.productsNew.map((product) => (
                        <div key={product._id} className="row border-top pt-2 mb-2 mx-3 align-items-center">
                          <Link to={`/products/${product._id}`} className="col-sm-3">
                            <img className="card-img-left" alt={product.name} src={`/images/${product.image}`} />
                          </Link>
                          <div className="col-sm-5">
                            <Link to={`/products/${product._id}`} className="col-md-3">
                              <h5 className="text-center">{product.name}</h5>
                            </Link>
                          </div>
                          <div className="col-sm-2">
                            <h6 className="text-center">Qty: {product.purchaseQuantity}</h6>
                          </div>
                          <div className="col-sm-2">
                            <h6 className="text-center">${product.price} Each</h6>
                          </div>
                        </div>
                      ))}
                      <div className="list-group-item">
                        <h6 className="text-right mr-4 my-2">Total Paid: ${order.totalPaid}</h6>
                        <h6 className="">Send to: {order.shipTo}</h6>
                        <h6 className="">Shipping address: {order.shipToAddress}</h6>
                        <h6 className="">Personalized message: "{order.message}"</h6>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
      <Cart />
    </>
  )
    };

export default OrderHistory;
