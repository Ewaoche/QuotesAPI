const express = require('express');

const router = express.Router();


const { registerController, logincontroller } = require('../controller/authcontroller');


router.post('/register', registerController);
router.post('/login', logincontroller);


module.exports = router;