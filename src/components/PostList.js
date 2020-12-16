import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostCard from './PostCard';
import { removePost, upvotePost} from '../actions/posts';

class PostList extends Component {

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
               {posts.map(post => <PostCard key={post.id} upvotePost={upvotePost} removePost={removePost} post={post} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    posts: state.posts
  })
} 

export default connect(mapStateToProps, { removePost, upvotePost})(PostList);
