import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import GoogleMap from 'google-map-react'
import Pin from './Pin.jsx'
import EmailBox from './EmailBox.jsx'
import moment from 'moment'

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
		zoom: 13,
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
				code: this.state.event.code,
				id: this.state.event._id
			})
			.then(res => {
				console.log('aaaa', res)
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
								<li>{moment(this.state.event.day).format('DD MMM YY ')}</li>
								<li>{moment(this.state.event.start).format('h:mm a')}</li>
								<li>{moment(this.state.event.end).format('h:mm a')}</li>
								<li>
									Lat {this.state.event.lat} + Lng {this.state.event.lng}
								</li>
							</ul>
						</div>
						<div>
							<GoogleMap
								bootstrapURLKeys={this.state.key}
								center={this.state.center}
								zoom={this.state.zoom}
							>
								<Pin
									lat={this.state.event.lat}
									lng={this.state.event.lng}
									name={this.state.event.name}
								/>
							</GoogleMap>
						</div>
					</div>
					<div>
						<button onClick={this.toggleHidden.bind(this)}>+</button>
					</div>

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
