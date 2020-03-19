const signUp = (newUser, callback) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({type: 'SIGNUP_PROCESS'})
		const firebase = getFirebase()
		const firestore = getFirestore()

		firebase.auth().createUserWithEmailAndPassword(
			newUser.email,
			newUser.password
		).then((resp) => {
			return firestore.collection('users').doc(resp.user.uid).set({
				name: newUser.fullname,
				email: newUser.email,
				role: 'student',
				isActive: 'true',
				birth: '',
				address: '',
				phone: '',
				city: '',
				gender: ''
			})
		}).then(() => {
			dispatch({type: 'SIGNUP_SUCCESS'})
			callback()
		}).catch(error => {
			console.log(error)
		})
	}
}

const signIn = (credentials) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase =  getFirebase();
		firebase.auth().signInWithEmailAndPassword(
			credentials.email,
			credentials.password
		).then(() => {
			dispatch({ type: 'LOGIN_SUCCESS'})
		}).catch((err) => {
			dispatch({ type: 'LOGIN_ERROR', err})
		})
	}
}

const signOut = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		firebase.auth().signOut().then(() => {
			dispatch({ type: 'SIGNOUT_SUCCESS'})
		})
	}
}

const editUser = (newData, callback) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore()

		firestore.collection('users').doc(newData.uid).update({
			name: newData.name,
			role: newData.role,
			isActive: newData.isActive,
			birth: newData.birth,
			address: newData.address,
			phone: newData.phone,
			city: newData.city,
			gender: newData.gender
		}).then((res) => {
			callback()
		}).catch(error => {
			console.log(error)
		})
	}
}

export { signUp, signIn, signOut, editUser }