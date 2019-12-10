import React from 'react'

class EmailBox extends React.Component {
	render() {
		return (
			<form onSubmit={e => this.props.handleSubmit(e)}>
				<div className="inviteBox">
					<input
						className="email"
						type="email"
						onChange={this.props.inputEmail}
					></input>
					<button className="emailButton">Invite</button>
				</div>
			</form>
		)
	}
}

export default EmailBox
