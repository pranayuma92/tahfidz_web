import API from '../../api'

const getAllSurah = callback => {
	return dispatch => {
		dispatch({type: 'REQUEST_DATA_PENDING'})
		API.getAllSurah()
		.then(result => {
			dispatch({type: 'REQUEST_SURAH_SUCCESS', surah: result.data.data})
		}, error => {
			dispatch({type: 'REQUEST_SURAH_ERROR', error})
		})
	}
}

export { getAllSurah }