const express = require('express');
const { protect } = require('../middleware/protect');

const router = express.Router();


const { createQuoteController, getAllQuotesController } = require('../controller/quotecontroller');

// router.use(protect);
router.get('/getQuotes', protect, getAllQuotesController);
router.post('/createQuote', createQuoteController);


module.exports = router;