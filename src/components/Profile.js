import  React from "react";
import { connect } from "react-redux";
import { Form } from 'semantic-ui-react'
import { currentUser } from "../actions/auth";
import { editPost, removePost } from "../actions/posts";
import {editUser, removeUser} from "../actions/users";

class Profile extends React.Component{
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         title: '',
    //         content: '',
    //         display: false,
    //         show: false,
    //         username: '',
		// 	password: '',
		// 	profile_pic: ''
    //     }
    //   }
    //   handleChange = (e) => {
    //     const { value, name } = e.target;
    //     this.setState({
    //       [name]: value
    //     });
    //   }
    
    //   handleAvatarChange = (e) => {
    //     this.setState({
    //       profile_pic: e.target.files[0],
    //     });
    //   }
    
    //   handleSubmit = (e) => {
    //     e.preventDefault();
    //     const target = e.target.id  
        
    //         const editedProfile = {
    //           username: this.state.username,
    //           profile_pic: this.state.profile_pic
    //         }
    //     // debugger 
    //     const reqObj = {
    //       method: 'PATCH',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //       },
    //       body:  JSON.stringify(editedProfile)
    //     }
    
    //     fetch(`http://localhost:3001/users${target}`, reqObj)
    //     .then(resp => resp.json())
    //     .then(updatedUser => {
    //       console.log(updatedUser)
    //         if (updatedUser.error) {
    //             this.setState({
    //               error: updatedUser.error
    //             })
    //         }else {
    //           this.setState({
    //             username: '',
    //             profile_pic: '',
    //             show: 'false'})
    //             this.props.editUser(updatedUser)
    //           }
    //     })
    //   }
    
    //   handlePostSubmit = (e) => {
    //     e.preventDefault();
    //     const target = e.target.id  
    
    //     const editedPost = {
    //       author: this.props.users.username,
    //       title: this.state.title,
    //       content: this.state.content,
    //       upvote: this.state.upvote,
    //       user_id: this.props.users.id 
    //     }
    
    //     const reqObj = {
    //       method: 'PATCH',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body:  JSON.stringify(editedPost)
    //     }
    
    //     fetch(`http://localhost:3001/posts/${target}`, reqObj)
    //     .then(resp => resp.json())
    //     .then(updatedPost => {
    //       this.setState({
    //         title: '',
    //         content: '',
    //         display: 'false',
    //       })
    //       this.props.editPost(updatedPost)
    //     })
    //   }
    
    // handleDelete = () => {
    //     const target = this.props.users.id 
    
    //     fetch(`http://localhost:3001/Users/${target}`, {method: 'DELETE'})
    //     .then(resp => resp.json())
    //     .then(data => {
    //       this.props.removeUser(data.id)
    //     })
    //   }

    // handleProfile = () => {
    //     let newBoolean = !this.state.display
    //     this.setState({show: newBoolean})
    // }

    // handlePostedit = () =>{
    //     let newBoolean = !this.state.display
    //     this.setState({display: newBoolean})
    // }

    // handlePostDelete = () => {
    //     const target = this.props.post.id 
    
    //     fetch(`http://localhost:3001/posts/${target}`, {method: 'DELETE'})
    //     .then(resp => resp.json())
    //     .then(data => {
    //       this.props.removePost(data.id)
    //     })
    //   }

    render(){
    // const {title, content, id, upvote} = this.props.posts 

        return(
            <div>
                <h1>Profile Page</h1>
                {/* {this.state.show ? 
                    <form onSubmit={this.handleSubmit}>
                      <input
                          onChange={this.handleChange}
                          type="text"
                          name="username"
                          placeholder="Username"
                          required
                      />
                      <br/>
          
                      <input
                          onChange={this.handleChange}
                          type="password"
                          name="password"
                          placeholder="Password"
                          required
                      />
                      <br/>
                      
                      <input
                          onChange={this.handleAvatarChange}
                          type="file"
                          accept="/images/*"
                      />      
                      <button type="submit">
                      Create Account
                      </button>
                  </form>
                    : 
                    null}
	  
                <button 
                type="button" 
                id={id}
                name='edit'
                value={title && content}
                onClick={this.handleProfile} 
                className="btn btn-primary">
                Edit Profile
              </button>  

                <div className="card">
              <p>{title}</p>
              <p>{content}</p>
            <div>Votes: {upvote}</div>
          <div className="float-right">
          { this.state.display
        ?
        <form className={'new-post-form'} inverted onSubmit={this.handlePostSubmit}>
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
            <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
              <button 
                type="button" 
                id={id}
                name='edit'
                value={title, content}
                onClick={this.handlePostEdit} 
                className="btn btn-primary">
                Edit Post
              </button>

              <button 
                id={id}
                type="button" 
                onClick={this.handlePostDelete} 
                className="btn btn-danger">
                <span aria-hidden="true">&times;</span>
                Delete Post
              </button>
              </div>
            </div>
          </div>
            </div>
        )
     */}
            </div>
        )}

}

const mapStateToProps = (state) => {
    return{
        users: state.users,
    }
}

const mapDispatchToProps = {
    currentUser,
    editPost,
    removePost,
    editUser,
    removeUser
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
