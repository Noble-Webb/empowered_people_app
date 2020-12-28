import React from 'react';
import { connect } from 'react-redux';
import Canvas from '../components/Canvas'


class Game extends React.Component{
  
  // handleSubmit= (e) => {
  //   e.preventDefault()
  //   debugger
  //   const target = this.props.users.id  

  //   const editedProfile = {
  //     username: this.props.users.username,
  //     profile_pic: this.props.users.profile_pic,
  //     family: this.props.users.family,
  //     map_suggestion: e.target.value
  //   }
  //   debugger
  //   const reqObj = {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body:  JSON.stringify(editedProfile)
  //   }

  //   fetch(`http://localhost:3002/users/${target}`, reqObj)
  //   .then(resp => resp.json())
  //   .then(updatedUser => {
  //     console.log(updatedUser)
        
  //   }
  //   )
  // }

    render(){
        return ( 
            <div>
            {localStorage.getItem("my_app_token") ?
           <div>
                <h1>Build Your Own World</h1>
                <Canvas handleSubmit={this.handleSubmit}/>
           </div>
           :
           this.props.history.push('/login')}
           </div>
        );
    }
}
const mapStateToProps = state => {
    return ({
      users: state.users,
      auth: state.auth, 
    })
  }
    

export default connect(mapStateToProps)(Game);