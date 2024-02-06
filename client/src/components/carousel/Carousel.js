import React from 'react'
import "bootstrap"
import "react-bootstrap"
import burger from "../images/burger.jpg" 
import pizza from "../images/pizza.jpg" 
import shawarma from "../images/shawarma.jpg" 
import deal from "../images/deal.jpg" 
const Carousel = () => {
  return (
    <div>
<div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}  >
  <div className="carousel-inner" id='carousel' style={{maxHeight:"300px"}}>
    <div className="carousel-item active"   >
      <img style={{filter:"brightness(30%)",maxHeight:"300px"}} src={burger} className="w-100  "   alt="..."   />
    </div>
    <div className="carousel-item">
      <img style={{filter:"brightness(30%)",maxHeight:"300px"}} src={pizza} className="w-100 "   alt="..."  />
    </div><div className="carousel-item">
      <img style={{filter:"brightness(30%)", maxHeight:"300px"}} src={deal} className="w-100 "   alt="..."  />
    </div>
    <div className="carousel-item">
      <img style={{filter:"brightness(30%)" ,maxHeight:"300px"}} src={shawarma} className="w-100 "   alt="..."  />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

    </div>
  )
}

export default Carousel