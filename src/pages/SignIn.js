import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signIn } from '../store/actions/userAction'
import logo from '../img/mumtaz_logo.png'

class SignIn extends React.Component {

	state = {
		email: '',
		password: ''
	}

	handleChange = (e) => {
		this.setState({ [e.target.id] : e.target.value})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.signIn(this.state)
	}

	render(){
		const { auth } = this.props;
		if(auth.uid) return <Redirect to='/' />

		return(
			<div className="container">
                <div className="login-wrap">
                    <div className="login-content">
                        <div className="login-logo">
                            <a href="#">
                                <img src={logo} alt="CoolAdmin" />
                            </a>
                        </div>
                        <div className="login-form">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input onChange={this.handleChange} className="au-input au-input--full" type="email" id="email" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input onChange={this.handleChange} className="au-input au-input--full" type="password" id="password" placeholder="Password" />
                                </div>
                                <button className="au-btn au-btn--block au-btn--green m-b-20" type="submit">sign in</button>
                            </form>
                            {	this.props.registerLink && 
                            	<div className="register-link">
                                    <p>
                                        Don't you have account?
                                        <a href="#">Sign Up Here</a>
                                    </p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
		)
	}
}

const mapStateToProps = state => ({
	authError : state.user.authError,
	auth: state.firebase.auth
})

const mapDispatchToProps = (dispatch) => ({
	signIn : creds => dispatch(signIn(creds))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)