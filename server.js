const express = require('express');
const connectDB = require('./config/db');
const app = express();

//connect Database
connectDB();

// init middleware
app.use(express.json({ extended: false }));

//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
//TODO make one for blog
app.use('/api/blogs', require('./routes/blogs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('server started'));
