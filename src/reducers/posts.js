export default function posts(state = [], action) {
    let update;
    switch (action.type){
      case 'FETCH_POSTS_WORKS':
        return action.posts 
      case "ADD_POST":
        return [...state, action.post];
      case "REMOVE_POST":
        update = state.findIndex(post => post.update === action.update)
        return [...state.splice(update, 1)];
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