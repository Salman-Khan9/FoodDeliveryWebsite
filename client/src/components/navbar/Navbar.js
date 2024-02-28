import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { delete_items, selectitems } from "../../Redux/Slices/ItemsSlice";
import Modal from "../../Modal/Modal";
import fireimg from "../images/fire.avif"
import Cart from "../../Screens/Cart/Cart";
import { MdAddShoppingCart } from "react-icons/md";
import { Badge } from "react-bootstrap";
import axios from "axios"
import { selectAdminloginstatus, selectloginstatus, set_Adminloginstatus, set_loginstatus } from "../../Redux/Slices/Authslice";
import { toast } from "react-toastify";
const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const Adminlogstatus = useSelector(selectAdminloginstatus)
  const data = useSelector(selectitems);
  const logged = useSelector(selectloginstatus);
  const [cartview, setcartview] = useState(false);
  const handlelogout = async()=>{
    try {
   await axios.get("https://food-hunter-website-server.vercel.app/logout",{withCredentials:true,})
     dispatch(set_loginstatus(false))
     dispatch(set_Adminloginstatus(false))
     dispatch(delete_items())
     navigate("/Login")
   toast.success("LoggedOut Successfully")


    } catch (error) {
      console.log(error)
    }

  }
  return (
   <> {logged || Adminlogstatus ?<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
   <div className="container-fluid">
     <Link className="navbar-brand" to="/">
      <img  style={{mixBlendMode:"color-burn",color:"white"}} src={fireimg} height="35px" alt="img"/>
       Food Hunter
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
        
     {Adminlogstatus?    <li className="nav-item">
           <Link className="nav-link" to="/AddFoodItem">
             Add-Food-Item
           </Link>
         </li>:null}
         {Adminlogstatus?    <li className="nav-item">
           <Link className="nav-link" to="/Orders">
             Orders
           </Link>
         </li>:null}
         <li className="nav-item">
         <div className=" nav-link text-white" style={{cursor:"pointer"}} onClick={() => setcartview(true)}>
           <MdAddShoppingCart />
           Cart
           <Badge pill bg="danger">
             {data ? data.length : 0}
           </Badge>
         </div>
         {cartview ? (
           <Modal onClose={() => setcartview(false)}>
             <Cart />
           </Modal>
         ) : null}</li>
         <li className="nav-item">
        <Link className="nav-link" to="/Orderhistory">
          Orders-History
        </Link>
      </li>
         <li className="nav-item">
           <button className="nav-link" onClick={handlelogout}>
             Logout
           </button>
         </li>
       </ul>
     </div>
   </div>
 </nav>
:<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
<div className="container-fluid">
  <Link className="navbar-brand" to="/Login">
  <img style={{mixBlendMode:"color-burn",color:"white"}} src={fireimg} height="35px" alt="img"/>

    Food Hunter
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
        <Link className="nav-link" to="/Login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/Signup">
          Signup
        </Link>
      </li>
      
    </ul>
  </div>
</div>
</nav>} </>)
};

export default Navbar;
