import React from 'react'
import API from '../api'
import Header from '../components/Header'
import AudioControl from '../components/AudioControl'
import LoadingScreen from '../components/LoadingScreen'

class SurahSingle extends React.Component {

	state = {
		pending: true,
		error: false,
		ayah : ''
	}

	componentDidMount(){
		API.getSurah(this.props.match.params.number)
		.then(result => {
			console.log(result.data.data)
			this.setState({
				ayah:result.data.data,
				pending: false
			})
		}, error => {
			this.setState({error: true, pending: false})
		})
	}

	render(){
		console.log(this.state)

		return(
			<>
			<Header title={ this.state.ayah.name ? `${this.state.ayah.name} (${this.state.ayah.englishName})` : ''} history={this.props.history} enableBack enableSearch/>
			<div className="main-content">
	            <div className="section__content section__content--p30">
	                <div className="container-fluid">
	                	<div className="au-card">
	                		{ this.state.pending &&  <LoadingScreen>Loading</LoadingScreen> }
	                		{ this.state.error && <LoadingScreen>An error occurred</LoadingScreen> }
		                    {
		                    	this.state.ayah.ayahs && this.state.ayah.ayahs.map((item, index) => {
		                    			let addClass = 'item'
		                    			if(index % 2 == 0){
		                    				addClass += ' odd'
		                    			} else {
		                    				addClass += ' even'
		                    			}

			                    		return	(
				                    		<div key={index} className={addClass}> 
												<AudioControl source={item.audioSecondary[0]} />
					                    		<p className="quran-font">{item.text}</p>
											</div>
			                    		)
			                    	}
		                    	) 
		                    }
	                    </div>
	                </div>
	            </div>
	        </div>
	        </>
		)
	}
}

export default SurahSingle