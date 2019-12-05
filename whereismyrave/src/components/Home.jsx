import React from 'react'
import Join from './Join.jsx'
import Event from './Event.jsx'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class Home extends React.Component {
	state = {
		event: [],
		isRenderingJoin: true,
		isRenderingEvent: false,
		codeTyped: '',
		eventCodes: []
	}
	changeField = e => {
		let codeTyped
		codeTyped = e
		this.setState({ codeTyped })
		this.state.eventCodes.forEach(c => {
			if (codeTyped == c) {
				this.setState({ isRenderingEvent: true, isRenderingJoin: false })
			}
		})
	}

	toggleRendering() {
		this.setState({
			isRenderingJoin: this.state.isRenderingJoin,
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

	render() {
		return (
			<>
				<div>
					{this.state.isRenderingJoin && (
						<Join
							toggleRendering={this.toggleRendering}
							changeField={this.changeField}
							event={this.state.event}
							codeOk={this.codeOk}
						/>
					)}

					{this.state.isRenderingEvent && <Event event={this.state.event} />}
				</div>
			</>
		)
	}
}

export default withRouter(Home)
