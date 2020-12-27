import React, { Component } from 'react';
import { Route, Switch, Redirect} from "react-router-dom";
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
// import Profile from "./components/Profile"
import ExtinctAnimals from './components/ExtinctAnimals';
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

// window.location.reload();

class App extends Component {
  componentDidMount(){
    const token = localStorage.getItem('my_app_token')
    
    fetch('http://localhost:3002/mammals')
      .then(resp => resp.json())
      .then(mammals =>{
        // console.log(mammals) 
        this.props.fetchTheDeadWorks(mammals)})

    if(!token) {
      this.props.history.push('/signup')
    } else {

      const reqObj = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      fetch('http://localhost:3002/current_user', reqObj)
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

    // console.log(this.props.users)
    return (
      <div className="App" style={{backgroundImage: `url(${array[img]})`, 
        height: '100%'}}>
        <Navbar icon="puzzle" title="Empowered People" description="Explore Your Imagination"/>
        <Switch>
        <Route exact path="/">
  { localStorage.getItem('my_app_token') ? null : <Redirect to="/login" />}
</Route>
          <Route exact path="/empowered_people" component={Home}/>
          <Route  exact path="/posts" component={Post}/>
          {/* post route  */}
          {/* <Route exact path="/posts/:postId" component={PostShow}/> */}
          <Route exact path='/posts/new' component={PostForm}/>
          <Route path="/users" component={User} />
          {/* <Route exact path="/users/profile/" component={Profile} /> */}
          <Route path="/login" component={Login} />
          <Route path="/learn" component={ExtinctAnimals} />
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
  return{
  users: state.users,
  auth: state.auth
}}

export default connect(mapStateToProps, mapDispatchToProps)(App);