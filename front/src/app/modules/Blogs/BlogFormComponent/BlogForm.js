/** @format */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input } from "../../../../_metronic/_partials/controls";
import { Field, Formik } from "formik";
import { connect } from "react-redux";
import { addBlog } from "../../../actions/blogs/blogs";

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const newFormData = new FormData();
  newFormData.append("image", image);
  newFormData.append("title", title);
  newFormData.append("description", description);
  const onSubmit = (e) => {
    e.preventDefault();
    addBlog(newFormData);
    setDescription("");
    setTitle("");
    setImage("");
  };
  return (
    <div>
      <Formik>
        <form className="form form-label-right"           
        encType="multipart/form-data"
 onSubmit={(e) => onSubmit(e)}>
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

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default connect(null, { addBlog })(BlogForm);
