import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Screens/Home/Home";
import Login from "./Screens/login/Login";
import Signup from "./Screens/signup/Signup";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import AddFoodItem from "./Screens/AddFoodItems/AddFoodItem";

function App() {
  return (
    <div>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/AddFoodItem" element={<AddFoodItem />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
