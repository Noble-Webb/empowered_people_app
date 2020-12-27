import React from 'react';
import { connect } from 'react-redux';
import  { upvotePost} from '../actions/posts'
import smile from '../bgimages/12.jpg'


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

    fetch(`http://localhost:3002/posts/${target}`, reqObj)
    .then(resp => resp.json())
    .then(updatedPost => {
      this.props.upvotePost(updatedPost.id)
    })
  }
  
  render(){

    const {title, content, id, upvote, author, kingdom} = this.props.post 
    return(
      <div>
    
        {!localStorage.getItem("my_app_token") ?  this.props.history.push('/login')   :
              
      <div class="flex flex-wrap -m-3">
      <div class="wrapper">
  <div class="card">
    <div class="front">
      <h1>{title}</h1>
      <p>{author}<span>family</span></p>
      <p class="price">:p {upvote}</p>
    </div>
    <div class="right">
      <h2>{title}</h2>
      <ul>
        <li>Quality Content: {content}</li>
      </ul>
      <button type="button" 
                id={id}
                name='up'
                value={upvote}
                onClick={this.handleUpVotes}>Show Some Love</button>
    </div>
  </div>
  <div class="img-wrapper">
       <img class="play" src={smile} alt=''/>    
  </div>
</div>
</div>
              
}
</div>

    )
  }
}
const mapStateToProps = state => {
  return ({
    users: state.users,
    auth: state.auth, 
    posts: state.posts
  })
}

export default connect(mapStateToProps, { upvotePost })(PostCard);
