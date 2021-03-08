import React from 'react';
import { logoutUser } from "../actions/auth";
import { connect } from "react-redux";
import { NavLink} from 'react-router-dom'


class Navbar extends React.Component {

  handleLogout = () => {
    this.props.logoutUser()
    localStorage.removeItem('my_app_token') 
    localStorage.removeItem('user_id') 
    localStorage.removeItem('username') 
    window.location.reload();
  }
  
// opens a tab for the interactive aspect of the app.
  urlTab = () => {
    let url = "http://localhost:3000/games/play"
    window.open(url)
  }
  

  render() {
    return (
      <div>
        {/* Disables Navbar for the game section, temporarily fixing null canvas error.*/}
        { window.location.href !== "http://localhost:3000/games/play" ?
      <div className={`ui inverted green menu`}>
        <NavLink className="ui header" to='/empowered_people'>
          <i className={`${this.props.icon} icon`} />
          <div className="content">{this.props.title}</div>
          <div className="sub header">{this.props.description}</div>
        </NavLink>
        <div className="left menu">
        {
        localStorage.getItem("my_app_token") ?
        <NavLink to='/login' className="ui button" onClick={this.handleLogout}>
          Logout
        </NavLink>
        :
        <NavLink to='/login' className="ui button">
          Login
        </NavLink>
      }
          <NavLink className="item" to='/posts/new'>
            Add Post 
          </NavLink>
          <NavLink className="item" to='/posts'>
            Posts Page
          </NavLink>
          <NavLink className="item" to='/learn' >Learn from The Past</NavLink>
          {/* temporary fix for null canvas canvas error. */}
          <NavLink onClick={this.urlTab} className="item" to='/posts/new' >Interact with the Past</NavLink>
          <NavLink className="item" to="/users/profile" >
            Profile Page
          </NavLink>
          <NavLink className="item" to='/games'>
              Create Your Own World
          </NavLink>
        </div>
      </div>
         : null }
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    auth: state.auth 
  }
}

export default connect(mapStateToProps, {logoutUser})(Navbar);