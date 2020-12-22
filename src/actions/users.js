export const addUser = user => {
  return {
    type: 'ADD_USER',
    user 
  };
};

export const removeUser = userId => {
  return {
    type: 'REMOVE_USER',
    userId 
  };
};

export const editUser = userId => {
  return{
    type: 'EDIT_USER',
    userId
  }
}

export const fetchUsersWorks = users => {
 return{ 
  type: 'FETCH_USERS_WORKS',
  users
}
}