import React, { useState, useImperativeHandle, forwardRef } from "react";
import moment from "moment";

const Bill = forwardRef((props, ref) => {
  const [order, setOrder] = useState(null);

  useImperativeHandle(ref, () => ({
    setOrder,
  }));

  if (!order) {
    return null; // Render nothing if there's no order
  }

  return (
    <div ref={ref} style={{ padding: "20px", backgroundColor: "#fff" }}>
      <h2>Order Invoice</h2>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Date:</strong> {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
      <p><strong>Buyer:</strong> {order.buyer.name}</p>
      <p><strong>Email:</strong> {order.buyer.email}</p>
      <p><strong>Status:</strong> {order.status}</p>

      <h3>Products</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>#</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Description</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Price</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((product, index) => (
            <tr key={product._id}>
              <td style={{ border: "1px solid black", padding: "8px" }}>{index + 1}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{product.name}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{product.description}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>${product.price}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total: ${order.products.reduce((total, product) => total + product.price * product.quantity, 0)}</h3>
    </div>
  );
});

export default Bill;
