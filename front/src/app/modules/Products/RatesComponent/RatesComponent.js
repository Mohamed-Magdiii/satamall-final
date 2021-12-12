import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import { getRates } from '../../../actions/products'
import Rater from 'react-rater'

const RatesComponent = ({getRates , products:{rates}}) => {
    useEffect(()=>{
getRates()
// eslint-disable-next-line
    },[])
    console.log(rates);
    return (
        <div className="card-body py-10 px-2">
        <div className="table">
          <table className="table table-hover align-middle gs-0 gy-4">
            <thead>
              <tr className="text-center border-3 fw-bolder text-muted bg-light">
                <th className="ps-4 min-w-100px">ID</th>
                <th className="ps-4 min-w-100px">Rate</th>
              </tr>
            </thead>
            <tbody>
                {!rates ? <h2>Data is Loading...</h2> : rates.map((rate ,index) =>(
                 <tr className="text-center border-3 m-auto" key={rate._id}>
                 <td className="border text-center">
                    <span>{index+1}</span>
                 </td>
               
                 <td className="border text-center">
                   <div className="d-flex flex-column">
                   <Rater color="#FEd847"  total={5}  rating={rate.avg} interactive={false}/>
                   </div>
                 </td>
               </tr>
                ))
                }
             </tbody>
          </table>
        </div>
      </div>
    )
}
const mapStateToProps = state =>({
    products:state.products
})
export default connect(mapStateToProps , {getRates})(RatesComponent)
