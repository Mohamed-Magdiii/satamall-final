import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
function OrderDetailComponent() {
  const { id } = useParams();
  const history = useHistory();
  const [orderItems, setOrderItems] = useState([]);
  const displayOrders = () => {
    return orderItems.map((orderItem, index) => {
      return (
        <tr className="text-center border-3 m-auto" key={index}>
          <td className="col-md-1">{index + 1}</td>
          <td className="col-md-1">{orderItem.product?.title_en}</td>
          <td className="col-md-1 text-center">{orderItem.quantity}</td>
          <td className="col-md-1 text-center">{orderItem.product?.price}</td>
          <td className="col-md-1 text-center">
            {orderItem.product?.price * orderItem.quantity}
          </td>
        </tr>
      );
    });
  };
  const sumProperty = () => {
    return orderItems.reduce((total, obj) => {
      return total + obj.product?.price * obj.quantity;
    }, 0);
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/order-item/order/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        setOrderItems(response.data);
      })
      .catch(() => {
        history.push("/error/error-v1");
      });
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="well col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-6 w-100">
              <em>Reciept: {orderItems[0]?.order._id}</em>
            </div>
          </div>
          <div className="row">
            <div className="text-center">
              <h1>Reciept</h1>
            </div>
            <table className="table table-hover table-hover">
              <thead>
                <tr className="text-center border-3 m-auto">
                  <th className="text-center">ID</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                <>{displayOrders()}</>
                <tr className="text-center border-3 m-auto">
                  <td className="px-3"></td>
                  <td className="px-3"></td>
                  <td className="px-3"></td>
                  <td className="text-right">
                    <h5>Total:</h5>
                  </td>
                  <td className="text-center text-danger">
                    <h5>
                      <>{sumProperty()}</>
                    </h5>
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              type="button"
              className="btn btn-success btn-lg btn-block strong"
              onClick={() => window.print()}
            >
              Print<span className="glyphicon glyphicon-chevron-right"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailComponent;
