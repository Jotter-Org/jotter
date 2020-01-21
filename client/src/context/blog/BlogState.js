import React, { useReducer } from 'react';
import axios from 'axios';
import BlogContext from './blogContext';
import BlogReducer from './blogReducer';
import {
  GET_BLOGS,
  ADD_BLOG,
  DELETE_BLOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_BLOG,
  FILTER_BLOGS,
  CLEAR_BLOGS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types';

const BlogState = props => {
  const initialState = {
    blogs: null,
    current: null,
    filtered: null,
    error: null
  };
  const [state, dispatch] = useReducer(BlogReducer, initialState);

  //get blogs
  const getBlogs = async () => {
    try {
      const res = await axios.get('/api/blogs');

      dispatch({ type: GET_BLOGS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Add blog

  const addBlog = async blog => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/blogs', blog, config);

      dispatch({ type: ADD_BLOG, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };
  //Delete Blog

  const deleteBlog = async id => {
    try {
      await axios.delete(`/api/blogs/${id}`);

      dispatch({ type: DELETE_BLOG, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // clear blogs

  const clearBlogs = () => {
    dispatch({ type: CLEAR_BLOGS });
  };

  //Set current blog

  const setCurrent = blog => {
    dispatch({ type: SET_CURRENT, payload: blog });
  };
  //clear current blog

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  //Update blog

  const updateBlog = async blog => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/blogs/${blog._id}`, blog, config);

      dispatch({ type: UPDATE_BLOG, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };
  //Filter blog
  const filterBlogs = text => {
    dispatch({ type: FILTER_BLOGS, payload: text });
  };

  //clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <BlogContext.Provider
      value={{
        blogs: state.blogs,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addBlog,
        deleteBlog,
        setCurrent,
        clearCurrent,
        updateBlog,
        filterBlogs,
        clearFilter,
        getBlogs,
        clearBlogs
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogState;
