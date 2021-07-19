import React from 'react'
import Cart from '../components/Cart'
import { useHistory } from 'react-router-dom'

function AboutUs() {

    const { push } = useHistory()

    return (
        <div>
            <div className="jumbotron">
                <div className="container">
                    <h5 className="display-4">Get to Know Our Shop:</h5>
                    <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
                    <p>      <button type="button" onClick={() => push('/')} className="btn btn-primary btn-lg px-4 me-sm-3">Check Out Our Products!</button>
                    </p>
                </div>
                <div className="container">
                    <img src="../../images/flowershopfinalpic.jpg" className="img-fluid" alt="Responsive image"></img>
                </div>
            </div>

            <div className="col-md-12">
                <div className="container">
                    <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col p-4 d-flex flex-column position-static">
                            <h3 className="mb-0">Florist of the Month:</h3>
                            <div className="mb-1 text-muted">July 2021</div>
                            <br></br>
                            <p className="card-text mb-auto"> Susan has been employee of the month for the last 36 months straight.
                                <br></br>She is our most dedicated florist, always showing her enthusiasm and passion for bouquets
                                <br></br>She does not slow down, come by the shop to see her at work!</p>
                        </div>
                        <div className="col-auto d-none d-lg-block">
                            <img className="card-img-top image" src="../../images/florist1.png" alt="Card image cap"></img>

                        </div>
                    </div>
                </div>
            </div>
            <Cart />
        </div>
   
    )
}


export default AboutUs