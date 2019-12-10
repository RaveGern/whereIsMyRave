import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import GoogleMap from 'google-map-react'
import { Link } from 'react-router-dom'
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
		console.log('this.state.event.code', this.state.event.code)
		console.log('this.state.event', this.state.event)
		console.log('handleSubmit works')
		let eventID = this.props.match.params.id
		e.preventDefault()
		axios
			.post(`${process.env.REACT_APP_API}/event/${eventID}`, {
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
	}

	componentDidMount() {
		let eventID = this.props.match.params.id

		axios
			.get(`${process.env.REACT_APP_API}/event/${eventID}`)
			.then(res => {
				console.log('res all events zzzz', res.data)

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
				<Link to="/">
					<button className="right">
						<i class="fas fa-home"></i>
					</button>
				</Link>

				<div className="megacontainer grid-container">
					<div className="grid">
						<div className="eventFont">
							<ul>
								<h3>Title:{this.state.event.name}</h3>
								<h3>
									Day: {''}
									{moment(this.state.event.day).format('DD MMM YY ')}
								</h3>
								<h3>
									Start: {''}
									{moment(this.state.event.start).format('h:mm a')}
								</h3>
								<h3>
									End: {''}
									{moment(this.state.event.end).format('h:mm a')}
								</h3>
								<h3>
									Lat: {''}
									{this.state.event.lat}
								</h3>
								<h3>
									Lng: {''}
									{this.state.event.lng}
								</h3>
							</ul>
							<div className="littlebox">
								<h3 className="white inline">Invite some Friends</h3>
								<button
									className="inline roundedButton"
									onClick={this.toggleHidden.bind(this)}
								>
									<i class="fas fa-user-plus"></i>
								</button>
								{!this.state.isHidden && (
									<EmailBox
										inputEmail={this.inputEmail}
										onChange={e => this.inputEmail(e, 'email')}
										value={this.state.email.raver}
										handleSubmit={this.handleSubmit}
										toggleHidden={this.toggleHidden}
									/>
								)}
							</div>
						</div>
						<div className="eventMap">
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
				</div>
			</>
		)
	}
}

export default withRouter(Event)
