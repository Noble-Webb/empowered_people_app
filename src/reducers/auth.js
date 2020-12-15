
const auth = (state=null, action ) => {  
  switch(action.type){
      case 'LOGIN_SUCCESS':
        case 'CURRENT_USER':  
          return [...state, action.user] 
      case 'LOGOUT_USER':
        return null
      default: 
        return state
    }
}

export default auth; 