import React, { Component } from 'react';
import { connect } from "react-redux";
import PostList from "./PostList";


class Posts extends Component {
    
    render(){
    return ( 
        <div>
        {localStorage.getItem("my_app_token") ?
       <div>
           <PostList />
       </div>
       :
       this.props.history.push('/login')}
       </div>
    );
    }
}
    const mapStateToProps = (state) =>{
        return{
            posts: state.posts
        }
    }
 
export default connect(mapStateToProps)(Posts);
