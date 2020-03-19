import React from 'react'
import { connect } from 'react-redux'
import { signUp } from '../store/actions/userAction'

class SignUpForm extends React.Component {

	state = {
		fullname: '',
		email: '',
		password: ''
	}

	handleChange = e => {
		this.setState({ [e.target.id] : e.target.value })
	}

	handleSubmit = e => {
		e.preventDefault()
		if(this.state.fullname && this.state.email && this.state.password){		
			this.props.signUp(this.state, () => {
				this.setState({ fullname: '', email: '', password: ''})
			})
		} else{
			alert('Cannot continue if form empty!')
		}
	}

	render(){
		console.log(this.props)
		return(
			<div className="login-form">
                <form onSubmit={this.handleSubmit} className="form-login">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input onChange={this.handleChange} className="au-input au-input--full" type="text" id="fullname" placeholder="Full Name" value={this.state.fullname}/>
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input onChange={this.handleChange} className="au-input au-input--full" type="email" id="email" placeholder="Email" value={this.state.email}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input onChange={this.handleChange} className="au-input au-input--full" type="password" id="password" placeholder="Password" value={this.state.password}/>
                    </div>
                    <button className="au-btn au-btn--block au-btn--green m-b-20" type="submit">{this.props.user.pending ? 'Processing' : this.props.submitText}</button>
                    { this.props.user.message && <p>{this.props.user.message}</p>}
                </form>
                {
                	this.props.registerLink &&	
	                <div className="register-link">
	                    <p>
	                        Already have account?
	                        <a href="#">Sign In</a>
	                    </p>
	                </div>
                }
            </div>
		)
	}
}

const mapStateToProps = (state) => ({
	user: state.user
})

const mapDispatchToProps = (dispatch) => ({
	signUp : (newUser, callback) => dispatch(signUp(newUser, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)