import React, { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { getToken, removeCookie } from "../utils/cookie";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const GetOrder = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await axios
          .get(
            process.env.REACT_APP_API_BASE_URL + "/getorder",
            {
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            if (response.status == 200) {
              context.hideLoader();
              context.setIsLoggedIn(true);
              context.setOrders(response.data.order);
            }
          });
      } catch (error) {
        if (error.response && error.response.status === 500) {
          removeCookie();
          navigate("/loginuser");
        }
        console.log(
          "something went wrong while getting orders details from server."
        );
        context.hideLoader();
        context.setIsLoggedIn(false);
      }
    })();
  }, []);

  if (!getToken()) {
    return <Navigate to="/loginuser" />;
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
