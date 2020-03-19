import React from 'react'
import Header from '../components/Header'
import AudioControl from '../components/AudioControl'
import SurahLists from '../components/SurahLists'
import LoadingScreen from '../components/LoadingScreen'
import { connect } from 'react-redux'

class Mushaf extends React.Component {

	render(){
		console.log(this.props.surah)
		
	    return (
	    	<>
	    	<Header title="Mushaf" enableSearch/>
	        <div className="main-content">
	            <div className="section__content section__content--p30">
	                <div className="container-fluid">
	                	<div className="au-card">
	                		{ this.props.pending && <LoadingScreen>Loading</LoadingScreen> }
	                		{ this.props.error &&  <LoadingScreen>{`${this.props.errorMessage}`}</LoadingScreen> }
		                    { this.props.surah && <SurahLists surah={this.props.surah} />}
	                    </div>
	                </div>
	            </div>
	        </div>
	        </>
	    )
	}
}

const mapStateToProps = state => ({
	surah: state.quran.surah,
	pending: state.quran.pending,
	error: state.quran.error,
	errorMessage : state.quran.errorMessage
})

export default connect(mapStateToProps)(Mushaf)