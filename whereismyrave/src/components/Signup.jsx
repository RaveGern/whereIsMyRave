import React from 'react'
import axios from 'axios'

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
			.post('http://localhost:1337/signup', this.state)
			.then(res => {
				localStorage.setItem('token', res.data.token)
				this.props.history.push({
					pathname: `/home`
				})
			})
			.catch(err => {
				console.log('err', err)
			})
	}
	// Render
	render() {
		return (
			<div id="signup">
				<div className="row">
					<div className="col-4 offset-4">
						<div className="card signup">
							<div className="card-body">
								<h3>Where's My Rave?</h3>
								<form onSubmit={e => this.signup(e)}>
									<div className="form-group signupform">
										<input
											type="text"
											className="form-control"
											placeholder="Nickname..."
											value={this.state.name}
											onChange={e => this.changeName(e)}
										/>
									</div>
									<div className="form-group signupform">
										<input
											type="email"
											className="form-control"
											placeholder="Email..."
											value={this.state.email}
											onChange={e => this.changeEmail(e)}
										/>
									</div>
									<div className="form-group signupform">
										<input
											type="password"
											className="form-control"
											placeholder="Password..."
											value={this.state.password}
											onChange={e => this.changePassword(e)}
										/>
									</div>

									<button type="submit" className="btn btn-success">
										Signup
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Signup
