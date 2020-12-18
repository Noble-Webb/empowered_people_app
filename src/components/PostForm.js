import React from 'react'
import { connect } from 'react-redux';
import { addPost } from '../actions/posts';
import { currentUser } from "../actions/auth";
import { Form } from 'semantic-ui-react'

class PostForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        title: '',
      content: '',
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
      author: this.props.users.username,
      title: this.state.title,
      content: this.state.content,
      upvote: 0,
      user_id: this.props.users.id 
    }

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(newPost)
    }

    fetch('http://localhost:3001/posts', reqObj)
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
     {localStorage.getItem("my_app_token") 
     ?
    <form className={'new-post-form'} inverted onSubmit={this.handleSubmit}>
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
  <h1>Please Login </h1>
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
