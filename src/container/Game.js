import React from 'react';
import { connect } from 'react-redux';
import Canvas from '../components/Canvas'


class Game extends React.Component{
    render(){
        return ( 
            <div>
            {localStorage.getItem("my_app_token") ?
           <div>
                <h1>Build Your Own World</h1>
                <Canvas />
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