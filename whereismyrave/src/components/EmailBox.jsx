import React from 'react'

class EmailBox extends React.Component {
	render() {
		return (
			<form onSubmit={e => this.props.handleSubmit(e)}>
				<div class="roundedCorners">
					<label>E-Mail</label>
					<input type="email" onChange={this.props.inputEmail}></input>
					<button>Invite</button>
				</div>
			</form>
		)
	}
}

export default EmailBox
