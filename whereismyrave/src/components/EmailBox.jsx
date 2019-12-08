import React from 'react'

class EmailBox extends React.Component {
	render() {
		return (
			<form onSubmit={e => this.props.handleSubmit(e)}>
				<div className="inviteBox">
					<input type="email" onChange={this.props.inputEmail}></input>
					<button>Invite</button>
				</div>
			</form>
		)
	}
}

export default EmailBox
