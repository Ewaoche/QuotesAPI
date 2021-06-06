const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Visitor = require('../models/Visitor');

//protect route
exports.protect = asyncHandler(async(req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {

        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new ErrorResponse('You are not Authorized for this route', 401));
    }

    //Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWTSCRET);
        req.user = await Visitor.findById(decoded.id);
        next();
    } catch (err) {
        return next(new ErrorResponse('You are not Authorized for this route', 401));

    }
});