import React from 'react'

const Header = (props) => {

	return (
		<header className="header-desktop">
            <div className="section__content section__content--p30">
                <div className="container-fluid">
                    <div className="header-wrap">
                    	{ props.enableBack && <button className="btn-toggle" onClick={() => props.history.goBack()}><i className="fa fa-arrow-left"></i> Back</button>}
                    	<h3>{props.title}</h3>
                        {	
                        	props.enableSearch &&
                        	<form className="form-header" action="" method="POST">
                                <input className="au-input au-input--xl" type="text" name="search" placeholder="Type Here..." />
                                <button className="au-btn--submit" type="submit">
                                    <i className="fa fa-search"></i>
                                </button>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </header>
	)
}

export default Header