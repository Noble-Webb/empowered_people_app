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

    fetch('http://localhost:3002/posts', reqObj)
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
     <div>
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
  </div>
  :
  <div id='Hey' >
  <h1>Welcome to Library!</h1>
        

           
            <h3>Earth is punctuated by five major extinction events. The end-Permian extinction event is thought of as the most dramatic example, taking nearly 95% of all life at the time. [Vijda, Mcloughlin 2005] Only 50 Mya after the end-Permian extinction began the Triassic - Jurassic extinction. This extinction saw the end of 70% of vertebrates and nearly 100% of shallow marine life. Strangely enough, a large number of terrestrial plants were vastly unaffected. During the end-Triassic extinction, close to half of all the life that existed at the time went extinct. These types of events are important to study because they give insight into CO2 change, oxygen levels, climate, and fauna/flora growth. These extinctions have fundamentally changed the planet inside and out. [Kunin, W.E.; Gaston, Kevin, eds. (31 December 1996)]</h3> <br/>

            <h3>Empowered People host a database of extinct animals dating back to the Ordovician-Silurian era, 440 million years ago. Data is initially retrieved from Wikipedia using ParceHub, then painstakingly analyzed for quality assurance. Therefore, the information you're looking for may not be available today, but very well maybe tomorrow! Visit frequently to stay up to date! Notice Empowered People does not own any of the information seen on this and like pages. All imformation was expressly given and royality free. Links are available.</h3> <br/>

  <h1>Please Login to start exploring</h1>
  </div>
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
