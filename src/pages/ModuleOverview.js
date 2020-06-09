import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Header from '../components/Header'
import { removeCatModule } from '../store/actions/moduleAction' 

const ModuleOverview = ({ history, match, location, module, removeCatModule }) => {
	const { mod } = match.params
	const modules = module && module.filter( item => item.cat === mod )
	const [ message, setMessage ] = useState('')
	const [ remove, setRemove ] = useState(false)

	const handleEdit = (e, id) => {
		e.preventDefault()
		history.push('/add-module', { id: id, edit: true })
	}

	const handleMessage = (msg) => {
		setMessage(msg)
		setTimeout(() => {
			setMessage('')
		}, 2000)
	}

	const handleRemove = (e, id) => {
		e.preventDefault()
		removeCatModule(id, () => {
			handleMessage('Berhasil menghapus')
		}, () => {
			return false
		})
	}

	return (
		<React.Fragment>
			<Header title={location.state.title} history={history} enableBack/>
			<div className="main-content">
				<div className="section__content section__content--p30">
	                <div className="container-fluid">
	                 	<div className="au-card">
	                		<button type="button" className="btn btn-outline-primary" onClick={() => history.push('/add-module', {id: 0, edit: false})}><i className="fa fa-plus"></i> Add New</button>
	                    	<h3 style={{marginBottom: '20px', marginTop: '20px'}}>Materi {location.state.title}</h3>{ message && <span>{message}</span>}
	                    	<ul className="list-group list-group-flush">
	                    	{ modules && modules.map(item => (
								<li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
									{item.title}
									<div>
										<a href="/#" onClick={(e) => handleEdit(e, item.id)}>Edit</a><span> / </span>
										<a href="/#" onClick={(e) => handleRemove(e, item.id)}>Remove</a>
									</div>
								</li>
	                    	))}
							</ul>
	                    </div>
	                </div>
	            </div>
			</div>
		</React.Fragment>
	)
}

const mapStateToProps = state => ({
	module : state.firestore.ordered.cat_module
})

const mapDispatchToProps = (dispatch) => ({
	removeCatModule: (id, callback, fallback) => dispatch(removeCatModule(id, callback, fallback))
})

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{ collection:'cat_module' }
	])
)(ModuleOverview)