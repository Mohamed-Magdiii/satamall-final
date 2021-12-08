import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { Input, Select } from "../../../../_metronic/_partials/controls";
import axios from "axios";
import { useHistory } from "react-router-dom";

function CategoryUpdate({ match }) {
  const [title, setTitle] = useState("");
  const [showInMenu, setShowInMenu] = useState("");
  const history = useHistory();
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/categories/${match.params.id}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("authToken"),
          },
        }
      )
      .then((response) => {
        setTitle(response.data.title);
        setShowInMenu(response.data.showInMenu);
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
        `${process.env.REACT_APP_API_URL}/api/categories/${match.params.id}`,
        { title, showInMenu },
        {
          headers: {
            "x-auth-token": localStorage.getItem("authToken"),
          },
        }
      )
      .then(() => {
        history.push("/categories");
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
                  <div className="col-lg-4">
                    <Select
                      name="showInMenu"
                      label="showInMenu"
                      value={showInMenu || ""}
                      onChange={(e) => setShowInMenu(e.target.value)}
                    >
                      <option value="false">False</option>
                      <option value="true">True</option>
                    </Select>
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

export default CategoryUpdate;
