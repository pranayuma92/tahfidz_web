import React from 'react'
import Header from '../components/Header'
import Hafalan from '../components/Hafalan'
import StudentLists from '../components/StudentLists'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { editUser } from '../store/actions/userAction'

class EditUser extends React.Component {
	state = {
		edit: false,
		fullname: this.props.user.name,
		role: this.props.user.role,
		isActive: this.props.user.isActive,
		birth: this.props.user.birth,
		address: this.props.user.address,
		phone: this.props.user.phone,
		city: this.props.user.city,
		gender: this.props.user.gender
	}

	handleChange = (e) => {
		this.setState({ [e.target.id] : e.target.value })
	}

	handleSave = () => {
		const newData = {
			uid: this.props.match.params.id,
			name: this.state.fullname,
			role: this.state.role,
			isActive: this.state.isActive,
			birth: this.state.birth,
			address: this.state.address,
			phone: this.state.phone,
			city: this.state.city,
			gender: this.state.gender
		}

		this.props.editUser(newData, () => {
			this.toggleEdit()
		})
	}

	toggleEdit = () => {
		this.setState({ edit: !this.state.edit })
	}

	render(){
		const { user, history , match} = this.props

		const renderExtra = () => {
			if(user.role === 'student'){
				return <Hafalan data={user.hafalan} uid={this.props.match.params.id}/>
			} else if(user.role === 'teacher'){
				return <StudentLists uid={this.props.match.params.id} studentList={user.student}/>
			}
		}

		return(
			<React.Fragment>
			<Header title={user.name} history={history} enableBack/>
			<div className="main-content">
	            <div className="section__content section__content--p30">
	                <div className="container-fluid">
	                    <div className="au-card">
	                    	<h3>User Detail</h3>
	                        {	this.state.edit 
	                        	? <div className="btn-wrapper">
	                        	  <button type="button" className="btn btn-outline-warning" onClick={this.toggleEdit}><i className="fa fa-times"></i> Cancel</button>
	                        	  <button type="button" className="btn btn-outline-success" onClick={this.handleSave}><i className="fa fa-check"></i> Save</button>
	                        	  </div>
	                        	: <div className="btn-wrapper"><button type="button" className="btn btn-outline-primary" onClick={this.toggleEdit}><i className="fa fa-pencil"></i> Edit User</button></div>
	                        }
	                    	<div className="edituser-form-wrapper">
	                    		<div className="row">
		                    		<div className="col-md-6">
						                <div className="form-group">
					                        <label>UserID</label>
					                        <input className="form-control au-input au-input--full" type="text" id="id" value={match.params.id} disabled/>
					                    </div>
						                <div className="form-group">
					                        <label>Email</label>
					                        <input onChange={this.handleChange} className="form-control au-input au-input--full" type="text" id="email" placeholder="Username" value={user.email} disabled/>
					                    </div>
						                <div className="form-group">
					                        <label>Full Name</label>
					                        <input onChange={this.handleChange} className="form-control au-input au-input--full" type="text" id="fullname" placeholder="Username" value={this.state.fullname} disabled={`${this.state.edit ? '' : 'disabled'}`}/>
					                    </div>
						                <div className="form-group">
					                        <label>Role</label>
					                        <select className="form-control" id="role" onChange={this.handleChange} value={this.state.role} disabled={`${this.state.edit ? '' : 'disabled'}`}>
					                        	<option value="student">Student</option>
					                        	<option value="teacher">Teacher</option>
					                        </select>
					                    </div>
					                    <div className="form-group">
					                        <label>Is Active?</label>
					                        <select className="form-control" id="isActive" onChange={this.handleChange} value={this.state.isActive} disabled={`${this.state.edit ? '' : 'disabled'}`}>
					                        	<option value="true">Yes</option>
					                        	<option value="false">No</option>
					                        </select>
					                    </div>
				                    </div>
				                    <div className="col-md-6">
				                    	<div className="form-group">
					                        <label>Birth Date</label>
					                        <input onChange={this.handleChange} className="form-control au-input au-input--full" type="date" id="birth" value={this.state.birth} disabled={`${this.state.edit ? '' : 'disabled'}`}/>
					                    </div>
					                    <div className="form-group">
					                        <label>Address</label>
					                        <input onChange={this.handleChange} className="form-control au-input au-input--full" type="text" id="address" value={this.state.address} disabled={`${this.state.edit ? '' : 'disabled'}`}/>
					                    </div>
					                    <div className="form-group">
					                        <label>Phone</label>
					                        <input onChange={this.handleChange} className="form-control au-input au-input--full" type="text" id="phone" value={this.state.phone} disabled={`${this.state.edit ? '' : 'disabled'}`}/>
					                    </div>
					                    <div className="form-group">
					                        <label>City / Province</label>
					                        <input onChange={this.handleChange} className="form-control au-input au-input--full" type="text" id="city" value={this.state.city} disabled={`${this.state.edit ? '' : 'disabled'}`}/>
					                    </div>
					                    <div className="form-group">
					                        <label>Gender</label>
					                        <select className="form-control" id="gender" onChange={this.handleChange} value={this.state.gender} disabled={`${this.state.edit ? '' : 'disabled'}`}>
					                        	<option value="man">Man</option>
					                        	<option value="Woman">Woman</option>
					                        </select>
					                    </div>
				                    </div>
			                    </div>
			               	</div>
		                </div>
		                <br />
		                { renderExtra() }
	                </div>
	            </div>
	        </div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state, props) => {
	const id = props.match.params.id;
	const users = state.firestore.data.users;
	const user = users ? users[id] : null;
	return {
		user: user,
		users: users
	}
}

const mapDispatchToProps = (dispatch) => ({
	editUser : (newData, callback) => dispatch(editUser(newData, callback))
}) 

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{ collection:'users' }
	])
)(EditUser)