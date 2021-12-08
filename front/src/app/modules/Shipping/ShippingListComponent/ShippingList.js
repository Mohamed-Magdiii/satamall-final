import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteShipping, getShipping } from '../../../actions/shippingRegion/shipping'

const ShippingList = ({ getShipping, deleteShipping, country:{regions}}) => {
    useEffect(()=>{
      getShipping()
    },[getShipping])
    return (
        <div>
            <table className="table table-hover align-middle gs-0 gy-4">
      <thead>
        <tr className="text-center border-3 fw-bolder text-muted bg-light">
          <th className="ps-4 min-w-100px">Country</th>
          <th className="ps-4 min-w-100px">City</th>
          <th className="ps-4 min-w-100px">Region</th>
          <th className="ps-4 min-w-100px">Price</th>
          <th className="ps-4 min-w-100px">Actions</th>
         </tr>
      </thead>
      <tbody>
      {regions && regions.map((reg ) => (
            <tr className="text-center border-3 m-auto" key={reg._id}>
             <td className="border text-center">
                <div className="d-flex flex-column">
                  {reg.countryname}
                </div>
              </td>  
              <td className="border text-center">
                <div className="d-flex flex-column">
                  {reg.cityname}
                </div>
              </td>          
              <td className="border text-center">
                <div className="d-flex flex-column">
                  {reg.region}
                </div>
              </td>
              <td className="border text-center">
                <div className="d-flex flex-column">
                  {reg.price}
                </div>
              </td>
              <td className="border text-center">
               <span> <i key={reg._id} className="far fa-trash-alt ml-auto text-danger" onClick={e => deleteShipping(reg._id)}/></span>
              </td>
            </tr>
          )
         )}
          </tbody>
    </table>
        </div>
    )
}

ShippingList.propTypes = {
getShipping:PropTypes.func.isRequired,
deleteShipping:PropTypes.func.isRequired,
}
const mapStateToProps = state =>({
  country : state.country
})
export default connect(mapStateToProps , {getShipping , deleteShipping})(ShippingList)
