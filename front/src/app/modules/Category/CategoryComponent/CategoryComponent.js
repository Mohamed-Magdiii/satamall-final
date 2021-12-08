import React,{useState, useEffect} from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import {deleteCategoryById, getAllCategory} from '../../../actions/category/categoryActions';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import { useHistory } from "react-router-dom";
function Category(props) {
  const history = useHistory();
  const [category, setCategories] = useState([]);
  const displayCategory = () => {
    return (
      <tbody>
        {
          category.map((cat, index)=>{
            return (
              <tr className="text-center border-3 m-auto" key={index}>
                <td className="px-3">
                  <div className="d-flex align-items-center">
                    <div className="d-flex flex-column">
                      <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                        {index+1}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-3">
                  <div className="d-flex flex-column">
                    <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                      {cat.title}
                    </span>
                  </div>
                </td>
                <td className=" text-center">
                  <FaEye 
                    className="cursor-pointer text-success mx-1"
                    style={{ fontSize: "18px" }}
                    onClick={() => history.push(`/categories/sub-category/${cat._id}`)}
                  />
                  <NavLink to={`/categories/update/${cat._id}`}>
                    <FaEdit
                      className="cursor-pointer text-primary mx-3"
                      style={{ fontSize: "18px" }} 
                    />
                  </NavLink>
                  <AiFillDelete
                    className="text-danger cursor-pointer"
                    style={{ fontSize: "18px" }}
                    onClick={() => props.deleteCategory(cat._id)}
                  />
                </td>
              </tr>
            )
          })
        }
      </tbody>
    );
  };
  useEffect(() => {
    props.getAll();
    setCategories(props.category.category);
  }, [props]);
  return (
    <div className="card-body py-3">
      <div className="table-responsive rounded">
        <table className="table table-hover align-middle gs-0 gy-4 table-light">
          <thead>
            <tr>
              <td className="min-w-125px">ID</td>
              <td className="min-w-125px text-center">TITLE</td>
              <td className="min-w-125px text-center">ACTIONS</td>
            </tr>
          </thead>
          <>{displayCategory()}</>
        </table>
      </div>
    </div>
  );
}

const mapStateToProps = (state) =>{
  return {
    category: state.category
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    getAll: () => dispatch(getAllCategory()),
    deleteCategory: (id) => dispatch(deleteCategoryById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
