import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import axios from 'axios';
import {register} from '../../../../Auth/_redux/authCrud';
import {
  Input,
  Select,
} from "../../../../../../_metronic/_partials/controls";

function CustomerEditForm({
  saveCustomer,
  customer,
  actionsLoading,
  onHide,
}) {
  const [fullname, setfullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [type, setType] = useState("");
  const typeLists = ['user', 'admin', "vendor", "moderator"];
  const history = useHistory();
  const handleSubmit = () =>{
    register(fullname, email, password, phone, mobile, typeLists[parseInt(type) -1])
    .then(()=>{
      history.push('/e-commerce/customers')
    }).catch((error)=>{
      console.log(error.response)
    })
  }
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={customer}
        // validationSchema={CustomerEditSchema}
        onSubmit={(values) => {
          saveCustomer(values);
        }}
      >
        {() =>
        (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="fullname"
                      component={Input}
                      placeholder="Full Name"
                      label="Full Name"
                      value = {fullname}
                      onChange = {(e) => setfullname(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      type="email"
                      name="email"
                      component={Input}
                      placeholder="Email"
                      label="Email"
                      value = {email}
                      onChange = {(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      type="password"
                      name="password"
                      component={Input}
                      placeholder="Password"
                      label="Password"
                      value = {password}
                      onChange = {(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      type="text"
                      name="phone"
                      component={Input}
                      placeholder="Phone"
                      label="Phone"
                      value = {phone}
                      onChange = {(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      type="text"
                      name="mobile"
                      component={Input}
                      placeholder="Mobile"
                      label="Mobile"
                      value = {mobile}
                      onChange = {(e) => setMobile(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Select name="role" label="Type" value={type} onChange={(e)=> setType(e.target.value)}>
                      <option value="1">User</option>
                      <option value="2">Admin</option>
                      <option value="3">Vendor</option>
                      <option value="4">Moderator</option>
                    </Select>
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
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )
        }
      </Formik>
    </>
  );
}

export default CustomerEditForm;