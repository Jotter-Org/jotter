import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import BlogContext from '../../context/blog/blogContext';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import jlogo from '../assets/jotter.ico';

const useStyles = makeStyles(theme => ({
	'@global': {
		ul: {
		margin: 0,
		padding: 0,
		},
		li: {
		listStyle: 'none',
		},
	},
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	toolbar: {
		flexWrap: 'wrap',
	},
	toolbarTitle: {
		flexGrow: 1,
	},
	link: {
		margin: theme.spacing(2, 3),
	},
	logo: {
		width: 40,
		height: 40
	}
}));


const Navbar = () => {
	const authContext = useContext(AuthContext);
	const blogContext = useContext(BlogContext);

	const { isAuthenticated, logout, user } = authContext;
	const { clearBlogs } = blogContext;
	const classes = useStyles();

	const onLogout = () => {
		logout();
		clearBlogs();
	};

	const authLinks = (
		<Fragment>
			<li>Hello {user && user.name}</li>
			<li>
				<Link onClick={onLogout} href="#!">
				<i className="fas fs-sign-out-alt" />
				<span className="hide-sm">Logout</span>
				</Link>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<Link variant="button" color="textPrimary" to="/register">Register</Link>    /
			<Link variant="button" color="textPrimary" to="/login">Login</Link>
		</Fragment>
	);

	return (
		<Fragment>
			<CssBaseline />
			<AppBar position="static" color="default" elevation={0} className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<Typography variant="h6" color="inherit"  className={classes.toolbarTitle} >
						<img
							className={classes.logo}
							src={
							jlogo
							}
							alt="Jotter Logo"
						/>
						{" "}
						<span style={{ justifyContent: "space-around"}}>
							Jotter
						</span>
					</Typography>
					<nav>	  
						<Link variant="button" color="textPrimary" to="/" className={classes.link}>Home</Link>
						<Link variant="button" color="textPrimary" to="/about" className={classes.link}>About</Link>
						{isAuthenticated ? authLinks : guestLinks}
					</nav>  
				</Toolbar>
			</AppBar>
		</Fragment>
		
	);
};

export default Navbar;
