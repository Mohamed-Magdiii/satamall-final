import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import { getProducts , deleteProduct, getProductsUsingQuery} from "../../../actions/products";
import PropTypes from 'prop-types'
import { VscChromeClose } from "react-icons/vsc";
import { FcOk } from "react-icons/fc";
import ProductsSearch from "./ProductsSearch";
const ProductsPage = ({getProducts,deleteProduct,getProductsUsingQuery ,products:{products ,productQuery}}) => {
  const [query ,setQuery]= useState("")
useEffect(()=>{
      getProducts()
      getProductsUsingQuery(query)

  },[getProducts])
  const onClick = ()=>{
    setTimeout(()=>{
      console.log(productQuery);
    },400)
  }
  return (
  <> 
  <ProductsSearch onClick={onClick} onChange = {e =>setQuery(e.target.value)}/>
   <div className="card-body py-10 px-2">
  <div className="table">
    <table className="table table-hover align-middle gs-0 gy-4">
      <thead>
        <tr className="text-center border-3 fw-bolder text-muted bg-light">
          <th className="ps-4 min-w-100px">title</th>
          <th className="ps-4 min-w-100px">image</th>
          <th className="min-w-100px">Category</th>
          <th className="min-w-100px">Description</th>
          <th className="min-w-100px">price</th>
          <th className="min-w-100px">Size</th>
          <th className="min-w-100px">Color</th>
          <th className="min-w-100px">Store</th>
          <th className="min-w-100px">Status</th>
          <th className="min-w-100px">Actions</th>
        </tr>
      </thead>
      <tbody>
         {products && products.map((product ) => (
            <tr className="text-center border-3 m-auto" key={product._id}>
              <td className="border text-center">
                 <span>{product.title_en}</span>
              </td>
              <td className="border text-center">
              <img src={`http://localhost:4000/${product.image}`} className="rounded-circle w-30px" alt=""/>
              </td>
              <td className="border text-center">
                <div className="d-flex flex-column">
                  {product.categoryId.title}
                </div>
              </td>
              <td className="border text-center">
                <div className="d-flex flex-column">
                  {product.description}
                </div>
              </td>
              <td className="border text-center">
                <div className="d-flex flex-column">{product.price}</div>
              </td>
              <td className="border text-center">
                <div className="d-flex flex-column">{!product.size ? '--' : product.size}</div>
              </td>
              <td className="border text-center">
                <div className="d-flex flex-column">{product.color}</div>
              </td>
              <td className="border text-center">
                <div className="d-flex flex-column">{!product.store ? '-' : product.store}</div>
              </td>
              <td className="border text-center">
                <div className="d-flex flex-column">{product.status ? (
                    <FcOk />
                  ) : (
                    <VscChromeClose
                      className="rounded-circle text-danger"
                      style={{ fontSize: "16px" }}
                    />
                  )}</div>
              </td>
              <td className="border text-center">
               <span> <i key={product._id} className="far fa-trash-alt ml-auto text-danger" onClick={()=>deleteProduct(product._id)}/></span>
               <span><Link to={`/products-page/edit/${product._id}`}><i key={product._id} className="fas fa-edit ml-auto text-primary"/></Link></span>
              </td>
            </tr>
          )
         )}
      </tbody>
    </table>
  </div>
</div>
</>);
};
ProductsPage.propTypes = {
    getProducts:PropTypes.func.isRequired,
    deleteProduct:PropTypes.func.isRequired,
    getProductsUsingQuery:PropTypes.func.isRequired,
    products : PropTypes.object.isRequired,
}
    
const mapStateToProps = state => ({
    products : state.products
})
export default connect(mapStateToProps , {getProducts,deleteProduct,getProductsUsingQuery })(ProductsPage)