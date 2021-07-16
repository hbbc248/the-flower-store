import React from 'react'
import Cart from '../components/Cart'

function AboutUs() {


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12">
                    <h3 className="text-center">Get to Know Our Shop:</h3>
                </div>
                <div className="row justify-content-center mb-20">
                    <p className="col-12">  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa sapiente veniam quos eaque nostrum incidunt quas quidem omnis nesciunt dicta laboriosam rem, aspernatur, provident quibusdam voluptas! Similique numquam perspiciatis possimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque vel harum quos ad labore quaerat voluptates eos, ratione quae iusto, culpa velit minima iure aperiam. Voluptate laboriosam alias unde dolorem? </p>
                    <img className="img-thumbnail" alt="Responsive image" src="../../images/flowershop.jpeg"></img>
                </div>
                <div>
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <h3 className="text-center mb-2">Florist of the Month:</h3>
                        </div>
                        <div class="card img-container">
                            <img class="card-img-top image" src="../../images/florist1.png" alt="Card image cap"></img>
                            <div class="card-body">
                                <h5> Meet Susan:</h5>
                                <p class="card-text"> Susan has been employee of the month for the last 36 months straight.
                                <br></br>She is our most dedicated florist, always showing her enthusiasm and passion for bouquets 
                                <br></br>She does not slow down, come by the shop to see her at work!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Cart />
        </div>

    )
}


export default AboutUs