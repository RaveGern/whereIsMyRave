import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import GoogleMapReact from 'google-map-react'
import axios from 'axios'
import Pin from './Pin.jsx'

class Organize extends React.Component {
	state = {
		newEvent: {
			lat: 0,
			lng: 0
		},
		key: {
			key: 'AIzaSyCVJkF4x11QI221vToWHyVvM4voNYuYbwU'
		},
		center: {
			lat: 53.532158,
			lng: 10.020708
		},
		zoom: 10
	}

	handleChangeDay = day => {
		console.log(day)
		this.setState({
			newEvent: { ...this.state.newEvent, day }
		})
	}

	handleClickedMap = g => {
		console.log(g)

		this.setState({
			newEvent: { ...this.state.newEvent, lat: g.lat, lng: g.lng }
		})
	}

	handleChangeStart = start => {
		this.setState({
			newEvent: { ...this.state.newEvent, start }
		})
	}

	handleChangeEnd = end => {
		this.setState({
			newEvent: { ...this.state.newEvent, end }
		})
	}
	changeField = (e, field) => {
		let formInput = this.state.newEvent
		formInput[field] = e.target.value
		this.setState(formInput)
		console.log(formInput)
		console.log(field)
	}

	createEvent = e => {
		e.preventDefault()
		let fields = ['name', 'day', 'start', 'end', 'genre']

		axios
			.post('http://localhost:1337/events', this.state.newEvent, {})
			.then(res => {
				console.log(res)
				this.setState({
					events: res.data
				})
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		return (
			<form onSubmit={e => this.createEvent(e)}>
				<label>Name</label>
				<div className="group">
					<input
						type="text"
						value={this.state.newEvent.name}
						onChange={e => this.changeField(e, 'name')}
					></input>
				</div>
				<label>Day</label>
				<div>
					<DatePicker
						selected={this.state.newEvent.day}
						onChange={this.handleChangeDay}
						dateFormat="dd / MM / yyyy"
					/>
				</div>
				<label>Start</label>
				<div className="group">
					<DatePicker
						selected={this.state.newEvent.start}
						onChange={this.handleChangeStart}
						showTimeSelect
						showTimeSelectOnly
						timeIntervals={15}
						timeCaption="Time"
						dateFormat="h:mm aa"
					/>
				</div>
				<label>End</label>
				<div className="group">
					<DatePicker
						selected={this.state.newEvent.end}
						onChange={this.handleChangeEnd}
						showTimeSelect
						showTimeSelectOnly
						timeIntervals={15}
						timeCaption="Time"
						dateFormat="h:mm aa"
					/>
				</div>
				<label>Location</label>
				<div style={{ height: '50vh', width: '60%' }}>
					<GoogleMapReact
						bootstrapURLKeys={this.state.key}
						center={this.state.center}
						zoom={this.state.zoom}
						onClick={g => this.handleClickedMap(g)}
					>
						<Pin
							lat={this.state.newEvent.lat}
							lng={this.state.newEvent.lng}
							className="pin"
						/>
					</GoogleMapReact>
				</div>
				<label>Genre</label>
				<div className="group">
					<input
						type="text"
						value={this.state.newEvent.genre}
						onChange={e => this.changeField(e, 'genre')}
					></input>
				</div>
				<button className="primary">Submit</button>
			</form>
		)
	}
}

export default Organize
