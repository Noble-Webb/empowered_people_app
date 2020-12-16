import React, { Component } from 'react';
import { connect } from "react-redux";
import PostList from "./PostList";


class Posts extends Component {
    
    render(){
    return ( 
       <div>
           <PostList />
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
