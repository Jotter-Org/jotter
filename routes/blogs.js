const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Blog = require('../models/Blog');

//route Get /api/blogs
//description get all user blogs
//access Private

router.get('/', auth, async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(blogs);
    return;
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
    return;
  }
});

//route post /api/blogs
//description add new blog
//access Private

router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;

    try {
      const newBlog = new Blog({
        title,
        content,
        user: req.user.id
      });

      const blog = await newBlog.save();

      res.json(blog);
      return;
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
      return;
    }
  }
);

//route put /api/blogs/:id
//description update blog
//access Private

router.put('/:id', auth, async (req, res) => {
  const { title, content } = req.body;

  //build blog object
  const blogFields = {};

  if (title) blogFields.name = title;
  if (content) blogFields.content = content;

  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ msg: 'Blog not found' });

    if (blog.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'access not authorized' });
    }

    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(blog);
    return;
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
    return;
  }
});

//route delete /api/blogs/:id
//description delete blog
//access Private

router.delete('/:id', auth, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ msg: 'Blog not found' });

    if (blog.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'access not authorized' });
    }

    await Blog.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Blog Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
    return;
  }
});

module.exports = router;
