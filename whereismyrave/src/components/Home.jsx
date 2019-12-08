import React from 'react'
import Join from './Join.jsx'
import Login from './Login.jsx'
import Event from './Event.jsx'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

class Home extends React.Component {
	state = {
		event: [],
		isRenderingJoin: true,
		isRenderingEvent: false,
		codeTyped: '',
		eventCodes: []
	}

	auth = () => {
		console.log(localStorage.getItem('token'))
		if (localStorage.getItem('token')) {
			return true
		} else {
			return false
		}
	}

	toggleRendering() {
		this.setState({
			isRenderingJoin: !this.state.isRenderingJoin,
			isRenderingEvent: !this.state.isRenderingEvent
		})
	}

	getEventCodes = () => {
		let arrayCodes = this.state.event.map(ev => ev.code)
		this.setState({ eventCodes: arrayCodes })
	}

	componentDidMount() {
		axios
			.get('http://localhost:1337/myEvents')
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

	codeOk = () => {
		this.getEventCodes()
	}

	//Function to access Event based on Code typed
	changeField = e => {
		console.log(Object.values(this.state.event))
		let codeTyped
		codeTyped = e
		this.setState({ codeTyped })
		this.state.eventCodes.filter(c => {
			if (codeTyped == c) {
				this.setState({
					isRenderingEvent: true,
					isRenderingJoin: false
				})
				let pointingEvent = this.state.event.find(ev => (ev.code = codeTyped))
				console.log({ pointingEvent })
				this.props.history.push({
					pathname: `/event/${pointingEvent._id}`
				})
			}
		})
	}

	render() {
		return (
			<>
				<div className="megacontainer">
					<div className="grid-container background">
						<div>
							<h2 className="left">Where is my Rave?</h2>
							{this.state.isRenderingJoin && (
								<Join
									toggleRendering={this.toggleRendering}
									changeField={this.changeField}
									event={this.state.event}
									id={this.state.event._id}
									codeOk={this.codeOk}
								/>
							)}
							{this.state.isRenderingEvent && (
								<Event
									event={this.state.event}
									id={this.state.event._id}
									changeField={this.state.changeField}
								/>
							)}

							{this.auth() ? (
								<div>
									<Link to="/organize">
										<button className="button1 button">Create</button>
									</Link>
								</div>
							) : (
								''
							)}

							<div>
								<Link to="/Login">
									<button className="button2 button">Login</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default withRouter(Home)
