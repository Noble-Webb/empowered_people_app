import React, { Component } from 'react';
import { connect } from "react-redux";
import { signupSuccess } from '../actions/signup'

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			profile_pic: '',
		};
	}

  handleChange = (e) => {
      const { value, name } = e.target;
      this.setState({
        [name]: value
      });
  }

  handleAvatarChange = (e) => {
    this.setState({
      profile_pic: e.target.files[0],
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // debugger 
    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body:  JSON.stringify(this.state)
    }

    fetch('http://localhost:3002/users', reqObj)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
        if (data.error) {
            this.setState({
              error: data.error
            })
        }else {
            this.props.signupSuccess(data)
            this.props.history.push('/login')
          }
    })
  }
  
render() {
  return ( 
    <div className='signup'>
      {this.state.error ? <h3 style={{color: 'red'}}>{this.state.error}</h3> : null}
	  <form onSubmit={this.handleSubmit}>
		  <h3>Are you looking to become a member?</h3>
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
        </div>
       
		);
	}
}

const mapDispatchToProps = {
    signupSuccess: signupSuccess
  }

export default connect(null, mapDispatchToProps)(Signup);
