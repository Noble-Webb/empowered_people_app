export default function posts(state = [], action) {
    let update;
    switch (action.type){
      case 'FETCH_POSTS_WORKS':
        return action.posts 
      case 'FETCH_USER_POSTS':
        update = state.filter(post => post.userId === action.userId)
        return update 
      case "ADD_POST":
        return [...state, action.post];
      case "REMOVE_POST":
        update = state.filter(post => post.id !== action.postId)
        return update
      case "EDIT_POST":
        update = state.findIndex(post => post.id === action.postId) 
        return update
      case "UPVOTE_POST":
      update = state.map(p => {
        if(p.id === action.postId){
          return {
            ...p,
            upvote: p.upvote += 1
          }
        }else{
          return p 
        }
      })
      return update

      default:
        return state;
    }
  }