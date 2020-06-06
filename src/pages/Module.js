import React from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux'
import { addNewCatModule } from '../store/actions/moduleAction' 

class Module extends React.Component {

	handleAddNewModule = () => {
		const modules = {
			title: 'test'
		}

		this.props.addNewCatModule(modules)
	}

	render(){
		console.log(this.props)
		return(
			<React.Fragment>
	    	<Header title="Materi"/>
	        <div className="main-content">
	            <div className="section__content section__content--p30">
	                <div className="container-fluid">
	                <button style={{marginBottom: '30px'}} type="button" className="btn btn-outline-primary" onClick={() => this.props.history.push('/add-module', {id: 0, edit: false})}><i className="fa fa-plus"></i> Add New</button>
	                	<div className="row">
	                		<div className="col-md-6">
			                	<div className="au-card" onClick={() => this.props.history.push('/module-overview/makharijul', { title: 'Makharijul Huruf'})}>
			                		Makharijul Huruf
			                    </div>
	                		</div>
	                		<div className="col-md-6">
			                	<div className="au-card" onClick={() => this.props.history.push('/module-overview/mad', { title: 'Mad'})}>
			                		Mad
			                    </div>
	                		</div>
	                	</div>
	                	<br />
	                	<div className="row">
	                		<div className="col-md-6">
			                	<div className="au-card" onClick={() => this.props.history.push('/module-overview/dengung', { title: 'Dengung'})}>
			                		Dengung
			                    </div>
	                		</div>
	                		<div className="col-md-6">
			                	<div className="au-card" onClick={() => this.props.history.push('/module-overview/sifat-huruf', { title: 'Sifat Huruf'})}>
			                		Sifat Huruf
			                    </div>
	                		</div>
	                	</div>
	                </div>
	            </div>
	        </div>
	        </React.Fragment>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	addNewCatModule: (modules) => dispatch(addNewCatModule(modules))
})

export default connect(null, mapDispatchToProps)(Module)