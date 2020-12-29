import React from 'react';
import { connect } from 'react-redux';
import MapEditor from '../components/MapEditor'


class Game extends React.Component{

  render(){
      return ( 
          <div>
          {localStorage.getItem("my_app_token") ?
          <div>
              <h1>Build Your Own World</h1>
              <MapEditor handleSubmit={this.handleSubmit}/>
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