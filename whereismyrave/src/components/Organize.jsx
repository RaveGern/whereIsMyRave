import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import GoogleMapReact from 'google-map-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Pin from './Pin.jsx'
import { withRouter } from 'react-router-dom'

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
		let fields = ['name', 'day', 'start', 'end', 'genre', 'code']

		axios
			.post(`${process.env.REACT_APP_API}/events`, this.state.newEvent, {
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
			})
			.then(res => {
				console.log(res)
				this.setState({
					events: res.data
				})
				this.props.history.push({
					pathname: `/MyEvents`
				})
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		return (
			<div className="grid-container megacontainer">
				<form onSubmit={e => this.createEvent(e)}>
					<Link to="/">
						<button className="right">
							<i class="fas fa-home"></i>
						</button>
					</Link>

					<label>Name</label>
					<div className="group">
						<input
							type="text"
							value={this.state.newEvent.name}
							onChange={e => this.changeField(e, 'name')}
						></input>
					</div>
					<label>Day</label>
					<div className="group">
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
					<div className=" grid createMap wrapper">
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
					<label>Code</label>
					<div className="group">
						<input
							type="text"
							value={this.state.newEvent.code}
							onChange={e => this.changeField(e, 'code')}
						></input>
					</div>

					<button className="button group">Submit</button>
				</form>
			</div>
		)
	}
}

export default withRouter(Organize)
