import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from './Modal'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { addStudent, removeStudent } from '../store/actions/userAction'

const StudentLists = ({ studentList, users, uid, addStudent, removeStudent }) => {
	console.log(studentList)
	const students = users.filter( item => item.role === 'student' )
	const lists = users.filter( item => studentList && studentList.includes(item.id))
	const [ modal, setModal ] = useState(false)
	const [ student, setStudent ] = useState('')

	const toggleModal = () => {
		setModal(!modal)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(student)
		addStudent(uid, student, () => {
			setModal(!modal)
		})
	}

	const handleRemove = (e, sid) => {
		e.preventDefault()
		removeStudent(uid, sid, () => {
			console.log('delete success')
		})
	}

	return (
		<React.Fragment>
			<div className="au-card">
	        	<h3>Daftar Siswa</h3>
	        	<button type="button" className="btn btn-outline-success" onClick={toggleModal}><i className="fa fa-plus"></i> add Siswa</button>
	           	<div className="table-responsive m-b-40">
	                <table className="table table-borderless table-data3">
	                    <thead>
	                        <tr>
	                            <th>#</th>
	                            <th>Nama Siswa</th>
	                            <th>Aksi</th>
	                        </tr>
	                    </thead>
	                    <tbody>
	                       { lists && lists.map((item, index) => (
	                       		<tr key={index}>
	                                <td>{index+1}</td>
	                                <td>{item.name}</td>
	                                <td><Link to={`/user/${item.id}`}>Detail</Link> / <a href="/#" onClick={(e) => handleRemove(e, item.id)}>Remove</a></td>
	                            </tr>
	                       	))}
	                    </tbody>
	                </table>
	            </div>
	        </div>
	        <Modal title="Add Siswa" isShow={modal} isHide={() => setModal(false)}>
	         	<form onSubmit={handleSubmit} className="form-add-hafalan">
					<div className="form-group">
		               <select className="form-control" onChange={(e) => setStudent(e.target.value)} value={student}>
	                    	<option value="">Pilih siswa</option>
	                    	{
	                    		students && students.map((item) => (
	                    			<option key={item.id} value={item.id}>{item.name}</option>
	                    		))
	                    	}
	                    </select>
		            </div>
		            <button className="au-btn au-btn--block au-btn--green m-b-20" type="submit">Save</button>
		        </form>
			</Modal>
		</React.Fragment>
	)
}

const mapStateToProps = state => ({
	users : state.firestore.ordered.users
})

const mapDispatchToProps = dispatch => ({
	addStudent: (uid, sid, callback) => dispatch(addStudent(uid, sid, callback)),
	removeStudent: (uid, sid, callback) => dispatch(removeStudent(uid, sid, callback))
})

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{ collection:'users' }
	])
)(StudentLists)