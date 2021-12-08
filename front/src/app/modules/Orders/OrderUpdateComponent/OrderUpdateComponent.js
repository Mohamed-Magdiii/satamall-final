import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { Input, Select } from "../../../../_metronic/_partials/controls";
import axios from "axios";
import {useHistory} from 'react-router-dom'

function OrderUpdateComponent({ match }) {
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [shipping_cost, setShippingCost] = useState("");
  const [type, setType] = useState("");
  const [is_paid, setIsPaid] = useState("");
  const history = useHistory();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/orders/${match.params.id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        setPhone(response.data.phone);
        setPrice(response.data.price);
        setAddress(response.data.address);
        setIsPaid(response.data.is_paid);
        setType(response.data.type);
        setShippingCost(response.data.shipping_cost);
      })
      .catch(() => {
        history.push("/error/error-v1");
      });
    // eslint-disable-next-line
  }, []);
  const handleEditOrder = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/orders/${match.params.id}`,
        { phone, price, address, is_paid, type, shipping_cost },
        {
          headers: {
            "x-auth-token": localStorage.getItem("authToken"),
          },
        }
      )
      .then(() => {
        history.push('/orders')
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
                  <div className="col-lg-4">
                    <Field
                      name="phone"
                      component={Input}
                      placeholder="Phone"
                      label="Phone"
                      value={phone || ""}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="shipping_cost"
                      component={Input}
                      placeholder="Shipping Cost"
                      label="Shipping Cost"
                      value={shipping_cost || ""}
                      onChange={(e) => setShippingCost(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="price"
                      component={Input}
                      placeholder="Price"
                      label="Price"
                      value={price || ""}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Select
                      name="type"
                      label="Status Of Order"
                      value={type || ""}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="onDelivery">On Delivery</option>
                      <option value="Deliverd">Deliverd</option>
                      <option value="Refused">Refused</option>
                    </Select>
                  </div>
                  <div className="col-lg-4">
                    <Select
                      name="is_paid"
                      label="State Of Payment"
                      value={is_paid || ""}
                      onChange={(e) => setIsPaid(e.target.value)}
                    >
                      <option value="false">False</option>
                      <option value="true">True</option>
                    </Select>
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="address"
                      component={Input}
                      placeholder="Address"
                      label="Address"
                      value={address || ""}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button type="button" className="btn btn-light btn-elevate"
              onClick={() => history.push('/orders')}>
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                className="btn btn-primary btn-elevate"
                onClick={handleEditOrder}
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

export default OrderUpdateComponent;
