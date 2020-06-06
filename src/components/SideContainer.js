import React from 'react'
import { Switch, Route,Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { signOut } from '../store/actions/userAction'
import Header from './Header'
import Home from '../pages/Home'
import Student from '../pages/Student'
import Mushaf from '../pages/Mushaf'
import SurahSingle from '../pages/SurahSingle'
import EditUser from '../pages/EditUser'
import Module from '../pages/Module'
import AddModule from '../pages/AddModule'
import ModuleOverview from '../pages/ModuleOverview'
import SidePanel from './SidePanel'

const SideContainer = (props) => {
	const { auth, user } = props;
	if(!auth.uid) return <Redirect to='/login' />
		
	if(user && user.role !== 'admin') {
		props.signOut()
	}

	return (
		<div className="page-container">
			<SidePanel />
			<Switch>
				<Route path="/" component={Home} exact />
				<Route path="/student" component={Student} />
				<Route path="/mushaf" component={Mushaf} />
				<Route path="/surah/:number" component={SurahSingle} />
				<Route path="/user/:id" component={EditUser} />
				<Route path="/module" component={Module} />
				<Route path="/add-module" component={AddModule} />
				<Route path="/module-overview/:mod" component={ModuleOverview} />
				<Route component={Home} />
			</Switch>
		</div>
	)
}

const mapStateToProps = state => {
	const auth = state.firebase.auth
	const users = state.firestore.data.users;
	const user = users ? users[auth.uid] : null;

	return {
		auth: auth,
		user: user
	}
}

const mapDispathToProps = dispatch => ({
    signOut : () => dispatch(signOut())
})

export default compose(
	connect(mapStateToProps, mapDispathToProps),firestoreConnect([
		{ collection:'users' }
	])
)(SideContainer)