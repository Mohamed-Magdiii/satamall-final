import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import  {getAllBlogs, deleteBlog,updateBlog} from '../../../actions/blogs/blogs'
import { Link } from 'react-router-dom'

const BlogListComponent = ({getAllBlogs ,deleteBlog, blogs:{blogs, loading}}) => {
    useEffect(() => {
        getAllBlogs()
     }, [])
     console.log(blogs);
    return (
        <div>
        <table className="table table-hover align-middle gs-0 gy-4">
      <thead>
        <tr className="text-center border-3 fw-bolder text-muted bg-light">
          <th className="ps-4 min-w-100px">Image</th>
          <th className="ps-4 min-w-100px">Title</th>
          <th className="ps-4 min-w-100px">Description</th>
          <th className="ps-4 min-w-100px">Actions</th>
         </tr>
      </thead>
      <tbody>
      {blogs && blogs.map((blg ) => (
            <tr className="text-center border-3 m-auto" key={blg._id}>
             <td className="border text-center">
                <div className="d-flex flex-column offset-4">
                <img src={`http://localhost:4000/${blg.image}`} className="rounded-circle w-60px"/>
                </div>
              </td>  
              <td className="border text-center">
                <div className="d-flex flex-column">
                  {blg.title}
                </div>
              </td>          
              <td className="border text-center">
                <div className="d-flex flex-column">
                  {blg.description}
                </div>
              </td>
             
              <td className="border text-center">
               <span> <i key={blg._id} className="far fa-trash-alt ml-auto text-danger" onClick={e => deleteBlog(blg._id)}/></span>
               <span><Link to={`/blogs-page/edit/${blg._id}`}><i key={blg._id} className="fas fa-edit ml-auto text-primary"/></Link></span>
              </td>
            </tr>
          )
         )}
          </tbody>
    </table>
        </div>
    )
}

BlogListComponent.propTypes = {
getAllBlogs:PropTypes.func.isRequired,
updateBlog:PropTypes.func.isRequired,
}
const mapStateToProps = state=>({
    blogs:state.blogs
})
export default connect(mapStateToProps, {getAllBlogs,deleteBlog, updateBlog})(BlogListComponent)
