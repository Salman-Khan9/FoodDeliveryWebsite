import React, { useState } from "react";
import axios from "axios";
import Authenticate from "../../authentication/Auth";
const AddFoodItem = () => {
  Authenticate("/Login")
  const initialvalue = {
    name: "",
    category: "",
    price: {
      small: "",
      medium: "",
      large: "",
    },
  };
  const [formdata, setdata] = useState(initialvalue);
  const handleonchange = (e) => {
    const { name, value } = e.target;
    setdata((prevData) => {
      if (name.startsWith("price.")) {
        const priceField = name.split(".")[1];
        return {
          ...prevData,
          price: {
            ...prevData.price,
            [priceField]: Number(value),
          },
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  const onSubmitData = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:7001/add/food/items`, formdata,{withCredentials:true});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <input
            type="text"
            name="category"
            value={formdata.category}
            placeholder="Enter Category "
            onChange={handleonchange}
          />
          <input
            type="text"
            name="name"
            value={formdata.name}
            placeholder="Enter Name "
            onChange={handleonchange}
          />
          <input
            type="text"
            name="price.small"
            value={formdata.price.small}
            onChange={handleonchange}
          />
          <input
            type="text"
            name="price.medium"
            value={formdata.price.medium}
            onChange={handleonchange}
          />
          <input
            type="text"
            name="price.large"
            value={formdata.price.large}
            onChange={handleonchange}
          />
          <button onClick={onSubmitData}>Add-Food-Item</button>
        </div>
      </div>
    </div>
  );
};

export default AddFoodItem;
