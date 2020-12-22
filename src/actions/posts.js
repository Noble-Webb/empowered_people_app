export const fetchPostsWorks = (posts) => {
  return {
    type: 'FETCH_POSTS_WORKS',
    posts 
  };
};

export const fetchUserPosts = (posts, userId) => {
  return{
    type: 'FETCH_USER-POSTS',
    posts,
    userId 
  }
}

export const addPost = post => {
  return {
    type: 'ADD_POST',
    post 
  };
};

export const editPost = postId => {
  return{
    type: 'EDIT_POST',
    postId
  }
}

export const removePost = postId => {
  return {
    type: 'REMOVE_POST',
    postId 
  };
};

export const upvotePost = postId => {
  return {
    type: 'UPVOTE_POST',
    postId 
  };
};
  