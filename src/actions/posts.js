export const fetchPostsWorks = (posts) => {
    return {
      type: 'FETCH_POSTS_WORKS',
      posts 
    };
  };
  export const addPost = post => {
      return {
        type: 'ADD_POST',
        post 
      };
  };
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
  