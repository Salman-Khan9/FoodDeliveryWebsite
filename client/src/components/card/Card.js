import React, { useState } from "react";
import card from "../images/card.avif";
import { useDispatch } from "react-redux";
import { set_items } from "../../Redux/Slices/ItemsSlice";

const Card = ({ items }) => {
  const dispatch = useDispatch();
  const { name, category, price } = items;

  const [itemprice, setItemprice] = useState(price.small);
  const [quantity, setItemquantity] = useState(1);
  const handleonpricechange = (e) => {
    setItemprice(e.target.value);
  };
  const handleonquantitychange = (e) => {
    setItemquantity(e.target.value);
  };
  const finalprice = itemprice * quantity;
  const dispatchdata = (items) => {
    dispatch(set_items(items));
  };
  return (
    <div >
      <div 
        className="card mt-3 mb-3  "
        style={{ width: "18rem", maxHeight: "400px" ,backgroundColor:"#1e1c1c" }}
      >
        <img src={card} height="180px" className="card-img-top" alt="..." />
        <div className="card-body">
        <div>
  <span className=" fw-normal text-white fs-5">Name: </span>
  <p className=" card-title text-white fw-normal d-inline fs-5">{name}</p>
</div> 
<div className="d-flex align-items-center">
  <label className=" mt-1 text-white fw-normal fs-6 me-2"> Quantity:   
    <select
      value={quantity}
      onChange={handleonquantitychange}
      className="h-100 w-20 bg-success text-white rounded"
    >
      {Array.from(Array(6), (e, i) => {
        return (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        );
      })}
    </select>
  </label>
  {price.small && price.medium && price.large ? 
    <label className=" mt-1 fs-6 text-white fw-normal"> Size:
      <select
        value={itemprice}
        onChange={handleonpricechange}
        className=" h-100 w-40 bg-success text-white rounded"
      >
        <option value={price.small}>Small Size </option>
        <option value={price.medium}>Medium Size </option>
        <option value={price.large}>Large Size</option>
      </select>
    </label>
    : null
  }
</div>
          <div className=" mt-1 text-white fs-5 fw-bold"> Price: {finalprice}</div>
          <hr></hr>
          <button
            className="ms-5 text-white fw-bold rounded bg-success"
            onClick={() =>
              dispatchdata({ name, category, quantity, finalprice })
            }
          >
            Add-to-Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
