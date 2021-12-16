import { connect } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { getRates,updateApproval,getRatesUsingQuery } from '../../../actions/products'
import Rater from 'react-rater'
import ProductsSearch from '../ProductComponent/ProductsSearch'

const RatesComponent = ({getRates,history ,getRatesUsingQuery ,updateApproval, products:{rates , rateQuery}}) => {
const [number ,setNumber] = useState("")
const [queryData , setQueryData] = useState()
useEffect(()=>{
getRates() 

// eslint-disable-next-line
},[])
const onSubmit = (e)=>{
  e.preventDefault()
   getRatesUsingQuery(number)
   setQueryData(rateQuery)
}
console.log(rateQuery);
return (
       <>
         <ProductsSearch
           onClick={e => onSubmit(e)}
           onChange={(e) => setNumber(e.target.value)}
         />
          <button
                type="button"
                className="btn btn-light btn-elevate"
                onClick={() => setQueryData("")}
              >
                Cancel
              </button>
         <div className="card-body py-10 px-2">
           <div className="table">
             <table className="table table-hover align-middle gs-0 gy-4">
               <thead>
                 <tr className="text-center border-3 fw-bolder text-muted bg-light">
                   <th className="ps-4 min-w-20px">ID</th>
                   <th className="ps-4 min-w-100px">Rate</th>
                   <th className="ps-4 min-w-100px">Product Name</th>
                   <th className="ps-4 min-w-100px">Name</th>
                   <th className="ps-4 min-w-100px">Approved</th>
                   <th className="ps-4 min-w-100px">Comment</th>
                   <th className="ps-4 min-w-100px">Actions</th>
                 </tr>
               </thead>
              {!queryData ? ( 
              <tbody>
                 {!rates ? (
                   <h2>Data is Loading...</h2>
                 ) : (
                   rates.map((rate, index) => (
                     <tr className="text-center border-3 m-auto" key={rate._id}>
                       <td className="border text-center">
                         <span>{index + 1}</span>
                       </td>
                       <td className="border text-center">
                         <div className="d-flex flex-column">
                           <Rater
                             color="#FEd847"
                             total={5}
                             rating={rate.rate}
                             interactive={false}
                           />
                         </div>
                       </td>
                       <td className="border text-center">
                         <span>{rate.product.title_en}</span>
                       </td>
                       <td className="border text-center">
                         <span>{rate.user.fullname}</span>
                       </td>
                       <td className="border text-center">
                           <select
                             name="myselect"
                             id="myselect"
                             onChange={(e) => {
                               updateApproval(e.target.value, rate._id);
                             }}
                           >
                             {" "}
                             <option
                               value="false"
                               selected={rate.isApproved === false}
                             >
                               pending
                             </option>
                             <option
                               value="true"
                               selected={rate.isApproved === true}
                             >
                               approved
                             </option>
                           </select>
                       </td>
                       <td className="border text-center">
                         <span>{rate.comment}</span>
                       </td>
                       <td className="border text-center">
                         <span>
                           {" "}
                           <i
                             key={rate._id}
                             className="far fa-trash-alt ml-auto text-danger"
                             onClick={() => alert("Hello")}
                           />
                         </span>
                       </td>
                     </tr>
                   ))
                 )}
               </tbody>
               ): (<tbody>
                {!rateQuery ? (
                  <h2>Data is Loading...</h2>
                ) : (
                  rateQuery.map((rate, index) => (
                    <tr className="text-center border-3 m-auto" key={rate._id}>
                      <td className="border text-center">
                        <span>{index + 1}</span>
                      </td>
                      <td className="border text-center">
                        <div className="d-flex flex-column">
                          <Rater
                            color="#FEd847"
                            total={5}
                            rating={rate.rate}
                            interactive={false}
                          />
                        </div>
                      </td>
                      <td className="border text-center">
                        <span>{rate.product.title_en}</span>
                      </td>
                      <td className="border text-center">
                        <span>{rate.user.fullname}</span>
                      </td>
                      <td className="border text-center">
                        <form>
                          <select
                            name="myselect"
                            id="myselect"
                            onChange={(e) => {
                              updateApproval(e.target.value, rate._id);
                            }}
                          >
                            {" "}
                            <option
                              value="false"
                              selected={rate.isApproved === false}
                            >
                              pending
                            </option>
                            <option
                              value="true"
                              selected={rate.isApproved === true}
                            >
                              approved
                            </option>
                          </select>
                        </form>
                      </td>
                      <td className="border text-center">
                        <span>{rate.comment}</span>
                      </td>
                      <td className="border text-center">
                        <span>
                          {" "}
                          <i
                            key={rate._id}
                            className="far fa-trash-alt ml-auto text-danger"
                            onClick={() => alert("Hello")}
                          />
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>) }
             </table>
           </div>
         </div>
       </>
     );
}
const mapStateToProps = state =>({
    products:state.products
})
export default connect(mapStateToProps , {getRates,updateApproval,getRatesUsingQuery})(RatesComponent)
