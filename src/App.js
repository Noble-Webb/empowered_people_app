import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { currentUser } from "./actions/auth";
import {fetchTheDeadWorks} from './actions/thedead';
import Navbar from './components/Navbar';
import Home from "./components/Home";
import User from "./components/User";
import Post from "./components/Posts";
import Login from "./components/Login";
import Signup from './components/Signup';
import PostForm from './components/PostForm';
import ExtinctAnimals from './components/ExtinctAnimals'
import './App.css';
import first from './bgimages/0.jpg'
import second from './bgimages/1.jpg'
import third from './bgimages/2.jpg'
import fourth from './bgimages/3.jpg'
import fifth from './bgimages/4.jpg'
import sixth from './bgimages/5.jpg'
import seventh from './bgimages/6.jpg'
import eighth from './bgimages/7.jpg'
import nineth from './bgimages/8.jpg'
import tenth from './bgimages/9.jpg'



class App extends Component {
  componentDidMount(){
    const token = localStorage.getItem('my_app_token')
    fetch("https://www.parsehub.com/api/v2/projects/tR30YmjyZqGX/last_ready_run/data?api_key={tu-NTqZ_MtGT}")
      .then(resp => resp.json())
      .then(data =>{
        console.log(data)
      })
    if(!token) {
      this.props.history.push('/signup')
    } else {

      const reqObj = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      fetch('http://localhost:3001/current_user', reqObj)
      .then(resp => resp.json())
      .then(users =>{
        // console.log(users)
        this.props.currentUser(users)
      })
    }
    
  }
  render(){
    //randomized background image with reload. Will A
    let array = [first, second, third, fourth, fifth, sixth, seventh, eighth, nineth, tenth]
    let img = Math.floor( Math.random() * 10 )

    // console.log(this.state)
    return (
      <div className="App" style={{backgroundImage: `url(${array[img]})`, 
       backgroundSize: 'cover', height: '100%'}}>
        <Navbar icon="puzzle" title="Empowered People" description="Explore Your Imagination"/>
        <Switch>
          <Route path="/empowered_people" component={Home}/>
          <Route exact path="/posts" component={Post}/>
          {/* post route  */}
          {/* <Route exact path="/posts/:postId" component={PostShow}/> */}
          <Route path="/extinct_animals" component={ExtinctAnimals}/>
          <Route path='/posts/new' component={PostForm}/>
          <Route path="/users" component={User} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    ); 
  }
}

const mapDispatchToProps = {
  fetchTheDeadWorks,
  currentUser
}

const mapStateToProps = (state) =>{
  // user: state.current_user.user.id  
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));