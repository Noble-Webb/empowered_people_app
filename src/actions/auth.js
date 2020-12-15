export const loginSuccess = ({user, posts}) => {
    return{
        type: 'LOGIN_SUCCESS',
        user,
        posts 
    } 
}

export const currentUser = ({user, posts}) => {
    // debugger
    return {
        type: 'CURRENT_USER',
        user,
        posts 
    }
}

export const logoutUser = () =>{
    return {
        type: 'LOGOUT_USER'
    }
}
