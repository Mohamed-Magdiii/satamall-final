import React from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useQuery } from "react-query";
import DisplayData from "./DisplayData";
import DisplayTags from "./DisplayTags";
import axios from "axios";
const getAllCustomers = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/users`, {
    headers: {
      "x-auth-token": localStorage.getItem("authToken"),
    },
  });
};
function CustomerPage() {
  const { data, isLoading, isError, error, refetch } = useQuery(
    "get-all0customers-data",
    getAllCustomers
  );
  const displayUsers = () => {
    return data?.data.map((user, index) => {
      return (
        <tbody key={index}>
          <tr className="text-center border-3 m-auto">
            <DisplayData
              userData={[
                index + 1,
                user.username,
                user.email,
                user.role,
                user.telephone,
                user.mobile,
              ]}
            />
            <td className="text-center">
              <FaEdit
                className="cursor-pointer text-primary mx-3"
                style={{ fontSize: "18px" }}
              />
              <AiFillDelete
                className="text-danger cursor-pointer"
                style={{ fontSize: "18px" }}
                onClick={() => {
                  deleteUser(user._id);
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
                    "UserName",
                    "Email",
                    "Role",
                    "Telephone",
                    "Mobile",
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

export default CustomerPage;
