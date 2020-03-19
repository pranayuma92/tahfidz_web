import React from 'react'
import Header from '../components/Header'
import AddNewUserButton from '../components/AddNewUserButton'
import LoadingScreen from '../components/LoadingScreen'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom'

class Student extends React.Component {
	render(){
		const { users } = this.props
		const students = users.filter( item => item.role === 'student')
		
	    return (
	    	<>
	    	<Header title="Siswa" />
	        <div className="main-content">
	            <div className="section__content section__content--p30">
	                <div className="container-fluid">
	                    <div className="au-card">
			                 <AddNewUserButton />
			                 <br />
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
	                                { !users && <p>Loading</p>}
	                                {
	                                	students && students.map((item, index) => (
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
	        </>
	    )
	}
}

const mapStateToProps = state => ({
	users : state.firestore.ordered.users
})

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection:'users' }
	])
)(Student)