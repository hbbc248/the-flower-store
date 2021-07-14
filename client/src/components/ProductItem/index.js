import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import '../../index.css';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';

// indexedDB cart
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
  const {
    image,
    name,
    _id,
    price
  } = item;

  const [state, dispatch] = useStoreContext();

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="col-12 col-md-6 col-xl-3 p-1">
      <div className="card p-1">
        <Link to={`/products/${_id}`}>
          <img
            className="card-img-top mb-1"
            alt={name}
            src={`/images/${image}`}
          />

          <h6 className="card-title text-center">{name}</h6>
        </Link>
        <div>
          <div></div>
          <h6 className="text-center">${price}</h6>
        </div>
        <button className="btn" onClick={addToCart}>Add to cart</button>

      </div>
    </div>
  );
}

export default ProductItem;
