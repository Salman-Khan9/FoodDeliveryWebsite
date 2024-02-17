import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectitems } from "../../Redux/Slices/ItemsSlice";
import Modal from "../../Modal/Modal";
import Cart from "../../Screens/Cart/Cart";
import { MdAddShoppingCart } from "react-icons/md";
import { Badge } from "react-bootstrap";

const Navbar = () => {
  const data = useSelector(selectitems)
  const [cartview, setcartview] = useState(false)
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Food Panda
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Signup">
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/AddFoodItem">
                Add-Food-Item
              </Link>
            </li>
            <div className="btn text-white  " onClick={()=>setcartview(true)}><MdAddShoppingCart />Cart <Badge pill bg="danger">{ data? data.length:0}</Badge>
            </div>
            {cartview?<Modal onClose={()=>setcartview(false)}  ><Cart/></Modal>:null}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
