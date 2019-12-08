import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './Routes'
import './App.css'
import './index.css'
import './styles/maps.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/eventGrid.css'
import './styles/boxandbuttons.css'
import './styles/fonts.css'
import './styles/forms.css'
import './styles/cards.css'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<Routes />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
