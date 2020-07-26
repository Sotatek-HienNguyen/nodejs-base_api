const express = require('express');
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();

const authenticateRouter = require('./routes/authenticate');
const userRouter = require('./routes/user');

dotenv.config();

//connect db
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }, () =>
	console.log('connect to dabase mongodb')
);

// app.use(express.json());
app.use(bodyParser.json())

//routing
app.use('/api/auth', authenticateRouter);
app.use('/api/user', userRouter);

app.listen(process.env.PORT, process.env.APP_URL, () => console.log('Server up'))