import React from "react";
import { useQuery } from "react-query";
import { FaEdit, FaEye } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";
import { FcOk } from "react-icons/fc";
import axios from "axios";
import { Link } from "react-router-dom";

function OrderTypes({ match }) {
  const { isLoading, data, isError, error, refetch } = useQuery(
    "get-pending-orders-data",
    () =>
      axios.get(
        `${process.env.REACT_APP_API_URL}/api/orders/type/${match.params.type}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("authToken"),
          },
        }
      ),
    {
      refetchInterval: 10,
    }
  );
  const displayOrderTypes = () => {
    return data?.data.map((order, index) => {
      const date = new Date(order.createdAt);
      const [month, day, year] = [
        date.getMonth() + 1,
        date.getDate(),
        date.getFullYear(),
      ];
      return (
        <tbody key={index}>
          <tr className="text-center border-3 m-auto">
            <td className="px-3">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column">
                  <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                    {index + 1}
                  </span>
                </div>
              </div>
            </td>
            <td className="px-3">
              <div className="d-flex flex-column">
                <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                  {order.customer.username
                    ? order.customer.username
                    : order.customer.fullname}
                </span>
              </div>
            </td>
            <td className="px-3">
              <div className="d-flex flex-column">
                <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                  {order.type}
                </span>
              </div>
            </td>
            <td className="px-3">
              <div className="d-flex flex-column">
                <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                  {order.is_paid ? (
                    <FcOk />
                  ) : (
                    <VscChromeClose
                      className="rounded-circle text-danger"
                      style={{ fontSize: "16px" }}
                    />
                  )}
                </span>
              </div>
            </td>
            <td className="px-3">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column w-100">
                  <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                    {order.price}
                  </span>
                </div>
              </div>
            </td>
            <td className="px-3">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column w-100">
                  <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                    {order.shipping_cost}
                  </span>
                </div>
              </div>
            </td>
            <td className="px-3">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column w-100">
                  <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                    {year} / {month} / {day}
                  </span>
                </div>
              </div>
            </td>
            <td className="text-center">
              <Link to={`/orders/order-item/${order._id}`}>
                <FaEye
                  className="cursor-pointer text-success mx-1"
                  style={{ fontSize: "18px" }}
                />
              </Link>
              <Link to={`/orders/update-order/${order._id}`}>
                <FaEdit
                  className="cursor-pointer text-primary mx-1"
                  style={{ fontSize: "16px" }}
                />
              </Link>
              <AiFillDelete
                className="text-danger cursor-pointer"
                style={{ fontSize: "16px" }}
                onClick={() => {
                  deleteOrder(order._id);
                  refetch();
                }}
              />
            </td>
          </tr>
        </tbody>
      );
    });
  };
  const deleteOrder = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/orders/${id}`, {
      headers: {
        "x-auth-token": localStorage.getItem("authToken"),
      },
    });
  };
  if (isLoading) {
    return <h1>Loading .. </h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <div className="card-body py-3">
      <div className="table-responsive rounded">
        <table className="table table-hover align-middle gs-0 gy-4 table-light">
          <thead>
            <tr>
              <td className="min-w-125px">ID</td>
              <td className="min-w-125px text-center">Customer</td>
              <td className="min-w-125px text-center">Type</td>
              <td className="min-w-125px text-center">Paid</td>
              <td className="min-w-125px text-center">Price</td>
              <td className="min-w-125px text-center">ShippingCost</td>
              <td className="min-w-125px text-center">Date</td>
              <td className="min-w-125px text-center">Action</td>
            </tr>
          </thead>
          <>{displayOrderTypes()}</>
        </table>
      </div>
    </div>
  );
}

export default OrderTypes;
