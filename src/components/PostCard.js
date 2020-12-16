import React from 'react';
import { connect } from 'react-redux';
import  { removePost, upvotePost} from '../actions/posts'

class Post extends React.Component{
 
  handleDelete = (e) => {
    const target = this.props.post.id 

    fetch(`http://localhost:3001/posts/${target}`, {method: 'DELETE'})
    .then(resp => resp.json())
    .then(data => {
      this.props.removePost(data.id)
    })
  }
  
  handleUpVotes = (e) => { 
    const target = this.props.post.id  
    
    const reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(this.props.post)
    }

    fetch(`http://localhost:3001/posts/${target}`, reqObj)
    .then(resp => resp.json())
    .then(updatedPost => {
      this.props.upvotePost(updatedPost.id)
    })
  }
  
  render(){

    const {title, content, id, upvotes, author} = this.props.post
    return(
        <div >
          <div className="card">
              <p>{title}</p>
              <p>{content}</p>
              <form>
                  <textarea placeholder="Isn't that cool?!?"/>
                </form>
          <div className="float-right"> 
            <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
              <button 
                type="button" 
                id={id}
                name='up'
                value={upvotes}
                onClick={this.handleUpVotes} 
                className="btn btn-primary"
              >
                Upvote
              </button>
              <button 
                id={id}
                type="button" 
                onClick={this.handleDelete} 
                className="btn btn-danger"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              </div>
            </div>
            <div>Votes: {upvotes}</div>
            <p>{author}</p>
          </div>
        </div>
    )
  }
}


export default connect(null, { removePost, upvotePost })(Post);