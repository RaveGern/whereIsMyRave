import React from 'react'
import ReactCodeInput from 'react-code-input'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class Join extends React.Component {
	state = {
		event: this.props.event
	}

	componentWillReceiveProps(props) {
		console.log(props.event)
		this.setState({ event: props.event })
	}

	render() {
		return (
			<div className="roundedCorners">
				<div>
					<ReactCodeInput
						type="password"
						fields={4}
						onChange={e => {
							this.props.changeField(e)
							this.props.codeOk()
						}}
						onClick={e => this.props.toggleRenderingEvent}
					/>{' '}
					<button>Join</button>
				</div>
			</div>
		)
	}
}

export default withRouter(Join)
