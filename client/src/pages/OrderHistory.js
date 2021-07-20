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
            <div className="accordion flex-row" id="accordionExample">
            {newOrders.map((order, index) => (
 <div class="card">
 <div class="card-header" id="headingOne">
   <h2 class="mb-0">
     <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
       Collapsible Group Item #1
     </button>
   </h2>
 </div>

 <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
   <div class="card-body">
     Some placeholder content for the first accordion panel. This panel is shown by default, thanks to the <code>.show</code> class.
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
