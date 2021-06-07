const asyncHandler = require("../middleware/async");
const Quote = require('../models/Quote');
const { random } = require('lodash')


const createQuoteController = asyncHandler(async(req, res, next) => {
    const quotes = await Quote.create(req.body);

    if (quotes) {
        res.status(201).json({
            message: 'Quote created successfully',
            data: quotes
        })
    }
});

// const getAllQuotesController = asyncHandler(async(req, res, next) => {
//     const quotes = await Quote.find();
//     if (quotes) {
//         res.status(200).json({
//             message: 'Quotes retrived successfully',
//             data: quotes
//         })
//     }
// });
const getAllQuotesController = asyncHandler(async(req, res, next) => {
    const quotes = await Quote.find();
    let randomQuote = quotes[random(0, quotes.length - 1)]
    if (randomQuote) {
        res.status(200).json({
            message: 'Quote retrived successfully',
            data: randomQuote
        })
    }
});


module.exports = {
    createQuoteController,
    getAllQuotesController
}