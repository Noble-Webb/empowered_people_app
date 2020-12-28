export default function users(state = [], action) {
    let idx;
    switch (action.type) {
      case "ADD_USER":
        return [...state, action.user];
      case 'CURRENT_USER':  
        return  action.user
      case "REMOVE_USER":
        idx = state.findIndex(user => user.id  === action.id)
        return [...state.slice(0, idx), ...state.slice(idx + 1)];
      case "EDIT_USER":
        const updatedUser = this.state.users.map(userObj => {
          if(userObj.id === action.id) {
            return [...state, ...updatedUser]
          } else {
            return userObj
          }
        })
        return updatedUser;
        case "MAP_SUGGESTION":
          const map_suggestion = this.state.users.map(userObj => {
            if(userObj.id === action.id) {
              return [...state, ...map_suggestion]
            } else {
              return userObj
            }
          })
          return map_suggestion
      default:
        return state;
    }
} 