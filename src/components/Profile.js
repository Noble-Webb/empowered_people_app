import  React from "react";
import { connect } from "react-redux";
import { Form } from 'semantic-ui-react'
import { currentUser } from "../actions/auth";
import { editPost, removePost, fetchPostsWorks } from "../actions/posts";

import smile from '../bgimages/13.jpg'


class Profile extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        posts: [],
        title: '',
        content: '',
        display: false,
        username: this.props.users.username,
        error: null
      }
  }
  
  
  

  
  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }
    
  handlePostSubmit = (e) => {
    e.preventDefault();
    const target = e.target.id  
    
    const editedPost = {
      author: this.props.users.username,
      title: this.state.title,
      content: this.state.content,
      upvote: this.state.upvote,
      user_id: this.props.users.id 
    }

    const reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(editedPost)
    }

    fetch(`http://localhost:3002/posts/${target}`, reqObj)
    .then(resp => resp.json())
    .then(updatedPost => {
      this.setState({
        title: '',
        content: '',
        display: 'false',
      })
      this.props.editPost(updatedPost)
    })
  }

  handlePostedit = () =>{
      let newBoolean = !this.state.display
      this.setState({display: newBoolean})
  }

  handlePostDelete = () => {
      const target = this.props.post.id 
  
      fetch(`http://localhost:3002/posts/${target}`, {method: 'DELETE'})
      .then(resp => resp.json())
      .then(data => { 
        console.log(data.post.id)
        // this.props.removePost(data.post.id)
        window.location.reload();
    })
  }

  render(){
    const {title, content, id, upvote} = this.props.post
    console.log(this.state.posts)
    

    return(
      <div>
        {this.state.error ? <h4 style={{color: 'red'}}>{this.state.error}</h4> : null}

    <div className="float-right">
        { this.state.display
        ?
        <form className={'new-post-form'} inverted onSubmit={()=>this.handlePostSubmit}>
      <h1>Learn something new today? </h1>
    <form widths='equal'>
      <Form.Input
        name='title'
        onChange={this.handleChange}
        value={title}
        id='form-subcomponent-shorthand-input-first-name'
        label='Post Title'
        placeholder='Post Title'
      />
    </form>
    <br/>
    <form widths='equal'>
      <Form.Input
        name='content'
        onChange={this.handleChange}
        value={content}
        id='form-subcomponent-shorthand-input-first-name'
        label='Content'
        placeholder='Content'
      />
    </form>
    <button type='submit'>Submit</button>
  </form>
        :
        null 
    } 
  <div class="flex flex-wrap -m-3">
<div class="wrapper">
<div class="card">
<div class="front">
<h1>{title}</h1>
<p><span>family</span></p>
<p class="price">＼(^-^)／ {upvote}</p>
</div>
<div class="right">
<h2>{title}</h2>
<ul>
  <li>Quality Content: {content}</li>
</ul>

      <button 
        id={id}
        type="button" 
        onClick={this.handlePostDelete} 
        className="btn btn-danger">
        Delete Post
      </button>
</div>
</div>
<div class="img-wrapper">
 <img class="play" src={smile} alt=''/>    
</div>
</div>
</div>
  </div>
    </div>
  )}
}

const mapStateToProps = (state) => {
    return{
      users: state.users,
      auth: state.auth, 
      posts: state.posts
    }
}

const mapDispatchToProps = {
    currentUser,
    editPost,
    removePost,
    fetchPostsWorks
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
