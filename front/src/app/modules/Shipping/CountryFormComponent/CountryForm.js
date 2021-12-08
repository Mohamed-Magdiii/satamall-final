import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { addCountries, getCountries,deleteCountry } from '../../../actions/shippingRegion/country'
import { Input } from "../../../../_metronic/_partials/controls"; 
import { Field, Formik } from "formik";
import { connect } from 'react-redux';

const CountryForm = ({addCountries, deleteCountry ,getCountries, country:{countries}}) => {
    useEffect(()=>{
        getCountries()
         // eslint-disable-next-line
    },[])
    const [ country , setCountry] = useState('')
    const onSubmit = (e)=>{
        e.preventDefault()
        addCountries({country})
        setCountry('')
    }
    return (
        <div>
        <Formik>
        <form className="form form-label-right" onSubmit={(e) => onSubmit(e)} >
          <div className="form-group row">
            <div className="col-lg-12">
              <Field
                name="country"
                component={Input}
                placeholder="Country"
                label="Country"
                onChange={(e) => setCountry(e.target.value)}
                value={country}
                className="form-control"
              />
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
          <th className="ps-4 min-w-100px">Actions</th>
         </tr>
      </thead>
      <tbody>
         {countries && countries.map((count ) => (
            <tr className="text-center border-3 m-auto" key={count._id}>
             <td className="border text-center">
                <div className="d-flex flex-column">
                  {count.country}
                </div>
              </td>            
              <td className="border text-center">
               <span> <i key={count._id} className="far fa-trash-alt ml-auto text-danger" onClick={e => deleteCountry(count._id)}/></span>
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

CountryForm.propTypes = {
addCountries:PropTypes.func.isRequired,
deleteCountry:PropTypes.func.isRequired,
getCountries:PropTypes.func.isRequired,
country:PropTypes.object.isRequired,
}
const mapStateToProps= state =>({
    country : state.country
})
export default connect(mapStateToProps, { addCountries,deleteCountry , getCountries})(CountryForm)

