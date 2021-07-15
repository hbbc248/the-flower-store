import React, { useEffect } from "react";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../utils/actions";
import { idbPromise } from "../utils/helpers";
import CartItem from '../components/CartItem';
import Auth from '../utils/auth';
import '../components/Cart/style.css';
import { Link } from "react-router-dom";

import { useStoreContext } from '../utils/GlobalState';

import { QUERY_CHECKOUT } from '../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const CartPage = () => {

    const [state, dispatch] = useStoreContext();

    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

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

    function submitCheckout() {
        const productIds = [];

        state.cart.forEach((item) => {
            for (let i = 0; i < item.purchaseQuantity; i++) {
                productIds.push(item._id);
            }
        });

        getCheckout({
            variables: { products: productIds }
        });
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

    // for checkout
    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);


    return (
        <div className="m-3">
            <div className="text-center">
                <h2 className='mb-3'>Items in your cart:</h2>
            </div>
            {state.cart.length ? (
                <div className='container'>
                    {state.cart.map(item => (
                        <CartItem key={item._id} item={item} />
                    ))}

                    <div className="text-right mr-md-4">
                        <h2>Total: ${calculateTotal()}</h2>
                    </div>
                    <form className="my-3">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="ShipTo">Shipping to:</label>
                                <input type="name" className="form-control" placeholder="Please enter full name" id="shipTo" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="ShipTo">Shipping Address:</label>
                                <input type="address" className="form-control" placeholder="Please enter full address" id="address" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label for="ShipTo">Message (Optional):</label>
                                <input type="message" className="form-control" placeholder="Enter message" id="message" />
                            </div>
                        </div>

                    </form>
                    <div className="text-center mb-2">
                        {
                            Auth.loggedIn() ?
                                <button className="btn" onClick={submitCheckout}>
                                    Pay
                                </button>
                                :
                                <Link to="/login">
                                    <button className="btn">
                                        Login to Pay
                                    </button>
                                </Link>

                        }
                    </div>










                </div>
            ) : (
                <h3 className="text-center">
                    Your cart is empty!
                </h3>
            )}
        </div>
    );
};

export default CartPage;