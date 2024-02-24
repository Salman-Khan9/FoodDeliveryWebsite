import React, { useEffect, useState } from 'react';
import axios from "axios";
import AdminAuth from '../../authentication/AdminAuth';
import Footer from '../../components/footer/Footer';


const Orders = () => {
    AdminAuth("/")
  

    const [Orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get("https://food-delivery-website-bay.vercel.app/orders", { withCredentials: true });
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
                    <h2>Order:</h2>
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
                        <tfoot>
                            <tr>
                                <td colSpan="4" style={{ textAlign: "right",backgroundColor:"lightblue" }}>Total Amount:</td>
                                <td style={{ backgroundColor: "lightblue" }}>{order.totalamount}</td>
                            </tr>
                        </tfoot>
                    </table>
                

                </div>
            ))}
            <div>
            </div>
      <Footer></Footer>

        </div>
    );
};

export default Orders