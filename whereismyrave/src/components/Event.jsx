import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import GoogleMap from 'google-map-react'
import Pin from './Pin.jsx'
import EmailBox from './EmailBox.jsx'

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
		zoom: 10,
		isHidden: true,
		email: {
			address: ''
		}
	}

	toggleHidden() {
		this.setState({
			isHidden: !this.state.isHidden
		})
	}

	inputEmail = (e, field) => {
		let emailInput = this.state.email
		emailInput.address = e.target.value
		this.setState({ emailInput })
		console.log(e)
		console.log(emailInput)
	}
	handleSubmit = e => {
		console.log('handleSubmit works')
		let eventID = this.props.match.params.id
		e.preventDefault()
		axios
			.post(`http://localhost:1337/event/${eventID}`, {
				email: this.state.email,
				code: this.state.event.code
			})
			.then(res => {
				console.log(res)
				this.setState({
					message: 'Email sent correctly'
				})
			})
			.catch(err => {
				console.log({ err })
			})
		axios
			.post('http://localhost:1337/users', {
				email: this.state.email.address,
				code: this.state.event.code
			})
			.then(res => {
				console.log(res)
				this.setState({
					users: res.data.data
				})
			})
			.catch(err => {
				console.log(err)
			})
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
								<li>
									Lat {this.state.event.lat} + Lng {this.state.event.lng}
								</li>
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
					123
					<button onClick={this.toggleHidden.bind(this)}>+</button>
					{!this.state.isHidden && (
						<EmailBox
							inputEmail={this.inputEmail}
							onChange={e => this.inputEmail(e, 'email')}
							value={this.state.email.raver}
							handleSubmit={this.handleSubmit}
						/>
					)}
				</div>
			</>
		)
	}
}

export default withRouter(Event)
