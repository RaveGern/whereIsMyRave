import React from 'react'

class Pin extends React.Component {
	render() {
		return (
			<div className="pin" lat={this.props.lat} lng={this.props.lng}>
				<label>My Marker</label>
			</div>
		)
	}
}

export default Pin
