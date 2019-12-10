import React from 'react'
import Join from './Join.jsx'
import Login from './Login.jsx'
import Logout from './Logout.jsx'
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
			.get(`${process.env.REACT_APP_API}/events`)
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
				let pointingEvent = this.state.event.find(ev => {
					console.log(ev)
					console.log('ev.code', ev.code)
					console.log('codeTyped', codeTyped)
					return ev.code == codeTyped
				})
				console.log({ pointingEvent })
				this.props.history.push({
					pathname: `/event/${pointingEvent._id}`
				})
			}
		})
	}

	render() {
		return (
			<div className="grid-container">
				<div className="background justify">
					<h2>Where is my Rave?</h2>
					<div>
						<Link to="/Login">
							<button className="button">Login / Sign up</button>
						</Link>
					</div>
					<Logout auth={this.auth} />
				</div>

				<div className="megacontainer justify">
					<div className="margin">
						<h2>Insert Code</h2>
						{this.state.isRenderingJoin && (
							<Join
								toggleRendering={this.toggleRendering}
								changeField={this.changeField}
								event={this.state.event}
								id={this.state.event._id}
								codeOk={this.codeOk}
							/>
						)}
					</div>

					{this.auth() ? (
						<div>
							<Link to="/organize">
								<button className="button">Create</button>
							</Link>
						</div>
					) : (
						''
					)}
				</div>
			</div>
		)
	}
}

export default withRouter(Home)
