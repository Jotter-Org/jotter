import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
	root: {
		height: '50vh',
	},
	// image: {
	// 	backgroundImage: 'url(https://source.unsplash.com/random)',
	// 	backgroundRepeat: 'no-repeat',
	// 	backgroundColor:
	// 	theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
	// 	backgroundSize: 'cover',
	// 	backgroundPosition: 'center',
	// },
	paper: {
		margin: theme.spacing(8, 4),
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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Login = props => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);
	const { setAlert } = alertContext;
	const { login, error, clearErrors, isAuthenticated } = authContext;
	const classes = useStyles();

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/');
		}

		if (error === 'Invalid Credentials') {
			setAlert(error, 'danger');
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);

	const [user, setUser] = useState({
		email: '',
		password: ''
	});

	const { email, password } = user;

	const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();
		if (email === '' || password === '') {
			setAlert('Please fill in all fields', 'danger');
		} 
		else {
			login({
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
						Account <span className="text-primary">Login</span>
					</h1>
					<Grid>
						<div className="form-group">
							<label htmlFor="email">Email Address</label>
							<input
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							type="email"
							name="email"
							value={email}
							onChange={onChange}
							required
							autoComplete="email"
							autoFocus
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="password"
							type="password"
							name="password"
							value={password}
							onChange={onChange}
							autoComplete="current-password"
							required
							/>
						</div>
						<input
							type="submit"
							value="Login"
							fullWidth
							variant="contained"
							color="primary"
							className='btn btn-block'
						/> 
					</Grid>
				</form>
			</Grid>
		</Container>
	);
};

export default Login;
