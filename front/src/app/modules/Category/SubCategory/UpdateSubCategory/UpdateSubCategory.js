import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { Input } from "../../../../../_metronic/_partials/controls";
import axios from "axios";
import { useHistory } from "react-router-dom";

function UpdateSubCategory({ match }) {
  const [title, setTitle] = useState("");
  const history = useHistory();
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/subcategories/${match.params.id}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("authToken"),
          },
        }
      )
      .then((response) => {
        setTitle(response.data.title);
      })
      .catch(() => {
        history.push("/error/error-v1");
      });
    // eslint-disable-next-line
  }, []);
  const handleEditCategory = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/subcategories/${match.params.id}`,
        { title },
        {
          headers: {
            "x-auth-token": localStorage.getItem("authToken"),
          },
        }
      )
      .then(() => {
        history.goBack();
      })
      .catch(() => {
        history.push("/error/error-v1");
      });
  };
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
                      label="Title"
                      value={title || ""}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="btn btn-light btn-elevate"
                onClick={() => history.push("/categories")}
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                className="btn btn-primary btn-elevate"
                onClick={handleEditCategory}
              >
                Edit
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}

export default UpdateSubCategory;
