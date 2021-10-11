import React from 'react';
import database from '../../firebase';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import md5 from 'md5';
import {
	Grid,
	Form,
	Segment,
	Button,
	Header,
	Message,
	Icon,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Register extends React.Component {
	state = {
		username: '',
		email: '',
		password: '',
		passwordConfirmation: '',
		errors: [],
		loading: false,
		usersRef,
	};

	isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
		return (
			!username.length ||
			!email.length ||
			!password.length ||
			!passwordConfirmation.length
		);
	};

	isPasswordValid = ({ password, passwordConfirmation }) => {
		if (password.length < 6 || passwordConfirmation.length < 6) {
			return false;
		} else if (password !== passwordConfirmation) {
			return false;
		} else {
			return true;
		}
	};

	displayErrors = (errors) =>
		errors.map((error, i) => <p key={i}>{error.message}</p>);

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	isFormValid = () => {
		let errors = [];
		let error;
		if (this.isFormEmpty(this.state)) {
			error = { message: 'Fill in all fields' };
			this.setState({ errors: errors.concat(error) });
			return false;
		} else if (!this.isPasswordValid(this.state)) {
			error = { message: 'Password is invalid' };
			this.setState({ errors: errors.concat(error) });
			return false;
		} else {
			return true;
		}
	};

	handleSumbit = (event) => {
		event.preventDefault();
		if (this.isFormValid()) {
			this.setState({ errors: [], loading: true });
			const auth = getAuth();

			createUserWithEmailAndPassword(
				auth,
				this.state.email,
				this.state.password
			)
				.then((createdUser) => {
					console.log(createdUser);
					const user = auth.currentUser;
					console.log(user);

					updateProfile(user, {
						displayName: this.state.username,
						photoURL: `http://gravatar.com/avatar${md5(
							createdUser.user.email
						)}?d=identicon`,
					})
						.then(() => {
							this.saveUser(createdUser).then(() => {
								console.log('user savd');
							});
							this.setState({ loading: false });
						})
						.catch((err) => {
							console.error(err);
							this.setState({
								errors: this.state.errors.concat(err),
								loading: false,
							});
						});
				})

				.catch((err) => {
					console.log(err);
					this.setState({
						errors: this.state.errors.concat(err),
						loading: false,
					});
				});
		}
	};

	saveUser = (createdUser) => {};

	render() {
		const { username, email, password, passwordConfirmation, errors, loading } =
			this.state;
		return (
			<Grid textAlign='center' verticalAlign='middle' className='app'>
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as='h2' icon color='orange' textAlign='center'>
						<Icon name='puzzle piece' color='orange' />
						Register for DevChat
					</Header>
					<Form size='large' onSubmit={this.handleSumbit}>
						<Segment>
							<Form.Input
								fluid
								name='username'
								icon='user'
								iconPosition='left'
								placeholder='Username'
								onChange={this.handleChange}
								value={username}
								type='text'
							/>
							<Form.Input
								fluid
								name='email'
								icon='mail'
								iconPosition='left'
								placeholder='Email'
								onChange={this.handleChange}
								value={email}
								type='text'
							/>
							<Form.Input
								fluid
								name='password'
								icon='lock'
								iconPosition='left'
								placeholder='Password'
								onChange={this.handleChange}
								value={password}
								type='text'
							/>
							<Form.Input
								fluid
								name='passwordConfirmation'
								icon='repeat'
								iconPosition='left'
								placeholder='Password Confirmation'
								onChange={this.handleChange}
								value={passwordConfirmation}
								type='text'
							/>
							<Button
								className={loading ? 'loading' : ''}
								color='orange'
								fluid
								size='large'
							>
								Sumbit
							</Button>
						</Segment>
					</Form>
					{this.state.errors.length > 0 && (
						<Message error>
							<h3>Error</h3>
							{this.displayErrors(errors)}
						</Message>
					)}
					<Message>
						Already a user? <Link to='/login'>Login</Link>
					</Message>
				</Grid.Column>
			</Grid>
		);
	}
}

export default Register;
