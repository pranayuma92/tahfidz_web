import React from 'react'
import Header from '../components/Header'
import LoadingScreen from '../components/LoadingScreen'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom'

const Teacher = ({ users }) => {
	const teachers = users.filter( item => item.role === 'teacher')

	return (
		<React.Fragment>
			<Header title="Guru" />
			<div className="main-content">
	            <div className="section__content section__content--p30">
	                <div className="container-fluid">
	                    <div className="au-card">
	                    	<div className="table-responsive m-b-40">
	                            <table className="table table-borderless table-data3">
	                                <thead>
	                                    <tr>
	                                        <th>#</th>
	                                        <th>Nama</th>
	                                        <th>Email</th>
	                                        <th>Aktif</th>
	                                        <th>Aksi</th>
	                                    </tr>
	                                </thead>
	                                <tbody>
	                                { !teachers && <p>Loading</p>}
	                                {
	                                	teachers && teachers.map((item, index) => (
		                                    <tr key={item.id}>
		                                        <td>{index+1}</td>
		                                        <td>{item.name}</td>
		                                        <td>{item.email}</td>
		                                        <td>{(item.isActive === 'true') ? 'Ya' : 'Tidak'}</td>
		                                        <td><Link to={`/user/${item.id}`}>Lihat Detail</Link></td>
		                                    </tr>
	                                	))
	                                }
	                                </tbody>
	                            </table>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
		</React.Fragment>
	)
} 

const mapStateToProps = state => ({
	users : state.firestore.ordered.users
})

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection:'users' }
	])
)(Teacher)