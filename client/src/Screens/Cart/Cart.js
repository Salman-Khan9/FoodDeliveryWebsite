import React from "react";
import { delete_items, selectitems } from "../../Redux/Slices/ItemsSlice";
import {  useDispatch, useSelector } from "react-redux";
import axios from "axios";
const Cart = () => {
  
  const backendurl = process.env.REACT_APP_BACKEND_URL;
  const data = useSelector(selectitems);
  const dispatch = useDispatch()
  console.log(data)
  const totalPrice = data.reduce((total, food) =>  total + food.finalprice, 0)
   

  const payload = data.map(data => ({
    name: data.name,
    category: data.category,
    quantity: data.quantity,
    finalprice: data.finalprice,
    totalamount: totalPrice.toString()
  }));
  
  console.log (payload)
  
  const Handlesubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${backendurl}/order`, payload);
      
    dispatch(delete_items())
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
        <table className="bg-success table table-hover ">
          <thead className=" text-success fs-4">
            <tr>
              <th style={{ backgroundColor: "grey" }} scope="col">
                #
              </th>
              <th style={{ backgroundColor: "grey" }} scope="col">
                Name
              </th>
              <th style={{ backgroundColor: "grey" }} scope="col">
                category
              </th>
              <th style={{ backgroundColor: "grey" }} scope="col">
                Quantity
              </th>
              <th style={{ backgroundColor: "grey" }} scope="col">
                Price
              </th>
              <th style={{ backgroundColor: "grey" }} scope="col"></th>
            </tr>
          </thead>
          <tbody className="text-success">
            {data &&  data.map((food, Index) => (
                  <tr key={Index}>
                    <th style={{ backgroundColor: "grey" }} scope="row">
                      {Index + 1}
                    </th>
                    <td style={{ backgroundColor: "grey" }}>{food.name}</td>
                    <td style={{ backgroundColor: "grey" }}>{food.category}</td>
                    <td style={{ backgroundColor: "grey" }}>{food.quantity}</td>
                    <td style={{ backgroundColor: "grey" }}>
                      {food.finalprice}
                    </td>
                    <td style={{ backgroundColor: "grey" }}>
                      <button type="button" className="btn p-0">
                        delete
                      </button>
                    </td>
                  </tr>
                ))
              }
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
