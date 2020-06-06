import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Header from '../components/Header'

const ModuleOverview = ({ history, match, location, module }) => {
	const { mod } = match.params
	const modules = module && module.filter( item => item.cat === mod )

	const handleEdit = (e, id) => {
		e.preventDefault()
		history.push('/add-module', { id: id, edit: true })
	}

	return (
		<React.Fragment>
			<Header title={location.state.title} history={history} enableBack/>
			<div className="main-content">
				<div className="section__content section__content--p30">
	                <div className="container-fluid">
	                 	<div className="au-card">
	                		<button type="button" className="btn btn-outline-primary" onClick={() => history.push('/add-module', {id: 0, edit: false})}><i className="fa fa-plus"></i> Add New</button>
	                    	<h3 style={{marginBottom: '20px', marginTop: '20px'}}>Materi {location.state.title}</h3>
	                    	<ul className="list-group list-group-flush">
	                    	{ modules && modules.map(item => (
								<li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
									{item.title}
									<a href="/#" onClick={(e) => handleEdit(e, item.id)}>Edit</a>
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

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection:'cat_module' }
	])
)(ModuleOverview)