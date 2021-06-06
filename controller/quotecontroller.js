const asyncHandler = require("../middleware/async");
const Quote = require('../models/Quote');


const createQuoteController = asyncHandler(async(req, res, next) => {
    const quotes = await Quote.create(req.body);

    if (quotes) {
        res.status(201).json({
            message: 'Quote created successfully',
            data: quotes
        })
    }
});

const getAllQuotesController = asyncHandler(async(req, res, next) => {
    const quotes = await Quote.find();
    if (quotes) {
        res.status(200).json({
            message: 'Quotes retrived successfully',
            data: quotes
        })
    }
});


module.exports = {
    createQuoteController,
    getAllQuotesController
}