const initialState = {
	user: {
		username: '',
		password: '',
		profile_pic: '',
	}
};
const signup = (state = initialState, action) => {
	switch (action.type) {
		case 'SIGNUP_SUCCESS': return {
			...state.user,
			user: {
				username: action.username,
				password: action.password,
				profile_pic: action.picture,
			},
		};
		default: return state;
	}
};
export default signup;
