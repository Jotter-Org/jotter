import React, { useContext, useRef, useEffect } from 'react';
import BlogContext from '../../context/blog/blogContext';

const BlogFilter = () => {
  const blogContext = useContext(BlogContext);

  const text = useRef('');
  const { filterBlogs, clearFilter, filtered } = blogContext;

  useEffect(() => {
    if (filtered === '') {
      text.current.value = '';
    }
  }, [filtered]);

  const onChange = e => {
    if (text.current.value !== '') {
      filterBlogs(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter blogs"
        onChange={onChange}
      />
    </form>
  );
};

export default BlogFilter;
