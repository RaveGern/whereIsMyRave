import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

export default function FixedContainer() {
	return (
		<React.Fragment>
			<Button
				variant="contained"
				color="primary"
				className="button1"
				Link
				href="/Join"
			>
				Join
			</Button>
			<Button
				variant="contained"
				color="primary"
				className="button2"
				Link
				href="/Organize"
			>
				Organize
			</Button>
			<CssBaseline />
			<Container fixed>
				<Typography
					component="div"
					style={{ backgroundColor: '#DE9331', height: '100vh' }}
				/>
			</Container>
		</React.Fragment>
	)
}
