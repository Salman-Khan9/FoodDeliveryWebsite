import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const backend_url = process.env.REACT_APP_BACKEND_URL;
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
       await axios.post(`${backend_url}/login`, formdata,{withCredentials:true});
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlfor="exampleInputEmail1" className="form-label">
            Email address
          </label>
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
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            className="form-control"
            id="exampleInputPassword1"
            onChange={handleonchange}
          />
        </div>

        <button
          type="submit"
          onClick={handleonsubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
