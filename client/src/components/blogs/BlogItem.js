import React, { useContext } from 'react';
import BlogContext from '../../context/blog/blogContext';

const BlogItem = ({ blog }) => {
  const blogContext = useContext(BlogContext);
  const { _id, title, content } = blog;

  const { deleteBlog, setCurrent, clearCurrent } = blogContext;
  const onDelete = () => {
    clearCurrent();
    deleteBlog(_id);
  };
  return (
    <div className=" card bg-light">
      <h3 className="text-primary text-left">{title} </h3>
      <p>{content}</p>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(blog)}
        >
          Edit
        </button>

        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

export default BlogItem;
