import React from "react";
import burger from "../images/burger.jpg";
const Card = ({ items }) => {
  const { name, category, price } = items;
  return (
    <div>
      <div
        className="card mt-3 ms-3 "
        style={{ width: "18rem", maxHeight: "360px" }}
      >
        <img src={burger} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{category}</p>
          <select className="m-2 h-100 w-20 bg-info text-white rounded">
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select className="m-2 h-100 w-40 bg-info text-white rounded">
            <option value="small">Small {price.small}Rs</option>
            <option value="medium">Medium {price.medium}Rs </option>
            <option value="large">Large {price.large}Rs</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Card;
