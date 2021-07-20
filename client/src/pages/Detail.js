import React, { useEffect, useState } from 'react';
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';

import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_PRODUCTS } from '../utils/queries';
import spinner from '../assets/spinner.gif';

import Cart from '../components/Cart';

// indexedDB
import { idbPromise } from "../utils/helpers";

function Detail() {

  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({})

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id)

    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      // if we're updating quantity, use existing item data and increment purchaseQuantity value by one
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 }
      });
      // if product isn't in the cart yet, add it to the current shopping cart in IndexedDB
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  }

  const removeFromCart = () => {
    const itemToRemove = cart.find((cartItem) => cartItem._id === id)

    if (itemToRemove.purchaseQuantity - 1 > 0) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: itemToRemove._id,
        purchaseQuantity: parseInt(itemToRemove.purchaseQuantity) - 1
      })
      //updating current item in the cart
      idbPromise('cart', 'put', { ...itemToRemove, purchaseQuantity: parseInt(itemToRemove.purchaseQuantity) - 1 })
    } else {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: currentProduct._id
      })
      //delete the item from indexdb
      idbPromise('cart', 'delete', { ...currentProduct })
    }
  }

  return (
    <>
      {currentProduct ? (
        <div className="container">
          <Link to="/">← Back to Products</Link>
          <div className="card row">
            <div className="row">
              <div className="col-lg-4">
                <img
                  className="m-1 rounded mx-auto d-block"
                  src={`/images/${currentProduct.image}`}
                  alt={currentProduct.name}
                />
              </div>
              <div className="col-lg-8">
                <div className="card-body">
                  <h3 className="card-title">{currentProduct.name}</h3>

                  <p className="card-text">{currentProduct.description}</p>

                  <p className="card-text">
                    <strong>Price:</strong>{" "}${currentProduct.price}{' '}
                  </p>
                    <button className="btn mr-2" onClick={addToCart}>Add to cart</button>
                    <button className="btn"
                      disabled={!cart.find(p => p._id === currentProduct._id)} onClick={removeFromCart}>
                      Remove from Cart
                    </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
