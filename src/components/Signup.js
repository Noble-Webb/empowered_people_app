import React, { Component } from 'react';
import { connect } from "react-redux";
import { signupSuccess } from '../actions/signup'
import { Dropdown, options } from 'semantic-ui-react'

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			profile_pic: '',
		};
	}
 
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
    <Dropdown options={this.imageOptions} selection />
  )

  handleChange = (e) => {
      const { value, name } = e.target;
      this.setState({
        [name]: value
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

    fetch('http://localhost:3003/users', reqObj)
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
      {this.state.error ? <h3 id="Hey" style={{color: 'red'}}>{this.state.error}</h3> : null}
	  <form onSubmit={this.handleSubmit}>
		  <h3><span id="Hey">Are you looking to become a member?</span></h3>
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
			
           {/* {this.DropdownExampleClearable()} <br/> */}
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
