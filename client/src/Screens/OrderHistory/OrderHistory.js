import React, { useEffect, useState } from 'react';
import axios from "axios";
import Authenticate from '../../authentication/Auth';
import Footer from '../../components/footer/Footer';

const backend_url = process.env.REACT_APP_BACKEND_URL;

const OrderHistory = () => {
  Authenticate("/Login")

    const [Orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`${backend_url}/orderhistory`, { withCredentials: true });
                setOrders(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="container m-auto mt-5">
            {Orders.map((order, orderIndex) => (
                <div key={orderIndex}>
                    <h2>Order</h2>
                    <table className="bg-success table table-hover table-responsive-sm table-responsive-md">
                        <thead className="text-success fs-4">
                            <tr>
                                <th style={{ backgroundColor: "#77C3EC" }} scope="col">#</th>
                                <th style={{ backgroundColor: "#77C3EC" }} scope="col">Category</th>
                                <th style={{ backgroundColor: "#77C3EC" }} scope="col">Name</th>

                                <th style={{ backgroundColor: "#77C3EC" }} scope="col">Quantity</th>
                                <th style={{ backgroundColor: "#77C3EC" }} scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody className="text-success">
                            {order.orders.map((suborder, suborderIndex) => (
                                <tr key={suborderIndex}>
                                    <th style={{ backgroundColor: "lightblue" }} scope="row">{suborderIndex + 1}</th>
                                    <td style={{ backgroundColor: "lightblue" }}>{suborder.category}</td>
                                    <td style={{ backgroundColor: "lightblue" }}>{suborder.name}</td>

                                    <td style={{ backgroundColor: "lightblue" }}>{suborder.quantity}</td>
                                    <td style={{ backgroundColor: "lightblue" }}>{suborder.finalprice}</td>
                                </tr>
                            ))}

                        </tbody>
                        
                    </table>
                    <h1 className=" fs-2"  style={{ backgroundColor: "lightblue" }}>Total Price: {Orders.reduce((acc, curr) => acc + curr.totalamount, 0)}</h1>

                </div>
            ))}
            <div>
            </div>
      <Footer></Footer>

        </div>
    );
};

export default OrderHistory;


