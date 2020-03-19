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
			<>
	    	<Header title="Materi"/>
	        <div className="main-content">
	            <div className="section__content section__content--p30">
	                <div className="container-fluid">
	                <button onClick={this.handleAddNewModule}>add</button>
	                	<div className="row">
	                		<div className="col-md-6">
			                	<div className="au-card">
			                		Makharijul Huruf
			                    </div>
	                		</div>
	                		<div className="col-md-6">
			                	<div className="au-card">
			                		Mad
			                    </div>
	                		</div>
	                	</div>
	                	<br />
	                	<div className="row">
	                		<div className="col-md-6">
			                	<div className="au-card">
			                		Dengung
			                    </div>
	                		</div>
	                		<div className="col-md-6">
			                	<div className="au-card">
			                		Sifat Huruf
			                    </div>
	                		</div>
	                	</div>
	                </div>
	            </div>
	        </div>
	        </>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	addNewCatModule: (modules) => dispatch(addNewCatModule(modules))
})

export default connect(null, mapDispatchToProps)(Module)