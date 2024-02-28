import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Screens/Home/Home";
import Login from "./Screens/login/Login";
import Signup from "./Screens/signup/Signup";
import Navbar from "./components/navbar/Navbar";
import AddFoodItem from "./Screens/AddFoodItems/AddFoodItem";
import OrderHistory from "./Screens/OrderHistory/OrderHistory";
import Orders from "./Screens/Orders/Orders";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div>
      <Router>
        <Navbar></Navbar>
        <ToastContainer/>
        <Routes>
          
          <Route  path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/AddFoodItem" element={<AddFoodItem />} />
          <Route path="/Orderhistory" element={<OrderHistory />} />
          <Route path="/Orders" element={<Orders />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
