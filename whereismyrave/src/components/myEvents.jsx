import React from 'react'
import GoogleMapReact from 'google-map-react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class myEvents extends React.Component {
	state = {
		events: []
	}

	callDatabase = () => {
		axios
			.get(`${process.env.REACT_APP_API}/MyEvents`, {
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
			})
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

	handleDelete = id => {
		axios
			.delete(`${process.env.REACT_APP_API}/events`, {
				headers: { token: 123 },
				data: { id: id }
			})
			.then(res => {
				this.callDatabase()
			})
	}

	componentDidMount() {
		axios

			.get(`${process.env.REACT_APP_API}/MyEvents`, {
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
			})
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
			<>
				<div className="eventcontainer megacontainer">
					{this.state.events.map((rave, index) => {
						return (
							<div key={index}>
								<a href={`/event/${rave._id}`}>
									<button className="button eventButton left" key={index}>
										{rave.name}
									</button>
								</a>
								<button
									className="deleteButton eventButton right2"
									onClick={() => this.handleDelete(rave._id)}
								>
									Delete
								</button>
							</div>
						)
					})}
				</div>
			</>
		)
	}
}

export default withRouter(myEvents)
