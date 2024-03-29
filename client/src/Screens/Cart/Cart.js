import React from "react";
import {
  delete_item,
  delete_items,
  selectitems,
} from "../../Redux/Slices/ItemsSlice";
import {toast } from 'react-toastify';

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Authenticate from "../../authentication/Auth";
const Cart = () => {
  Authenticate("/Login")
  
  const data = useSelector(selectitems);
  const dispatch = useDispatch();
  const totalPrice = data.reduce((total, food) => total + food.finalprice, 0);

  const payload = data.map((data) => ({
    name: data.name,
    category: data.category,
    quantity: data.quantity,
    finalprice: data.finalprice,
    totalamount: totalPrice.toString(),
  }));

  const Handlesubmit = async (e) => {
    e.preventDefault();
    try {
      if (payload.length > 0) {
        await axios.post("https://food-hunter-website-server.vercel.app/order", payload,{withCredentials:true});
        dispatch(delete_items());
        toast.success("Orderd Taken")
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handledelete = (index) => {
    console.log(index);
    dispatch(delete_item(index));
  };
  return (
    <>
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md" >
        <table className="bg-success table table-hover " >
          <thead className=" text-success fs-4">
            <tr>
              <th style={{ backgroundColor: "#77C3EC" }} scope="col">
                #
              </th>
              <th style={{ backgroundColor: "#77C3EC" }} scope="col">
                Name
              </th>
              <th style={{ backgroundColor: "#77C3EC" }} scope="col">
                category
              </th>
              <th style={{ backgroundColor: "#77C3EC" }} scope="col">
                Quantity
              </th>
              <th style={{ backgroundColor: "#77C3EC" }} scope="col">
                Price
              </th>
              <th style={{ backgroundColor: "#77C3EC" }} scope="col"></th>
            </tr>
          </thead>
          <tbody className="text-success">
            {data &&
              data.map((food, Index) => (
                <tr key={Index}>
                  <th style={{ backgroundColor: "lightblue" }} scope="row">
                    {Index + 1}
                  </th>
                  <td style={{ backgroundColor: "lightblue" }}>{food.name}</td>
                  <td style={{ backgroundColor: "lightblue" }}>{food.category}</td>
                  <td style={{ backgroundColor: "lightblue" }}>{food.quantity}</td>
                  <td style={{ backgroundColor: "lightblue" }}>{food.finalprice}</td>
                  <td style={{ backgroundColor: "lightblue" }}>
                    <button
                      type="button"
                      className="btn p-0"
                      onClick={() => handledelete(Index)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div>
          <h1 className="text-white fs-2">Total Price: {totalPrice}</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5 " onClick={Handlesubmit}>
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
