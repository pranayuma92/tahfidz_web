const addNewCatModule = (modules) => {
	return (dispacth, getState, { getFirestore }) =>{
		const firestore = getFirestore()

		firestore.collection('cat_module').add({
			...modules,
		}).then(() => {
			dispacth({ type: 'ADD_CAT_MODULE_SUCCESS'})
		}).catch(error => {
			console.log(error)
		})
	} 
}

export { addNewCatModule }