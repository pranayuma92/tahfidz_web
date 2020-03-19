import React from 'react'

const LoadingScreen = (props) => {
	return (
		<div className="loading-wrapper">
	        {props.children}         
	    </div>
	)
}

export default LoadingScreen