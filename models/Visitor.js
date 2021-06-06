const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

VisitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'

    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});


VisitorSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

VisitorSchema.methods.createSignedJWTToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWTSCRET, {
        expiresIn: process.env.JWTEXPIRE
    })
}


VisitorSchema.methods.matchPassword = async function(enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password);
}


module.exports = mongoose.model('vistors', VisitorSchema);