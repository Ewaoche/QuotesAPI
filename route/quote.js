const express = require('express');
const { protect } = require('../middleware/protect');

const router = express.Router();


const { createQuoteController, getAllQuotesController } = require('../controller/quotecontroller');

// router.use(protect);
router.post('/createQuote', createQuoteController);
router.get('/getQuotes', getAllQuotesController);


module.exports = router;