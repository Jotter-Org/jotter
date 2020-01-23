import React, { useContext, useEffect } from 'react';
import Blogs from '../blogs/Blogs';
import BlogForm from '../blogs/BlogForm';
import BlogFilter from '../blogs/BlogFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
	const authContext = useContext(AuthContext);
	const { loadUser } = authContext;

	useEffect(() => {
		loadUser();
		//eslint-disable-next-line
	}, []);

	return (
		<div className="grid-2">
			<div>
				<BlogForm />
			</div>
			<div>
				<BlogFilter />
				<Blogs />
			</div>
		</div>
	);
};

export default Home;
