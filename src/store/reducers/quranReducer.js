const initState = {
	pending: false,
	error: false,
	errorMessage: '',
	surah: []
}

const quranReducer = (state = initState, action) => {
	switch(action.type){
		case 'REQUEST_DATA_PENDING' :
			return {
				...state,
				pending: true,
				errorMessage: '',
				error: false,
			}

		case 'REQUEST_SURAH_SUCCESS' :
			return {
				...state,
				surah: action.surah,
				pending: false,
				errorMessage: '',
				error: false,
			}

		case 'REQUEST_SURAH_ERROR' :
			return {
				...state,
				error: true,
				pending: false,
				errorMessage: action.error.message,
			}

		default :
			return state
	}
}

export default quranReducer