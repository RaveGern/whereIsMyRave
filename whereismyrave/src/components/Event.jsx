import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import GoogleMap from 'google-map-react'
import Pin from './Pin.jsx'

class Event extends React.Component {
	state = {
		event: [],
		key: {
			key: 'AIzaSyCVJkF4x11QI221vToWHyVvM4voNYuYbwU'
		},
		center: {
			lat: 53.532158,
			lng: 10.020708
		},
		zoom: 10
	}

	componentDidMount() {
		let eventID = this.props.match.params.id
		axios
			.get(`http://localhost:1337/event/${eventID}`)
			.then(res => {
				console.log('res all events', res.data)
				this.setState({
					event: res.data
				})
			})
			.catch(err => {
				console.log(err)
			})
	}
	render() {
		return (
			<>
				<div className="grid-container">
					<div className="grid">
						<div className="background">
							<ul>
								<li>{this.state.event.name}</li>
								<li>{this.state.event.day}</li>
								<li>{this.state.event.start}</li>
								<li>{this.state.event.end}</li>
							</ul>
						</div>
						<div className="eventMap">
							<GoogleMap
								bootstrapURLKeys={this.state.key}
								center={this.state.center}
								zoom={this.state.zoom}
							>
								<Pin lat={this.state.event.lat} lng={this.state.event.lng} />
							</GoogleMap>
						</div>
					</div>
					<h2>Olé</h2>
				</div>
			</>
		)
	}
}

export default withRouter(Event)
