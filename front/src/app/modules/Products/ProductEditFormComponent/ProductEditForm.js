import React, { useEffect ,useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProductByID ,getCategory, updateProduct } from "../../../actions/products";
import { Input, Select } from "../../../../_metronic/_partials/controls"; //_metronic/_partials/controls
import { Field, Formik } from "formik";

import axios from "axios";
const ProductEditForm = ({ match,updateProduct,history, getProductByID,getCategory, products:{ product ,categories}}) => {
  const [image, setImage] = useState("");
  const [color, setColor] = useState([]);
  const [title_en, setTitle_en] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [size, setSize] = useState("")
  const [sale, setSale] = useState("")
  const [store, setStore] = useState("")
  const [status, setStatus] = useState("")


useEffect(() => 
{  
        axios.get(
        `${process.env.REACT_APP_API_URL}/api/products/${match.params.id}`,
        { headers: { "x-auth-token": localStorage.getItem("authToken") } }
      ).then((response) =>{
        setTitle_en(response.data.title_en)
        setCategoryId(response.data.categoryId)
        setPrice(response.data.price)
        setDescription(response.data.description)
        setSize(response.data.size)
        setSale(response.data.sale)
        setStore(response.data.store)
        setColor(response.data.color)
        setImage(response.data.image)
        setImage(response.data.image)
        setStatus(response.data.status)
      }).catch((error) => console.log(error.response))
      getCategory()
} , []);


const [displaySocialInputs, toggleSocialInputs] = useState(false); 
const onSubmit =(e)=>{
e.preventDefault()
updateProduct({title_en, categoryId,price,description,size,color,sale,store,image,status}, match.params.id)

setTimeout(()=>{
  history.push('/products-page')
},500)
}
  return (
    <div>
      <Formik>
        <form
          className="form form-label-right"
          encType="multipart/form-data"
          onSubmit={(e) => onSubmit(e)}
        >
          <div className="form-group row">
            <div className="col-lg-12">
              <Field
                name="title_en"
                component={Input}
                placeholder="Title"
                label="Title"
                onChange={(e) => setTitle_en(e.target.value)}
                value={title_en}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-12">
              <Select
                name="categoryId"
                label="Category"
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                }}
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          {/* Choose Image */}
          <div className="form-group row">
            <div className="col-lg-5">
              <label className="form-label">
                <span>Choose Product Image .</span>
              </label>
              <div className="btn btn-bg-dark">
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  name="image"
                />
              </div>
            </div>
            <div className="col-lg-4">
                  <Select
                    name="status"
                    label="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  > <option value="false">false</option>
                    <option value="true">true</option>
                  </Select>
                </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-12">
              <Field
                name="store"
                component={Input}
                placeholder="Store"
                label="store"
                onChange={(e) => setStore(e.target.value)}
                value={store}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-12">
              <Field
                type="number"
                name="price"
                component={Input}
                value={price}
                placeholder="Price"
                label="Price ($)"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <Field
              name="description"
              as="textarea"
              label="Description"
              value={description}
              component={Input}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="my-2">
            <button
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              type="button"
              className="btn btn-light text-dark"
            >
              More Options
            </button>
            <span>Optional</span>
          </div>
          {displaySocialInputs && (
            <div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Select
                    name="size"
                    label="Select Size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  ><option value="small">small</option>
                    <option value="medium">medium</option>
                    <option value="large">large</option>
                    <option value="x-large">x-large</option>
                  </Select>
                </div>
                <div className="col-lg-4">
                  <Field
                    name="sale"
                    component={Input}
                    placeholder="sale"
                    label="sale"
                    onChange={(e) => setSale(e.target.value)}
                    value={sale}
                    className="form-control"
                  />
                </div>
                <div className="col-lg-4">
                  <label>Select Color</label>
                  <select
                    className="form-control form-control-solid is-valid-select"
                    name="color"
                    multiple
                    value={color}
                    onChange={(e) =>
                      setColor(
                        [...e.target.selectedOptions].map((o) => o.value)
                      )
                    }
                  ><option value="Red">Red</option>
                    <option value="CadetBlue">CadetBlue</option>
                    <option value="Eagle">Eagle</option>
                    <option value="Gold">Gold</option>
                    <option value="LightSlateGrey">LightSlateGrey</option>
                    <option value="RoyalBlue">RoyalBlue</option>
                    <option value="Crimson">Crimson</option>
                    <option value="Blue">Blue</option>
                    <option value="Sienna">Sienna</option>
                    <option value="Indigo">Indigo</option>
                    <option value="Green">Green</option>
                    <option value="Violet">Violet</option>
                    <option value="GoldenRod">GoldenRod</option>
                    <option value="OrangeRed">OrangeRed</option>
                    <option value="Khaki">Khaki</option>
                    <option value="Teal">Teal</option>
                    <option value="Purple">Purple</option>
                    <option value="Orange">Orange</option>
                    <option value="Pink">Pink</option>
                    <option value="Black">Black</option>
                    <option value="DarkTurquoise">DarkTurquoise</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        
          <button type="submit" className="btn btn-primary">
            Sumbit
          </button>
        </form>
      </Formik>{" "}
    </div>
  );
};

ProductEditForm.propTypes = {
  getProductByID: PropTypes.func.isRequired,
  getCategory:PropTypes.func.isRequired,
  updateProduct:PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  products: state.products,
});
export default connect(mapStateToProps, {updateProduct, getProductByID , getCategory })(ProductEditForm);
