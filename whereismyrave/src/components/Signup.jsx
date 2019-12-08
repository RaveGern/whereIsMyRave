import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class Signup extends React.Component {
	// Data
	state = {
		name: '',
		email: '',
		password: ''
	}

	// Functions
	changeName = e => {
		this.setState({ name: e.target.value })
	}

	changeEmail = e => {
		this.setState({ email: e.target.value })
	}

	changePassword = e => {
		this.setState({ password: e.target.value })
	}

	signup = e => {
		e.preventDefault()
		axios
			.post('http://localhost:1337/users', this.state, {})
			.then(res => {
				if (!res.data.token) {
					this.setState({
						error: 'User or Email is already in use'
					})
				} else {
					console.log(res.data.token)
					localStorage.setItem('token', res.data.token)
					this.props.history.push({
						pathname: `/`
					})
				}
			})
			.catch(err => console.log(err))
	}
	// Render
	render() {
		return (
			<div className="megacontainer">
				<div className="grid-container background">
					<div className="content login">
						<form onSubmit={e => this.signup(e)}>
							<div className="group">
								<input
									type="text"
									placeholder="Nickname..."
									value={this.state.name}
									onChange={e => this.changeName(e)}
								/>
							</div>
							<div className="group">
								<input
									type="email"
									placeholder="Email..."
									value={this.state.email}
									onChange={e => this.changeEmail(e)}
								/>
							</div>
							<div className="group">
								<input
									type="password"
									placeholder="Password..."
									value={this.state.password}
									onChange={e => this.changePassword(e)}
								/>
							</div>

							<button type="submit" className="button button2">
								Signup
							</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(Signup)
