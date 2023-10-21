import React, { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../utils/cookie";

const AddOrder = () => {
  const context = useContext(UserContext);
  const [subTotal, setSubTotal] = useState("");
  const [phone, setPhone] = useState("");

  const handleAddOrder = async (e) => {
    context.showLoader();
    try {
      await axios
        .post(
          process.env.REACT_APP_API_BASE_URL + "/addorder",
          {
            subTotal: parseInt(subTotal),
            phone: phone,
          },
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
          if (response.status == 201) {
            let newOrder = [...context.orders, response.data.order];
            context.setOrders(newOrder);
            context.hideLoader();
            toast("Order created successfully", { type: "success" });
          }
        });
    } catch (error) {
      context.hideLoader();
      console.log("something went wromng while creating order to server.");
      toast("Something went wrong", { type: "error" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddOrder();
  };

  if (!getToken()) {
    return <Navigate to="/loginuser" />;
  }

  return (
    <>
      <div
        className="row cover card"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="col-md-4 col-sm-1"></div>
        <div className="col-md-4 mt-4 col-sm-10">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-center">Add Order</h4>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Sub Total
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    value={subTotal}
                    onChange={(e) => setSubTotal(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="phone"
                    className="form-control"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Add Order
                </button>
              </form>

              <br />
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-1"></div>
      </div>

      {context.loader}
    </>
  );
};

export default AddOrder;
