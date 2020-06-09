const addNewCatModule = (modules, callback, fallback) => {
	return (dispacth, getState, { getFirestore }) =>{
		const firestore = getFirestore()

		firestore.collection('cat_module').add({
			...modules,
		}).then(() => {
			dispacth({ type: 'ADD_CAT_MODULE_SUCCESS' })
			callback()
		}).catch(error => {
			dispacth({ type: 'ACTION_ERROR', error })
			fallback()
		})
	} 
}

const editCatModule = (modules, id, callback, fallback) => {
	return (dispacth, getState, { getFirestore }) =>{
		const firestore = getFirestore()

		firestore.collection('cat_module').doc(id).update({
			...modules,
		}).then(() => {
			dispacth({ type: 'ADD_CAT_MODULE_SUCCESS' })
			callback()
		}).catch(error => {
			dispacth({ type: 'ACTION_ERROR', error })
			fallback()
		})
	} 
}

const removeCatModule = (id, callback, fallback) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore()
		firestore.collection('cat_module').doc(id).delete()
		.then( res => {
			dispatch({ type: 'REMOVE_HAFALAN_SUCCESS' })
			callback()
		}).catch( error => {
			dispatch({ type: 'ACTION_ERROR', error })
			fallback()
		})
	}
}

const addHafalan = (uid, data, callback) => {
	return (dispacth, getState, { getFirestore }) => {
		const firestore = getFirestore()
		firestore.collection('hafalan').add({
			...data
		}).then( res => {
			return firestore.collection('users').doc(uid).set({
				hafalan: firestore.FieldValue.arrayUnion(res.id)
			}, { merge: true })
		}).then(() => {
			dispacth({ type: 'ADD_HAFALAN_SUCCES' })
			callback()
		}).catch( error => {
			dispacth({ type: 'ACTION_ERROR', error })
		})
	}
}

const editHafalan = (id, data, callback) => {
	return (dispacth, getState, { getFirestore }) => {
		const firestore = getFirestore()
		firestore.collection('hafalan').doc(id).update({
			surah: data.surah,
			from: data.from,
			to: data.to,
			status: data.status
		}).then( res => {
			dispacth({ type: 'EDIT_HAFALAN_SUCCESS' })
			callback()
		}).catch( error => {
			dispacth({ type: 'ACTION_ERROR', error })
		})
	}
}

const removeHafalan = (id, callback) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore()
		firestore.collection('hafalan').doc(id).delete()
		.then( res => {
			dispatch({ type: 'REMOVE_HAFALAN_SUCCESS' })
			callback()
		}).catch( error => {
			dispatch({ type: 'ACTION_ERROR', error })
		})
	}
}

export { addNewCatModule, editCatModule, removeCatModule, addHafalan, editHafalan, removeHafalan }