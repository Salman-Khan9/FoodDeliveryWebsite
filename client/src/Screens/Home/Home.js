import React, { useEffect, useState } from "react";
import Carousel from "../../components/carousel/Carousel";
import Card from "../../components/card/Card";
import axios from "axios";
import Authenticate from "../../authentication/Auth";
const Home = () => {
  Authenticate("/Login")
  const [fooditems, setfooditems] = useState([]);

  useEffect(() => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    axios.get(`${BACKEND_URL}/food/items`,{withCredentials:true}).then((data) => {
      setfooditems(data.data);
    });
  }, []);

  return (
    
    <>
    <Carousel></Carousel>

     <div className="container">
     <div className="row">
     {fooditems.map((items, index) => {
        return   <div key={index} className="col-md-4">
          <Card  items={items} />
          </div>;
        })}
     </div>
   </div></>
  );
};

export default Home;
