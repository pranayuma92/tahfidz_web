import React from 'react'
import Modal from './Modal'
import SignUpForm from './SignUpForm'

class AddNewUserButton extends React.Component {

	state = {
		showModal : false
	}

	toggleModal = () => {
		this.setState({ showModal : !this.state.showModal })
	}

	render(){
		return(
			<>
			<div className="btn-wrapper">
				<button type="button" className="btn btn-outline-primary" onClick={this.toggleModal}><i className="fa fa-plus"></i> Add New</button>
			</div>
			<Modal title="Add New User" isShow={this.state.showModal} isHide={this.toggleModal}>
				<SignUpForm submitText="Add New User" />
			</Modal>
			</>
		)
	}
}

export default AddNewUserButton