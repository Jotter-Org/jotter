import React, { Fragment, useContext, useEffect } from 'react';
import BlogItem from './BlogItem';
import Spinner from '../layout/Spinner';
import BlogContext from '../../context/blog/blogContext';

const Blogs = () => {
  const blogContext = useContext(BlogContext);

  const { blogs, filtered, getBlogs, loading } = blogContext;

  useEffect(() => {
    getBlogs();
    // eslint-disable-next-line
  }, []);

  if (blogs !== null && blogs.length === 0 && !loading) {
    return <h4>Start a new journey write your blog</h4>;
  }

  return (
    <Fragment>
      {blogs !== null && !loading ? (
        <div>
          {filtered !== null
            ? filtered.map(blog => <BlogItem key={blog._id} blog={blog} />)
            : blogs.map(blog => <BlogItem key={blog._id} blog={blog} />)}{' '}
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Blogs;
