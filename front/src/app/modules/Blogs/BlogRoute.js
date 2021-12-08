import React from 'react'
import { Switch, Route  } from 'react-router-dom'
import BlogListComponent from './BlogComponent/BlogListComponent'
import BlogForm from './BlogFormComponent/BlogForm'

function BlogRoute(props) {
    return (
       <Switch>
           <Route path="/blogs-page" exact component={BlogListComponent} />
           <Route path="/blogs-page/new" exact component={BlogForm} />
           </Switch>
    )
}



export default BlogRoute

