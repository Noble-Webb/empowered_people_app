import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostCard from './PostCard';
import Profile from './Profile'
import { fetchPostsWorks } from "../actions/posts";
import { removePost, upvotePost, editPost} from '../actions/posts';


class PostList extends Component {
  componentDidMount(){
    fetch('http://localhost:3001/posts')
    .then(resp => resp.json())
    .then(posts =>{
      console.log(posts)
      this.props.fetchPostsWorks(posts)
    })
    fetch('http://localhost:3001/users')
    .then(resp => resp.json())
    .then(users => {
      // console.log(users)
      this.setState({
        users: users
      })
    })
  }
  
  render() {
    const { posts, removePost, upvotePost, editPost} = this.props;
    return (
    //   <Route path='/notes/:noteId' render={(route) => {
    //     debugger
    //     const id = route.match.params.noteId
    //     const note = this.state.notes.find(note => note.id === id)
    //     return <NoteShow note={note}/>
    // }} />
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
               { localStorage.getItem("my_app_token") 
                  ?
                  posts.map(post => {
                    if (post.author === this.props.users.username){
                      return <Profile key={post.id} post={post} removePost={removePost} editPost={editPost} />
                    }
                   })
                    :
                <h1>Please Login </h1>
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

export default connect(mapStateToProps, { removePost, upvotePost, editPost, fetchPostsWorks})(PostList);
