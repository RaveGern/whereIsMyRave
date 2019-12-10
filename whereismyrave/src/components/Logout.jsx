import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Logout extends Component {
	// Function
	logout = e => {
		localStorage.removeItem('token')
	}

	render() {
		return (
			<Link to="/">
				<button
					onClick={e => this.logout(e)}
					type="submit"
					className="logout"
					auth={this.props.auth()}
				>
					<i class="fas fa-sign-out-alt"></i>
				</button>
			</Link>
		)
	}
}

export default Logout
