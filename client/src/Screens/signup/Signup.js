import React, { useState } from "react";
import axios from "axios";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../signup/signup.css"
import Footer from "../../components/footer/Footer";
import {toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const Apikey = process.env.REACT_APP_OPENCAGE_API_KEY;
  const initialvalue = {
    name: "",
    email: "",
    password: "",
  };
  const [formdata, setformdata] = useState(initialvalue);
  const [location, setLocation] = useState(null);
  const [formattedAddress, setFormattedAddress] = useState("");

  const { name, email, password } = formdata;
  const handleonchange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  const ongetlocation = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      window.alert("Location not supported");
    }
  };

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
  }
  function error() {
    console.log("Unable to retrieve your location");
  }
  useEffect(() => {
    if (location) {
      fetchAddress(location.latitude, location.longitude);
    }
  }, [location]);
  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${Apikey}`
      );
      if (response.data.results && response.data.results.length > 0) {
        const openCageFormattedAddress = response.data.results[0].formatted;
        setFormattedAddress(openCageFormattedAddress);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };
  const handleLocationChange = (e) => {
    setFormattedAddress(e.target.value);
  };
  const payload = {
    name: formdata.name,
    email: formdata.email,
    password: formdata.password,
    location: location?location:formattedAddress
  };
  const handleonsubmit = async (e) => {
    e.preventDefault();
    try {
       await axios.post("https://food-delivery-website-bay.vercel.app/signup", payload,{withCredentials:true});
     toast.loading("Singinng Up...")
      
      navigate("/login");
      toast.success("Registered Successfully")

    } catch (error) {
      toast.error("Please fill all fields")
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
    <div className="card p-4">
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleonsubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            className="form-control"
            id="exampleInputName1"
            onChange={handleonchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            type="email"
            name="email"
            value={email}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleonchange}
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            className="form-control"
            id="exampleInputPassword1"
            onChange={handleonchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputLocation1" className="form-label">Location</label>
          <div className="input-group">
            <input
              type="text"
              name="location"
              value={formattedAddress}
              className="form-control"
              id="exampleInputLocation1"
              onChange={handleLocationChange}
            />
            <button className="btn btn-outline-secondary " type="button" onClick={ongetlocation}>
              <FaLocationCrosshairs />
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    <Footer></Footer>

  </div>
  );
};

export default Signup;
