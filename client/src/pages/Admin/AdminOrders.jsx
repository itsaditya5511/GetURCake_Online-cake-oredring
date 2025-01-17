import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/Auth";
import moment from "moment";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
import { useReactToPrint } from "react-to-print";

function AdminOrders() {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const billRef = useRef();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`http://localhost:8000/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => billRef.current,
  });

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard" style={{ backgroundColor: '#fff8dc' }}>
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((o, i) => (
            <div className="border shadow mb-3" key={o._id}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">Email</th>
                    <th scope="col">Date</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                      <Select
                        bordered={false}
                        onChange={(value) => handleChange(o._id, value)}
                        defaultValue={o?.status}
                      >
                        {status.map((s, i) => (
                          <Option key={i} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td>{o?.buyer?.name}</td>
                    <td>{o?.buyer?.email}</td>
                    <td>{moment(o?.createdAt).fromNow()}</td>
                    <td>{o?.payment.success ? "Success" : "Failed"}</td>
                    <td>{o?.products?.length}</td>
                    <td>
                      {o?.products.reduce((total, product) => {
                        const productTotal = product.quantity * product.price;
                        return total + productTotal;
                      }, 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="container" ref={billRef}>
                <h2>Order Details</h2>
                <p><strong>Buyer:</strong> {o?.buyer?.name}</p>
                <p><strong>Email:</strong> {o?.buyer?.email}</p>
                <p><strong>Date:</strong> {moment(o?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                <p><strong>Order Status:</strong> {o?.status}</p>
                <p><strong>Payment Status:</strong> {o?.payment.success ? "Success" : "Failed"}</p>
                <h3>Products:</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {o?.products?.map((p) => (
                      <tr key={p._id}>
                        <td>{p.name}</td>
                        <td>{p.description.substring(0, 30)}</td>
                        <td>Rs{p.price}</td>
                        <td>{p.quantity}</td>
                        <td>Rs{p.price * p.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  <h3>Order Total: Rs{o?.products.reduce((total, product) => {
                    const productTotal = product.quantity * product.price;
                    return total + productTotal;
                  }, 0)}</h3>
                </div>
              </div>
              <button onClick={handlePrint} className="btn btn-primary mt-3">
                Print Bill
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default AdminOrders;
