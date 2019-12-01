import React from 'react'
import GoogleMapReact from 'google-map-react'
import axios from 'axios'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import { Tab, Row, Col } from 'react-bootstrap'
import Sonnet from 'react-bootstrap/Tabs'
import { withRouter } from 'react-router-dom'

class myEvents extends React.Component {
	state = {
		events: []
	}

	componentDidMount() {
		axios
			.get('http://localhost:1337/myEvents')
			.then(res => {
				console.log(res)
				this.setState({
					events: res.data
				})
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		return (
			<>
				<Navbar bg="dark" variant="dark">
					<Navbar.Brand href="#home">Navbar</Navbar.Brand>
					<Nav className="mr-auto">
						<Nav.Link href="#home">Home</Nav.Link>
						<Nav.Link href="#features">Features</Nav.Link>
						<Nav.Link href="#pricing">Pricing</Nav.Link>
					</Nav>
					<Form inline>
						<FormControl type="text" placeholder="Search" className="mr-sm-2" />
						<Button variant="outline-info">Search</Button>
					</Form>
				</Navbar>
				<Tab.Container id="left-tabs-example" defaultActiveKey="first">
					<Row>
						<Col sm={3}>
							<Nav variant="pills" className="flex-column">
								{this.state.events.map((rave, index) => {
									return (
										<Nav.Item key={index}>
											<Nav.Link href={`/event/${rave._id}`}>
												{rave.name}
											</Nav.Link>
										</Nav.Item>
									)
								})}
							</Nav>
						</Col>
						<Col sm={9}>
							<Tab.Content>
								<Tab.Pane eventKey="first">
									<Sonnet />
								</Tab.Pane>
								<Tab.Pane eventKey="second">
									<Sonnet />
								</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</>
		)
	}
}

export default withRouter(myEvents)
