import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getCities } from "../../../actions/shippingRegion/city";
import { Input, Select } from "../../../../_metronic/_partials/controls";
import { Field, Formik } from "formik";
import { connect } from "react-redux";
import { getCountries } from "../../../actions/shippingRegion/country";
import { addShipping } from "../../../actions/shippingRegion/shipping";

const CityForm = ({
  getCities,
  addShipping,
  getCountries,
  country: { countries, cities },
}) => {
  useEffect(() => {
    getCities();
    getCountries();
    // eslint-disable-next-line
  }, []);
  const [region, setregion] = useState("");
  const [cityId, setCityId] = useState("");
  const [price, setPrice] = useState("");
  const formData = {
    region,
    price,
    cityId,
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addShipping(formData);
    setregion("");
    setCityId(0);
    setPrice("");
  };
  return (
    <div>
      <Formik>
        <form className="form form-label-right" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group row">
            <div className="col-lg-12">
              <Select
                name="countryId"
                label="Country"
                onChange={(e) => setCityId(e.target.value)}
              >
                <option value="0">Choose Your city</option>
                {cities.map((cit) => (
                  <option key={cit._id} value={cit._id}>
                    {cit.city}
                  </option>
                ))}
              </Select>
            </div>
            <div className="col-lg-12">
              <Field
                name="region"
                component={Input}
                placeholder="Region"
                label="region"
                className="form-control"
                value={region}
                onChange={(e) => setregion(e.target.value)}
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="price"
                component={Input}
                placeholder="Price"
                label="price"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Sumbit
          </button>
        </form>
      </Formik>
    </div>
  );
};

CityForm.propTypes = {
  getCountries: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
  addShipping: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  country: state.country,
});
export default connect(mapStateToProps, {
  addShipping,
  getCountries,
  getCities,
})(CityForm);
