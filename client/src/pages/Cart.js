import React, { useEffect, useState } from "react";
import { ADD_MULTIPLE_TO_CART } from "../utils/actions";
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

    const [charCount, setCharCount] = useState(0)

    const [inputMessage, setMessage] = useState('')

    const [formState, setFormState] = useState({ shipTo: '', shipToAddress: '', message: '', showErrorShipTo: true, showErrorAddress: true });

    const [state, dispatch] = useStoreContext();

    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);


    function calculateTotal() {
        let sum = 0;
        state.cart.forEach(item => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    const submitCheckout = async (event) => {
        event.preventDefault();
        
        if ((formState.showErrorShipTo) || (formState.showErrorAddress)) {
            return false;
        } else {
            const productIds = [];
            state.cart.forEach((item) => {
                for (let i = 0; i < item.purchaseQuantity; i++) {
                    productIds.push(item._id);
                }
            });
            // save checkout details into indexedDB
            // clear first
            idbPromise('checkout', 'clear', {});
            idbPromise('checkout', 'add', { ...formState });

            getCheckout({
                variables: { products: productIds }
            });
        }
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
    const handleChange = (event) => {
        const { name, value } = event.target;
        if ((name === 'message') && (value.length <= 300)) {
            setCharCount(event.target.value.length)
            setMessage(value)
        }
        setFormState({
            ...formState,
            [name]: value,
            showErrorShipTo: (formState.shipTo.length < 1),
            showErrorAddress: (formState.shipToAddress.length < 6),
        });
        // console.log(formState);
    };

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
                        <h4>Total: ${calculateTotal()}</h4>
                    </div>
                    <form className="my-3">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="ShipTo">Shipping to (Required):</label>
                                <input type="name"
                                    name="shipTo"
                                    className="form-control"
                                    placeholder="Please enter full name"
                                    id="shipTo"
                                    onChange={handleChange}
                                />
                                <div className="text-center text-danger" style={{ display: formState.showErrorShipTo ? 'block' : 'none' }}>Please fill out Shipping to field</div>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="ShipToAddress">Shipping Address (Required):</label>
                                <input type="address"
                                    name="shipToAddress"
                                    className="form-control"
                                    placeholder="Please enter full address"
                                    id="address"
                                    onChange={handleChange}
                                />
                                <div className="text-center text-danger" style={{ display: formState.showErrorAddress ? 'block' : 'none' }}>Please enter a valid address!</div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="ShipTo">Message (Optional):</label>
                                <textarea
                                    //type="message"
                                    placeholder="Enter message"
                                    value={inputMessage}
                                    name='message'
                                    rows='5'
                                    className="form-control"
                                    id="message"
                                    onChange={handleChange}
                                />
                                <p className={`${charCount >= 300 ? 'text-danger' : ''}`}>Characters left:{' '}{300 - charCount}</p>
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