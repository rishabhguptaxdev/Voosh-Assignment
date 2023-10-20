import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const GetOrder = () => {
  const context = useContext(UserContext);

  if (!context.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Order Id</th>
            <th scope="col">Sub Total</th>
            <th scope="col">Phone</th>
            <th scope="col">Created At</th>
          </tr>
        </thead>
        <tbody>
          <>
            {context.orders.map((order, id) => (
              <tr key={order._id}>
                <th scope="row">{order._id}</th>
                <td>{order.subTotal}</td>
                <td>{order.phone}</td>
                <td>{order.createdAt}</td>
              </tr>
            ))}
          </>
        </tbody>
      </table>
    </>
  );
};

export default GetOrder;
