import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', 
		marginTop: theme.spacing(6),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Register = props => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;
	const { register, error, clearErrors, isAuthenticated } = authContext;
	const classes = useStyles();

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/');
		}

		if (error === 'User already exists') {
			setAlert(error, 'danger');
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const { name, email, password, password2 } = user;

	const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();
		if (name === '' || email === '' || password === '') {
			setAlert('Please enter all fields', 'danger');
		} else if (password !== password2) {
			setAlert('Passwords do not match', 'danger');
		} else {
			register({
				name,
				email,
				password
			});
		}
	};

	return (
		<Container component="main" maxWidth="xs" >
			<CssBaseline />
			<Grid item xs={12} sm={12} md={12} component={Paper} elevation={2} square>
				<form onSubmit={onSubmit} className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<h1>
						Register
					</h1>
					<Grid>
						<div className="form-group">
							<label htmlFor='name'>Name</label>
							<input
								id='name'
								type='text'
								name='name'
								varient='outlied'
								autoFocus
								value={name}
								onChange={onChange}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor='email'>Email Address</label>
							<input
								id='email'
								type='email'
								name='email'
								value={email}
								onChange={onChange}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor='password'>Password</label>
							<input
								id='password'
								type='password'
								name='password'
								value={password}
								onChange={onChange}
								required
								minLength='6'
							/>
						</div>
						<div className="form-group">
							<label htmlFor='password2'>Confirm Password</label>
							<input
								id='password2'
								type='password'
								name='password2'
								value={password2}
								onChange={onChange}
								required
								minLength='6'
							/>
						</div>
						<input
							type='submit'
							value='Register'
							className='btn btn-block'
						/>
					</Grid>
				</form>
			</Grid>
		</Container>
	);
};

export default Register;
