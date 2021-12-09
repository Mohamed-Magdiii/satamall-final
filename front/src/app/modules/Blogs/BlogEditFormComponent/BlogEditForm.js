import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Input, Select } from "../../../../_metronic/_partials/controls";
import { Field, Formik } from "formik";
import { connect } from "react-redux";
import { updateBlog, getBlogByID } from "../../../actions/blogs/blogs";
import { Link } from "react-router-dom";
import axios from "axios";

const BlogEditForm = ({ updateBlog,history, match,getBlogByID,blogs:{blog}}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  useEffect(()=>{
    axios.get(
      `${process.env.REACT_APP_API_URL}/api/blogs/${match.params.id}`,
      { headers: { "x-auth-token": localStorage.getItem("authToken") } }
    ).then((response) =>{
      setTitle(response.data.title)
      setDescription(response.data.description)
      setImage(response.data.image)
    }).catch((error) => console.log(error.response))
},[])
const onSubmit = (e)=>{
  e.preventDefault()
  updateBlog({title,description,image},match.params.id)
  setTimeout(()=>{
    history.push('/blogs-page')
  },400)
}
return (
    <div>
      <Formik>
        <form className="form form-label-right" 
        encType="multipart/form-data"
        onSubmit={(e)=>onSubmit(e)}
        >
          <div className="form-group row">
            <div className="col-lg-6">
              <Field
                name="title"
                component={Input}
                placeholder="Title"
                label="Title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label">Choose Blog Image</label>

              <div className="btn btn-bg-dark">
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  name="image"
                />
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-12">
              <Field
                name="description"
                // component={Input}
                as="textarea"
                placeholder="description"
                label="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Sumbit
          </button>
        </form>
      </Formik>
      .
    </div>
  );
};

BlogEditForm.propTypes = {
  updateBlog: PropTypes.func.isRequired,
  getBlogByID: PropTypes.func.isRequired,
};
const mapStateToProps = (state) =>({
blogs:state.blogs
});

export default connect(mapStateToProps, { getBlogByID, updateBlog })(BlogEditForm);
