import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/mumtaz_logo.png'
import { signOut } from '../store/actions/userAction'
import { connect } from 'react-redux'

const SidePanel = (props) => {
	return (
		<aside className="menu-sidebar d-none d-lg-block">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Cool Admin" />
                </Link>
            </div>
            <div className="menu-sidebar__content js-scrollbar1">
                <nav className="navbar-sidebar">
                    <ul className="list-unstyled navbar__list">
                        <li>
                            <Link to="/">
                                <i className="fa fa-dashboard"></i>Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/teacher">
                                <i className="fa fa-users"></i>Guru
                            </Link>
                        </li>
                        <li>
                            <Link to="/student">
                                <i className="fa fa-users"></i>Siswa
                            </Link>
                        </li>
                        <li>
                            <Link to="/mushaf">
                                <i className="fa fa-book"></i>Mushaf
                            </Link>
                        </li>
                        <li>
                            <Link to="/module">
                                <i className="fa fa-book"></i>Materi
                            </Link>
                        </li>
                        <li>
                            <a href="#" onClick={props.signOut}>
                                <i className="fa fa-power-off"></i>Logout
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
	)
}

const mapDispathToProps = dispatch => ({
    signOut : () => dispatch(signOut())
})

export default connect(null, mapDispathToProps)(SidePanel)