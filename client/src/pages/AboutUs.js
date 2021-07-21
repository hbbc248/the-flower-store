import React from 'react'
import Cart from '../components/Cart'
import { useHistory } from 'react-router-dom'

function AboutUs() {

    const { push } = useHistory()

    return (
        <div>
            <div className="jumbotron">
                <div className="container">
                    <h3 className="display-5">Get to Know Our Shop:</h3>
                    <p>Founded in 1837, The Flower Shop is passionate and driven to connect every customer with the ones that they love the most in the best way we know  how. We started this company from the ground up, pun intended, growing flowers in our backyard and gifting them to our loved ones, we decided to share the wealth and start marketing out bouquets. Slowly building our clientele we are now 3,000 member strong and counting. Thank you for your support, if you are new here: Welcome to the flower shop family! </p>
                    <div className="text-center mb-4">
                        <button type="button" onClick={() => push('/')} className="btn btn-primary btn-lg px-4 me-sm-3">Check Out Our Products!</button>
                    </div>
                </div>
                <div className="container">
                    <img src="../../images/flowershopfinalpic.jpg" className="col-12" alt="flower display"></img>
                </div>
            </div>

            <div className="col-12">
                <div className="container">
                    <div className="row align-items-center no-gutters border p-2 rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col-md-4">
                            <img className="card-img" src="../../images/florist1.png" alt="Susan working on flower bouquet"></img>
                        </div>
                        <div className="col-md-8 p-4 d-flex flex-column position-static">
                            <h4 className="mb-0">Florist of the Month:</h4>
                            <div className="mb-1 text-muted">July 2021</div>
                            <br></br>
                            <p className="card-text mb-auto"> Susan has been employee of the month for the last 36 months straight.
                                <br></br>She is our most dedicated florist, always showing her enthusiasm and passion for bouquets
                                <br></br>She does not slow down, come by the shop to see her at work!</p>
                        </div>
                        <div className="col-auto d-none d-lg-block">


                        </div>
                    </div>
                </div>
            </div>
            <Cart />
        </div>

    )
}


export default AboutUs