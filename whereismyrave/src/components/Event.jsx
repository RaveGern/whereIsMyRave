import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class Event extends React.Component {
	state = {
		event: {}
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
		return <h2>{this.state.event.name}</h2>
	}
}

export default withRouter(Event)
