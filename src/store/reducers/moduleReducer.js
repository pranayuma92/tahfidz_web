const initState = {}

const moduleReducer = (state = initState, action) => {
	switch(action.type){
		case 'ADD_CAT_MODULE_SUCCESS':
			console.log('add success')
			return state

		default :
			return state
	}
}

export default moduleReducer