import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class Login extends React.Component {
	state = {
		user: {
			email: '',
			password: ''
		}
	}

	changeField = (e, field) => {
		let user = this.state.user
		user[field] = e.target.value
		this.setState({ user })
	}
	login = e => {
		e.preventDefault()
		axios
			.post(`${process.env.REACT_APP_API}/login`, this.state.user)
			.then(res => {
				if (!res.data.token) {
					console.log(res)

					this.setState({
						error: 'E-Mail or Password is wrong'
					})
				} else {
					console.log(res.data)
					localStorage.setItem('token', res.data.token)
					this.props.history.push({
						pathname: `/`
					})
				}
			})
			.catch(res => {
				console.log({ res })
			})
	}

	render() {
		return (
			<div className="grid-container">
				<div className="background">
					<div className="content login">
						<form onSubmit={e => this.login(e)}>
							<div className="group">
								<label>Email</label>

								<input
									type="email"
									value={this.state.email}
									onChange={e => this.changeField(e, 'email')}
								/>
							</div>
							<div className="group">
								<label>Password</label>
								<input
									type="password"
									value={this.state.password}
									onChange={e => this.changeField(e, 'password')}
								/>
							</div>
							<div>
								<button className="button2 button">
									Login
									<Link to="/"></Link>
								</button>
							</div>
						</form>
						<h4>Tell us where your Rave is and</h4>{' '}
						<Link to="/Signup">
							<h4>Sign up</h4>
						</Link>
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

export default withRouter(Login)
