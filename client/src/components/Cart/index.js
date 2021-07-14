import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';

import { useStoreContext } from '../../utils/GlobalState';

import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {

    const [state, dispatch] = useStoreContext();

    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }

    function calculateTotal() {
        let sum = 0;
        state.cart.forEach(item => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        };

        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);

    
    if (!state.cartOpen) {
        return (
            <div className="cart-closed" onClick={toggleCart}>
                <span
                    role="img"
                    aria-label="trash">🛒</span>
            </div>
        );
    }
    return (
        <div className="cart">
            <div className="close" onClick={toggleCart}>Close</div>
            <h2>Flower Cart</h2>
            {state.cart.length ? (
                <div className='container'>
                    {state.cart.map(item => (
                        <CartItem key={item._id} item={item} />
                    ))}
                    <div className="flex-row space-between m-1">
                        <strong>Total: ${calculateTotal()}</strong>
                        <Link to="/cart">
                            <button className='btn ml-1'>
                                Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <h3>
                    Your cart is empty!
                </h3>
            )}
        </div>
    );
};
export default Cart;