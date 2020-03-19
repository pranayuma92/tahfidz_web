import React from 'react'


class AudioControl extends React.Component {
	state = {
		audio: new Audio(this.props.source),
		playing: false
	}

	togglePlay = () => {
		this.setState({playing: !this.state.playing}, () => {
			this.state.playing ? this.state.audio.play() : this.state.audio.pause()
		})
		this.state.audio.onended = () => {
			this.setState({playing: !this.state.playing})
		} 
	}

	render(){
		const { playing } = this.state
		return(
			<span className="audio-control-wrapper">
				<button className="btn-toggle" onClick={() => this.togglePlay()}><i className={ playing ? 'fa fa-pause' : 'fa fa-play'}></i></button>
			</span>
		)
	}
}

export default AudioControl