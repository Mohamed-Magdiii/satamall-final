import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { addCities, getCities,deleteCity } from '../../../actions/shippingRegion/city'
import { Input, Select } from "../../../../_metronic/_partials/controls"; 
import { Field, Formik } from "formik";
import { connect } from 'react-redux';
import { getCountries } from '../../../actions/shippingRegion/country';

const CityForm = ({addCities, deleteCity, getCities ,getCountries, country:{countries , cities}}) => {
    useEffect(()=>{
        getCities()
        getCountries()
        // eslint-disable-next-line 
    },[])
const [city , setCity] = useState('')
const [countryId , setCountryId] = useState('')
const formData = {
    city , 
    countryId
}
const onSubmit = (e)=>{
    e.preventDefault()
    console.log(formData);
    addCities(formData)
}
    return (
        <div>
        <Formik>
        <form className="form form-label-right" onSubmit={e => onSubmit(e)}>
          <div className="form-group row">
            <div className="col-lg-12">
              <Field
                name="city"
                component={Input}
                placeholder="City"
                label="City"
               className="form-control"
               value={city}
               onChange={(e)=>setCity(e.target.value)}
              />
            </div>
            <div className="col-lg-12">
              <Select
                name="countryId"
                label="Country"
                onChange={(e)=>setCountryId(e.target.value)}
              ><option value="0">Choose Your Country</option>
                {countries.map((count) => (
                  <option key={count._id} value={count._id}>
                    {count.country}
                  </option>
                ))}
            </Select>
            </div>
            </div>
            <button type="submit" className="btn btn-primary">
            Sumbit
          </button>
        </form>
      </Formik>
      <hr/>
      <div>
    <table className="table table-hover align-middle gs-0 gy-4">
      <thead>
        <tr className="text-center border-3 fw-bolder text-muted bg-light">
          <th className="ps-4 min-w-100px">Country</th>
          <th className="ps-4 min-w-100px">City</th>
          <th className="ps-4 min-w-100px">Actions</th>
         </tr>
      </thead>
      <tbody>
      {cities && cities.map((cit ) => (
            <tr className="text-center border-3 m-auto" key={cit._id}>
             <td className="border text-center">
                <div className="d-flex flex-column">
                  {cit.city}
                </div>
              </td>     
              <td className="border text-center">
                <div className="d-flex flex-column">
                  {cit.countryname}
                </div>
              </td>        
              <td className="border text-center">
               <span> <i key={cit._id} className="far fa-trash-alt ml-auto text-danger" onClick={(e) => deleteCity(cit._id)}/></span>
              </td>
            </tr>
          )
         )}
          </tbody>
    </table>
      </div>
        </div>

        
    )
}

CityForm.propTypes = {
getCountries:PropTypes.func.isRequired,
getCities:PropTypes.func.isRequired,
addCities:PropTypes.func.isRequired,
deleteCity:PropTypes.func.isRequired,
}
const mapStateToProps= state =>({
    country : state.country
})
export default connect(mapStateToProps, {addCities, getCountries , getCities, deleteCity})(CityForm)

