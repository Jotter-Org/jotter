const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = mongoose.Schema(
  {
    content: {
      type: String
    },
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = { Blog };
