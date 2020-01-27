const express = require('express');
const router = express.Router();
const { Blog } = require('../models/Blog');
//const JSON = require('circular-json');
const auth = require('../middleware/auth');
const multer = require('multer');

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
      return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
    }
    cb(null, true);
  }
});

const upload = multer({ storage: storage }).single('file');

router.post('/uploadfiles', (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename
    });
  });
});

router.get('/', auth, (req, res) => {
  /*const blogs = Blog.find({ writer: req.user._id });

  res.json({blogs});*/
  Blog.find({ writer: req.user.id }).exec((err, blogs) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, blogs });
  });
});

router.post('/createPost', auth, (req, res) => {
  let blog = new Blog({ content: req.body.content, writer: req.body.userID });

  blog.save((err, postInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, postInfo });
  });
});

router.get('/getBlogs', auth, (req, res) => {
  Blog.find()
    .populate('writer')
    .exec((err, blogs) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, blogs });
    });
});

router.post('/getPost', auth, (req, res) => {
  //console.log(req.body);
  Blog.findOne({ _id: req.body.postId })
    .populate('writer')
    .exec((err, post) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, post });
    });
});

module.exports = router;
