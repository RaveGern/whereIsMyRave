import React from 'react'
import ReactCodeInput from 'react-code-input'

class Join extends React.Component {
	render() {
		return (
			<form onSubmit={e => this.join}>
				<div class="roundedCorners">
					<label>E-Mail</label>
					<input type="email"></input>
					<button>Invite</button>
				</div>
				<div>
					<label>Code</label>
					<ReactCodeInput type="password" fields={4} />
				</div>
			</form>
		)
	}
}

export default Join
