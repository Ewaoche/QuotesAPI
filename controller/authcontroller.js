const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Visitor = require('../models/Visitor');


const registerController = asyncHandler(async(req, res, next) => {
    const user = await Visitor.create(req.body);

    if (user) {
        res.status(201).json({
            message: "register was successfull !",
            data: user
        })
    }



});


const logincontroller = asyncHandler(async(req, res, next) => {
    const { email, password } = req.body;

    //validate email and password
    if (!email || !password) {
        return next(new ErrorResponse("Please provide email and password", 400))
    }

    //check for user
    const user = await Visitor.findOne({ email }).select('+password')
    if (!user) {
        return next(new ErrorResponse("Invilid credential", 400))

    }

    //check if password match
    const ismatch = await user.matchPassword(password);

    if (!ismatch) {
        return next(new ErrorResponse("Invilid credential", 400))

    }

    //create token
    const token = user.createSignedJWTToken();
    res.status(200).json({
        message: "login successfully",
        data: user,
        token
    })

})


module.exports = {
    registerController,
    logincontroller
}