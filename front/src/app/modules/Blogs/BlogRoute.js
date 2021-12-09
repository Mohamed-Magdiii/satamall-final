import React from 'react'
import { Switch, Route  } from 'react-router-dom'
import BlogListComponent from './BlogComponent/BlogListComponent'
import BlogForm from './BlogFormComponent/BlogForm'
import BlogEditForm from './BlogEditFormComponent/BlogEditForm'

function BlogRoute(props) {
    return (
       <Switch>
           <Route path="/blogs-page" exact component={BlogListComponent} />
           <Route path="/blogs-page/new" exact component={BlogForm} />
           <Route path="/blogs-page/edit/:id" exact component={BlogEditForm} />
           </Switch>
    )
}



export default BlogRoute

