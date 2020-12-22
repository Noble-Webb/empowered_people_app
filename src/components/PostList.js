import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostCard from './PostCard';
import { fetchPostsWorks } from "../actions/posts";
import { removePost, upvotePost} from '../actions/posts';


class PostList extends Component {
  componentDidMount(){
    fetch('http://localhost:3002/posts')
    .then(resp => resp.json())
    .then(posts =>{
      console.log(posts)
      this.props.fetchPostsWorks(posts)
    })
  }
  
  render() {
    const { posts, removePost, upvotePost} = this.props;
    return (
      <div>
        <hr />
        <div className="posts">
          <h2>Posts</h2>
        </div>
        <hr />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
               { localStorage.getItem("my_app_token") 
                  ?
                  posts.map(post => <PostCard key={post.id} upvotePost={upvotePost} removePost={removePost} post={post} />)
                    :
                    null
                }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    posts: state.posts,
    users: state.users,
    auth: state.auth
  })
} 

export default connect(mapStateToProps, { removePost, upvotePost, fetchPostsWorks})(PostList);
