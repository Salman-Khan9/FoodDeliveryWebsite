import React, { useEffect, useState } from "react";
import Carousel from "../../components/carousel/Carousel";
import Card from "../../components/card/Card";
import axios from "axios";
const Home = () => {
  const [fooditems, setfooditems] = useState([]);

  useEffect(() => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    axios.get(`${BACKEND_URL}/food/items`).then((data) => {
      setfooditems(data.data);
    });
  }, []);

  return (
    <div>
      {" "}
      <Carousel></Carousel>
      <div>
        {fooditems.map((items, index) => {
          return <Card items={items} />;
        })}
      </div>
    </div>
  );
};

export default Home;
