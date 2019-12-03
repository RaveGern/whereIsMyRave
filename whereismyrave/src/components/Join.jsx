import React from 'react'
import ReactCodeInput from 'react-code-input'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class Join extends React.Component {
	state = {
		event: [],
		raver: {
			email: '',
			code: 0
		}
	}
	join = e => {
		e.preventDefault()
		axios
			.post('http://localhost:1337/join', this.state.raver, {})
			.then(res => {
				if (!res.data) {
					this.setState({
						error: 'E-Mail or Code wrong'
					})
				} else {
					console.log('bbbb', this.state.raver)
					console.log('aaa', this.state.event)
					console.log(res.data)
					localStorage.setItem('token_guest', res.data)
					this.props.history.push({
						pathname: `/event/${this.state.event._id}`
					})
				}
			})
			.catch(err => console.log(err))
	}

	changeField = (e, field) => {
		let formInput = this.state.raver
		if (e.target) {
			formInput[field] = e.target.value
		} else {
			formInput[field] = e
		}

		this.setState(formInput)
		console.log(formInput)
		console.log(field)
	}

	render() {
		return (
			<form onSubmit={e => this.join(e)}>
				<div className="roundedCorners">
					<div>
						<label>Email</label>
					</div>
					<input
						type="email"
						value={this.state.raver.email}
						onChange={e => this.changeField(e, 'email')}
					></input>
					<div>
						<label>Code</label>
					</div>
					<div>
						<ReactCodeInput
							type="password"
							fields={4}
							value={this.state.raver.code}
							onChange={e => this.changeField(e, 'code')}
						/>{' '}
						<button>Join</button>
					</div>
				</div>
			</form>
		)
	}
}

export default withRouter(Join)
