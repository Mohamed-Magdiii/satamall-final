import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useParams } from "react-router";
import { useHistory, NavLink } from "react-router-dom";
function SubCategoryComponent() {
  const [subCategories, setSubCategories] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const displayOrders = () => {
    return subCategories.map((subCategory, index) => {
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
                  {subCategory.category.title}
                </span>
              </div>
            </td>
            <td className="px-3">
              <div className="d-flex flex-column">
                <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                  {subCategory.title}
                </span>
              </div>
            </td>
            <td className="text-center">
              <FaEdit
                className="cursor-pointer text-primary mx-1"
                style={{ fontSize: "16px" }}
                onClick={() =>
                  history.push(
                    `/categories/sub-category/update/${subCategory._id}`
                  )
                }
              />
              <AiFillDelete
                className="text-danger cursor-pointer"
                style={{ fontSize: "16px" }}
                onClick={() => deleteSubCategory(subCategory._id)}
              />
            </td>
          </tr>
        </tbody>
      );
    });
  };
  const deleteSubCategory = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/subcategories/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        setSubCategories(response.data);
      })
      .catch(() => {
        history.push("/error/error-v1");
      });
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/subcategories/category/${id}`)
      .then((response) => {
        setSubCategories(response.data);
      })
      .catch(() => {
        history.push("/error/error-v1");
      });
    // eslint-disable-next-line
  }, []);
  return (
    <div className="card-body py-3">
      <NavLink to={`/categories/sub-category/add/${id}`}>
        <button className="btn btn-primary float-right mb-2">
          Add Sub Category
        </button>
      </NavLink>
      <div className="table-responsive rounded">
        <table className="table table-hover align-middle gs-0 gy-4 table-light">
          <thead>
            <tr>
              <td className="min-w-125px">ID</td>
              <td className="min-w-125px text-center">Category</td>
              <td className="min-w-125px text-center">Sub Category Title</td>
              <td className="min-w-125px text-center">Action</td>
            </tr>
          </thead>
          <>{displayOrders()}</>
        </table>
      </div>
    </div>
  );
}

export default SubCategoryComponent;
