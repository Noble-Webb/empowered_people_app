import React from 'react'
import { connect } from "react-redux";
import Profile from './Profile'
import { removeUser, editUser } from "../actions/users";

class User extends React.Component {
  constructor(){
    super()
    this.state = {
      users: []
    } 
  } 

  componentDidMount(){
    fetch('http://localhost:3001/users')
    .then(resp => resp.json())
    .then(users => {
      // console.log(users)
      this.setState({
        users: users
      })
    })
  }
 
  render(){
    const { removeUser, editUser} = this.props
    
    return (
      <div>
        <hr />
        <div className="row justify-content-center">
          <h2>User</h2>
        </div>
        <hr />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
               <Profile editUser={editUser} removeUser={removeUser} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    user: state.user
  })
}

export default connect(mapStateToProps, { removeUser, editUser })(User);