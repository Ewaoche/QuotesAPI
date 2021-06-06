const mongoose = require('mongoose');


const connectDB = async() => {
    const conn = await mongoose.connect(process.env.MONGOURL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

}


module.exports = connectDB;