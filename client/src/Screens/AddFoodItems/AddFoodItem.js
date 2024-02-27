import React, { useState } from "react";
import axios from "axios";
import AdminAuth from "../../authentication/AdminAuth";
import Footer from "../../components/footer/Footer";
import {toast } from 'react-toastify';
const AddFoodItem = () => {
  AdminAuth("/")
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
      await axios.post("https://food-delivery-website-bay.vercel.app/add/food/items", formdata,{withCredentials:true});
      toast.loading("Adding Item...")

      setdata(initialvalue)
      toast.success("Item Added Successfully")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2 className="text-center mb-4">Add Food Item</h2>
        <form>
        <div className="mb-3">
            <lable className = "fs-4">Name:</lable>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formdata.name}
              placeholder="Enter Name"
              onChange={handleonchange}
            />
          </div>
          <div className="mb-3">

            <lable className = "fs-4">Category:</lable>
            <input
              type="text"
              className="form-control"
              name="category"
              value={formdata.category}
              placeholder="Enter Category"
              onChange={handleonchange}
            />
          </div>
          
          <div className="mb-3">
            <lable className = "fs-4">Price:</lable>
            <input
              type="text"
              className="form-control"
              name="price.small"
              placeholder="Enter Price "
              value={formdata.price.small}
              onChange={handleonchange}
            />
          </div>
          <div className="mb-3">
            <lable className = "fs-4">Optional Price or Medium size Price:</lable>
            <input
              type="text"
              className="form-control"
              name="price.medium"
              placeholder="Enter Price of Medium Size"
              value={formdata.price.medium}
              onChange={handleonchange}
            />
          </div>
          <div className="mb-3">
            <lable className = "fs-4">Optional Price or Large size price:</lable>
            <input
              type="text"
              className="form-control"
              name="price.large"
              placeholder="Enter Price of Large Size"
              value={formdata.price.large}
              onChange={handleonchange}
            />
          </div>
          <button type="button" className="btn btn-primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }} onClick={onSubmitData}>
            Add Food Item
          </button>
        </form>
      </div>
      <Footer></Footer>

    </div>
  );
};

export default AddFoodItem;
