import React from 'react'
import GoogleMapReact from 'google-map-react'
import axios from 'axios'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import { Tab, Row, Col } from 'react-bootstrap'
import Sonnet from 'react-bootstrap/Tabs'
import { withRouter } from 'react-router-dom'

class myEvents extends React.Component {
	state = {
		events: []
	}

	callDatabase = () => {
		axios
			.get('http://localhost:1337/myEvents')
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
			.delete(`http://localhost:1337/events`, {
				headers: { token: 123 },
				data: { id: id }
			})
			.then(res => {
				this.callDatabase()
			})
	}

	componentDidMount() {
		axios
			.get('http://localhost:1337/myEvents')
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
							<div>
								<a href={`/event/${rave._id}`}>
									<button className="button eventButton" key={index}>
										{rave.name}
									</button>
								</a>
								<button
									className="deleteButton eventButton"
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
