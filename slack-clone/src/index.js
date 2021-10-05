import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import 'semantic-ui-css/semantic.min.css';

const Root = () => (
	<Router>
		<Switch>
			<Route exact path='/' component={App} />
			<Route path='/login' component={Login} />
			<Route path='/register' component={Register} />
		</Switch>
	</Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));

reportWebVitals();
