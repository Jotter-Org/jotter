import React, { useState, useContext, useEffect } from 'react';
import CKEditor from 'react-ckeditor-component';
import BlogContext from '../../context/blog/blogContext';

const BlogForm = () => {
  const blogContext = useContext(BlogContext);

  const { addBlog, current, clearCurrent, updateBlog } = blogContext;
  const [blog, setBlog] = useState({
    title: '',
    content: 'Write your story'
  });

  useEffect(() => {
    if (current !== null) {
      setBlog(current);
    } else {
      setBlog({
        title: '',
        content: 'Write your story'
      });
    }
  }, [blogContext, current]);

  const { title, content } = blog;

  const onChange = e => setBlog({ ...blog, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) addBlog(blog);
    else updateBlog(blog);
    setBlog({
      title: '',
      content: 'Write your story'
    });
    clearCurrent();
  };

  const clearAll = () => {
    clearCurrent();
  };

  const onChange1 = evt => {
    console.log('onChange fired with event info: ', evt);
    var newContent = evt.editor.getData();
    setBlog({
      content: newContent
    });
  };

  /*const updateContent = newContent => {
    setBlog({
      content: newContent
    });
  };*/

  const onBlur = evt => {
    console.log('onBlur event called with event info: ', evt);
  };

  const afterPaste = evt => {
    console.log('afterPaste event called with event info: ', evt);
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? 'Edit ' : 'Add '}Blog</h2>
      <input
        type="text"
        style={{ fontWeight: 'bold' }}
        placeholder="Title"
        name="title"
        value={title}
        onChange={onChange}
      />
      {/* add editor*/}

      <CKEditor
        activeClass="p10"
        content={content}
        events={{
          blur: onBlur,
          afterPaste: afterPaste,
          change: onChange1
        }}
      />
      <div>
        <input
          type="submit"
          value={current ? 'Update Blog' : 'Add Blog'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default BlogForm;
