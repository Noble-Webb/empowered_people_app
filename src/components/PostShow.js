import React from 'react'
import { connect } from 'react-redux'
import { Route} from 'react-router-dom';

const PostShow = (props) => {
//     console.log(props.match.params.postId)
//     console.log(props)
//     return (
//         <Route exact path='/posts/:postId' render={(route) => {
//             const id = route.match.params.postId
//             const post = props.posts.find(post => post.id == id)
//             return (
//                 <div>
//                     <h1>{props.post.title}</h1>
//                     <h1>{props.post.content}</h1>
//                 </div>
//              ) }} />
//       );
}

const mapStateToProps = (state) => {
    return{
        posts: state.posts
    }
}

export default connect(mapStateToProps, null)(PostShow)