import React, { useState } from "react";
import burger from "../images/burger.jpg";
import { useDispatch} from "react-redux"
import { set_items } from "../../Redux/Slices/ItemsSlice";

const Card = ({ items }) => {
  const dispatch = useDispatch()
  const { name, category, price } = items;

  const [itemprice, setItemprice] = useState(price.small)
  const [quantity, setItemquantity] = useState(1)
  const handleonpricechange=(e)=>{
    setItemprice(e.target.value)
 }
 const handleonquantitychange=(e)=>{
  setItemquantity(e.target.value)
}
const finalprice = itemprice * quantity
const dispatchdata=(items) =>{
  dispatch(set_items(items))
  
}
  console.log(itemprice)
  console.log(quantity)
  return (
    <div>
      <div
        className="card mt-3 ms-3 "
        style={{ width: "18rem", maxHeight: "380px" }}
      >
        <img src={burger} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{category}</p>
          <select value={quantity} onChange={handleonquantitychange} className="m-2 h-100 w-20 bg-info text-white rounded">
            { Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select value={itemprice} onChange={handleonpricechange} className="m-2 h-100 w-40 bg-info text-white rounded">
            <option value={price.small}>Small Size </option>
            <option value={price.medium}>Medium Size </option>
            <option value={price.large}>Large Size</option>
          </select>
          <div> Price: {finalprice}</div>
          <hr></hr>
          <button className="ms-5 rounded bg-info" onClick={()=>dispatchdata({name,category,quantity,finalprice})}>Add-to-Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
