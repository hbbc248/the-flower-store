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
                            <h3 className="text-center mb-2">Get to Know Our Florists:</h3>
                        </div>
                    </div>
                </div>
            </div>
            <Cart/>
        </div>

    )
}


export default AboutUs