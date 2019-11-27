import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { GoogleMapReact, Marker } from 'google-map-react'
import Pin from './Pin.jsx'

class Organize extends React.Component {
	state = {
		name: '',
		startDate: '',
		endDate: '',
		key: {
			key: 'AIzaSyCVJkF4x11QI221vToWHyVvM4voNYuYbwU'
		},
		center: {
			lat: 53.532158,
			lng: 10.020708
		},
		zoom: 10
	}

	handleChange = date => {
		this.setState({
			startDate: date
		})
	}

	handleChange2 = date => {
		this.setState({
			endDate: date
		})
	}

	render() {
		return (
			<form>
				<label>Name</label>
				<div className="group">
					<input type="text"></input>
				</div>
				<label>Day</label>
				<div>
					<DatePicker
						selected={this.state.startDate}
						onChange={this.handleChange}
						dateFormat="dd / MM / yyyy"
					/>
				</div>
				<label>Start Time</label>
				<div>
					<DatePicker
						selected={this.state.startDate}
						onChange={this.handleChange}
						showTimeSelect
						showTimeSelectOnly
						timeIntervals={15}
						timeCaption="Time"
						dateFormat="h:mm aa"
					/>
				</div>
				<label>End Time</label>
				<div>
					<DatePicker
						selected={this.state.endDate}
						onChange={this.handleChange2}
						showTimeSelect
						showTimeSelectOnly
						timeIntervals={15}
						timeCaption="Time"
						dateFormat="h:mm aa"
					/>
				</div>
				<label>Location </label>
				<div style={{ height: '50vh', width: '100%' }}>
					<GoogleMapReact
						bootstrapURLKeys={this.state.key}
						center={this.state.center}
						zoom={this.state.zoom}
					></GoogleMapReact>
				</div>
			</form>
		)
	}
}

export default Organize
