const initState = {
	pending: false,
	error: false,
	message: '',
	authError: ''
}

const userReducer = (state = initState, action) => {
	switch(action.type){
		case 'SIGNUP_INIT' :
			return {
				...state,
				pending: false,
				error: false,
				message: ''
			}
		case 'SIGNUP_PROCESS' :
			return {
				...state,
				pending: true,
				message: 'Connecting to database...'
			}
		case 'SIGNUP_SUCCESS' :
			return{
				...state,
				pending: false,
				message: 'Add new user success'
			}
		case 'LOGIN_ERROR' :
			console.log('login failed')
			return {
				...state,
				authError: 'Login failed'
			}
		case 'LOGIN_SUCCESS' :
			console.log('login success')
			return {
				...state,
				authError: null
			}
		case 'SIGNOUT_SUCCESS' :
			console.log('signout success')
			return state;
		default :
			return state
	}
}

export default userReducer