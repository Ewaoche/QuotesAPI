const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const ErrorHandler = require('./middleware/error');










//load env variable
dotenv.config({ path: './config/config.env' });

//connect DB
connectDB();



//body parser
app.use(express.json());

//start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, console.log(`Server started on ${PORT}`));


//handle cors
app.use(cors());

//mount routers
app.use('/api/v1', require('./route/auth'))
app.use('/api/v1', require('./route/quote'));
app.use(ErrorHandler);

//handle unhandled rejection
process.on('unhandledRejection', (err, Promise) => {
    console.log(`Error:${err.message}`);

    server.close(() => process.exit(1))
});