import React from 'react'
import { connect } from "react-redux";
import Profile from './Profile'
import { Dropdown, options } from 'semantic-ui-react'
import { logoutUser } from "../actions/auth";
import { fetchUsersWorks, removeUser, editUser } from "../actions/users"; 
import { fetchPostsWorks, removePost, editPost} from "../actions/posts"

class User extends React.Component {
  constructor(){
    super()
    this.state = {
      show: false ,
      users: [],
      posts: [],
      username: localStorage.getItem("username"),
      password: '',
      profile_pic: '',
      family: '',
      error: null
    } 
  } 

  familyOptions =[
    {
      
    }
  ]

  imageOptions = [
    {
     image: { avatar: true, key: 1, name: "profile_pic", value: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg' , src: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg' },
   },
   {
     image: { avatar: true, key: 2, name: "profile_pic", value: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg', src: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg' },
   },
   {
     image: { avatar: true, key: 3, name: "profile_pic", value: 'https://react.semantic-ui.com/images/avatar/small/stevie.jpg', src: 'https://react.semantic-ui.com/images/avatar/small/stevie.jpg' },
   },
   {
     image: { avatar: true, key: 4, name: "profile_pic", value: 'https://react.semantic-ui.com/images/avatar/small/christian.jpg', src: 'https://react.semantic-ui.com/images/avatar/small/christian.jpg' },
   },
   {
     image: { avatar: true, key: 5, name: "profile_pic", value: 'https://react.semantic-ui.com/images/avatar/small/matt.jpg', src: 'https://react.semantic-ui.com/images/avatar/small/matt.jpg' },
   },
   {
     image: { avatar: true, key: 6, name: "profile_pic", value: 'https://react.semantic-ui.com/images/avatar/small/justen.jpg', src: 'https://react.semantic-ui.com/images/avatar/small/justen.jpg' },
   },
 ]

 DropdownExampleClearable = () => (
   <Dropdown clearable options={this.imageOptions} selection />
 )

  handleLogout = () => {
    localStorage.removeItem('my_app_token')
    this.props.logoutUser()
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleDelete = () => {
    const target = localStorage.getItem("user_id")
    fetch(`http://localhost:3003/users/${target}`, {method: 'DELETE'})
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        this.setState({
          error: data.error
        })
      this.props.removeUser(data.id)
      this.props.logoutUser()
      window.location.reload();
      }
    })
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const target = localStorage.getItem("user_id") 
    
    const editedProfile = {
      username: this.state.username,
      profile_pic: this.state.profile_pic
    }
    // debugger 
    const reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body:  JSON.stringify(editedProfile)
    }

    fetch(`http://localhost:3003/users/${target}`, reqObj)
    .then(resp => resp.json())
    .then(updatedUser => {
      console.log(updatedUser)
        if (updatedUser.error) {
            this.setState({
              error: updatedUser.error
            })
        }else {
          this.setState({
            username: '',
            profile_pic: '',
            family: '',
            show: 'false'})
            // this.props.editUser(updatedUser)
            window.location.reload();
          }
    })
  }

  handleProfile = () => {
    let newBoolean = !this.state.show
    this.setState({show: newBoolean})
  }
  
  componentDidMount(){
    fetch('http://localhost:3003/posts')
    .then(resp => resp.json())
    .then(posts => {
      this.props.fetchPostsWorks(posts)
      this.setState({
        posts: posts
      })
    })
    fetch('http://localhost:3003/users')
    .then(resp => resp.json())
    .then(users => {
      this.props.fetchUsersWorks(users)
      this.setState({
        users
      })
    })
  }
  
  render(){
    const { removePost, editPost} = this.props
    let userPosts = this.state.posts.filter(post => post.user_id == localStorage.getItem("user_id"))
  console.log(localStorage.getItem("user_id"))
  console.log(this.state.posts)
    return (
      <div>
          {userPosts.length === 0 ? <h1 style={{color: 'red'}}>You Have Not Made A Post!!</h1> : null}
          {this.state.error ? <h4 style={{color: 'red'}}>{this.state.error}</h4> : null}
          {localStorage.getItem("my_app_token") ?
        <div className="row justify-content-center">
           <div> <h1><span id="Hey">Welcome to your Profile Page {localStorage.getItem("username")}</span></h1> </div>
        {this.state.show ? 
              <form onSubmit={this.handleSubmit}>
                <input
                    onChange={this.handleChange}
                    type="text"
                    name="username"
                    placeholder={localStorage.getItem("username")}
                    required
                />
                <br/>
                <input
                    onChange={this.handleChange}
                    type="text"
                    name="family"
                    placeholder="Join a Class"
                    required
                />
                <p id="Hey">Not really sure what a class is? Check out our Learn tab!</p>
                {/* {this.DropdownExampleClearable()} <br/> */}
                <button type="submit">
                Edit Account
                </button>
            </form>
              : 
              null}

          <button 
          type="button" 
          id={localStorage.getItem("user_id")}
          name='edit'
          onClick={this.handleProfile} 
          className="btn btn-primary">
          Edit Profile
        </button>  
        <button 
        id={localStorage.getItem("user_id")}
        type="button" 
        onClick={this.handleDelete} 
        className="btn btn-danger">
        <span aria-hidden="true">&times;</span>
        Delete Account?
      </button>
      </div>

      :
      null }

            {
              localStorage.getItem("my_app_token") 
              ?
              
              userPosts.map(post =>
                <Profile key={post.id} post={post} removePost={removePost} editPost={editPost}/>
                  )
                :
                <div id='Hey' >
              {this.props.history.push('/login')}
              </div>

           }
          </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    users: state.users,
    auth: state.auth, 
    posts: state.posts
  })
}

export default connect(mapStateToProps, { removePost, editPost, removeUser, editUser, fetchPostsWorks, fetchUsersWorks, logoutUser })(User);
