import React from 'react'
import Home from './components/Home.jsx'
import Join from './components/Join.jsx'
import SignInSide from './components/SignInSide.js'
import Login from './components/Login.jsx'
import Organize from './components/Organize.jsx'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Button from '@material-ui/core/Button'

class Routes extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/signup" component={SignInSide} />
					<Route path="/event" component={Event} />
					<Route path="/join" component={Join} />
					<Route path="/organize" component={Organize} />
					<Route path="/" component={Home} />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default Routes
