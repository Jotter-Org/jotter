const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
//route Get /api/auth
//description get logged in user
//access Private

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
    return;
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
    return;
  }
});

//route post /api/auth
//description auth user get token
//access Public

router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password must be 8 characters long').isLength({ min: 8 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).send({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send({ msg: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET || config.get('jwtSecret'),
        {
          //for development in prod 3600 i.e. 1hr
          expiresIn: 360000
        },
        (err, token) => {
          if (err) {
            throw err;
            return;
          }
          res.json({ token });
          return;
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
      return;
    }
  }
);

module.exports = router;
