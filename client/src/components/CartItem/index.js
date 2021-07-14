import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';

import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {
  console.log(item)

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
    <div className='row justify-content-center align-items-center border p-3'>
      <div className='col-sm'>
        <img
          src={`/images/${item.image}`}
          alt=""
          className='m-1 img-thumbnail'
        />
      </div>
      <div className='col-sm'>
        <div>
          <h5>{item.name}</h5> 
        </div>
      </div>
      <div className='col-sm'>
        <div>
          <h6>${item.price}</h6>
        </div>
      </div>
      <div className='col-sm'>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            className='p-1 form-control'
            value={item.purchaseQuantity}
            onChange={onChange}
            // style={{width '18em'}}
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
  );
}

export default CartItem;