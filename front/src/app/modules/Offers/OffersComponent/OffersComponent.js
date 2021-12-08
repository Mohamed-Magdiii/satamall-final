import React from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useQuery } from "react-query";
import DisplayData from "../DisplayData";
import DisplayTags from "../DisplayTags";
import { NavLink } from 'react-router-dom';
import axios from "axios";
const getAllOffers = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/offers`, {
    headers: {
      "x-auth-token": localStorage.getItem("authToken"),
    },
  });
};
function OffersComponent() {
  const { data, isLoading, isError, error, refetch } = useQuery(
    "get-all-offers-data",
    getAllOffers
  );
  const displayUsers = () => {
    return data?.data.map((offer, index) => {
      const fromDate = new Date(offer.from);
      const toDate = new Date(offer.to);
      return (
        <tbody key={index}>
          <tr className="text-center border-3 m-auto">
            <DisplayData
              userData={[
                index + 1,
                offer.price,
                fromDate.toDateString(),
                toDate.toDateString(),
                offer.quantity,
              ]}
            />
            <td className="text-center">
              <NavLink to={`/offers/offer-detail/${offer._id}`}>
                <FaEye
                  className="cursor-pointer text-success mx-1 mt-1"
                  style={{ fontSize: "18px" }}
                />
              </NavLink>
              <FaEdit
                className="cursor-pointer text-primary mx-3"
                style={{ fontSize: "18px" }}
              />
              <AiFillDelete
                className="text-danger cursor-pointer"
                style={{ fontSize: "18px" }}
                onClick={() => {
                  deleteUser(offer._id);
                  refetch();
                }}
              />
            </td>
          </tr>
        </tbody>
      );
    });
  };
  const deleteUser = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/users/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("authToken"),
        },
      })
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };
  if (isLoading) {
    return <h1>Loading ....</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  } else {
    return (
      <div className="card-body py-3">
        <div className="table-responsive rounded">
          <table className="table table-hover align-middle gs-0 gy-4 table-light">
            <thead>
              <tr>
                <DisplayTags
                  data={[
                    "ID",
                    "Price",
                    "From",
                    "To",
                    "Quantity",
                    "Action",
                  ]}
                />
              </tr>
            </thead>
            <>{displayUsers()}</>
          </table>
        </div>
      </div>
    );
  }
}

export default OffersComponent;
