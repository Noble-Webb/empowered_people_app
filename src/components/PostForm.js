import React from 'react'
import { connect } from 'react-redux';
import { addPost } from '../actions/posts';
import { currentUser } from "../actions/auth";
import { Form } from 'semantic-ui-react'
import AutosizeInput from 'react-input-autosize';

class PostForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      content: ''
    }
  }
  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      author: localStorage.getItem("username"),
      title: this.state.title,
      content: this.state.content,
      upvote: 0,
      user_id: localStorage.getItem("user_id") 
    }
    debugger

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(newPost)
    }

    fetch('https://noble-webb.github.io/posts', reqObj)
    .then(resp => resp.json())
    .then(post => {
      this.setState({
        title: '',
        content: '',
      })
      this.props.addPost(post)
      this.props.history.push('/posts')
    })
  }
  
 render(){
   const { title, content} = this.state
  // console.log(this.props.users.id)
   return (
    <div>
    {
          localStorage.getItem("my_app_token") 
          ?
     <div>
      <form inverted onSubmit={this.handleSubmit}>
        <h1><span id= "Hey">Learn something new today? </span></h1>
      <form widths='equal'>
        <Form.Input
          name='title'
          onChange={this.handleChange}
          value={title}
          id='form-subcomponent-shorthand-input-first-name'
          placeholder='Post Title'
        />
      </form>
      <br/>
      <form >
        <textarea
          name='content'
          onChange={this.handleChange}
          value={content}
          id=''
          placeholder='Content'
        />
      </form>
      <button type='submit'>Submit</button>
    </form>
  </div>
   :
   <p>{this.props.history.push('/login')}</p>
}
</div>
  )
 }
}
const mapStateToProps = (state) => {
  return ({
    users: state.users,
    auth: state.auth
  })
}

export default connect(mapStateToProps, {addPost, currentUser})(PostForm);
