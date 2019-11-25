import React from 'react'
import Home from './components/Home.jsx'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

class Routes extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/" component={Home} />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default Routes
