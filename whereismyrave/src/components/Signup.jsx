import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

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
			.post(`${process.env.REACT_APP_API}/users`, this.state, {})
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
			<div className="grid-container">
				<div className="background">
					<div className="signup">
						<form onSubmit={e => this.signup(e)}>
							<div className="signup">
								<input
									type="text"
									placeholder="Nickname..."
									value={this.state.name}
									onChange={e => this.changeName(e)}
								/>
							</div>
							<div className="signup">
								<input
									type="email"
									placeholder="Email..."
									value={this.state.email}
									onChange={e => this.changeEmail(e)}
								/>
							</div>
							<div className="signup">
								<input
									type="password"
									placeholder="Password..."
									value={this.state.password}
									onChange={e => this.changePassword(e)}
								/>
							</div>

							<button type="submit" className="signup button button2">
								Sign up
							</button>
						</form>
					</div>
				</div>
				<div className="megacontainer">
					<Link to="/">
						<button className="right">
							<i class="fas fa-home"></i>
						</button>
					</Link>
				</div>
			</div>
		)
	}
}

export default withRouter(Signup)
