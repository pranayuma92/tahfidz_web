import React from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class Home extends React.Component {

	render(){
		const { users } = this.props
		const students = users && users.filter( item => item.role === 'student')
		const studentsCount = students ? students.length : '0'

	    return (
	    	<>
	    	<Header title="Dashboard" />
	        <div className="main-content">
	            <div className="section__content section__content--p30">
	                <div className="container-fluid">
	                	<div className="row">
	                		<div className="col-md-4">
	                			<div className="au-card">
	                				<h4><i className="fa fa-users"></i> {  studentsCount  } Siswa terdaftar</h4>
	                			</div>
	                		</div>
	                		<div className="col-md-4">
	                			<div className="au-card">
	                				<h4><i className="fa fa-users"></i> 0 Guru terdaftar</h4>
	                			</div>
	                		</div>
	                		<div className="col-md-4">
	                			<div className="au-card">
	                				<h4><i className="fa fa-book"></i> 0 Materi tersedia</h4>
	                			</div>
	                		</div>
	                	</div>
	                	<br />
	                	<div className="au-card">
	                		<h4>Notification</h4>
	                		<br />
		                    <div className="alert alert-primary" role="alert">
								Fulan telah menyelesaikan hafalan A
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
)(Home)