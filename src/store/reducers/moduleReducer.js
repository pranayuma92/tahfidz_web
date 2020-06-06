const initState = {}

const moduleReducer = (state = initState, action) => {
	switch(action.type){
		case 'ADD_CAT_MODULE_SUCCESS':
			console.log('add success')
			return state
		case 'ADD_HAFALAN_SUCCESS':
			console.log('add hafalan success')
			return state
		case 'EDIT_HAFALAN_SUCCESS':
			console.log('edit hafalan success')
			return state
		case 'REMOVE_HAFALAN_SUCCESS':
			console.log('remove hafalan success')
			return state
		case 'ACTION_ERROR':
			console.log('unknown error', action.error)
			return state
		default :
			return state
	}
}

export default moduleReducer