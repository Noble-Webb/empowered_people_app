import React from 'react';
import { connect } from 'react-redux';
import  { upvotePost} from '../actions/posts'

class PostCard extends React.Component{
 
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

    const {title, content, id, upvote, author} = this.props.post 
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
                value={upvote}
                onClick={this.handleUpVotes} 
                className="btn btn-primary"
              >
                Upvote
              </button>
              </div>
            </div>
            <div>Votes: {upvote}</div>
            <p>{author}</p>
          </div>
        </div>
    )
  }
}


export default connect(null, { upvotePost })(PostCard);