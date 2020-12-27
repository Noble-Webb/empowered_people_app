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
      <div >
    
        {!localStorage.getItem("my_app_token") ?  this.props.history.push('/login')   :
              
      <div className="wrapper">
      <div >
  <div className="card">
    <div className="front">
      <h1>{title}</h1>
      <p>{author}<span>family</span></p>
      <p className="price">＼(^-^)／ {upvote}</p>
    </div>
    <div className="right">
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
  <div className="img-wrapper">
       <img className="play" src={smile} alt=''/>    
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
