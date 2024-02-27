import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import {  set_Adminloginstatus, set_loginstatus } from "../../Redux/Slices/Authslice";
import "../login/Login.css"
import Footer from "../../components/footer/Footer";
import {toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
const dispatch = useDispatch()
  
  const initialvalue = {
    email: "",
    password: "",
  };
  const [formdata, setformdata] = useState(initialvalue);
  const { email, password } = formdata;
  const handleonchange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };
  const handleonsubmit = async (e) => {
    e.preventDefault();
    try {
     const res =  await axios.post("https://food-delivery-website-bay.vercel.app/login", formdata,{withCredentials:true});
     toast.loading("loggin in...")
     if(res.data=== process.env.REACT_APP_ADMIN_EMAIL ){
      dispatch(set_Adminloginstatus(true))
      dispatch(set_loginstatus(true))
      toast.success("Logged in Successfully")
     }else{
       dispatch(set_loginstatus(true))
      toast.success("Logged in Successfully")

     }
     toast.error("Please Enter Valid Cradentials")
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mt-5">
    <div className="card p-4">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleonsubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            type="email"
            value={email}
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleonchange}
          />
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
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    <Footer></Footer>

  </div>
  );
};

export default Login;
