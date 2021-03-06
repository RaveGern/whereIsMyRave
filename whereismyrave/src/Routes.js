import React from 'react'
import Home from './components/Home.jsx'
import Join from './components/Join.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import Organize from './components/Organize.jsx'
import myEvents from './components/myEvents.jsx'
import Event from './components/Event.jsx'
import EmailBox from './components/EmailBox.jsx'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

class Routes extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/event/:id" component={Event} />
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route path="/myEvents" component={myEvents} />
					<Route path="/join" component={Join} />
					<Route path="/organize" component={Organize} />
					<Route path="/" component={Home} />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default Routes
