import React, { useEffect, useState } from "react";
import Carousel from "../../components/carousel/Carousel";
import Card from "../../components/card/Card";
import axios from "axios";
import Authenticate from "../../authentication/Auth";
import Footer from "../../components/footer/Footer";
const Home = () => {
  Authenticate("/Login")
  const [fooditems, setfooditems] = useState([]);
  const [foodcategory, setfoodcategory] = useState([]);
  useEffect(() => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    axios.get(`${BACKEND_URL}/food/items`,{withCredentials:true}).then((data) => {
      setfooditems(data.data[0] );
      setfoodcategory(data.data[1] );
    });
  }, []);
  return (
    <div style={{backgroundColor:"#1e1c1c"}}>
      <Carousel></Carousel>
  
      <div>
        {
          foodcategory.map((data, index) => {
            return (
              
              <div key={index}>
                <div className=" text-white mt-3 ms-3 fs-2 fw-bold  " style={{backgroundColor:"#1e1c1c"}}>{data}</div>
                <hr style={{color:"white"}}></hr>
                <div className="container">
                  <div className="row">
                    {
                       fooditems
                          .filter((item) => item.category === data )
                          .map((items, index) => {
                            return (
                              <>
                              <div key={index} className=" col-md-4" >
                                <Card items={items} />
                              </div>

</>
                            );
                          })
                      }
                  </div>
                </div>
              </div>
            );
          })
         }
      </div>
      <hr className="my-2" style={{ borderTop: '1px solid white' }}></hr>
      <div >
<footer className=" mt-3 d-flex flex-wrap justify-content-center align-items-center py-3 ">
    
      <span className=" mt-3 fw-normal text-white">© 2024 FoodPanda, Inc</span>
   
  </footer>
    </div>

    </div>

  );
  
};

export default Home;
