import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import { Input } from "../../../../../_metronic/_partials/controls";
import axios from "axios";
function AddSubCategory({ onHide }) {
  const [title, setTitle] = useState('');
  const { id } = useParams();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/api/subcategories`, {category: id ,title}, {
      headers: {
        'x-auth-token': localStorage.getItem('authToken')
      }
    }).then(()=>{
      history.push(`/categories/sub-category/${id}`)
    }).catch(()=>{
      history.push("/error/error-v1");
    })
  }
  return (
    <>
      <Formik>
        {() => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-8">
                    <Field
                      name="title"
                      component={Input}
                      placeholder="Title"
                      label="Sub Category"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-elevate"
                onClick={handleSubmit}
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}

export default AddSubCategory;
