import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Root = () => (
	<Router>
		<Switch>
			<Route path='/' component={App} />
		</Switch>
	</Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));

reportWebVitals();
