const express = require('express');
const connectDB = require('./config/db');
const app = express();

//connect Database
connectDB();

// init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'hello' }));

//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
//TODO make one for blog
//app.use('/api/blog', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('server started'));
