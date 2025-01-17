import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/Layout";
import UserMenu from "../../components/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import Bill from "./Bill";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const billRef = useRef();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handlePrint = useReactToPrint({
    content: () => billRef.current,
  });

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3 dashboard" style={{ backgroundColor: "#fff8dc" }}>
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders.length > 0 ? (
              orders.map((o, i) => (
                <div className="border shadow mb-3" key={o._id}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o.status}</td>
                        <td>{o.buyer?.name}</td>
                        <td>{moment(o.createdAt).fromNow()}</td>
                        <td>{o.payment.success ? "Success" : "Failed"}</td>
                        <td>{o.products?.length}</td>
                        <td>{o.products.reduce((total, product) => total + product.price * product.quantity, 0)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o.products.map((p) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height="100px"
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price: Rs.{p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="btn btn-primary" onClick={handlePrint}>
                    Print Bill
                  </button>
                  {/* Render the Bill component but hide it from the view */}
                  <div style={{ display: "none" }}>
                    <Bill ref={billRef} order={o} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No orders found</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
