import React from 'react';
import { connect } from 'react-redux'
import { currentUser, loginSuccess } from '../actions/auth'


class Login extends React.Component {
  state = {
    username: '',
    password: '',
    error: null
  }

  handleInputChange = (e) => { 
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }

    fetch('http://localhost:3003/auth', reqObj)
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        this.setState({
          error: data.error
        })
      } else {
        this.props.currentUser(data)
        localStorage.setItem('my_app_token', data.token)
        this.props.history.push('/users/profile')
        window.location.reload();
      }
    })
  }

  urlTab = () => {
    // console.log(url)
    this.props.history.push("/signup")
}

  render(){

    return (
      <div className="login">
        {this.state.error ? <h4 style={{color: 'red'}}>{this.state.error}</h4> : null}
        <h3><span id="Hey">Welcome Back Friend</span></h3>
        <form onSubmit={this.handleSubmit}>
          <input name={'username'} placeholder='Username' required  onChange={this.handleInputChange} value={this.state.username} />
          <input name={'password'} onChange={this.handleInputChange} placeholder='Password' type="password" required value={this.state.password} />
          <input type='submit' value='login' />
        </form>
         <button onClick={()=> this.urlTab()}>"Sign-up!?!?!"</button> 
      </div>
    );
  }
}

const mapDispatchToProps = {
  loginSuccess,
  currentUser
}

export default connect(null, mapDispatchToProps)(Login)
