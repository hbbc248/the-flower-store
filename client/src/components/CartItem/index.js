import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';

import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {

  const [, dispatch] = useStoreContext();

  const removeFromCart = item => {
    if(item.purchaseQuantity - 1 > 0){
        dispatch({
            type: UPDATE_CART_QUANTITY,
            _id: item._id,
            purchaseQuantity: parseInt(item.purchaseQuantity) - 1
        })
        idbPromise('cart','put', { ...item, purchaseQuantity: parseInt(item.purchaseQuantity) - 1 })
    } else {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id
        })
        idbPromise('cart','delete', {...item})
    }
};

  const onChange = (e) => {
    const value = e.target.value;

    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });

      idbPromise('cart', 'delete', { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });

      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
          className='m-1 img-thumbnail'
        />
      </div>
      <div>
        <div>
          <h5>{item.name}</h5> 
          <h6>${item.price}</h6>
          </div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            {' '}🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;